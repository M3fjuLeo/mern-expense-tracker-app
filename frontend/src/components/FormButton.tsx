interface FormButtonProps {
  title: string;
  disabled?: boolean;
  type?: "submit" | "button";
}

const FormButton = ({ title, disabled = false, type }: FormButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="bg-purple-600 w-full uppercase hover:bg-purple-200 hover:text-purple-800 duration-150 cursor-pointer rounded-md p-2 text-white"
    >
      {title}
    </button>
  );
};

export default FormButton;
