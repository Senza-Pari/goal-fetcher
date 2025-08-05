import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [apiData, setApiData] = useState<any>(null);
  const { toast } = useToast();

  const testNHLConnection = async () => {
    setConnectionStatus('testing');
    setApiData(null);
    
    try {
      // Test NHL Web API - Get today's schedule
      const response = await fetch('https://api-web.nhle.com/v1/schedule/now');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setApiData(data);
      setConnectionStatus('success');
      
      toast({
        title: "NHL API Connection Successful!",
        description: "Successfully connected to the NHL API and retrieved data.",
      });
      
    } catch (error) {
      console.error('NHL API connection failed:', error);
      setConnectionStatus('error');
      
      toast({
        title: "NHL API Connection Failed",
        description: "Could not connect to the NHL API. Please try again.",
        variant: "destructive",
      });
    }
  };

  const testStatsAPI = async () => {
    setConnectionStatus('testing');
    setApiData(null);
    
    try {
      // Test NHL Stats API - Get current standings
      const response = await fetch('https://api.nhle.com/stats/rest/en/standings');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setApiData(data);
      setConnectionStatus('success');
      
      toast({
        title: "NHL Stats API Connection Successful!",
        description: "Successfully connected to the NHL Stats API and retrieved standings data.",
      });
      
    } catch (error) {
      console.error('NHL Stats API connection failed:', error);
      setConnectionStatus('error');
      
      toast({
        title: "NHL Stats API Connection Failed",
        description: "Could not connect to the NHL Stats API. Please try again.",
        variant: "destructive",
      });
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
