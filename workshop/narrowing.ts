/********************************************************************************
*
          Using type predicates
*
*********************************************************************************/
type Fish = { name: string; swim: () => void }
type Bird = { name: string; fly: () => void }

function isFish (pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

function isBird (pet: Fish | Bird): pet is Bird {
  return (pet as Bird).fly !== undefined
}

function getSmallPet (): Fish | Bird {
  const randomNumber = Math.random() * 10
  if (randomNumber < 5) return { name: 'vincent', swim () {} }
  else return { name: 'vincent', fly () {} }
}

// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet()
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()]
const underWater1: Fish[] = zoo.filter(isFish)
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[]
// // The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === 'sharkey') return false
  return isFish(pet)
})

console.log('underWater1', underWater1)
console.log('underWater2', underWater2)
console.log('underWater3', underWater3)

/********************************************************************************
*
          Discriminated unions , 
*
*********************************************************************************/
interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'square'
  sideLength: number
}

type Shape = Circle | Square

function getArea (shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2

    case 'square':
      return shape.sideLength ** 2
  }
}

// TypeScript will use a never type to represent a state which shouldn’t exist.

interface Triangle {
  kind: 'triangle'
  sideLength: number
}

// type Shape = Circle | Square | Triangle

// function getArea (shape: Shape) {
//   switch (shape.kind) {
//     case 'circle':
//       return Math.PI * shape.radius ** 2

//     case 'square':
//       return shape.sideLength ** 2

//     default:
//       const _exhaustiveCheck: never = shape // Type 'Triangle' is not assignable to type 'never'.
//       return _exhaustiveCheck
//   }
// }
