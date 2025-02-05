# 🛒 GraphQL API for E-commerce

This is a **GraphQL API** for an e-commerce platform that allows clients to efficiently query **products, users, and orders**.

## 🚀 Features
- GraphQL API using **Apollo Server**.
- PostgreSQL database with **Prisma ORM**.
- Secure **JWT authentication** for users.
- Ability to **create, fetch, and manage products & orders**.
- Uses **Docker** for easy deployment.

---

## 🛠 Tech Stack
| Component      | Technology Used |
|---------------|----------------|
| Backend       | Node.js (Express, Apollo Server) |
| Database      | PostgreSQL |
| ORM          | Prisma |
| Authentication | JWT (JSON Web Tokens) |
| API Query Language | GraphQL |
| Deployment   | Docker, Kubernetes |

---

## 📌 **1. Installation**
### **🔹 Prerequisites**
- Install **Node.js** (`v18+`), **PostgreSQL**, and **Docker**.

### **🔹 Clone the Repository**
```bash
git clone https://github.com/shobhitkasturey/graphql-ecommerce.git
cd graphql-ecommerce
```
🔹 Install Dependencies
```bash
npm install
```
🔹 Configure Database
Create a .env file and add:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecommerce"
JWT_SECRET="your_jwt_secret_key"
```
Run Database Migrations:
```
npx prisma migrate dev --name init
```
📌 2. Running the Server
Start the API
```
node server.js
```
✅ Server running at: http://localhost:4000/

📌 3. API Endpoints
GraphQL Queries & Mutations
Access the GraphQL Playground at:
👉 http://localhost:4000/

📌 User Authentication
🔹 Sign Up a User
```
mutation {
  signUp(name: "John Doe", email: "john@example.com", password: "password123")
}
```
🔹 Login a User
```
mutation {
  login(email: "john@example.com", password: "password123")
}
```

📌 Products
🔹 Create a Product
```
mutation {
  createProduct(name: "Laptop", description: "Gaming laptop", price: 1200) {
    id
    name
    price
  }
}
```
🔹 Fetch All Products
```
query {
  products {
    id
    name
    price
  }
}
```
📌 Orders
🔹 Create an Order
```
mutation {
  createOrder(userId: "user-id", productId: "product-id", quantity: 2) {
    id
    user {
      name
    }
    product {
      name
    }
    quantity
  }
}
```
🔹 Fetch All Orders
```
query {
  orders {
    id
    user {
      name
    }
    product {
      name
    }
    quantity
  }
}
```
📌 4. Running with Docker
Build the Docker Image
```
docker build -t graphql-ecommerce .
```
Run the Container
```
docker run -p 4000:4000 --env-file .env graphql-ecommerce
```
✅ Now the API is running inside a Docker container.

📌 5. Deployment
To deploy on AWS/GCP with Kubernetes, follow these steps:

Build and push to Docker Hub
```
docker build -t your-dockerhub-username/graphql-ecommerce .
docker push your-dockerhub-username/graphql-ecommerce
```
Deploy with Kubernetes
```
kubectl apply -f k8s-deployment.yaml
```
✅ Your API is now live in production!

🎯 Final Summary
🛠 GraphQL API for E-commerce
🚀 Apollo Server + PostgreSQL + Prisma
🔐 Secure Authentication
📦 Dockerized Deployment
☁ Can be deployed on AWS/GCP/Kubernetes
💬 Feel free to contribute and improve the project! 😊
