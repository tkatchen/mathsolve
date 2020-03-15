import {
    isAlpha,
    isNumber
} from "./helper.js"

export class Lexer {
    constructor() {
        this.OPERATIONS = [
            "+",
            "-",
            "*",
            "/",
            "^"
        ]

        this.L_PAREN = "("
        this.R_PAREN = ")"
        this.EQUALS = "="
        this.DECIMAL = "."

        /**
         * The input passed to the lexer
         * @type {string}
         */
        this.input

        /**
         * The current location of the lexer
         * @type {number}
         */
        this.pos

        /**
         * An array with all of the toxens
         * @type {Array}
         */
        this.tokens
    }
    
    /**
     * Initializes new information into the lexer
     * @param {string} input 
     */
    init(input) {
        this.input = input
        this.pos = 0
        this.tokens = []

        for(let i = 0; i < this.input.length; i++)
            this._parseToken(i)
    }

    _parseToken(loc) {
        let token = this.input[loc]
        let type
        
        if(this.OPERATIONS.includes(token)) type = "OPERATOR"
        else if(this.L_PAREN == token)      type = "L_PAREN"
        else if(this.R_PAREN == token)      type = "R_PAREN"
        else if(this.EQUALS == token)       type = "EQUALS"
        else if(isAlpha(token))             type = "VARIABLE"
        else if(isNumber(token))            type = "NUMBER"
        else if(this.DECIMAL == token)      type = "DECIMAL"
        else return;

        this.tokens.push({
            value: token,
            type: type,
            position: this.pos
        })

        this.pos++
    }
}