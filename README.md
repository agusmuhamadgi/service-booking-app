# API Aplikasi Pemesanan Servis Kendaraan

## Tech Stack
- Node.js
- Express.js
- MySQL
- Sequelize
- JWT Authentication

---

## Fitur
- Customer dapat melakukan booking servis (H+1)
- Dealer login menggunakan JWT
- Dealer mengatur jadwal servis dan kuota
- Quota otomatis berkurang saat booking
- Quota kembali jika status booking diubah menjadi "konfirmasi batal"
- Dealer dapat melihat dan mengubah status booking

---

## Struktur Database
- dealers
- service_schedules
- service_bookings
- service_statuses

---

## Cara Menjalankan Project

**1. Clone repository**:
    ```bash
    git clone <url-repository>
    cd service-booking-app


**2. Install dependency**:
    ```bash
    npm install

**3. Konfigurasi Environment**:
    ```bash
    PORT=3000
    DB_HOST=localhost
    DB_USER=api_user
    DB_PASS=password123
    DB_NAME=service_booking

    JWT_SECRET=supersecretkey

**4. Jalankan Server**:
    ```bash
    npm run dev
    npm run seed

    ```arduino
    http://localhost:3000


**Endpoint Utama**:
    Dealer Admin Login
    ```bash
    POST /api/auth/login

    Jadwal Service (Dealer)
    ```bash
    GET    /api/schedules
    POST   /api/schedules
    PUT    /api/schedules/:id
    DELETE /api/schedules/:id

    Booking Service (Customer)
    ```bash
    POST /api/bookings

    Update Status Booking (Dealer)
    ```bash
    PUT /api/bookings/:id/status




