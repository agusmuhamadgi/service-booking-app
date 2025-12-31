# 🚗 Service Booking API

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-brightgreen.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.x-orange.svg)

API Sistem Pemesanan Servis Kendaraan

---

##  Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Auth:** JWT (JSON Web Token) & Bcrypt

---

##  Struktur Database
Sistem ini menggunakan 4 tabel utama:
1.  `Dealers`: Informasi akun bengkel/dealer.
2.  `Service_Schedules`: Master jadwal per tanggal beserta limit kuota.
3.  `Service_Bookings`: Data reservasi dari customer.
4.  `Service_Statuses`: Tabel referensi status (1: Pending, 2: Selesai, 3: Konfirmasi Batal).

---


## 🚀 Cara Menjalankan Project

```bash
# 1. Clone Repository
git clone [https://github.com/agusmuhamadgi/service-booking-app.git](https://github.com/agusmuhamadgi/service-booking-app.git)
cd service-booking-app

# 2. Install Dependencies
npm install

# 3. Konfigurasi Environment
# Buat file .env dan isi:
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=password123
DB_NAME=service_booking
JWT_SECRET=supersecretkey

# 4. Setup Database & Seed
nnpm run seed

# 5. Jalankan Server
npm run dev