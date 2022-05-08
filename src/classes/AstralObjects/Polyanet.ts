import { IResponse } from "../../commonInterfaces";
import { createPolyanet } from "../../services/Crossmint.service";
import { IAstralObject } from "./AstralObject";

export class Polyanet implements IAstralObject{

    async create(row:number, column:number): Promise<IResponse> {
        return await createPolyanet(row, column);
    }
}