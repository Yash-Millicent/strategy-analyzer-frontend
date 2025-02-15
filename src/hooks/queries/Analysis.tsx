import { useQuery } from "react-query";
import {
  getStrategyBarChart,
  getStrategyCardData,
  getStrategyOverview,
  getTableFilterData,
  getWinLossRatio,
} from "../../app/modules/auth/core/_requests";
import { useNavigate } from "react-router-dom";

export const useGetStrategyBarChart = (
  headerType: string,
  buyselltype: string,
  selectedTab: string
) => {
  const navigate = useNavigate();
  return useQuery(
    ["barChartData", headerType, buyselltype, selectedTab],
    () => getStrategyBarChart(headerType, buyselltype, selectedTab),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!headerType && !!buyselltype && !!selectedTab,
      onError: (error: any) => {
        if (error.response && error.response.status === 401) {
          // Token expired, redirect to login page
          // window.location.href = "/auth";
          console.log("OnError");
          // navigate("auth");
        }
      },
    }
  );
};

export const useGetAnalysisTableData = (
  context: string,
  headerType: string,
  startDate: string,
  endDate: string,
  selectedHeader: any,
  selectedAction: any,
  selectedScript: any,
  selectedDay: any
) => {
  return useQuery(
    [
      "analysisTableData",
      context,
      headerType,
      startDate,
      endDate,
      selectedHeader,
      selectedAction,
      selectedScript,
      selectedDay,
    ],
    () =>
      getStrategyOverview(
        selectedAction ? selectedAction : context,
        selectedHeader !== null ? selectedHeader : headerType,
        startDate,
        endDate,
        selectedScript || "NA",
        selectedDay || "NA"
      ),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: true,
    }
  );
};

export const useGetWinLossRatio = (headerType: string, buyselltype: string) => {
  return useQuery(
    ["getWinLossRatio", headerType, buyselltype],
    () => getWinLossRatio(headerType, buyselltype),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!headerType && !!buyselltype,
    }
  );
};

export const useGetStrategyCardData = (context: string, headerType: string) => {
  return useQuery(
    ["smallSizeCardData", context, headerType],
    () => getStrategyCardData(context, headerType),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!context && !!headerType,
    }
  );
};

export const useGetTableFilterData = () => {
  return useQuery("getTableFilterData", getTableFilterData, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
// export const useGetStrategyOverview = (context:any,
//       headerType:any,
//       startDate:any,
//       endDate:any,
//       selectedFilterData?.strategy_type?.value:any,
//       selectedFilterData?.action?.value:any,) => {
//   return useQuery(
//     [
//       "analysisTableData",
//       context,
//       headerType,
//       startDate,
//       endDate,
//       selectedFilterData?.strategy_type?.value,
//       selectedFilterData?.action?.value,
//     ],
//     () =>
//       getStrategyOverview(
//         selectedFilterData?.action?.value
//           ? selectedFilterData?.action?.value
//           : context,
//         selectedFilterData?.strategy_type?.value !== null
//           ? selectedFilterData?.strategy_type?.value
//           : headerType,
//         startDate,
//         endDate,
//         selectedFilterData?.script?.value || "NA",
//         selectedFilterData?.day?.value || "NA"
//       ),
//     {
//       refetchOnMount: true,
//       refetchOnWindowFocus: true,
//       enabled: true,
//     }
//   );
// };
