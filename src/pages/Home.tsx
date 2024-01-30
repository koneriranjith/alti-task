import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="container">
      <section className="brands">
        <h2>Brands</h2>
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
      {selectedBrand.id ? (
        <section className="product-form">
          <h2>Add Product For {selectedBrand.name}</h2>
        </section>
      ) : null}
    </div>
  );
};

export default Home;
