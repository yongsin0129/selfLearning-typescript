/********************************************************************************
*
          介面的擴展 Interface Extension 使用方式
*
*********************************************************************************/
// 前面的例子有定義過，因此這裡做註解
// enum Gender { Male, Female, Other };

interface AccountSystem {
  email: string
  password: string
  subscribed: boolean
}

interface AccountPersonalInfo {
  nickname?: string
  birth?: Date
  gender?: Gender
}

// UserAccount 是 AccountSystem 與 AccountPersonalInfo 的結合
interface UserAccount extends AccountSystem, AccountPersonalInfo {}

/* 使用擴展過後的 Interface */
// 正常使用方法
let accountMaxwell: UserAccount = {
  email: 'max@example.com',
  password: '<hashed-password>',
  subscribed: false,
  nickname: 'Maxwell',
  gender: Gender.Male
  // birth 可以被省略是因為，該屬性為選用屬性 Optional Property
}

// 少一鍵，且該鍵非選用屬性，則會發出警告
// let accountMartin: UserAccount = {
//   email: 'martin@example.com',
//   password: '<hashed-password>',
//   nickname: 'Mars',
//   birth: new Date(2000, 1, 1),
//   gender: Gender.Male,
// };

// 多一鍵也會發生警告
// let accountLeo: UserAccount = {
//   email: 'leo@example.com',
//   password: '<hashed-password>',
//   subscribed: true,
//   nickname: 'Leonard',
//   birth: new Date(2000, 1, 1),
//   gender: Gender.Male,
//   hasPet: false,
// };

/********************************************************************************
*
          介面的交集 測試
*
*********************************************************************************/

// 定義 I1, I2, I3 三種不同介面：
interface I1 {
  a: string
  b: number
}
interface I2 {
  b: number
  c: boolean
}
interface I3 {
  a: string
  c: string
}

// I1 和 I2 同時有 b 屬性且對應型別相同 => STRIKE！
interface I12 extends I1, I2 {}

// I2 和 I3 同時有 c 屬性但對應型別不同 => BALL！
interface I23 extends I2, I3 {}

// I1 和 I3 同時有 a 屬性且對應型別相同 => STRIKE！
interface I13 extends I1, I3 {}

// 想當然三種型別因為 I2, I3 關係而造成衝突 => BALL！
interface I123 extends I1, I2, I3 {}

/********************************************************************************
*
          函式之參數可以接受各種至少符合介面的格式
*
*********************************************************************************/
interface Duck {
  noise: string
  makeNoise(): void
}

function pokeTheDuck (something: Duck) {
  something.makeNoise()
}

// 多了 name , age
let maxwellCanBeDuck = {
  name: 'Maxwell',
  age: 20,
  noise: 'He~He~He~He~He~~~', // 有病
  makeNoise () {
    console.log(this.noise)
  }
}

// 多了 color , eyes
let kittyCanBeDuck = {
  color: 'black and white',
  eyes: 'cute',
  noise: 'Meow~meow~meow~meow~meowwwwwwwwwww',
  makeNoise () {
    console.log(this.noise)
  }
}

// 多了 brand , type
let vehicleCanBeDuck = {
  brand: 'BMW',
  type: 'motorcycle',
  noise: 'Vroom! Vroom! Vroooooooooooom!',
  makeNoise () {
    console.log('Vrooooooom!!!')
  }
}

// 不多不少
let duckIsLiterallyDuck = {
  noise: 'Quack~quack~quack~quack~quack~',
  makeNoise () {
    console.log('Quack!')
  }
}

// 結果　： 以上四種 case 如果沒有積極註記，則 ts 通通會 pass
pokeTheDuck(maxwellCanBeDuck)
pokeTheDuck(kittyCanBeDuck)
pokeTheDuck(vehicleCanBeDuck)
pokeTheDuck(duckIsLiterallyDuck)

/********************************************************************************
*
          用 型別 去實作跟 UserAccount ( Interface Extension ) 同等效果的型別表示
*
*********************************************************************************/
type TAccountSystem = {
  email: string
  password: string
  subscribed: boolean
}

type TAccountPersonalInfo = {
  nickname?: string
  birth?: Date
  gender?: Gender
}

/* 用介面去實作跟 UserAccount 同等效果的介面表示 */
interface IAccountSystem {
  email: string
  password: string
  subscribed: boolean
}

interface IAccountPersonalInfo {
  nickname?: string
  birth?: Date
  gender?: Gender
}

// TUserAccount 型別是 TAccountSystem 與 TAccountPersonalInfo 的 Intersection
type TUserAccount = AccountSystem & AccountPersonalInfo

// IUserAccount 是 IAccountSystem 與 IAccountPersonalInfo 的結合
interface IUserAccount extends IAccountSystem, IAccountPersonalInfo {}

// AccountSystem 跟帳戶的基本運作機制有關
// AccountPersonalInfo 跟使用者的個資有關

/********************************************************************************
*
          significance

介面 Interface V.S. 型別 Type
從剛剛我們得出的結論：介面可以進行延伸或擴展（Interface Extension），這裡就可以開始點出介面跟型別系統的主要差別。

介面（Interface）的意義 —— 跟規格的概念很像，可以擴充設計、組裝出更複雜的功能規格

型別（Type）的意義 —— 代表靜態的資料型態，因此型別一但被定義出來則恆為固定的狀態。儘管可以利用型態的複合（intersection 與 union）看似達到型別擴展的感覺，然而這個行為並不叫作型別擴展，而是創造出新的靜態型別


介面本身的意義與好處
另外，還有著名的一句話：

Code against interface, not implementation: Decouple every part of your code and compose from them, instead of short-lived implementation.

直翻就是：

“程式碼不應該直接實踐出功能（implementation），而是定義一系列的介面：必須將程式碼拆卸成一系列的小區塊，將主要功能藉由各種區塊組合起來，而非專注於直截了當的實作層面。”

為何我們必須將程式碼進行拆解動作再重新組裝出我們的功能呢？原因有以下：

小單元的程式碼容易管理、寫測試也很簡單（測一個 Function 跟測一整個功能或專案的難度，前者當然較為簡單）
每一小段程式碼進行抽象化（Abstraction），使用起來比較輕鬆容易，組出大功能後也會比較好管理
直接實踐出完整功能，碰到某個未知的環節壞掉，可能還要猜測或者必須整段程式重新查過，很浪費時間
直接實踐出完整功能，程式內部的細節根本很難拔出來個別測試

通常一段程式也是一次只做一件事情比較好（跟單一職責原則 SRP：Single Responsibility Principle 的感覺很像）—— 換成介面的想法，通常會把大功能一次拆成好幾個介面，然後再重新組合成想要的功能，其中每個介面都代表功能的一小部分。另外，這些被拆成的小介面有些就可以被重複利用，再組成另一種功能。

貼心小提示
軟體設計裡通常提到的設計模式或概念幾乎主要都是針對 OOP 裡的類別（Class），SRP 也不例外！

原本 SRP 的定義是這樣：

SRP: Single-Responsibility Principle
"A class should have only one reason to change."

很明顯，它指的是 Class，並不是函式、介面、型別、物件等等。
*
*********************************************************************************/