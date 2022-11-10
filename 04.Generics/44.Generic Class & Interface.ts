/* 一般宣告鏈結串列的介面 */
// interface LinkedListNode {
//   value: any;
//   next: LinkedListNode | null;
// }

// interface LinkedList {
//   head: LinkedListNode | null;
//   length(): number;
//   at(index: number): LinkedListNode | null;
//   insert(index: number, value: any): void;
//   remove(index: number): void;
// }

/* 使用泛用參數的方式宣告泛用介面 */
interface LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
}

interface LinkedList<U> {
  head: LinkedListNode<U> | null
  length(): number
  at(index: number): LinkedListNode<U> | null
  insert(index: number, value: U): void
  remove(index: number): void
}

/* 泛用類別宣告 */
class C<T> {
  // 宣告一個成員變數，其型別為型別參數 T
  constructor (public memberProp: T) {}

  // 宣告一個成員方法 memberFunc 主要是回傳 memberProp 的值
  public memberFunc () {
    return this.memberProp
  }

  // 宣告一個取值方法 Getter，輸出為 memberProp
  get value () {
    return this.memberProp
  }

  // 宣告一個存值方法 Setter，修改 memberProp 的值
  set value (input: T) {
    this.memberProp = input
  }
}

/*
 * 情形 1.
 *
 * 不註記在變數上，建立物件時顯性填入
 * 型別參數，以下為 `number` 的範例
 *
 */
let instanceOfC1 = new C<number>(614)

// 呼叫成員變數
instanceOfC1.memberProp

// 呼叫成員方法
instanceOfC1.memberFunc()

// 呼叫 Getter 取值方法
instanceOfC1.value

// 呼叫 Setter 存值方法
instanceOfC1.value = 416

/*
 * 情形 2.
 *
 * 註記在變數上，建立物件時不註記在類別化名旁的
 * 型別參數，以下為 `number` 的範例
 *
 */
let instanceOfC2: C<number> = new C(614)

// 呼叫成員變數
instanceOfC2.memberProp

// 呼叫成員方法
instanceOfC2.memberFunc()

// 呼叫 Getter 取值方法
instanceOfC2.value

// 呼叫 Setter 存值方法
instanceOfC2.value = 416

/*
 * 情形 3.
 *
 * 不註記在變數上，建立物件時也不註記在類別化名旁的
 * 型別參數，但仍然可以推論出型別參數為 `number` 的範例
 *
 */
let instanceOfC3 = new C(614)

// 呼叫成員變數
instanceOfC3.memberProp

// 呼叫成員方法
instanceOfC3.memberFunc()

// 呼叫 Getter 取值方法
instanceOfC3.value

// 呼叫 Setter 存值方法
instanceOfC3.value = 416

/* ----------------------- 子類別繼承父類別，且父類別為泛用類別的狀況 ----------------------- */
// D 繼承 C<T>
class D extends C<number> {}

// E<T> 繼承 C<T>
class E<T> extends C<T> {}

// ----------------------- 宣告某一個類別具有兩個型別參數 -----------------------

class Cparent<T, U> {
  constructor (public member1: T, public member2: U) {}

  /* 讀者自行發揮剩下的功能 */
}

// 試問以下的狀況會出現什麼樣的情形：
class Cchild1<T, U> extends Cparent<T, U> {}
class Cchild2<T, U = T> extends Cparent<T, U> {}
class Cchild3<T, U extends T> extends Cparent<T, U> {}

/********************************************************************************
*
泛用型別可以間接推論程式碼未來動作時在型別推論方面的能力 —— 以此重點為基礎，闡述泛用類別也運用了類似的優勢，達到更完美的型別推論境界。
*
*********************************************************************************/