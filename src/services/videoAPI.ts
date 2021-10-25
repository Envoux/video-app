import vimeoFetchHandler from './APIs/vimeo'
import youtubeFetchHandler from './APIs/youtube'

export class VideoStats {
    title: string
    thumbnailUrl: string
    embedUrl: string
    viewCount: number
    likeCount: number

    constructor(
        title: string,
        thumbnailUrl: string,
        embedUrl: string,
        viewCount: number,
        likeCount: number
    ) {
        this.title = title
        this.thumbnailUrl = thumbnailUrl
        this.embedUrl = embedUrl
        this.viewCount = viewCount
        this.likeCount = likeCount
    }
}

export class VideoApi {
    key: string
    linkPattern: RegExp
    idPattern: RegExp
    fetchFunc: (id: string, key: string) => Promise<VideoStats>
    constructor(
        key: string,
        linkPattern: RegExp,
        idPattern: RegExp,
        fetchFunc: (id: string, key: string) => Promise<VideoStats>
    ) {
        this.key = key
        this.linkPattern = linkPattern
        this.idPattern = idPattern
        this.fetchFunc = fetchFunc
    }

    fetch = (id: string) => {
        return this.fetchFunc(id, this.key)
    }

    checkUrlMatch = (url: string) => {
        return this.linkPattern.exec(url)
    }

    checkIdMatch = (id: string) => {
        return this.idPattern.test(id)
    }
}

const youtube = new VideoApi(
    '', //youtube key
    /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/,
    /^[a-zA-Z0-9_-]{11,11}$/,
    youtubeFetchHandler
)

const vimeo = new VideoApi(
    '', //vimeo token
    /(?:http|https)?:?\/?\/?(?:www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/,
    /^[0-9]{9,9}$/,
    vimeoFetchHandler
)

const apiArray = [youtube, vimeo]

export default apiArray
