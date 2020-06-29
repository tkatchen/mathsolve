/*
    Code adapted from:
    https://eli.thegreenplace.net/2013/07/16/hand-written-lexer-in-javascript-compared-to-the-regex-based-ones
    and:
    https://github.com/nicolewhite/algebra.js/blob/master/src/lexer.js
*/

export const Lexer = class Lexer {
    constructor(expression) {
        this.pos = 0
        this.buffer = expression
        this.bufferLength = expression.length
        this.operators = {
            "+" : "PLUS",
            "-" : "MINUS",
            "*" : "MULTIPLY",
            "/" : "DIVIDE",
            "*" : "POWER",
            "(" : "L_PAREN",
            ")" : "R_PAREN",
            "=" : "EQUALS"
        }
        this.tokens = this.getTokens()
    }

    getTokens() {
        let result = []
        while(this.pos < this.bufferLength) {
            result.push(this.token())
        }

        return result
    }

    token() {
        this._skipNonTokens()
        if(this.pos >= this.bufferLength) {
            return null
        }

        let char = this.buffer.charAt(this.pos)

        let operator = this.operators[char]
        if(operator) {
            if(operator === "L_PAREN" || operator === "R_PAREN") {
                return {name: "PAREN", value: operator, pos: this.pos++}
            } else {
                return {name: "OPERATOR", value: operator, pos: this.pos++}
            }
        } else {
            if(this._isAlpha(char)) {
                return this._processIdentifier()
            } else if(this._isDigit(char)) {
                return this._processNumber()
            } else {
                throw new SyntaxError(`Error at character ${char} at position ${this.pos}`)
            }
        }
    }

    _isNewLine(char) {
        return char === "\r" || char === "\n";
    }

    _isDigit(char) {
        return char >= "0" && char <= "9"
    }

    _isAlpha(char) {
        return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z")
    }

    _isAlphaNum(char) {
        return this._isAlpha(char) || this._isDigit(char)
    }

    _processNumber() {
        let endpos = this.pos + 1
        while(endpos < this.bufferLength && this._isDigit(this.buffer.charAt(endpos)) && this.buffer.charAt(endpos) !== ".") {
            endpos++
        }

        if(this.buffer.charAt(endpos-1) === "."){
            throw new SyntaxError(`Trailing decimal point without numbers to follow at position ${endpos - 1}`)
        }

        let token = {
            name: "NUMBER",
            value: this.buffer.substring(this.pos, endpos),
            pos: this.pos
        }

        this.pos = endpos
        return token
    }

    _processIdentifier() {
        let endpos = this.pos + 1
        while(endpos < this.bufferLength && this._isAlphaNum(this.buffer.charAt(endpos))) {
            endpos++
        }

        let token = {
            name: "IDENTIFIER",
            value: this.buffer.substring(this.pos, endpos),
            pos: this.pos
        }

        this.pos = endpos
        return token
    }

    _skipNonTokens() {
        while(this.pos < this.bufferLength) {
            let char = this.buffer.charAt(this.pos)
            if(char === " " || char === "\t" || char === "\r" || char === "\n") {
                this.pos++
            } else {
                break
            }
        }
    }
}