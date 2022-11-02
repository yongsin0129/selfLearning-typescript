class CircleGeometryV2 {
  // 使用 readonly 在成員變數上
  public readonly PI: number = 3.14

  // 使用 readonly 在類別靜態屬性上
  static readonly staticPI: number = 3.14

  // 略...

  // 初始化時需要的參數為半徑 radius
  constructor (public radius: number) {}

  // 使用取值方法 Getter Method
  // 裡面不能有任何參數，否則會被記警告！
  get area (/* 禁止放任意參數 */) {
    // 沒有回傳任何值也是錯誤的行為！
    return this.PI * this.radius ** 2
  }

  // 使用存值方法 Setter Method
  // 裡面僅僅只能有一個參數，否則會被記警告！
  set area (value: number /* , anotherValue: number */) {
    // 半徑是面積先除以圓周率 PI 之後再開根號
    // 開根號等效於取 0.5 次方的概念！
    this.radius = (value / this.PI) ** 0.5
  }

  // 計算圓形的周長
  public circumference (): number {
    return 2 * this.PI * this.radius
  }
}
/********************************************************************************
*
          case 1 直接改變 radius
*
*********************************************************************************/
// 初始化半徑為 2 的圓形
const randomCircle = new CircleGeometryV2(2)

// 取得圓形的面積
console.log(randomCircle.area) //12.56

// 改變半徑的值
randomCircle.radius = 3 

// 再次取得圓形面積
console.log(randomCircle.area) // 28.26

// 使用 setter getter 的神精:
// 不要直接用 randomCircle.area = 某數字 來強行覆寫掉面積的值，使得計算結果被破壞掉


/********************************************************************************
*
          case 2 使用 setter 給 area 改變 radius , 用 getter 賦值
*
*********************************************************************************/
// 初始化半徑為 2 的圓形
const anotherRandomCircle = new CircleGeometryV2(2)

// 取得圓形的半徑，應該等於 2
console.log(anotherRandomCircle.radius) // 2

// 取得圓形的面積
console.log(anotherRandomCircle.area) // 12.56

// 使用 setter
// 更改圓形的面積應該會連動到 radius 半徑的值
// 這一次我們使用半徑為 5 的圓形面積作為指派值
anotherRandomCircle.area = 3.14 * 5 ** 2

// 半徑應該約等於 5
console.log(anotherRandomCircle.radius) //5

// 使用 getter
let areaOfCircle = anotherRandomCircle.area
console.log( areaOfCircle) // 78.5


/* readonly 模式 */
// 可以被讀取
anotherRandomCircle.PI

// 但是不能被覆寫！
anotherRandomCircle.PI = 3.1415926;

// 類別的靜態屬性被標註 readonly 也無一例外
CircleGeometryV2.staticPI

// 因為是 readonly，所以會被 TypeScript 提醒喔
CircleGeometryV2.staticPI = 3.1415926;


/********************************************************************************
*
類別的存取方法 Accessors
分成兩種：取值方法（Getter Method）與存值方法（Setter Method）。

1.  取值方法專門在模擬呼叫物件的屬性時的行為；存值方法則是在模擬指派值到物件屬性的行為：由於兩者皆是用方法的方式來呈現屬性的呼叫與指派行為，因此才會被稱為存取方法。（而不是存取屬性）

2.  若只有單純實踐某物件屬性的取值方法（Getter Method）而沒有相對應的存值方法，該屬性可以模擬唯讀（Read-only）的狀態。

3.  取值方法的實踐不能有任何參數。若某屬性是利用取值方法來模擬的話，呼叫該物件的屬性，型別推論的結果會等同於取值方法回傳的值之型別。又因為是在模擬物件取值的過程，因此不回傳值的行為也是錯誤的！

4.  存值方法只能有一個參數，而該參數代表的值是指派的值。根據函式型別篇章提出的重點，我們必須對存值方法內部的參數進行積極註記的動作。若某屬性的指派行為是用存值方法模擬，則該屬性被指派錯誤的值也會根據存值方法的參數被註記到的型別進行比對。

5.  若想要在類別 C 宣告某存取方法模擬物件呼叫或指派值到屬性 P，其中 P 必須被指派的值之型別為 <Tassign>
*
*********************************************************************************/