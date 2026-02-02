
import { Venue, Session, BankrollData } from './types';

export const VENUES: Venue[] = [
  {
    id: '1',
    name: 'The Bellagio',
    distance: '1.2 mi',
    action: '$1/$3 & $2/$5 NLH',
    buyIn: '$100 - $400',
    status: '12 Tables',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_b_xmbTHvb_cioWsyO8Ze182sG0xPdL2tnwn4zxc4t7hUPzorCrr6vI8G3UYqh8STViuZKJ-lR0PVID0rQjF-yiSgR7ZUanACBM0Q1T0RfjY2gLWA2Bv0vw4vRQkqkKQ4FMc7v6kOpVzS7HCiF_VbORVnGrh6Y_EtwVrTZygZe-NuzC4X-TVuzBUBE1qbw-a7WLRaY1ngGrQ0dm9VSpZ8wbm7Iow6oVZ1WdW2515kd73jeMMRtvJB86gMVUGZ_woJqkIka1A7T2YD',
    isTopChoice: true,
    tables: 12
  },
  {
    id: '2',
    name: 'Wynn Poker Room',
    distance: '2.4 mi',
    action: 'PLO High Action',
    buyIn: '$500 - $1,500',
    status: '8 Wait',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtuDBXa289MQ_zNIkEXLSiLL31W-DY7BiKxheQgYMQSnExkn8HNamFgMx_5T_NZS1hX1B-s_TN-Qgk63Oh59Dk3a3bv_2IXBu0vFtMV7yqV9OMQ-up0xcA6tr8_y5GBh81aTZ-uRzO1-pwPLvRkAc2FNPcbgH9uEV4ygqyNfyLpSF3oCU5Pqj1ImZIMlbDr0DJJBuKS5F1wu-bwUQUEC-GmxIMjDlrDP8cKY-AK-Hl3sBgrBAQiXDHRYdmVs34Te6TW6sDZlLHhI5Q',
    tables: 28
  },
  {
    id: '3',
    name: 'Caesars Palace',
    distance: '1.8 mi',
    action: 'Daily $200 Deepstack',
    buyIn: '$200 Tournament',
    status: 'Reg Open',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5GREkxa1t5XRuxWM1R45pTmgIMTqqlOUfMzPIocwkp8nwqABWgfnMjcoxSmUJKN5J-G7c8qDx5sZGWrM_wH3OL_lC72HcXh2rIt68qUQhnk1FG6C3fHDZO_aQpNdrAPru_xEeijrJUdryNmNnoT4QAbuUWP8LjL3KJDjGc-lS9x07S9qCBVICXAR-yOxTrfxh3WNeq0vQhPMHazPtU-y1H6Nz7P2aPi3WSViyuLZ47GKRZVojUQuSSvwksqJCvBvy1WE5To3PTLYa',
    tables: 16
  }
];

export const SESSIONS: Session[] = [
  {
    id: 's1',
    venue: 'Resorts World LV',
    game: '$5/$10 NLH',
    duration: '2h 45m',
    profit: 840,
    date: 'LIVE',
    isLive: true
  },
  {
    id: 's2',
    venue: 'Aria Resort',
    game: '$2/$5 NLH',
    duration: '6h 12m',
    profit: 1120,
    date: 'Jun 28'
  },
  {
    id: 's3',
    venue: 'GG Poker',
    game: '$1/$2 PLO',
    duration: '4h 30m',
    profit: -450,
    date: 'Jun 26'
  },
  {
    id: 's4',
    venue: 'Wynn Las Vegas',
    game: '$5/$10 NLH',
    duration: '8h 05m',
    profit: 2400,
    date: 'Jun 24'
  }
];

export const BANKROLL: BankrollData = {
  total: 42500,
  growth: 12.4,
  history: [
    { date: 'JUN 01', value: 38000 },
    { date: 'JUN 05', value: 39500 },
    { date: 'JUN 10', value: 37000 },
    { date: 'JUN 15', value: 40200 },
    { date: 'JUN 20', value: 39000 },
    { date: 'JUN 25', value: 41500 },
    { date: 'JUN 30', value: 42500 }
  ]
};
