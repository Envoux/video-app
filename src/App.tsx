import { Redirect, Route, Switch } from 'react-router'
import AddVideo from './pages/AddVideo/AddVideo'
import AllVideos from './pages/AllVideos/AllVideos'
import Navbar from './components/navbar/Navbar.component'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { videosActions } from './store/videosSlice'
import { data } from './data'

function App() {
    const dispatch = useDispatch()

    const loadDataFromLocalStorage = () => {
        const videos = localStorage.getItem('videos')
        const favouriteVideos = localStorage.getItem('favouriteVideos')
        const count = localStorage.getItem('count')
        if (videos && favouriteVideos && count) {
            const favouriteVideosConvert = JSON.parse(favouriteVideos)
            dispatch(
                videosActions.loadDataFromLocalStorage({
                    videos: JSON.parse(videos),
                    favouriteVideos: favouriteVideosConvert.map((item: any) =>
                        Number(item)
                    ),
                    count: Number(count),
                })
            )
        }
    }

    useEffect(() => {
        //console.log(JSON.stringify(data))
        loadDataFromLocalStorage()
        if (data !== null || data !== undefined)
            dispatch(videosActions.loadDataFromFile(data))
    }, [dispatch])
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" component={AddVideo} exact></Route>
                <Route path="/videos" exact>
                    <Redirect to="/videos/1" />
                </Route>
                <Route path="/videos/:page">
                    <AllVideos />
                </Route>
                <Route path="*"></Route>
            </Switch>
        </>
    )
}

export default App
