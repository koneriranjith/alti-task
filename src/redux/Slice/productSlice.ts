import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import Api from "../api-client";
import { Car, ProductState } from "interfaces/car";

const initialState: ProductState = {
  loading: false,
  products: [],
  error: undefined,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = Api.get("/products");
    return response;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data: Car) => {
    const response = Api.post("/products", data);
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // get all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Car[]>) => {
        state.loading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });

    // create product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createProduct.fulfilled,
      (state, action: PayloadAction<Car[]>) => {
        state.loading = false;
        // state.products = action.payload;
      }
    );
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      // state.products = [];
      state.error = action.error.message;
    });
  },
  reducers: {},
});

// export const { } = productSlice.actions;
export const productSelector = (state: RootState) => state.products;
export default productSlice.reducer;
