import { IResponse } from "../../commonInterfaces"

export interface IAstralObject {
    create(row: number, column: number): Promise<IResponse>
}