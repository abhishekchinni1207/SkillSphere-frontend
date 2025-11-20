

#  SkillSphere – Frontend

Modern Online Learning Platform (React + Vite + Tailwind CSS)

SkillSphere Frontend is a fully functional online learning web application inspired by **Udemy, Coursera, and Skillshare**.
Users can browse courses, watch lessons, take quizzes, track progress, earn certificates, and manage enrolled courses.

---

##  Features

###  User Features

*  **Authentication** (Signup / Login)
*  **Browse All Courses**
*  **Video Lesson Player**
*  **Progress Tracking**
*  **Course Quiz System**
*  **Certificate Generation**
*  **Stripe Payment Checkout**
*  **My Courses Dashboard** (Paid Courses Only)

---

##  Tech Stack

| Layer              | Technology      |
| ------------------ | --------------- |
| Frontend Framework | React + Vite    |
| Styling            | Tailwind CSS    |
| State + Routing    | React Router    |
| API Calls          | Axios           |
| Animations         | Canvas Confetti |
| Deployment         | Vercel          |

---

##  Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CourseCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── StripeButton.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetails.jsx
│   │   ├── CoursePlayer.jsx
│   │   ├── QuizPage.jsx
│   │   ├── MyCourses.jsx
│   │   ├── Certificate.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── About.jsx
│   │   ├── Instructors.jsx
│   │   ├── PaymentSuccess.jsx
│   │   └── PaymentCancel.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

##  Installation & Setup

###  Clone the repo

```
git clone https://github.com/<your-username>/<your-frontend-repo>.git
cd frontend
```

###  Install dependencies

```
npm install
```

###  Configure environment

Create a **.env** file in the root:

```
VITE_BACKEND_URL=http://localhost:5000
```

###  Start development server

```
npm run dev
```

Your app will run at:
  [http://localhost:5173](http://localhost:5173)

---

##  Backend Integration

The frontend interacts with backend APIs:

| Feature          | Endpoint                             |
| ---------------- | ------------------------------------ |
| Login            | POST /auth/login                     |
| Signup           | POST /auth/signup                    |
| Course List      | GET /courses                         |
| Lessons          | GET /lessons/:courseId               |
| Progress         | POST /progress/update                |
| Quiz             | GET /quiz/:courseId                  |
| Certificate      | GET /certificates/:userId            |
| Payment Checkout | POST /stripe/create-checkout-session |

Be sure your backend is running before using the frontend.

---

##  Deployment on Vercel

### Push the frontend repo to GitHub

###  Go to  [https://vercel.com](https://vercel.com)

### Import GitHub Repository

### Add Environment Variable:

```
VITE_BACKEND_URL=https://your-render-backend-url
```

### Deployed 

---

## Screenshots (Add Your Own)

You can add images like:

```
![Home Page](./screenshots/home.png)
![Course Player](./screenshots/player.png)
```

---

##  Contributing

Feel free to fork this repository and submit pull requests.

---

## 📄 License

This project is **MIT Licensed** — free to use and modify.


