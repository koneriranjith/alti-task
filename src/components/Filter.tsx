import {
  bodyTypeOptions,
  brandOptions,
  colorOptions,
  fuelTypeOptions,
  LocationOptions,
  ownerOptions,
  TransmissionOptions,
} from "helper";
import React, { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";

interface FilterProps {
  // Define your props here if needed
  filterData: any;
  setFilterData: any;
  handleClear: any;
}

const Filter: React.FC<FilterProps> = ({
  filterData,
  setFilterData,
  handleClear,
}) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("filterData", filterData);
  };

  const clearFilter = () => {
    handleClear();
  };

  const handleChange = (name: string, data: any) => {
    setFilterData((prevData: any) => ({ ...prevData, [name]: data }));
  };
  return (
    <div>
      <p>Filter</p>
      <form onSubmit={handleSubmit}>
        <CheckboxGroup
          label="Transmission"
          name="transmission"
          options={TransmissionOptions}
          selectedOptions={filterData["transmission"]}
          onChange={handleChange}
        />

        <CheckboxGroup
          label="Brand"
          name="brand"
          options={brandOptions}
          selectedOptions={filterData["brand"]}
          onChange={handleChange}
        />

        <CheckboxGroup
          label="Owner"
          name="owner"
          options={ownerOptions}
          selectedOptions={filterData["owner"]}
          onChange={handleChange}
        />

        <CheckboxGroup
          label="Fuel Type"
          name="fuelType"
          options={fuelTypeOptions}
          selectedOptions={filterData["fuelType"]}
          onChange={handleChange}
        />

        <CheckboxGroup
          label="Body Type"
          name="bodyType"
          options={bodyTypeOptions}
          selectedOptions={filterData["bodyType"]}
          onChange={handleChange}
        />

        <CheckboxGroup
          label="Color"
          name="color"
          options={colorOptions}
          selectedOptions={filterData["color"]}
          onChange={handleChange}
        />

        <CheckboxGroup
          label="Location"
          name="location"
          options={LocationOptions}
          selectedOptions={filterData["location"]}
          onChange={handleChange}
        />

        <button type="submit">Apply</button>
        <button onClick={clearFilter}>clear</button>
      </form>
    </div>
  );
};

export default Filter;
