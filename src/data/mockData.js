export const INITIAL_WALLETS = [
  {
    address: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    fullAddress: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    label: 'Suspicious Mixing Hub Alpha',
    tags: ['Layering', 'Rapid Movement', 'Mixer Exposure', 'High Volume'],
    firstSeen: '2026-06-12',
    lastActivity: '2026-08-18 10:18:22',
    totalInflow: 412500,
    totalOutflow: 398100,
    txCount: 148,
    primaryAsset: 'USDT',
    assets: [
      { symbol: 'USDT', balance: '184,200', usdValue: 184200, pct: 85 },
      { symbol: 'ETH', balance: '12.4', usdValue: 32240, pct: 12 },
      { symbol: 'USDC', balance: '6,500', usdValue: 6500, pct: 3 }
    ],
    associatedEntity: 'Darknet Portal Alpha',
    clusterId: 'CL-9021',
    layeringHops: 7,
    rapidMovement: true,
    isNew: false
  },
  {
    address: '0x4B91E72D88C3A410928371F029C8B201A9E7E72D',
    fullAddress: '0x4B91E72D88C3A410928371F029C8B201A9E7E72D',
    riskScore: 82,
    riskLevel: 'CRITICAL',
    label: 'Intermediary Node Beta',
    tags: ['Intermediary', 'Rapid Movement', 'Split Transfers'],
    firstSeen: '2026-08-01',
    lastActivity: '2026-08-18 09:52:14',
    totalInflow: 184200,
    totalOutflow: 184000,
    txCount: 34,
    primaryAsset: 'USDT',
    assets: [
      { symbol: 'USDT', balance: '200', usdValue: 200, pct: 100 }
    ],
    associatedEntity: 'Unknown Entity',
    clusterId: 'CL-9021',
    layeringHops: 3,
    rapidMovement: true,
    isNew: true
  },
  {
    address: '0x82FAB10C5D71829402B19385019A82D1C92FB10C',
    fullAddress: '0x82FAB10C5D71829402B19385019A82D1C92FB10C',
    riskScore: 65,
    riskLevel: 'HIGH',
    label: 'Intermediary Buffer Gamma',
    tags: ['Buffer', 'Unusual Frequency'],
    firstSeen: '2026-07-15',
    lastActivity: '2026-08-18 09:47:05',
    totalInflow: 250000,
    totalOutflow: 245000,
    txCount: 89,
    primaryAsset: 'USDT',
    assets: [
      { symbol: 'USDT', balance: '5,000', usdValue: 5000, pct: 100 }
    ],
    associatedEntity: 'Unknown Entity',
    clusterId: 'CL-9021',
    layeringHops: 2,
    rapidMovement: false,
    isNew: false
  },
  {
    address: '0x3F881920A4B100293C817029F710A029B8103F88',
    fullAddress: '0x3F881920A4B100293C817029F710A029B8103F88',
    riskScore: 88,
    riskLevel: 'CRITICAL',
    label: 'Sanctioned Darknet Mixer Portal',
    tags: ['Sanctioned', 'Mixer', 'High Risk'],
    firstSeen: '2025-11-20',
    lastActivity: '2026-08-18 10:11:00',
    totalInflow: 5400000,
    totalOutflow: 5390000,
    txCount: 4210,
    primaryAsset: 'ETH',
    assets: [
      { symbol: 'ETH', balance: '240.5', usdValue: 625300, pct: 70 },
      { symbol: 'USDT', balance: '260,000', usdValue: 260000, pct: 30 }
    ],
    associatedEntity: 'CryptoClean Mixer',
    clusterId: 'CL-1004',
    layeringHops: 0,
    rapidMovement: true,
    isNew: false
  },
  {
    address: '0x9E21A4B02910F1D8205C92B10471A192B049E21A',
    fullAddress: '0x9E21A4B02910F1D8205C92B10471A192B049E21A',
    riskScore: 73,
    riskLevel: 'HIGH',
    label: 'Nova Exchange Deposit Proxy',
    tags: ['Exchange Proxy', 'OTC Counterparty'],
    firstSeen: '2026-05-10',
    lastActivity: '2026-08-18 08:30:19',
    totalInflow: 920000,
    totalOutflow: 890000,
    txCount: 612,
    primaryAsset: 'USDT',
    assets: [
      { symbol: 'USDT', balance: '30,000', usdValue: 30000, pct: 100 }
    ],
    associatedEntity: 'Nova Exchange',
    clusterId: 'CL-3320',
    layeringHops: 1,
    rapidMovement: false,
    isNew: false
  },
  {
    address: '0x111122223333444455556666777788889999AAAA',
    fullAddress: '0x111122223333444455556666777788889999AAAA',
    riskScore: 35,
    riskLevel: 'MEDIUM',
    label: 'Nova Exchange Main Hot Wallet',
    tags: ['VASP', 'Verified Exchange'],
    firstSeen: '2024-01-01',
    lastActivity: '2026-08-18 10:20:00',
    totalInflow: 48000000,
    totalOutflow: 47200000,
    txCount: 184900,
    primaryAsset: 'USDT',
    assets: [
      { symbol: 'USDT', balance: '800,000', usdValue: 800000, pct: 100 }
    ],
    associatedEntity: 'Nova Exchange',
    clusterId: 'CL-8800',
    layeringHops: 0,
    rapidMovement: false,
    isNew: false
  },
  {
    address: '0xBBBBCCCCDDDDEEEEFFFF00001111222233334444',
    fullAddress: '0xBBBBCCCCDDDDEEEEFFFF00001111222233334444',
    riskScore: 12,
    riskLevel: 'LOW',
    label: 'Binance Regulated Settlement',
    tags: ['KYC Verified', 'Regulated VASP'],
    firstSeen: '2023-05-12',
    lastActivity: '2026-08-18 10:25:11',
    totalInflow: 120000000,
    totalOutflow: 118000000,
    txCount: 890000,
    primaryAsset: 'BTC',
    assets: [
      { symbol: 'BTC', balance: '120.5', usdValue: 7230000, pct: 100 }
    ],
    associatedEntity: 'Binance Global',
    clusterId: 'CL-0001',
    layeringHops: 0,
    rapidMovement: false,
    isNew: false
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    hash: '0xa72f9d84c1b920194857102938475610293847561029384756102938475691f3',
    timestamp: '2026-08-18 10:18:22',
    from: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    to: '0x4B91E72D88C3A410928371F029C8B201A9E7E72D',
    asset: 'USDT',
    amount: 184200,
    usdValue: 184200,
    riskScore: 94,
    riskLevel: 'CRITICAL',
    status: 'Flagged',
    network: 'Ethereum Mainnet',
    gasFee: '0.0042 ETH ($10.92)',
    blockNumber: '19842109',
    riskReasons: [
      'High-risk sender identified in mixer cluster',
      'Rapid velocity fund transfer (< 5 min delay)',
      'Layering fan-out to newly created address'
    ]
  },
  {
    hash: '0xb831a294d102938475610293847561029384756102938475610293847561a84c',
    timestamp: '2026-08-18 10:11:00',
    from: '0x4B91E72D88C3A410928371F029C8B201A9E7E72D',
    to: '0x3F881920A4B100293C817029F710A029B8103F88',
    asset: 'USDT',
    amount: 92000,
    usdValue: 92000,
    riskScore: 88,
    riskLevel: 'CRITICAL',
    status: 'Flagged',
    network: 'Ethereum Mainnet',
    gasFee: '0.0038 ETH ($9.88)',
    blockNumber: '19842101',
    riskReasons: [
      'Direct transfer to Sanctioned Darknet Mixer Portal',
      'Split transfer structuring pattern'
    ]
  },
  {
    hash: '0xc942b305e203049586721304958672130495867213049586721304958672b95d',
    timestamp: '2026-08-18 10:03:15',
    from: '0x82FAB10C5D71829402B19385019A82D1C92FB10C',
    to: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    asset: 'USDT',
    amount: 184200,
    usdValue: 184200,
    riskScore: 78,
    riskLevel: 'HIGH',
    status: 'Under Review',
    network: 'Ethereum Mainnet',
    gasFee: '0.0040 ETH ($10.40)',
    blockNumber: '19842095',
    riskReasons: [
      'Unusual transaction frequency',
      'Intermediary buffer consolidation'
    ]
  },
  {
    hash: '0xd053c416f314150697832415069783241506978324150697832415069783c06e',
    timestamp: '2026-08-18 09:52:14',
    from: '0x9E21A4B02910F1D8205C92B10471A192B049E21A',
    to: '0x82FAB10C5D71829402B19385019A82D1C92FB10C',
    asset: 'USDT',
    amount: 250000,
    usdValue: 250000,
    riskScore: 68,
    riskLevel: 'HIGH',
    status: 'Under Review',
    network: 'Ethereum Mainnet',
    gasFee: '0.0035 ETH ($9.10)',
    blockNumber: '19842080',
    riskReasons: [
      'Large off-market OTC movement'
    ]
  },
  {
    hash: '0xe164d527a425261708943526170894352617089435261708943526170894d17f',
    timestamp: '2026-08-18 09:42:00',
    from: '0x111122223333444455556666777788889999AAAA',
    to: '0x9E21A4B02910F1D8205C92B10471A192B049E21A',
    asset: 'USDT',
    amount: 300000,
    usdValue: 300000,
    riskScore: 42,
    riskLevel: 'MEDIUM',
    status: 'Cleared',
    network: 'Ethereum Mainnet',
    gasFee: '0.0028 ETH ($7.28)',
    blockNumber: '19842050',
    riskReasons: [
      'Standard exchange withdrawal'
    ]
  }
];

export const INITIAL_INVESTIGATIONS = [
  {
    id: 'INV-2026-004',
    title: 'Multi-layer USDT Anonymization & Rapid Drain',
    targetWallet: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    suspicionType: 'Layering & Mixing',
    totalFlow: 184200,
    asset: 'USDT',
    relatedEntitiesCount: 4,
    status: 'CRITICAL',
    lastUpdated: '2026-08-18 10:18',
    assignedAnalyst: 'INV-2047 (Lead Investigator)',
    summary: 'Automated intelligence rules flagged wallet 0x71C8...A92F executing rapid high-volume USDT transfers through 7 intermediary hop addresses within 36 minutes, terminating at a known sanctioned mixer portal.',
    riskIndicators: [
      'Rapid fund movement (< 5 min latency between hops)',
      'Multi-hop layering pattern across 7 accounts',
      'High-risk counterparty exposure (CryptoClean Mixer)',
      'Newly created destination wallets (< 7 days old)',
      'Sub-threshold structured amounts ($92,000 splits)',
      'Cross-asset conversion attempt (ETH/USDT)'
    ],
    timeline: [
      { time: '09:42', title: 'Initial Deposit Detected', desc: '300,000 USDT withdrawn from Nova Exchange Proxy 0x9E21...E21A.' },
      { time: '09:47', title: 'Funds Transferred to Intermediary', desc: '250,000 USDT routed through buffer wallet 0x82FA...B10C.' },
      { time: '09:52', title: 'Funds Split Across 3 Wallets', desc: 'Transfers split into $184.2K, $35.8K, and $30K tranches.' },
      { time: '10:03', title: 'Assets Converted', desc: 'Partial USDT swapped for WETH via decentralized protocol.' },
      { time: '10:11', title: 'Funds Moved to High-Risk Destination', desc: '$92,000 USDT deposited into CryptoClean Mixer portal.' },
      { time: '10:18', title: 'Critical Alert Escalated', desc: 'TRACEINTEL Risk Engine trigger rule #804 fired; case auto-generated.' }
    ],
    analystNotes: [
      { date: '2026-08-18 10:22', author: 'Inv. Sarah Vance', text: 'Initiated freeze request query with VASP compliance liaison for Nova Exchange proxy address.' },
      { date: '2026-08-18 10:45', author: 'Inv. Mark Sterling', text: 'Graph analysis confirms 0x71C8 is part of Cluster CL-9021 linked to Eastern Europe cybercrime syndicate.' }
    ],
    recommendedActions: [
      'Issue emergency freeze order request to Nova Exchange VASP compliance portal.',
      'Submit blockchain cluster tag update to international law enforcement shared database.',
      'Generate full evidentiary PDF report for FinCEN SAR filing.'
    ]
  },
  {
    id: 'INV-2026-001',
    title: 'Ransomware Proceeds Laundering via OTC',
    targetWallet: '0x4B91E72D88C3A410928371F029C8B201A9E7E72D',
    riskScore: 82,
    riskLevel: 'CRITICAL',
    suspicionType: 'Ransomware Proceeds',
    totalFlow: 520000,
    asset: 'BTC',
    relatedEntitiesCount: 3,
    status: 'Open',
    lastUpdated: '2026-08-18 09:12',
    assignedAnalyst: 'Inv. David Miller'
  },
  {
    id: 'INV-2026-002',
    title: 'DeFi Flash Loan Exploit Pool Drain',
    targetWallet: '0x82FAB10C5D71829402B19385019A82D1C92FB10C',
    riskScore: 68,
    riskLevel: 'HIGH',
    suspicionType: 'Exploit / Theft',
    totalFlow: 1450000,
    asset: 'ETH',
    relatedEntitiesCount: 5,
    status: 'Under Review',
    lastUpdated: '2026-08-17 18:40',
    assignedAnalyst: 'Inv. Elena Rostova'
  },
  {
    id: 'INV-2026-003',
    title: 'Structured OTC Smurfing Campaign',
    targetWallet: '0x9E21A4B02910F1D8205C92B10471A192B049E21A',
    riskScore: 61,
    riskLevel: 'HIGH',
    suspicionType: 'Structuring',
    totalFlow: 890000,
    asset: 'USDT',
    relatedEntitiesCount: 2,
    status: 'Escalated',
    lastUpdated: '2026-08-16 14:05',
    assignedAnalyst: 'Inv. Alex Chen'
  }
];

export const INITIAL_CASES = [
  {
    id: 'CP-2026-004',
    name: 'Layered USDT Movement - Operation CyberSweep',
    priority: 'Critical',
    targetWallet: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    riskScore: 94,
    assignedAnalyst: 'Inv. Sarah Vance (INV-2047)',
    status: 'Open',
    createdDate: '2026-08-18',
    description: 'Investigation into automated high-frequency laundering of USDT proceeds originating from unauthorized exchange withdrawals.'
  },
  {
    id: 'CP-2026-001',
    name: 'Syndicate Mixing Cluster CL-1004',
    priority: 'High',
    targetWallet: '0x3F881920A4B100293C817029F710A029B8103F88',
    riskScore: 88,
    assignedAnalyst: 'Inv. Mark Sterling',
    status: 'Open',
    createdDate: '2026-08-10',
    description: 'Long-term monitoring of Sanctioned Darknet Mixer Portal liquidity pools.'
  },
  {
    id: 'CP-2026-002',
    name: 'Unregulated OTC Settlement Portal',
    priority: 'Medium',
    targetWallet: '0x9E21A4B02910F1D8205C92B10471A192B049E21A',
    riskScore: 62,
    assignedAnalyst: 'Inv. Elena Rostova',
    status: 'Under Review',
    createdDate: '2026-08-04',
    description: 'Review of unverified off-chain settlement counterparty interactions.'
  }
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-8901',
    wallet: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    alertType: 'Layering & Mixing',
    severity: 'CRITICAL',
    riskScore: 94,
    amount: '$184,200 USDT',
    time: '10 min ago',
    status: 'Unresolved',
    message: '$184,200 USDT transferred through 7 intermediary wallets in < 36 mins. Destination linked to sanctioned mixer pool.'
  },
  {
    id: 'ALT-8898',
    wallet: '0x4B91E72D88C3A410928371F029C8B201A9E7E72D',
    alertType: 'Rapid Movement',
    severity: 'HIGH',
    riskScore: 82,
    amount: '$92,000 USDT',
    time: '25 min ago',
    status: 'Unresolved',
    message: 'Multiple rapid transfers to newly created recipient wallet addresses detected.'
  },
  {
    id: 'ALT-8895',
    wallet: '0x82FAB10C5D71829402B19385019A82D1C92FB10C',
    alertType: 'Unusual Frequency',
    severity: 'MEDIUM',
    riskScore: 65,
    amount: '$250,000 USDT',
    time: '42 min ago',
    status: 'Unresolved',
    message: 'Unusual transaction frequency detected exceeding 400% baseline threshold.'
  },
  {
    id: 'ALT-8889',
    wallet: '0x3F881920A4B100293C817029F710A029B8103F88',
    alertType: 'Sanctioned Counterparty',
    severity: 'CRITICAL',
    riskScore: 88,
    amount: '$92,000 USDT',
    time: '1 hour ago',
    status: 'Under Review',
    message: 'Direct fund transfer into OFAC-sanctioned mixer contract address.'
  },
  {
    id: 'ALT-8870',
    wallet: '0x9E21A4B02910F1D8205C92B10471A192B049E21A',
    alertType: 'Structuring',
    severity: 'HIGH',
    riskScore: 73,
    amount: '$300,000 USDT',
    time: '2 hours ago',
    status: 'Resolved',
    message: 'Sub-threshold round figure deposit fan-out pattern observed.'
  }
];

export const INITIAL_ENTITIES = [
  {
    id: 'ENT-01',
    name: 'CryptoClean Mixer',
    type: 'Decentralized Mixer / Tumbler',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    connectedWallets: 184,
    volumeMonitored: '$42.8M',
    status: 'Sanctioned / High Risk',
    jurisdiction: 'Unknown / Unregulated',
    description: 'Privacy-focused zero-knowledge mixing protocol widely identified in cybercrime proceeds anonymization.'
  },
  {
    id: 'ENT-02',
    name: 'Nova Exchange',
    type: 'Cryptocurrency Exchange (VASP)',
    riskScore: 78,
    riskLevel: 'HIGH',
    connectedWallets: 42,
    volumeMonitored: '$118.5M',
    status: 'Under Review',
    jurisdiction: 'Offshore / Partial Compliance',
    description: 'High-volume regional exchange featuring lax KYC requirements on sub-10K withdrawals.'
  },
  {
    id: 'ENT-03',
    name: 'BitSec OTC Desk',
    type: 'Over-The-Counter Broker',
    riskScore: 62,
    riskLevel: 'HIGH',
    connectedWallets: 19,
    volumeMonitored: '$14.2M',
    status: 'Monitored',
    jurisdiction: 'Seychelles',
    description: 'Institutional liquidity provider offering non-custodial fiat off-ramping services.'
  },
  {
    id: 'ENT-04',
    name: 'Darknet Portal Alpha',
    type: 'Illicit Marketplace',
    riskScore: 99,
    riskLevel: 'CRITICAL',
    connectedWallets: 310,
    volumeMonitored: '$89.1M',
    status: 'Blacklisted',
    jurisdiction: 'Tor Network',
    description: 'Decentralized darknet vendor syndicate specializing in financial cyberware and stolen data.'
  },
  {
    id: 'ENT-05',
    name: 'Binance Global',
    type: 'Regulated Exchange (VASP)',
    riskScore: 15,
    riskLevel: 'LOW',
    connectedWallets: 840,
    volumeMonitored: '$1.2B',
    status: 'Compliant / Verified',
    jurisdiction: 'International Compliance',
    description: 'Fully regulated global digital asset platform with automated LEA compliance API integrations.'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'REP-2026-094',
    caseId: 'CP-2026-004',
    title: 'Evidentiary Synthesis: Multi-layer USDT Anonymization',
    targetWallet: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    generatedBy: 'Inv. Sarah Vance (INV-2047)',
    generatedDate: '2026-08-18 10:50',
    riskLevel: 'CRITICAL',
    status: 'Completed',
    fileSize: '4.2 MB'
  },
  {
    id: 'REP-2026-088',
    caseId: 'CP-2026-001',
    title: 'Mixer Liquidity Exposure Assessment',
    targetWallet: '0x3F881920A4B100293C817029F710A029B8103F88',
    generatedBy: 'Inv. Mark Sterling',
    generatedDate: '2026-08-12 14:15',
    riskLevel: 'CRITICAL',
    status: 'Completed',
    fileSize: '2.8 MB'
  }
];

// Interactive Graph Nodes & Edges Dataset
export const GRAPH_DATA = {
  nodes: [
    { id: 'n1', address: '0x9E21A4B02910F1D8205C92B10471A192B049E21A', label: 'Nova Proxy (Source)', type: 'Exchange Proxy', riskScore: 73, level: 'HIGH', x: 100, y: 250, inflow: '$920K', outflow: '$890K', txs: 612 },
    { id: 'n2', address: '0x82FAB10C5D71829402B19385019A82D1C92FB10C', label: 'Buffer Wallet 1', type: 'Intermediary Buffer', riskScore: 65, level: 'HIGH', x: 300, y: 150, inflow: '$250K', outflow: '$245K', txs: 89 },
    { id: 'n3', address: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F', label: 'Target Wallet 0x71C8 (Hub)', type: 'Mixing Hub', riskScore: 94, level: 'CRITICAL', x: 500, y: 250, inflow: '$412.5K', outflow: '$398.1K', txs: 148 },
    { id: 'n4', address: '0x4B91E72D88C3A410928371F029C8B201A9E7E72D', label: 'Intermediary Node Beta', type: 'Intermediary Node', riskScore: 82, level: 'CRITICAL', x: 700, y: 150, inflow: '$184.2K', outflow: '$184K', txs: 34 },
    { id: 'n5', address: '0x3F881920A4B100293C817029F710A029B8103F88', label: 'CryptoClean Mixer (Dest)', type: 'Sanctioned Mixer', riskScore: 88, level: 'CRITICAL', x: 900, y: 250, inflow: '$5.4M', outflow: '$5.39M', txs: 4210 },
    { id: 'n6', address: '0xBBBBCCCCDDDDEEEEFFFF00001111222233334444', label: 'Binance (Regulated)', type: 'Regulated VASP', riskScore: 12, level: 'LOW', x: 700, y: 380, inflow: '$120M', outflow: '$118M', txs: 890000 }
  ],
  edges: [
    { from: 'n1', to: 'n2', amount: '$300,000 USDT', txHash: '0xe164d527a425261708943526170894352617089435261708943526170894d17f' },
    { from: 'n2', to: 'n3', amount: '$184,200 USDT', txHash: '0xc942b305e203049586721304958672130495867213049586721304958672b95d' },
    { from: 'n3', to: 'n4', amount: '$184,200 USDT', txHash: '0xa72f9d84c1b920194857102938475610293847561029384756102938475691f3' },
    { from: 'n4', to: 'n5', amount: '$92,000 USDT', txHash: '0xb831a294d102938475610293847561029384756102938475610293847561a84c' },
    { from: 'n3', to: 'n6', amount: '$30,000 USDT', txHash: '0xf0192837465102938475610293847561029384756102938475610293847560a1' }
  ]
};
