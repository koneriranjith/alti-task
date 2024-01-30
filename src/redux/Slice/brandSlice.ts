import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import Api from "../api-client";

export interface Brand {
  id: string;
  logo: string;
  name: string;
}
export interface BrandState {
  loading: boolean;
  brands: Array<Brand>;
  error: string | undefined;
  selectedBrand: Brand;
}
const initialState: BrandState = {
  loading: false,
  brands: [],
  error: undefined,
  selectedBrand: { id: "", logo: "", name: "" },
};
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = Api.get("/brands");
  return response;
});

const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchBrands.fulfilled,
      (state, action: PayloadAction<Brand[]>) => {
        state.loading = false;
        state.brands = action.payload;
      }
    );
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.loading = false;
      state.brands = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    selectBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
  },
});

export const { selectBrand } = brandSlice.actions;
export const brandSelector = (state: RootState) => state.brands;
export default brandSlice.reducer;
