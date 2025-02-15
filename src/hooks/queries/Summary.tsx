import { useQuery } from "react-query";
import { getSummaryTableData } from "../../app/modules/auth/core/_requests";

export const useGetSummaryTableData = () => {
  return useQuery("summaryTableData", getSummaryTableData, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
