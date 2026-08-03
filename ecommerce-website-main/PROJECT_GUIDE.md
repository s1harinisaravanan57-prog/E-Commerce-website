# Little Nest Storefront — Project Guide

Little Nest is a full-stack ecommerce website for baby and nursery products. It can be viewed as a React storefront alone, or run with its API and MySQL database for persistent products, orders, stock and contact messages.

## Concepts and technology

| Area | Technology | Purpose |
| --- | --- | --- |
| Frontend | React 18, React Router, CSS | Pages, navigation, product search, cart, checkout, About and Contact screens. |
| Browser state | React hooks and `localStorage` | Stores search/cart state and preserves the cart after refresh. |
| API client | Axios | Calls `http://localhost:8080/api` from `frontend/src/services/api.js`. |
| Backend | Java 17, Spring Boot 3 | REST API, validation, CORS and order/stock business logic. |
| Database | MySQL 8, JPA/Hibernate | Stores products, orders and contact messages; schema is created/updated automatically. |
| Containers | Docker Compose | Starts MySQL, Spring Boot and the production frontend together. |

```text
React browser (port 3000)
  ├─ GET  /api/products and /api/products/{id}  → catalogue
  ├─ POST /api/orders                            → order + stock update
  └─ POST /api/contact-messages                  → saved contact message
                                                   ↓
                                  Spring Boot API (port 8080)
                                                   ↓
                                      MySQL: little_nest
```

When the API is unavailable, the product listing/detail pages use the built-in curated catalogue. Checkout and Contact form submission require the backend.

## Owner email notifications

The backend can notify `s1harinisaravanan@gmail.com` when a customer submits the Contact form or places an order. Notifications are disabled by default, so no email password is stored in this project.

To enable them, use SMTP credentials for an email account allowed to send mail. For Gmail, create an app password for the sending account, then run the following in the PowerShell window used to start the backend:

```powershell
$env:OWNER_NOTIFICATION_ENABLED = 'true'
$env:SMTP_HOST = 'smtp.gmail.com'
$env:SMTP_PORT = '587'
$env:SMTP_USERNAME = 'your-sending-email@gmail.com'
$env:SMTP_PASSWORD = 'your-app-password'
$env:MAIL_FROM = 'your-sending-email@gmail.com'
mvn spring-boot:run
```

To use another recipient, set `$env:OWNER_NOTIFICATION_EMAIL` before starting the backend.

### Secure email-notification launcher

For Gmail, the project includes a launcher that prompts for the app password without saving it in a project file. Stop the existing backend with `Ctrl + C`, then run:

```powershell
cd C:\Users\ELCOT\Downloads\ecommerce-website-main\ecommerce-website-main\backend
.\start-email-notifications.ps1
```

It defaults both the sending account and recipient to `s1harinisaravanan@gmail.com`. To use another sending address, run `./start-email-notifications.ps1 -SenderEmail 'your-sending-email@gmail.com'`. The app password is only retained while the backend runs.

The App Password must belong to the exact sending Gmail address. The launcher removes spaces automatically when you paste a Google 16-character App Password.

## Layout and features

```text
frontend/src/        React components, styles and API client
frontend/public/pics/ Images served by the browser
frontend/pics/        Source product images
backend/src/          Spring Boot controllers, models and repositories
docker-compose.yml    Full Docker environment
```

Routes: `/`, `/products`, `/product/:id`, `/cart`, `/about`, and `/contact`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/products` | List products. |
| `GET` | `/api/products/{id}` | Get one product. |
| `POST` | `/api/orders` | Save an order and reduce stock. |
| `POST` | `/api/contact-messages` | Save a contact form message. |

## Requirements

- Storefront only: Node.js 18+ (includes npm).
- Full local stack: Node.js 18+, Java 17+, Maven and MySQL 8+.
- Full Docker stack: Docker Desktop.

## Roadmap: run the website

### 1. View the storefront only

Use this fastest option to view the site. Product pages work from fallback data; checkout and Contact require the backend.

```powershell
cd C:\Users\ELCOT\Downloads\ecommerce-website-main\ecommerce-website-main\frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Stop with `Ctrl + C`.

### 2. Run the complete app with local MySQL

First start MySQL 8 and ensure port `3306` is free. Then open two PowerShell windows.

Window 1 — start the backend:

```powershell
cd C:\Users\ELCOT\Downloads\ecommerce-website-main\ecommerce-website-main\backend
mvn spring-boot:run
```

The defaults are database `little_nest`, MySQL user `root`, and password `2006`. The application creates/seeds the catalogue at first start. For another password:

```powershell
$env:SPRING_DATASOURCE_PASSWORD = 'your-mysql-password'
mvn spring-boot:run
```

Window 2 — start the frontend:

```powershell
cd C:\Users\ELCOT\Downloads\ecommerce-website-main\ecommerce-website-main\frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Confirm the API at [http://localhost:8080/api/products](http://localhost:8080/api/products).

### 3. Run the complete app with Docker

With Docker Desktop running, execute:

```powershell
cd C:\Users\ELCOT\Downloads\ecommerce-website-main\ecommerce-website-main
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000). Stop the stack with `Ctrl + C`.

## Useful commands

### Build the frontend

```powershell
cd C:\Users\ELCOT\Downloads\ecommerce-website-main\ecommerce-website-main\frontend
npm run build
```

This creates the deployable `frontend/build` folder.

### Update product images

Keep current PNG filenames, then copy source images to the browser folder:

```powershell
cd C:\Users\ELCOT\Downloads\ecommerce-website-main\ecommerce-website-main\frontend
Get-ChildItem -LiteralPath .\pics -Filter *.png -File | Copy-Item -Destination .\public\pics -Force
```

Hard-refresh with `Ctrl + F5` if the browser shows an old image.

## Troubleshooting

| Problem | Resolution |
| --- | --- |
| Website will not open | Check that `npm start` is running and use port `3000`. |
| Checkout or Contact fails | Start the backend and open `/api/products` on port `8080` to check it. |
| MySQL connection fails | Start MySQL on `3306` and set the correct `SPRING_DATASOURCE_PASSWORD`. |
| Docker port conflict | Stop the process using port `3000`, `3306`, or `8080`, then run Docker Compose again. |
| Image is missing | Copy it from `frontend/pics` to `frontend/public/pics`, then hard-refresh. |
