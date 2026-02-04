import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {Place} from "../../model/place";

interface PlacesState {
    items: Place[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PlacesState = {
    items: [],
    status: 'idle',
    error: null
};

export const fetchPlaces = createAsyncThunk(
    'places/fetchPlaces',
    async () => {
        const response = await axios.get('http://localhost:8000/places');
        return response.data;
    }
);

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch places';
            });
    }
});

export default placesSlice.reducer;
