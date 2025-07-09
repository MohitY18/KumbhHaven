# 🕉️ KumbhHaven

**KumbhHaven** is a full-stack web application built specifically for pilgrims and travelers attending the sacred **Kumbh Mela**. It allows hosts to list temporary accommodations and enables visitors to browse, review, and connect with available stays with ease.

---

## ✨ Features

- 🔐 **User Authentication**
  - Secure login and registration using Passport.js
  - Session handling with `express-session` and MongoDB

- 🏡 **Listing Management**
  - Hosts can create, update, and delete accommodation listings
  - Listings include title, description, price, location, and images

- 🖼️ **Image Uploads**
  - File uploads using Multer
  - Images stored directly in Cloudinary with automatic optimization

- ⭐ **Reviews & Ratings**
  - Authenticated users can post reviews and ratings on listings
  - Reviews are associated with both listing and author

- 👥 **Role-Based Authorization**
  - Only logged-in users can post listings or reviews
  - Only owners can edit or delete their listings

- 💬 **Flash Messaging**
  - Instant feedback for actions (success/errors) via `connect-flash`

- ✅ **Form Validation**
  - Server-side validation using **Joi**
  - Mongoose schema validation for additional data safety

- 💻 **Responsive UI**
  - Built with EJS templates and Bootstrap for mobile-friendly experience

- 🚫 **Custom Error Handling**
  - Friendly error pages for 404 and internal server errors
  - Centralized error handler for better debugging

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Templating:** EJS, Bootstrap, Custom CSS
- **Authentication:** Passport.js, express-session, connect-mongo
- **Image Uploads:** Multer, Cloudinary (via multer-storage-cloudinary)
- **Validation:** Joi
- **Utilities:** dotenv, method-override, connect-flash

---

## 🔎 How to Use

1. **🧭 Browse Listings:**  
   View all available accommodations on the homepage.

2. **📝 Create/Edit Listings:**  
   Sign up and log in to manage your property listings.

3. **📸 Upload Images:**  
   Attach and upload images to listings via Cloudinary.

4. **🌟 Review Stays:**  
   Post feedback and ratings after your stay.

5. **🔔 Flash Messages:**  
   Get real-time feedback for every action.

---

## 🔐 Security & Validation

- User authentication required for all sensitive actions
- Authorization checks restrict listing updates/deletion to owners only
- Dual validation system:
  - **Joi** for request-level input validation
  - **Mongoose** for schema-level enforcement
- Sessions stored securely in MongoDB
- Cookies are HTTP-only for protection against XSS

---

## 🌐 Live Demo

🔗 [Visit KumbhHaven on Render](https://kumbhhaven.onrender.com/listing)

---

## 🙏 About the Project

This project was developed as a dedicated platform for assisting pilgrims during the **Kumbh Mela**, helping them discover convenient stays and enabling hosts to reach thousands of spiritual travelers.

---
