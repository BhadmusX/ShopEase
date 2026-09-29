# ShopEase

ShopEase is a full-stack shopping cart application with a React frontend and an Express/MongoDB backend.

## Features

### Customer features

- User sign up, sign in, and sign out
- Protected customer pages
- Browse products from the store and external product data
- Add products to a cart and change quantities
- Remove items and clear the cart
- Save products to a wishlist
# ShopEase Frontend

The React and Vite frontend for ShopEase.

## Features

- User sign up, sign in, and sign out
- Protected customer pages
- Browse products
- Add products to a cart and change quantities
- Remove cart items and clear the cart
- Save products to a wishlist
- Stripe checkout flow
- Admin product management pages
- Analytics cards and a seven-day revenue chart
- Product image previews and updates

## Technologies

- React
- Vite
- React Router
- CSS Modules
- Lucide React icons
- React Hot Toast

## Requirements

- Node.js
- A running ShopEase backend

## Environment variables

Create `Shopping-Cart/.env` with:

```env
VITE_API_URL=http://localhost:5000
```

Do not commit real secrets to the repository.

## Running the frontend

```bash
cd Shopping-Cart
npm install
npm run dev
```

Vite normally runs on `http://localhost:5173`. If that port is busy, Vite prints the alternate port it uses.

## Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
npm test          # Run Vitest
```

## Notes

- The analytics page loads summary data and the last seven days of sales data.
- Admin links and pages require a user with the `admin` role.
- New product images are stored and delivered by Cloudinary; the backend API returns their image URLs to the frontend.
- Cloudinary credentials belong only in the backend environment and are not needed in the frontend `.env` file.
- Existing product records with local `/uploads` paths are not automatically migrated and may need separate migration.
