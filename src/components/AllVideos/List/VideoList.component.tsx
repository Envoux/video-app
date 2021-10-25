import { VideoContainerProps } from '../VideoContainerProps.types'
import classes from './VideoList.module.css'
import VideoListItem from './VideoListItem.component'

const VideoList: React.FC<VideoContainerProps> = ({
    videos,
    removeVideo,
    addToFavourites,
    toggleModal,
}) => {
    const content = videos.map((item) => {
        return (
            <VideoListItem
                key={item.id}
                video={item}
                removeVideo={removeVideo}
                addToFavourites={addToFavourites}
                toggleModal={toggleModal}
            />
        )
    })
    return <div className={classes.flexListContainer}>{content}</div>
}

export default VideoList
