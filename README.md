# 📚 BookNook – A Small Online Library

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-DaisyUI-38BDF8?logo=tailwindcss&logoColor=white)
![BetterAuth](https://img.shields.io/badge/Auth-BetterAuth-7C3AED)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

> ✨ **Add a book. Borrow a book. Return a book.**
> BookNook is a small online library where readers share books and borrow them for a few days.

## 🔗 Links

| | |
|---|---|
| 🌐 **Live Site** | https://booknook-client-rho.vercel.app |
| 🖥️ **Server Repository** | https://github.com/mdimranuddin/booknook-server |
| ⚙️ **Live API** | https://booknook-server-one.vercel.app |

## ✨ Features

- 🔐 **Secure authentication:** email and password register and login, plus Google login, built with BetterAuth and the MongoDB adapter
- 🛡️ **Private routes:** Add Book, My Books, My Borrows and Book Details need a login, and users come back to the page they wanted after login
- 📖 **Full book management:** add books with image upload (imgbb), edit them in a modal, and delete them with a confirm popup
- 🤝 **Smart borrowing:** borrow a book for 7 days, copies go down and up automatically, "Not Available" shows at 0 copies, and the same book cannot be borrowed twice
- 🔑 **JWT-protected API:** the Express server verifies the token on every protected route, and only a book's owner can edit or delete it
- 🏠 **Dynamic Home page:** Swiper slider, the 6 newest books from the database, a moving text strip, and extra sections
- 🎨 **Modern UI:** sticker-style 3D design, floating book covers, tilt-on-hover cards and smooth Framer Motion animations
- 🌗 **Dark and light mode:** one click in the Navbar, and your choice is remembered
- 📱 **Responsive:** works on mobile, tablet and desktop, with a custom 404 page, loading spinners, page titles and toast messages

## 🗺️ Pages

| Route | Access | What it does |
|---|---|---|
| `/` | 🌍 Public | Slider, new arrivals, categories, how borrowing works |
| `/books` | 🌍 Public | All books in a grid |
| `/books/:id` | 🔒 Private | Book details and the Borrow button |
| `/add-book` | 🔒 Private | Add a book with an image upload |
| `/my-books` | 🔒 Private | Edit and delete your own books |
| `/my-borrows` | 🔒 Private | Borrowed books and Return Book |
| `/profile` | 🔒 Private | Your profile |
| `/login`, `/register` | 🌍 Public | Email and Google authentication |
| `/privacy` | 🌍 Public | Privacy policy |

## 🧰 Tech Stack

| Area | Tools |
|---|---|
| 🖥️ **Client** | Next.js (App Router), Tailwind CSS, DaisyUI, Swiper.js, Framer Motion, Lucide icons, react-hot-toast |
| 🔐 **Auth** | BetterAuth, MongoDB adapter, Google OAuth, JWT |
| ⚙️ **Server** | Express.js, MongoDB (separate repository: `booknook-server`) |
| 🖼️ **Images** | imgbb |
| ☁️ **Hosting** | Vercel |

## 🧭 How It Works

1. 👤 A user registers or signs in, and BetterAuth creates a session in MongoDB.
2. 🎟️ For protected actions, the client asks BetterAuth for a **JWT token**.
3. 📡 The client sends the token to the Express API in the `Authorization` header.
4. ✅ The server checks the token against the public keys of the client, then does the action.
5. 🗄️ MongoDB stores books and borrows. Copies change with `$inc` when a book is borrowed or returned.

## 🚀 Run Locally

```bash
git clone https://github.com/mdimranuddin/booknook-client.git
cd booknook-client
npm install
npm run dev
```

Create a `.env.local` file with your own values:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

You also need the server running. See the [server repository](https://github.com/mdimranuddin/booknook-server).

## 📁 Project Structure

```text
app/          pages and routes (App Router)
components/   reusable UI parts (Navbar, BookCard, forms, tables)
lib/          BetterAuth setup and the API helper
proxy.js      protects the private routes
```

## 👨‍💻 Author

**Mohammad Imran Uddin**
🐙 GitHub: [@mdimranuddin](https://github.com/mdimranuddin)

Built as a learning project for the Programming Hero Full Stack Web Engineering course. 💜
