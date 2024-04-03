export interface ICard {
    id: string
    image: string
    title: string
    description: string
}

export interface IHikeCard {
    id: number
    imageUrl: string
    hikeDate: string
    hikeInfo: string
    location: string
}

export interface IHut {
    id: number
    accommodationName: string
    owner: IOwner
}

export interface IOwner {
    id: number
    username: string
    imageUrl: string
}

export interface IComment {
    id: number
    message: string
    owner: IOwner
}

export interface IHike {
    id: number
    hikeDate: string
    hikeInfo: string
    location: string
    hikingTrail: ITrail
    comments: IComment[]
}

export interface ITrail {
    id: number
    startPoint: string
    endPoint: string
    totalDistance: number
    trailInfo: string
    imageUrl: string
    seasonVisited: string
    waterAvailable: boolean
    availableHuts: IHut[]
    trailDifficulty: number
    activity: string
    comments: IComment[]
    elevationGained: number
    nextTo: string
}