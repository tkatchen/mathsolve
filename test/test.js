import { Lexer } from '../src/lexer.js'
import { Expression } from '../src/DataTypes/Expression.js'

let input = 'sin(cos(32)) ^ (x + 1)'
const LexerInst = new Lexer()
LexerInst.init(input)
console.log("Input: " + input)
console.log(LexerInst.tokens)
