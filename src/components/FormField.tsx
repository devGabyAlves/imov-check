interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange, placeholder, required = false }) => {
  return (
    <div className="flex flex-col mb-5">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mb-5 p-2.5 border border-gray-300 rounded-md text-lg w-full"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormField;
