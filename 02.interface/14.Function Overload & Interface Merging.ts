/********************************************************************************
*
          function overload

example : C++ 名字相同，但參數及回傳型別不同

int areaOfRect(int size) {
  return size * size;
}
int areaOfRect(int edge1, int edge2) {
  return edge1 * edge2;
}
float areaOfRect(float size) {
  return size * size;
}

// 符合第一種： int areaOfRect(int size)
areaOfRect(5)

// 符合第二種： int areaOfRect(int edge1, int edge2)
areaOfRect(5, 10)

// 符合第三種： float areaOfRect(float size)
areaOfRect(2.5)
*
*********************************************************************************/

/* 在 JS 中函式超載當然不可能直接動作  會報錯*/

function addition (p1: number, p2: number) {
  return p1 + p2 // 如果是數字則直接套入加法
}

function addition (p1: string, p2: string) {
  return parseInt(p1, 10) + parseInt(p2, 10) // // 如果是字串則轉換成數字
}

/* 介面的屬性對應的函式型別可以被超載喔！ */
interface AddOperation {
  addition(p1: number, p2: number): number // 回傳 type 也可以寫 number | undefined
  addition(p1: string, p2: string): number // 回傳 type 也可以寫 number | undefined ，就不需要 例外處理
}

const implementAddition: AddOperation = {
  addition (p1: number | string, p2: number | string) {
    // 因為有 overload , 參數需用 union
    if (typeof p1 === 'number' && typeof p2 === 'number') {
      return p1 + p2
    } else if (typeof p1 === 'string' && typeof p2 === 'string') {
      return parseInt(p1, 10) + parseInt(p2, 10)
    }

    throw new Error(`
      Parameter \`p1\` and \`p2\` should only accept both \`number\`
      type or \`string\` type.
    `)
  }
}
// number 本身就包含 never , 所以用 throw 做例外處理 ，此回傳值為 never
// 補充 : never 型別的概念是程序在函式或方法執行時： 1.無法跳脫出該函式或方法 2.出現例外結果中斷執行

/* 其他案例 */
// 1. 參數與回傳型別一模一樣
interface AddOperation1 {
  add(p1: number, p2: number): number
  add(p1: number, p2: number): number
}

// 2. 回傳型別不同但是參數相同
interface AddOperation2 {
  add(p1: number, p2: number): number
  add(p1: number, p2: number): string
}

// 3. 參數數量不同
interface AddOperation2 {
  add(p1: number): number
  add(p1: number, p2: number): number
}

/********************************************************************************
*
          結論整理: 介面的函式（或方法）超載
1.介面定義的屬性對應的函式可以進行超載的動作。

2.被超載的函式名稱必須相同。（型別格式也可以相同，但沒有意義，就很像多出來冗贅的程式碼）

3.單純函式形式的介面也可以進行函式超載，差別在沒有名稱標記而已。

4.若某物件實踐該介面時，必須符合該介面裡 —— 超載過的函式之所有情形。 (重要 !!!!)

*
*********************************************************************************/

/********************************************************************************
*
          介面融合 Interface Merging
*
*********************************************************************************/

// Block-Level Elements
interface MyDocument {
  createElement(tag: 'p'): HTMLParagraphElement
  createElement(tag: 'body'): HTMLBodyElement
  createElement(tag: 'div'): HTMLDivElement
}

// Inline-Level Elements
interface MyDocument {
  createElement(tag: 'a'): HTMLAnchorElement
  createElement(tag: 'span'): HTMLSpanElement
  createElement(tag: 'input'): HTMLInputElement
}
// 如果需要實作 MyDocument ，需要針對六個不同 tag 的 case ，return 不同的值 


// 第三方套件要做 merge 的例子
// 第三方套件的 Definition File： 發現沒有對 url 做 query 的解析，我們要自已定義 middleware 去分析 query
// 這時候應該怎麼做比較好？？？


// namespace StupidFramework {
//   interface StupidRequest {
//     headers: Header[];
//     body: Body;
//     url: string;
//     method: 'GET' | 'POST' | ... | 'DELETE';
//     ...
//   }
// }

/* -------- 分隔線代表不同的檔案，希望跟主檔案的 interface 做 merge -------- */

// 我們的專案自定義的狀態
type Dictionary = { [propName: string]: string }

namespace StupidFramework {
  interface StupidRequest {
    query?: Dictionary
  }
}

// 補充 : 通常第三方套件都會有屬於自己的 namespace 防止污染到全域的狀況。因此為了要讓介面也可以融合，你也必須指定該套件的 namespace。