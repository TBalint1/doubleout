const BASE_URL = 'http://localhost:5000';

export const PLAYERS_URL = BASE_URL + '/api/players';
export const PLAYER_BY_ID_URL = PLAYERS_URL + '/';
export const PLAYER_BY_SEARCH_URL = PLAYERS_URL + '/search/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const NEW_TOURNAMENT_URL = BASE_URL + '/api/tournaments/new';
export const TOURNAMENTS_URL = BASE_URL + '/api/tournaments';
export const TOURNAMENT_BY_ID_URL = TOURNAMENTS_URL + '/';
export const TOURNAMENT_BY_SEARCH_URL = TOURNAMENTS_URL + '/search/';

export const MATCH_URL = BASE_URL + '/api/matches/';
export const MATCH_BY_ID_URL = MATCH_URL + '/';
export const MATCH_BY_TOURNAMENT_ID_URL = MATCH_URL + '/tournaments/';

export const TEST_URL = BASE_URL + '/api/test';
export const NEW_TEST_URL = TEST_URL + '/new';
export const TEST_BY_ID_URL = TEST_URL + '/';
export const TEST_BY_SEARCH_URL = TEST_URL + '/search/';

export const STATS_URL = BASE_URL + '/api/stats';
export const STATS_BY_ID = STATS_URL + '/';
export const STATS_BY_MATCH_ID_URL = STATS_URL + '/match/';
export const STATS_BY_PLAYER_ID_URL = STATS_URL + '/player/';
export const STATS_BY_TOURNAMENT_ID_URL = STATS_URL + '/tournaments/';
export const START_MATCH_BY_ID = MATCH_URL + '/onGoing';
