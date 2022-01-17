export interface Flags {
  png: string;
  svg: string;
}

export interface CardType {
  userId?: string;
  cardId?: string;
  flags: Flags;
  name: string;
  population: number;
  capital: string;
  currencies: string;
  link?: string;
  handleDeleteFunction?: any;
  handleVisitedFunction?: any;
  isVisited?: boolean;
}

export interface CardDetailType extends CardType {
  nativeName: { eng: { official: string; common: string } };
  region: string;
  subregion: string;
  topLevelDomain?: string;
  languages: string[];
  borders: string[];
}

export interface BackButtonType {
  isDetail?: boolean;
  pagetitle?: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterUserType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phonenumber: string;
  dateofbirth: string;
  country: string;
  createdAt?: string;
  logindate?: string;
}
