// person.ts

// Abstract class
abstract class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Abstract method (must be implemented by derived class)
    abstract greet(): void;
}

// Derived class
class Employee extends Person {
    greet(): void {
        console.log(`Hello, my name is ${this.name}`);
    }
}

// Create an instance
let m: Person = new Employee("Kirupa");

// Call the implemented abstract method
m.greet(); // Output: Hello, my name is Kirupa
