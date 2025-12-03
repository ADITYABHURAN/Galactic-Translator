# 🌌 Galactic Translator

A full-stack web application that translates English text to Aurebesh (Star Wars Galactic Basic) and vice versa.

![Star Wars Theme](https://img.shields.io/badge/Theme-Star%20Wars-FFE81F?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)

## ✨ Features

- **Full Stack Architecture**: React frontend with Node.js/Express backend
- **Bidirectional Translation**: English ↔ Aurebesh conversion
- **Aurebesh Font Rendering**: Authentic Star Wars typography
- **Star Wars Themed UI**: Space wallpaper background with iconic colors
- **Copy to Clipboard**: One-click copy functionality
- **Smooth Animations**: Fade-in effects for translated output
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Keyboard Shortcuts**: Ctrl+Enter to translate quickly

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Custom Aurebesh font

### Backend
- Node.js
- Express
- CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 2. Install Frontend Dependencies

```powershell
cd frontend
npm install
```

## 🎮 Running the Application

You need to run both the backend and frontend servers.

### Start Backend Server (Terminal 1)

```powershell
cd backend
npm start
```

The backend API will run on `http://localhost:3001`

### Start Frontend Server (Terminal 2)

```powershell
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

Open your browser and navigate to `http://localhost:3000`

## 🎯 API Endpoints

### POST /translate
Translates English text to Aurebesh

**Request:**
```json
{
  "text": "Hello World"
}
```

**Response:**
```json
{
  "translated": "Herf-Esk-Leth-Leth-Osk Wesk-Osk-Resh-Leth-Dorn"
}
```

### POST /reverse
Translates Aurebesh back to English

**Request:**
```json
{
  "text": "Aurek-Usk-Resh-Esk-Besh-Esk-Senth-Herf"
}
```

**Response:**
```json
{
  "translated": "AUREBESH"
}
```

### GET /health
Health check endpoint

## 🔤 Aurebesh Character Map

| Letter | Aurebesh Name |
|--------|---------------|
| A      | Aurek         |
| B      | Besh          |
| C      | Cresh         |
| D      | Dorn          |
| E      | Esk           |
| F      | Forn          |
| G      | Grek          |
| H      | Herf          |
| I      | Isk           |
| J      | Jenth         |
| K      | Krill         |
| L      | Leth          |
| M      | Mern          |
| N      | Nern          |
| O      | Osk           |
| P      | Peth          |
| Q      | Qek           |
| R      | Resh          |
| S      | Senth         |
| T      | Trill         |
| U      | Usk           |
| V      | Vev           |
| W      | Wesk          |
| X      | Xesh          |
| Y      | Yirt          |
| Z      | Zerek         |

## 📸 Screenshots

The app features:
- Star Wars space background
- Iconic yellow (#FFE81F) and blue (#4A90E2) color scheme
- Aurebesh font for translated output
- Smooth fade-in animations
- Clean, modern card-based layout

## 🎨 Customization

### Change Background Image
Edit `frontend/src/App.css` line 2:
```css
background-image: url('YOUR_IMAGE_URL');
```

### Modify Colors
Colors are defined in `frontend/tailwind.config.js`:
- `star-wars-yellow`: #FFE81F
- `star-wars-blue`: #4A90E2

## 🐛 Troubleshooting

**CORS Errors**: Make sure the backend server is running on port 3001

**Font Not Loading**: Check your internet connection (Aurebesh font loads from CDN)

**Port Already in Use**: 
- Backend: Change PORT in `backend/server.js`
- Frontend: Change port in `frontend/vite.config.js`

## 📝 License

MIT License - Feel free to use this project for learning or personal use.

## 🌟 May the Force Be With You!

Enjoy translating to the language of a galaxy far, far away! ⭐
