import { IAstralObject } from "./AstralObjects/AstralObject";
import AstralObjectFactory from "./AstralObjectFactory";

export interface IPosition {
    column: number,
    row: number,
    createAstralObject(row?: number, column?: number): Promise<void>
    moveTo(row:number,column:number):void
}

export class Position {
    row: number;
    column: number;
    astralObject: IAstralObject;

    constructor(row: number, column: number, astralObject?: string) {
        this.row = row
        this.column = column
        if (astralObject) this.astralObject = AstralObjectFactory.create(astralObject);
    }

    async createAstralObject(row?: number, column?: number):Promise<void>{
        await this.astralObject.create(row != undefined ? row: this.row, column != undefined ? column : this.column); // can't do row || this row because if row is 0 it fails
    }

    moveTo(row:number,column:number){
        this.row = row
        this.column = column
    }
}