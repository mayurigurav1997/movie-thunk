import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieApi from '../../common/apis/movieApi'
import { APIKey } from '../../common/apis/MovieApiKey'
const fetchAsyncMovie = createAsyncThunk("movies/fetchAsyncMovies", async () => {
    const movieText = "harry"
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
    return response.data
    console.log("The response from API", response)
})
const fetchAsyncShows = createAsyncThunk("movies/fetchAsyncShows", async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${seriesText}&type=series`)
    return response.data
    console.log("The response from API", response)
})
const initialState = {
    movies: {},
    shows: {}
}

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        }
    },
    extrareducers: {
        [fetchAsyncMovie.pending]: () => {
            console.log("Pending")
        },
        [fetchAsyncMovie.fullfilled]: (state, { payload }) => {
            return { ...state, movies: payload }
        },
        [fetchAsyncMovie.rejected]: () => {
            console.log("Rejected")
        },
        [fetchAsyncShows.fullfilled]: (state, { payload }) => {
            return { ...state, shows: payload }
        },
    }
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;