import React, { useEffect, useState } from "react";
import { Brand } from "interfaces/brand";
interface HomeProps {
  // Define your props here if needed
}

const Home: React.FC<HomeProps> = (props) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand>({
    name: "",
    logo: "",
    id: "",
  });

  useEffect(() => {
    fetch("http://localhost:4010/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  return (
    <div className="container">
      <section className="brands">
        <ul>
          {brands.map((brand: Brand) => (
            <li
              key={brand.id}
              className={`${brand.id == selectedBrand.id ? "selected" : ""}`}
              onClick={() => setSelectedBrand(brand)}
            >
              <img src={brand.logo} alt={brand.name} />
              <span>{brand.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
