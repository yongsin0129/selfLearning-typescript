/********************************************************************************
*
          type 的使用方法
*
*********************************************************************************/

type MathOperator = (n1: number, n2: number) => number

// 正確結果！
let powerOp: MathOperator = function (n1: number, n2: number) {
  return n1 ** n2
}

// 錯誤：型別錯誤！
// let wrongPowerOp1: MathOperator = function (n1: string, n2: string) {
//   return n1 ** n2;
// };

// 錯誤：函式型別之回傳型別錯誤！
// let wrongPowerOp2: MathOperator = function (n1: number, n2: number) {
//   return (n1 ** n2).toString();
// };


// 變數被型別化名註記過後，Implicit `any` 被化解
let powerOpWithNoParamsAnnotation: MathOperator = function (n1, n2) {
  return n1 ** n2
}

// 會出現錯誤！
// powerOpWithNoParamsAnnotation(
//   '123',
//   '456'
// );

/********************************************************************************
*
          狹義物件的明文型別之化名


完整性定律：保持物件之完整性的成立條件在於
不隨便新增該物件原本就沒有的屬性
不指派錯誤型別的值覆寫到物件的屬性
不指派錯誤物件格式的值覆寫整個物件
*
*********************************************************************************/

type PersonInfo = {
  name: string
  age: number
  hasPet: boolean
}

let infoAboutMaxwell: PersonInfo = {
  name: 'Maxwell',
  age: 20,
  hasPet: false
}

// 隨便新增屬性會出錯！
// infoAboutMaxwell.newInfo = 'Graduated from NTUST';

// 更改屬性值，型別對就可以接受！
infoAboutMaxwell.hasPet = true

// 更改屬性值，型別錯就GG！
// infoAboutMaxwell.hasPet = 'Doggie & Kittie';

// 全面覆寫，格式正確就放心！
infoAboutMaxwell = {
  name: 'Alexius',
  age: 18,
  hasPet: true
}

// 全面覆寫，格式錯誤就傷心！
// infoAboutMaxwell = {
//   firstName: 'Maxwell',
//   graduated: true,
//   age: 20,
//   hasPet: false,
// };



/********************************************************************************
*
          function 內的參數 註記 type 測試
*
*********************************************************************************/
function printInfo (info: PersonInfo) {
  console.log(`Name: ${info.name}`)
  console.log(`Age: ${info.age}`)
  console.log(`Has Pet? ${info.hasPet}`)
}

// 物件的形式沒有被積極註記為 PersonalInfo，直接
// 將值暴力帶入函式作為參數 => 驗證錯誤！
// printInfo({
//   name: 'Martin',
//   age: 28,
//   hasPet: true,

//   hello: 'world',
//   nothingSpecial: null,
// });

// 物件的形式存入變數，其中該變數沒有被積極註記為
// PersonInfo，該變數卻被代入函式作為參數 => 竟然通過！？
let infoAboutMartin = { // 所以這邊需要積極註記 !!!!!!  infoAboutMartin : PersonInfo
  name: 'Martin',
  age: 28,
  hasPet: true,

  hello: 'world',
  nothingSpecial: null
}

printInfo(infoAboutMartin)


/********************************************************************************
*
結論 :

若某變數 A 儲存某物件值，其中 A 沒有被積極註記（因此 TypeScript 會對 A 作型別推論，推論出 A 的明文型別格式）。

另外，若變數 A 作為某函式（或方法）的參數，其中該參數有型別 T，
則 TypeScript 只會針對 A 的格式至少符合型別 T（屬性型別對應正確、少一鍵不行但多一鍵以上都可以）
，則變數 A 通過該型別 T 的檢測。


心得 :　積極註記　不然就會踩坑
*
*********************************************************************************/
