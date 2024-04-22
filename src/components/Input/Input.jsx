import { useId } from "react";

/* eslint-disable react/prop-types */
const Input = ({ type = "text", className = "", label = "", ...props }) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {/* Renders a label if it exists */}
      {label ? (
        <label className="text-sm font-semibold" htmlFor={id}>
          {label}
        </label>
      ) : null}

      {/* Actual input field */}
      <input
        id={id}
        type={type}
        className={`px-6 py-3 rounded-lg text-sm border border-gray-700 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
