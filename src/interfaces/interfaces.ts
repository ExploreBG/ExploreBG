export interface ICard {
    id: string
    image: string
    title: string
    description: string
}

export interface ITrailCard {
    id: number
    trailName: string
    trailInfo: string
    imageUrl: string
}

export interface IHikeCard {
    id: number
    imageUrl: string
    hikeDate: string
    hikeInfo: string
    hikeName: string
}

export interface IAccommodationCard {
    id: number
    accommodationName: string
    imageUrl: string
}

export interface IHut {
    id: number
    accommodationName: string
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
    hikeName: string
    hikeInfo: string
    nextTo: string
    owner: IOwner
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
    activity: string[]
    comments: IComment[]
    elevationGained: number
    nextTo: string
}

export interface IAccommodation {
    id: number
    accommodationName: string
    owner: IOwner
    phoneNumber: string
    site: string
    imageUrl: string
    accommodationInfo: string
    bedCapacity: number
    pricePerBed: number
    foodAvailable: boolean
    access: string
    type: string
    nextTo: string
    comments: IComment[]
}

export interface ILoginRegisterTranslate {
    loginTitle: string
    registerTitle: string
    email: string
    username: string
    pass: string
    confirmPass: string
    usernameOrEmail: string
    rememberMe: string
    loginBtn: string
    registerBtn: string
}