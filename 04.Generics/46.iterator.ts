import {
  GenericLinkedListNode,
  GenericLinkedList
} from './45.Generic Class implements Interface'

interface Iterator<T> {
  // 事實上原著還有多一個 first 方法代表取得聚合物的第一個值，不過
  // 筆者認為本篇沒有需求，因此選擇不設定為 Iterator<T> 的規格
  // first(): T | null;

  // next 方法為巡訪下一個元素，輸出為 void 的理由則是因為，如果想要
  // 讀取該迭代器的內容，你必須使用 currentItem 這個屬性
  next(): void

  // 確認迭代器是否到終點
  isDone(): boolean

  // 迭代器目前迭代到的值，也可能為 null 也說不定
  currentItem: T | null
}

interface Iterable<T> {
  // 為 Factory Method，專門創建對應的 Iterator<T> 物件
  createIterator(): Iterator<T>
}

// 建立普通的 Iterator，傳入陣列型資料並進行普通迭代
class NormalIterator<T> implements Iterator<T> {
  public currentItem: T | null = null
  private currentIndex = 0

  constructor (private items: Array<T>) {
    this.currentItem = items[0]
  }

  public isDone () {
    // 若 index 值超出 items 大小範圍則代表迭代結束
    return this.currentIndex > this.items.length - 1
  }

  public next () {
    // 如果早就 isDone，就拋出 Out of bound 相關的錯誤訊息
    if (this.isDone()) throw new Error('Iterator out of bound.')

    // 正常迭代到下個元素
    this.currentIndex++
    this.currentItem = this.items[this.currentIndex]
  }
}

// 建立 MyArray，不過跟 Array 本身差不多，只是多實踐了
// Iterable<T> 介面
class MyArray2<T> implements Iterable<T> {
  constructor (public items: Array<T>) {}

  // 此為 Factory Method，專門建立 MyArray 的迭代器
  createIterator () {
    return new NormalIterator<T>(this.items)
  }
}

// 建立一個簡單的聚合物
let aCollection = new MyArray2<number>([1, 2, 3, 4, 5])

// 建立該聚合物的迭代器
let anIterator = aCollection.createIterator()

// 迴圈遍歷該迭代器
// while(!anIterator.isDone()) {
//   console.log(`Iterated value: ${anIterator.currentItem}`);
//   anIterator.next();
// }

// 如果硬要在呼叫 next，就會觸發 Out of bound 錯誤
// try {
//   anIterator.next();
// } catch (err) {
//   console.log('Out of bound error caught!');
// }

class IterableLinkedList<T> extends GenericLinkedList<T>
  implements Iterable<T> {
  // 實踐建立迭代器的工廠方法
  public createIterator () {
    // 記得：空陣列是必須積極註記的案例
    const elements: Array<T> = []

    let currentNode = this.head
    while (currentNode !== null) {
      elements.push(currentNode.value)
      currentNode = currentNode.next
    }

    return new NormalIterator(elements)
  }
}

// 任何為 Iterator<T> 型別的東西都可以被遍歷
function foreach<T> (iter: Iterator<T>, callback: (v: T) => void) {
  while (!iter.isDone()) {
    callback(iter.currentItem as T)
    iter.next()
  }
}

// 建立兩種不同的聚合物
let collection1 = new MyArray2([1, 2, 3])
let collection2 = new IterableLinkedList<number>()
collection2.insert(0, 1)
collection2.insert(1, 2)
collection2.insert(2, 3)

// 建立兩種相同的迭代器來各自不同的聚合物
let iter1 = collection1.createIterator()
let iter2 = collection2.createIterator()

// 兩個迭代器儘管來源不同，但都可以動作
// foreach(iter1, v => console.log(`v from collection1: ${v}`));
// foreach(iter2, v => console.log(`v from collection2: ${v}`));

/********************************************************************************
*
          /* 陽春版的 BinaryTree 與 TreeNode 的實踐 
*
*********************************************************************************/

// BinaryTree 為主要的二元樹物件
class BinaryTree<T> implements Iterable<T> {
  constructor (public root: TreeNode<T>) {}

  // 宣告前序走訪的成員方法
  public preorderTraversal (callback: (el: TreeNode<T>) => void) {
    this.preorderRecursive(this.root, callback)
  }

  // 此為 private 成員，目的是用遞迴實現前序走訪
  private preorderRecursive (
    node: TreeNode<T>,
    callback: (el: TreeNode<T>) => void
  ) {
    callback(node)
    if (node.leftNode !== null) {
      this.preorderRecursive(node.leftNode, callback)
    }

    if (node.rightNode !== null) {
      this.preorderRecursive(node.rightNode, callback)
    }
  }

  // 實踐 Iterable<T> 的介面
  public createIterator () {
    const elements: Array<T> = []

    // 使用 preorderTraversal 將值都丟進陣列
    this.preorderTraversal(node => {
      elements.push(node.value)
    })

    // 建構迭代器
    return new NormalIterator(elements)
  }
}

// TreeNode 為樹裡面的節點
class TreeNode<T> {
  public leftNode: TreeNode<T> | null = null
  public rightNode: TreeNode<T> | null = null
  public parent: TreeNode<T> | null = null

  constructor (public value: T) {}

  // 存值方法 —— 存放左節點
  set left (value: T) {
    this.leftNode = new TreeNode(value)

    // 順便對子節點進行父子關係的連結
    this.leftNode.parent = this
  }

  // 存值方法 —— 存放右節點
  set right (value: T) {
    this.rightNode = new TreeNode(value)

    // 順便對子節點進行父子關係的連結
    this.rightNode.parent = this
  }
}

// 宣告 TN 為 TreeNode<number> 的化名
type TN = TreeNode<number>

// 建構樹的根節點外，將該節點設為二元樹的點
const root = new TreeNode(1)
const aBTree = new BinaryTree(root)

// 建構樹的內部結構
root.left = 2
;(root.leftNode as TN).left = 3
;(root.leftNode as TN).right = 4
;((root.leftNode as TN).rightNode as TN).left = 5

root.right = 6
;(root.rightNode as TN).left = 7
;((root.rightNode as TN).leftNode as TN).left = 8
;((root.rightNode as TN).leftNode as TN).right = 9
;(((root.rightNode as TN).leftNode as TN).rightNode as TN).left = 10

// 一般使用手法
console.log('Normal Usage:')
const valueCumulation1: Array<number> = []

aBTree.preorderTraversal(n => valueCumulation1.push(n.value))
console.log(valueCumulation1) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// 多型巡訪下的手法
console.log('Polymorphic Iteration:')
const valueCumulation2: Array<number> = []
const aBTreeIter = aBTree.createIterator()

foreach(aBTreeIter, v => valueCumulation2.push(v))
console.log(valueCumulation2) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

