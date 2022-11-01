/********************************************************************************
*
          object inference (物件完整性推論)

          推論出來為 狹義物件
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
              object inference (物件包物件的推論)

              推論出來為 狹義物件

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

let obj3 = { hello: 'Another world' };
let obj4 = Object.assign(obj3, { goodbye: 'Another cruel world' });

// 不要隨隨便便用 Object.assign 找自己麻煩，建議用前一個範例的 Rest-Spread Operator 作為替代方案會是可以預期的結果
// 提示：想要讓這個範例動的話，可以先把 tsconfig.json 裡的 lib 選項啟動
//      並且填入 ["ES6", "DOM"]

/********************************************************************************
*
          object 型別註記

          object 變為 廣義物件

          筆記 : 如果直接註記為 object ， 無法直接修改裡面的值 ， 需要整個覆蓋

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
          上面測試的結論 :

          *** 不需要主動註記，TS 本身對於基礎物件的推論對開發者來說足矣。
          *** 畢竟 TS 推論狹義物件的結果，比起單純用 object 註記好太多了

          TS 認為 object 型別指的是任何 JS 物件（儘管格式不同）都可以被套入，
          但是不允許對該物件做細部微調（連覆寫某型別的值，其型別跟物件本身擁有屬性對應的型別相同，將那個值覆寫進去也不行！），
          要覆寫就得全部覆寫！
          這個概念跟 Immutable 感覺很像，我們不能輕易更改內部設定，要更新就得全部更上去。

假設 A 為某個被註記成 object 型別，則：

1. A 可以被任何廣義物件覆寫
2. A 一但被代入任何廣義物件，我們只能進行全面覆寫，不能進行微調動作，包含：新增屬性、改變屬性的值
3. A 一但被代入任何廣義物件，全面覆寫的格式不限定，只要屬於廣義物件都可以

* 狹義物件的定義：僅限於 JSON 格式的物件（典型的 {} 這種東西的寫法）
* 廣義物件的定義：包含 JSON 格式的物件、陣列、函式、類別、類別創建出之物件
*
*********************************************************************************/


/////// 進階踩雷測試 
// 因為上面結論定議　廣義物件後　沒有狹義的特性
// 測試把　狹義物件　改　廣義會如何　？？

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

// 值的型別要跟對應到該屬性接受的型別。

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


/********************************************************************************
*
重點 1. 基礎物件的型別推論機制
JS 物件的型別會按照物件本身的格式被推論出來

可以對物件做出的行為：
對物件裡的屬性覆寫值，其值的型別與該屬性對應的型別相同
對物件整體覆寫，其覆寫的物件格式必須完全相同

常見會被 TS 警告的情形有以下：
對物件裡的屬性插入或覆寫錯誤的型別值
覆寫整個物件時的格式錯誤（少一鍵 / 多一鍵 / 沒多沒少鍵，但至少其中一鍵對應值之型別錯誤）
隨意新增原先不存在該物件的屬性
物件的屬性若直接代入 Nullable Type，則不會被視為 any 型別，而是等同於該 Nullable Type 本身的值（undefined 型別的值就是 undefined；null 型別的值就是 null）


重點 2. 型別註記 object   ex  const A:object

1. A 可以被任何廣義物件覆寫
2. A 一但被代入任何廣義物件，我們只能進行全面覆寫，不能進行微調動作，包含：新增屬性、改變屬性的值
3. A 一但被代入任何廣義物件，全面覆寫的格式不限定，只要屬於廣義物件都可以


重點 3. 物件完整性定律

物件在被 TypeScript 推論的狀態下，不管 廣義、狹義物件 ，屬性不能被任意新增或更改成其他型別。能夠做的事情只有：

全面覆寫，物件的屬性對照型別格式也要完全對位

更改物件本身就擁有屬性對應的值，其中：要帶入的值的型態必須對應到該屬性的型態
我們稱這樣的行為為「保持物件的完整性」。

*
*********************************************************************************/