/**
 * TypeScript type definitions for NHL API responses
 * 
 * These types help ensure type safety when working with NHL data
 * and provide better IDE support with autocomplete
 */

// Base game information
export interface NHLGame {
  id: number;
  season: number;
  gameType: number; // 1 = Preseason, 2 = Regular Season, 3 = Playoffs
  gameDate: string;
  venue: {
    default: string;
  };
  startTimeUTC: string;
  gameState: string;
  gameScheduleState: string;
  awayTeam: NHLTeamInfo;
  homeTeam: NHLTeamInfo;
}

// Team information in game context
export interface NHLTeamInfo {
  id: number;
  franchiseId: number;
  fullName: string;
  leagueId: number;
  rawTricode: string;
  triCode: string;
  logo: string;
  darkLogo: string;
  awaySplitSquad?: boolean;
  homeSplitSquad?: boolean;
}

// Schedule response structure
export interface NHLScheduleResponse {
  nextStartDate: string | null;
  previousStartDate: string | null;
  gameWeek: NHLGame[];
  oddsPartners: any[];
  preSeasonStartDate: string;
  regularSeasonStartDate: string;
  regularSeasonEndDate: string;
  playoffEndDate: string;
  numberOfGames: number;
  games: NHLGame[];
}

// Club schedule response (team-specific)
export interface NHLClubScheduleResponse {
  seasonId: number;
  gameType: number;
  games: NHLGame[];
}

// Standings response
export interface NHLStandingsResponse {
  standings: NHLStanding[];
}

export interface NHLStanding {
  conferenceAbbrev: string;
  conferenceHomeSequence: number;
  conferenceL10Sequence: number;
  conferenceName: string;
  conferenceRoadSequence: number;
  conferenceSequence: number;
  date: string;
  divisionAbbrev: string;
  divisionHomeSequence: number;
  divisionL10Sequence: number;
  divisionName: string;
  divisionRoadSequence: number;
  divisionSequence: number;
  gameTypeId: number;
  gamesPlayed: number;
  goalDifferential: number;
  goalDifferentialPctg: number;
  goalAgainst: number;
  goalFor: number;
  goalsForPctg: number;
  homeGamesPlayed: number;
  homeGoalDifferential: number;
  homeGoalsAgainst: number;
  homeGoalsFor: number;
  homeLosses: number;
  homeOtLosses: number;
  homePoints: number;
  homeRegulationPlusOtWins: number;
  homeRegulationWins: number;
  homeTies: number;
  homeWins: number;
  l10GamesPlayed: number;
  l10GoalDifferential: number;
  l10GoalsAgainst: number;
  l10GoalsFor: number;
  l10Losses: number;
  l10OtLosses: number;
  l10Points: number;
  l10RegulationPlusOtWins: number;
  l10RegulationWins: number;
  l10Ties: number;
  l10Wins: number;
  leagueHomeSequence: number;
  leagueL10Sequence: number;
  leagueRoadSequence: number;
  leagueSequence: number;
  losses: number;
  otLosses: number;
  placeName: {
    default: string;
  };
  pointPctg: number;
  points: number;
  regulationPlusOtWinPctg: number;
  regulationPlusOtWins: number;
  regulationWinPctg: number;
  regulationWins: number;
  roadGamesPlayed: number;
  roadGoalDifferential: number;
  roadGoalsAgainst: number;
  roadGoalsFor: number;
  roadLosses: number;
  roadOtLosses: number;
  roadPoints: number;
  roadRegulationPlusOtWins: number;
  roadRegulationWins: number;
  roadTies: number;
  roadWins: number;
  seasonId: number;
  shootoutLosses: number;
  shootoutWins: number;
  streakCode: string;
  streakCount: number;
  teamName: {
    default: string;
    fr?: string;
  };
  teamCommonName: {
    default: string;
  };
  teamAbbrev: {
    default: string;
  };
  teamLogo: string;
  ties: number;
  waiversSequence: number;
  wildcardSequence: number;
  winPctg: number;
  wins: number;
}

// Player information
export interface NHLPlayer {
  id: number;
  headshot: string;
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  sweaterNumber?: number;
  positionCode: string;
  shootsCatches: string;
  heightInInches: number;
  weightInPounds: number;
  heightInCentimeters: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: {
    default: string;
  };
  birthCountry: string;
  birthStateProvince?: {
    default: string;
  };
}

// Roster response
export interface NHLRosterResponse {
  seasonId: number;
  rosterType: string;
  forwards: NHLPlayer[];
  defensemen: NHLPlayer[];
  goalies: NHLPlayer[];
}

// Generic API response wrapper
export interface NHLAPIResponse<T = any> {
  source: string;
  endpoint: string;
  proxy: string;
  data: T;
}