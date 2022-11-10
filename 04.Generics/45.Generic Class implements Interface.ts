/* 類別綁定介面，且介面為泛用介面的狀況 */
// MyLinkedList 為普通類別，綁定 LinkedList<T>
// class MyLinkedList implements LinkedList<T> {}

// MyGenericLinkedList 為泛用類別，綁定 LinkedList<T>
// class MyGenericLinkedList<T> implements LinkedList<T> {}

// 實踐 LinkedListNode<T> 介面
export class GenericLinkedListNode<T> implements LinkedListNode<T> {
  public next: LinkedListNode<T> | null = null

  constructor (public value: T) {}
}

// 實踐 LinkedList<T> 介面
export class GenericLinkedList<T> implements LinkedList<T> {
  public head: LinkedListNode<T> | null = null

  public length () {
    // 如果連 head Node 都為 null 就代表沒有長度
    if (this.head === null) return 0

    let count = 0
    let currentNode: LinkedListNode<T> | null = this.head

    // 使用 while-loop 進行計算 LinkedList 長度的迭代
    while (currentNode !== null) {
      currentNode = currentNode.next
      count++
    }
    return count
  }

  public at (index: number): LinkedListNode<T> | null {
    const length = this.length()

    // 如果長度小於 index 則無條件視為 out of bound，
    // 直接丟出 Error
    //
    // index 由 0 開始計算，跟陣列的概念一模一樣
    // 如：
    // - 長度為 0 的鏈結串列，index 為 0 必須丟出 error
    // - 長度為 3 的鏈結串列，index 為 2 是最後一個值，
    //   但 3 以上則必須丟出 error
    if (index >= length) throw new Error('Index out of bound')

    // 以下取得實際的 LinkedListNode 值
    let currentIndex = 0
    let currentNode = this.head as LinkedListNode<T>
    while (currentIndex !== index) {
      currentNode = currentNode.next as LinkedListNode<T>
      currentIndex++
    }

    return currentNode
  }

  public insert (index: number, value: T) {
    const length = this.length()
    const newNode = new GenericLinkedListNode(value)

    // 如果長度小於 index 值就選擇丟出 'Out of bound' Error
    if (length < index) throw new Error('Index out of bound')
    // 但是若剛好等於 index 值，代表要插入新的節點
    else if (length === index) {
      if (index === 0) {
        this.head = newNode
      } else {
        const node = this.at(index - 1) as LinkedListNode<T>
        node.next = newNode
      }
    }

    // 長度大於 index 值，就代表從中插入新的 LinkedListNode
    else {
      if (index === 0) {
        const originalHead = this.head
        this.head = newNode
        this.head.next = originalHead
      } else {
        const prevNode = this.at(index - 1) as LinkedListNode<T>
        const originalNode = prevNode.next as LinkedListNode<T>
        prevNode.next = newNode
        newNode.next = originalNode
      }
    }
  }

  public remove (index: number): void {
    // 由讀者自行試試看
    throw new Error('Method not implemented.')
  }

  public getInfo () {
    let currentNode = this.head
    let currentIndex = 0

    while (currentNode !== null) {
      console.log(`Index ${currentIndex}: ${currentNode.value}`)
      currentNode = currentNode.next
      currentIndex++
    }
  }
}

/********************************************************************************
*
          測試
*
*********************************************************************************/

// 宣告一個新的鏈結串列，型別參數的值為 number 型別
const l = new GenericLinkedList<number>()

// 插入 123 在 index = 0 的位置，此時鏈結串列為：
// [123]
l.insert(0, 123)

// 插入 456 在 index = 1 的位置，此時鏈結串列為：
// [123] -> [456]
l.insert(1, 456)

// 插入 789 在 index = 2 的位置，此時鏈結串列為：
// [123] -> [456] -> [789]
l.insert(2, 789)

// 插入 12321 在 index = 1 的位置，此時鏈結串列為：
// [123] -> [12321] -> [456] -> [789]
l.insert(1, 12321)

// 檢視結果
l.getInfo();

// 檢視鏈結串列中 index = 0 ~ 3 的元素之值：
// 由於我們確定 l.at(index) where index = 0 ~ 3
// 100% 絕對是 LinkedListNode<number>，而非 null，
// 因此採取顯性註記的動作
console.log((l.at(0) as LinkedListNode<number>).value);
console.log((l.at(1) as LinkedListNode<number>).value);
console.log((l.at(2) as LinkedListNode<number>).value);
console.log((l.at(3) as LinkedListNode<number>).value);

// 如果超出範圍應該會直接彈出錯誤訊息，這裡用 try...catch...
// 來確認是否有觸發 Out of bound ... 訊息
try {
  l.at(4)
} catch (err) {
  console.log('Out of bound error caught');
}

// 建立 GenericLinkedList 物件 但是不指派型別值到型別參數
const unspecifiedTypeParamLinkedList = new GenericLinkedList() // unknown

// 建立 GenericLinkedList 物件，並且有指派型別值到型別參數
const specifiedTypeParamLinkedList = new GenericLinkedList<any>() // any


/********************************************************************************
*
          helper 從 page 44 借來用
*
*********************************************************************************/
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
