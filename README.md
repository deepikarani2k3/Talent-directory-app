# 💼 Talent Directory App

A full-stack web application for managing and discovering talented professionals. Built with React, Redux, Node.js, Express, and MongoDB.

## 🌟 Features

- ✅ **View Talents**: Display all registered talents in a beautiful card layout
- ✅ **Add New Talent**: Form to add new talents with validation
- ✅ **Filter by Skill**: Search and filter talents by their skills in real-time
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Modern UI**: Beautiful gradient design with smooth animations
- ✅ **Real-time Updates**: No page refresh required when adding new talents
- ✅ **Error Handling**: Comprehensive error validation and user feedback

## 🏗️ Project Structure

```
talent-directory/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── controllers/
│   │   └── talentController.js  # Business logic for talents
│   ├── models/
│   │   └── Talent.js            # MongoDB schema
│   ├── routes/
│   │   └── talentRoutes.js      # API endpoints
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Express server entry point
│
└── frontend/
    ├── public/
    │   └── index.html           # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── TalentForm.js     # Add talent component
    │   │   ├── TalentList.js     # Display talents component
    │   │   └── SkillFilter.js    # Filter talents component
    │   ├── redux/
    │   │   ├── store.js          # Redux store configuration
    │   │   └── talentSlice.js    # Redux slice for talents
    │   ├── styles/
    │   │   ├── App.css           # Main app styles
    │   │   ├── TalentForm.css    # Form component styles
    │   │   ├── TalentList.css    # List component styles
    │   │   └── SkillFilter.css   # Filter component styles
    │   ├── App.js                # Main App component
    │   ├── index.js              # React entry point
    │   └── .env                  # Frontend environment variables
    ├── .gitignore
    ├── package.json
    └── README.md

```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Dotenv** - Environment variable management
- **CORS** - Cross-origin request handling
- **Validator** - Input validation

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React-Redux** - Redux integration
- **Axios** - HTTP client
- **CSS3** - Styling (no external UI library needed)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (locally installed or cloud instance like MongoDB Atlas)

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
cd talent-directory
```

### Step 2: Setup Backend

#### 2.1 Navigate to backend directory
```bash
cd backend
```

#### 2.2 Install dependencies
```bash
npm install
```

#### 2.3 Configure environment variables
Edit the `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/talent-directory
PORT=5001
NODE_ENV=development
```

**Note**: 
- If using MongoDB locally, keep the URI as is (ensure MongoDB is running)
- If using MongoDB Atlas, replace with your connection string:
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/talent-directory?retryWrites=true&w=majority
  ```

#### 2.4 Start the backend server
```bash
npm run dev
```

The backend server will run on `http://localhost:5001`

### Step 3: Setup Frontend

#### 3.1 Open a new terminal and navigate to frontend directory
```bash
cd frontend
```

#### 3.2 Install dependencies
```bash
npm install
```

#### 3.3 Configure environment variables
The `.env` file is already configured:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

#### 3.4 Start the frontend development server
```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 📚 API Endpoints

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### 1. Get All Talents
```
GET /talents
```
**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "skills": ["React", "Node.js", "MongoDB"],
      "experience": 5,
      "createdAt": "2025-11-11T10:30:00.000Z"
    }
  ]
}
```

#### 2. Filter Talents by Skill
```
GET /talents?skill=React
```
**Query Parameters:**
- `skill` (string) - Skill to filter by (case-insensitive)

**Response:** Same as Get All Talents

#### 3. Add New Talent
```
POST /talents
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "skills": ["Python", "Django", "PostgreSQL"],
  "experience": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Talent added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "skills": ["Python", "Django", "PostgreSQL"],
    "experience": 3,
    "createdAt": "2025-11-11T10:35:00.000Z"
  }
}
```

## ✅ Input Validation

### Talent Model Validation Rules

| Field | Type | Validation |
|-------|------|-----------|
| name | String | Required, 2-50 characters |
| email | String | Required, unique, valid email format |
| skills | Array | Required, at least 1 skill |
| experience | Number | Required, 0-70 years |

## 🎨 User Interface Components

### 1. **TalentForm Component**
- Form to add new talents
- Real-time validation
- Success/error messages
- Loading state during submission

### 2. **SkillFilter Component**
- Input field to search by skill
- Case-insensitive filtering
- Clear button to reset filter
- Shows current active filter

### 3. **TalentList Component**
- Displays talents in a responsive grid layout
- Shows talent name, email, skills, and experience
- Loading spinner while fetching data
- Empty state message when no talents available
- Error handling with appropriate messages

## 🎯 How to Use

### Adding a Talent
1. Fill in all fields in the "Add New Talent" form
2. Skills should be comma-separated (e.g., "React, Node.js, MongoDB")
3. Click "Add Talent" button
4. Success message confirms the talent was added
5. The talent appears at the top of the list automatically

### Filtering by Skill
1. Type a skill name in the "Filter by Skill" input box
2. The list automatically updates to show matching talents
3. Click "Clear" button to remove the filter

### Viewing Talents
- All talents are displayed in a card format
- Each card shows: Name, Email, Skills, Experience, and Date Added
- Cards have a hover effect for better interactivity

## 🧪 Testing the App

### Sample Data to Test

Add these talents to test the app:

**Talent 1:**
- Name: Alice Johnson
- Email: alice@example.com
- Skills: React, JavaScript, CSS
- Experience: 4

**Talent 2:**
- Name: Bob Wilson
- Email: bob@example.com
- Skills: Node.js, Express, MongoDB
- Experience: 6

**Talent 3:**
- Name: Carol Davis
- Email: carol@example.com
- Skills: Python, Django, PostgreSQL
- Experience: 5

Then test filtering:
- Search "React" - should show Alice
- Search "Node.js" - should show Bob
- Search "Python" - should show Carol

## 📱 Responsive Design

The application is fully responsive and works on:
- 🖥️ Desktop (1920px and above)
- 💻 Laptop (1024px - 1920px)
- 📱 Tablet (768px - 1024px)
- 📲 Mobile (320px - 768px)

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or your connection string is correct
- For MongoDB Atlas, check your IP whitelist and username/password

**Port Already in Use:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000  # Windows
kill -9 <PID>
```

**CORS Error:**
- Ensure backend is running on port 5000
- Check frontend `.env` has correct API_URL

### Frontend Issues

**Cannot Fetch Data:**
- Verify backend is running on port 5000
- Check Network tab in browser DevTools
- Ensure `REACT_APP_API_URL` is correctly set in `.env`

**Styling Issues:**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart npm: `npm start`

## 📝 Talent Model Schema

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail
  },
  skills: {
    type: [String],
    required: true,
    minItems: 1
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
    max: 70
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🔐 Security Considerations

- ✅ Input validation on both frontend and backend
- ✅ Email format validation
- ✅ Unique email constraint in database
- ✅ CORS enabled for safe cross-origin requests
- ✅ Error messages don't expose sensitive information

## 📦 Production Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect to Heroku/Railway/Render
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Connect to Vercel/Netlify
3. Set API URL to production backend
4. Deploy

## 📄 License

This project is open source and available under the MIT License.

## 👥 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the code comments
3. Open an issue on GitHub

---

**Happy Talent Hunting! 🚀**
