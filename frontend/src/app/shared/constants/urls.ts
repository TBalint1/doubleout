const BASE_URL = 'http://localhost:5000';

export const PLAYERS_URL = BASE_URL + '/api/players';
export const PLAYER_BY_ID_URL = PLAYERS_URL + '/';
export const PLAYER_BY_SEARCH_URL = PLAYERS_URL + '/search/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const NEW_TOURNAMENT_URL = BASE_URL + '/api/tournaments/new';
export const TOURNAMENTS_URL = BASE_URL + '/api/tournaments';
export const TOURNAMENT_BY_ID_URL = TOURNAMENTS_URL + '/';
export const TOURNAMENT_BY_SEARCH_URL = TOURNAMENTS_URL + '/search/'

export const MATCH_URL = BASE_URL + '/api/match/'