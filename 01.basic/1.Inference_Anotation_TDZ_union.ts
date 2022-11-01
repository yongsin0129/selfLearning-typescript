/********************************************************************************
*
          TS 賦值的時候會自動做 Type Inference
*
*********************************************************************************/
let myName = 'Maxwell'
let age = 20
let hasPet = false
let nothing = undefined
let nothingLiterally = null

// 我們先定義好我們的變數，但是不要去帶入任何值就會變成 any
let messageToSend // type : any
// 帶入我們想要寫的值
messageToSend = 'Cat is afraid of cucumbers...'
messageToSend = 1011011011100100011111010110

let absoluteNothing: undefined = undefined
let literallyAbsoluteNothing: null = null
// 以下這兩行會出現警告！
// absoluteNothing = 123 // Type '123' is not assignable to type 'undefined'.ts(2322)
// literallyAbsoluteNothing = "I can't live in this variable now..." // Type '"I can't live in this variable now..."' is not assignable to type 'null'.ts(2322)


/********************************************************************************
*
          Temporal Dead Zone，暫時性死區
          在理解 TDZ 時，必須了解 JS 的變數作用域以及變數提升的概念
*
*********************************************************************************/
let canBeNullableString: string
// TDZ 暫時性死區的錯誤！
// let myString = canBeNullableString // Variable 'canBeNullableString' is used before being assigned.ts(2454)

canBeNullableString = 'hello'
// canBeNullableString = undefined // Type 'undefined' is not assignable to type 'string'.ts(2322)
// canBeNullableString = null // Type 'null' is not assignable to type 'string'.ts(2322)


/********************************************************************************
*
          union
*
*********************************************************************************/
let absolutelyEitherNullOrString: string | null = null

absolutelyEitherNullOrString = 'Assigned with string...'
absolutelyEitherNullOrString = null
absolutelyEitherNullOrString = 'Assigned with string, again...'
