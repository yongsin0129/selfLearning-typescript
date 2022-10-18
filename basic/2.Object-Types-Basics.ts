/********************************************************************************
*
          object inference (物件完整性推論)
*
*********************************************************************************/

let info = {
  name: 'Maxwell',
  age: 20,
  hasPet: false
}

let someone = {
  knows: undefined,
  identity: null
}

// 第一情況：屬性值被錯誤的型別插入干擾
// 先確認屬性是否能代入值，其值對應正確的型別 => PASS！
info.name = 'Martin'
info.age = 24
info.hasPet = true

someone.knows = undefined
someone.identity = null

// 確認屬性被錯誤型別的值干擾 => 錯誤！
// info.name = false;
// info.age = null;
// info.hasPet = 'Doggie with Mustache!';

// someone.knows = 'Nothing';
// someone.identity = 'John Snow';

// 第二情況：整個物件分別被正確或者是錯誤的物件格式複寫
// 格式正確
// info = {
//   name: 'Martin',
//   age: 24,
//   hasPet: true
// };

// 格式錯誤 - 少了一個鍵
// info = {
//   name: 'Martin',
//   age: 24,
// };

// 格式錯誤 - 多了一個鍵
// someone = {
//   knows: undefined,
//   identity: null,
//   loves: 'Ygritte',
// };

// 第三情況：直接對物件新增或刪除值
// 新增屬性 - 出錯
// info.job = 'Engineer';

// 刪除屬性 - 出錯 : The operand of a 'delete' operator must be optional.ts(2790)
// delete info.age;

/********************************************************************************
*
* -------------- 試試看推論以下 3 種範例 ----------------- *
          
*
*********************************************************************************/

//////////////////////////////////////////// 1. 物件包物件
let nestedObject = {
  prop: 'Hello',
  child: {
    prop1: 123,
    prop2: false
  }
}

///////////////////////////////////////// 2. Rest-Spread
let obj1 = { hello: 'world' }
let obj2 = { ...obj1, goodbye: 'Cruel World' }

///////////////////////////////////////// 3. Object.assign

// let obj3 = { hello: 'Another world' };
// let obj4 = Object.assign(obj3, { goodbye: 'Another cruel world' });
// 提示：想要讓這個範例動的話，可以先把 tsconfig.json 裡的 lib 選項啟動
//      並且填入 ["es2015", "dom"]

/********************************************************************************
*
          object 的 覆蓋
*
*********************************************************************************/
let justAnObject: object = { hello: 'World' }

// 我們認為可能正確的情況 => 錯誤 : Property 'hello' does not exist on type 'object'.ts(2339)
// justAnObject.hello = 'Max';

// 測試情況一：覆寫錯誤型別的值 => 錯誤
// justAnObject.hello = null;

// 測試情況二：完全覆寫錯誤格式 => PASS!
justAnObject = { goodbye: 'Cruel World' }

// 測試情況三：無緣無故亂加 Key => 錯誤 : Property 'newProp' does not exist on type 'object'.ts(2339)
// justAnObject.newProp = 123;

// 測試：完全以其他的物件覆寫
// 以原始型態覆寫（預期會出錯，畢竟不是物件）=> 錯誤
// justAnObject = 123;

// 以陣列覆寫 => PASS!
justAnObject = [1, '2', 3, '4', 5, true, { hello: 'world ' }]

// 以函數來覆寫 => PASS!
justAnObject = function () {
  console.log('Oh my goddddddd!?!?')
}

// 以各種物件表示來覆寫 => PASS!
justAnObject = new Object()

// 以看起來是原始型態的東西但是用創建物件的方式覆寫 => PASS!
justAnObject = new String("Who am I!? I'm a String or Object!?")
justAnObject = new Number(42)

// 直接用類別名稱複寫 => PASS!
justAnObject = Object
justAnObject = Array


/********************************************************************************
*
          進階踩雷測試 // 定義一系列隸屬 JS 的物件讓 TS 來推論
*
*********************************************************************************/
let arrayObject = [1, 2, 3, 4, 5]
let functionObject = function () {
  console.log('Again!?')
}
let objectObject = new Object()
let primitiveObject = new String(
  'What does the fox say? Ding!Ding!Ding!Ding!Ding!~'
)
let classItself = Object

// 根據物件完整性理論推測：以下應該要被 TS 警告！
// arrayObject.customProp = 123           // Property 'customProp' does not exist on type 'number[]'.ts(2339)
// functionObject.customProp = 456        // Property 'customProp' does not exist on type '() => void'.ts(2339)
// objectObject.customProp = 'Huh?'       // Property 'customProp' does not exist on type 'Object'.ts(2339)
// primitiveObject.customProp = 'Bird says: Chuchuchuchuchuchuchuchuchuchu!~' // Property 'customProp' does not exist on type 'String'.ts(2339)
// classItself.customProp = 3.1415926     // Property 'customProp' does not exist on type 'ObjectConstructor'.ts(2339)

// 根據物件完整性理論推測：以下應該不會怎麼樣，只是被我們（惡意）竄改
// 注意喔！值的型別要跟對應到該屬性接受的型別。這裡筆者還沒教到函式與陣列型別，不過暫且先跟

// 讀者說明：
//
// 函式的型別組成包含 input 對應 output，姑且先舉個簡單的例子。
//
// Array.prototype.pop 方法沒有任何 input，但 output 可能是任意值，但由於陣列的特性，
// 我們的陣列在 `arrayObject` 裡面全部都是數字，因此型別為 `number[]`，於是乎 pop 方法
// 的函式型別理應來說是 input 為空，output 為 number：() => number
//
// 因此我們如果將 pop 複寫為以下方式，則不會出現警告喔：
arrayObject.pop = function () {
  return 123
}

// 如果你改錯成其他型別一樣，譬如在這個案例裡 Return 為空或者是非 `number` 型別，
// 則會被 TS 嫌棄，以下這兩種就是：
// arrayObject.pop = function() { console.log('Returns nothing!'); } // Type '() => void' is not assignable to type '() => number | undefined'.

// arrayObject.pop = function() { return 'string'; } // Type '() => string' is not assignable to type '() => number | undefined'.
