import {
  isAlpha,
  isNumber
} from './helper.js'

import {
  Constants
} from './Constants/ProgramConstants.js'

export class Lexer {
  constructor () {
    /**
         * The input passed to the lexer
         * @type {string}
         */
    this.input = ''

    /**
         * The current location of the lexer
         * @type {number}
         */
    this.pos = 0

    /**
         * An array with all of the toxens
         * @type {Array}
         */
    this.tokens = []
  }

  /**
     * Initializes new information into the lexer
     * @param {string} input
     */
  init (input) {
    this.input = input
    this.pos = 0
    this.counter = 0
    this.tokens = []

    while(this.pos <= this.input.length) { this._parseToken() }
  }

  _parseToken () {
    for(let i = 5; i >= 1; i--) {
      if(this._viewFuture(i)) return
    }

    this.pos++
  }

  _viewFuture(dist) {
    if(!this.input[this.pos + dist - 1]) return false
    let substr = this.input.slice(this.pos, this.pos + dist)

    let type;
    if (Constants.OPERATIONS.includes(substr)) type = 'OPERATOR'
    else if(Constants.FUNCTIONS.includes(substr)) type = 'FUNCTION'
    else if (Constants.L_PAREN === substr) type = 'L_PAREN'
    else if (Constants.R_PAREN === substr) type = 'R_PAREN'
    else if (Constants.EQUALS === substr) type = 'EQUALS'
    else if (isAlpha(substr)) type = 'VARIABLE'
    else if (isNumber(substr)) type = 'NUMBER'
    else if (Constants.DECIMAL === substr) type = 'DECIMAL'
    else return false

    this.tokens.push({
      value: substr,
      type: type,
      position: this.counter
    })

    this.pos += dist
    this.counter++
    return true
  }
}
