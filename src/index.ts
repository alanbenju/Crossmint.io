import { CrossmintMap } from "./classes/CrossmintMap";
import { AnyFigureStrategy } from "./classes/Strategies/AnyFigureStrategy";

(async () => {
    const crossmintMap = new CrossmintMap();
    await crossmintMap.setGoalMap()
    crossmintMap.setStrategy(new AnyFigureStrategy());
    try{
        await crossmintMap.createAstralObjects();
    }
    catch(err){
        console.log("Error creating astral objects", err)
    }
})()
