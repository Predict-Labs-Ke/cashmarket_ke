# CashMarket API Documentation

## Overview

CashMarket is a prediction market platform built with Next.js, featuring LMSR (Logarithmic Market Scoring Rule) for automated market making. This API provides endpoints for users to trade on prediction markets and for admins to manage the platform.

**Base URL:** `http://localhost:3000` (development)

**All payments and transactions are currently SIMULATED** - no actual M-Pesa/Daraja integration yet.

## Authentication

The API uses NextAuth.js for authentication. Most endpoints require authentication.

### Login
```bash
# Use NextAuth.js credential provider
POST /api/auth/signin
```

## Test Credentials

After running `npm run seed`:

### Admin Users
- **Admin:** admin@cashmarket.ke / admin123
- **Oracle:** oracle@cashmarket.ke / oracle123

### Regular Users
- **User 1:** john@test.com / user123 (KES 10,000, KYC verified)
- **User 2:** jane@test.com / user123 (KES 15,000, KYC verified)
- **User 3:** bob@test.com / user123 (KES 5,000, KYC unverified)

---

## Public User Endpoints

### 1. List Markets

Get a list of all prediction markets.

```bash
GET /api/markets
```

**Query Parameters:**
- `status` (optional): Filter by status (active, paused, resolved, inactive)
- `category` (optional): Filter by category
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Example:**
```bash
curl http://localhost:3000/api/markets
```

**Response:**
```json
{
  "markets": [
    {
      "id": 1,
      "question": "Will Kenya Shilling strengthen against USD by Q2 2026?",
      "description": "...",
      "category": "Economy",
      "status": "active",
      "yes_price": 0.5,
      "no_price": 0.5,
      "yes_percentage": 50,
      "no_percentage": 50,
      "total_volume": 0,
      "participant_count": 0,
      "trade_count": 0,
      "resolution_source": "Central Bank of Kenya",
      "resolution_time": "2026-06-30T23:59:59Z"
    }
  ],
  "total": 4,
  "limit": 50,
  "offset": 0
}
```

---

### 2. Get Market Details

Get detailed information about a specific market.

```bash
GET /api/markets/{marketId}
```

**Example:**
```bash
curl http://localhost:3000/api/markets/1
```

**Response:**
```json
{
  "market": {
    "id": 1,
    "question": "Will Kenya Shilling strengthen against USD by Q2 2026?",
    "b": 20000,
    "q_yes": 0,
    "q_no": 0,
    "yes_price": 0.5,
    "no_price": 0.5,
    "total_volume": 0
  },
  "stats": {
    "participant_count": 0,
    "trade_count": 0,
    "total_volume": 0
  },
  "recent_trades": [],
  "user_position": null
}
```

---

### 3. Calculate Stake Cost

Calculate the cost and potential payout for a given stake without executing the trade.

```bash
POST /api/stake
```

**Request Body:**
```json
{
  "market_id": 1,
  "outcome": "YES",
  "stake": 1000
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/stake \
  -H "Content-Type: application/json" \
  -d '{"market_id": 1, "outcome": "YES", "stake": 1000}'
```

**Response:**
```json
{
  "market_id": 1,
  "outcome": "YES",
  "stake": 1000,
  "fee": 20,
  "fee_percentage": 2,
  "cost": 979.99,
  "shares": 1914.21,
  "new_price_yes": 0.524,
  "new_price_no": 0.476,
  "potential_payout": 1914.21,
  "expected_return": 914.21,
  "roi_percentage": 91.42,
  "break_even_price": 0.522
}
```

---

## Authenticated User Endpoints

Requires user authentication.

### 4. Execute Trade

Buy shares in a prediction market.

```bash
POST /api/trades
```

**Request Body:**
```json
{
  "market_id": 1,
  "outcome": "YES",
  "stake": 1000
}
```

**Response:**
```json
{
  "success": true,
  "trade_id": 1,
  "market_id": 1,
  "outcome": "YES",
  "shares": 1914.21,
  "cost": 1000,
  "fee": 20,
  "new_yes_price": 0.524,
  "new_no_price": 0.476,
  "new_balance": 9000,
  "message": "Successfully bought 1914.21 YES shares for KES 1000"
}
```

---

### 5. Get User Balance

Get user account balance and portfolio summary.

```bash
GET /api/user/balance
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "john@test.com",
    "name": "John Doe",
    "balance": 10000,
    "kyc_status": "verified"
  },
  "portfolio": {
    "active_positions": 0,
    "total_invested": 0,
    "total_shares": 0
  },
  "recent_transactions": []
}
```

---

### 6. Send OTP

Request an OTP code for deposit or withdrawal. **OTP is simulated - check console logs for code.**

```bash
POST /api/user/otp/send
```

**Request Body:**
```json
{
  "purpose": "deposit"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "_test_code": "123456",
  "expires_at": "2026-01-31T05:10:00Z"
}
```

---

### 7. Verify OTP

Verify an OTP code.

```bash
POST /api/user/otp/verify
```

**Request Body:**
```json
{
  "code": "123456",
  "purpose": "deposit"
}
```

---

### 8. Deposit Funds (SIMULATED)

Deposit funds to user account. **Requires OTP verification.**

```bash
POST /api/user/deposit
```

**Request Body:**
```json
{
  "amount": 5000,
  "otp_code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully deposited KES 5000",
  "transaction_id": 1,
  "amount": 5000,
  "new_balance": 15000
}
```

---

### 9. Withdraw Funds (SIMULATED)

Withdraw funds from user account. **Requires OTP and KYC verification.**

```bash
POST /api/user/withdraw
```

**Request Body:**
```json
{
  "amount": 2000,
  "otp_code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully withdrew KES 2000",
  "transaction_id": 2,
  "amount": 2000,
  "fee": 20,
  "total_deducted": 2020,
  "new_balance": 12980
}
```

---

### 10. Submit KYC Documents

Submit KYC documents for verification.

```bash
POST /api/user/kyc
```

**Request Body:**
```json
{
  "document_url": "https://example.com/id.jpg"
}
```

---

### 11. Get KYC Status

Check KYC verification status.

```bash
GET /api/user/kyc
```

**Response:**
```json
{
  "user_id": 1,
  "kyc_status": "verified"
}
```

---

## Admin-Only Endpoints

Requires admin/moderator/oracle authentication.

### 12. Create Market

Create a new prediction market (admin only).

```bash
POST /api/admin/markets
```

**Request Body:**
```json
{
  "question": "Will Bitcoin exceed $100k by end of 2026?",
  "description": "Market resolves YES if Bitcoin trades above $100,000 USD",
  "category": "Crypto",
  "b": 20000,
  "initial_liquidity": 50000,
  "resolution_source": "CoinMarketCap",
  "resolution_time": "2026-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "success": true,
  "market_id": 5,
  "message": "Market created successfully"
}
```

---

### 13. Resolve Market

Resolve a market and trigger payouts (admin/oracle only).

```bash
POST /api/admin/markets/{marketId}/resolve
```

**Request Body:**
```json
{
  "resolved_outcome": "YES",
  "resolution_evidence": "Final IEBC results published"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Market resolved successfully",
  "market_id": 1,
  "resolved_outcome": "YES",
  "positions_processed": 10,
  "total_payouts": 15000
}
```

---

### 14. Get Liquidity Pool Data

Get platform liquidity pool information (admin only).

```bash
GET /api/admin/liquidity
```

**Response:**
```json
{
  "pool": {
    "total_liquidity": 1000000,
    "locked_liquidity": 220000,
    "available_liquidity": 780000,
    "total_exposure": 0,
    "fees_collected": 0
  }
}
```

---

### 15. Update Liquidity Pool

Deposit or withdraw from the liquidity pool (admin only).

```bash
PATCH /api/admin/liquidity
```

**Request Body:**
```json
{
  "action": "deposit",
  "amount": 100000
}
```

---

### 16. Pause/Resume Trading

Pause or resume trading platform-wide or for a specific market (admin only).

```bash
POST /api/admin/controls/pause
```

**Platform-wide:**
```json
{
  "paused": true,
  "reason": "System maintenance"
}
```

**Specific market:**
```json
{
  "paused": true,
  "market_id": 1,
  "reason": "Under investigation"
}
```

---

### 17. Update Fees

Update global or market-specific trading fees (admin only).

```bash
PATCH /api/admin/fees
```

**Global fee:**
```json
{
  "fee_percentage": 2.5
}
```

**Market-specific fee:**
```json
{
  "market_id": 4,
  "fee_percentage": 1.5
}
```

---

### 18. Get Audit Logs

Query admin action audit trail (admin only).

```bash
GET /api/admin/logs
```

**Query Parameters:**
- `action_type` (optional): Filter by action type
- `admin_id` (optional): Filter by admin user ID
- `resource_type` (optional): Filter by resource type
- `start_date` (optional): Filter by start date
- `end_date` (optional): Filter by end date
- `limit` (optional): Number of results (default: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "logs": [
    {
      "id": 1,
      "admin_id": 1,
      "admin_name": "Admin User",
      "admin_email": "admin@cashmarket.ke",
      "action_type": "create_market",
      "resource_type": "market",
      "resource_id": 1,
      "details": "{...}",
      "created_at": "2026-01-31T04:52:26Z"
    }
  ],
  "total": 1
}
```

---

## LMSR Parameters

- **Default b:** 20,000 KES (for most markets)
- **Custom b:** Can be set per market for high-volume markets (e.g., Presidential election uses 50,000 KES)
- **Initial prices:** All markets start at 50/50 (neutral)
- **Trading fee:** 2% default (configurable globally and per-market)
- **Withdrawal fee:** 1% default

## Security Features

1. **Authentication:** NextAuth.js with bcrypt password hashing
2. **Rate Limiting:** 5 failed login attempts = 30-minute lockout
3. **2FA/OTP:** Required for deposits and withdrawals (currently simulated SMS)
4. **KYC:** Required for withdrawals
5. **Session Logging:** Device and IP tracking
6. **Audit Trail:** All admin actions logged
7. **RBAC:** Admin/Moderator/Oracle role-based access control

## Database

- **SQLite** with better-sqlite3 (persistent storage)
- **Location:** `data/cashmarket.db`
- **Schema:** See `lib/db/schema.sql`

## Running the Application

```bash
# Install dependencies
npm install

# Seed database with test data
npm run seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Next Steps for Production

1. **Integrate Daraja API:**
   - Update `lib/security/otp.ts` for real SMS sending
   - Add M-Pesa STK Push for deposits
   - Add M-Pesa B2C for withdrawals

2. **Deploy Database:**
   - Consider PostgreSQL for production
   - Set up database backups

3. **Add Environment Variables:**
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `DATABASE_URL`
   - Daraja API credentials

4. **Security Hardening:**
   - Enable HTTPS
   - Configure CORS
   - Set up rate limiting at infrastructure level
   - Add request validation middleware

5. **Monitoring:**
   - Set up error tracking (Sentry)
   - Add analytics
   - Monitor market exposure and liquidity
