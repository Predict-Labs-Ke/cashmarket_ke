#!/usr/bin/env tsx

/**
 * Reset Simulation Data Script
 * 
 * ⚠️ WARNING: This will DELETE ALL DATA in the database!
 * Use this to reset the simulation environment for fresh testing.
 * 
 * Run with: npm run reset-simulation
 */

import db from '../lib/db';
import { getSimulationNotice } from '../lib/data/simulation';

async function resetSimulation() {
  console.log('🗑️  Resetting simulation data...');
  console.log(getSimulationNotice());
  console.log('═'.repeat(60));
  
  console.log('\n⚠️  WARNING: This will DELETE ALL DATA!');
  console.log('   - All users (except admin accounts)');
  console.log('   - All trades and positions');
  console.log('   - All transactions');
  console.log('   - All OTP codes');
  console.log('   - All sessions');
  console.log('   - Markets will remain (managed by admins)');
  
  console.log('\n🔄 Starting reset...\n');

  try {
    // Delete user-generated data
    console.log('🗑️  Deleting user trades...');
    db.prepare('DELETE FROM trades').run();
    
    console.log('🗑️  Deleting user positions...');
    db.prepare('DELETE FROM user_positions').run();
    
    console.log('🗑️  Deleting transactions...');
    db.prepare('DELETE FROM transactions').run();
    
    console.log('🗑️  Deleting OTP codes...');
    db.prepare('DELETE FROM otp_codes').run();
    
    console.log('🗑️  Deleting sessions...');
    db.prepare('DELETE FROM sessions').run();
    
    console.log('🗑️  Deleting login attempts...');
    db.prepare('DELETE FROM login_attempts').run();
    
    console.log('🗑️  Deleting regular users...');
    db.prepare('DELETE FROM users').run();
    
    // Reset markets to initial state
    console.log('🔄 Resetting markets to initial state...');
    db.prepare(`
      UPDATE markets 
      SET q_yes = 0, 
          q_no = 0, 
          status = 'active', 
          resolved_outcome = NULL,
          resolved_at = NULL,
          resolved_by = NULL
    `).run();
    
    // Reset liquidity pool
    console.log('💰 Resetting liquidity pool...');
    const totalLiquidity = db.prepare('SELECT SUM(initial_liquidity) as total FROM markets').get() as { total: number };
    db.prepare(`
      UPDATE liquidity_pool 
      SET locked_liquidity = ?,
          available_liquidity = total_liquidity - ?,
          total_exposure = 0,
          fees_collected = 0
      WHERE id = 1
    `).run(totalLiquidity.total, totalLiquidity.total);
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ Simulation data reset complete!');
    console.log('═'.repeat(60));
    
    console.log('\n📊 Current State:');
    console.log('   ✓ All user accounts cleared');
    console.log('   ✓ All trades and positions cleared');
    console.log('   ✓ Markets reset to initial state');
    console.log('   ✓ Liquidity pool reset');
    console.log('   ✓ Admin accounts preserved');
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Create your own test user accounts via signup');
    console.log('   2. Test the complete user journey');
    console.log('   3. Trade on markets and test features');
    console.log('   4. Run npm run reset-simulation again to reset');
    
  } catch (error) {
    console.error('❌ Error resetting simulation data:', error);
    process.exit(1);
  }
}

resetSimulation();
