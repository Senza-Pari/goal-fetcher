# NHL API Package

A reliable NHL API integration package with automatic CORS proxy fallback, built for React applications.

## Features

- 🏒 Complete NHL API integration (schedule, standings, team data)
- 🔄 Automatic CORS proxy fallback for reliability
- 📱 React hook with loading states and error handling
- 🎯 TypeScript support with full type definitions
- 🚀 Easy to use and integrate

## Installation

```bash
npm install @your-username/nhl-api
```

## Quick Start

```tsx
import { useNHLAPI, NHLEndpoints } from '@your-username/nhl-api';

function MyComponent() {
  const { data, loading, error, fetchData } = useNHLAPI();

  const getSchedule = async () => {
    try {
      const schedule = await fetchData(NHLEndpoints.getCurrentSchedule());
      console.log('NHL Schedule:', schedule);
    } catch (err) {
      console.error('Failed to fetch schedule:', err);
    }
  };

  return (
    <div>
      <button onClick={getSchedule} disabled={loading}>
        {loading ? 'Loading...' : 'Get NHL Schedule'}
      </button>
      
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data.data, null, 2)}</pre>}
    </div>
  );
}
```

## Available Endpoints

### Schedule Data
```tsx
// Current day's games
await fetchData(NHLEndpoints.getCurrentSchedule());

// Team's full season schedule
await fetchData(NHLEndpoints.getTeamSchedule('COL', '20252026'));
```

### Standings
```tsx
// Current NHL standings
await fetchData(NHLEndpoints.getCurrentStandings());
```

### Team Data
```tsx
// Team roster
await fetchData(NHLEndpoints.getTeamRoster('COL'));

// Team statistics
await fetchData(NHLEndpoints.getTeamStats('COL', '20252026'));
```

### Player Statistics
```tsx
// Top skaters
await fetchData(NHLEndpoints.getPlayerLeaders(), 'stats');

// Top goalies
await fetchData(NHLEndpoints.getGoalieLeaders(), 'stats');
```

## Team Codes

Available team codes: `COL`, `VGK`, `DAL`, `LAK` (more can be added)

## Error Handling

The package automatically tries multiple CORS proxies for reliability:
1. api.allorigins.win
2. corsproxy.io  
3. cors-anywhere.herokuapp.com

## TypeScript

Full TypeScript support with interfaces for all NHL API responses:
- `NHLScheduleResponse`
- `NHLClubScheduleResponse`
- `NHLStandingsResponse`
- `NHLGame`
- `NHLTeam`

## License

MIT