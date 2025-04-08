# 🛒 Cloud Marketplace

A minimal full-stack web application where **sellers** can list products and **buyers** can browse/purchase. Built for learning and showcasing Docker, MySQL, API design, and frontend/backend integration.

---

## 📁 Project Structure

Cloud-Marketplace/ │ ├── cloud-marketplace-backend/ # Express.js backend + MySQL ├── cloud-marketplace-frontend/ # React.js + Tailwind CSS frontend

---

## 🚀 Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | React.js, Tailwind CSS   |
| Backend     | Node.js, Express.js      |
| Database    | MySQL                    |
| Auth        | JWT-based auth           |
| Dev Tools   | Docker, Postman          |

---

## 🧑‍💻 How to Run the Project Locally

### 1️⃣ Backend (Express + MySQL)

```bash
cd cloud-marketplace-backend

# Install dependencies
npm install

# Create `.env` file
cp .env.example .env

# Update DB credentials in .env
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=yourpassword
# DB_NAME=cloud_marketplace

# Start backend server
npm run dev

### 1️⃣ Backend (Express + MySQL)

cd cloud-marketplace-frontend

# Install dependencies
npm install

# Start frontend
npm start
