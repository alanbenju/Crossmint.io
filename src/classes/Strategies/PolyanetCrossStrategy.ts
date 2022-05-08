import { IResponse } from "../../commonInterfaces";
import { AstralObjects } from "../AstralObjectFactory";
import { IPosition, Position } from "../Position";
import { IMapStrategy } from "./MapStrategy";

export class PolyanetCrossStrategy implements IMapStrategy{

    topLeft: IPosition;
    topRight: IPosition;

    async createAstralObjects(map: Array<Array<string>>): Promise<IResponse> {
        try{
            this.findTopLeftCorner(map);
            this.findTopRightCorner(map);
            await this.createPolyanetCross()
            return {
                result: true
            }
        }
        catch(err){
            console.log("Error solving map with cross strategy", err)
            return {
                err
            }
        }
    }

    findTopLeftCorner(map: Array<Array<string>>) {
        const rows = map.length
        const columns = map[0].length
        for (let row = 0; row < rows; row++) {
            const currentRow = map[row]
            for (let column = 0; column < columns; column++) {
                if (currentRow[column] == AstralObjects.POLYANET) {
                    this.topLeft = new Position(row, column, currentRow[column])
                    return
                }
            }
        }
    }

    findTopRightCorner(map: Array<Array<string>>) {
        const rowToLook = map[this.topLeft.row];
        for (let column = this.topLeft.column + 1; column < rowToLook.length; column++) {
            if (rowToLook[column] == AstralObjects.POLYANET) {
                this.topRight = new Position(this.topLeft.row, column, rowToLook[column])
                return
            }
        }
    }

    async createPolyanetCross(): Promise<any>{
        const distance = this.topRight.column - this.topLeft.column;
        const bottomLeft = new Position(this.topLeft.row + distance, this.topLeft.column, AstralObjects.POLYANET);
        const bottomRight = new Position(bottomLeft.row, this.topRight.column,AstralObjects.POLYANET);
        const topLeft = new Position(this.topLeft.row, this.topLeft.column,AstralObjects.POLYANET)
        const topRight = new Position(this.topRight.row, this.topRight.column,AstralObjects.POLYANET)
        if (distance % 2 != 0) return Promise.reject("Can't create a cross in that position")
        const promises = []
        let step = 0
        const steps = distance / 2; // Create polyanets until the center of the square 
        for (step = 0; step < steps; step++) {
            promises.push(topLeft.createAstralObject(topLeft.row+step, topLeft.column+step));
            promises.push(topRight.createAstralObject(topRight.row + step, topRight.column-step));
            promises.push(bottomLeft.createAstralObject(bottomLeft.row-step, bottomLeft.column+step));
            promises.push(bottomRight.createAstralObject(bottomRight.row - step, bottomRight.column - step));
        }
        promises.push(topLeft.createAstralObject(topLeft.row + step, topLeft.column + step)); //center
        return Promise.all(promises)
    }

}