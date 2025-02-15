import { useMutation, useQuery } from "react-query";
import {
  getStrategyHeader,
  getUserByToken,
  login,
} from "../../app/modules/auth/core/_requests";

export const useGetStrategyHeader = () => {
  return useQuery("getStrategyHeaders", getStrategyHeader, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useLogin = () => {
  return useMutation(login);
};
export const useUserByToken = () => {
  return useMutation(getUserByToken);
};
