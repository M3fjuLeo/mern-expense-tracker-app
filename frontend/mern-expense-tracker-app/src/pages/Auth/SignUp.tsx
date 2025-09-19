import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import FormButton from "../../components/FormButton";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../../components/AvatarUpload";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <div className="w-full min-w-[30rem] max-w-[50rem]">
        <div className="">
          <h1 className="text-3xl font-medium">Create an Account</h1>
          <p className="font-light">
            Join us today by entering your details below.
          </p>

          <form className="flex flex-col gap-8 w-full">
            <AvatarUpload />
            <div className="flex w-full flex-col gap-8">
              <div className="w-full flex flex-row gap-4 ">
                <Input title="Full Name" placeholder="John" type="text" />
                <Input
                  title="Email Address"
                  placeholder="john@example.com"
                  type="text"
                />
              </div>
              <Input
                title="Password"
                placeholder="Min 8 Characters"
                type="password"
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
