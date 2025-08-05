// Export all types
export * from './types/nhl';

// Export endpoints
export * from './lib/nhl-endpoints';

// Export main hook
export * from './hooks/useNHLAPI';

// Re-export specific items for convenience
export { useNHLAPI } from './hooks/useNHLAPI';
export { NHLEndpoints, NHL_TEAMS } from './lib/nhl-endpoints';
export type { 
  NHLScheduleResponse, 
  NHLClubScheduleResponse, 
  NHLStandingsResponse,
  TeamCode 
} from './types/nhl';