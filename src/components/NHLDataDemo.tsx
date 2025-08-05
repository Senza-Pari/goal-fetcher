import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNHLAPI } from "@/hooks/useNHLAPI";
import { NHLEndpoints } from "@/lib/nhl-endpoints";
import type { NHLScheduleResponse, NHLClubScheduleResponse, NHLStandingsResponse } from "@/types/nhl";

/**
 * Reusable NHL Data Demo Component
 * 
 * Example component showing how to use the NHL API system
 * Copy this pattern for your game projects
 */
export const NHLDataDemo = () => {
  const { data, loading, error, fetchData, clearData } = useNHLAPI();

  const testCurrentSchedule = () => {
    fetchData(NHLEndpoints.getCurrentSchedule());
  };

  const testAvalancheSchedule = () => {
    fetchData(NHLEndpoints.getTeamSchedule('COL'));
  };

  const testStandings = () => {
    fetchData(NHLEndpoints.getCurrentStandings());
  };

  const testPlayerLeaders = () => {
    fetchData(NHLEndpoints.getPlayerLeaders(), 'stats');
  };

  const getStatusBadge = () => {
    if (loading) return <Badge variant="secondary">Testing...</Badge>;
    if (error) return <Badge variant="destructive">Error</Badge>;
    if (data) return <Badge variant="default">Connected ✓</Badge>;
    return <Badge variant="outline">Ready</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">NHL API Integration Demo</h2>
        <p className="text-muted-foreground mb-4">
          Reliable NHL data fetching with automatic CORS proxy fallback
        </p>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>🗓️ Current Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testCurrentSchedule}
              disabled={loading}
              className="w-full"
            >
              Get Today's Games
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🏔️ Avalanche Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testAvalancheSchedule}
              disabled={loading}
              className="w-full"
            >
              Get Avs 2025-26 Season
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🏆 Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testStandings}
              disabled={loading}
              className="w-full"
            >
              Get Current Standings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⭐ Player Leaders</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testPlayerLeaders}
              disabled={loading}
              className="w-full"
            >
              Get Top Players
            </Button>
          </CardContent>
        </Card>
      </div>

      {data && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>API Response</CardTitle>
              <p className="text-sm text-muted-foreground">
                Source: {data.source} | Proxy: {data.proxy.replace('https://', '')}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={clearData}>
              Clear
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
              {JSON.stringify(data.data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};