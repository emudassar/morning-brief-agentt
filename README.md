# 🌅 Morning Brief AI

Morning Brief AI is a full-stack web application that generates personalized daily briefings using AI. It combines weather updates, news, calendar information, and user preferences into a concise morning summary. Users can customize their briefing and receive it through the web dashboard and Telegram.

## 🚀 Features

- AI-generated personalized briefings
- User authentication (JWT)
- Weather and news integration
- User preference management
- Telegram notifications
- Responsive React frontend
- Node.js & Express backend
- MongoDB database

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI:** Google Gemini API

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/emudassar/morning-brief-agentt.git
cd morning-brief-agentt
```

### 2. Install dependencies

**Frontend**

```bash
cd client
npm install
```

**Backend**

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`, then fill in your keys (MongoDB, Gemini, Telegram, OpenWeather, NewsData).

### 4. Run the application

**Backend**

```bash
cd server
npm run dev
```

**Frontend**

```bash
cd client
npm run dev
```

The frontend will be available at **http://localhost:5173** and the backend at **http://localhost:5000**.


## ☁️ Deployment

| Part | Host | Folder | Notes |
|---|---|---|---|
| Frontend | Vercel | `client/` | Set `VITE_API_URL` to the Render backend URL |
| Backend + scheduler + Telegram bot | Render | `server/` | Configured by `render.yaml`; set secrets in the Render dashboard |

The backend must stay awake for scheduled briefings. Render's free plan sleeps after ~15 minutes idle, so use the Starter plan for reliable delivery.
