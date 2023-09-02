import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFilteredProducts = createAsyncThunk('getFilteredProducts', async ( { keyword="", page=1,price,Category ,ratings}) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/products?keyword=${keyword}&page=${page}&Price[gte]=${price[0]}&Price[lte]=${price[1]}&category=${Category}&rating=${ratings}`);
    return response.json();
  } catch (error) {
    throw error;
  }
});

const FilteredProductSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    Productdata: null,
    message: "",
    ProductCount: 0,
    error: null, // Add an error field to your initial state
    resultPerPage:0
  },
  extraReducers: (builder) => {
    builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false; // Set isLoading to false on success
      state.Productdata = action.payload.products;
      state.ProductCount = action.payload.ProductCount;
      state.message = action.payload.message;
      state.resultPerPage = action.payload.resultperpage;
      state.error = null; 
    });
    builder.addCase(getFilteredProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(getFilteredProducts.rejected, (state, action) => {
      state.isLoading = false; // Set isLoading to false on error
      state.error = action.error.message; // Store the error message
    });
  }
});

export default FilteredProductSlice.reducer;
