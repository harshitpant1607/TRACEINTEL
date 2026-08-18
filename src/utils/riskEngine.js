/**
 * TRACEINTEL Front-End Risk Engine Demonstration
 * Evaluates wallet & transaction parameters against financial intelligence heuristic rules.
 * 
 * Rules & Weights:
 * - Rapid fund movement (< 15 min transfers): +25 pts
 * - Layering depth (> 3 intermediary hops): +20 pts
 * - High-risk counterparty exposure (Mixer/Darknet/Sanctioned): +30 pts
 * - New wallet burst activity (< 7 days old): +15 pts
 * - Structuring / Split transfers: +10 pts
 */

export function calculateWalletRiskScore(wallet) {
  if (!wallet) return { score: 0, level: 'LOW', indicators: [] };

  let score = 0;
  const indicators = [];

  if (wallet.tags && wallet.tags.includes('Mixer')) {
    score += 35;
    indicators.push('Direct exposure to decentralized mixer / tumbler');
  }

  if (wallet.tags && wallet.tags.includes('Darknet')) {
    score += 40;
    indicators.push('Associated with sanctioned darknet market entity');
  }

  if (wallet.rapidMovement) {
    score += 25;
    indicators.push('Rapid fund velocity (< 10 min inter-transfer latency)');
  }

  if (wallet.layeringHops && wallet.layeringHops >= 3) {
    score += 20;
    indicators.push(`Multi-hop layering pattern detected (${wallet.layeringHops} intermediary wallets)`);
  }

  if (wallet.isNew) {
    score += 15;
    indicators.push('Burst activity from newly created address (< 7 days)');
  }

  if (wallet.structuringFlag) {
    score += 15;
    indicators.push('Sub-threshold structured deposit fan-out pattern');
  }

  // Base score fallbacks for mock data consistency
  if (wallet.riskScore !== undefined && indicators.length === 0) {
    score = wallet.riskScore;
    if (score >= 80) indicators.push('High-risk counterparty transaction history');
    if (score >= 60) indicators.push('Unusual volume spikes compared to baseline');
  }

  const finalScore = Math.min(100, Math.max(0, score || wallet.riskScore || 15));
  let level = 'LOW';
  if (finalScore >= 80) level = 'CRITICAL';
  else if (finalScore >= 60) level = 'HIGH';
  else if (finalScore >= 30) level = 'MEDIUM';

  return {
    score: finalScore,
    level,
    indicators: indicators.length > 0 ? indicators : ['Standard transaction profile']
  };
}

export function evaluateTransactionRisk(tx) {
  let score = tx.riskScore || 50;
  const reasons = tx.riskReasons || [];
  
  return {
    score,
    level: score >= 80 ? 'CRITICAL' : score >= 60 ? 'HIGH' : score >= 30 ? 'MEDIUM' : 'LOW',
    reasons
  };
}
