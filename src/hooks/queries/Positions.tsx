import { useQuery } from "react-query";
import { getStrategyPosition } from "../../app/modules/auth/core/_requests";

export const useGetStrategyPosition = (
  headerType: string,
  selectedTabId: string
) => {
  return useQuery(
    ["positionsTableData", headerType, selectedTabId],
    () => getStrategyPosition(headerType, selectedTabId),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!headerType && !!selectedTabId,
    }
  );
};
