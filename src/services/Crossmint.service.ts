import axios from "axios";
import { ICreatedResponse, IResponse, IGoalResponse } from "../commonInterfaces";

const candidateId = "8ac28fdc-39a0-4502-9a0a-64597ce40a74"

async function _createPolyanet(row: number, column: number) {
    if (column == undefined || row == undefined) return Promise.resolve({ err: "Missing params" });
    const body = {
        candidateId,
        row,
        column
    }
    console.log(`Creating Polyanet in Column: ${column}, row: ${row} `)
    return axios.post("https://challenge.crossmint.io/api/polyanets", body).then((res: ICreatedResponse) => {
        console.log(`Created Polyanet in Column: ${column}, row: ${row} `)
        return {
            result: res.data
        };
    }).catch((err) => {
        console.log(`Error creating Polyanet in Column: ${column}, row: ${row} `)
        return Promise.reject({ err })
    })
}

export async function createPolyanet(row: number, column: number): Promise<IResponse> {
    return _createPolyanet(row, column).catch(() => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                _createPolyanet(row, column).then(resolve).catch((err) => reject(err))
            }), 5000
        })
    })
}

async function _createSoloon(row: number, column: number, color: string): Promise<IResponse> {
    if (column == undefined || row == undefined || !color) return Promise.resolve({ err: "Missing params" });
    const body = {
        candidateId,
        row,
        column,
        color
    }
    console.log(`Creating Soloon in Column: ${column}, row: ${row} with color ${color}`)
    return axios.post("https://challenge.crossmint.io/api/soloons", body).then((res: ICreatedResponse) => {
        console.log(`Created Soloon in Column: ${column}, row: ${row} with color ${color}`)
        return {
            result: res.data
        };
    }).catch((err) => {
        console.log(`Error creating Soloon in Column: ${column}, row: ${row} with color ${color}`)
        return Promise.reject({ err })
    })
}


export async function createSoloon(row: number, column: number, color: string): Promise<IResponse> {
    return _createSoloon(row, column, color).catch(() => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                _createSoloon(row, column, color).then(resolve).catch((err) => reject(err))
            }), 5000
        })
    })
}

async function _createCometh(row: number, column: number, direction: string): Promise<IResponse> {
    if (column == undefined || row == undefined || !direction) return Promise.resolve({ err: "Missing params" });
    const body = {
        candidateId,
        row,
        column,
        direction
    }
    console.log(`Creating Cometh in Column: ${column}, row: ${row} with direction ${direction}`)
    return axios.post("https://challenge.crossmint.io/api/comeths", body).then((res: ICreatedResponse) => {
        console.log(`Created Cometh in Column: ${column}, row: ${row} with direction ${direction}`)
        return {
            result: res.data
        };
    }).catch((err) => {
        console.log(`Error creating Cometh in Column: ${column}, row: ${row} with direction ${direction}`)
        return Promise.reject({ err })
    })

}

export async function createCometh(row: number, column: number, direction: string): Promise<IResponse> {
    return _createCometh(row, column, direction).catch(() => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                _createCometh(row, column, direction).then(resolve).catch((err) => reject(err))
            }), 5000
        })
    })
}

export async function getGoal(): Promise<IResponse> {
    return axios.get(`https://challenge.crossmint.io/api/map/${candidateId}/goal`,).then((res: IGoalResponse) => {
        return {
            result: res.data.goal
        };
    }).catch((err) => {
        console.log("error getting goal", err)
        return { err }
    })
}