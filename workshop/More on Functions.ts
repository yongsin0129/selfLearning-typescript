/********************************************************************************
*
          Construct Signatures
*
*********************************************************************************/

type SomeObject = any

type SomeConstructor = {
  new (s: string): SomeObject
}

function fn (ctor: SomeConstructor) {
  return new ctor('hello')
}

// class greet {
//   intro: string
//   constructor (intro: string) {
//     this.intro = intro
//   }
// }

// 上面那種寫法的簡化版
class greet {
  constructor (public intro: string) {}
}

console.log(fn(greet))
console.log(new greet('1'))

/********************************************************************************
*
Some objects, like JavaScript’s Date object, 
can be called with or without new. 

You can combine call and construct signatures in the same type arbitrarily:
*
*********************************************************************************/

interface CallOrConstruct {
  new (s: string): Date
  (n?: string): string
}

function newDate (cons: CallOrConstruct, something: string) {
  return new cons(something)
}

function callDate (cons: CallOrConstruct, something: string) {
  return cons(something)
}


/********************************************************************************
*
          using interface to implements constructor

          https://stackoverflow.com/questions/61666716/typescript-class-unable-to-implement-simple-interface-with-constructor


This is a miss understanding of what implements does. implements ensures that the instance type of the class fulfills the contract specified by the interface. The constructor of the class is not part of the instance type, it is part of the class type (the static part of the class).

You need to segregate the static part of the interface form the instance part:
*
*********************************************************************************/
interface ConsEntity {
  date: string
  num(n?: string): string
}

interface ConsClass {
  new (date: string): ConsEntity
}

class cons implements ConsEntity {
  constructor (public date: string) {}
  num (date?: string) {
    return date ? date : 'date'
  }
}

let consClass: ConsClass = cons

console.log(new cons(Date()))
const today = new cons(Date())
today.num(Date())
