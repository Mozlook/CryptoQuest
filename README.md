# 🧩 React Puzzle App

A dynamic puzzle-based web application built with **React**, featuring authentication, progress tracking, and dynamic component loading.

![React Puzzle App Screenshot](https://i.imgur.com/zUWd3hE.png)

---

## 🚀 Features

- 🔐 **User Authentication** (Login & Register)
- 🧠 **Puzzle System** with dynamic loading (`React.lazy`)
- 📈 **Progress Tracking** via external API
- 📨 **Answer Submission** and validation
- 📋 Modular component structure
- 🌐 REST API integration using `axios`
- 🎨 Styled with custom CSS (`index.css`)

---

## 🛠️ Technologies Used

- **React**
- **Axios**
- **React Suspense + Lazy**
- **Session Storage** for token handling
- **Custom REST API**

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── LoginMain.jsx
│   ├── SubmitForm.jsx
│   ├── About.jsx
│   ├── IssueForm.jsx
│   └── puzzles/
├── App.jsx
├── index.css
└── index.js
```

---

## 🔧 Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/react-puzzle-app.git
cd react-puzzle-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
# or
npm start
```

4. **Configure the API:**

> The app connects to `https://api.mmozoluk.com`. Ensure your backend is running and accessible.

---

## 🔐 Authentication

- Tokens are saved in `sessionStorage`
- On login, the user receives a token used for future API requests
- Progress is loaded automatically if a valid token exists

---

## 📡 API Endpoints

- `GET /api/sprawdz-progres/` → Fetch user progress
- `POST /api/sprawdz-odpowiedz/` → Validate puzzle answer

Headers:

```http
Authorization: Token <your_token_here>
```

---

## 🧠 Contribution

Want to contribute?

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a pull request 🎉

---

## 📃 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

**Author:** Your Name  
📧 [mikolaj.moozoluk@gmail.com]  
🌍 [mmozoluk.com](https://mmozoluk.com)

---

## ⭐️ Star This Project

If you like it, don’t forget to ⭐ the repo to support the project!
