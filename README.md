Here is the live link - https://bharat-fd-test-git-main-chirags-projects-b53e7537.vercel.app/

# FAQ - BharatFDTest

A multilingual FAQ management system that allows users to create and retrieve FAQs with language translation support. Built with Node.js, MongoDB, Redis, and Quill.js.

## Features
- Create FAQs with automatic translation
- Retrieve FAQs in different languages
- HTML formatting preservation with WYSIWYG support
- Backend caching using Redis
- Fully tested backend APIs
- Docker integration for easy deployment

## Project Structure
```
BharatFDTest/
│── backend/      # Node.js backend (Express, MongoDB, Redis)
│── frontend/     # React frontend (Quill.js for WYSIWYG editor)
│── docker/       # Docker setup for containerization
```

## Installation

### Backend Setup
```
cd backend
npm install  # Install dependencies
npm start    # Start the backend server
```

### Frontend Setup
```
cd frontend
npm install  # Install dependencies
npm run dev  # Start the frontend
```

### Docker Setup
To run the application using Docker, execute the following commands:
```
docker-compose up --build  # Build and start the containers
docker-compose down        # Stop and remove containers
```

## API Endpoints

### Create FAQ
Endpoint: POST /api/faqs

### Get FAQs
Endpoint: GET /api/faqs?lang=fr

