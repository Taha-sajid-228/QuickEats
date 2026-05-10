# 🍔 QuickEats — Modern Food Delivery Platform

A full-stack food delivery website built with **vanilla HTML, CSS, JavaScript** on the
frontend and **Node.js + Express** serving dummy JSON data on the backend.

> No frameworks. No databases. No build step. Just open and run.

## ✨ Features

**Customer side** (14 pages): Landing, Login, Signup, OTP, Home, Restaurant Listing,
Restaurant Details, Cart, Checkout, Live Tracking, Reviews, My Orders, Profile, About.

**Vendor panel**: Dashboard, Menu Management, Orders Management.

**Rider panel**: Dashboard, Delivery Status.

**Admin panel**: Dashboard, Vendor Management, User & Review Moderation, Promotions.

Plus: cart with localStorage, search/filtering, form validation, modal popups,
responsive navbar, glassmorphism hero, smooth animations.

## 🚀 Run locally

```bash
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

The Express server serves both the frontend (from `/frontend`) and the API
(`/api/restaurants`, `/api/foods`, `/api/users`, `/api/orders`, `/api/reviews`,
`/api/promotions`).

## 📁 Folder structure

```
QuickEats/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── data/         (dummy JSON)
│   └── server.js
└── frontend/
    ├── pages/        (22 HTML pages)
    ├── css/
    ├── js/
    ├── components/   (shared header/footer)
    └── assets/
```

## 🎨 Design

- Primary Orange `#FF6B00`, Dark `#111827`, BG `#F9FAFB`
- Inter + Poppins via Google Fonts
- Rounded cards, soft shadows, hover lift, glassmorphism
- Fully responsive (mobile / tablet / desktop)

## 🔑 Demo credentials

Use the following dummy emails to test different dashboards (any password works):

- **Customer:** sara@example.com / ezza@example.com
- **Vendor:** owner@burgerbarn.com
- **Rider:** hamza@quickeats.com
- **Admin:** admin@quickeats.com / taha@quickeats.com

OTP page accepts `1234`.
