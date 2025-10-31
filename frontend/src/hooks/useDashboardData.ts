import { useQuery } from "@tanstack/react-query";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export interface DashboardData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  recentTransactions: {
    _id: string;
    title: string;
    amount: number;
    date: string;
    type: string;
    icon?: string;
  }[];
  recentExpenses: {
    _id: string;
    title: string;
    amount: number;
    date: string;
    type: string;
    icon?: string;
  }[];
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      return data;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
