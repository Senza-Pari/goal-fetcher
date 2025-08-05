/**
 * NHL API Endpoint Library
 * 
 * Centralized collection of all working NHL API endpoints
 * with TypeScript support and easy-to-use helper functions
 */

// Team codes mapping
export const NHL_TEAMS = {
  COL: 'Colorado Avalanche',
  VGK: 'Vegas Golden Knights',
  DAL: 'Dallas Stars',
  LAK: 'Los Angeles Kings',
  // Add more teams as needed
} as const;

export type TeamCode = keyof typeof NHL_TEAMS;

/**
 * NHL Web API endpoints (api-web.nhle.com)
 */
export const NHL_WEB_ENDPOINTS = {
  // Schedule endpoints
  currentSchedule: '/schedule/now',
  teamSchedule: (teamCode: TeamCode, season: string = '20252026') => 
    `/club-schedule-season/${teamCode}/${season}`,
  
  // Standings endpoints
  currentStandings: '/standings/now',
  
  // Team endpoints
  teamRoster: (teamCode: TeamCode) => `/roster/${teamCode}/current`,
  teamStats: (teamCode: TeamCode, season: string = '20252026') => 
    `/club-stats/${teamCode}/${season}/2`,
  
  // Game endpoints
  gameDetails: (gameId: string) => `/gamecenter/${gameId}/landing`,
  
  // Player endpoints
  playerProfile: (playerId: string) => `/player/${playerId}/landing`,
} as const;

/**
 * NHL Stats API endpoints (api.nhle.com/stats)
 */
export const NHL_STATS_ENDPOINTS = {
  // Team statistics
  teamStats: '/team',
  
  // Player statistics
  playerLeaders: '/leaders/skaters',
  goalieLeaders: '/leaders/goalies',
  
  // Franchise information
  franchises: '/franchise',
} as const;

/**
 * Helper functions for common NHL data requests
 */
export const NHLEndpoints = {
  /**
   * Get current NHL schedule
   */
  getCurrentSchedule: () => NHL_WEB_ENDPOINTS.currentSchedule,
  
  /**
   * Get team's full season schedule
   */
  getTeamSchedule: (teamCode: TeamCode, season: string = '20252026') => 
    NHL_WEB_ENDPOINTS.teamSchedule(teamCode, season),
  
  /**
   * Get current standings
   */
  getCurrentStandings: () => NHL_WEB_ENDPOINTS.currentStandings,
  
  /**
   * Get team roster
   */
  getTeamRoster: (teamCode: TeamCode) => 
    NHL_WEB_ENDPOINTS.teamRoster(teamCode),
  
  /**
   * Get team statistics
   */
  getTeamStats: (teamCode: TeamCode, season: string = '20252026') => 
    NHL_WEB_ENDPOINTS.teamStats(teamCode, season),
  
  /**
   * Get player leaders (stats API)
   */
  getPlayerLeaders: () => NHL_STATS_ENDPOINTS.playerLeaders,
  
  /**
   * Get goalie leaders (stats API)
   */
  getGoalieLeaders: () => NHL_STATS_ENDPOINTS.goalieLeaders,
};

/**
 * Validation helpers
 */
export const isValidTeamCode = (code: string): code is TeamCode => {
  return code in NHL_TEAMS;
};

export const getTeamName = (code: TeamCode): string => {
  return NHL_TEAMS[code];
};