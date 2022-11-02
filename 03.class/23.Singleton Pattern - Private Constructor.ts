/********************************************************************************
*
私有建構子 Private Constructor

私有建構子 —— 顧名思義，就是將類別的建構子設定成 private 模式。
若某類別 C，其建構子設定成 private 模式
我們不能夠從該類別 C 進行建構物件的動作：new C( 參數 ) ，此動作在類別的外部不能被使用

*
*********************************************************************************/

/* 擁有私有建構子的類別範例 */
class ConstructIsForbidden {
  private constructor (/* 參數 */) {
    /* 初始化物件的成員 */
  }
}

// 會被 TypeScript 叫！
// let forbiddenObject = new ConstructIsForbidden();

/* 簡單的單例模式示範 Singleton Pattern */
class SingletonPerson {
  // 該私有建構子裡面，具有某人的基本資料
  // 其中，儘管裡面的資料是開放的，但都是唯讀的狀態
  private constructor (
    public readonly name: string,
    public readonly age: number,
    public readonly hasPet: boolean
  ) {}

  // 定義一個私有靜態屬性，存放此類別建構的物件資料
  private static Instance: SingletonPerson = new SingletonPerson(
    'Maxwell',
    20,
    false
  )

  // 定義一個公用靜態方法，負責回傳存放在此類別唯一的物件資料
  static getInstance (): SingletonPerson {
    return this.Instance
  }
}

// 取得單例模式的類別下建構出來的唯一物件
const uniquePerson = SingletonPerson.getInstance()

console.log(uniquePerson) // SingletonPerson { name: 'Maxwell', age: 20, hasPet: false }
console.log(uniquePerson.name) // Maxwell
console.log(uniquePerson.age) // 20 
console.log(uniquePerson.hasPet) // false


/********************************************************************************
*
          懶漢模式 
*
*********************************************************************************/
class LazySingletonPerson {
  private constructor (
    public readonly name: string,
    public readonly age: number,
    public readonly hasPet: boolean
  ) {}

  private static Instance: LazySingletonPerson | null = null

  static getInstance (): LazySingletonPerson {
    // 若是第一次呼叫，Instance 必為 null，因此進行單子的初始化
    if (this.Instance === null) {
      this.Instance = new LazySingletonPerson('Maxwell', 20, false)
    }

    return this.Instance
  }
}

class LazySingletonC {
  private constructor (/* 成員變數或參數 */) {
    /* 物件初始化成員的過程 */
  }

  // 將 Instance 一開始的值設定為 null
  private static Instance: LazySingletonC | null = null

  // 如果是第一次呼叫 getInstance 才會建構物件
  static getInstance (): LazySingletonC {
    if (this.Instance === null) {
      this.Instance = new LazySingletonC(/* 參數 */)
    }

    return this.Instance
  }
}


/********************************************************************************
*
          單例模式的意義與注意事項

確保某物件（單子）在任何地方的單一性，並且針對該物件提供統一的成員方法。

在多執行緒下的環境，必須確保單例模式下的類別，
不會因為兩個執行緒以上同時讀到類別裡 —— 建構物件的表達式而違反單例模式的初衷。

另外，對單例模式的類別進行繼承的動作，並不違反單例模式的初衷。在單例模式下運用繼承的目的有二：

1. 子類別可以擴充該個體的功能（可能擴充靜態方法等）
2. 多個子類別的單例物件可以在程式中隨時抽換

最後，建議不要將單例模式的建構子函式設定成 protected 模式，
因為這並不是設計模式原著主張的東西，而是網路偏方。

*
*********************************************************************************/