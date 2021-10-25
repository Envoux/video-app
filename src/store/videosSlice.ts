import { createSlice } from '@reduxjs/toolkit'
import { Video, VideoClass } from '../services/video'

const initialState: {
    items: Video[]
    favouriteItems: number[]
    sortDesc: boolean
    count: number
} = { items: [], favouriteItems: [], sortDesc: true, count: 0 }

const sortByDate = (a: any, b: any, sortDesc = true) => {
    let temp = a.date.split('-')
    const dateA = new Date(temp[1] + '-' + temp[0] + '-' + temp[2])
    temp = b.date.split('-')
    const dateB = new Date(temp[1] + '-' + temp[0] + '-' + temp[2])
    if (sortDesc) return dateA.getTime() - dateB.getTime()
    return dateB.getTime() - dateA.getTime()
}

const sortFavouriteVideos = (videos: Video[]) => {
    let favouriteVideos = []
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].favourite === true) favouriteVideos.push(videos[i].id)
    }
    return favouriteVideos
}

const updateLocalStorage = (
    videos: Video[],
    favouriteVideos?: number[],
    count?: number
) => {
    localStorage.setItem('videos', JSON.stringify(videos))
    if (favouriteVideos !== undefined)
        localStorage.setItem('favouriteVideos', JSON.stringify(favouriteVideos))
    if (count !== undefined) localStorage.setItem('count', count + '')
}

const videosSlice = createSlice({
    name: 'videos',
    initialState: initialState,
    reducers: {
        loadDataFromLocalStorage(state, action) {
            const { videos, favouriteVideos, count } = action.payload
            state.items = videos.slice()
            state.favouriteItems = favouriteVideos.slice()
            state.count = count + 1
            state.items.sort((a, b) => sortByDate(a, b, false))
        },
        loadDataFromFile(state, action) {
            if (state.items.length !== 0) return
            const videosFromFile: Video[] = action.payload
            videosFromFile.forEach((video) => {
                video.id = state.count
                state.count++
                if (video.favourite) state.favouriteItems.push(video.id)
            })
            state.items = state.items.concat(videosFromFile)
        },
        addVideo(state, action) {
            const { viewCount, likeCount, title, thumbnailUrl, embedUrl } =
                action.payload
            const newVideo = {
                id: state.count,
                views: Number(viewCount),
                likes: Number(likeCount),
                name: title,
                thumbnailUrl: thumbnailUrl,
                embedUrl: embedUrl,
                date: VideoClass.getFormatedDate(new Date()),
                favourite: false,
            }
            state.items.push(newVideo)
            state.items.sort((a, b) => sortByDate(a, b, false))
            state.favouriteItems = sortFavouriteVideos(state.items)
            updateLocalStorage(state.items, state.favouriteItems, state.count)
            state.count++
        },
        removeVideo(state, action) {
            const id = action.payload
            state.items = state.items.filter((item) => item.id !== id)
            state.favouriteItems = state.favouriteItems.filter(
                (item) => item !== id
            )
            updateLocalStorage(state.items, state.favouriteItems)
        },
        toggleFavouriteVideo(state, action) {
            const id = action.payload
            const index = state.items.findIndex((item: Video) => item.id === id)
            if (state.items[index].favourite === false) {
                state.favouriteItems.push(id)
                state.items[index].favourite = true
                return
            }
            state.items[index].favourite = false
            state.favouriteItems = state.favouriteItems.filter(
                (item) => item !== id
            )
        },
        sortVideos(state) {
            state.items.sort((a, b) => sortByDate(a, b, state.sortDesc))
            state.favouriteItems = sortFavouriteVideos(state.items)
            state.sortDesc = !state.sortDesc
        },
    },
})

export const videosActions = videosSlice.actions
export const videosReducer = videosSlice.reducer
