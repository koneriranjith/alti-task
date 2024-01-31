import React, { ChangeEvent, useEffect, useState } from "react";
import { Brand } from "interfaces/brand";
import { Car } from "interfaces/car";

import {
  TransmissionOptions,
  ownerOptions,
  fuelTypeOptions,
  bodyTypeOptions,
  colorOptions,
  LocationOptions,
} from "../helper";
import { useToast } from "../context/ToastContext";

interface CarFormProps {
  onSubmit: (formData: Car) => void;
  selectedBrand: Brand;
}

const initialData: Car = {
  id: "",
  location: "",
  bodyType: "",
  modal: "",
  brand: "",
  brandId: "",
  owner: "",
  price: 0,
  fuelType: "",
  transmission: "",
  image: "",
  color: "",
  yearOfManufacturing: "",
  insuranceValidUpto: "",
  kms: 0,
};

const CarForm: React.FC<CarFormProps> = ({ onSubmit, selectedBrand }) => {
  const [formData, setFormData] = useState<Car>(initialData);
  const toast = useToast();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      brand: selectedBrand.name,
      brandId: selectedBrand.id,
    }));
  }, [selectedBrand.id]);

  useEffect(() => {
    return () => {
      setFormData(initialData);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields: (keyof Car)[] = [
      "location",
      "bodyType",
      "modal",
      "owner",
      "price",
      "fuelType",
      "transmission",
      "image",
      "color",
      "insuranceValidUpto",
      "kms",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length) {
      alert(
        `Please fill in all required fields: \n ${missingFields.join(", ")}`
      );
    } else {
      onSubmit(formData);
      toast.success("successfully created!");
    }
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <label>
        Location:
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          {LocationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Body Type:
        <select
          name="bodyType"
          value={formData.bodyType}
          onChange={handleChange}
        >
          {bodyTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Model:
        <input
          type="text"
          name="modal"
          value={formData.modal}
          onChange={handleChange}
        />
      </label>
      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={selectedBrand.name}
          readOnly
          disabled
          onChange={handleChange}
        />
      </label>
      <label>
        Brand ID:
        <input
          type="text"
          name="brandId"
          value={selectedBrand.id}
          readOnly
          disabled
          onChange={handleChange}
        />
      </label>

      <label>
        Owner:
        <select name="owner" value={formData.owner} onChange={handleChange}>
          {ownerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>

      <label>
        Fuel Type:
        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
        >
          {fuelTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Transmission:
        <select
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
        >
          {TransmissionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Color:
        <select name="color" value={formData.color} onChange={handleChange}>
          {colorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Year of Manufacturing:
        <input
          type="date"
          name="yearOfManufacturing"
          value={formData.yearOfManufacturing || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Insurance Valid Upto:
        <input
          type="date"
          name="insuranceValidUpto"
          value={formData.insuranceValidUpto}
          onChange={handleChange}
        />
      </label>
      <label>
        KMs:
        <input
          type="number"
          name="kms"
          value={formData.kms}
          onChange={handleChange}
        />
      </label>
      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {formData.image && (
        <div>
          <label>Image Preview:</label>
          <img
            src={formData.image}
            alt="Preview"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CarForm;
