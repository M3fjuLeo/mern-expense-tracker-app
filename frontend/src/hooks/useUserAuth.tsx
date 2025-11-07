import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const useUserAuth = () => {
  const userContext = useContext(UserContext); // ← ważne: nie destrukturyzuj od razu
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext) return;

    if (userContext.user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data?.user) {
          userContext.updateUser({
            id: response.data.user._id,
            email: response.data.user.email,
            fullName: response.data.user.fullName,
            avatar: response.data.user.avatar,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user info: ", error);
        if (isMounted) {
          userContext.clearUser?.();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [userContext, navigate]);
};
