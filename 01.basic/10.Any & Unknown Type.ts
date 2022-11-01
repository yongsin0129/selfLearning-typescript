/********************************************************************************
*
          any unknown 註記與指派測試

*
*********************************************************************************/

let anyType: any
let unknownType: unknown

anyType = 123
anyType = 'Any string'
anyType = true
anyType = null
anyType = undefined
anyType = { hello: 'world' }
anyType = [1, true, null, 'Any string in array']
anyType = function () {
  console.log('Hello!')
}
anyType = new Object()

unknownType = 123
unknownType = 'Unknown string'
unknownType = true
unknownType = null
unknownType = undefined
unknownType = { hello: 'world' }
unknownType = [1, true, null, 'Unknown string in array']
unknownType = function () {
  console.log('Hello!')
}
unknownType = new Object()

/********************************************************************************
*
          由以上測試得知　：　
          
          unknown 與 any 的共通點是：只要當變數被註記為 any 或 unknown，該變數照樣都可以接收任意型別的值

          不同點　看以下測試

          unknown 型別的值不能被強行指派到 —— 除了 any 或 unknown 型別外 —— 的任意型別變數
*
*********************************************************************************/

let isAny: any
let isUnknown: unknown

let isNumber: number
let isString: string
let isBoolean: boolean
let isNull: null
let isUndefined: undefined
let isAKindOfObjectLiteral: { name: string; age: number }
let isAKindOfArray: number[]
let isAKindOfFunction: () => void
let isAKindOfObject: Object

// 任何型別的變數都可以被 `any` 型別所指派
isNumber = isAny
isString = isAny
isBoolean = isAny
isNull = isAny
isUndefined = isAny
isAKindOfObjectLiteral = isAny
isAKindOfArray = isAny
isAKindOfFunction = isAny
isAKindOfObject = isAny
isAny = isAny
isUnknown = isAny

// 除了 `unknown` 本身以及 `any` 型別外，
// 其他型別的變數都不能被 `unknown` 所指派
// isNumber               = isUnknown; // <- 出錯！
// isString               = isUnknown; // <- 出錯！
// isBoolean              = isUnknown; // <- 出錯！
// isNull                 = isUnknown; // <- 出錯！
// isUndefined            = isUnknown; // <- 出錯！
// isAKindOfObjectLiteral = isUnknown; // <- 出錯！
// isAKindOfArray         = isUnknown; // <- 出錯！
// isAKindOfFunction      = isUnknown; // <- 出錯！
// isAKindOfObject        = isUnknown; // <- 出錯！
isAny = isUnknown
isUnknown = isUnknown

/********************************************************************************
*
any 出現的時機
1.遲滯性指派 Delayed Iniitialization：變數定義時，除了未加註記（Type Annotation）外，也沒有指派值或者被指派為 Nullable Types。
2.一般宣告下的函式參數：一般被宣告的函式，其參數通常會直接被推論為 any，又被稱作 Implicit any 的情形。此狀況是少數會被 TypeScript 主動通報的
3.函式回傳之值：有些實務上，型別無法確定，因此到最後只能將回傳值預設為 any（如：JSON.parse）
4.未註記之空陣列：沒有積極型別註記到的空陣列，其預設推論為 any[] 
5.跟 I/O 行為有關：例如，從外部 CSV 檔案讀取表格行格式（通常用陣列或元組型別），若沒有特殊註記的話，通常會用 any 作表示（這可能是讀者少數會主動用 any 的狀況）

根據以上, unknown 的使用時機:

無法預測的 I/O 行為。開發者可以開發比較不安全版本的讀取 CSV 檔案的函式，也就是回傳 any 型別的格式。

然而，開發者也可以開發安全版本的讀取 CSV 檔案的函式，其回傳的型別為 unknown —— 代表只要任何開發者使用這個安全版本的函式回傳之值，使用者必須強行註記該 CSV 回傳值之格式。就算開發者忘記要註記結果，也會被 TypeScript 主動警告。

另一個直截了當可以馬上使用 unknown 的時機，就是寫一個安全的函式（或方法）把不安全的函式（或方法）包裝起來。比如說，把 JSON.parse 這種會回傳 any 的方法函式包裝起來
*
*********************************************************************************/

/********************************************************************************
*
          
  Control-Flow Based Narrowing 

  unknown 的註記法　與　使用上比 any 安全的用法
*
*********************************************************************************/

// 直接指派一定會錯誤
// isNumber = isUnknown;

// 經過所謂的 Type Guard 縮小型別推論的範疇就有可能
// 可以直接將 unknown 型別的值指派到相對應的型別
if (typeof isUnknown === 'number') {
  isNumber = isUnknown
}

/* 顯性的型別註記 */

// 直接跟 TypeScript 說，isUnknown 是字串
isString = <string>isUnknown

// 用 as 關鍵字，直接跟 TypeScript 說，isUnknown 是
// 數字型別的陣列
isAKindOfArray = isUnknown as number[]

/* any 可以做任何事；unknown 則被鎖住 */
// 前面有被定義過，因此被註解
// let isAny: any;
// let isUnknown: unknown;

isAny.KnockKnock
isUnknown.Hello // <-- 保證出錯

isAny.greets('He..He..He-Hey~~~~ Charr~r~r~rlieee~e~e~e~~~')
isUnknown.response('N-N-N-No No No No No~~~ Get outta my way!!!') // <-- 保證出錯

let unknownObj: unknown = {
  Hello: 'Charlie the Unicorn',
  response: function (content: string) {
    console.log(content)
  }
}

type Unicorn = {
  Hello: string
  response: (content: string) => void
}

/* 顯性註記方式去使用 unknown 型別之變數 */
// 無註記會被 TS 警告
unknownObj.Hello
unknownObj.response('No more candy mountain!')

// 顯性註記過後就變安全了
;(<Unicorn>unknownObj).Hello
;(unknownObj as Unicorn).response('No more candy mountain!')

/* 控制流程分析後限縮 unknown 型別到某特定型別 */
// 型別未確切認定下會被 TS 翻白眼

let unknownPrimitive: unknown = '123456789'
parseInt(unknownPrimitive, 10)

// 運用控制流程分析限縮型別變安全
if (typeof unknownPrimitive === 'string') {
  parseInt(unknownPrimitive, 10)
}

/* 利用 unknown 建造安全版本的 JSON.parse */
function safelyParseJSON (jsonString: string): unknown {
  return JSON.parse(jsonString)
}

let randomJSONString = `{
  "message": "Hello World",
  "unknownTypeIsAwesome": true
}`

type JSONType = {
  message: "Hello World",
  unknownTypeIsAwesome: true
}

// 原本的 JSON.parse
let parsedFromNormalJSONParse = JSON.parse(randomJSONString)
parsedFromNormalJSONParse.message

// 使用 Safe-Counterpart JSON.parse
let parsedFromSafeJSONParse = safelyParseJSON(randomJSONString)
parsedFromSafeJSONParse.message // <- 出錯！
;(parsedFromSafeJSONParse as JSONType).message // 不出錯

// let parsedFromSafeJSONParse = safelyParseJSON(randomJSONString) as JSONType
// parsedFromSafeJSONParse.message // <- parsedFromSafeJSONParse 會被ts認定為 JSONType 不會出錯！


/********************************************************************************
*
// In an intersection everything absorbs unknown
          
*
*********************************************************************************/

type TSDoc00 = unknown & null // null
type TSDoc01 = unknown & undefined // undefined
type TSDoc02 = unknown & null & undefined // null & undefined (which becomes never)
type TSDoc03 = unknown & string // string
type TSDoc04 = unknown & string[] // string[]
type TSDoc05 = unknown & unknown // unknown
type TSDoc06 = unknown & any // any

// In a union an unknown absorbs everything
type TSDoc10 = unknown | null // unknown
type TSDoc11 = unknown | undefined // unknown
type TSDoc12 = unknown | null | undefined // unknown
type TSDoc13 = unknown | string // unknown
type TSDoc14 = unknown | string[] // unknown
type TSDoc15 = unknown | unknown // unknown
type TSDoc16 = unknown | any // any
