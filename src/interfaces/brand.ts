export interface Brand {
  name: string;
  logo: string;
  id: string;
}

export interface BrandState {
  loading: boolean;
  brands: Array<Brand>;
  error: string | undefined;
  selectedBrand: Brand;
}
