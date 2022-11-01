/********************************************************************************
*
          正確使用 type 與 interface 的方式
          https://ithelp.ithome.com.tw/articles/10216626

type T = U;

interface I {
  P: U;
  ...
}

型別化名就是用 type；介面宣告則是用 interface。


應用上的比較 Application Comparison
1. 介面可被擴張 Interface Extension/Inheritance
2. 介面可以被融合 Declaration Merging
3. 介面不能直接模擬原始型別、Enum 與 Tuple

*
*********************************************************************************/

/* 介面不能單純用原始型別表示 */
// 根本沒有介面這樣的定義行為，實質上也沒意義啊
interface I {
  number;
}

// 遑論單純複合狀態
interface J {
  number | string;
}

/********************************************************************************
*
          介面與型別的共通點

不管是宣告型別 T 或介面 I，基礎的 TypeScript 型別檢測基本上行為都一模ㄧ樣。若某變數 A 被註記型別 T 或被註記介面 I：

以下功能兩者都可以使用：
1.選用屬性 Optional Properties
2.函式型別超載 Function Overload
3.Indexable Types
4.唯讀屬性 Read-only Properties
5.介面、型別都可以進行複合（union 與 intersection），甚至也可以介面與型別一起複合

意義比較
介面（Interface）代表更有彈性的型別表現形式，跟規格的概念很像，也具備擴充功能（Interface Extension）與融合功能（Interface Merging）。

型別（Type）代表靜態的型別格式，因此不建議將交集（intersection）的行為想成擴充型別的行為，而是 —— 宣告新的靜態型別格式，延用交集前的型別靜態格式或介面的規格。


// type 跟 interface 使用的建議：

1.遇到不希望被人擴充、單純想代表一種獨立的資料格式的概念時，使用型別的宣告 type
2.如果單純是原始型別或者是要表示為列舉型別、元組型別，一定只能使用 type 進行宣告
3.型別複合（使用 union 或 intersection）的過程通常都是使用 type 進行宣告

4.遇到功能是可以被重複再利用，該功能可能會被多方程式碼或第三方套件依賴，使用介面的宣告 interface
5.物件格式通常建議用 interface，使用起來彈性較大

5.混合使用型別與介面是可以的，但就是要記得：程式碼到底想要表達的重點是什麼？
6.混用過後不希望再被擴充或代表獨立靜態的型別格式就應該要用型別化名的宣告 type，藉由 union 或 intersection 達成
7.混用過後的結果是可以被擴充或多方利用，則應該要定義成介面，藉由 extends 去達成

*
*********************************************************************************/