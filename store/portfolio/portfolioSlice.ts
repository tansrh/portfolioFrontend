import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  getProtfoliosThunk,
  createPortfolioThunk,
  deletePortfolioThunk,
  updatePortfolioThunk,
  getPortfolioByIdThunk
} from "./portfolioThunk";

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  personalDetails: {
    name: string;
    about: string;
    location: string;
    imageUrl: string;
  };
  experience: Array<{
    jobTitle: string;
    company: string;
    from: string;
    to: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link: string;
    imageUrl?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    from: string;
    to: string;
    achievements?: string[];
  }>;
  achievements?: Array<{
    title: string;
    description: string;
    date?: string;
  }>;
  hobbies?: string[];
  contact?: Record<string, string>;
}



const initialState = {
  portfolios: [] as Portfolio[],
  loading: false,
  errors: {},
  message: "",
  selectedPortfolio: null as Portfolio | null,
}
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
    reducers: {
        setPortfolios(state, action: PayloadAction<any[]>) {
            state.portfolios = action.payload;
        },
        setSelectedPortfolio(state, action: PayloadAction<any>) {
            state.selectedPortfolio = action.payload;
        },
        clearSelectedPortfolio(state) {
            state.selectedPortfolio = null;
        },
    },
  extraReducers: (builder) => {
    builder
      // Get all portfolios
      .addCase(getProtfoliosThunk.pending, (state) => {
        state.loading = true;
        state.errors = {};
        state.message = "";
      })
      .addCase(getProtfoliosThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data)
        state.portfolios = action.payload.data || [];
        state.message = action.payload.message;
      })
      .addCase(getProtfoliosThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.errors = action.payload?.errors || {};
        state.message = action.payload?.message || "Failed to fetch portfolios.";
      })
      // Create portfolio
      .addCase(createPortfolioThunk.pending, (state) => {
        state.loading = true;
        state.errors = {};
        state.message = "";
      })
      .addCase(createPortfolioThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = [action.payload.data, ...state.portfolios];
        state.message = action.payload.message;
      })
      .addCase(createPortfolioThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.errors = action.payload?.errors || {};
        state.message = action.payload?.message || "Failed to create portfolio.";
      })
      // Delete portfolio
      .addCase(deletePortfolioThunk.pending, (state) => {
        state.loading = true;
        state.errors = {};
        state.message = "";
      })
      .addCase(deletePortfolioThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = state.portfolios.filter(p => p.id !== action.payload.data?.id);
        state.message = action.payload.message;
      })
      .addCase(deletePortfolioThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.errors = action.payload?.errors || {};
        state.message = action.payload?.message || "Failed to delete portfolio.";
      })
      // Update portfolio
      .addCase(updatePortfolioThunk.pending, (state) => {
        state.loading = true;
        state.errors = {};
        state.message = "";
      })
      .addCase(updatePortfolioThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = state.portfolios.map(p => p.id === action.payload.data?.id ? action.payload.data : p);
        state.message = action.payload.message;
      })
      .addCase(updatePortfolioThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.errors = action.payload?.errors || {};
        state.message = action.payload?.message || "Failed to update portfolio.";
      })
      // Get portfolio by ID
      .addCase(getPortfolioByIdThunk.pending, (state) => {
        state.loading = true;
        state.errors = {};
        state.message = "";
      })
      .addCase(getPortfolioByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getPortfolioByIdThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.errors = action.payload?.errors || {};
        state.message = action.payload?.message || "Failed to fetch portfolio.";
      });
  }
});

export const { setPortfolios, setSelectedPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
