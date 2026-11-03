# 📚 BookNook – A Small Online Library

**Live Site:** https://booknook-client-rho.vercel.app

BookNook is a small online library. Add a book, borrow a book, return a book.

## Features

- **Secure authentication:** email and password register and login, plus Google login, built with BetterAuth and the MongoDB adapter
- **Private routes:** Add Book, My Books, My Borrows and Book Details need a login, and users come back to the page they wanted after login
- **Full book management:** add books with image upload (imgbb), edit them in a modal, and delete them with a confirm popup
- **Smart borrowing:** borrow a book for 7 days, copies go down and up automatically, "Not Available" shows at 0 copies, and the same book cannot be borrowed twice
- **JWT-protected API:** the Express server verifies the token on every protected route, and only a book's owner can edit or delete it
- **Dynamic Home page:** Swiper slider, the 6 newest books from the database, and extra sections
- **Modern UI:** sticker-style 3D design, dark and light mode, floating book covers, and smooth Framer Motion animations
- **Responsive design:** works on mobile, tablet and desktop, with a custom 404 page, loading spinners and toast messages

## Tech Stack

- **Client:** Next.js (App Router), Tailwind CSS, DaisyUI, Swiper.js, react-hot-toast
- **Auth:** BetterAuth, MongoDB adapter, JWT
- **Server:** Express.js, MongoDB (separate repository: booknook-server)

## Run Locally

```bash
npm install
npm run dev
```

Create a `.env.local` file with your own keys: `NEXT_PUBLIC_API_URL`, `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_IMGBB_KEY`, `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
