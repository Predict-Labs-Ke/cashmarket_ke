#!/usr/bin/env tsx

/**
 * Seed script to populate the database with SIMULATION data
 * 
 * ⚠️ WARNING: This creates SAMPLE/DEMO data for testing purposes.
 * All users, markets, and transactions are SIMULATED.
 * 
 * Run with: npm run seed
 */

import db from '../lib/db';
import { hashPassword } from '../lib/security/passwordHash';
import { DEFAULT_B, initializeMarketQuantities } from '../lib/lmsr';
import { 
  SIMULATION_MARKETS, 
  getSimulationNotice 
} from '../lib/data/simulation';

async function seed() {
  console.log('🌱 Seeding database with SIMULATION data...');
  console.log(getSimulationNotice());
  console.log('═'.repeat(60));

  try {
    // Create admin users from simulation data
    console.log('\n📋 Creating DEMO admin users...');
    const adminPasswordHash = await hashPassword('admin123');
    const adminStmt = db.prepare(`
      INSERT INTO admin_users (email, name, password_hash, role, is_active)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    try {
      adminStmt.run('admin@cashmarket.ke', 'Admin User', adminPasswordHash, 'admin', 1);
      console.log('✓ Admin user created: admin@cashmarket.ke / admin123');
    } catch {
      console.log('⚠ Admin user already exists');
    }

    // Create oracle user
    const oraclePasswordHash = await hashPassword('oracle123');
    try {
      adminStmt.run('oracle@cashmarket.ke', 'Oracle User', oraclePasswordHash, 'oracle', 1);
      console.log('✓ Oracle user created: oracle@cashmarket.ke / oracle123');
    } catch {
      console.log('⚠ Oracle user already exists');
    }

    // Admin will create their own test users manually
    console.log('\n👥 User accounts:');
    console.log('   ℹ️  No demo users pre-created');
    console.log('   ℹ️  Create your own test accounts through the signup flow');
    console.log('   ℹ️  Test the full registration and KYC process yourself');

    // Create sample markets from simulation data
    console.log('\n📊 Creating DEMO markets...');
    const { q_yes, q_no } = initializeMarketQuantities();
    
    const marketStmt = db.prepare(`
      INSERT INTO markets (
        question, description, category, b, q_yes, q_no,
        initial_liquidity, status, resolution_source, resolution_time, created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const market of SIMULATION_MARKETS) {
      try {
        const result = marketStmt.run(
          market.question,
          market.description,
          market.category,
          market.b || DEFAULT_B,
          q_yes,
          q_no,
          market.initial_liquidity,
          'active',
          market.resolution_source,
          market.resolution_time,
          1 // Created by admin
        );
        console.log(`✓ Demo market created: "${market.question}" (ID: ${result.lastInsertRowid})`);
      } catch {
        console.log(`⚠ Demo market already exists: "${market.question}"`);
      }
    }

    // Update liquidity pool to account for locked liquidity
    const totalLiquidity = SIMULATION_MARKETS.reduce((sum, m) => sum + m.initial_liquidity, 0);
    const updateLiquidityStmt = db.prepare(`
      UPDATE liquidity_pool
      SET locked_liquidity = ?,
          available_liquidity = total_liquidity - ?
      WHERE id = 1
    `);
    updateLiquidityStmt.run(totalLiquidity, totalLiquidity);
    console.log(`\n💰 Locked KES ${totalLiquidity} in liquidity pool for demo markets`);

    console.log('\n' + '═'.repeat(60));
    console.log('✅ SIMULATION Database seeded successfully!');
    console.log('═'.repeat(60));
    
    console.log('\n🔐 Admin Credentials (for management):');
    console.log('   Admin: admin@cashmarket.ke / admin123');
    console.log('   Oracle: oracle@cashmarket.ke / oracle123');
    
    console.log('\n👤 User Accounts:');
    console.log('   ℹ️  Create your own test accounts via the signup page');
    console.log('   ℹ️  Test the complete registration flow yourself');
    console.log('   ℹ️  Try different scenarios (verified/unverified KYC, etc.)');
    
    console.log('\n⚠️  SIMULATION MODE ACTIVE:');
    console.log('   🧪 All data is SIMULATED for testing/demo purposes');
    console.log('   💰 No real money is involved in any transactions');
    console.log('   📱 OTP codes are simulated (check console logs)');
    console.log('   💳 M-Pesa integration is simulated (no Daraja API yet)');
    console.log('   🎭 All markets are demo scenarios for testing');
    
    console.log('\n🧪 Testing Checklist:');
    console.log('   [ ] Create user accounts manually');
    console.log('   [ ] Test login/logout flow');
    console.log('   [ ] Test deposit with OTP (use code: 123456)');
    console.log('   [ ] Test trading on markets');
    console.log('   [ ] Test withdrawal with KYC verification');
    console.log('   [ ] Test admin market creation/resolution');
    
    console.log('\n📚 For production deployment:');
    console.log('   1. Set NEXT_PUBLIC_SIMULATION_MODE=false');
    console.log('   2. Integrate real M-Pesa/Daraja API');
    console.log('   3. Set up real SMS provider for OTP');
    console.log('   4. Clear simulation data and create production data');
    console.log('   5. Set up proper NEXTAUTH_SECRET');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
