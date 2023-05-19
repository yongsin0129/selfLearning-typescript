class CircleGeometry1 {
  // 初始化時需要的參數為半徑 radius
  constructor (public name: string) {}

  private static userCount = 0
  static Count = 0

  static sayHi () {
    console.log(this.name)
  }

  static {
    this.userCount = -1

    this.Count++
    console.log('this.count : ', this.Count)
  }
}

console.log('=== new process === \n') // new 會在 creation phase 執行
const a11 = new CircleGeometry1('YongSin')

console.log('=== check instance and class ===\n')
console.log(a11)
console.log(CircleGeometry1)

console.log('=== check function call and this ===\n')
CircleGeometry1.sayHi()
CircleGeometry1.sayHi.call(a11)
