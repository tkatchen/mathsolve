import { constants } from "../util/constants.js";
import { Expression } from "./Expression.js"

export const Equation = class Equation {
    constructor(equation) {
        this.equation = equation.toString().toLowerCase();
        [this.leftSide, this.rightSide] = this.parseSides()
        this.type = 0
    }

    parseSides() {
        let equationArray = this.equation.split('=')
        switch(equationArray.length) {
            case 2:
                // Equation expecting a number
                if(equationArray[0] == '' || equationArray[1] == '') return new SyntaxError('Invalid input, empty space')
                
                this.type = 0

                return [new Expression(equationArray[0]), equationArray[1]]
            case 3:
                // Here we have a case where something is expecting a boolean (a == b)
                if(equationArray[1] != '') return new SyntaxError('Invalid input type, extra equal sign')
                if(equationArray[0] == '' || equationArray[2] == '') return new SyntaxError('Invalid input, empty space')

                this.type = 1

                return [equationArray[0], equationArray[2]]
            default:
                // They have 3 or more equal signs
                return SyntaxError('Can not input 3 or more equal signs')
        }
    }

    solve() {
        return this.leftSide
    }
}