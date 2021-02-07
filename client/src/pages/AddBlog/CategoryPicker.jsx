import React, { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { Category, KeyboardArrowDown } from "@material-ui/icons";
import { Controller } from "react-hook-form";
import { StyledSelect, StyledMenuItem } from "../../components";

const CategoryPicker = ({ register, inputName, control, defaultValue }) => {
  const categories = useContext(CategoryContext);

  return (
    <Controller
      as={
        <StyledSelect
          variant="outlined"
          IconComponent={KeyboardArrowDown}
          name={inputName}
          register={register}
        >
          {categories.map(({ name, path }) => (
            <StyledMenuItem value={path} key={path}>
              <Category /> <p>{name}</p>
            </StyledMenuItem>
          ))}
        </StyledSelect>
      }
      name={inputName}
      control={control}
      defaultValue={defaultValue ? defaultValue : categories[0].path}
    />
  );
};

export default CategoryPicker;
