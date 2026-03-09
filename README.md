<h1>Blogging App</h1>

A modern full-stack blogging platform that allows users to create, publish, and manage blog posts. The application provides authentication, blog management, and an intuitive user interface for both writers and readers.
This project demonstrates full-stack web development using modern technologies including React/Next.js, Node.js, and MongoDB.

<h2>Features</h2>

- User authentication (login / register)
- Create, edit, and delete blog posts
- Browse and search blogs
- Comment and rate blogs
- Responsive UI for desktop and mobile
- Role-based functionality for users
- Rating or interaction with blog posts
- Secure API communication
- Real-time or dynamic data fetching

<h2>Tech Stack</h2>
<h3>Frontend</h3>

- Next.js
- React
- TypeScript / JavaScript
- Ant Design (UI components)
- Tailwind css
- TinyMCE (Text editor)
- Redux toolkit

<h3>Backend</h3>

- Node.js
- Express.js
- MongoDB
- Gemini API
- Cloudinary

<h3>Other Tools</h3>

- JWT Authentication
- REST API
- Vercel / cloud deployment

<h2>Installation</h2>

1. Clone the repository
```
git clone https://github.com/amitbaniya/Blogging-App.git
cd Blogging-App
```
2. Install dependencies

Frontend
```
cd frontend
npm install
```

Backend
```
cd backend
npm install
```

<h2>Environment Variables</h2>

Create a .env file in the backend folder.

Example:
``` 
PORT=5000
MONGO_URI=YOUR_MONGO_URI 
JWT_SECRET=YOUR_JWT_SECRET
NODE_ENV=production

CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
FRONTEND_URL=YOUR_FRONT_END_URL

MAIL_API_KEY=YOUR_BREVO_API_KEY
EMAIL_USER=YOUR_BREVO_EMAIL
EMAIL_PASS=YOUR_BREVO_PASS

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Create a .env file in the frontend folder.

Example:
``` 
NEXT_PUBLIC_API_URL=YOUR_API_URL
NEXT_PUBLIC_TINYMCE_API_KEY=YOUR_TINYMCE_API_KEY
NEXT_PUBLIC_DEFAULT_CLOUDINARY_IMAGE=YOUR_DEFAULT_CLOUDINARY_IMAGE_URL
```

<h2>Running the Application</h2>

Start backend:
```
npm run dev
```

Start frontend:
```
npm run dev
```

The app should now run at:
```
http://localhost:3000
```

<h2>Author</h2>

Amit Baniya

GitHub
https://github.com/amitbaniya

