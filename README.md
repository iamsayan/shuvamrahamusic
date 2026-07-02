# Shuvam Raha Music - Guitar Coaching Website

A premium, high-performance website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, created by [Sayan Datta](https://github.com/iamsayan) for Shuvam Raha. It showcases online and offline 1-on-1 guitar coaching programs, student testimonials, pricing tables, and a secure checkout portal.

---

## ⚙️ Tech Stack

* **Framework**: Next.js 16 (App Router with `cacheComponents` and `reactCompiler` enabled)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS v4 & SCSS (Liquid Glass design and modern dark mode design tokens)
* **Icons**: React Icons (Lucide React & FontAwesome)

---

## 📁 Project Structure

* `/src/app` → App router routes, page definitions, layouts, and metadata configurations.
* `/src/components` → Reusable UI components (header, footer, pricing grid, FAQ accordion, secure checkout wizard, and layout wrapper).
* `/src/hooks` → Custom React hooks for shared state logic (e.g., geolocation region detection).
* `/src/lib` → Utility helpers and static configurations (coaching plans, course curriculum detail modules).
* `/src/types` → TypeScript type definitions.

---

## 🌟 Core Features & Custom Architecture

### 1. Reusable Glassmorphic Layout (`PageLayout`)
All pages (Privacy Policy, Terms of Service, Refund Policy, Contact, and Pay) leverage a unified glassmorphic layout wrapper in `src/components/page-layout.tsx`.
* **Visual Theme**: Deep `#05050A` background with ambient cyan/violet blur gradients, floating music notes, and a glowing multi-color top accent strip.
* **Header Centering & Alignment**: Automatically aligns the breadcrumb path trail, main page title, and subtitle, with dynamic toggle support (`textAlign="center"`).
* **Responsive Card Wrapper**: Wraps page content in a central glass card that dynamically scales from mobile up to desktop width.

### 2. Centralized Geolocated Region Detection Hook (`useRegion`)
Pricing details and payment portal layouts dynamically switch between India (INR) and Global (USD) modes using a custom hook in `src/hooks/use-region.ts`.
* **Auto-Detection**: Automatically queries `https://ipinfo.io/json` on initial load to detect if the visitor is located in India or abroad.
* **Caching**: Stores the region selection in `localStorage` to bypass future lookups and reduce load times.
* **Shared State**: Shares state cleanly between the landing page's `PricingTable` and the dedicated `SecurePayPortal`.

### 3. Reusable SEO JSON-LD Component (`JsonLd`)
To follow Google SEO best practices, page-specific structured data schemas are injected server-side through a reusable wrapper in `src/components/json-ld.tsx`.
* **Zero Boilerplate**: Avoids cluttering page routes with raw script tags and `dangerouslySetInnerHTML` definitions.
* **Schemas Implemented**:
  * **Classes Hub**: Course, FAQPage, and MusicInstructionBusiness schemas.
  * **Contact Page**: ContactPage schema integrated with physical business addresses.
  * **Payment Portal**: CheckoutPage schema.
  * **Standard Policies**: WebPage schemas for policy listings.

### 4. Secure Checkout Wizard (`SecurePayPortal`)
A dedicated checkout helper in `src/components/secure-pay-portal.tsx` provides:
* SSL Secure Checkout indicators and trusted payment options badges.
* Interactive lists for selecting programs (Starter Online, Offline Studio, Global Program, Pro Coaching).
* A detailed **Order Summary** detailing what is included in the plan, billing frequency, and suitable target audience.
* Smart CTAs redirection links to Razorpay gates or direct WhatsApp pre-filled chat support draft links.

---

## 🚀 Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build and Compilation

To verify TypeScript and generate the production bundle:
```bash
npm run build
```

---

## 🔒 License & Copyright

**Copyright © 2026 Sayan Datta. All rights reserved.**

This repository is public for **educational and code inspection purposes only**. No part of this repository, including its code, design, layout, assets, images, or copywriting, may be:
* Cloned, modified, or hosted to run a live version of this website.
* Used for any commercial, non-commercial, or competing guitar learning, coaching, or music tuition services.
* Redeployed under your own name or identity. All branding, testimonials, logos, and likeness of "Shuvam Raha" and "Shuvam Raha Music" are proprietary.

For full license details, please see the [LICENSE](./LICENSE) file in the root of the repository.

