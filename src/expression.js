import {
    isAlpha,
    isNumber
} from "./helper.js"


export class Expression {
    constructor(tokens) {
        this.tokens = tokens;
        this.terms = []
        this.operations = []

        this._genTerms()
    }

    _genTerms() {
        let pos = 0
        let depth = 0

        if(this.tokens[0].type == "OPERATOR") throw new Error("Illegal start of expression: " + this.tokens[0].value)

        while(pos < this.tokens.length) {
            if(isNumber(this.tokens[pos].value)) {
                let tmp = pos
                while(tmp < this.tokens.length && (isNumber(this.tokens[tmp].value) || this.tokens[tmp].value == ".")) tmp++
                tmp--

                if(isAlpha(this.tokens[tmp].value)) {
                    this.terms.push({
                        variable : this.tokens[tmp].value,
                        value : this._buildNumber(pos, tmp)
                    })
                    tmp++
                } else {
                    this.terms.push({
                        depth: depth,
                        variable: 0,
                        value: this._buildNumber(pos, tmp + 1)
                    })
                }
                if(tmp < this.tokens.length) this.operations.push(this.tokens[tmp].value)
                pos = ++tmp
            } else if(isAlpha(this.tokens[pos].value)) {
                this.terms.push({
                    depth: depth,
                    variable : this.tokens[pos].value,
                    value: 1
                })
                pos++
                if(pos < this.tokens.length) this.operations.push(this.tokens[pos].value)
                pos++
            }
            else if(this.tokens[pos].value == "(") {
                depth++
                pos++
            }
            else if(this.tokens[pos].value == ")") {
                depth--
                pos++
            }
            else pos++
        }
    }

    /**
     * Builds the number inbetween two index locations
     * @param {number} start Where to start counting (inclusive)
     * @param {number} end Where to end counting (exclusive)
     */
    _buildNumber(start, end) {
        let num = ""
        for(let i = start; i < end; i++) {
            num += this.tokens[i].value
        }

        return parseInt(num)
    }
}