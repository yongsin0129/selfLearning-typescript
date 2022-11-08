/* -----------------------------  基礎泛用型別註記 -----------------------------  */
// 泛用型別之參數有被指定的情形
let numbersArr: Array<number> = [1, 2, 3]

// 泛用型別之參數沒有被指定的情形 => 出錯！
// let unspecifiedTypeParamArr: Array = [1, 2, 3];

/* 預設型別 */
type DefaultStringDictionary<T = string> = {
  [prop: string]: T
}

// 預設鍵值對的值之型別為 string
let stringDict: DefaultStringDictionary = {
  message: 'Hello world',
  language: 'TypeScript'
}

// 覆寫鍵值對的值之型別為 boolean
let booleanDict: DefaultStringDictionary<boolean> = {
  hasPet: false,
  hasMotorcycle: true
}

/* -----------------------------  泛用化名之型別參數限制 -----------------------------  */
/********************************************************************************
*
    某泛用型別化名 GT 之型別參數 Tparam 被限制在某型別 Tcontraint 範圍之下，可以使用 extends 關鍵字，其格式為：
*
*********************************************************************************/
// 宣告 Primitives 為所有原始型別的 union
type Primitives = number | string | boolean | null | undefined

// 宣告 PrimitiveArray 為泛用型別，但是 T 被限制為 Primitives 的範疇
type PrimitiveArray<T extends Primitives> = Array<T>

// 1. 單純原始型別陣列
let numberPrimitiveArr: PrimitiveArray<number> = [1, 2, 3]

let stringPrimitiveArr: PrimitiveArray<string> = ['Hello', 'World']

// 2. 原始型別複合的陣列 => 照樣符合原始型別 union 的範疇
let numberOrStringPrimitiveArr: PrimitiveArray<number | string> = [1, '2', 3]

// 3. 物件型別的陣列 => 非原始型別，會被 TypeScript 警吿
interface PersonalInfo {
  name: string
  ageA: number
  hasPetB: boolean
}

let invalidObjectArray:
  PrimitiveArray<PersonalInfo> = [
    {
      name: 'Maxwell',
      ageA: 20,
      hasPetB: false
    },
    {
      name: 'Martin',
      ageA: 28,
      hasPetB: true
    }
  ];

/* ----------------------------- 使用條件型別寫法 ----------------------------- */
type TypedPrimitiveArray<T extends Primitives> = 
T extends number ? T[]  :
T extends string ? T[]  :
T extends boolean ? T[] :
T extends null  ? T[]   :
T extends undefined ? T[]: never

// 合理的使用行為：
let onlyNumberArr: TypedPrimitiveArray<number> = [1, 2, 3]

let onlyStringArr: TypedPrimitiveArray<string> = ['Hello', 'World']

// 違反的使用行為：
let invalidPrimitiveUnionedArr:TypedPrimitiveArray<number | string> = [1, '2', 3]


/* ----------------------------- 泛用函式 -----------------------------*/

// 宣告一個名為 traverseElements 的泛用函式
function traverseElements<T> (
  values: Array<T>,
  callback: (el: T, index: number) => void
) {
  for (let i = 0; i < values.length; i += 1) {
    callback(values[i], i)
  }
}

// 宣告一個數字陣列型別符合 Array<number>
let numberArrayInput = [2, 3, 5, 7, 11]

// 一個函式負責將數字陣列裡的值印出
let traverseCallback = function (el: number, index: number) {
  console.log(`Index ${index} - Value ${el}`)
}

// 使用 traverseElements<number>
traverseElements<number>(numberArrayInput, traverseCallback)

// 合併簡化結果：
traverseElements<number>([2, 3, 5, 7, 11] as Array<number>, function (
  el: number,
  index: number
) {
  console.log(`Index ${index} - Value ${el}`)
})

// 最終簡化結果：
traverseElements<number>([2, 3, 5, 7, 11], function (el, index) {
  console.log(`Index ${index} - Value ${el}`)
})
