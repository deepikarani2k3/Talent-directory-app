import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchTalents = createAsyncThunk(
  'talents/fetchTalents',
  async (skill = null, { rejectWithValue }) => {
    try {
      const url = skill ? `${API_BASE_URL}/talents?skill=${skill}` : `${API_BASE_URL}/talents`;
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching talents');
    }
  }
);

export const addTalent = createAsyncThunk(
  'talents/addTalent',
  async (talentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/talents`, talentData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error adding talent');
    }
  }
);

const initialState = {
  talents: [],
  filteredTalents: [],
  loading: false,
  error: null,
  successMessage: null,
  currentFilter: null
};

const talentSlice = createSlice({
  name: 'talents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    filterBySkill: (state, action) => {
      const skill = action.payload?.toLowerCase() || '';
      state.currentFilter = action.payload;
      if (!skill) {
        state.filteredTalents = state.talents;
      } else {
        state.filteredTalents = state.talents.filter(talent =>
          talent.skills.some(s => s.toLowerCase().includes(skill))
        );
      }
    }
  },
  extraReducers: (builder) => {
    // Fetch talents
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.talents = action.payload;
        // If a filter is active, apply it to the freshly fetched talents.
        if (state.currentFilter) {
          const skill = state.currentFilter.toLowerCase();
          state.filteredTalents = action.payload.filter(talent =>
            talent.skills.some(s => s.toLowerCase().includes(skill))
          );
        } else {
          state.filteredTalents = action.payload;
        }
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add talent
    builder
      .addCase(addTalent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTalent.fulfilled, (state, action) => {
        state.loading = false;
        const newTalent = action.payload;
        state.talents.unshift(newTalent);
        // If there's an active filter, only add to filteredTalents when it matches
        if (!state.currentFilter) {
          state.filteredTalents.unshift(newTalent);
        } else {
          const skill = state.currentFilter.toLowerCase();
          if (newTalent.skills.some(s => s.toLowerCase().includes(skill))) {
            state.filteredTalents.unshift(newTalent);
          }
        }
        state.successMessage = 'Talent added successfully!';
      })
      .addCase(addTalent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccessMessage, filterBySkill } = talentSlice.actions;
export default talentSlice.reducer;
