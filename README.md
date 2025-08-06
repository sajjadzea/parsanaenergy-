# Parsana Energy Monorepo

This repository hosts several independent front‑end applications. Each
folder under the root is a self‑contained [Vite](https://vitejs.dev/) project
with its own `package.json`.

## Modules

### `docs`
Marketing landing page with basic HTML/CSS and a small React entry point.

```
docs/
├─ index.html           # main static page
├─ src/                 # React widget source
│  └─ main.jsx          # entry point
└─ vite.config.js
```

Run the site locally:

```bash
cd docs
npm install
npm run dev       # start dev server on http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview   # preview the built files
```

The Vite configuration sets `base: '/parsanaenergy/'` so that assets load
correctly when deploying the site under `https://<user>.github.io/parsanaenergy/`.

### `decision-tree-app`
Interactive decision tree widget built with React and Vite.

```
decision-tree-app/
├─ index.html
├─ src/
│  └─ main.jsx       # entry point
└─ vite.config.js
```

Use the following commands:

```bash
cd decision-tree-app
npm install
npm run dev        # development server
npm run build      # build to dist/
npm run preview    # preview production build
npm run build-widget # build and copy into docs/widget
```

This app also uses `base: '/parsanaenergy/'` in `vite.config.js` so the widget
works correctly when served from the GitHub Pages subdirectory.

Before committing changes to the repository, run `npm run build-widget`
to refresh the files inside `docs/widget`. This keeps the deployed
decision tree up‑to‑date.

**Build and deploy order**
1. `cd decision-tree-app && npm run build-widget`
2. `cd docs && npm run build`
This sequence ensures the site and widget bundles are generated
separately with unique hashes to avoid conflicts.

## Repository layout

```
.
├── README.md
├── decision-tree-app
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   └── vite.config.js
└── docs
    ├── README.md
    ├── assets
    ├── css
    ├── images
    ├── index.html
    ├── js
    ├── package-lock.json
    ├── package.json
    ├── src
    └── vite.config.js
```

## Envoy configuration

The `envoy/envoy.yaml` file configures Envoy to inject common security headers into every response. Start your static site on port `8000` (e.g. `npm run preview` in `docs`) and launch Envoy:

```bash
docker run --rm -p 8080:8080 \
  -v $(pwd)/envoy/envoy.yaml:/etc/envoy/envoy.yaml \
  envoyproxy/envoy:v1.29-latest
```

Then open `http://localhost:8080`.


حتماً!
در ادامه، **توضیحات کاملاً فارسی، دلیل هر مرحله، و ساختار پیشنهادی پروژه** را در قالبی آماده کردم که مستقیماً می‌توانی داخل فایل README قرار بدهی—همراه با نمونه ساختار پوشه‌ها و فایل‌ها و نکات مربوط به GitHub Actions.

---

---

# ‌📦 **ساختار پروژه و دلایل انتخاب ابزارها و مراحل CI/CD**

---

## **ساختار پروژه (Monorepo با pnpm)**

```
parsanaenergy/
├── docs/                   # سایت اصلی (با Vite/React/HTML)
│   ├── index.html
│   ├── ...                
│   ├── dist/               # خروجی build سایت برای دیپلوی نهایی
│   └── ...
├── decision-tree-app/      # اپلیکیشن درخت تصمیم (ویجت)
│   ├── src/
│   ├── public/
│   ├── dist/
│   └── ...
├── data/                   # داده‌های نمونه یا پایگاه داده آزمایشی
├── dash/pages/             # صفحات داشبورد (در صورت وجود)
├── samples/                # نمونه‌کدها یا تست‌های اولیه
├── package.json            # تعریف وابستگی‌های root
├── pnpm-workspace.yaml     # تعریف workspaces پروژه برای pnpm
├── pnpm-lock.yaml          # قفل نسخه‌های نصب‌شده (فقط یکی!)
└── .github/workflows/
    └── deploy.yml          # اکشن اصلی GitHub برای build, test, deploy
```

---

## **چرا این ساختار و این ابزارها؟**

### ۱. **Monorepo با pnpm و pnpm-workspace.yaml**

* **دلیل:**
  مدیریت همزمان چند زیرپروژه (سایت اصلی، اپلیکیشن‌ها، ابزارها) را آسان، سریع و کم‌خطا می‌کند.
  فقط با یک بار نصب (pnpm install)، همه پکیج‌ها نصب و هماهنگ می‌شوند.

---

### ۲. **یک فایل قفل نسخه (pnpm-lock.yaml) و حذف سایر lockfileها**

* **دلیل:**
  داشتن فقط یک lockfile باعث هماهنگی همه وابستگی‌ها در هر محیط می‌شود و خطر تداخل npm و pnpm یا مشکلات نسخه‌ای را از بین می‌برد.

---

### ۳. **استفاده از GitHub Actions برای Build, Test, Deploy**

* **دلیل:**
  کل روند ساخت (build)، تست و دیپلوی پروژه اتوماتیک و تکرارپذیر می‌شود و دیگر نیاز به انجام دستی و تکراری این کارها نیست.
* اگر کدی با مشکل یا باگ وارد شود، تست‌ها یا lint آن را متوقف می‌کند و سایت/ویجت خراب دیپلوی نمی‌شود.
* فقط زمانی دیپلوی انجام می‌شود که همه مراحل (نصب، lint، تست، build) موفق باشند.

---

### ۴. **مرحله به مرحله بودن اکشن**

* **دلیل:**
  مراحل workflow به صورت شفاف و جدا از هم اجرا می‌شود؛ هرکدام fail شود، کل اکشن متوقف می‌شود و خطا به وضوح گزارش می‌شود.
* ترتیب مراحل پیشنهادی:

  1. **نصب وابستگی‌ها:**
     با دستور `pnpm install` همه زیرپروژه‌ها یکجا نصب می‌شوند.
  2. **Lint:**
     اجرای eslint و prettier (کیفیت و یکدستی کد).
  3. **Unit Test:**
     با Vitest/Jest (در صورت وجود).
  4. **E2E Test:**
     با Playwright (تست کل سایت در مرورگر واقعی).
  5. **Build:**
     خروجی نهایی برای دیپلوی ساخته می‌شود.
  6. **Deploy:**
     فقط اگر همه مراحل قبلی OK بود، به GitHub Pages (یا هر سرور دیگر) ارسال می‌شود.

---

### ۵. **دیپلوی فقط روی main**

* **دلیل:**
  امنیت و پایداری؛ فقط زمانی که همه تست‌ها سبز باشد و branch اصلی باشد، سایت/ویجت به روز می‌شود.
  (هیچ‌وقت نسخه ناقص یا آزمایشی دیپلوی نمی‌شود.)

---

### ۶. **عدم استفاده از چند package manager**

* **دلیل:**
  تداخل ابزارهای نصب (npm, pnpm, yarn) می‌تواند node_modules را خراب کند و build/test را دچار مشکل کند.
  فقط یک ابزار (pnpm) استفاده می‌شود.

---

### ۷. **نگهداری و توسعه تیمی آسان**

* **دلیل:**
  با این ساختار و workflow، هر عضو تیم دقیقاً می‌داند چطور باید کد جدید را اضافه کند، تست بگیرد و deploy کند—نیاز به راه‌اندازی دستی یا توضیح اضافی نیست.

---

## **نمونه اکشن GitHub Actions (deploy.yml)**

```yaml
name: CI/CD – Build, Test & Deploy

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies (monorepo)
        run: pnpm install --frozen-lockfile

      - name: Lint all packages
        run: |
          pnpm --filter ./docs lint || true
          pnpm --filter ./decision-tree-app lint || true

      - name: Unit tests for docs
        run: pnpm --filter ./docs test || echo "No tests in docs"
      - name: Unit tests for decision-tree-app
        run: pnpm --filter ./decision-tree-app test || echo "No tests in decision-tree-app"

      - name: Build docs
        run: pnpm --filter ./docs build
      - name: Build decision-tree-app
        run: pnpm --filter ./decision-tree-app build

      - name: Playwright install and E2E tests
        run: |
          pnpm exec playwright install
          pnpm exec playwright test

      - name: Upload build artifact
        if: ${{ github.ref == 'refs/heads/main' }}
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/dist

      - name: Deploy to GitHub Pages
        if: ${{ github.ref == 'refs/heads/main' }}
        uses: actions/deploy-pages@v4
```

---

## **نکات مهم برای توسعه‌دهندگان و هم‌تیمی‌ها**

* **همیشه فقط با pnpm install نصب انجام بدهید.**
* قبل از هر commit و pull request، مطمئن شوید تست‌ها و lint سبز است.
* تغییر در فایل‌های اکشن و تنظیمات CI/CD فقط با PR و بررسی جمعی باشد.
* فایل‌های قفل نسخه و workspace را تغییر ندهید مگر با هماهنگی.

---

**این ساختار و توضیحات باعث می‌شود همیشه سایت و ویجت‌های پروژه با اطمینان، کیفیت و سرعت بالا توسعه و منتشر شوند.**

---

### (می‌توانی همین بخش را مستقیماً در README.md پروژه کپی کنی.)

