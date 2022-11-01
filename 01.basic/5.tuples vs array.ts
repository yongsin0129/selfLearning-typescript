/********************************************************************************
*
          元組 tuples 的定義與型別推論
*
*********************************************************************************/
// type Vehicle = [string, string, string, Date];
// type : 三種註記法
let BMWMotor: Vehicle = ['BMW', 'motorcycle', 'silver', new Date(2019, 2, 17)]
// 這邊如果不加 : Vehicle 的話
// BMWMotor 會用 array 推論為 : let BMWMotor: (string | Date)[]
let JaguarOffRoad = <Vehicle>[
  'Jaguar',
  'off-road',
  'royal-blue',
  new Date(2019, 1, 9)
]
let ToyotaRV = [
  'Toyota',
  'recreational',
  'ivory-white',
  new Date(2019, 3, 15)
] as Vehicle

// type 放的位置沒有前後之分，都讀的到
type Vehicle = [string, string, string, Date]

/********************************************************************************
*
重點  陣列與元組的差異

型別陣列裡，只要裡面的元素之型別為此陣列規定的範疇內（比如說 (number | string)[] 只能存取數字跟字串），除了沒有限定元素的數量外，順序也不限定； ex : let BMWMotor: (string | Date)[]

元組型別則是除了元素的個數必須固定外，格式必須完全吻合，因此裡面元素型別的順序也是固定。
ex : let BMWMotor: Vehicle  type Vehicle = [string, string, string, Date]

*
*********************************************************************************/

// type Vehicle = [string, string, string, Date];
// 少一個元素：錯誤！
// let v1: Vehicle = ['Honda', 'motorcycle', 'red'];

// 多一個元素：錯誤！
// let v2: Vehicle = ['Gogoro', 'scooter', 'white', new Date(2019, 4, 27), 'electrical'];

// 單純型別沒有符合：錯誤！
// let v3: Vehicle = ['Tesla', 'electric', 'sapphire', '2019-08-14'];

// 型別順序錯置：錯誤！
// let v4: Vehicle = ['Prosche', 'race', new Date(2019, 7, 21), 'carbon-black'];

// 完全對前三個同為 `string` 型別的值對調，儘管意義上錯誤，但 TS 還是不鳥你 ~
let WTFVehicle: Vehicle = ['taxi', 'yellow', 'Toyota', new Date(2019, 6, 12)]
