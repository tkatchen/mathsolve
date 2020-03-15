import { Lexer } from "../src/lexer.js"
import { Expression } from "../src/expression.js"
let LexerInst = new Lexer()

LexerInst.init("32 ^ (x + 1)")

console.log(LexerInst.tokens)

let ExpressionInst = new Expression(LexerInst.tokens)

console.log(ExpressionInst.terms)