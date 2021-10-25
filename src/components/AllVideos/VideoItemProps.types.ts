import { Video } from '../../services/video'

export interface VideoItemProps {
    video: Video
    removeVideo: (id: number) => void
    addToFavourites: (id: number) => void
    toggleModal: (url?: string) => void
}
