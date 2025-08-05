import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [apiData, setApiData] = useState<any>(null);
  const { toast } = useToast();

  /**
   * CORS PROXY SOLUTION FOR NHL API ACCESS
   * 
   * Problem: NHL APIs (api-web.nhle.com, api.nhle.com) don't include CORS headers,
   * causing "CORS policy" errors when accessed directly from browser applications.
   * 
   * Solution: Use CORS proxy services that add the necessary headers.
   * We maintain multiple proxies for reliability - if one fails, we try the next.
   * 
   * Proxy Services:
   * 1. api.allorigins.win - Most reliable, good uptime
   * 2. corsproxy.io - Fast and stable backup
   * 3. cors-anywhere.herokuapp.com - Secondary backup (rate limited)
   */
  const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://cors-anywhere.herokuapp.com/',
  ];

  /**
   * TEST NHL WEB API - SCHEDULE ENDPOINT
   * 
   * This function tests the primary NHL Web API which provides:
   * - Current and upcoming game schedules
   * - Live game data and scores
   * - Real-time updates
   * 
   * Endpoint: https://api-web.nhle.com/v1/schedule/now
   * Returns: Today's NHL games and schedule information
   */
  const testNHLConnection = async () => {
    setConnectionStatus('testing');
    setApiData(null);
    
    const targetUrl = 'https://api-web.nhle.com/v1/schedule/now';
    
    // PROXY FALLBACK SYSTEM: Try each CORS proxy until one works
    // This ensures reliability - if one proxy service is down, we try the next
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      const proxyUrl = CORS_PROXIES[i];
      const fullUrl = proxyUrl + encodeURIComponent(targetUrl);
      
      try {
        console.log(`Attempting NHL Web API connection via proxy ${i + 1}:`, fullUrl);
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setApiData({
          source: 'NHL Web API',
          proxy: proxyUrl,
          data: data
        });
        setConnectionStatus('success');
        
        toast({
          title: "NHL API Connection Successful!",
          description: `Connected via proxy ${i + 1}: ${proxyUrl}`,
        });
        
        return; // Success, exit the loop
        
      } catch (error) {
        console.error(`Proxy ${i + 1} failed:`, error);
        
        // If this was the last proxy, show error
        if (i === CORS_PROXIES.length - 1) {
          setConnectionStatus('error');
          toast({
            title: "NHL API Connection Failed",
            description: "All proxy services failed. Please try again later.",
            variant: "destructive",
          });
        }
      }
    }
  };

  /**
   * TEST NHL STATS API - STATISTICAL DATA
   * 
   * This function tests the NHL Stats API which provides:
   * - Player statistics and rankings
   * - Team performance data
   * - Historical statistics
   * - League leaders and records
   * 
   * Strategy: Try multiple endpoints to find the most reliable one.
   * Different endpoints may have different availability/reliability.
   */
  const testStatsAPI = async () => {
    setConnectionStatus('testing');
    setApiData(null);
    
    // Multiple Stats API endpoints - we try each until one works
    // team: Basic team information and stats
    // leaders/skaters/points: Top point scorers (usually very reliable)
    // season: Current season information
    const statsEndpoints = [
      'https://api.nhle.com/stats/rest/en/team',
      'https://api.nhle.com/stats/rest/en/leaders/skaters/points',
      'https://api.nhle.com/stats/rest/en/season'
    ];
    
    for (let endpointIndex = 0; endpointIndex < statsEndpoints.length; endpointIndex++) {
      const targetUrl = statsEndpoints[endpointIndex];
      
      // NESTED FALLBACK: Try each CORS proxy for this endpoint
      // If an endpoint fails on one proxy, we try it on other proxies before moving to next endpoint
      for (let i = 0; i < CORS_PROXIES.length; i++) {
        const proxyUrl = CORS_PROXIES[i];
        const fullUrl = proxyUrl + encodeURIComponent(targetUrl);
        
        try {
          console.log(`Attempting NHL Stats API (endpoint ${endpointIndex + 1}) via proxy ${i + 1}:`, fullUrl);
          
          const response = await fetch(fullUrl);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setApiData({
            source: 'NHL Stats API',
            endpoint: targetUrl,
            proxy: proxyUrl,
            data: data
          });
          setConnectionStatus('success');
          
          toast({
            title: "NHL Stats API Connection Successful!",
            description: `Connected to ${targetUrl.split('/').pop()} via proxy ${i + 1}`,
          });
          
          return; // Success, exit both loops
          
        } catch (error) {
          console.error(`Endpoint ${endpointIndex + 1}, Proxy ${i + 1} failed:`, error);
        }
      }
    }
    
    // If we get here, all endpoints and proxies failed
    setConnectionStatus('error');
    toast({
      title: "NHL Stats API Connection Failed",
      description: "All endpoints and proxy services failed. Please try again later.",
      variant: "destructive",
    });
  };

  /**
   * TEST NHL STANDINGS API - TEAM STANDINGS
   * 
   * This function tests the NHL Web API's standings endpoint which provides:
   * - Current team standings by division/conference
   * - Win/loss records
   * - Points and playoff positioning
   * - Conference and division rankings
   * 
   * Endpoint: https://api-web.nhle.com/v1/standings/now
   * Returns: Complete NHL standings as of current date
   */
  const testStandingsAPI = async () => {
    setConnectionStatus('testing');
    setApiData(null);
    
    const targetUrl = 'https://api-web.nhle.com/v1/standings/now';
    
    // Try each CORS proxy until one works
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      const proxyUrl = CORS_PROXIES[i];
      const fullUrl = proxyUrl + encodeURIComponent(targetUrl);
      
      try {
        console.log(`Attempting NHL Standings API via proxy ${i + 1}:`, fullUrl);
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setApiData({
          source: 'NHL Standings API',
          proxy: proxyUrl,
          data: data
        });
        setConnectionStatus('success');
        
        toast({
          title: "NHL Standings API Connection Successful!",
          description: `Connected via proxy ${i + 1}: ${proxyUrl}`,
        });
        
        return; // Success, exit the loop
        
      } catch (error) {
        console.error(`Proxy ${i + 1} failed:`, error);
        
        // If this was the last proxy, show error
        if (i === CORS_PROXIES.length - 1) {
          setConnectionStatus('error');
          toast({
            title: "NHL Standings API Connection Failed",
            description: "All proxy services failed. Please try again later.",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">NHL API Connection Test</h1>
          <p className="text-xl text-muted-foreground">
            Let's verify we can connect to the NHL APIs and pull data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>NHL Web API</CardTitle>
              <p className="text-muted-foreground">Schedule Data</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Primary API for current schedules, games, and real-time data
              </p>
              <Button 
                onClick={testNHLConnection}
                disabled={connectionStatus === 'testing'}
                className="w-full"
              >
                {connectionStatus === 'testing' ? 'Testing...' : 'Test Schedule API'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NHL Standings</CardTitle>
              <p className="text-muted-foreground">Standings Data</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Current NHL standings and team positions
              </p>
              <Button 
                onClick={testStandingsAPI}
                disabled={connectionStatus === 'testing'}
                className="w-full"
                variant="secondary"
              >
                {connectionStatus === 'testing' ? 'Testing...' : 'Test Standings API'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NHL Stats API</CardTitle>
              <p className="text-muted-foreground">Player & Team Stats</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Statistical data including player stats, leaders, and historical data
              </p>
              <Button 
                onClick={testStatsAPI}
                disabled={connectionStatus === 'testing'}
                className="w-full"
                variant="outline"
              >
                {connectionStatus === 'testing' ? 'Testing...' : 'Test Stats API'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Connection Status */}
        <div className="text-center mb-6">
          <Badge 
            variant={
              connectionStatus === 'success' ? 'default' : 
              connectionStatus === 'error' ? 'destructive' : 
              connectionStatus === 'testing' ? 'secondary' : 'outline'
            }
          >
            {connectionStatus === 'idle' && 'Ready to Test'}
            {connectionStatus === 'testing' && 'Testing Connection...'}
            {connectionStatus === 'success' && 'Connection Successful'}
            {connectionStatus === 'error' && 'Connection Failed'}
          </Badge>
        </div>

        {/* API Response Data */}
        {apiData && (
          <Card>
            <CardHeader>
              <CardTitle>API Response Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-auto max-h-96">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
