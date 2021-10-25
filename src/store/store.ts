import { configureStore } from '@reduxjs/toolkit'
import { videosReducer } from './videosSlice'

const store = configureStore({
    reducer: { videos: videosReducer },
})

export default store
