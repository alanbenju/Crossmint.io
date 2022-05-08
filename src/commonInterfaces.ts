export interface IResponse {
    result?: any
    err?: string
}

export interface ICreatedResponse {
    data: any,
    status: number
}

export interface IGoalResponse {
    data: {
        goal: Array<Array<string>>
    }
}