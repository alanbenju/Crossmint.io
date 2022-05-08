import { CrossmintMap } from "../src/classes/CrossmintMap";
import { AnyFigureStrategy } from "../src/classes/Strategies/AnyFigureStrategy";
import { IMapStrategy } from "../src/classes/Strategies/MapStrategy";
import { PolyanetCrossStrategy } from "../src/classes/Strategies/PolyanetCrossStrategy";
import * as CrossmintService from "../src/services/Crossmint.service";
jest.spyOn(CrossmintService, 'createPolyanet').mockResolvedValue({})
let mockCreatePolyanet;
let map;

describe("e2e Polyanet tests", function () {

    beforeEach(() => {
        map = new CrossmintMap();
    })

    beforeAll(() => {
        mockCreatePolyanet = jest.spyOn(CrossmintService, 'createPolyanet').mockImplementation(async () => {
            return Promise.resolve({})
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * [- - - -]
     * [x - x -]
     * [- x - -]
     * [x - x -]
     * [- - - -]
     * [- - - -]
     */
    const cross4x6MiddleLeft = async (strategy: IMapStrategy) => {
        const goal = [
            ["SPACE", "SPACE", "SPACE", "SPACE"],
            ["POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "SPACE"],
            ["POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        map.setStrategy(strategy);
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(5);
        expect(mockCreatePolyanet).toBeCalledWith(1, 2)
        expect(mockCreatePolyanet).toBeCalledWith(3, 0)
        expect(mockCreatePolyanet).toBeCalledWith(3, 2)
        expect(mockCreatePolyanet).toBeCalledWith(1, 0)
        expect(mockCreatePolyanet).toBeCalledWith(2, 1)
    }
    test('[CrossStrategy]Create cross in 4*6 rectangle as shown in comment', async () => {
        await cross4x6MiddleLeft(new PolyanetCrossStrategy());
    });
    test('[AnyFigureStrategy]Create cross in 4*6 rectangle as shown in comment', async () => {
        await cross4x6MiddleLeft(new AnyFigureStrategy());
    });



    /**
     * [x - x -]
     * [- x - -]
     * [x - x -]
     * [- - - -]
     * [- - - -]
     */
     const cross4x5TopLeft = async (strategy: IMapStrategy) => {
        const goal = [
            ["POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "SPACE"],
            ["POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        map.setStrategy(strategy);
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(5);
        expect(mockCreatePolyanet).toBeCalledWith(0, 0)
        expect(mockCreatePolyanet).toBeCalledWith(0, 2)
        expect(mockCreatePolyanet).toBeCalledWith(2, 0)
        expect(mockCreatePolyanet).toBeCalledWith(2, 2)
        expect(mockCreatePolyanet).toBeCalledWith(1, 1)
    }
    test('[CrossStrategy]Create cross in 4*5 rectangle as shown in comment', async () => {
        await cross4x5TopLeft(new PolyanetCrossStrategy());

    });
    test('[AnyFigureStrategy]Create cross in 4*5 rectangle as shown in comment', async () => {
        await cross4x5TopLeft(new AnyFigureStrategy());
    });

    /**
     * [x - - - x]
     * [- x - x -]
     * [- - x - -]
     * [- x - x -]
     * [x - - - x]
     */
     const cross5x5Complete = async (strategy: IMapStrategy) => {
        const goal = [
            ["POLYANET", "SPACE", "SPACE", "SPACE", "POLYANET"],
            ["SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "POLYANET", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["POLYANET", "SPACE", "SPACE", "SPACE", "POLYANET"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        map.setStrategy(strategy);
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(9);
        expect(mockCreatePolyanet).toBeCalledWith(0, 0)
        expect(mockCreatePolyanet).toBeCalledWith(0, 4)
        expect(mockCreatePolyanet).toBeCalledWith(4, 0)
        expect(mockCreatePolyanet).toBeCalledWith(4, 4)
        expect(mockCreatePolyanet).toBeCalledWith(1, 1)
        expect(mockCreatePolyanet).toBeCalledWith(1, 3)
        expect(mockCreatePolyanet).toBeCalledWith(3, 1)
        expect(mockCreatePolyanet).toBeCalledWith(3, 3)
        expect(mockCreatePolyanet).toBeCalledWith(2, 2)
    }
    test('[CrossStrategy]Create cross in exact 5*5 square as shown in comment', async () => {
        await cross5x5Complete(new PolyanetCrossStrategy());
    });
    test('[AnyStrategy]Create cross in exact 5*5 square as shown in comment', async () => {
        await cross5x5Complete(new AnyFigureStrategy());
    });


    /**
     * [- - - - -]
     * [- x - x -]
     * [- - x - -]
     * [- x - x -]
     * [- - - - -]
     */
     const cross5x5With1Padding = async (strategy: IMapStrategy) => {
        const goal = [
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "POLYANET", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        await map.setStrategy(strategy);
        await map.setGoalMap();
        await map.createAstralObjects();

        expect(mockCreatePolyanet).toBeCalledTimes(5);
        expect(mockCreatePolyanet).toBeCalledWith(1, 1)
        expect(mockCreatePolyanet).toBeCalledWith(3, 1)
        expect(mockCreatePolyanet).toBeCalledWith(1, 3)
        expect(mockCreatePolyanet).toBeCalledWith(3, 3)
        expect(mockCreatePolyanet).toBeCalledWith(2, 2)
    }
    test('[CrossStrategy]Create cross in exact 5*5 square with 1 padding as shown in comment', async () => {
        await cross5x5With1Padding(new PolyanetCrossStrategy());
    });
    test('[AnyFigureStrategy]Create cross in exact 5*5 square with 1 padding as shown in comment', async () => {
        await cross5x5With1Padding(new AnyFigureStrategy());
    });

    /**
     * [- - - - - -]
     * [- x - x - -]
     * [- - x - - -]
     * [- x - x - -]
     * [- - - - - -]
     */
     const cross6x5MiddleLeft = async (strategy: IMapStrategy) => {
        const goal = [
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "POLYANET", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        map.setStrategy(strategy)
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(5);
        expect(mockCreatePolyanet).toBeCalledWith(1, 1)
        expect(mockCreatePolyanet).toBeCalledWith(3, 1)
        expect(mockCreatePolyanet).toBeCalledWith(1, 3)
        expect(mockCreatePolyanet).toBeCalledWith(3, 3)
        expect(mockCreatePolyanet).toBeCalledWith(2, 2)
    }
    test('[CrossStrategy]Create cross in the middle left of rectangle as shown in comment', async () => {
        await cross6x5MiddleLeft(new PolyanetCrossStrategy());
    });
    test('[AnyFigureStrategy]Create cross in the middle left of rectangle as shown in comment', async () => {
        await cross6x5MiddleLeft(new AnyFigureStrategy());
    });

    /**
     * [- - - - - -]
     * [- - - - - -]
     * [- - - x - x]
     * [- - - - x -]
     * [- - - x - x]
     */
     const cross6x5BottomRight = async (strategy: IMapStrategy) => {
        const goal = [
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "POLYANET", "SPACE", "POLYANET"],
            ["SPACE", "SPACE", "SPACE", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "POLYANET", "SPACE", "POLYANET"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        map.setStrategy(strategy)
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(5);
        expect(mockCreatePolyanet).toBeCalledWith(2, 3)
        expect(mockCreatePolyanet).toBeCalledWith(2, 5)
        expect(mockCreatePolyanet).toBeCalledWith(4, 3)
        expect(mockCreatePolyanet).toBeCalledWith(4, 5)
        expect(mockCreatePolyanet).toBeCalledWith(3, 4)
    }
    test('[CrossStrategy]Create cross in the bottom right rectangle as shown in comment', async () => {
        await cross6x5BottomRight(new PolyanetCrossStrategy());
    });
    test('[AnyFigureStrategy]Create cross in the bottom right rectangle as shown in comment', async () => {
        await cross6x5BottomRight(new AnyFigureStrategy());
    });

    /**
     * [- - - - - - -]
     * [- x - - - x -]
     * [- - x - x - -]
     * [- - - x - - -]
     * [- - x - x - -]
     * [- x - - - x- ]
     * [- - - - - - -]
     */
     const cross7x7With1Padding = async (strategy: IMapStrategy) => {
        const goal = [
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "SPACE", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "POLYANET", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "POLYANET", "SPACE", "POLYANET", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "SPACE", "SPACE", "POLYANET", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        map.setStrategy(strategy)
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(9);
        expect(mockCreatePolyanet).toBeCalledWith(1, 1)
        expect(mockCreatePolyanet).toBeCalledWith(1, 5)
        expect(mockCreatePolyanet).toBeCalledWith(5, 1)
        expect(mockCreatePolyanet).toBeCalledWith(5, 5)
        expect(mockCreatePolyanet).toBeCalledWith(2, 2)
        expect(mockCreatePolyanet).toBeCalledWith(2, 4)
        expect(mockCreatePolyanet).toBeCalledWith(4, 2)
        expect(mockCreatePolyanet).toBeCalledWith(4, 4)
        expect(mockCreatePolyanet).toBeCalledWith(3, 3)
    }
    test('[CrossStrategy]Create cross in exact 7*7 with padding 1 as shown in comment', async () => {
        await cross7x7With1Padding(new PolyanetCrossStrategy());
    });
    test('[AnyFigureStrategy]Create cross in exact 7*7 with padding 1 as shown in comment', async () => {
        await cross7x7With1Padding(new AnyFigureStrategy());
    });
})