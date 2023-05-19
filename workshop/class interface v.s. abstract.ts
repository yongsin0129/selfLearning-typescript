/********************************************************************************
*
          心得整理 : 兩者最大的不同

          當我用 class 繼承一個 Abstract Classes 時，
          1.裡面可能已經有初始化的 property and 實作好的 method 可以不需要再定義、實作
          2.可以直接 override property and method
          注意 override method 時，也需同時滿足父 class 的條件

          如果用 class extends 需要滿足 interface 的全部要求
*
*********************************************************************************/

/********************************************************************************
*
extends Abstract Classes v.s. implements interface

1. TypeScript抽象类的使用时机

抽象类是一种不能被实例化的类，它只能被继承。在TypeScript中，抽象类可以用来定义一些通用的属性和方法，而具体的实现则由子类来完成。通常情况下，抽象类适用于以下场景：

- 定义一些通用的方法和属性，但是具体的实现可能因为子类而异。
- 强制子类实现某些方法或属性，以确保子类的正确性和一致性。
- 提供一种模板方法，以便子类可以根据自己的需要来实现具体的逻辑。

2. extends Abstract Classes 跟 implements interface 在使用上有什么不一样？

在TypeScript中，extends关键字用于继承一个类，而implements关键字用于实现一个接口。在使用上，extends Abstract Classes和implements interface有以下不同：

- extends Abstract Classes只能继承一个类，而 implements interface可以实现多个接口。
- extends Abstract Classes可以继承类的属性和方法，而implements interface只能实现接口的属性和方法。
- extends Abstract Classes可以重写和覆盖父类的方法和属性，而implements interface必须实现接口中定义的所有属性和方法。

总的来说，extends Abstract Classes和implements interface都是用于实现类的继承和多态性，但是它们的使用场景和实现方式有所不同，需要根据具体的情况进行选择。

設計理念不同 : 
extends Abstract Classes : is a
implements interface : like a


參考資料 :
1. 我眼中的在typescript中，interface和abstract 的异同点 https://www.jianshu.com/p/ccc6d1e68cfe

2. When to Use TypeScript Abstract Classes  https://khalilstemmler.com/blogs/typescript/abstract-class/
*
*********************************************************************************/

/********************************************************************************
*
          example :extends Abstract Classes
*
*********************************************************************************/

// 掛上 abstract 後的 class
// 1. 不能使用 new
// 2. 掛上 abstract  的 method 不能實作，只能定義
// 3. 掛上 abstract  的 property 不能初始化，只能在子類實現

abstract class Person {
  name: string = 'YongSin'

  abstract sayHi1(): void //抽象方法 不能實作，只能定義
  abstract sayHi1(x: number): void //抽象方法 不能實作，只能定義  !! 可以overload

  abstract id: string // 不能初始化 abstract id: string = 'kdjflkajdsf'

  constructor () {}

  sayHi2 () {
    console.log('this is sayHi2 function')
  }
  // abstract sayHi2 () {    console.log('this is sayHi2 function')  } // 掛上 abstract 只能定義不能實作
}

class Child extends Person {
  id: string

  constructor () {
    super()
    this.id = 'id - #k1la31jflk23aosidhfia'
    this.name = 'override - YongSin'
  }

  run () {
    console.log('learn to run...')
  }

  sayHi1 () {
    console.log('this is sayHi1 function')
  } // 可以覆蓋 父 class 的 method

  sayHi2 (x?:number) {
    console.log(`this is override sayHi2 function , x : ${x}`)
  } // 可以覆蓋 父 class 的 method

  sayHi3 () {
    console.log('this is sayHi2')
  }
}
console.log('\n === extends Abstract Classes === \n')

const child = new Child()
console.log(child.id, child.name)
child.run()
child.sayHi1()
child.sayHi2()
child.sayHi2(99)

/********************************************************************************
*
          example : implements interface
*
*********************************************************************************/

// 1. 不能使用 new
// 2. 裡面的 method 不能實作，只能定義
// 3. 裡面的 property 不能初始化，只能在子類初始化

interface Child1 {
  // 不能對 property 初始化，只能定義
  // name: string = 'vincent'

  // 不能使用 constructor
  // constructor (name: string) {
  //   this.name = name
  // }

  // 不能對 method 實作，只能定義
  // sayHi2 () {
  //   console.log('this is sayHi2 function')
  // }
  name: string
  id: string

  sayHi1(): void
  sayHi1(x: number): void

  sayHi2(): void
  run(): void
}

class ChildFromImplements implements Child1 {
  name: string = 'YongSin'
  id: string = 'id - #k1la31jflk23aosidhfia'

  constructor () {}

  sayHi1 () {
    console.log('this is sayHi1')
  }
  sayHi2 () {
    console.log('this is sayHi2')
  }
  sayHi3 () {
    console.log('this is sayHi2')
  }
  run () {
    console.log('this is run')
  }
}

console.log('\n === implements interface === \n')

const childFromImplements = new ChildFromImplements()
console.log(childFromImplements.id, childFromImplements.name)
childFromImplements.run()
childFromImplements.sayHi1()
childFromImplements.sayHi2()
