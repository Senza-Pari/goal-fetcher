import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [apiData, setApiData] = useState<any>(null);
  const { toast } = useToast();

  // Multiple CORS proxy options for reliability
  const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://cors-anywhere.herokuapp.com/',
  ];

  const testNHLConnection = async () => {
    setConnectionStatus('testing');
    setApiData(null);
    
    const targetUrl = 'https://api-web.nhle.com/v1/schedule/now';
    
    // Try each CORS proxy until one works
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

  const testStatsAPI = async () => {
    setConnectionStatus('testing');
    setApiData(null);
    
    const targetUrl = 'https://api.nhle.com/stats/rest/en/standings';
    
    // Try each CORS proxy until one works
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      const proxyUrl = CORS_PROXIES[i];
      const fullUrl = proxyUrl + encodeURIComponent(targetUrl);
      
      try {
        console.log(`Attempting NHL Stats API connection via proxy ${i + 1}:`, fullUrl);
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setApiData({
          source: 'NHL Stats API',
          proxy: proxyUrl,
          data: data
        });
        setConnectionStatus('success');
        
        toast({
          title: "NHL Stats API Connection Successful!",
          description: `Connected via proxy ${i + 1}: ${proxyUrl}`,
        });
        
        return; // Success, exit the loop
        
      } catch (error) {
        console.error(`Proxy ${i + 1} failed:`, error);
        
        // If this was the last proxy, show error
        if (i === CORS_PROXIES.length - 1) {
          setConnectionStatus('error');
          toast({
            title: "NHL Stats API Connection Failed",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>NHL Web API</CardTitle>
              <p className="text-muted-foreground">api-web.nhle.com</p>
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
                {connectionStatus === 'testing' ? 'Testing Connection...' : 'Test Web API'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NHL Stats API</CardTitle>
              <p className="text-muted-foreground">api.nhle.com/stats/rest</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Statistical data including standings, player stats, and historical data
              </p>
              <Button 
                onClick={testStatsAPI}
                disabled={connectionStatus === 'testing'}
                className="w-full"
                variant="outline"
              >
                {connectionStatus === 'testing' ? 'Testing Connection...' : 'Test Stats API'}
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
