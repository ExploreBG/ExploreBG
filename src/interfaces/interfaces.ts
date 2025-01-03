export interface IDestinationCard extends IPlace {
    imageUrl: string
    nextTo: string
}

export interface ITrailCard {
    id: number
    trailName: string
    trailInfo: string
    imageUrl: string
    likedByUser: boolean
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
    lastUpdateDate: string
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
    images: TPhoto[]
    gpxFile: TGpxFile | null;
    lastUpdateDate: string
    detailsStatus?: string
}

export type TPhoto = {
    id: number,
    imageUrl: string,
    isMain: boolean,
    imageStatus?: string,
    reviewedBy?: TReviewedBy
}

export type TGpxFile = {
    id: number,
    gpxUrl: string,
    gpxStatus: string,
    creationDate: string
}

export interface ITrackInfo {
    name: string;
    distance: string;
    startTime: string;
    endTime: string;
    movingTime: string;
    totalTime: string;
    movingPace: string;
    movingSpeed: string;
    totalSpeed: string;
    elevationMin: string;
    elevationMax: string;
    elevationGain: string;
    elevationLoss: string;
    speedMax: string;
    averageHr?: string;
    averageCadence?: string;
    averageTemp?: string;
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

export interface IDecodedToken {
    iss: string;
    iat: number;
    exp: number;
    roles: string[];
}

export interface IUserSession {
    token: string
    userId: number
    userRoles: string[]
    userImage?: string
    isAdmin?: boolean
    isAdminOrModerator?: boolean
}

export interface IUser {
    id: number
    username: string
    roles: { role: string }[]
    imageUrl: string | null
    creationDate: string
    accountNonLocked: boolean
}

export interface IWaitingApproval {
    id: number;
    name: string;
    detailsStatus: string;
    destinationStatus?: string;
    accommodationStatus?: string;
    reviewedBy?: TReviewedBy;
    creationDate: string;
    images: TImagesForReview;
    gpxFile: {
        reviewedBy: TReviewedBy,
        gpxStatus: string
    }
}

export type TReviewedBy = {
    id: number,
    username: string
}

export type TImagesForReview = {
    id: number,
    reviewedBy: TReviewedBy,
    image_status: string
}[]

export interface IFormEnums {
    [key: string]: string[] | number[]
}