/********************************************************************************
*
          Union  (or)

*
*********************************************************************************/
type UnionSet1 = number | string

type UserInfo1 = {
  name: string
  age: number
}

type UserInfo2 = {
  hasPet: boolean
  ownsMotorcycle: boolean
}

type UnionSet2 = UserInfo1 | UserInfo2

// 按照數學推理理應只有三種組合：
// 1. 只有 UserInfo1
let maxwellOnlyInfo1: UnionSet2 = {
  name: 'Maxwell',
  age: 20
}

// 2. 只有 UserInfo2
let maxwellOnlyInfo2: UnionSet2 = {
  hasPet: false,
  ownsMotorcycle: true
}

// 3. 都有
let maxwellOnlyInfo3: UnionSet2 = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
  ownsMotorcycle: true
}

// 理應要錯誤的組合：
// 1. UserInfo1 和 UserInfo2 皆缺屬性：保證錯！
let maxwellWithPartialInfo1: UnionSet2 = {
  name: 'Maxwell',
  // age: 20, <-- 缺這個屬性
  // hasPet: false, <-- 缺這個屬性
  ownsMotorcycle: true
};

// 2. UserInfo1 滿足但 UserInfo2 有缺屬性
let maxwellWithPartialInfo2: UnionSet2 = {
  name: 'Maxwell',
  age: 20,
  // hasPet: false, <-- 缺這個屬性
  ownsMotorcycle: true
}

// 3. UserInfo2 滿足但 UserInfo1 有缺屬性
let maxwellWithPartialInfo3: UnionSet2 = {
  // name: 'Maxwell', <-- 缺這個屬性
  age: 20,
  hasPet: false,
  ownsMotorcycle: true
}

// 空集合一定錯
let maxwellWithNoInfo: UnionSet2 = {};

/********************************************************************************
*
          Intersection  (and)

*
*********************************************************************************/
type IntersectionSet = UserInfo1 & UserInfo2

// 正確格式，所有屬性必須都出現
let correctInfo: IntersectionSet = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
  ownsMotorcycle: true
}

// // 錯誤格式，屬性缺一不可
let wrongInfo1: IntersectionSet = {
  // name: 'Maxwell', <-- 少一個 UserInfo1 屬性
  age: 20,
  hasPet: false,
  ownsMotorcycle: true
};

let wrongInfo2: IntersectionSet = {
  name: 'Maxwell',
  age: 20,
  hasPet: false,
  // ownsMotorcycle: true  <-- 少一個 UserInfo2 屬性
};


/* 原始型別複合 */
type PrimitiveIntersection = number & string // 推論出來為 never

/* 思考一下：廣義物件與原始型別複合 */
type PrimitiveIntersectObject = number & { hello: string } // TS 推不出來 XD

/********************************************************************************
*
          Type Guard 遇到物件型別的狀況

*
*********************************************************************************/

// 例如：想要寫一個簡單的總和函式介面
interface ISummation {
  (...args: number[]): number
  (arr: number[]): number
}

// 實做以上介面
let F: ISummation = function (p1: number | number[], ...args: number[]) {
  if (
    // Type Guard 實踐：確保 p1 是數字，arr 是數字型陣列
    typeof p1 === 'number' &&
    args instanceof Array
  ) {
    // ...
    // 將 p1 與 arr 裡面的值加總起來
    return args.reduce((acc, cur) => acc + cur, p1)
  } else if (
    // Type Guard 實踐：確保 p1 是陣列
    p1 instanceof Array
  ) {
    // 因為 p1 被認為是陣列，因此加總起來
    return p1.reduce((acc, cur) => acc + cur, 0)
  }

  // 滿足 `never` 的 Case
  throw new Error(`Something is wrong with your input`)
}

// function 測試

// 使用 (...args: number[]): number 的方式：
F(1, 2, 3, 4, 5)
// 結果是 1 + 2 + 3 + 4 + 5 = 15

// 使用 (arr: number[]): number 的方式：
F([1, 2, 3, 4, 5])
// 結果也是 1 + 2 + 3 + 4 + 5 = 15

// 驗證：(...args: number): number
console.log(F(1, 2, 3, 4, 5))

// 驗證：(arr: number[]): number
console.log(F([1, 2, 3, 4, 5]))

// 裡面摻雜亂源會被發現錯誤
F(1, 2, '3', 4, 5);

// 陣列型別也是，裡面摻雜亂源會被發現錯誤
F([1, 2, '3', 4, 5]);

/********************************************************************************
*

限縮型別的技巧 - 型別檢測 Type Guard

1.若想要過濾出純原始型別的值的話，使用 typeof 操作子
2.若想要過濾出廣義物件型別的值的話，使用 instanceof 判斷操作子，並填上屬於該物件型別所屬的類別
3.其他方式，譬如 Array.isArray 可以檢測陣列
*
*********************************************************************************/