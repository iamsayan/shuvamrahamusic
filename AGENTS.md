# AGENTS.md

## 🧠 Project Overview

This is a Next.js 16 (App Router) application used to showcase guitar learning website, including locations, images, and event details.

---

## ⚙️ Tech Stack

* Next.js 16 (App Router with `cacheComponents` and `reactCompiler` enabled)
* TypeScript (strict mode)
* Tailwind CSS v4

---

## 📁 Project Structure

* `/app` → Routes and layouts (App Router)
* `/components` → Reusable UI components
* `/services` → API and external service logic
* `/lib` → Utility/helper functions
* `/types` → TypeScript types/interfaces
* `/hooks` → Custom React hooks (if needed)

---

## 🧾 Coding Guidelines

### General

* Always use **TypeScript**
* Prefer **functional components**
* Keep components **small and reusable**
* Follow existing naming conventions
* Avoid unnecessary abstraction

### Styling

* Use **Tailwind CSS only**
* Do NOT use inline CSS or external CSS files
* Follow consistent spacing (Tailwind scale)
* Follow liquid glass design
* Mobile-first responsive design
* Don't add unneccessary left and right padding
* Make width consistent across all components and pages

### Components

* Prefer **Server Components** unless interactivity is required
* Use Client Components only when necessary (`"use client"`)
* Do not fetch data directly inside deeply nested components

---

## 🚫 Do & Don’t

### ✅ Do

* Reuse existing components
* Follow current folder structure
* Write clean and readable code
* Use proper TypeScript types

### ❌ Don’t

* Do NOT introduce new dependencies without strong reason
* Do NOT rewrite working logic unnecessarily
* Do NOT hardcode API URLs or secrets
* Do NOT break existing UI patterns

---

## ⚡ Performance Rules

* Prefer **Server Components**
* **React Compiler**: The project is configured with React Compiler. Do **NOT** use manual `useMemo` or `useCallback` hooks as function and component memoization is handled automatically at compile-time.
* **Avoid Render Storms**: For scroll or other high-frequency DOM event handlers, restrict state updates to trigger only when the state value actually changes to prevent unnecessary re-rendering and layout thrashing.
* **Cache Components (`use cache`)**: The project has Next.js `cacheComponents: true` enabled, which sets Partial Prerendering (PPR) as the default model.
  * Use the `'use cache'` directive at the top of Server Components or functions to cache their outputs.
  * Use Next.js 16 `cacheLife` to configure dynamic revalidation lifetimes (e.g. `'minutes'`, `'hours'`).
  * Do not use legacy route segment configs like `export const dynamic = 'force-dynamic'` or `revalidate = 0` unless specifically required.
* Avoid unnecessary re-renders
* Use dynamic imports where needed
* Optimize images and API calls
* Avoid large client-side bundles

---

## 🔐 Security Rules

* Sanitize all incoming data before storing
* Escape output properly
* Avoid exposing sensitive data in frontend
* Validate API inputs

---

## 🎯 SEO Rules

* Use proper metadata (`generateMetadata`)
* Optimize page titles and descriptions
* Use semantic HTML
* Ensure fast page load

---

## 🧩 Feature Development Guidelines

### Adding a New Page

1. Create route in `/app`
2. Use existing UI components
3. Add metadata for SEO

---

## 🧪 Testing & Validation

* Ensure no TypeScript errors
* Validate responsiveness (mobile + desktop)
* Check performance impact
* Avoid console errors

---

## 📌 Notes for AI Agents

* Always follow existing patterns before introducing new ones
* **React Compiler awareness**: Do not introduce manual React memoization hooks (`useMemo`, `useCallback`) as they are redundant.
* **Unified useSettings Hook**: Site settings and pricing plans are accessed via the `useSettings()` hook. Avoid fetching these individually or passing separate promises when layout context is available.
* **Caching with `use cache`**: Utilize the `'use cache'` directive and standard `cacheLife` profiles for data caching instead of custom caching variables or dynamic configuration exports.
* Prefer minimal and clean solutions
* Do not over-engineer
* Respect project structure strictly
* If unsure, reuse existing logic instead of creating new patterns

---

## 🚀 Future Considerations

* Add caching strategies for API responses

---
