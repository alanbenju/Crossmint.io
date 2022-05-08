import { IResponse } from "../../commonInterfaces";
import { AstralObjects } from "../AstralObjectFactory";
import { Position } from "../Position";
import { IMapStrategy } from "./MapStrategy";

export class AnyFigureStrategy implements IMapStrategy {
    async createAstralObjects(map: Array<Array<string>>): Promise<IResponse> {
        const promises = map.reduce((finalResult: Array<Promise<void>>, row, rowIndex) => {
            row.reduce((result, column, columnIndex) => {
                if (column != AstralObjects.SPACE) {
                    const p = new Position(rowIndex, columnIndex, column)
                    result.push(p.createAstralObject());
                }
                return result

            }, finalResult)
            return finalResult

        }, [])
        return Promise.all(promises).then(() => {
            return {
                result: true
            } as IResponse
        }
        ).catch((err) => {
            return {
                err
            } as IResponse
        })
    }

}