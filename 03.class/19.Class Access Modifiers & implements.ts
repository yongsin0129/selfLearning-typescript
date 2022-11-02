/********************************************************************************
*
存取修飾子 Access Modifiers
存取修飾子總共分為三種模式：public、private 以及 protected

存取修飾子可以調整成員變數（Member Variables）與方法（Member Methods）在類別裡面與類別外部的使用限制。

類別在宣告時，若成員變數或方法沒有被註記上存取修飾子，預設就是 public 模式。
若宣告某類別 C，則裡面的成員變數 P 或成員方法 M 被註記為：

public 模式時：P 與 M 可以任意在類別內外以及繼承 C 的子類別使用
private 模式時：P 與 M 僅僅只能在當前類別 C 內部使用
protected 模式時： P 與 M 除了當前類別 C 內部使用外，繼承 C 的子類別也可以使用

若宣告某類別 C，其中該類別有明確實踐（implements）某介面 I，
則類別 C 必須實踐所有介面 I 所提供的格式 —— 
而介面 I 的規格轉換成為類別 C 時 —— 成員變數與方法皆必須為 public 模式
(interface 如果有定義包含 private 屬性的東西事實上是不合理的！)

意義 : 限制成員變數或方法被呼叫的權限。

*
*********************************************************************************/

/* 提款機範例 */
// 定義每一個使用陽春的提款機的用戶的資訊
type TUserAccount = {
  account: string
  password: string
  money: number
}

// 定義陽春的提款機介面的帳戶管理系統
interface AccountSystem {
  // 登入系統，必須填入帳戶與密碼
  signIn(account: string, password: string): void

  // 登出系統
  signOut(): void
}

// 定義陽春的提款機介面的交易系統
interface TransactionSystem {
  // 存錢錢，裡面填入要存錢的量
  deposit(amount: number): void

  // 提領錢錢，裡面填入要提錢的量
  withdraw(amount: number): void
}

// 定義陽春的提款機介面的完整系統
interface ICashMachine extends TransactionSystem, AccountSystem {}

// 實踐 ICashMachine 介面
class CashMachine implements ICashMachine {
  // 假設我們有這些使用者
  private users: TUserAccount[] = [
    { account: 'Maxwell', password: '123', money: 12345 },
    { account: 'Martin', password: '456', money: 54321 },
    { account: 'Chairman Guo.', password: '789', money: 1000000000 }
  ]

  private currentUser: TUserAccount | undefined

  public signIn (account: string, password: string) {
    // 因為 Array.prototype.find 是 ES6 語法，暫時先用 ES5 的方式處理
    for (let i = 0; i < this.users.length; i += 1) {
      const user = this.users[i]
      if (user.account === account && user.password === password) {
        this.currentUser = user
        break
      }
    }

    if (this.currentUser === undefined) {
      throw new Error('User not found!')
    }
  }

  public signOut () {
    // 清除目前的使用者
    this.currentUser = undefined
  }

  public deposit (amount: number) {
    if (this.currentUser !== undefined) {
      this.currentUser.money += amount
    } else {
      throw new Error('No user signed in!')
    }
  }

  public withdraw (amount: number) {
    if (this.currentUser !== undefined) {
      this.currentUser.money -= amount
    } else {
      throw new Error('No user signed in!')
    }
  }
}

function printAccountInfo (input: TUserAccount | undefined) {
  if (input === undefined) {
    console.log('No user found!')
  } else {
    console.log(`
      Current User: ${input.account}
      Money: ${input.money}
    `)
  }
}

// 初始化新的提款機
const machine = new CashMachine()
// console.log('Initialized: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！

// 登入過後
machine.signIn('Maxwell', '123')
// console.log('Signed In: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！

// 提款 5000 過後
machine.withdraw(5000)
// console.log('After Withdrawal: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！

// 登出過後
machine.signOut()
// console.log('Signed Out: ');
// printAccountInfo(machine.currentUser); <-- 因為 currentUser 變成 private 模式，不能在外面被呼叫！
