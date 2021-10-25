import React, { useEffect, useState } from 'react'
import { MdGridView, MdFormatListBulleted, MdSort } from 'react-icons/md'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import VideoList from '../../components/AllVideos/List/VideoList.component'
import classes from './AllVideos.module.css'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { videosActions } from '../../store/videosSlice'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import VideoGrid from '../../components/AllVideos/Grid/VideoGrid.component'
import { useParams, useHistory } from 'react-router-dom'
import { Video } from '../../services/video'
import PaginationButtonsContainer from '../../components/pagination/PaginationButtonContainer/PaginationButtonsContainer.component'

const AllVideos: React.FC = () => {
    const dispatch = useDispatch()
    const isSorted = useSelector(
        (state: RootStateOrAny) => state.videos.sortDesc
    )
    const videosDb = useSelector((state: RootStateOrAny) => state.videos.items)
    const favouriteVideos = useSelector(
        (state: RootStateOrAny) => state.videos.favouriteItems
    )

    const params = useParams<{ page: string }>()
    const history = useHistory()

    const [displayMode, setDisplayMode] = useState(true) //true - list | false - grid
    const [displayFavourites, setDisplayFavourites] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalSrc, setModalSrc] = useState('')
    const [videosToShow, setVideosToShow] = useState<Video[]>([])
    const [lastPage, setLastPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const videosOnPage = 6

    useEffect(() => {
        setCurrentPage(Number(params.page))
        if (isNaN(Number(currentPage)) === true) history.push('/videos/1')
        if (currentPage < 1) history.push('/videos/1')
        if (!displayFavourites) {
            setLastPage(Math.ceil(videosDb.length / videosOnPage))
            //if (page > lastPage) history.push('/videos/' + lastPage);
            //console.log(lastPage);
            const firstItemToShow = (currentPage - 1) * videosOnPage
            setVideosToShow(
                videosDb.slice(firstItemToShow, firstItemToShow + videosOnPage)
            )
        } else {
            setLastPage(Math.ceil(favouriteVideos.length / videosOnPage))
            //if (page > lastPage) history.push('/videos/' + lastPage);
            const firstItemToShow = (currentPage - 1) * videosOnPage
            const favoriteVideosSlice = favouriteVideos.slice(
                firstItemToShow,
                firstItemToShow + videosOnPage
            )
            setVideosToShow(
                videosDb.filter((item: any) =>
                    favoriteVideosSlice.includes(item.id)
                )
            )
        }
    }, [
        history,
        params,
        videosDb,
        displayFavourites,
        favouriteVideos,
        currentPage,
        lastPage,
    ])

    const sortHandler = () => {
        dispatch(videosActions.sortVideos())
    }

    const displayFavouritesHandler = () =>
        setDisplayFavourites((prevState) => !prevState)

    const toggleFavouriteVideoHandler = (id: number) => {
        dispatch(videosActions.toggleFavouriteVideo(id))
    }

    const removeVideoFromDb = (id: number) => {
        dispatch(videosActions.removeVideo(id))
    }

    const toggleModalHandler = (url?: string) => {
        if (url === undefined) {
            setModal(false)
            return
        }
        setModalSrc(url)
        setModal(true)
    }

    let content

    if (displayMode) {
        content = (
            <VideoList
                videos={videosToShow}
                favouriteVideos={favouriteVideos}
                removeVideo={removeVideoFromDb}
                addToFavourites={toggleFavouriteVideoHandler}
                toggleModal={toggleModalHandler}
            />
        )
    } else {
        content = (
            <VideoGrid
                videos={videosToShow}
                favouriteVideos={favouriteVideos}
                removeVideo={removeVideoFromDb}
                addToFavourites={toggleFavouriteVideoHandler}
                toggleModal={toggleModalHandler}
            />
        )
    }
    return (
        <div className={classes.container}>
            <Modal
                style={{ maxWidth: '675px', backgroundColor: '#222' }}
                isOpen={modal}
                toggle={() => toggleModalHandler()}
            >
                <ModalHeader
                    className={classes.modal}
                    toggle={() => toggleModalHandler()}
                >
                    Video Player
                </ModalHeader>
                <ModalBody className={classes.modal}>
                    <embed src={modalSrc} width="640" height="360"></embed>
                </ModalBody>
            </Modal>
            <div className={classes.mainButtons}>
                <h3>
                    <MdGridView
                        onClick={() => {
                            setDisplayMode(false)
                        }}
                    />
                    <MdFormatListBulleted
                        onClick={() => {
                            setDisplayMode(true)
                        }}
                    />
                    <MdSort
                        onClick={sortHandler}
                        style={{ transform: `ScaleY(${isSorted ? 1 : -1})` }}
                    />
                    {displayFavourites ? (
                        <AiFillHeart onClick={displayFavouritesHandler} />
                    ) : (
                        <AiOutlineHeart onClick={displayFavouritesHandler} />
                    )}
                </h3>
            </div>
            {content}
            <PaginationButtonsContainer
                currentPage={currentPage}
                lastPage={lastPage}
            />
        </div>
    )
}

export default AllVideos
