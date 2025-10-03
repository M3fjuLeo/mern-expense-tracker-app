import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import FormButton from "../../components/FormButton";
import Input from "../../components/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Login must be used within UserProvider");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { updateUser } = userContext;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-[50rem] min-w-[30rem]"
      >
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-medium text-3xl">Welcome Back</h1>
            <p className="font-light">Please enter your details to log in</p>
          </div>

          <Input
            title="Email Address"
            placeholder="john@example.com"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
          />

          <Input
            title="Password"
            placeholder="Min 8 Characters"
            type="password"
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
          />

          <FormButton
            title={loading ? "Logging in..." : "Login"}
            type="submit"
            disabled={loading}
          />

          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signUp")}
              className="text-purple-600 underline cursor-pointer"
            >
              SignUp
            </span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
