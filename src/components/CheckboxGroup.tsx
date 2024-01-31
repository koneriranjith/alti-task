import React, { ChangeEvent, useState } from "react";

interface CheckboxGroupProps {
  options: { label: string; value: string }[];
  selectedOptions: string[];
  onChange: (name: string, selectedOptions: string[]) => void;
  name: string;
  label: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedOptions,
  onChange,
  name,
  label,
}) => {
  const handleCheckboxChange = (value: string) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    onChange(name, newSelectedOptions);
  };

  return (
    <div className="cmp-checkbox">
      <label>{label}</label>
      {options
        .filter((option) => !!option.value)
        .map((option) => (
          <div key={option.value}>
            <input
              type="checkbox"
              id={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
    </div>
  );
};

export default CheckboxGroup;
