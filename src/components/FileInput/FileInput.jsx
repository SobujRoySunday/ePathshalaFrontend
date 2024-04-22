/* eslint-disable react/prop-types */
import { useId, useState } from "react";
import UploadIcon from "../../assets/upload-icon.png";

const FileInput = ({ label = "", ...props }) => {
  const [text, setText] = useState("Choose file");
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
        type="file"
        id={id}
        className="fileInput"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setText(e.target.files[0].name);
          }
        }}
        {...props}
      />

      {/* Label used for styling the file input */}
      <label htmlFor={id}>
        <div className="flex flex-row gap-3">
          <img src={UploadIcon} alt="upload icon" className="w-5" />
          <div>{text}</div>
        </div>
      </label>
    </div>
  );
};

export default FileInput;
