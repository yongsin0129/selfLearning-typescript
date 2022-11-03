/********************************************************************************
*
          用滑鼠去試試看每個 new class 的時候，用 TS 自動推論的結論
*
*********************************************************************************/
enum Color {
  White,
  Black,
  Brown,
  Grey,
  Rainbow
}

class Horse {
  constructor (
    public name: string,
    public color: Color,
    public readonly type: string,
    private noise: string = 'MeeeeeeeEeeééeéeée~'
  ) {}

  public makeNoise () {
    console.log(this.noise)
  }

  public info () {
    console.log(this.infoText)
  }

  // 子類別可以覆寫 infoText 成員方法
  protected infoText (): string {
    return `It is ${this.name} the ${Color[this.color]} ${this.type}.`
  }
}

// 利用生物科技製造出一隻名為 Martin 的黑色小馬
let aRandomHorsie = new Horse('Martin', Color.Black, 'Pony')
// 對馬原本就有的屬性指派錯誤型別
aRandomHorsie.color = 'Red'
// 對馬植入新的屬性
aRandomHorsie.isNatural = false
// 直接覆寫錯誤的值
aRandomHorsie = null
// 要覆寫就要用同為 Horse 型別的值進行完整覆寫
// 另外：stallion 是 “騭”，馬的品種之一
aRandomHorsie = new Horse('Toby', Color.Brown, 'Stallion')

/********************************************************************************
*
          /* 類別的 三種 型別註記法 
*
*********************************************************************************/
// 1. 用常見的型別註記法
let certainlyAHorsie: Horse = new Horse('Leo', Color.Black, 'Bronco')

// 2. 用顯性型別註記法
let certainlyAnotherHorsie = <Horse>new Horse('Wendy', Color.White, 'Mustang')

// 3. 用 `as` 型別註記法
let certainlyTheOtherHorsie = new Horse('Alexius', Color.Grey, 'Foal') as Horse

/********************************************************************************
*
          /* 繼承後的子類別之推論機制 

普通類別之型別推論與註記行為（上面討論完）
繼承過後的類別之型別推論與註記行為 (接下來討論這主題)

*
*********************************************************************************/
/* 繼承類別範例 */
class Unicorn extends Horse {
  constructor (name: string) {
    super(
      name,
      Color.Rainbow,
      'Mystical Unicorn',

      // 獨角獸的叫聲到底是什麼，筆者也不清楚
      'Nheeeeeeheeehehé~hehé~hehé~hehé~~~'
    )
  }

  protected infoText (): string {
    return `It's a mystical unicorn! Its name is ${this.name}!`
  }

  // 獨角獸會吐彩虹色的嘔吐物
  public puke (): void {
    console.log('Puking rainbow vomit!')
  }
}

// 普通的 Unicorn
let aRandomUnicorn = new Unicorn('Maxwell')
// 註記為 Horse，不過被指派為 Unicorn
let anotherHorsie: Horse = new Unicorn('Maximilian') // Horse 可以用子類指派 !!!

// 嘔吐吧！獨角獸！
aRandomUnicorn.puke()
// 你也跟著嘔吐吧！ => 它嘔吐不了...
anotherHorsie.puke()

// 重點：儘管被父類別註記的變數可以接收子類別建構的物件，但本質上有註記 Horse ，它都是 horse 的形狀
// 子類別新增了父類別沒有的成員，該成員若被呼叫時 —— 會被 TypeScript 警告。

// 相反過來，子類別註記的變數不可以接收父類別建構的物件
let shouldBeUnicorn: Unicorn = new Horse(
  'Maxime',
  Color.Rainbow,
  'Mystical Unicorn',
  'Nyeeeeeeee~~'
)

// 宣告 Stallion 為 Horse 子類別，並且沒有多宣告更多成員
class Stallion extends Horse {
  constructor (name: string) {
    super(name, Color.Brown, 'Stallion')
  }
}
// 註記為 Stallion 型別的變數卻指派 Horse
let shouldBeStallion: Stallion = new Horse('Maxwell', Color.Brown, 'Stallion')

// 這時候 子類就可以接收父類了 !!!

/********************************************************************************
*

重點  類別繼承之型別推論與註記
假設宣告某類別 C，另外再宣告 C_Inherit 為繼承 C 的子類別，則：

1. 子類別 C_Inheirt的型別推論機制跟普通類別的型別機制一模一樣
2. 若變數 A 被註記之型別為父類別 C，A 除了可被指派 C 類別建構出來的物件外，子類別 C_Inherit 建構出來的物件也可以被指派到 A
3. 若變數 B 被註記之型別為子類別 C_Inherit —— 在 C_Inherit 繼承父類別 C 的過程中，並未額外定義 C 本身沒有的成員的條件下，父類別 C 所建構出來的東西可以被指派到變數 B

*
*********************************************************************************/

/********************************************************************************
*
          進階試測
*
*********************************************************************************/
// 定義兩種相似的類別
class C1 {
  constructor (public prop: string) {}

  public publicMethod (): string {
    return this.prop
  }
}

class C2 {
  constructor (public prop: string) {}

  public publicMethod (): string {
    return this.prop
  }
}

let someObject: C1 = new C2('Hello') // 過關 !!!

// 定義兩種相似的類別，但是有 private 模式
class AnotherC1 {
  constructor (public prop: string, private privateProp: number) {}

  public publicMethod (): number {
    return this.privateMethod()
  }

  private privateMethod (): number {
    return this.privateProp
  }
}

class AnotherC2 {
  constructor (public prop: string, private privateProp: number) {}

  public publicMethod (): number {
    return this.privateMethod()
  }

  private privateMethod (): number {
    return this.privateProp
  }
}

let anotherObject: AnotherC1 = new AnotherC2('Hello', 42) // 沒過 !!!

type TA = { hello: string }
type TB = { hello: string }

interface IA {
  hello: string
}

interface IB {
  hello: string
}

function logTypeA (obj: TA) {
  console.log(obj)
}

logTypeA(<TA>{ hello: 'World' })
logTypeA(<TB>{ hello: 'World' })
logTypeA(<IA>{ hello: 'World' })
logTypeA(<IB>{ hello: 'World' })

/********************************************************************************
*
重點  類別，型別等效理論

1. 若宣告兩個類別 C1 與 C2 —— 其中 C1 與 C2 的成員皆為 public 模式，並且所有的成員名稱對應型別皆相同，
TypeScript 判定 C1 型別等效於 C2 型別。

2. 只要結構ㄧ樣，管你是 Type 還是 Interface 只要格式ㄧ樣都通過，就算參數很明確只指定 TA 型別

*
*********************************************************************************/
