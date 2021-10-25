import { VideoContainerProps } from '../VideoContainerProps.types'
import classes from './VideoGrid.module.css'
import VideoGridItem from './VideoGridItem.component'

const VideoGrid: React.FC<VideoContainerProps> = ({
    videos,
    removeVideo,
    addToFavourites,
    toggleModal,
}) => {
    const content = videos.map((item) => {
        return (
            <VideoGridItem
                key={item.id}
                video={item}
                removeVideo={removeVideo}
                addToFavourites={addToFavourites}
                toggleModal={toggleModal}
            />
        )
    })
    return <div className={classes.flexGridContainer}>{content}</div>
}

export default VideoGrid
