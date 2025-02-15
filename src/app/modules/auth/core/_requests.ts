import axios from "axios";
import {
  AuthModel,
  IStrategyBarChart,
  IStretagyHeader,
  ITableData,
  UserModel,
  IStrategyData,
} from "./_models";
import {
  GET_FILTER_TABLE_DATA,
  GET_STRATEGY_BAR_CHART_URL,
  GET_STRATEGY_CARD_URL,
  GET_STRATEGY_HEADER_URL,
  GET_STRATEGY_POSITION_TABLE,
  GET_STRATEGY_TABLE_URL,
  GET_STRATEGY_WIN_LOSS_RATIO_URL,
  GET_SUMMARY_TABLE_DATA,
  GET_USER_BY_ACCESSTOKEN_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_URL,
} from "./Endpoint";

// export function _headers(): Record<string, string> {
//   const header: Record<string, string> = {}

//   if (localStorage.getItem("kt-auth-token-v")) {
//     const auth = localStorage.getItem("kt-auth-token-v")
//     header["Authorization"] = "Bearer " + auth
//   }
//   return header
// }
// Server should return AuthModel
export function login(payload: any) {
  return axios.post<AuthModel>(LOGIN_URL, payload, {
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function logoutUser() {
  return axios.post<AuthModel>(LOGOUT_URL, {});
}
export async function getStrategyCardData(
  buyselltype: string,
  headerType: string
) {
  const url =
    GET_STRATEGY_CARD_URL + "/header/" + headerType + "/type/" + buyselltype;
  if (headerType === null && buyselltype === null) return [];
  const data = await axios.get<IStrategyData[]>(url);
  return data.data;
}

export async function getStrategyBarChart(
  header: string,
  buyselltype: string,
  datetype: string
) {
  try {
    const url =
      GET_STRATEGY_BAR_CHART_URL +
      "/header/" +
      header +
      "/type/" +
      buyselltype +
      "/date/" +
      datetype.toUpperCase();
    if (header === null && buyselltype === null && datetype === null) return;
    const data = await axios.get<IStrategyBarChart>(url);
    // console.log("data", data?.response?.status);
    // handleUnauthenticatedResponse(response.data);
    return data.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
    // console.log("BARCHART", error);
  }
}

export async function getStrategyHeader() {
  try {
    const url = GET_STRATEGY_HEADER_URL;
    const data = await axios.get<IStretagyHeader[]>(url, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    return data.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

export async function getStrategyOverview(
  context: string,
  headerType: string,
  startDate: string,
  endDate: string,
  selectedScrip?: string,
  selectedDay?: string
) {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;

    const url =
      GET_STRATEGY_TABLE_URL +
      "/header/" +
      headerType +
      "/type/" +
      context +
      "/" +
      (startDate || currentDate) +
      "/" +
      (endDate || currentDate) +
      "/scrip/" +
      (selectedScrip ? selectedScrip : "NA") +
      "/day/" +
      (selectedDay ? selectedDay : "NA");

    if (
      headerType === null &&
      context === null &&
      startDate === null &&
      endDate === null
    )
      return;
    const response = await axios.get<ITableData[]>(url);
    return response.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

export async function getStrategyLowerTable(
  header: string,
  radioBtn: string,
  startDate: string,
  endDate: string,
  scrip?: string,
  days?: string
) {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;

    const url =
      GET_STRATEGY_TABLE_URL +
      "/header/" +
      header +
      "/type/" +
      radioBtn +
      "/" +
      (startDate || currentDate) +
      "/" +
      (endDate || currentDate) +
      "/scrip/" +
      (scrip ? scrip : "NA") +
      "/day/" +
      (days ? days : "NA");

    if (
      header === null &&
      radioBtn === null &&
      startDate === null &&
      endDate === null
    )
      return;
    const response = await axios.get<ITableData[]>(url);
    return response.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

export async function getStrategyPosition(
  headerType: string,
  position: string
) {
  try {
    const url =
      GET_STRATEGY_POSITION_TABLE +
      "/header/" +
      headerType +
      "/position/" +
      position;

    if (headerType === null && position === null) return [];

    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  try {
    return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
      email,
    });
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

export function getUserByToken(payload: any) {
  try {
    return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, payload, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
    return error;
  }
}

export async function getWinLossRatio(headerType: string, buyselltype: string) {
  try {
    const url =
      GET_STRATEGY_WIN_LOSS_RATIO_URL +
      "/header/" +
      headerType +
      "/type/" +
      buyselltype;

    if (headerType === null && buyselltype === null) return [];

    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

export async function getTableFilterData() {
  try {
    const url = GET_FILTER_TABLE_DATA;

    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

export async function getSummaryTableData() {
  try {
    const url = GET_SUMMARY_TABLE_DATA;

    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    handleUnauthenticatedResponse(error?.response);
  }
}

export function handleUnauthenticatedResponse(responseData: any) {
  if (responseData?.status === 401) {
    // Redirect to the login page
    window.location.href = "/login";
  }
  //  else {
  //   // Do nothing if the response is authenticated
  //   console.log("Response is authenticated:", responseData);
  // }
}
