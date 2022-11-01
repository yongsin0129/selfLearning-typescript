/********************************************************************************
*
          never 型別的意義
never 型別的概念是程序在函式或方法執行時：

無法跳脫出該函式或方法
出現例外結果中斷執行
*
*********************************************************************************/


/********************************************************************************
*
          例子1  ts推論回傳值為 never
*
*********************************************************************************/
let executesForever = function forever () {
  while (true) {
    /* Stuck in here forever... */
  }
}


/********************************************************************************
*
          例子2  ts推論回傳值為 void
*
*********************************************************************************/
const randomNumber = Math.random() * 10

let probablyExecutesForever = function (num: number) {
  while (num > 5) {
    /* Probably stuck in here forever... */
  }
}
/********************************************************************************
*
          以下三種 ts 都推論為 void

          反正不管怎樣回傳就是 void 就對了，TypeScript 感覺好像不想理人

          原因 : official document 
          never is a subtype of and assignable to every type.
          
          never 型別為所有型別的 Subtype
*
*********************************************************************************/
// Maybe 'never' or 'void' case
probablyExecutesForever(randomNumber)

// Definite 'never' case
probablyExecutesForever(6)

// Definite 'void' case
probablyExecutesForever(4)

/********************************************************************************
*
          因為 never 是一個 subtype 所以有以下現象


          註記 return 為 number or never 可以顯示 never
          用 or 或是 and 有 type 會被 merge
*
*********************************************************************************/
let probablyThrowsError2 = function (num: number): number | never {
  if (num <= 0) {
    throw new Error('Not a positve number, go to hell!')
  }
  return num;
}

type EitherNumberOrNever = number | never // 滑鼠移過去，發現 ts 推論為 number
type MustBeNever = number & never // 滑鼠移過去，發現 ts 推論為 never


/********************************************************************************
*
          進階測試 never 

          雖然以下 function 有可能 never , 但不註記，只使用　number 就可以包含 never 的情況
*
*********************************************************************************/
// 例子一　回傳有可能 number or never
let probablyThrowsError = function (num: number) {
  if (num <= 0) {
    throw new Error('Not a positve number, go to hell!')
  }
  return num
}

let acceptsNever: number = probablyThrowsError(-5)


// 例子二 回傳只有可能是 never
let mustThrowError = function () {
  throw new Error('Throw new error!')
}

let mustAcceptsNever: never = mustThrowError()

let canAlsoAcceptNever: number = mustThrowError()


let wontThrowError = function () {
  return 42
}

// 例子三 會出現錯誤！ number 可以包含 never , 但 never 不能包含 number
mustAcceptsNever = wontThrowError();


// 例子四　若是被註記為 never 型態，則函式一定要符合不能有結束執行的結果 , 需要把 if 拿掉才不會報錯
function possibleNotToThrowError(): never {
  const possibility = Math.random();
  if (possibility > 0.5) {
    throw new Error('Error Thrown');
  }
}


/********************************************************************************
*
函式型別回傳值的推論與註記

1.如果函式可以被完整的執行完畢，
則 TypeScript 會根據 return 表達式 ( 回傳的值之型別 ) 或者是 ( 函式回不回傳值 ) 來作為根據進行型別推論

2.如果函式 100% 確定不能執行到結束的點，則 TypeScript 會無條件將該函式的回傳值之型別視為 never

3.如果函式被積極註記為 never 型別，則開發者必須確保該函式的實作 100% 不會有任何結束的執行點
*
*********************************************************************************/