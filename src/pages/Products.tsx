import React, { useEffect, useState } from "react";
import { fetchProducts, productSelector } from "../redux/Slice/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import CardComponent from "components/Card/Card";
import { Car } from "interfaces/car";
import Filter from "components/Filter";

interface ProductsProps {
  // Define your props here if needed
}

interface FilterData {
  brand: Array<string | never>;
  bodyType: Array<string | never>;
  color: Array<string | never>;
  fuelType: Array<string | never>;
  location: Array<string | never>;
  owner: Array<string | never>;
  transmission: Array<string | never>;
}

const initialData: FilterData = {
  location: [],
  bodyType: [],
  brand: [],
  owner: [],
  fuelType: [],
  transmission: [],
  color: [],
};

const Products: React.FC<ProductsProps> = (props) => {
  const { loading, products } = useAppSelector(productSelector);
  const [filterData, setFilterData] = useState(initialData);
  const dispatch = useAppDispatch();

  const getProductBasedOnFilter = () => {
    const filteredProducts: Array<Car | never> = products.filter(
      (product: Car) => {
        // Check if all filter arrays are empty
        const noFilters = Object.values(filterData).every(
          (values) => values.length === 0
        );
        // If no filters are specified, include all products
        if (noFilters) {
          return true;
        }

        // Check if the product satisfies all the filters
        const satisfiesFilters: any = Object.entries(filterData).every(
          ([key, values]) => {
            // If values array is empty, skip the filter for the current key
            if (values.length === 0) return true;
            return values.includes(product[key as keyof typeof product]);
          }
        );
        return satisfiesFilters;
      }
    );

    return (
      <>
        {loading ? <p>Loading..</p> : null}
        {filteredProducts.length ? (
          filteredProducts.map((product: Car) => (
            <CardComponent key={product.id} data={product} />
          ))
        ) : (
          <p>No Data found!</p>
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="product-container">
      <div className="filter">
        <Filter
          filterData={filterData}
          setFilterData={setFilterData}
          handleClear={() => {
            setFilterData(initialData);
          }}
        />
      </div>
      <div className="products">{getProductBasedOnFilter()}</div>
    </div>
  );
};

export default Products;
