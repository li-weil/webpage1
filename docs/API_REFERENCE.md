# InsightPulse Documentation

This document describes the public surface of the project: HTML components, CSS classes, and the JavaScript sidebar behavior. It includes usage guidance and examples.

## Project Structure

- `index.html`: Landing page with navbar, welcome section, latest articles, and footer.
- `blog_article.html`: Blog listing page with comments section.
- `article1.html`: Example article detail page with a toggleable sidebar.
- `styles.css`: Global styles for layout, navbar, cards, buttons, and footer.
- `sidebar.css`: Styles for the article layout, sidebar, and toggle button.
- `sidebar.js`: JavaScript providing the sidebar toggle behavior.

---

## HTML Components

### Navbar (`header > .navbar`)
- Location: `index.html`, `blog_article.html`, `article1.html`
- Structure:
  - `.logo`: Site brand text.
  - `.nav-links`: List of navigation links.
- Usage:
  - Include the `styles.css` file.
  - Place the navbar at the top of the document inside `header`.

Example:
```html
<header>
  <nav class="navbar">
    <div class="logo">InsightPulse</div>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="blog_article.html">Blog Article</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
  </header>
```

### Welcome Section (`.welcome`)
- Location: `index.html`
- Provides a hero with title, description, and a call-to-action `.button`.

### Latest Articles (`.latest-articles` / `.article-card`)
- Location: `index.html`, `blog_article.html`
- Cards with title, description, and a `.read-more` link.

### Blog Article List (`.blog-article-list`)
- Location: `blog_article.html`
- Groups multiple `.article-card` entries.

### Comments Section (`.comment-section`)
- Location: `blog_article.html`
- Contains preset comment examples and a `.comment-form`.

### Article Detail Layout with Sidebar (`.main-content`, `.article-content`, `.sidebar`)
- Location: `article1.html`
- Requires `styles.css` and `sidebar.css`.
- Includes a toggle button with `id="toggleSidebar"` and class `.toggle-sidebar-btn`.

Example minimal setup:
```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="sidebar.css">

<button id="toggleSidebar" class="toggle-sidebar-btn">Hide Sidebar</button>

<div class="main-content">
  <section class="article-content">
    <h2>Article Title</h2>
    <p>...</p>
  </section>
  <aside class="sidebar">
    <h3>Other Articles</h3>
    <ul>
      <li><a href="#">Article 1</a></li>
    </ul>
  </aside>
  </div>

<script src="sidebar.js"></script>
```

---

## CSS Reference

### Global (`styles.css`)
- `.navbar`: Fixed top bar; uses flex layout and `z-index: 1000`.
- `.logo`: Branding text.
- `.nav-links`, `.nav-links a`: Horizontal nav styling with hover color.
- `.welcome`: Hero container with shadow and spacing.
- `.button`: Primary action button; dark background with hover.
- `.latest-articles`, `.articles-container`: Section and responsive layout.
- `.article-card`: Card with hover `transform: translateY(-5px)`. Width ~30% on desktop.
- `.read-more`: Link styling with hover.
- `footer`, `.social-links a`: Footer colors and link hover.

### Sidebar Layout (`sidebar.css`)
- `.main-content`: Flex layout with right margin to accommodate the sidebar.
- `.article-content`: Centered readable content area with max width.
- `.sidebar`: Fixed right sidebar, width 280px, smooth `transform` transitions.
- `.sidebar.hidden`: Translates sidebar off-screen for hide/show.
- `.toggle-sidebar-btn`: Fixed button positioned near the sidebar.
- `.toggle-sidebar-btn.hidden`: Moves button closer to the right edge when sidebar is hidden.

Usage notes:
- The right margin on `.main-content` should match the visible sidebar width to prevent overlap.

---

## JavaScript API (`sidebar.js`)

The script attaches on `DOMContentLoaded` and wires a click handler to `#toggleSidebar` to hide/show the sidebar with CSS classes and inline style adjustments.

Signature and behavior:

```js
// Automatically executed on DOMContentLoaded
// Requires: #toggleSidebar button, .sidebar element, and .main-content element
document.addEventListener('DOMContentLoaded', function () {
  const toggleSidebarBtn = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  toggleSidebarBtn.addEventListener('click', function () {
    sidebar.classList.toggle('hidden');
    if (sidebar.classList.contains('hidden')) {
      toggleSidebarBtn.textContent = 'Show Sidebar';
      toggleSidebarBtn.classList.add('hidden');
      mainContent.style.marginRight = '20px';
    } else {
      toggleSidebarBtn.textContent = 'Hide Sidebar';
      toggleSidebarBtn.classList.remove('hidden');
      mainContent.style.marginRight = '300px';
    }
  });
});
```

Requirements:
- Button element with `id="toggleSidebar"`.
- Sidebar element with class `.sidebar` and optional `.hidden` to start hidden.
- Main container element with class `.main-content`.

Notes:
- There is a second inline script in `article1.html` that toggles `style.display`. Prefer the class-based toggle in `sidebar.js` for smooth transitions and consistent button repositioning.

---

## Usage Examples

### Start with the sidebar hidden
```html
<aside class="sidebar hidden">...</aside>
```

### Customize collapsed margin
```js
// After including sidebar.js
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main-content');
  const collapsedMarginPx = 16;
  const expandedMarginPx = 300;
  // Optional: respond to your own app state changes
  const updateLayout = (isHidden) => {
    main.style.marginRight = isHidden ? `${collapsedMarginPx}px` : `${expandedMarginPx}px`;
  };
});
```

### Minimal page wiring
```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="sidebar.css">

<button id="toggleSidebar" class="toggle-sidebar-btn">Hide Sidebar</button>
<div class="main-content">
  <section class="article-content">...</section>
  <aside class="sidebar">...</aside>
  </div>
<script src="sidebar.js"></script>
```

---

## Known Limitations and Recommendations

- The navbar is fixed; ensure main content has adequate top padding/margin (`.welcome` uses padding-top) to avoid overlap.
- Avoid mixing the inline display-toggle script in `article1.html` with the class-based approach. Choose one; the class-based approach is recommended.
- For accessibility, ensure the toggle button has an `aria-expanded` attribute updated alongside the visual state.

Example ARIA enhancement:
```js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main-content');
  btn.addEventListener('click', () => {
    const hidden = sidebar.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!hidden));
    main.style.marginRight = hidden ? '20px' : '300px';
  });
});
```

