import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AddressObject from "../interfaces/AddressObject";

export interface Address {
  id?: string;
  address: string;
}

export interface AddressState {
  addresses: AddressObject[];
  filteredAddresses?: string[][];
  filteredUnits?: string[][];
}

const initialState: AddressState = {
  // TODO: Replace with external file or api call
  filteredAddresses: [],
  filteredUnits: [],
  addresses: [],
};

export const searchAddressesAsync = createAsyncThunk<
  {
    filteredAddresses: string[][];
    type: "BUILDING" | "UNIT";
  },
  {
    addressQuery: string;
    type: "BUILDING" | "UNIT";
    street_number?: string;
    street_name?: string;
  }
>(
  "address/searchAddressesAsync",
  async ({ addressQuery, type, street_number, street_name }, { getState }) => {
    let executeSearch;

    if (type === "BUILDING") {
      executeSearch = await fetch(
        `${(import.meta as any).env.VITE_API_URL}/addresses/find-buildings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: addressQuery }),
        }
      );
    } else {
      executeSearch = await fetch(
        `${(import.meta as any).env.VITE_API_URL}/addresses/find-units`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: addressQuery,
            street_name,
            street_number,
          }),
        }
      );
    }

    let results: any;

    if (executeSearch) {
      results = await executeSearch.json();
    }

    return { filteredAddresses: results ? results.items : [], type: type };
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchAddressesAsync.fulfilled, (state, action) => {
      if (action.payload.type === "BUILDING") {
        state.filteredAddresses = action.payload.filteredAddresses;
      } else {
        state.filteredUnits = action.payload.filteredAddresses;
      }
    });
  },
});

export const {} = addressSlice.actions;
export default addressSlice.reducer;
