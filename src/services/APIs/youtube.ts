import axios from 'axios'
import { VideoStats } from '../videoAPI'

const youtubeFetchHandler = async (id: string, key: string) => {
    const url =
        'https://www.googleapis.com/youtube/v3/videos?id=' +
        id +
        '&key=' +
        key +
        '&part=snippet,statistics'

    const response = await axios.get<any>(url)

    const title = response.data.items[0].snippet.title
    const thumbnailUrl = response.data.items[0].snippet.thumbnails.medium.url
    const embedUrl = 'https://www.youtube.com/embed/' + id
    const viewCount = response.data.items[0].statistics.viewCount
    const likeCount = response.data.items[0].statistics.likeCount

    const data = new VideoStats(
        title,
        thumbnailUrl,
        embedUrl,
        viewCount,
        likeCount
    )

    return data
}

export default youtubeFetchHandler
