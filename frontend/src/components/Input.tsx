import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
  title: string;
  placeholder?: string;
  type: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  title,
  placeholder,
  type,
  value = "",
  onChange,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-2 flex-1">
      <span>{title}</span>
      <div className="flex items-center relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value || ""}
          className="bg-gray-100 py-3 w-full px-4 rounded-md"
          onChange={(e) => onChange?.(e.target.value)}
        />

        {isPassword && (
          <>
            {showPassword ? (
              <FaRegEye
                className="absolute right-4 text-gray-600 cursor-pointer text-xl"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchEnd={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute right-4 text-gray-600 cursor-pointer text-xl"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchEnd={() => setShowPassword(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
