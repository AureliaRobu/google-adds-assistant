import { ArrowUpDown } from 'lucide-react';

interface Campaign {
  name: string;
  status: string;
  spend?: number;
  conversions?: number;
  roas?: number;
  costPerConversion?: number;
  ctr?: number;
  clicks?: number;
  impressions?: number;
  cpc?: number;
}

interface CampaignTableProps {
  campaigns: Campaign[];
  columns?: string[];
}

export function CampaignTable({ campaigns, columns }: CampaignTableProps) {
  const formatCurrency = (value?: number) => {
    if (value === undefined) return '-';
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (value?: number) => {
    if (value === undefined) return '-';
    return value.toLocaleString('en-US');
  };

  const formatPercent = (value?: number) => {
    if (value === undefined) return '-';
    return `${value.toFixed(1)}%`;
  };

  const formatMultiplier = (value?: number) => {
    if (value === undefined) return '-';
    return `${value.toFixed(1)}x`;
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('enabled') || statusLower.includes('active')) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
    if (statusLower.includes('paused')) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
    return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400';
  };

  return (
    <div className="my-4 overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Status
                </th>
                {campaigns.some(c => c.spend !== undefined) && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Spend
                  </th>
                )}
                {campaigns.some(c => c.conversions !== undefined) && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Conversions
                  </th>
                )}
                {campaigns.some(c => c.roas !== undefined) && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    ROAS
                  </th>
                )}
                {campaigns.some(c => c.costPerConversion !== undefined) && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Cost/Conv
                  </th>
                )}
                {campaigns.some(c => c.ctr !== undefined) && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    CTR
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-950 divide-y divide-zinc-200 dark:divide-zinc-800">
              {campaigns.map((campaign, index) => (
                <tr
                  key={index}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {campaign.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  {campaigns.some(c => c.spend !== undefined) && (
                    <td className="px-4 py-3 text-sm text-right text-zinc-900 dark:text-zinc-100 font-medium">
                      {formatCurrency(campaign.spend)}
                    </td>
                  )}
                  {campaigns.some(c => c.conversions !== undefined) && (
                    <td className="px-4 py-3 text-sm text-right text-zinc-600 dark:text-zinc-400">
                      {formatNumber(campaign.conversions)}
                    </td>
                  )}
                  {campaigns.some(c => c.roas !== undefined) && (
                    <td className="px-4 py-3 text-sm text-right text-zinc-600 dark:text-zinc-400">
                      {formatMultiplier(campaign.roas)}
                    </td>
                  )}
                  {campaigns.some(c => c.costPerConversion !== undefined) && (
                    <td className="px-4 py-3 text-sm text-right text-zinc-600 dark:text-zinc-400">
                      {formatCurrency(campaign.costPerConversion)}
                    </td>
                  )}
                  {campaigns.some(c => c.ctr !== undefined) && (
                    <td className="px-4 py-3 text-sm text-right text-zinc-600 dark:text-zinc-400">
                      {formatPercent(campaign.ctr)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
