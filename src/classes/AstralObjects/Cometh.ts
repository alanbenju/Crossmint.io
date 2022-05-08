import { IResponse } from "../../commonInterfaces";
import { createCometh } from "../../services/Crossmint.service";
import { IAstralObject } from "./AstralObject";

export class Cometh implements IAstralObject{

    direction: string;
    constructor(direction:string){
        this.direction = direction.toLowerCase();
    }
    async create(row:number, column:number): Promise<IResponse> {
        return await createCometh(row,column,this.direction);
    }
    
}
