interface Geometry {
  area(): number
  circumference(): number
}

class Rectangle implements Geometry {
  constructor (public width: number, public height: number) {}

  public area () {
    return this.width * this.height
  }

  public circumference () {
    return 2 * (this.width + this.height)
  }
}

class Circle implements Geometry {
  public static PI = 3.14

  constructor (public radius: number) {}

  public area () {
    return Circle.PI * this.radius ** 2
  }

  public circumference () {
    return 2 * Circle.PI * this.radius
  }
}

// 建立一個視窗物件
class MyWindow {
  // 設置一個參考點對 Geometry 相關物件進行委任的動作
  constructor (public geometry: Geometry) {}

  // 計算面積時，遞給委任的物件執行
  public area () {
    return this.geometry.area()
  }

  // 計算周長時，遞給委任的物件執行
  public circumference () {
    return this.geometry.circumference()
  }
}

// 建立一個長方形視窗物件
let rectWindow = new MyWindow(new Rectangle(50, 100))

console.log(`Area of rectangular window:          ${rectWindow.area()}`)
console.log(
  `Circumference of rectangular window: ${rectWindow.circumference()}`
)

// 建立一個圓形視窗物件
let circularWindow = new MyWindow(new Circle(10))

console.log(`Area of circular window:             ${circularWindow.area()}`)
console.log(
  `Circumference of circular window:    ${circularWindow.circumference()}`
)
