import { CrossmintMap } from "../src/classes/CrossmintMap";
import { AnyFigureStrategy } from "../src/classes/Strategies/AnyFigureStrategy";
import * as CrossmintService from "../src/services/Crossmint.service";
jest.spyOn(CrossmintService, 'createPolyanet').mockResolvedValue({})
jest.spyOn(CrossmintService, 'createSoloon').mockResolvedValue({})
jest.spyOn(CrossmintService, 'createCometh').mockResolvedValue({})
let mockCreatePolyanet;
let mockCreateSoloon;
let mockCreateCometh;
let map;

describe("e2e AnyFigureStrategy tests", function () {

    beforeEach(() => {
        map = new CrossmintMap();
        map.setStrategy(new AnyFigureStrategy());
    })

    beforeAll(() => {
        mockCreatePolyanet = jest.spyOn(CrossmintService, 'createPolyanet').mockImplementation(async () => {
            return Promise.resolve({})
        });
        mockCreateSoloon = jest.spyOn(CrossmintService, 'createSoloon').mockImplementation(async () => {
            return Promise.resolve({})
        });
        mockCreateCometh = jest.spyOn(CrossmintService, 'createCometh').mockImplementation(async () => {
            return Promise.resolve({})
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * [- - - -]
     * [p s c p]
     * [s p p c]
     * [- - - -]
     * [- p p -]
     * [c - - c]
     */
    test('[AnyFigureStrategy]Create astral objects in 4*6 rectangle as shown in comment', async () => {
        const goal = [
            ["SPACE", "SPACE", "SPACE", "SPACE"],
            ["POLYANET", "WHITE_SOLOON", "RIGHT_COMETH", "POLYANET"],
            ["RED_SOLOON", "POLYANET", "POLYANET", "UP_COMETH"],
            ["SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "POLYANET", "SPACE"],
            ["UP_COMETH", "SPACE", "SPACE", "DOWN_COMETH"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(6);
        expect(mockCreateSoloon).toBeCalledTimes(2);
        expect(mockCreateCometh).toBeCalledTimes(4);

        expect(mockCreatePolyanet).toBeCalledWith(1, 0)
        expect(mockCreatePolyanet).toBeCalledWith(1, 3)
        expect(mockCreatePolyanet).toBeCalledWith(2, 1)
        expect(mockCreatePolyanet).toBeCalledWith(2, 2)
        expect(mockCreatePolyanet).toBeCalledWith(4, 1)
        expect(mockCreatePolyanet).toBeCalledWith(4, 2)

        expect(mockCreateSoloon).toBeCalledWith(1, 1, "white")
        expect(mockCreateSoloon).toBeCalledWith(2, 0, "red")

        expect(mockCreateCometh).toBeCalledWith(1, 2, "right")
        expect(mockCreateCometh).toBeCalledWith(2, 3, "up")
        expect(mockCreateCometh).toBeCalledWith(5, 0, "up")
        expect(mockCreateCometh).toBeCalledWith(5, 3, "down")
    });

    /**
     * [p p p p p - - - - -]
     * [- - - - - c c c c c]
     * [s s s s s - - - - -]
     * [- p - s - c - s - p]
     * [- - - - - - - - - c]
     */
    test('[AnyStrategy]Create cross in exact 10*5 square as shown in comment', async () => {
        const goal = [
            ["POLYANET", "POLYANET", "POLYANET", "POLYANET", "POLYANET", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "RIGHT_COMETH", "LEFT_COMETH", "UP_COMETH", "DOWN_COMETH", "RIGHT_COMETH"],
            ["RED_SOLOON", "BLUE_SOLOON", "WHITE_SOLOON", "BLACK_SOLOON", "PURPLE_SOLOON", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE"],
            ["SPACE", "POLYANET", "SPACE", "RED_SOLOON", "SPACE", "RIGHT_COMETH", "SPACE", "RED_SOLOON", "SPACE", "POLYANET"],
            ["SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "SPACE", "LEFT_COMETH"]
        ]
        jest.spyOn(CrossmintService, 'getGoal').mockImplementationOnce(async () => {
            return Promise.resolve({ result: goal })
        });
        await map.setGoalMap();
        await map.createAstralObjects();
        expect(mockCreatePolyanet).toBeCalledTimes(7);
        expect(mockCreateSoloon).toBeCalledTimes(7);
        expect(mockCreateCometh).toBeCalledTimes(7);

        expect(mockCreatePolyanet).toBeCalledWith(0, 0)
        expect(mockCreatePolyanet).toBeCalledWith(0, 1)
        expect(mockCreatePolyanet).toBeCalledWith(0, 2)
        expect(mockCreatePolyanet).toBeCalledWith(0, 3)
        expect(mockCreatePolyanet).toBeCalledWith(0, 4)
        expect(mockCreatePolyanet).toBeCalledWith(3, 1)
        expect(mockCreatePolyanet).toBeCalledWith(3, 9)

        expect(mockCreateSoloon).toBeCalledWith(2, 0, "red")
        expect(mockCreateSoloon).toBeCalledWith(2, 1, "blue")
        expect(mockCreateSoloon).toBeCalledWith(2, 2, "white")
        expect(mockCreateSoloon).toBeCalledWith(2, 3, "black")
        expect(mockCreateSoloon).toBeCalledWith(2, 4, "purple")
        expect(mockCreateSoloon).toBeCalledWith(3, 3, "red")
        expect(mockCreateSoloon).toBeCalledWith(3, 7, "red")

        expect(mockCreateCometh).toBeCalledWith(1, 5, "right")
        expect(mockCreateCometh).toBeCalledWith(1, 6, "left")
        expect(mockCreateCometh).toBeCalledWith(1, 7, "up")
        expect(mockCreateCometh).toBeCalledWith(1, 8, "down")
        expect(mockCreateCometh).toBeCalledWith(1, 9, "right")
        expect(mockCreateCometh).toBeCalledWith(3, 5, "right")
        expect(mockCreateCometh).toBeCalledWith(4, 9, "left")
    });

})