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

const API_URL = 'http://localhost:8000/places';

export const fetchPlaces = createAsyncThunk(
    'places/fetchPlaces',
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

export const addPlace = createAsyncThunk(
    'places/addPlace',
    async (place: Omit<Place, 'id'>) => {
        const newPlace = {
            ...place,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const response = await axios.post(API_URL, newPlace);
        return response.data;
    }
);

export const updatePlace = createAsyncThunk(
    'places/updatePlace',
    async (place: Place) => {
        const updatedPlace = {
            ...place,
            updatedAt: new Date().toISOString()
        };
        const response = await axios.put(`${API_URL}/${place.id}`, updatedPlace);
        return response.data;
    }
);

export const deletePlace = createAsyncThunk(
    'places/deletePlace',
    async (id: number | string) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

export const togglePlaceStatus = createAsyncThunk(
    'places/togglePlaceStatus',
    async (place: Place) => {
        const updatedPlace = {
            ...place,
            isActive: !place.isActive,
            updatedAt: new Date().toISOString()
        };
        const response = await axios.put(`${API_URL}/${place.id}`, updatedPlace);
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
            })
            .addCase(addPlace.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updatePlace.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id.toString() === action.payload.id.toString());
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deletePlace.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id.toString() !== action.payload.toString());
            })
            .addCase(togglePlaceStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id.toString() === action.payload.id.toString());
                if (index !== -1) state.items[index] = action.payload;
            });
    }
});

export default placesSlice.reducer;
