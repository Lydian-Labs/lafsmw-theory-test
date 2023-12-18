interface FormInputProps {
  labelText?: string;
  name: string;
  type: string;
  placeholder?: string;
  maxLength?: number;
  width?: string;
  onChange: any;
  value: string;
  required: boolean;
}

export default function FormInput({
  labelText = "",
  name,
  type = "text",
  value,
  placeholder,
  maxLength,
  width,
  onChange,
  required = false,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{ width }}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
