/* 陽春的交通票務系統 */

// 使用列舉定義我們的車票種類
enum TransportTicketType {
  Train, // 坐火車
  MRT, // 捷運
  Aviation // 航空
}

// 使用元組：依順序分別代表小時、分鐘與秒鐘
type TimeFormat = [number, number, number]

// 定義名為交通的類別
class TicketSystem {
  constructor (
    private type: TransportTicketType,
    protected startingPoint: string,
    protected destination: string,
    private departureTime: Date
  ) {}

  // 計算交通的間隔時間
  protected deriveDuration (): TimeFormat {
    // 因為交通方式有三種，所以我們選擇先寫死
    return [1, 0, 0]
  }

  // 計算交通的抵達時間
  private deriveArrivalTime (): Date {
    const { departureTime } = this

    // 從間隔時間導出總共間隔的微秒數
    const [hours, minutes, seconds] = this.deriveDuration()
    const durationSeconds = hours * 60 * 60 + minutes * 60 + seconds
    const durationMilliseconds = durationSeconds * 1000

    // 導出抵達時間
    const arrivalMilliseconds = departureTime.getTime() + durationMilliseconds
    return new Date(arrivalMilliseconds)
  }

  // 印出交通票券的詳細內容
  public getTicketInfo () {
    // 根據 Day 07. 提到的列舉的反射性
    // 可以反向由值推回列舉的鍵的名稱！
    const ticketName = TransportTicketType[this.type]
    const arrivalTime = this.deriveArrivalTime()

    console.log(`
      Ticket Type: ${ticketName}
      Station:     ${this.startingPoint} - ${this.destination}
      Departure:   ${this.departureTime}
      Arrival:     ${arrivalTime}
    `)
  }
}

//開一張票
const randomTicket = new TicketSystem(
  // 這是火車票！
  TransportTicketType.Train,

  // 啟程地點
  'Tainan',

  // 抵達終點
  'Kaohsiung',

  // 啟程時間 2019/09/01 早上 9 點 00 分 00 秒
  new Date(2019, 8, 1, 9, 0, 0)
)

// randomTicket.getTicketInfo();

/********************************************************************************
*
          開一張火車票 , 繼承 TicketSystem
*
*********************************************************************************/

/* 使用類別繼承創造火車票券類別 */
type TrainStation = {
  name: string
  nextStop: string
  duration: TimeFormat
}

class TrainTicket extends TicketSystem {
  // 子類別的建構子函式
  constructor (
    startingPoint: string,
    destination: string,
    departureTime: Date
  ) {
    // 使用 super 將初始化值傳到父類別的建構子函式裡 需要 4 個 argument
    super(TransportTicketType.Train, startingPoint, destination, departureTime)
  }

  private stops: string[] = [
    'Pingtung',
    'Kaohsiung',
    'Tainan',
    'Taichung',
    'Hsinchu',
    'Taipei'
  ]

  private stationsDetail: TrainStation[] = [
    { name: 'Pingtung', nextStop: 'Kaohsiung', duration: [2, 30, 0] },
    { name: 'Kaohsiung', nextStop: 'Tainan', duration: [1, 45, 30] },
    { name: 'Tainan', nextStop: 'Taichung', duration: [3, 20, 0] },
    { name: 'Taichung', nextStop: 'Hsinchu', duration: [2, 30, 30] },
    { name: 'Hsinchu', nextStop: 'Taipei', duration: [1, 30, 30] }
  ]

  private isStopExist (stop: string): boolean {
    for (let i = 0; i < this.stops.length; i += 1) {
      const existedStop = this.stops[i]
      if (existedStop === stop) return true
    }

    return false
  }

  protected deriveDuration (): TimeFormat {
    // 我們必須取得啟程站與抵達站
    const { startingPoint, destination } = this

    // 先確保車站的站點是合理的
    if (this.isStopExist(startingPoint) && this.isStopExist(destination)) {
      let time: TimeFormat = [0, 0, 0]
      let stopFound = false

      /* 1. 開始進行站點間的運算 */
      for (let i = 0; i < this.stationsDetail.length; i += 1) {
        const detail = this.stationsDetail[i]

        // 啟程站還未找到但是名稱對應到時開始累計交通時間
        if (!stopFound && detail.name === startingPoint) {
          stopFound = true
          time[0] += detail.duration[0]
          time[1] += detail.duration[1]
          time[2] += detail.duration[2]
        }

        // 早已找到啟程站
        else if (stopFound) {
          // 繼續累計交通時間
          time[0] += detail.duration[0]
          time[1] += detail.duration[1]
          time[2] += detail.duration[2]

          // 然而，若下一站為終點站則跳出迴圈不再累計
          if (detail.nextStop === destination) break
        }
      }

      /* 2. 將時間轉換成合理的格式 */
      // 每六十秒轉一分鐘
      let minutes = Math.floor(time[2] / 60)
      time[1] += minutes
      time[2] -= minutes * 60

      // 每六十分鐘轉一小時
      let hours = Math.floor(time[1] / 60)
      time[0] += hours
      time[1] -= hours * 60

      // 回傳時間的格式 TimeFormat
      return time
    }

    // `never` 型別的例外，參見 Day 10.
    throw new Error('Wrong stop name! Please check again!')
  }
}


// 結果測試

const trainTicket = new TrainTicket(
  // 啟程自台南
  'Tainan',

  // 終點到新竹
  'Hsinchu',

  // 發車時間為 2019/09/01 早上 9:00
  new Date(2019, 8, 1, 9, 0, 0)
)

trainTicket.getTicketInfo();
//      Ticket Type: Train
//      Station:     Tainan - Hsinchu
//      Departure:   Sun Sep 01 2019 09:00:00 GMT+0800 (台北標準時間)
//      Arrival:     Sun Sep 01 2019 14:50:30 GMT+0800 (台北標準時間)




/********************************************************************************
*
          使用 super 的注意事項 
*
*********************************************************************************/

// 父類別擁有三個成員變數
class TestParentClass {
  constructor (public p1: number, public p2: string, public p3: boolean) {}
}

// 子類別繼承父類別，並且呼叫 super 進行初始化物件的動作
class TestChildClass1 extends TestParentClass {
  constructor (p1Child: number, p2Child: string, p3Child: boolean) {
    super(p1Child, p2Child, p3Child)
  }
}

const objFromChildClass1 = new TestChildClass1(123, 'Hello', true)
console.log(objFromChildClass1);

// 子類別繼承父類別，但是沒有實踐建構子函式
class TestChildClass2 extends TestParentClass {}

// 請仔細查看這一行出現的錯誤訊息：
const objFromChildClass2 = new TestChildClass2();

const objFromChildClass3 = new TestChildClass2(123, 'Hello', true);
console.log(objFromChildClass3)