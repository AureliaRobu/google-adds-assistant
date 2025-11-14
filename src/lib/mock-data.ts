// Mock Google Ads data for prototype demonstration
export interface Campaign {
  id: string;
  name: string;
  status: 'ENABLED' | 'PAUSED';
  budget: number;
  budgetType: 'DAILY' | 'MONTHLY';
  impressions: number;
  clicks: number;
  ctr: number;
  avgCpc: number;
  cost: number;
  conversions: number;
  conversionRate: number;
  costPerConversion: number;
  roas: number;
}

export interface Keyword {
  id: string;
  campaignId: string;
  campaignName: string;
  text: string;
  matchType: 'EXACT' | 'PHRASE' | 'BROAD';
  status: 'ENABLED' | 'PAUSED';
  impressions: number;
  clicks: number;
  ctr: number;
  avgCpc: number;
  cost: number;
  conversions: number;
  qualityScore: number;
}

export interface AdAccount {
  id: string;
  name: string;
  currency: string;
}

// Mock account
export const mockAccount: AdAccount = {
  id: '123-456-7890',
  name: 'Demo Marketing Agency',
  currency: 'USD',
};

// Mock campaigns with realistic performance data
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp_001',
    name: 'Summer Sale 2024',
    status: 'ENABLED',
    budget: 500,
    budgetType: 'DAILY',
    impressions: 45230,
    clicks: 1356,
    ctr: 3.0,
    avgCpc: 2.45,
    cost: 3322.20,
    conversions: 67,
    conversionRate: 4.94,
    costPerConversion: 49.58,
    roas: 4.2,
  },
  {
    id: 'camp_002',
    name: 'Brand Awareness Campaign',
    status: 'ENABLED',
    budget: 300,
    budgetType: 'DAILY',
    impressions: 128450,
    clicks: 2569,
    ctr: 2.0,
    avgCpc: 1.85,
    cost: 4752.65,
    conversions: 38,
    conversionRate: 1.48,
    costPerConversion: 125.07,
    roas: 1.8,
  },
  {
    id: 'camp_003',
    name: 'Black Friday Promo',
    status: 'PAUSED',
    budget: 1000,
    budgetType: 'DAILY',
    impressions: 89230,
    clicks: 3127,
    ctr: 3.5,
    avgCpc: 3.12,
    cost: 9756.24,
    conversions: 189,
    conversionRate: 6.04,
    costPerConversion: 51.62,
    roas: 5.8,
  },
  {
    id: 'camp_004',
    name: 'Competitor Keywords',
    status: 'ENABLED',
    budget: 200,
    budgetType: 'DAILY',
    impressions: 23450,
    clicks: 587,
    ctr: 2.5,
    avgCpc: 3.85,
    cost: 2259.95,
    conversions: 18,
    conversionRate: 3.07,
    costPerConversion: 125.55,
    roas: 2.1,
  },
  {
    id: 'camp_005',
    name: 'Retargeting - Website Visitors',
    status: 'ENABLED',
    budget: 150,
    budgetType: 'DAILY',
    impressions: 34560,
    clicks: 1384,
    ctr: 4.0,
    avgCpc: 1.65,
    cost: 2283.60,
    conversions: 92,
    conversionRate: 6.65,
    costPerConversion: 24.82,
    roas: 6.5,
  },
];

// Mock keywords with detailed performance
export const mockKeywords: Keyword[] = [
  {
    id: 'kw_001',
    campaignId: 'camp_001',
    campaignName: 'Summer Sale 2024',
    text: 'summer deals online',
    matchType: 'PHRASE',
    status: 'ENABLED',
    impressions: 12450,
    clicks: 423,
    ctr: 3.4,
    avgCpc: 2.35,
    cost: 994.05,
    conversions: 23,
    qualityScore: 8,
  },
  {
    id: 'kw_002',
    campaignId: 'camp_001',
    campaignName: 'Summer Sale 2024',
    text: 'buy summer products',
    matchType: 'EXACT',
    status: 'ENABLED',
    impressions: 8920,
    clicks: 312,
    ctr: 3.5,
    avgCpc: 2.55,
    cost: 795.60,
    conversions: 19,
    qualityScore: 9,
  },
  {
    id: 'kw_003',
    campaignId: 'camp_001',
    campaignName: 'Summer Sale 2024',
    text: 'discount summer sale',
    matchType: 'BROAD',
    status: 'ENABLED',
    impressions: 23860,
    clicks: 621,
    ctr: 2.6,
    avgCpc: 2.48,
    cost: 1540.08,
    conversions: 25,
    qualityScore: 7,
  },
  {
    id: 'kw_004',
    campaignId: 'camp_002',
    campaignName: 'Brand Awareness Campaign',
    text: 'best marketing agency',
    matchType: 'PHRASE',
    status: 'ENABLED',
    impressions: 45230,
    clicks: 904,
    ctr: 2.0,
    avgCpc: 1.75,
    cost: 1582.00,
    conversions: 12,
    qualityScore: 6,
  },
  {
    id: 'kw_005',
    campaignId: 'camp_003',
    campaignName: 'Black Friday Promo',
    text: 'black friday deals',
    matchType: 'EXACT',
    status: 'PAUSED',
    impressions: 56340,
    clicks: 1975,
    ctr: 3.5,
    avgCpc: 3.05,
    cost: 6023.75,
    conversions: 125,
    qualityScore: 9,
  },
  {
    id: 'kw_006',
    campaignId: 'camp_004',
    campaignName: 'Competitor Keywords',
    text: 'competitor brand name',
    matchType: 'EXACT',
    status: 'ENABLED',
    impressions: 15670,
    clicks: 392,
    ctr: 2.5,
    avgCpc: 3.95,
    cost: 1548.40,
    conversions: 11,
    qualityScore: 5,
  },
  {
    id: 'kw_007',
    campaignId: 'camp_005',
    campaignName: 'Retargeting - Website Visitors',
    text: 'visited our website',
    matchType: 'BROAD',
    status: 'ENABLED',
    impressions: 34560,
    clicks: 1384,
    ctr: 4.0,
    avgCpc: 1.65,
    cost: 2283.60,
    conversions: 92,
    qualityScore: 8,
  },
];

// Helper function to get campaigns with filters
export function getCampaigns(filters?: {
  status?: 'ENABLED' | 'PAUSED';
  sortBy?: 'cost' | 'conversions' | 'roas' | 'ctr';
  limit?: number;
}) {
  let campaigns = [...mockCampaigns];

  if (filters?.status) {
    campaigns = campaigns.filter((c) => c.status === filters.status);
  }

  if (filters?.sortBy) {
    const sortKey = filters.sortBy;
    campaigns.sort((a, b) => b[sortKey] - a[sortKey]);
  }

  if (filters?.limit) {
    campaigns = campaigns.slice(0, filters.limit);
  }

  return campaigns;
}

// Helper function to get keywords with filters
export function getKeywords(filters?: {
  campaignId?: string;
  status?: 'ENABLED' | 'PAUSED';
  sortBy?: 'cost' | 'conversions' | 'ctr' | 'qualityScore';
  limit?: number;
}) {
  let keywords = [...mockKeywords];

  if (filters?.campaignId) {
    keywords = keywords.filter((k) => k.campaignId === filters.campaignId);
  }

  if (filters?.status) {
    keywords = keywords.filter((k) => k.status === filters.status);
  }

  if (filters?.sortBy) {
    const sortKey = filters.sortBy;
    keywords.sort((a, b) => b[sortKey] - a[sortKey]);
  }

  if (filters?.limit) {
    keywords = keywords.slice(0, filters.limit);
  }

  return keywords;
}

// Get campaign by ID
export function getCampaignById(id: string) {
  return mockCampaigns.find((c) => c.id === id);
}

// Get account summary
export function getAccountSummary() {
  const totalCost = mockCampaigns.reduce((sum, c) => sum + c.cost, 0);
  const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalClicks = mockCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = mockCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const avgCtr = (totalClicks / totalImpressions) * 100;
  const avgCpc = totalCost / totalClicks;
  const avgConversionRate = (totalConversions / totalClicks) * 100;

  return {
    account: mockAccount,
    totalCost,
    totalConversions,
    totalClicks,
    totalImpressions,
    avgCtr,
    avgCpc,
    avgConversionRate,
    activeCampaigns: mockCampaigns.filter((c) => c.status === 'ENABLED').length,
    totalCampaigns: mockCampaigns.length,
  };
}

// Get performance insights (for Claude to analyze)
export function getPerformanceInsights() {
  const campaigns = getCampaigns({ status: 'ENABLED' });
  const bestPerforming = getCampaigns({ sortBy: 'roas', limit: 1 })[0];
  const worstPerforming = campaigns.sort((a, b) => a.roas - b.roas)[0];
  const highestSpend = getCampaigns({ sortBy: 'cost', limit: 1 })[0];
  const bestCtr = getCampaigns({ sortBy: 'ctr', limit: 1 })[0];

  return {
    bestPerforming,
    worstPerforming,
    highestSpend,
    bestCtr,
    totalActiveCampaigns: campaigns.length,
  };
}
