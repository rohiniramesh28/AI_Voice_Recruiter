# 🎙️ AI Interview Companion – Intelligent Voice-Based Mock Interview Platform

An AI-first platform designed to simulate real-world interviews through live voice interactions. Users can log in, take part in voice-based interviews, and receive AI-driven feedback instantly — powered by **Google Gemini Pro** and **OpenAI GPT**.

---

## 🌟 Key Highlights

### 🔐 Secure User Access
- Role-based login system using **Supabase Auth**.
- Email authentication with built-in role management for candidates and admins.

### 🧑‍💼 Admin (Clerk) Portal
- Manage user profiles and mock interview schedules.
- Add/update interview questions dynamically.
- Monitor user responses and feedback history.

### 🧪 Interview Flow
- **Session Creation**: Start new mock interviews with ease.
- **Live Voice Interviews**: Users respond to questions in real-time using **Vapi.ai** integration.
- **Instant Feedback**: GPT + Gemini Pro evaluate spoken answers and provide actionable insights immediately.

### 🧾 Backend with Supabase
- Integrated with three primary database tables:
  1. `users` – Authentication and user role management.
  2. `interview_questions` – AI-generated questions using Gemini Pro.
  3. `interview_feedback` – GPT-generated feedback stored per session.

---
## 🛠️ Technology Stack

| Tech           | Purpose                              |
|----------------|--------------------------------------|
| Supabase       | Authentication & Backend Database    |
| Next.js        | React-based Frontend Framework       |
| Vapi.ai        | Real-Time Voice Input & Output       |
| Gemini Pro API | AI-Driven Interview Question Creator |
| OpenAI GPT     | Natural Language Feedback Generation |
| React + Tailwind CSS | UI Styling and Layout         |
| Shadcn         | Form Handling & Component Library    |

---

## ⚙️ Getting Started

```bash
git clone https://github.com/rohini/ai-interviewer.git
cd ai-interviewer
npm install
npm run dev
```

## 🚀 Future work

- Sync with Google Calendar for Interview Scheduling
- Exportable Feedback in PDF Format
- Support for Multiple Languages

## 🤝 Contribute
- Open to suggestions and contributions!
- Fork this project, improve it, and send in your pull requests.
- Let’s build the future of interview preparation together.

Crafted with by Rohini R, Sivanesan B 

---



