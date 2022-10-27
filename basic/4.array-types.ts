/********************************************************************************
*
          array type ts 推論測試
*
*********************************************************************************/

// 全部都是數字
let numbers = [1, 2, 3, 4, 5] // number[]

// 全部都是字串
let strings = ['hi', 'how are you', 'goodbye'] // string[]

// 對陣列裡任意值覆寫
numbers[1] = 123 // <- PASS！
numbers[3] = '123'; // Type 'string' is not assignable to type 'number'.

// 對陣列使用方法 TS 也會幫你檢測型別耶！酷的是還會隨機變通哦！
numbers.push(456) // <- PASS！
numbers.push('456'); // Argument of type 'string' is not assignable to parameter of type 'number'.

numbers.concat([789, 987]) // <- PASS！
numbers.concat(['789', '987']); // No overload matches this call. Type 'string' is not assignable to type 'number'.

// 對陣列全部覆寫
//（依據廣義物件完整性第一條，只要覆蓋的值型別不變，你愛怎麼蓋就怎麼蓋，用愛蓋吧！）
numbers = [666, 888, 999] // <- PASS！
numbers = ['三位一體！', '您被聖靈附體！'];  // Type 'string' is not assignable to type 'number'.

/********************************************************************************
*
          array 混合型別的推論
*
*********************************************************************************/
// 數字和字串混合 numbersAndStrings: (string | number)[]
let numbersAndStrings = [
  1,
  '2',
  42,
  666,
  "Devils don't actually like to wear Prada!"
]

// 長得一模一樣格式的物件 objectsArray1: {  message: string }[]

let objectsArray1 = [
  { message: 'Hello' },
  { message: 'Hi' },
  { message: 'Goodbye' }
]

// 某個物件就是故意給你基因突變
// let objectsArray2: ({ message: string, revolt?: boolean })[] = [
//   { message: 'Hello' },
//   { message: 'Hi', revolt: true },
//   { message: 'Goodbye' }
// ];

let objectsArray2: { message: string; revolt?: boolean }[] = [
  { message: 'Hello' },
  { message: 'Hi', revolt: undefined },
  { message: 'Goodbye', revolt: true }
]

// 沒辦法，基因突變的方法實在太多種了，所以也不管，將就測一測吧
let objectsArray3 = [
  { message: 'Hello' },
  { message: 10100101110110 },
  { message: 'Goodbye' }
]

let functionsArray4 = [
  function addition (num1: number, num2: number) {
    return num1 + num2
  },
  function subtraction (num1: number, num2: number) {
    return num1 - num2
  },
  function multiplication (num1: number, num2: number) {
    return num1 * num2
  },
  function division (num1: number, num2: number) {
    return num1 / num2
  }
]

let arraysArray = [
  [1, 2],
  ['Hello', 'World', 'AABAA，叫叫CBA，到底是ABC還是CBA，筆者忘記了'],
  [true, false, true, true, false]
]

// 超變態陷阱題 （Ooooooooowwww~~ 好變態啊~~~）
let miscellaneousArraysArray = [
  [1, 2, 3],
  ['Hello', 'World'],
  [true, false, 123, null],
  ['String', undefined]
]

let emptyArray = []

let canBeEitherNullOrNumbers: (number | null)[] = [1, 2, 4]
canBeEitherNullOrNumbers.splice(2, 0, null) // <- TS 准許你通過

/********************************************************************************
*
重點 1. 陣列的型別推論

若集合 S 為陣列裡所有元素各種型別的集合，大部分的情形下，該陣列被 TypeScript 型別推論的結果是：

(集合 S 裡所有型別 `union` 的結果)[]



重點 2. 陣列的型別推論與註記時機

1.大部分的狀態下，陣列型別的推論是符合開發者期待的

2.除非遇到以下狀況，才需要對儲存陣列型別的變數積極地作型別註記：
  空陣列值必須積極註記，這是為了要革除 any 可能帶來的禍害
  陣列裡的元素沒有你要求的型別，可以用 union 技巧作積極的型別註記

3.為了程式碼的可讀性，通常一個陣列擁有多個型別的話（也就是 Heterogenous Type Array），建議還是用 union 註記一下，不然要在陣列裡面用人眼遍歷過陣列的每一個值對應的每個型別 —— 跟直接註記比起來：型別註記是比較恰當的選擇喔

*
*********************************************************************************/