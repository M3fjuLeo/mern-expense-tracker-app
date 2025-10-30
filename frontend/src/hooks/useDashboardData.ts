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
  // const [dashboardData, setDashboardData] = useState<DashboardData | null>(
  //   null
  // );
  // const [loading, setLoading] = useState(false);

  // const fetchDashboardData = async () => {
  //   if (loading) return;
  //   setLoading(true);

  //   try {
  //     const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
  //     if (response.data) setDashboardData(response.data);
  //   } catch (error) {
  //     console.log("Something went wrong. Please try again", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDashboardData();
  // }, []);

  // return { dashboardData, loading, fetchDashboardData };
};
