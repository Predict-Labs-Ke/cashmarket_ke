# Quick Testing Reference Card

## 🚀 Setup (One-Time)

```bash
npm install          # Install dependencies
npm run seed         # Create demo markets + admin accounts
npm run dev          # Start server → http://localhost:3000
```

## 🔐 Pre-Created Accounts

**Admin Access:**
- Email: `admin@cashmarket.ke`
- Password: `admin123`

**Oracle Access:**
- Email: `oracle@cashmarket.ke`  
- Password: `oracle123`

**Regular Users:** 
- Create your own via signup page ✅

## 🧪 Simulation OTP Codes

| Action | OTP Code | Where to Find |
|--------|----------|---------------|
| Deposit | `123456` | Also in console logs |
| Withdrawal | `654321` | Also in console logs |
| Login 2FA | `111111` | Also in console logs |

## ✅ Quick Test Scenarios

### 1. User Registration (5 min)
```
1. Go to homepage
2. Click "Get Started Free"
3. Enter test email/password
4. Create account
5. Login with credentials
```

### 2. Deposit & Trade (10 min)
```
1. Login as your test user
2. Click deposit/add funds
3. Enter amount (e.g., 5000)
4. Use OTP: 123456
5. Browse markets
6. Click "Buy YES" or "Buy NO"
7. Enter stake amount
8. Confirm trade
9. Check portfolio
```

### 3. Withdrawal (5 min)
```
1. Request withdrawal
2. Use OTP: 654321
3. If KYC unverified:
   - Upload test document URL
   - Admin approves KYC
4. Retry withdrawal
5. Verify balance deducted
```

### 4. Admin Functions (10 min)
```
1. Login as admin@cashmarket.ke
2. Create new market:
   - Question
   - Category
   - Resolution date
   - Liquidity amount
3. Resolve existing market:
   - Select outcome (YES/NO/INVALID)
   - Add resolution evidence
   - Confirm
4. Check audit logs
5. View liquidity pool status
```

## 🔄 Reset Everything

```bash
npm run reset-simulation
```

Keeps: Admin accounts, demo markets (reset)
Deletes: All user accounts, trades, positions, transactions

## 🎯 What to Test

**Must Test Before Launch:**
- [ ] Sign up flow works
- [ ] Login/logout works
- [ ] Deposit with OTP (123456)
- [ ] Trade execution (YES/NO)
- [ ] Price changes after trades (LMSR)
- [ ] Portfolio shows positions
- [ ] Withdrawal with KYC
- [ ] Admin can create markets
- [ ] Admin can resolve markets
- [ ] Rate limiting (try 6 wrong passwords)

**Edge Cases:**
- [ ] Insufficient balance
- [ ] Invalid OTP
- [ ] Withdraw without KYC
- [ ] Trade on resolved market
- [ ] Double deposit attempt

## 🐛 Troubleshooting

**Can't see simulation banner?**
- Check .env.local has `NEXT_PUBLIC_SIMULATION_MODE=true`
- Hard refresh browser (Ctrl+Shift+R)

**OTP not working?**
- Check browser console for code
- Check server terminal for code
- Use standard codes: 123456 (deposit), 654321 (withdraw)

**Database errors?**
- Delete data/ folder
- Run `npm run seed` again

**Build errors?**
- Run `npm install`
- Check Node.js version (should be 20+)

## 📊 Demo Markets

8 markets available:
1. KES/USD Exchange Rate (Economy)
2. Africa Tech Summit (Events)
3. M-Pesa Volume (Tech)
4. Presidential Election (Politics, high liquidity)
5. AFCON Qualification (Sports)
6. Renewable Energy (Environment)
7. SGR Expansion (Infrastructure)
8. GDP Growth (Economy)

## 🔍 Checking Things Work

**API is working:**
```bash
curl http://localhost:3000/api/markets
# Should return: "_simulation": true
```

**Database has data:**
```bash
sqlite3 data/cashmarket.db "SELECT COUNT(*) FROM markets;"
# Should return: 8
```

**Simulation mode enabled:**
- Look for yellow banner at top
- Check page source for "SIMULATION MODE"
- API responses include `_simulation: true`

## 📞 Need Help?

1. Check SIMULATION_GUIDE.md for detailed guide
2. Check API_DOCUMENTATION.md for API details
3. Check browser/server console for errors
4. Try `npm run reset-simulation` for fresh start

## 🎓 Pro Tips

- Create 2-3 test users to test trading between them
- Test both KYC verified and unverified users
- Try different market categories
- Test admin operations in separate browser/incognito
- Keep notes of what works/doesn't work
- Reset often to test from scratch

---

**Remember:** This is SIMULATION mode - no real money involved! 🧪
