import { Equation } from "../classes/Equation.js"
import { Expression } from "../classes/Expression.js";

export function solve(input) {
    if(input.split('=').length == 1) {
        
        let expression = new Expression(input)
        return expression.simplify()
    }
    let equation = new Equation(input)
    return equation.solve()
}