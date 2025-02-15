// import { Column } from "react-table";

import { OptionType } from "../../../../_metronic/layout/components/dropDown/DropDownNew";

export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface StrategySingleDataModel {
  win_loss_ratio: number;
  net_pl: number;
  total_profit: number;
  total_loss: number;
  win_ratio: number;
  loss_ratio: number;
  average_win: number;
  average_loss: number;
  no_win_trade: number;
  no_loss_trade: number;
  max_win: number;
  max_loss: number;
}

export interface IStretagyHeader {
  id: number;
  strategy_name: string;
  display_name: string;
}
export interface IBarArray {
  amount: string;
  month: number;
  type: string;
  color: string;
}
export interface IStrategyBarChart {
  bar: IBarArray[];
  average: string;
}

export interface UserAddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}

export interface ITypeKeyVAlue {
  type1: number;
  type2: string;
  type1_name: string;
  type2_name: string;
}
export interface ITypeArray {
  EXIT_TP: ITypeKeyVAlue;
  ENTRY_TP: ITypeKeyVAlue;
  EST: ITypeKeyVAlue;
  TS: ITypeKeyVAlue;
  ETEP: ITypeKeyVAlue;
  ETET: ITypeKeyVAlue;
}

export interface IStrategyData {
  key_name: string[] | unknown;
  name: string[] | unknown;
  type: string[] | unknown;
  value: number[] | unknown;
}
export interface ITableData {
  displayname: string;
  strategyname: string;
  timeframe: string;
  buysell: string;
  exittype: string;
  pl_absolute: string;
  pl_percentage: string;
  type_array: ITypeArray;
  cum_profit?: any;
  id: number;
}

export interface IPositionsTableData {
  CONTRACT: string;
  ENTRYTIME: string;
  EXITTIME: string;
  INSTRUMENTNAME: string;
  POSITION: string;
  SIGNAL: string;
  SIGNALTIME: string;
  STRATEGY: string;
  AVG_PRICE: number;
  LTP: number;
  MTM_PROFIT: string;
  PL_LOT: number;
  EXITPRICE: number;
}

export interface ISelectedDate {
  startDate: string;
  endDate: string;
  key: string;
}
interface Itabs {
  id: number;
  strategy_name: string;
  display_name: string;
}
interface tabsForSecondStep {
  id: number;
  cardName: string;
}

export interface UserCommunicationModel {
  email: boolean;
  sms: boolean;
  phone: boolean;
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean;
  sendCopyToPersonalEmail?: boolean;
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean;
    youAreSentADirectMessage?: boolean;
    someoneAddsYouAsAsAConnection?: boolean;
    uponNewOrder?: boolean;
    newMembershipApproval?: boolean;
    memberRegistration?: boolean;
  };
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean;
    tipsOnGettingMoreOutOfKeen?: boolean;
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean;
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean;
    tipsOnStartBusinessProducts?: boolean;
  };
}

export interface UserSocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface UserModel {
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  first_name: string;
  last_name: string;
  fullname?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: Array<number>;
  pic?: string;
  language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
  timeZone?: string;
  website?: "https://keenthemes.com";
  emailSettings?: UserEmailSettingsModel;
  auth?: AuthModel;
  communication?: UserCommunicationModel;
  address?: UserAddressModel;
  socialNetworks?: UserSocialNetworksModel;
}

export interface ITabsForSecondStep {
  id: number;
  display_name: string;
  strategy_name: string;
}

export interface IDummyData {
  strategy_name: string;
  today: number;
  yesterday: number;
  this_week: number;
  this_month: number;
  last_month: number;
  total_pl: number;
  avg_win: number;
  avg_loss: number;
}

export type SummaryTableColumn = {
  strategy_name: string;
  today: { type1: string; type2: string; color?: string };
  yesterday: { type1: string; type2: string; color?: string };
  this_week: { type1: string; type2: string; color?: string };
  this_month: { type1: string; type2: string; color?: string };
  last_month: { type1: string; type2: string; color?: string };
  total_pl: { type1: string; type2: string; color?: string };
  avg_win: string;
  avg_loss: string;
};

export interface ISummaryKeyData {
  type1: string;
  type2: string;
  color?: string;
}

export interface ISummaryTableData {
  strategy_name: string;
  strategy_display_name: string;
  today: ISummaryKeyData;
  yesterday: ISummaryKeyData;
  this_week: ISummaryKeyData;
  this_month: ISummaryKeyData;
  last_month: ISummaryKeyData;
  total_pl_lot: ISummaryKeyData;
  avg_win: string;
  avg_loss: string;
}

export interface IUsersTableProps {
  tableData: ISummaryTableData[];
  tableColumns: {
    Header: string;
    accessor: string;
  }[];
  setHeaderType?: (value: string) => void;
  setSelectedTab: (value: string) => void;
  // activeStrategy?: string;
  setActiveStrategy: (value: string) => void;
}

export type DashboardTab = "Summary" | "Analysis" | "Positions";

export interface IContextProps {
  headerType: string;
  headerData: IStretagyHeader[] | null;
  setHeaderType: (value: string) => void;
  setSelectedTab: (value: string) => void;
  // activeStrategy: string;
  setActiveStrategy: (value: string) => void;
}

export interface IFilterData {
  strategy_type: OptionType[];
  script: OptionType[];
  action: OptionType[];
  day: OptionType[];
}

export interface ISelectedFilterData {
  selectedStrategy: OptionType;
  selectedScript: OptionType;
  selectedAction: OptionType;
  selectedDay: OptionType;
}

export type TSelectedDataKey = {
  value: null | string;
  label: null | string;
};

export type TSelectedData = {
  strategy_type: TSelectedDataKey;
  script: TSelectedDataKey;
  action: TSelectedDataKey;
  day: TSelectedDataKey;
};

export type TNewSelectedData = {
  script: TSelectedDataKey;
  day: TSelectedDataKey;
};

export interface IFilterModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  headerData: IStretagyHeader[] | null;
  handleFilterSave: (value: TSelectedData) => void;
  filterData: IFilterData;
  // onClearDropdown: (value: string) => void;
  selectedFilterData: TSelectedData;
}

export interface ISummaryTableProps {
  tableData: any;
  columns: any;
  setHeaderType: (value: string) => void;
  // activeStrategy?: string;
  // setActiveStrategy: (value: string) => void;
  isLoading: boolean;
}

export type AnalysisTableProps = {
  tableData: any;
  columns: any;
  isAnalysisDataLoading: boolean;
  isRefetching?: boolean;
};

export interface IPositionsTableProps {
  tableData: any;
  columns: any;
  isLoading: boolean;
}

export interface IDashBoardTabs {
  // headerData: IStretagyHeader[] | null;
  // setHeaderType: (value: string) => void;
  // activeStrategy?: string;
  // setActiveStrategy?: (value: string) => void;
  // headerType?: string;
  // handleSelectedHeaderChange?: (val: {
  //   id: number;
  //   strategy_name: string;
  //   display_name: string;
  //   type: string;
  //   margin: string;
  // }) => void;
  handleHeaderChange: (value: any, data: any, index?: number) => void;
  tabName: string;
  eventKey: number;
  activeKey: number;
  data: any;
  isLoading?: boolean;
}

export interface IRadioBtnProps {
  setContext: (value: string) => void;
  selectedTab?: string;
  radioBtnData?: {
    label: string;
    value: string;
  }[];
  context: string;
  handleSelectedRadioChange?: () => void;
}

export interface IBarChartProps {
  buyselltype: string;
  headerType: string;
}

export type CardsWidget17Props = {
  className?: string;
  chartSize?: number;
  chartLine?: number;
  chartRotate?: number;
  buyselltype: string;
  headerType: string;
};
export interface IPieChartData {
  loss_percent: number;
  total_loss: string;
  total_wins: string;
  win_loss_ratio: number;
  win_percent: number;
}

export interface DoughnutChartProps {
  winRatio: number;
  lossRatio: number;
  circumference?: number;
  showTextCenter?: boolean;
  chartNumber: number;
  textBaseline: string;
}

export interface ISmallSizeCardProps {
  context: string;
  headerType: string;
}

export interface IDateRangeFilterProps {
  setSelectedDate?: (selectedDate: ISelectedDate[]) => void;
  setDropDown: (dropDown: boolean) => void;
}

export interface IInputFieldProps {
  type: string;
  placeholder: string;
  id: string;
  maxLength: number;
  value: string;
  onChange: () => void;
  iserror: boolean;
  disabled: boolean;
  defaultValue: string;
  removeOpacity: boolean;
  showValueCount: boolean;
  min: number;
  textTransform: string;
  handleBlur: void;
  fieldType: string;
  fieldName: string;
  subText: string;
}

export interface IPositionTableProps {
  selectedTab: string;
  headerType: string;
}
