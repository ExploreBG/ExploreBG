export interface IDestinationCard extends IPlace {
    imageUrl: string
    nextTo: string
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

export interface IAccommodationCard extends IHut {
    imageUrl: string
}

export interface IHut {
    id: number
    accommodationName: string
}

export interface IPlace {
    id: number
    destinationName: string
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

export interface IDestination extends IDestinationCard {
    location: string
    destinationInfo: string
    type: string
    comments: IComment[]
}

export interface IHike extends IHikeCard {
    nextTo: string
    owner: IOwner
    hikingTrail: ITrail
    comments: IComment[]
}

export interface ITrail extends ITrailCard {
    createdBy: IOwner
    startPoint: string
    endPoint: string
    totalDistance: number
    seasonVisited: string
    waterAvailable: string
    availableHuts: IHut[]
    trailDifficulty: number
    activity: string[]
    comments: IComment[]
    elevationGained: number
    nextTo: string
    destinations: IDestination[]
}

export interface IAccommodation extends IAccommodationCard {
    owner: IOwner
    phoneNumber: string
    site: string
    accommodationInfo: string
    bedCapacity: number
    pricePerBed: number
    foodAvailable: boolean
    access: string
    type: string
    nextTo: string
    comments: IComment[]
}

export interface IUserSession {
    token: string
    userId: number
    userRoles: string[]
    userImage?: string
}

export interface IUser {
    id: number
    username: string
    roles: { role: string }[]
    imageUrl: string | null
    creationDate: string
}

export interface IWaitingApproval {
    id: number;
    name: string;
    status: string;
    reviewedBy: string | null;
    creationDate: string;
}

export interface IFormEnums {
    [key: string]: string[] | number[]
}