import { IResponse } from "../../commonInterfaces";
import { createSoloon } from "../../services/Crossmint.service";
import { IAstralObject } from "./AstralObject";

export class Soloon implements IAstralObject {

    color: string;
    constructor(color: string) {
        this.color = color.toLowerCase();
    }
    async create(row: number, column: number): Promise<IResponse> {
        return await createSoloon(row, column, this.color)
    }
}
