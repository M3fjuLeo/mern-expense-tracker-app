import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import FormButton from "../../components/FormButton";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../../components/AvatarUpload";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <AuthLayout>
      <div className="w-full min-w-[30rem] max-w-[50rem]">
        <div className="">
          <h1 className="text-3xl font-medium">Create an Account</h1>
          <p className="font-light">
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            <AvatarUpload />
            <div className="flex w-full flex-col gap-8">
              <div className="w-full flex flex-row gap-4 ">
                <Input
                  title="Full Name"
                  value={formData.fullName}
                  placeholder="John"
                  type="text"
                />
                <Input
                  title="Email Address"
                  placeholder="john@example.com"
                  type="text"
                  value={formData.email}
                />
              </div>
              <Input
                title="Password"
                placeholder="Min 8 Characters"
                type="password"
                value={formData.password}
              />
            </div>

            <FormButton title="sign up" />
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
