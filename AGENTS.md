# AGENTS.md

## 🧠 Project Overview

This is a Next.js 16 (App Router) application used to showcase guitar learning website, including locations, images, and event details.

---

## ⚙️ Tech Stack

* Next.js 16 (App Router)
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
* Prefer minimal and clean solutions
* Do not over-engineer
* Respect project structure strictly
* If unsure, reuse existing logic instead of creating new patterns

---

## 🚀 Future Considerations

* Add caching strategies for API responses

---
