import { MouseEvent } from "react";

interface FormButtonProps {
  title: string;
  disabled?: boolean;
}

const FormButton = ({ title, disabled = false }: FormButtonProps) => {
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={disabled}
      className="bg-purple-600 w-full uppercase hover:bg-purple-200 hover:text-purple-800 duration-150 cursor-pointer rounded-md p-2 text-white"
    >
      {title}
    </button>
  );
};

export default FormButton;
