import { useRef, useState } from 'react'
import { StyledButton, StyledDiv, StyledInput } from './NewVideo.style'
import apiArray, { VideoStats } from '../../services/videoAPI'
import { useDispatch } from 'react-redux'
import { videosActions } from '../../store/videosSlice'

const NewVideo: React.FC = () => {
    const dispatch = useDispatch()
    const input = useRef<HTMLInputElement>()

    const [buttonStatus, setButtonStatus] = useState<
        'primary' | 'success' | 'error' | 'warning'
    >('primary')

    const addVideoToDb = (stats: VideoStats) => {
        dispatch(videosActions.addVideo(stats))
    }

    const addVideoHandler = async () => {
        try {
            const inputValue = input.current?.value
            if (inputValue !== undefined && inputValue !== '') {
                const idUrlMatch = apiArray.findIndex((item) =>
                    item.checkIdMatch(inputValue)
                )
                if (idUrlMatch !== -1) {
                    addVideoToDb(await apiArray[idUrlMatch].fetch(inputValue))
                } else {
                    for (let i = 0; i < apiArray.length; i++) {
                        let temp = apiArray[i].checkUrlMatch(inputValue)
                        if (temp !== null) {
                            addVideoToDb(await apiArray[i].fetch(temp[1]))
                            break
                        }
                    }
                }
                setButtonStatus('success')
            } else setButtonStatus('warning')
        } catch (error) {
            console.log(error)
            setButtonStatus('error')
        }
    }

    return (
        <StyledDiv>
            <StyledInput
                placeholder="https://www.youtube.com/watch?v=4JOAqRS_lms"
                type="text"
                innerRef={input}
            />
            <StyledButton color={buttonStatus} onClick={addVideoHandler}>
                Add
            </StyledButton>
        </StyledDiv>
    )
}

export default NewVideo
