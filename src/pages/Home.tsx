import React, { useEffect, useState } from "react";
import { Brand } from "interfaces/brand";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  brandSelector,
  fetchBrands,
  selectBrand,
} from "../redux/Slice/brandSlice";
interface HomeProps {
  // Define your props here if needed
}

const Home: React.FC<HomeProps> = (props) => {
  const { loading, brands, selectedBrand } = useAppSelector(brandSelector);

  const dispatch = useAppDispatch();

  // const [brands, setBrands] = useState<Brand[]>([]);
  // const [selectedBrand, setSelectedBrand] = useState<Brand>({
  //   name: "",
  //   logo: "",
  //   id: "",
  // });

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="container">
      <section className="brands">
        {loading ? <p>Loading..</p> : null}
        <ul>
          {!loading && brands.length
            ? brands.map((brand: Brand) => (
                <li
                  key={brand.id}
                  className={`${
                    brand.id == selectedBrand.id ? "selected" : ""
                  }`}
                  onClick={() => dispatch(selectBrand(brand))}
                >
                  <img src={brand.logo} alt={brand.name} />
                  <span>{brand.name}</span>
                </li>
              ))
            : null}
        </ul>
      </section>
    </div>
  );
};

export default Home;
