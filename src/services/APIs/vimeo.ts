import axios from 'axios'
import { VideoStats } from '../videoAPI'

const vimeoFetchHandler = async (id: string, key: string) => {
    const url = 'https://api.vimeo.com/videos/' + id

    const config = { headers: { Authorization: 'Bearer ' + key } }

    const response = await axios.get<any>(url, config)

    const title = response.data.name
    const thumbnailUrl = response.data.pictures.sizes[2].link
    const embedUrl = 'https://player.vimeo.com/video/' + id //response.data.embed.html;
    const viewCount = response.data.stats.plays
    const likeCount = response.data.metadata.connections.likes.total

    const data = new VideoStats(
        title,
        thumbnailUrl,
        embedUrl,
        viewCount,
        likeCount
    )

    return data
}

export default vimeoFetchHandler
