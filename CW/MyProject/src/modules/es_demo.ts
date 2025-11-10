console.log("***************************************************");
console.log("Arrow Functions & Timers");
 
class TimerV1 {
  start(): void {
    const self = this;
    setInterval(function () {
      console.log(self);
    }, 1000);
  }
}
 
class TimerV2 {
  start(): void {
    setInterval(function (this: TimerV2) {
      console.log(this);
    }.bind(this), 1000);
  }
}
 
class TimerV3 {
  start(): void {
    setInterval(() => {
      console.log(this);
    }, 1000);
  }
}
 
const inc = (): number => 7;
console.log("Arrow fn ==> " + inc());
 
console.log("***************************************************");
console.log("Misc Functions");
 
const reverse = <T extends NonNullable<unknown>>(val: T[]): T[] => {
  if (val.length === 0) return [];
  const [x, ...y] = val;
  return [...reverse(y), x as T];
};
 
console.log(reverse([1, 2, 3, 4, 5, 6]));
 
const [, , ...y2]: number[] = [1, 2, 3, 4, 5];
console.log(y2);
 
function* squares(n: number): Generator<number> {
  for (let i = 1; i < n; i++) yield i * i;
}
 
console.log([...squares(6)]);
console.log("Int array reverse:", reverse([1, 2, 3, 4]));
console.log("String reverse:", reverse("sriram".split("")));
console.log("Fn result reverse:", reverse([...squares(10)]));
console.log(
  "Reverse of a number:",
  reverse((57 + "").split("")).join("")
);
 
console.log("***************************************************");
console.log("Arrays & Array-like");
 
interface ArrayLikeStr {
  [key: number]: string;
  length: number;
}
 
let arrayLike: ArrayLikeStr = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  length: 4
};
 
console.log(Array.from(arrayLike));
 
// Define somecode to generate numbers
const somecode = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i);
 
console.log(Array.from(somecode(20), x => x * x));
console.log("Array.of:", Array.of(1, 3, 4, 6));
 
console.log("***************************************************");
console.log("Iterable Keys & Values");
 
let objarrit = ['a', 'b', 'c'].keys();
let res = objarrit.next();
 
while (!res.done) {
  console.log(res.value);
  res = objarrit.next();
}
 
let objarr = [...['a', 'b', 'c'].keys()];
console.log(objarr);
 
let objEntries = Array.from(['a', 'b', 'c'].entries());
console.log(objEntries);
 
console.log("***************************************************");
console.log("Objects, Maps & Sets");
 
let objAssign = { a: 1 };
Object.assign(objAssign, { b: 2 });
console.log(objAssign);
 
const map = new Map<unknown, string>([
  [1, "first"],
  [{}, "second"]
]);
 
map
  .set((x: number) => x + 1, "third")
  .set({}, "fourth");
 
const key = {};
console.log("get Key:", map.get(key));
 
map.forEach((val, key) => {
  console.log(`Key: ${String(key)}, Val: ${val}`);
});
 
console.log("AS JSON full:", JSON.stringify([...map]));
console.log("AS JSON keys:", JSON.stringify([...map.keys()]));
console.log("AS JSON values:", JSON.stringify([...map.values()]));
console.log("AS JSON entries:", JSON.stringify([...map.entries()]));
 
console.log("***************************************************");
console.log("Generators - Flatten");
 
function* flatten<T>(arr: (T | T[])[]): Generator<T> {
  for (let x of arr) {
    if (Array.isArray(x)) {
      yield* flatten(x);
    } else {
      yield x;
    }
  }
}
 
let t = flatten([1, 2, [3, 4]]);
let fr = t.next();
while (!fr.done) {
  console.log("Flatten:", fr.value);
  fr = t.next();
}
 
function* inner(): Generator<string> {
  yield "a";
  yield "b";
}
 
function* outer(): Generator<string | number> {
  yield 1;
  yield* inner();
  yield 2;
}
 
for (const val of outer()) {
  console.log("Delegate yield:", val);
}
 
console.log("***************************************************");
console.log("Done ✅ Strict TypeScript Conversion Completed!");
 