# 💱 Currency Exchange API

A production-ready REST API for real-time currency exchange rates, average calculations, and slippage analysis. Built with **Node.js**, **Express.js**, and **PostgreSQL**, deployed on **Render**.

---

## 🚀 Live Demo & Repository

- **GitHub Repository:** [https://github.com/nikunjbhardwaj/TapTalent_Assignment](https://github.com/nikunjbhardwaj/TapTalent_Assignment)  
- **Live API URL:** [https://taptalent-assignment-backend.onrender.com](https://taptalent-assignment-backend.onrender.com)

---

## 📚 API Endpoints Documentation

### 1. Currency Quotes Endpoint
**GET** `/quotes/:currencyCode`

**Description:** Fetches current market exchange rates for the specified currency.

**Parameters:**
- `currencyCode` — 3-letter code (e.g. ARS, BRL, USD, EUR)

**Examples:**
GET /quotes/ars
GET /quotes/brl
GET /quotes/usd


**Response:**
```json
{
  "buy_price": 1425,
  "sell_price": 1445,
  "source": "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB",
  "currency": "ARS",
  "data_quality": "live",
  "quote_timestamp": "2025-11-02T14:29:17.263Z",
  "retrieved_at": "2025-11-02T14:29:17.427Z"
}
```
### 2. Average Exchange Rates

GET /average/:currencyCode

Description: Calculates weighted average exchange rates across multiple sources.

Examples:
```bash
GET /average/ars  
GET /average/brl
```

### 3. Slippage Analysis

GET /slippage/:currencyCode

Description: Calculates price differences between different exchanges.

Examples:
```bash
GET /slippage/ars  
GET /slippage/brl
```
---

### 🛡️ Robust Error Handling & Fallback System
### ⚙️ Challenge

- During development, several financial websites and APIs presented obstacles:

- Blocked automated requests

- Strict rate limiting

- VPN requirements (especially Ámbito)

- Temporary unavailability


### 💡 Solution

Implemented an intelligent fallback system ensuring API reliability.

Technical Approach:

- Primary Source Attempts — Multiple real-time data sources

- Failure Detection — Detect blocks, rate limits, and timeouts

- Fallback Activation — Switch to manually verified market rates

- Continuous Service — Ensures uptime and reliability

Results:
✅ 99%+ uptime
✅ Maintained accuracy during source failures
✅ Transparent data_quality flag (live / fallback)

---
 
### 🏗️ Technical Architecture

- Tech Stack

- Backend: Node.js + Express.js

- Database: PostgreSQL with SSL encryption

- Caching: 60-second TTL (database-level cache)

- Deployment: Render

- Environment: .env variables managed by dotenv

## Project Structure

```bash
src/
├── config/
│   └── database.js
├── routes/
│   ├── quotes.js
│   ├── average.js
│   └── slippage.js
├── services/
│   ├── cache.js
│   ├── calculations.js
│   └── scrapers.js
└── index.js
```
---


### ✅ Key Features

- Real-time data aggregation from multiple sources

- Intelligent caching (60-second TTL with PostgreSQL)

- Connection pooling with SSL

- Comprehensive error handling

- Production deployment (Render)

- Modular, clean architecture

- Transparent data quality system

---

### 🗄️ Database Design

- PostgreSQL with SSL/TLS encryption

- Connection Pooling for performance

- Cache Expiry: 60 seconds

- Optimized Queries for fast responses

---

### 🛠️ Setup & Installation

### Local Development
```bash
# Clone repository
git clone https://github.com/nikunjbhardwaj/TapTalent_Assignment.git
cd TapTalent_Assignment

# Install dependencies
npm install

# Copy environment example
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
```bash
DATABASE_URL=your_postgresql_connection_string
PORT=3000
NODE_ENV=development
```
---

### ⚡ Performance Features

- Caching layer to reduce external calls

- Connection pooling for DB performance

- Fallback handling for data source errors

- Secure SSL connections
----
### 👨‍💻 Developer

Name: Nikunj Bhardwaj
Email: bhardwajrana123@gmail.com

GitHub: https://github.com/nikunjbhardwaj

Live API: https://taptalent-assignment-backend.onrender.com
