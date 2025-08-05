import { useState } from 'react';

// CORS Proxy configuration - easy to update if proxies change
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
];

// NHL API base URLs
const NHL_APIS = {
  web: 'https://api-web.nhle.com/v1',
  stats: 'https://api.nhle.com/stats/rest/en'
} as const;

export interface NHLAPIResponse {
  source: string;
  endpoint: string;
  proxy: string;
  data: any;
}

export interface UseNHLAPIReturn {
  data: NHLAPIResponse | null;
  loading: boolean;
  error: string | null;
  fetchData: (endpoint: string, apiType?: keyof typeof NHL_APIS) => Promise<any>;
  clearData: () => void;
}

/**
 * Custom hook for NHL API calls with automatic CORS proxy fallback
 * 
 * Features:
 * - Automatic proxy fallback for reliability
 * - Loading states and error handling
 * - Optional toast notifications (if useToast is available)
 * - TypeScript support
 * 
 * @example
 * const { data, loading, fetchData } = useNHLAPI();
 * 
 * // Get current schedule
 * await fetchData('/schedule/now');
 * 
 * // Get team schedule
 * await fetchData('/club-schedule-season/COL/20252026');
 * 
 * // Get standings
 * await fetchData('/standings/now');
 */
export const useNHLAPI = (options?: { 
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}): UseNHLAPIReturn => {
  const [data, setData] = useState<NHLAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (endpoint: string, apiType: keyof typeof NHL_APIS = 'web'): Promise<any> => {
    setLoading(true);
    setError(null);
    setData(null);

    const baseUrl = NHL_APIS[apiType];
    const targetUrl = `${baseUrl}${endpoint}`;

    // Try each CORS proxy
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      const proxyUrl = CORS_PROXIES[i];
      const fullUrl = proxyUrl + encodeURIComponent(targetUrl);

      try {
        console.log(`Attempting NHL API via proxy ${i + 1}:`, fullUrl);
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        
        const result: NHLAPIResponse = {
          source: `NHL ${apiType.toUpperCase()} API`,
          endpoint: targetUrl,
          proxy: proxyUrl,
          data: responseData
        };
        
        setData(result);
        setLoading(false);
        
        options?.onSuccess?.(responseData);
        
        return responseData;
        
      } catch (err) {
        console.error(`Proxy ${i + 1} failed:`, err);
        continue;
      }
    }
    
    // All proxies failed
    const errorMsg = `Failed to fetch NHL data from ${targetUrl}`;
    setError(errorMsg);
    setLoading(false);
    
    options?.onError?.(errorMsg);
    
    throw new Error(errorMsg);
  };

  const clearData = () => {
    setData(null);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    fetchData,
    clearData
  };
};