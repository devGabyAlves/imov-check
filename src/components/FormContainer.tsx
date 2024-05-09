interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <div className="bg-white p-5 rounded-md max-w-sm mx-auto">{children}</div>;
};

export default FormContainer;
