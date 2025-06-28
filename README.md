# **Product Store**

This is a full-stack application for managing products in an online store.

---

## **Description**

This project demonstrates a complete product management system built with React and Node.js. It allows users to add, update, and delete products, featuring a modern UI and backend API with Neon DB integration.

---

## **Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact Information](#contact-information)

---

## **Installation**

Step-by-step instructions to install and set up the project locally:

```bash
# Clone the repository
git clone https://github.com/samluu206/LCQ_store.git

# Navigate to the project directory
cd LCQ_store

# Install backend dependencies
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

Create a `.env` file in the `backend` folder with the following:
(You can visit neon and arject documentation for more information)
```env
PORT=3000
PGHOST='[neon_hostname]'
PGDATABASE='[dbname]'
PGUSER='[user]'
PGPASSWORD='[password]'
ARCJET_KEY='[your arject key]'
```

---

## **Usage**

To start the app:

```bash
# Start backend
npm run dev

# Start frontend in a new terminal
cd ../frontend
npm run dev
```

Example Features:
- Add a product with name, price, and image
- Edit or delete existing products
- Data synced with PostgreDB backend

---

## **Contributing**

We welcome contributions!

- Fork the repository.
- Create a new branch (`git checkout -b feature/AmazingFeature`).
- Commit your changes (`git commit -m 'Add AmazingFeature'`).
- Push to your branch (`git push origin feature/AmazingFeature`).
- Open a pull request with a description of your changes.

---

## **Contact Information**

- GitHub: [samluu206](https://github.com/samluu206)
