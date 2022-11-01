/********************************************************************************
*
          Indexable Types

          [keyName: TKey]: TValue 

TKey 必須為 number 或者是 string 其中一種，不能為其他型別與 number 和 string 的複合格式
（連 number | string 是不接受的！）

TValue 可為任意型別
*
*********************************************************************************/
// 定義一種物件型別 Dictionary，其中，它的鍵值對都是字串型態
type Dictionary = {
  [propName: string]: string
}

// 定義類似陣列的型別，其裡面儲存的值為字串
interface StringTypedList {
  [index: number]: string
}

// Dictionary 範例
// 正常使用方式
let normalDictionary: Dictionary = {
  hello: 'world',
  thisFeature: 'is crazy'
}

// 空的狹義物件狀態也行
let emptyDictionary: Dictionary = {}

// 錯誤的使用方式
let wrongDictionary: Dictionary = {
  hello: 123,
  thisFeature: true,
  withFunction () {
    console.log('Wrong type!')
  },
  nestedDictionary: { hello: 123 }
}

// StringTypedList 範例
// 正常使用方式
let stringTypedArray: StringTypedList = {
  123: 'Hello',
  [456]: 'Hi'
}

// 空的狹義物件狀態也行
let emptyStringTypedArray: StringTypedList = {}

// 但不可以直接變成 Array
let stringTypedArrayLiteral: StringTypedList = [1, 2, 3]

// 但卻可以為空的 Array
let emptyStringTypedArray2: StringTypedList = []

// 可以用數字進行索引
stringTypedArray[0]
stringTypedArray[1]

// 錯誤使用方式
let wrongStringTypedArray: StringTypedList = {
  message: 'Hello',
  thisFeature: true
}

// 也當然不能被字串索引
stringTypedArray['hello']

// 當然更不可能用點來呼叫屬性，因為會被當成字串
stringTypedArray.hello

/********************************************************************************
*
          選用屬性 Optional Properties
*
*********************************************************************************/

type TAccountUser = {
  email: string
  password: string
  name?: string
  age?: number
}

interface IAccountUser {
  email: string
  password: string
  name?: string
  age?: number
}

/********************************************************************************
*
          唯讀屬性  readonly

*
*********************************************************************************/
type TAccountUserWithReadonlyProperty = {
  readonly email: string
  readonly password: string
  name?: string
  age?: number
}

interface IAccountUserWithReadonlyProperty {
  readonly email: string
  readonly password: string
  name?: string
  age?: number
}

let sampleAccount: TAccountUserWithReadonlyProperty = {
  email: 'maxwell@example.com',
  password: '<hashed-password>',
  name: 'Maxwell'
}

// 可以讀取
sampleAccount.email

// 但不能寫入 => 強行寫入就被 TS 警告
sampleAccount.email = 'new@example.com'

/********************************************************************************
*
          混合型介面 Hybrid Type Interface
          指介面的宣告方式可以用混合的方式呈現

          以下舉計數器 Counter 的介面為範例

          註 : 本文作者不推薦使用混合 ，可以試試 counter 內沒有實作 increment() 也不錯報錯
          “你可以使用介面的混合型態，不過使用起來可能會遇到這種問題 —— 忘記實踐出混合型態介面裡的屬性與方法”
*
*********************************************************************************/

interface Counter {
  // 純函式格式
  (start: number): void

  // 狹義物件的格式
  increment(): number
  reset(): void
  value: number
}

function createCounter (): Counter {
  let value: number
  let initializedNumber: number

  // 實踐純函式的部分
  const counter: Counter = function (startNumber: number) {
    initializedNumber = startNumber
    value = startNumber
  } as Counter

  // 實踐狹義物件格式的部分
  counter.increment = function () {
    value++
    return value
  }

  counter.reset = function () {
    value = initializedNumber
  }

  Object.defineProperty(counter, 'value', {
    get () {
      return value
    }
  })

  return counter
}

// 建立一個 counter 物件
const counter: Counter = createCounter()

// 藉由 Counter 介面裡面中，純函式型別裡的格式：
// (start: number): void
// 我們可以填入數字
counter(5) // <- 初始化值為 5

// 呼叫 Counter 介面裡的 value 屬性
console.log(counter.value) // 應該要得出 5

// 呼叫 3 次 Counter 介面裡的 increment 方法
counter.increment()
counter.increment()
counter.increment()

// 再呼叫一次 Counter 介面裡的 value 屬性
console.log(counter.value) // 應該要得出 8

// 呼叫 Counter 介面裡的 reset 方法
counter.reset()

// 再呼叫一次 Counter 介面裡的 value 屬性
console.log(counter.value) // 應該要得出 5，也就是原本的初始值
