# 🔐 NestJS OTP Generator & Verifier

A One-Time Password (OTP) authentication system built with **NestJS**, using **PostgreSQL** and **SendGrid** for email delivery. This service allows users to generate and verify OTPs securely and efficiently.

---

## 🚀 Features

- ⚙️ **Generate OTP** for users via email
- 🧪 **Verify OTP** with expiration logic
- 📬 **SendGrid Integration** for email delivery
- 🗄️ **PostgreSQL + TypeORM** for user OTP storage
- 📜 Fully typed with **DTOs** and validated inputs
- 📘 Swagger API

---

## 🏗️ Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Mailer:** SendGrid
- **Docs:** Swagger

---

## 📦 Installation

```bash
# Clone the repo using ssh
git clone https://github.com/Raghav24Maheshwari/OTP-ORM-sendgrid.git
cd nestjs-otp-app
```

# Install dependencies
```bash
npm install
```
<!-- To regiser user bu seeder as an admin -->   -->> npm run seed:admin

# Setup environment variables
```bash
cp .env.example .env
```

# Fill in your PostgreSQL and SendGrid credentials

⚙️ Environment Variables
Create a .env file based on .env.example:

SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@example.com
DATABASE_URL=postgres://username:password@localhost:5432/otpdb


# Run migrations
```bash
npm run migration:run
```

# Start in development mode
```bash
npm run start:dev
```

🔄 API Endpoints
```bash
POST	    /otp	Generate OTP for a user
POST	    /otp/_verify	    Verify submitted OTP
```

🧾 Example Request (Generate OTP)
```bash
POST /otp/generate/1
{
  "email": "user@example.com",
  "username": "john_doe"
}
🧾 Example Request (Verify OTP)

POST /otp/_verify
{
  "userId":"67",
  "otp": "123456"
}
```

📘 Swagger Docs
Access Swagger API documentation at:
```bash
http://localhost:3000/api
```

📁 Project Structure
```bash
src/
├── 
│   ├── config/
│   ├── templates/
│   └── utils/
├── otp/
│   ├── dto/
│   ├── entities/
│   ├── migrations/
│   ├── otp.controller.ts
│   ├── otp.service.ts
│   └── otp.module.ts
└── main.ts
```


✅ Best Practices Followed

Robust DTO validation

Email delivery abstraction via SendGrid

Migration-ready PostgreSQL schema
