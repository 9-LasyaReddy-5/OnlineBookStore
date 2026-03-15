# 📚 Book Management System

A full-stack web application for managing a book inventory system built with Spring Boot and React.

## 🚀 Features

### Backend (Spring Boot)
- ✅ RESTful API for book CRUD operations
- ✅ MySQL database integration (Aiven Cloud)
- ✅ Spring Security with CORS configuration
- ✅ JPA/Hibernate ORM
- ✅ Input validation and error handling

### Frontend (React + Vite)
- ✅ Modern responsive UI with glassmorphism design
- ✅ Real-time book management (Create, Read, Update, Delete)
- ✅ Search functionality by title or author
- ✅ Sortable columns (Title, Author, Price, Stock)
- ✅ Modal forms for adding/editing books
- ✅ Clean, professional interface

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 4.0.3
- **Database**: MySQL (Aiven Cloud)
- **ORM**: Hibernate JPA
- **Security**: Spring Security
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS with modern design
- **HTTP Client**: Fetch API

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL database (configured for Aiven Cloud)

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

3. The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5179` in your browser

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/{id}` | Update an existing book |
| DELETE | `/api/books/{id}` | Delete a book |

### Sample Book Object
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "price": 29.99,
  "stock": 10
}
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile devices
- **Search & Filter**: Find books by title or author
- **Sorting**: Click column headers to sort data
- **Modal Forms**: Clean interfaces for data entry
- **Real-time Updates**: Changes reflect immediately
- **Professional Styling**: Modern gradient backgrounds with glassmorphism effects

## 🔒 Security Features

- Spring Security integration
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Secure database connections with SSL

## 📊 Database Schema

```sql
CREATE TABLE book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);
```

## 🧪 Testing

### API Testing
You can test the API endpoints using:
- Postman
- curl commands
- Browser (for GET requests)

### Example curl commands:
```bash
# Get all books
curl http://localhost:8080/api/books

# Add a new book
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Author Name","price":19.99,"stock":5}'
```

## 🚀 Deployment

### Backend Deployment
- Build the JAR file: `./mvnw clean package`
- Deploy to any servlet container or cloud platform

### Frontend Deployment
- Build for production: `npm run build`
- Deploy the `dist` folder to any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Developed as a mini project demonstrating full-stack development skills with modern web technologies.

---

**Note**: This application uses Aiven Cloud MySQL database. For local development, you can modify the database configuration in `application.properties`.