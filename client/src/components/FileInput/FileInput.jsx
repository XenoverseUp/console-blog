import React from "react";
import { PanoramaRounded /*, Error*/, CloudUpload } from "@material-ui/icons";
import isEmpty from "is-empty";
import "./FileInput.scss";

const FileInput = ({
  register,
  theme,
  name,
  errors,
  defaultValue,
  ...rest
}) => {
  return (
    <React.Fragment>
      <div
        className={`file-input ${theme}  ${
          errors[`${name}`]
            ? "error-input"
            : isEmpty(errors)
            ? null
            : isEmpty(errors[`${name}`])
            ? "success-input"
            : null
        }`}
      >
        {isEmpty(errors[`${name}`]) && defaultValue?.length > 0 ? (
          <PanoramaRounded />
        ) : (
          <CloudUpload />
        )}

        {!isEmpty(errors[`${name}`]) &&
        errors[`${name}`].type !== "required" ? (
          <p className="error">{errors[`${name}`].message}</p>
        ) : (
          <React.Fragment>
            <p>
              {defaultValue?.length > 0
                ? "Kapak resmi yüklendi."
                : "Kapak resmini yüklemek için resmi buraya sürükle veya buraya tıkla"}
            </p>
            {defaultValue?.length > 0 && (
              <p className="file-name">{defaultValue?.[0].name}</p>
            )}
          </React.Fragment>
        )}

        <input
          type="file"
          name={name}
          defaultValue={defaultValue}
          ref={register}
          {...rest}
        />
      </div>
    </React.Fragment>
  );
};

export default FileInput;
