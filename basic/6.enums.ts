enum WeekDay {
  Sunday = 7,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}

// 語法錯誤！
// enum WeekDay = { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday };

let weekDayOfBirthday = WeekDay.Monday

let TGIF: WeekDay = WeekDay.Friday
console.log(TGIF)
// 結果為 5

let valueOfTGIF = WeekDay[TGIF]
console.log(valueOfTGIF)
// 結果為 Friday
