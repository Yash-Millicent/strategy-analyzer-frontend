const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const REGISTER_URL = `${API_URL}/register`;
export const GET_STRATEGY_HEADER_URL = `${API_URL}/strategy`;
export const GET_STRATEGY_BAR_CHART_URL = `${API_URL}/barchart`;
// export const GET_STRATEGY_BAR_CHART_URL = `${API_URL}/barchart/header/{header}/type/{buyselltype}/date/{datetype}`;
export const GET_STRATEGY_CARD_URL = `${API_URL}/strategy/card`;
export const GET_STRATEGY_TABLE_URL = `${API_URL}/strategy/overview`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
export const GET_STRATEGY_WIN_LOSS_RATIO_URL = `${API_URL}/strategy/winloss`;
export const GET_STRATEGY_POSITION_TABLE = `${API_URL}/strategy/openclose`;
export const GET_FILTER_TABLE_DATA = `${API_URL}/strategy/filter`;
export const GET_SUMMARY_TABLE_DATA = `${API_URL}/strategy/summary`;
