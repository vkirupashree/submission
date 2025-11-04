console.log("Hello World !")

//use isNaN
var b1=[5,3,"sriram",2];
let sum=0;
for(var i=0; i<b1.length;i++){
    if(!isNaN(b1[i])) sum+=b1[i];
}
console.log('sum is '+sum);

function history(name,friend="Sriram",age){
    console.log("Hi"+name+"your friend is"+friend+"your age is"+age);
}
history(" Shree ",undefined,"34");

function extendedHello(name, age, extra) {
    console.log("Hello " + name);
    if (age) {
        console.log("Your age is " + age );
    }
    if (extra) {
        console.log("Extra info: " + extra);
    }
}

extendedHello("Kirupashree");
extendedHello("hello", 45);
extendedHello("world", 23, "Extra");
console.log("-----------------------------------------------------")

let vals = [];

for (var x = 0; x < 4; x += 1) {
  vals.push(() => x);
}

console.log(vals.map(x => x()));

var s1 = Symbol('test');
var s2 = Symbol('test');
console.log(s1 == s2); // true
console.log("-----------------------------------------------------")
const js_obj = {
    name: "Sriram", age: 60, salary: 600,
    [Symbol.toPrimitive](hint) {
        if (hint === "string") return "Hint: Guess over 50";
        if (hint === "number") return Number(this.salary);
        return JSON.stringify(this);   // default
    }
}
 
console.log(js_obj);          // prints object normally
console.log(String(js_obj));  // capital S → triggers "string" hint

console.log("-----------------------------------------------------")

//class and parameter
 
// Base Character Class
class Character {
    constructor(name, power, side) {
        this.name = name;
        this.power = power;
        this.side = side;
    }
 
    toString() {
        return `${this.name} belongs to ${this.side} with power: ${this.power}`;
    }
}
//EXTENDING THE CLASS
// Hero Class
class Hero extends Character {
    constructor(name, power) {
        super(name, power, "Avengers"); // sending custom side to base class
    }
 
    toString() {
        return `${this.name} is a Hero of the ${this.side} with power: ${this.power}`;
    }
}
 
// Villain Class
class Villain extends Character {
    constructor(name, power) {
        super(name, power, "Villains of the Avengers");
    }
 
    toString() {
        return `${this.name} is a Villain from the ${this.side} with power: ${this.power}`;
    }
}
 
// Creating Avengers & Villains
const ironMan = new Hero("Iron Man", "Genius & Armor Suit");
const thor = new Hero("Thor", "Thunder God");
const thanos = new Villain("Thanos", "Infinity Gauntlet");
const loki = new Villain("Loki", "Magic & Trickery");
 
// Output
console.log(ironMan.toString());
console.log(thor.toString());
console.log(thanos.toString());
console.log(loki.toString());

console.log("-----------------------------------------------------")

var arr=['a','b','c']; for (var i in arr){ if (arr.hasOwnProperty(i)){ console.log(i); }}
console.log("------------------")
for (var i of arr) { console.log(i); }
console.log([..."abd"]); // ["a", "b", "d"]



console.log("-----------------------------------------------------")
// THE ITERATOR PROTOCOL
console.log("Iterator Protocol Example:");
function gen(n){
  return {
    [Symbol.iterator]() {
      let i = 0;
      return {
        next() {
          return {
            done: (i > n) ? true : false,
            value: i++
          };
        }
      };
    }
  };
}

for (let x of gen(3)) {
    console.log(x);
}
// Create the iterator
let it = gen(3)[Symbol.iterator]();

// Log each next() call
console.log(it.next()); // { value: 0, done: false }
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: 4, done: true }

console.log("-----------------------------------------------------")

const rating = [5, 4, 5];
let sum1 = 0;

const asyncSumFunction = async (a, b) => a + b;
const syncSumFunction = (a, b) => a + b;

rating.forEach(async (rating) => {
  sum1 = await asyncSumFunction(sum1, rating);
});

console.log(sum1);
console.log("-----------------------------------------------------")
let arrayLike = {
  0: "zero",
  1: "one",
  length: 2  // fixed typo: 'lenghth' → 'length'
};

// Convert to array
const arra = Array.from(arrayLike);

console.log(arra);

console.log("-----------------------------------------------------")

const arr1 = ['a', 'b', 'c'];

// 1️⃣ Keys iterator
const keysIterator = arr1.keys();
console.log("Keys iterator:", keysIterator);          // Array Iterator {}
console.log("Keys array:", [...keysIterator]);        // [0, 1, 2]

// 2️⃣ Values iterator
const valuesIterator = arr1.values();
console.log("Values iterator:", valuesIterator);      // Array Iterator {}
console.log("Values array:", [...valuesIterator]);    // ['a', 'b', 'c']

// 3️⃣ Entries iterator
const entriesIterator = arr1.entries();
console.log("Entries iterator:", entriesIterator);    // Array Iterator {}
console.log("Entries array:", Array.from(entriesIterator)); // [[0,'a'], [1,'b'], [2,'c']]

const arr2 = [4, 100, 7];
const result = arr2.find(x => x > 5);
console.log(result);
console.log("-----------------------------------------------------")

let k = { a: 1 };
Object.assign(k, { b: 2 });
console.log(k);
console.log("-----------------------------------------------------")
// Map Example
var m = new Map([
  [1, 'first'],
  [{}, 'second'] // second key is an object
]);
m.set(x => x + 1, 'third')// third key is a function
.set({}, 'fourth'); // fourth key is another object

console.log(m);
console.log("---------------------")

let m1 = new Map([...'abcd'].map(x => [x, x + x]));

// Convert Map to arrays for inspection
console.log(JSON.stringify([...m1]));        // All entries
console.log(JSON.stringify([...m1.keys()])); // Keys only
console.log(JSON.stringify([...m1.values()])); // Values only
console.log(JSON.stringify([...m1.entries()])); // Entries (same as [...m1])


console.log("-----------------------------------------------------")
// Set Example
let s = new Set(['red', 'blue']);

// Add elements
s.add('yellow');
s.add('red'); // duplicate, ignored

// Check size
console.log(s.size); // ?

// Check if it has 'blue'
console.log(s.has('blue')); // ?

// Delete 'blue'
s.delete('blue');

// Check size again
console.log(s.size); // ?

// Inspect set
console.log(s);

// Convert to array
console.log([...s]);


console.log("-----------------------------------------------------")
// Generator Example
function* genFour() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

let four = genFour();

console.log(four.next()); // { value: 1, done: false }
console.log(four.next()); // { value: 2, done: false }
console.log(four.next()); // { value: 3, done: false }
console.log(four.next()); // { value: 4, done: true }
console.log(four.next()); // { value: undefined, done: true }


console.log("-----------------------------------------------------")
function* flatter(arr2) {
    for (let y of arr2) {
        if (y instanceof Array) {
            // Recursively yield all elements of nested array
            yield* flatter(y);
        } else {
            yield y;
        }
    }
}

let t = flatter([1, 2, [3, 4]]);

console.log(t.next()); // { value: 1, done: false }
console.log(t.next()); // { value: 2, done: false }
console.log(t.next()); // { value: 3, done: false }
console.log(t.next()); // { value: 4, done: false }
console.log(t.next()); // { value: undefined, done: true }
for (let v of flatter([1, 2, [3, 4]])) {
    console.log(v);
}

console.log("-----------------------------------------------------")

let reverse = ([p, ...y]) => (y.length > 0) ? [...reverse(y), p] : [p];
reverse([1, 2, 3, 4, 5, 6]);

let [p, ...y] = [1, 2, 3, 4, 5, 6];

console.log(p); // 1
console.log(y); // [2, 3, 4, 5, 6]

console.log("-----------------------------------------------------")




