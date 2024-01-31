import { Car } from "interfaces/car";
import React from "react";
import "./Card.css";

interface CardProps {
  data: Car;
}

const CardComponent: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="card">
      <img src={data.image} alt={data.brand} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">
          {data.brand} - {data.modal}
        </h3>
        <p className="card-item">Price: {data.price}</p>
        <p className="card-item">Color: {data.color}</p>
        <p className="card-item">Owner: {data.owner}</p>
        <p className="card-item">Fuel type: {data.fuelType}</p>
        <p className="card-item">Transmission: {data.transmission}</p>
        <p className="card-item">kms: {data.kms}</p>
        <p className="card-item">location: {data.location}</p>
      </div>
    </div>
  );
};

export default CardComponent;
