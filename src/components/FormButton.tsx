import React from "react";

interface FormButtonProps {
  children: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({ children }) => {
  return (
    <button
      type="submit"
      className="p-2.5 px-5 bg-purple-600 text-white rounded-md text-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-purple-800"
    >
      {children}
    </button>
  );
};

export default FormButton;
