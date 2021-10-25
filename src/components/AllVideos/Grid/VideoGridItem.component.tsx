import { useState } from 'react'
import { VideoItemProps } from '../VideoItemProps.types'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import classes from './VideoGridItem.module.css'

const VideoGridItem: React.FC<VideoItemProps> = ({
    video,
    removeVideo,
    addToFavourites,
    toggleModal,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(-1)

    const toggle = (id: number) => {
        if (id === dropdownOpen) id = -1
        setDropdownOpen(id)
    }
    return (
        <div className={classes.flexGridItem}>
            <div onClick={() => toggleModal(video.embedUrl)}>
                <img src={video.thumbnailUrl} alt="thumbnail" />
            </div>
            <div className={classes.cardHeader}>
                <h4 className={classes.title}>{video.name}</h4>
                <h4 className={classes.dropdownContainer}>
                    <Dropdown
                        isOpen={dropdownOpen === video.id}
                        toggle={() => toggle(video.id)}
                        direction="left"
                    >
                        <DropdownToggle
                            style={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            }}
                        >
                            <BsThreeDotsVertical />
                        </DropdownToggle>
                        <DropdownMenu style={{ backgroundColor: '#222222' }}>
                            <DropdownItem header>Actions</DropdownItem>
                            <DropdownItem
                                onClick={() => removeVideo(video.id)}
                                className={classes.dropdownItem}
                            >
                                Remove
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => addToFavourites(video.id)}
                                className={classes.dropdownItem}
                            >
                                {video.favourite
                                    ? 'Remove from favourites'
                                    : 'Add to favourites'}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </h4>
            </div>
            <h5>{video.date}</h5>
            <div>Views: {video.views}</div>
            <div>Likes: {video.likes}</div>
        </div>
    )
}

export default VideoGridItem
