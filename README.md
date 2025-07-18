# 🤖 Malini AI Assistant – SMT Line Chatbot

Welcome to **Malini AI Assistant** – your smart, interactive chatbot for Machine Intelligence and IoT Notifications in SMT lines!  
This project demonstrates a modern, responsive React chatbot UI with voice (TTS/STT), beautiful avatars, and FAQ-driven answers.

<div align="center">
  <img src="src/assets/Padget.png" alt="Malini AI Logo" width="120" />
  <h2>Malini AI Assistant</h2>
  <p>Machine AI for Line Intelligence and Notification IoT</p>
</div>

---

## ✨ Features

- **Modern Chat UI** with Tailwind CSS
- **Voice Output** (Text-to-Speech, female voice)
- **Voice Input** (Speech-to-Text, Chrome only)
- **Animated Avatar** (GIF when speaking, PNG when idle)
- **FAQ Matching** for instant answers
- **Mobile Responsive** and deployable to Vercel
- **React Router** for multi-machine support

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><b>Idle State</b></td>
    <td align="center"><b>Speaking State</b></td>
  </tr>
  <tr>
    <td><img src="src/assets/malini.png" alt="Malini Idle" width="180"/></td>
    <td><img src="src/assets/malini.gif" alt="Malini Speaking" width="180"/></td>
  </tr>
</table>

---

## 🚀 Live Demo

> **Try it now:** [Your Vercel Deployment Link](https://your-vercel-app-url.vercel.app)

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/my-chatbot.git
cd my-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🖼️ Assets

- **Logo:**  
  ![Logo](src/assets/Padget.png)

- **Avatar (Idle):**  
  ![Malini Idle](src/assets/malini.png)

- **Avatar (Speaking):**  
  ![Malini Speaking](src/assets/malini.gif)

---

## 🧠 How It Works

- **FAQ Data:**  
  Located in [`src/data/spi.json`](src/data/spi.json) and [`src/data/aoi.json`](src/data/aoi.json).
- **Voice:**  
  Uses browser SpeechSynthesis API, auto-selects a female voice if available.
- **Avatar:**  
  PNG when idle, GIF when speaking.
- **Routing:**  
  `/SPI` and `/AOI` routes for different machine types.

---

## 📱 Mobile Friendly

- Fully responsive UI
- Voice features work best in Chrome (Android/iOS)

---

## 🗣️ Voice Troubleshooting

- **Voice not audible on mobile?**  
  - Make sure you interact (tap/send) before expecting speech.
  - Check device volume and mute settings.
  - Some browsers restrict autoplay of audio.

---

## ⚡ Deployment (Vercel)

To fix 404 errors on refresh, add a `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📂 Project Structure

```
src/
  assets/         # Images and GIFs
  componets/      # React components
  data/           # FAQ JSON data
  App.jsx         # Main app with routing
  main.jsx        # Entry point
  index.css       # Tailwind CSS
```

---

## 🙏 Credits

- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [lucide-react](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

## 💡 License

MIT License

---

<div align="center">
  <b>Made with ❤️ for better user experience</b>