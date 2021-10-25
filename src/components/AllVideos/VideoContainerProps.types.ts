import { Video } from '../../services/video'

export interface VideoContainerProps {
    videos: Video[]
    favouriteVideos: number[]
    removeVideo: (id: number) => void
    addToFavourites: (id: number) => void
    toggleModal: (url?: string) => void
}
