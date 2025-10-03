import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import FormButton from "../../components/FormButton";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../../components/AvatarUpload";
import { useState, FormEvent, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Login must be used within UserProvider");
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = userContext;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);

      if (formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        profileImageUrl,
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
    }
  };

  return (
    <AuthLayout>
      <div className="w-full min-w-[30rem] max-w-[50rem]">
        <div className="">
          <h1 className="text-3xl font-medium">Create an Account</h1>
          <p className="font-light">
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-8 w-full">
            <AvatarUpload
              onFileSelect={(file) =>
                setFormData((prev) => ({ ...prev, avatar: file }))
              }
            />
            <div className="flex w-full flex-col gap-8">
              <div className="w-full flex flex-row gap-4 ">
                <Input
                  title="Full Name"
                  placeholder="John"
                  type="text"
                  value={formData.fullName}
                  onChange={(value) => handleInputChange("fullName", value)}
                />
                <Input
                  title="Email Address"
                  placeholder="john@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange("email", value)}
                />
              </div>
              <Input
                title="Password"
                placeholder="Min 8 Characters"
                type="password"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
              />
            </div>

            <FormButton
              title={isLoading ? "Creating Account..." : "Sign Up"}
              disabled={isLoading}
              type="submit"
            />
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-purple-600 underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
