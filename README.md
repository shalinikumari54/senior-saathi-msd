# Senior Saathi

A comprehensive MERN stack platform connecting seniors with compassionate volunteers for emotional and practical support.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Role-Based Dashboards**: Separate interfaces for seniors, volunteers, and administrators
- **Request Management**: Seniors can create help requests, volunteers can accept and complete them
- **Feedback System**: Users can provide feedback on completed services
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Dynamic dashboard with request status tracking

## 🛠 Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend

- **React.js** (JSX only, no TypeScript)
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling

## 📁 Project Structure

```
senior-saathi/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── requestController.js
│   │   └── feedbackController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roleCheck.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Request.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── requests.js
│   │   └── feedback.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Card.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Feedback.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd senior-saathi
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm start
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Environment Variables

Create a `.env` file in the backend directory with:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/senior-saathi?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

For the frontend, create a `.env` file in the frontend directory (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Requests

- `GET /api/requests` - Get requests (filtered by role)
- `GET /api/requests/:id` - Get request by ID
- `POST /api/requests` - Create new request (Senior only)
- `PUT /api/requests/:id` - Update request
- `PUT /api/requests/:id/accept` - Accept request (Volunteer only)
- `PUT /api/requests/:id/complete` - Complete request (Volunteer only)
- `DELETE /api/requests/:id` - Delete request

### Feedback

- `GET /api/feedback` - Get all feedback (Admin only)
- `GET /api/feedback/request/:requestId` - Get feedback for request
- `POST /api/feedback` - Submit feedback
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback

## 🎨 Design System

- **Colors**: Soft pastel palette with primary blue (#3B82F6)
- **Typography**: Poppins font family
- **Components**: Reusable Card, Button, and Form components
- **Responsive**: Mobile-first design approach

## 🔐 User Roles

1. **Senior**: Can create requests, view their requests, submit feedback
2. **Volunteer**: Can view available requests, accept/complete requests
3. **Admin**: Full access to all users, requests, and feedback

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Vercel)

1. Set environment variables in your deployment platform
2. Deploy the backend first
3. Update frontend API URL to point to deployed backend

### Frontend Deployment (Netlify/Vercel)

1. Build the frontend: `npm run build`
2. Deploy the `build` folder
3. Set `REACT_APP_API_URL` environment variable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, email info@seniorsaathi.com or contact us through the website.

---

Made with ❤️ for seniors and volunteers
