export class Term {
  constructor (variables, constant) {
    this.variables = variables
    this.constant = constant || false
  }

  simplify () {
    console.log('dw')
  }
}
