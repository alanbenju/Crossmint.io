import AstralObjectFactory from "../src/classes/AstralObjectFactory";
import { Cometh } from "../src/classes/AstralObjects/Cometh";
import { Polyanet } from "../src/classes/AstralObjects/Polyanet";
import { Soloon } from "../src/classes/AstralObjects/Soloon";


describe("AstralObjectFactory", function () {
    const astralObjectFactory = AstralObjectFactory
    it('Create comeths', () => {
        const upcometh = astralObjectFactory.create("UP_COMETH") as Cometh;
        expect(upcometh.direction).toEqual("up");

        const downcometh = astralObjectFactory.create("DOWN_COMETH") as Cometh;
        expect(downcometh.direction).toEqual("down");

        const leftcometh = astralObjectFactory.create("LEFT_COMETH") as Cometh;
        expect(leftcometh.direction).toEqual("left");

        const rightcometh = astralObjectFactory.create("RIGHT_COMETH") as Cometh;
        expect(rightcometh.direction).toEqual("right");
    })

    it('Create polyanets', () => {
        const polyanet = astralObjectFactory.create("POLYANET");
        expect(polyanet).toBeInstanceOf(Polyanet);
    })

    it('Create soloons', () => {
        const redSoloon = astralObjectFactory.create("RED_SOLOON") as Soloon;
        expect(redSoloon.color).toEqual("red");

        const whiteSoloon = astralObjectFactory.create("WHITE_SOLOON") as Soloon;
        expect(whiteSoloon.color).toEqual("white");

        const blueSoloon = astralObjectFactory.create("BLUE_SOLOON") as Soloon;
        expect(blueSoloon.color).toEqual("blue");

        const blackSoloon = astralObjectFactory.create("BLACK_SOLOON") as Soloon;
        expect(blackSoloon.color).toEqual("black");
    })


})
