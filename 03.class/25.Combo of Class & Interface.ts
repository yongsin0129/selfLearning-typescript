/********************************************************************************
*
          類別對介面進行綁定

若已宣告類別 C 與介面 I，其中 C 想要對 I 進行綁定的動作，必須使用 implements 關鍵字。

一但 C 綁定了 I，則類別 C 必須要實踐出介面 I 裡面的所有規格成員。

任何類別 C —— 儘管有綁定介面 I1、I2、... In，建構出來的物件之型別推論結果一律都是指向該類別 C。

*
*********************************************************************************/
// 定義角色的介面
enum Role {
  Swordsman = 'Swordsman', // 劍士
  Warlock = 'Warlock', // 術士
  Highwayman = 'Highwayman', // 攔路強盜
  BountyHunter = 'Bounty Hunter', // 賞金獵人
  Monster = 'Monster' // 怪物
}

// 角色基本資料（剛剛被宣告過）
interface ICharacter {
  name: string
  role: Role
  attack(target: ICharacter): void
}

// 另一個介面，代表角色的各種屬性或能力值
interface IStats {
  health: number // 生命值
  mana: number // 魔力值
  strength: number // 力量
  defense: number // 防禦
}

// 將遊戲角色與 ICharacter 介面進行綁定
class Character implements ICharacter, IStats {
  public health: number = 50
  public mana: number = 10
  public strength: number = 10
  public defense: number = 5

  constructor (public name: string, public role: Role) {}

  public attack (target: ICharacter) {
    let verb: string

    // 根據不同的職業，進行不同的攻擊方式
    switch (this.role) {
      case Role.Swordsman:
        verb = 'attacking'
        break
      case Role.Warlock:
        verb = 'cursing'
        break
      case Role.Highwayman:
        verb = 'ambushing'
        break
      case Role.BountyHunter:
        verb = 'threatening'
        break
      default:
        throw new Error(`${this.role} didn't exist!`)
    }

    console.log(`${this.name} is ${verb} ${target.name}!`)
  }
}

// 分別建立兩種不同的角色
const character1 = new Character('Maxwell', Role.Swordsman)
const character2 = new Character('Martin', Role.Highwayman)

// 來互相傷害啊！
character1.attack(character2) // Maxwell is attacking Martin!
character2.attack(character1) // Martin is ambushing Maxwell!

/********************************************************************************
*
          註記測試
*
*********************************************************************************/
// 建立簡單的角色
let character = new Character('Maxwell', Role.Swordsman)

// 從類別建立出來的物件
let certainlyACharacter: ICharacter = new Character('Martin', Role.Highwayman)

// 被推論為 Character 型別的變數可以呼叫 name 屬性
character.name

// 被推論為 Character 型別的變數可以呼叫 health 屬性
character.health

// 被註記為 ICharacter 型別的變數可以呼叫 name 屬性
certainlyACharacter.name

// 被註記為 ICharacter 型別的變數，由於介面 ICharacter
// 沒有 health 屬性，被 TypeScript 判定為有潛在問題
// certainlyACharacter.health

// 新增的 Monster 類別有實踐 ICharacter 介面
class Monster implements ICharacter {
  public role = Role.Monster

  constructor (public name: string) {}

  public attack (target: ICharacter) {
    console.log(`${this.name} is attacking the ${target.role} - ${target.name}`)
  }
}

// 宣告一個 Character 以及 Monster
let aHumanCharacter = new Character('Maxwell', Role.Swordsman)
let aMonster = new Monster('Sticky Slime')

// Character 創建出來的物件之 attack 方法可以接收 Monster 類別創建的物件
aHumanCharacter.attack(aMonster)

// Monster 創建出來的物件之 attack 方法也可以接收 Character 類別創建的物件
aMonster.attack(aHumanCharacter)

/********************************************************************************
*
          由 Character 再延伸出一個角色 : 賞金獵人
*
*********************************************************************************/
class BountyHunter extends Character {
  // 賞金獵人會抓取人質或怪物，所以這裡會是用陣列型別
  public hostages: ICharacter[] = []

  constructor (name: string) {
    super(name, Role.BountyHunter)
  }

  // 定義名為 capture - 捕捉敵人的功能
  // 第一個參數 target 是捕捉的目標
  // 第二個參數 successRate 是捕捉到目標的機率 (0 ~ 1)
  public capture (target: ICharacter, successRate: number) {
    const randomNumber = Math.random()
    let message: string
    let targetTitle = `${target.name} the ${target.role}`

    // 賞金獵人成功抓取敵人必要條件是 randomNumber 必須大於 1 - successRate 的數值
    // 用機率的講法是：敵人沒辦法逃脫的機率是 1 - successRate
    // 因此，若 successRate = 1（100%），則敵人逃脫機率為 1 - successRate = 0
    // 機率真是一門很深但也是令人頭痛的學問
    if (randomNumber > 1 - successRate) {
      // 抓到敵人時，將敵人丟到 hostages 這個陣列
      this.hostages = [...this.hostages, target]

      message = `${this.name} has captured ${targetTitle}`
    } else {
      message = `${this.name} failed to capture ${targetTitle}`
    }

    console.log(message)
  }

  // 販賣人質～
  public sellHostages () {
    const totalPrice = this.hostages.length * 1000
    const hostagesInfo = this.hostages
      .map(hostage => `${hostage.name} the ${hostage.role}`)
      .join('\n')

    console.log(`
      ${this.name} sells all the hostages, including:
      ${hostagesInfo}
      Receive Gold: $${totalPrice}
    `)

    this.hostages = []
  }
}

// 建立一個賞金獵人
const bountyHunter = new BountyHunter('Maxwell')
// 建立一個懸賞的普通角色
const wantedCharacter = new Character('Martin', Role.Highwayman)
// 建立一個怪物
const wantedMonster = new Monster('Eikthyrnir')
// 建立一個亡命之徒
const desperado = new Character('Legendary Joe', Role.Highwayman)

// capture 的 target type 為 ICharacter , 而 class Character 及 Monster 都有實踐此 interface !!!
// 百分之百可以抓到普通角色
bountyHunter.capture(wantedCharacter, 1);
// 可能可以抓到怪物
bountyHunter.capture(wantedMonster, 0.5);
// 不太可能抓到亡命之徒
bountyHunter.capture(desperado, 0.01);

// 賣掉人質
bountyHunter.sellHostages();


// 普通角色是否能夠回擊呢？
wantedCharacter.attack(bountyHunter);

// 怪物是否也能夠回擊呢？
wantedMonster.attack(bountyHunter);

// 如果被強行註記為 ICharacter 的變數，是否能夠接受 BountyHunter 類型的值？
const anyCharacter: ICharacter = new BountyHunter('Alexius')

// 註記為 ICharacter 的 BountyHunter 是否可以呼叫 capture 方法？
// anyCharacter.capture(wantedMonster, 0.5);

/********************************************************************************
*
      類別繼承與介面綁定最大的不同 Class Inheritance V.S. Interface Implementation

最大的不同就是：一個子類別一次只能繼承一個父類別；
然而，一個類別可以跟多個介面進行綁定。

這也是介面的運用會比類別繼承還要更有彈性的主因。
在軟體設計裡，時常討論到 —— 兩個系統的耦合程度（Coupling）中，使用類別繼承的耦合程度一定會比介面的綁定還來得高。

在父類別新增一個功能跟嵌入一個介面比起來，後者的難度會比較低。

父類別要是新增一項功能，則必須確保所有的子類別能夠正常運作，否則會面臨到所有的子類別為了遷就父類別新增的功能必須進行覆寫的動作；
另外，如果想要將父類別裡面的某些功能抽出來給其他程式碼或類別使用實在是不容易的事情。

嵌入介面是比較保險版本的新增功能方式，而且介面是可以被不同類別重複利用，不會像類別死死地把成員細節絕對綁定。
除非類別跟父類別間的關係程度真的是很緊密，可以使用繼承，否則通常會使用介面來組出功能。

然而，OOP 設計模式裡，當然不侷限於使用介面的方式降低耦合程度，
善用類別物件組織起來（Object Composition）而不使用類別繼承也可以達到降低相依的耦合度
*
*********************************************************************************/