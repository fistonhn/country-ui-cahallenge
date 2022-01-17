import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  deleteDoc,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

// fecth countries
export const fetchCountries = createAsyncThunk(
  "country/fetchCountries",
  async (userId: string, { rejectWithValue }) => {
    try {
      const countriesSubcollection = collection(
        db,
        "countries",
        userId,
        "country"
      );

      const queryCountry = query(countriesSubcollection);
      const docSnap = await getDocs(queryCountry);
      const countries = [] as any;

      docSnap.forEach((doc: any) => {
        const data = doc.data();
        const objData = { id: doc.id, ...data };
        countries.push(objData);
      });
      return countries;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// delete country

type DeleteCountryType = {
  userId: string;
  cardId?: string;
};

export const deleteCountry = createAsyncThunk(
  "country/deleteCountry",
  async ({ userId, cardId }: DeleteCountryType, { rejectWithValue }) => {
    try {
      const countriesSubcollection = collection(
        db,
        "countries",
        userId,
        "country"
      );
      const docRef = doc(countriesSubcollection, cardId);
      await deleteDoc(docRef);
      return cardId;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

type SearchCountryType = {
  userId: string;
  countryName?: string;
  continent?: string;
};

// search by country name or capital
export const searchCountry = createAsyncThunk(
  "country/searchCountry",
  async ({ userId, countryName }: SearchCountryType, { rejectWithValue }) => {
    try {
      const countriesSubcollection = collection(
        db,
        "countries",
        userId,
        "country"
      );
      const queryCountry =
        countryName === ""
          ? query(countriesSubcollection)
          : query(countriesSubcollection, where("name", "==", countryName));
      const docSnap = await getDocs(queryCountry);
      const countries = [] as any;

      docSnap.forEach((doc: any) => {
        const data = doc.data();
        const objData = { id: doc.id, ...data };
        countries.push(objData);
      });
      return countries;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);
export const searchCountryByContinent = createAsyncThunk(
  "country/searchCountryByContinent",
  async ({ userId, continent }: SearchCountryType, { rejectWithValue }) => {
    try {
      const countriesSubcollection = collection(
        db,
        "countries",
        userId,
        "country"
      );

      const queryCountry = query(
        countriesSubcollection,
        where("region", "==", continent)
      );
      const docSnap = await getDocs(queryCountry);
      const countries = [] as any;

      docSnap.forEach((doc: any) => {
        const data = doc.data();
        const objData = { id: doc.id, ...data };
        countries.push(objData);
      });
      return countries;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// Mark country as visited
export const markCountryAsVisited = createAsyncThunk(
  "country/markCountryAsVisited",
  async ({ userId, cardId }: DeleteCountryType, { rejectWithValue }) => {
    try {
      const countriesSubcollection = collection(
        db,
        "countries",
        userId,
        "country"
      );
      const docRef = doc(countriesSubcollection, cardId);
      let updatedData: any;
      onSnapshot(docRef, (doc) => {
        const docVal = { id: doc.id, ...doc.data() };
        updatedData = docVal;
      });
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const visited = data.isVisited;
        if (visited) {
          await updateDoc(docRef, {
            isVisited: false,
          });
        } else {
          await updateDoc(docRef, {
            isVisited: true,
          });
        }
      }
      return updatedData;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// Query Visited Countries
export const queryVisitedCountries = createAsyncThunk(
  "country/queryVisitedCountries",
  async ({ userId }: SearchCountryType, { rejectWithValue }) => {
    try {
      const countriesSubcollection = collection(
        db,
        "countries",
        userId,
        "country"
      );

      const queryCountry = query(
        countriesSubcollection,
        where("isVisited", "==", true)
      );
      const docSnap = await getDocs(queryCountry);
      const countries = [] as any;

      docSnap.forEach((doc: any) => {
        const data = doc.data();
        const objData = { id: doc.id, ...data };
        countries.push(objData);
      });
      return countries;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// query single country
export const querySingleCountry = createAsyncThunk(
  "country/querySingleCountry",
  async ({ userId, cardId }: DeleteCountryType, { rejectWithValue }) => {
    try {
      const countriesSubcollection = collection(
        db,
        "countries",
        userId,
        "country"
      );
      const docRef = doc(countriesSubcollection, cardId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  isLoading: false,
  error: "" as string | undefined,
  data: [] as any,
  message: "" as string | undefined,
  singleDoc: null as any,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all countries
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      toast.success("Countries fetched successfully");
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(state.error);
    });

    // delete country from the list
    builder.addCase(deleteCountry.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCountry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = "Country deleted Successfully";
      state.data = state.data.filter((country: any) => country.id !== payload);
      toast.success(state.message);
    });
    builder.addCase(deleteCountry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(state.error);
    });

    // search country by name

    builder.addCase(searchCountry.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(searchCountry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      if (payload.length === 0) {
        toast.error("Country not found");
      } else {
        toast.success("Country Fetched Successfully");
      }
    });
    builder.addCase(searchCountry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(state.error);
    });

    // Search country by continent
    builder.addCase(searchCountryByContinent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      searchCountryByContinent.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        toast.success("Countries fetched successfully");
      }
    );
    builder.addCase(searchCountryByContinent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(state.error);
    });

    // Mark country as visited
    builder.addCase(markCountryAsVisited.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      markCountryAsVisited.fulfilled,
      (state, { payload }: any) => {
        state.isLoading = false;
        const docIndex = state.data.findIndex(
          (client: { id: any }) => client.id === payload.id
        );
        state.data.map((el: any, index: string | number) =>
          index === docIndex ? (state.data[docIndex] = payload) : el
        );
        state.message = "Marked Successfully";
        toast.success(state.message);
      }
    );
    builder.addCase(markCountryAsVisited.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(state.error);
    });

    // query visited countries
    builder.addCase(queryVisitedCountries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(queryVisitedCountries.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      if (state.data.length === 0) {
        toast.error("No visited countries found");
      } else {
        toast.success("Visited countries found");
      }
    });
    builder.addCase(queryVisitedCountries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(state.error);
    });

    // query single country
    builder.addCase(querySingleCountry.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(querySingleCountry.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.singleDoc = payload;
      if (state.singleDoc === null) {
        toast.error("Country not found");
      } else {
        toast.success("Country Fetched Successfully");
      }
    });
    builder.addCase(querySingleCountry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error(state.error);
    });
  },
});
export const countrySelector = (state: any) => state.countries;
export default countrySlice.reducer;
