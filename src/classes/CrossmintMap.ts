import { IResponse } from "../commonInterfaces";
import { getGoal } from "../services/Crossmint.service";
import { IMapStrategy } from "./Strategies/MapStrategy";

export interface ICrossmintMap {
    map: Array<Array<string>>
    mapStrategy: IMapStrategy;

    setGoalMap()

    setStrategy(strategy: IMapStrategy)

    createAstralObjects(): Promise<IResponse>
}

export class CrossmintMap implements ICrossmintMap {
    map: Array<Array<string>>
    mapStrategy: IMapStrategy;

    async setGoalMap() {
        const goal = await getGoal();
        this.map = goal.result;
    }

    setStrategy(strategy: IMapStrategy) {
        this.mapStrategy = strategy;
    }

    async createAstralObjects():Promise<IResponse> {
        return await this.mapStrategy.createAstralObjects(this.map);
    }
}