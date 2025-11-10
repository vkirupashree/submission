// person.ts
// Abstract class
class Person {
    name;
    constructor(name) {
        this.name = name;
    }
}
// Derived class
class Employee extends Person {
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
// Create an instance
let m = new Employee("Kirupa");
// Call the implemented abstract method
m.greet(); // Output: Hello, my name is Kirupa
export {};
//# sourceMappingURL=person.js.map