# 🛒 FakeStore Client Application

This is a modern, responsive frontend web application built as a test assignment for a Frontend Developer position. It integrates with the [FakeStore API](https://fakestoreapi.com) to provide a rich e-commerce interface including product lists, filters, product details, favorites management, and shopping cart functionality.

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg?logo=vite)](https://vite.dev)
[![Mantine UI](https://img.shields.io/badge/Mantine-9.3-teal.svg?logo=mantine)](https://mantine.dev)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange.svg)](https://zustand.docs.pmnd.rs/getting-started/introduction)
[![React Query](https://img.shields.io/badge/React_Query-5.101-red.svg?logo=reactquery)](https://tanstack.com/query/latest)
[![Storybook](https://img.shields.io/badge/Storybook-10.0-ff69b4.svg?logo=storybook)](https://storybook.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-yellow.svg?logo=vitest)](https://vitest.dev/)

---

## 🌟 Key Features

- 🛍️ **Product Catalog & Filtering**:
  - Browse available products with dynamically populated category filters.
  - Price sorting: sort items from cheapest-to-expensive and vice-versa.
- 📄 **Detailed View**: Access full specifications, image, pricing, and category for individual items.
- 💖 **Favorites System**: Bookmark preferred products (state is persisted locally across page reloads).
- 🛒 **Shopping Cart**:
  - Add items to the cart.
  - Control quantities (increment, decrement) and delete items.
  - Subtotal automatically calculated based on items in the cart.
- 🔐 **User Authentication**: Login mock capability using the API endpoint.
- 🌓 **Themes & Color Scheme**: Built-in Mantine support for light/dark theme switching.
- 🚀 **Performance & UX**: Loading overlays, error boundaries, skeleton loaders, and interactive components.

---

## 🛠️ Tech Stack & Architecture Decisions

This project follows modern frontend practices by separating local UI state, persistent store state, and server state:

1. **React 19 & Vite 8**: Leverages the latest React updates alongside Vite's ultra-fast bundling and development server.
2. **Mantine UI v9**: Chosen for robust, accessible UI components, theme customizability, and default dark/light mode hooks.
3. **Zustand v5 (Local State)**:
   - Slice-based architecture for clean code separation (`authSlice`, `cartSlice`, `favoritesSlice`).
   - Integrated with **Immer** middleware for simple, boilerplate-free state mutations.
   - Integrated with **Persist** middleware to save the cart state and favorited items directly inside `localStorage` (`app-storage`).
4. **TanStack React Query v5 (Server State)**: Used for data fetching, automatic caching, revalidation, and loading states for product listings, eliminating unnecessary API calls.
5. **Axios**: Custom configured HTTP client (`apiClient`) with standard headers and `baseURL`.
6. **Code Quality**:
   - **Oxlint & Oxfmt**: Incredibly fast Rust-powered linter and formatter.
   - **Stylelint**: Ensures CSS conventions and styles format compliance.
   - **Vitest & React Testing Library**: Setup for unit and integration testing.
   - **Storybook 10**: Component documentation and sandbox testing environment.

---

## 📡 API & Integration Details

The app communicates with the **FakeStoreAPI** via a central `apiClient` (`src/settings/axios/apiClient.ts`).

### Implemented Endpoints:

| Endpoint | Method | Description | Used in Component / Page |
| :--- | :---: | :--- | :--- |
| `/auth/login` | `POST` | User authentication & token generation | `src/pages/Auth/Login` |
| `/products` | `GET` | Fetches list of all products | `src/pages/Products` |
| `/products/:id` | `GET` | Fetches details for a single product | `src/pages/ProductCard` |
| `/products` | `POST` | Add a new product (mock action) | `productsApi` client module |
| `/products/:id` | `PUT` | Update product details (mock action) | `productsApi` client module |
| `/products/:id` | `DELETE` | Delete a product (mock action) | `productsApi` client module |

---

## 📁 Directory Structure

```text
src/
├── api/                  # API client modules (productsApi, authApi, cartApi)
├── assets/               # Static assets (images, icons)
├── components/           # Reusable UI components (Header, Footer, ColorSchemeToggle, etc.)
├── constants/            # Application constants
├── hooks/                # Custom React hooks
├── layouts/              # Layout wrappers (Main Layout with Header/Footer/Outlet)
├── pages/                # Page views (Products list, Product details, Cart, Favorites, Login, NotFound)
├── routes/               # Routing configuration & router path definitions
├── settings/             # Base configurations (Axios clients, Mantine theme setup)
├── store/                # Zustand slices, types, and store initialization
├── types/                # TypeScript type & interface declarations
├── utils/                # Utility helper functions
├── App.tsx               # Root App component providing Providers (Mantine, React Query, Router)
└── main.tsx              # React mounting entrypoint
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+ recommended, `.nvmrc` is configured)
- Yarn package manager (Yarn v4 modern)

### Installation

Install the project dependencies:
```bash
yarn install
```

### Development Server

Run the development server locally:
```bash
yarn dev
```

### Build

Compile the production-ready build:
```bash
yarn build
```

### Running Tests

Run all unit tests:
```bash
yarn vitest
```

### Running Storybook

Launch the Storybook dashboard:
```bash
yarn storybook
```

### Code Formatting & Linting

Run Oxlint, Stylelint, and Typecheck validations:
```bash
yarn test
```

Or write formatter changes directly:
```bash
yarn format:write
```
