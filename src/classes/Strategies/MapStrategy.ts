import { IResponse } from "../../commonInterfaces";

export interface IMapStrategy {
    createAstralObjects(map: Array<Array<string>>):Promise<IResponse>
}