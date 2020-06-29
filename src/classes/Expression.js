import { Lexer } from "./Lexer.js";

export const Expression = class Expression {
    constructor(expression) {
        this.expression = expression
        this.tokens = new Lexer(this.expression).tokens
        this.expressions = []
        this._generateExpressions()
    }

    _generateExpressions() {
        let depth = 0
        let pos = 0
        for(let token of this.tokens) {
            if(token.value == "L_PAREN") {
                if(depth == 0) pos = token.pos + 1
                depth++
            }
            if(token.value == "R_PAREN") {
                if(depth == 1) {
                    this.expressions.push(new Expression(this.expression.slice(pos, token.pos)))
                }
                depth--
            }
            if(depth <= -1) throw new SyntaxError("Too many right parenthesis at position " + token.pos)
        }

        if(depth != 0) throw new SyntaxError("Uneven number of parenthesis")
        console.log(this.expressions)
    }

    simplify() {
    }
}