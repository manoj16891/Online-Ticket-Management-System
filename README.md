# 🚌 Online Ticket Management System

A full-stack **Online Ticket Management System** that allows users to search, book, and manage travel tickets with **real-time seat selection**, **secure Stripe payments**, and **live updates using Socket.IO**.

This project is built with **scalable REST APIs**, **JWT authentication**, **MongoDB**, and **Stripe Webhooks**, following real-world production standards.

---

## 🚀 Features

### 👤 User (Passenger)
- User registration & login (JWT authentication)
- Search travels by source & destination
- Filter by price, time, and seat availability
- View travel details & seat layout
- Real-time seat selection (Lower & Upper deck)
- Select boarding & dropping points
- Secure payment using Stripe
- Booking confirmation
- Cancel booking & receive refund

---

### 🧑‍💼 Travel Agent
- Separate dashboard
- Add and manage travels
- Configure seat layouts
- Set fares
- View bookings for their travels

---

### 🛠️ Admin
- Manage users & travel agents
- Manage travels & routes
- View all bookings
- Revenue & analytics reports
- Full system control

---

## 🔥 Key Highlights
- Real-time seat locking using **Socket.IO**
- Auto seat unlock after timeout using **Cron Jobs**
- Secure payment flow using **Stripe Payment Intents**
- Server-side verification with **Stripe Webhooks**
- Refund & cancellation handling
- Pagination & aggregation-based reports
- Production-ready backend architecture

---

## 🧰 Tech Stack

### Frontend
- React.js
- Bootstrap 5
- Axios
- React Router
- Context API / Redux Toolkit
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Passport.js
- Socket.IO
- Node-Cron
- Nodemailer

### Payment
- Stripe (Test & Live)
- Stripe Webhooks

---

## 🏗️ System Architecture

