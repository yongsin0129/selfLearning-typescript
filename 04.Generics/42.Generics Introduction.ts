/********************************************************************************
*
          泛用型別 Generic Types - 基本使用方法

          泛用型別的概念 Concept of Generic Types

1. 泛用型別的意義最主要是將型別化名進行參數化（Parameterize）的動作，使得型別化名擁有更多的彈性與變化性。

          泛用型別化名 Generic Type Alias
          
1. 泛用型別的表現形式不單單只有型別（Type）而已，介面與類別皆可以轉換成泛用型式。

2. 在泛用型別化名的名稱後面接上的 <> 內容就是型別參數（Type Parameter）的宣告。

3. 型別參數可以有複數個，只要在 <> 裡用逗號分隔就可以了。

          泛用函式表現行為 Generic Function Representation

1. 若宣告的函式型別為泛用形式，泛用的型別參數除了可以註記到函式內部的變數外，還可以註記在函式的參數（Parameter）與輸出（Output）上。

*
*********************************************************************************/

// 宣告名為 Identity 的化名；其中，裡面有一個參數化的型別 T
type Identity<T> = T

let shouldBeNumber: Identity<number>

/* -----------------------------    泛用 型別化名 的各種形式 -----------------------------*/
// 宣告一個泛用的 Dictionary 型別化名
type Dictionary<T> = {
  [prop: string]: T
}

// 宣告一個泛用的 LinkedList 和 LinkedListNode 介面
interface LinkedList<T> {
  head: LinkedListNode<T> | null
  length: number
  at(index: number): LinkedListNode<T> | null
}

interface LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
}

// 宣告一個泛用的 TypedArray 類別
class TypedArray<T> {
  constructor (public values: T[]) {}
}

/* -------------------------- 使用上面宣告過的 Dictionary<T> ----------------------------- */
// 正確使用 Dictionary<T>
let correctDict: Dictionary<boolean> = {
  wentToClub: true, // 有沒有上過夜店？
  playedMahjong: true, // 有沒有打過麻將？
  isEvadingMayor: true, // 是不是落跑市長？
  hasPoliticalAcheivement: false // 有沒有政績？
}

// Dictionary<boolean> 會被警告的部分，如果值非 boolean 型別
// let wrongDict: Dictionary<boolean> = {
//   koreaIsFun: true,                // 旅遊韓國愉快？
//   whyIsKoreaFun: 'No mayor evaded' // 為何旅遊韓國愉快？
// };

/* -----------------------------   泛用函式 與 泛用 -----------------------------*/
// 1. 函式型別的泛用型式
type operator<T> = (p1: T, p2: T) => T

// addition 被註記為 operator<number>
// 代表必須符合 (p1: number, p2: number): number 型別
let addition: operator<number> = function (p1: number, p2: number): number {
  return p1 + p2
}

// stringConcatenation 被註記為 operator<string>
// 代表必須符合 (p1: string, p2: string): string 型別
let stringConcatenation: operator<string> = function (  p1: string,  p2: string): string {
    return p1 + p2
}

// 2. 函式本身是泛用的形式
function identityFunc<T> (something: T): T {
  return something
}

/* -----------------------------  多重泛用參數的形式 -----------------------------*/

// TypeConversion 型別化名為將某輸入轉換成不同的輸出型別
// 但必須根據 T 與 U 的型別參數指定到的型別進行轉換
type TypeConversion<T, U> = (input: T) => U

// 檢測數字是否為正數
let isPositive: TypeConversion<number, boolean> = function (input: number) {
  return input > 0
}

// 將任何東西變成 `string` 型別的值
let anythingToString: TypeConversion<any, string> = function (input: any) {
  return input.toString()
}

/* ----------------------------- 內建泛用型別 Built-in Generics ----------------------------- */
// 等效於具有型別的陣列
type MyArray<T> = T[]

// 使用 TypeScript 陣列型別方式表示陣列
let numericArray: number[] = [1, 2, 3]

// number[] 等效於 MyArray<number> or Array<number>
let anotherNumericArray: MyArray<number> = numericArray

// 使用 TypeScript 泛用型別方式表示陣列
let stringArray: MyArray<string> = ['Hello', 'World']

// MyArray<string> 等效於 string[]
let anotherStringArray: string[] = stringArray

/* ----------------------------- 條件型別的應用 Conditional Types ----------------------------- */

// 應用部分官方是稱作 Utility Type - 以下以 Required 為例子
// Utility Types lists : https://www.typescriptlang.org/docs/handbook/utility-types.html

interface PersonalInfo {
  name: string;
  age?: number;
  hasPet?: boolean;
}

// 至少有 name 但不一定需要 age 或 hasPet
let validPersonalInfo: PersonalInfo = {
  name: 'Maxwell',
  hasPet: false,
};

// 多了不相關的一鍵就會被 TypeScript 譙
let wrongPersonalInfo: PersonalInfo = {
  name: 'Maxwell',
  age: 20,
  hasMotorcycle: true,
};

// 但被冠上 Require 條件型別後，TypeScript 就會
// 嚴格要求 age 與 hasPet 必須存在
let incompletePersonalInfo: Required<PersonalInfo> = {
  name: 'Maxwell',
  age: 20,
};
