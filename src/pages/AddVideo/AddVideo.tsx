import NewVideo from '../../components/NewVideo/NewVideo.component'

import classes from './AddVideo.module.css'

const AddVideo: React.FC = () => {
    return (
        <div className={classes.container}>
            <NewVideo />
        </div>
    )
}

export default AddVideo
