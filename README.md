# QuickTalk — AI-Powered Chatbot

**QuickTalk** is a lightweight, AI-powered chatbot built with **Next.js (App Router)** and deployed on **Vercel**. It provides a simple conversational interface powered by Google's Gemini 2.0 Flash model, wrapped in a sleek UI with markdown support.
<br>
This is an early version of the project, additional features and improvements are actively being planned.
<br>

---

## Planned Enhancements

- Persistent conversation history

- Faster response times via streaming or optimization

- UI/UX improvements (animations, mobile responsiveness, themes)

- Support for follow-up questions and better context retention

---

## Live Demo

- [View on Vercel](https://quick-talk-neon.vercel.app/)

---

## Features

- **Gemini API Integration** (via `@google/genai`)
- **Markdown-formatted messages**
- **Clean & modern UI**
- **Hosted on Vercel**
- **API Key securely handled server-side**

---

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS Modules](https://sass-lang.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Vercel Hosting](https://vercel.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Markdown](https://github.com/remarkjs/react-markdown)

---

## How It Works

1. The frontend sends a prompt to the server-side API route.
2. The backend uses the **Gemini API key**, securely stored as an environment variable on Vercel.
3. Gemini responds, and the message is returned to the client and displayed.

**No API key is exposed to the client** — all AI interaction happens server-side.

---

## Running Locally

> If you're cloning the repo and want to run it locally, you'll need your own Gemini API key.

### 1. Clone the repo

```bash
git clone https://github.com/OmarZalat/QuickTalk.git
cd quick-talk
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```bash
GEMINI_API_KEY=your-api-key-here
```

### 4. Run the dev server

```bash
npm run dev
```

---

## Author

Made by Omar Zalat
