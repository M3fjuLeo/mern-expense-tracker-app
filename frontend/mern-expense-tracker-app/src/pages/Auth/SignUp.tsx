import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import { FaRegUser } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { useRef } from "react";
import FormButton from "../../components/FormButton";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("wybrane zdjecie", file);
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

          <form className="flex flex-col gap-8 w-full">
            <div className="mt-8 text-center">
              <div
                className="cursor-pointer relative inline-block"
                onClick={handleFileClick}
              >
                <FaRegUser className="bg-purple-200 rounded-full size-18 p-2 items-center flex text-purple-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <LuUpload className="absolute -right-2 -bottom-1 size-8 rounded-full bg-purple-500 text-white p-1" />
              </div>
            </div>

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
