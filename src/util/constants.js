export const constantsObject = {
    // Numeric Constants 
    pi: Math.PI,
    e: Math.E,

    // Numeric Functions
    ln: x => Math.log(x),
    log: x => Math.log10(x),

    // Trig Functions
    sin: x => Math.sin(x),
    cos: x => Math.cos(x),
    tan: x => Math.tan(x),
    csc: x => Math.csc(x),
    sec: x => Math.sec(x),
    cot: x => Math.cot(x),
    arcsin: x => Math.asin(x),
    arccos: x => Math.acos(x),
    arctan: x => Math.atan(x),
    sinh: x => Math.sinh(x),
    cosh: x => Math.cosh(x),
    tanh: x => Math.tanh(x),
}

export const constants = Object.keys(constantsObject)

export const operators = [
    '+',
    '-',
    '*',
    '/'
]