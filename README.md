# 💬 Frontend Chat Application

This is the **frontend** part of a test task for a real-time chat application built with **React + TypeScript**.

## 📦 Stack

- **React** (Functional components, Hooks)
- **TypeScript**
- **Tailwind CSS**
- **REST API** (for users and messages)
- **Vite** (fast dev environment)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git https://github.com/VolodiaCH/tt-chat-frontend.git
cd tt-chat-frontend.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

Create a `.env` file if needed and add the API URL (optional):

```env
VITE_API_URI=http://localhost:3000/api
```

### 4. Run the development server

```bash
npm run dev
```

The app should now be running at [http://localhost:5173](http://localhost:5173)

### Test Instructions
To test the WebSocket functionality, open two tabs of the application. Sign up two different users—one in each tab—and log them in. Then, open a chat between these two users in both tabs to test the real-time WebSocket communication.

### Additional Notes
The application is still a work in progress and has not been fully polished due to time constraints. The most important missing feature is proper handling of backend error messages on the sign-in and sign-up pages. Additionally, please note that security and design have only been implemented at a basic level.
