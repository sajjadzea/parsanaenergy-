# Deploying to GitHub Pages

This guide explains how to publish the **decision-tree** React app using GitHub Pages.

## 1. Install `gh-pages`

```bash
npm install --save-dev gh-pages
```

## 2. Add `homepage` to `package.json`

Edit `decision-tree/package.json` and add a `homepage` field with the URL of your GitHub Pages site:

```json
"homepage": "https://<username>.github.io/<repo-name>"
```

## 3. Add deploy scripts

In the same `package.json`, extend the `scripts` section:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## 4. Custom domain (optional)

If you use a custom domain, create a file named `CNAME` inside the `public/` directory containing your domain name. It will be copied to the `dist` folder during the build so GitHub Pages can recognize it.

## 5. Deploy

Run the following command to build the project and push the `dist` folder to the `gh-pages` branch:

```bash
npm run deploy
```

GitHub Pages will then host the site from the `gh-pages` branch.
