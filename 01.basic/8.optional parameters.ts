enum Gender {
  Male,
  Female,
  Other
}

type TestAccountInfo = {
  account: string
  password: string
  nickname: string | undefined
  birth: Date | undefined
  gender: Gender | undefined
  subscribed: boolean
}

// 依然出錯！
// let accountMaxwell: TestAccountInfo = {
//   account: 'nordic.wyvern',
//   password: '<hashed-password>',
//   subscribed: false
// };


type AccountInfo = {
  account: string
  password: string
  nickname?: string
  birth?: Date
  gender?: Gender
  subscribed: boolean
}

// type 改用 optional 就不會報錯
let accountMaxwell: AccountInfo = {
  account: 'nordic.wyvern',
  password: '<hashed-password>',
  subscribed: false
};


/********************************************************************************
*
          optional parameters example
*
*********************************************************************************/
let additionThreeAsDefault = function (num1: number, num2?: number) {
  if (num2) {
    return num1 + num2
  }
  return num1 + 3
}

type VehicleInfoWithOptionalElements = [string, string, string?, Date?]
