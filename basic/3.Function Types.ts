/********************************************************************************
*
          function

重點 1. Implicit Any
大部分的情況下，只要定義任何函式，
TypeScript 通常會無條件推論函式內的參數（Parameters）為 any 型別，這種現象我們稱之為 Implicit Any。

重點 2. 函式的推論與註記
分別為輸入參數與輸出部分，大部分情況下，只要我們提供函式參數的註記，輸出就可以間接被 TypeScript 推論出來

*
*********************************************************************************/

let aSimpleFunction = function () {
  console.log('Hi!')
}

// let addition = function (num1, num2) {
//   return num1 + num2;
// };

let addition = function (param1: number, param2: number) {
  return param1 + param2
}
// let shouldBeString: string = addition(123, 456); // => 出錯！

/********************************************************************************
*

TS 函式回傳推論為 any 的情況

重點 3. 函式回傳 any 型別
遇到函式是回傳 any 型別的值，我們必須主動對該值作型別註記（Type Annotation），找回開發 TypeScript 的優勢 —— 也就是 TS 提供的型別系統（Type System）

*
*********************************************************************************/
const aJSONString = '{"Hello": "World", "luckyNumber": 14}'
// TS 不會鳥你的狀況 , 推論出來為 any 
let parsedJSON = JSON.parse(aJSONString)

// 接受 TS 型別系統的擁抱 // 三種告訴 TS 編譯器，我們的變數應該要是什麼型別或長什麼樣子
let parsedJSON1 = JSON.parse(aJSONString) as {
  hello: string
  luckyNumber: number
}
let parsedJSON2 = <{ hello: string; luckyNumber: number }>(
  JSON.parse(aJSONString)
)
let parsedJSON3: { hello: string; luckyNumber: number } = JSON.parse(
  aJSONString
)



/********************************************************************************
*
          函式型別的覆寫
*
*********************************************************************************/
// 原本的 addition 型別為 (number, number) => number
// 因為已經被定義在上方，這邊就不多寫了
// let addition = function (param1: number, param2: number) {
//   return param1 + param2;
// };

// 覆寫 addition：其型別為 (number, number) => number
addition = function (param1: number, param2: number) {
  return param2 + param1 // <- 交換位置而已...
}

// 錯誤地覆寫 addition: 參數型別錯誤！其型別為 (string, string) => string -> 會被 TS 警告！
// addition = function (param1: string, param2: string) {
//   return param1 + param2;
// }

// 錯誤地覆寫 addition: 參數型別錯誤！其型別為 (number, number) => void -> 會被 TS 警告！
// addition = function (param1: number, param2: number) {
//   param1 + param2;
// }


/********************************************************************************
*
          函式不回傳值的狀態：void
*
*********************************************************************************/

// 函式主動回傳 undefined
let doesItWork1 = function doesItWork1 () {
  return undefined
}

// 函式輸出型別註記為 undefined，也回傳 undefined
let doesItWork2 = function doesItWork2 (): undefined {
  return undefined
}

// 函式輸出型別註記為 undefined，但不回傳任何東西 => 只有這個會出錯
// let doesItWork3 = function doesItWork3(): undefined {
// Empty and returns nothing!
// }

// 函式輸出型別註記為 void，但回傳 undefined
let doesItWork4 = function doesItWork4 (): void {
  return undefined
}
