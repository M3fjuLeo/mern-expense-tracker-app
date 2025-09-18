import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import FormButton from "../../components/FormButton";
import Input from "../../components/Input";

const Login = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <form className="w-full max-w-[50rem] min-w-[30rem]">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-medium text-3xl">Welcome Back</h1>
            <p className="font-light">Please enter your details to log in</p>
          </div>

          <Input
            title="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            title="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          <FormButton title="login" />

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
