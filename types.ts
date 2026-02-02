
export enum AppTab {
  LOCATOR = 'locator',
  STRATEGY = 'strategy',
  COACH = 'coach',
  SOCIAL = 'social',
  PROFILE = 'profile',
  WELCOME = 'welcome',
  ADD_SESSION = 'add_session'
}

export interface Venue {
  id: string;
  name: string;
  distance: string;
  action: string;
  buyIn: string;
  status: string;
  tables: number;
  imageUrl: string;
  isTopChoice?: boolean;
}

export interface Session {
  id: string;
  venue: string;
  game: string;
  duration: string;
  profit: number;
  date: string;
  isLive?: boolean;
  buyIn?: number;
  cashOut?: number;
}

export interface BankrollData {
  total: number;
  growth: number;
  history: { date: string; value: number }[];
}
