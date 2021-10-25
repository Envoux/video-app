import { useState } from 'react'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { VideoItemProps } from '../VideoItemProps.types'
import classes from './VideoListItem.module.css'

const VideoListItem: React.FC<VideoItemProps> = ({
    video,
    removeVideo,
    addToFavourites,
    toggleModal,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(-1)

    const toggleDropdown = (id: number) => {
        if (id === dropdownOpen) id = -1
        setDropdownOpen(id)
    }

    return (
        <div className={classes.flexListItem}>
            <div onClick={() => toggleModal(video.embedUrl)}>
                <img src={video.thumbnailUrl} alt="thumbnail" />
            </div>
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <h4 style={{ display: 'block' }}>{video.name}</h4>
                    <h4 style={{ display: 'block' }}>
                        <Dropdown
                            isOpen={dropdownOpen === video.id}
                            toggle={() => toggleDropdown(video.id)}
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
                            <DropdownMenu
                                style={{ backgroundColor: '#222222' }}
                            >
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
        </div>
    )
}

export default VideoListItem
