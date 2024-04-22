/* eslint-disable react/prop-types */
const Button = ({
  children,
  btnType = "default",
  className = "",
  ...props
}) => {
  let style;
  if (btnType === "default") {
    style =
      "border border-gray-600 bg-gray-600 text-white hover:border-gray-700 hover:bg-gray-700";
  } else {
    style = "border border-gray-600 hover:bg-gray-200";
  }

  return (
    <button
      className={`duration-300 px-6 py-2 rounded-lg font-semibold ${style} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
