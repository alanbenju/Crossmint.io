import { IAstralObject } from "./AstralObjects/AstralObject";
import { Cometh } from "./AstralObjects/Cometh";
import { Polyanet } from "./AstralObjects/Polyanet";
import { Soloon } from "./AstralObjects/Soloon";

export enum AstralObjects{
    SPACE="SPACE",
    POLYANET="POLYANET",
    COMETH="COMETH",
    SOLOON="SOLOON"
}

class AstralObjectFactory {

    types = {
        "POLYANET": Polyanet,
        "COMETH": Cometh,
        "SOLOON": Soloon
    }

    create(astralObject: string): IAstralObject {
        const object = astralObject.split("_");
        return object[1] ? new this.types[object[1]](object[0]) : new this.types[object[0]]()
    }
}

export default new AstralObjectFactory();