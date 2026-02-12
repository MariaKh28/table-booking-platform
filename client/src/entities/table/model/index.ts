export type Table = {
  id: string;
  seats: number;
  available: boolean;
  provider: 'Provider A' | 'Provider B';
}

export type ArrayTableType = Array<Table> 

export type SearchTablesParams = {
  date: string;
  partySize?: number;
}



