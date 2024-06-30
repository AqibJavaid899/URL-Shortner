interface visitHistory {
  timestamp: number;
  userIP: number;
}

export interface IURL {
  shortId: string;
  redirectUrl: string;
  visitHistory: visitHistory[];
}
