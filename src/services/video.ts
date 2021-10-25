export interface Video {
    id: number
    views: number
    likes: number
    name: string
    thumbnailUrl: string
    embedUrl: string
    date: string
    favourite: boolean
}

export class VideoClass {
    constructor(
        public id: Video['id'],
        public views: Video['views'],
        public likes: Video['likes'],
        public name: Video['name'],
        public thumbnailUrl: Video['thumbnailUrl'],
        public embedUrl: Video['embedUrl'],
        public date: Video['date']
    ) {}

    static getFormatedDate = (date: Date) => {
        let year = date.getFullYear()

        let month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month

        let day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day

        return day + '-' + month + '-' + year
    }
}
