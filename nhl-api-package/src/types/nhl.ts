/**
 * NHL API Type Definitions
 * 
 * TypeScript interfaces for NHL API responses
 * Covers schedule, standings, and team data
 */

// Game and Schedule Types
export interface NHLGame {
  id: number;
  season: number;
  gameType: number; // 1 = preseason, 2 = regular season, 3 = playoffs
  gameDate: string;
  venue: {
    default: string;
  };
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: Array<{
    id: number;
    market: string;
    countryCode: string;
    network: string;
  }>;
  gameState: string;
  gameScheduleState: string;
  awayTeam: NHLTeam;
  homeTeam: NHLTeam;
}

export interface NHLTeam {
  id: number;
  franchiseId: number;
  fullName: string;
  leagueId: number;
  rawTricode: string;
  triCode: string;
  placeName: {
    default: string;
  };
  commonName: {
    default: string;
  };
  abbrev: string;
  score?: number;
  logo: string;
  darkLogo: string;
  radioLink: string;
  odds?: Array<{
    providerId: number;
    value: string;
  }>;
}

// Schedule Response Types
export interface NHLScheduleResponse {
  nextStartDate: string | null;
  previousStartDate: string | null;
  gameWeek: Array<{
    date: string;
    dayAbbrev: string;
    numberOfGames: number;
    games: NHLGame[];
  }>;
  oddsPartners: Array<{
    partnerId: number;
    country: string;
    name: string;
    imageUrl: string;
    siteUrl: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
  }>;
  preSeasonStartDate: string;
  regularSeasonStartDate: string;
  regularSeasonEndDate: string;
  playoffEndDate: string;
  numberOfGames: number;
}

export interface NHLClubScheduleResponse {
  clubTimezone: string;
  clubUTCOffset: string;
  games: NHLGame[];
}

// Standings Types
export interface NHLStandingsResponse {
  wildCardIndicator: boolean;
  standings: Array<{
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
    divisionRoadSequence: string;
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
    homePtPctg: number;
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
      fr?: string;
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
    roadPtPctg: number;
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
      fr?: string;
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
  }>;
}