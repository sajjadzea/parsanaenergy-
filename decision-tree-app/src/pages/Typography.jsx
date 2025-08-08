import React from 'react';

export default function Typography() {
  return (
    <main className="readable">
      <h1>تیتر یک</h1>
      <p>این یک پاراگراف نمونه برای بررسی تایپوگرافی است.</p>
      <h2>تیتر دو</h2>
      <p lang="en">Sample English text.</p>
      <ul>
        <li>گزینه اول</li>
        <li>گزینه دوم</li>
      </ul>
      <table>
        <tr><th>ستون</th><th>عدد</th></tr>
        <tr><td>یک</td><td>۱</td></tr>
      </table>
      <form>
        <input type="text" placeholder="نمونه" />
        <button>ارسال</button>
      </form>
    </main>
  );
}
