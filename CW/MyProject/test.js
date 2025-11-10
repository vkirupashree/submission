var t = 3;
let first = 123; // integer
let second = 123.45; // float / decimal
let hexNum = 0x1A; // hexadecimal
let binaryNum = 0b1010; // binary
let octalNum = 0o744; // octal
//let bigNum: bigint = 9007199254740991n; // bigint
let sciNum = 1.23e4; // scientific notation
var b = true;
var c = true;
console.log(typeof (b));
console.log(typeof (b));
console.log("-----------------------------------------------");
//arrays
//let fruits: string[] = ["Apple","Orange",3]; //its an error
let fruits = ["Apple", "Orange"];
//Typescript genrics
let fruits2 = ["Apple", "Orange", "Banana"];
console.log(fruits);
console.log(fruits2);
console.log("-----------------------------------------------");
//MULTI-ARRAY TYPE
let values = ["Apple", 2, "Orange", 3, 4];
//or
let values1 = ["Apple", 2, "Orange", 3, 4];
console.log("values:- " + values);
console.log("vallues1:- " + values1);
console.log("-----------------------------------------------");
//TUPLES
var empId = 1;
var empName = "java";
//Tuple type  variable
var employee = [1, "STeve"];
var person = [1, "Steve", true];
console.log(employee);
console.log(person);
//array of tuple
// Tuple type: [string, number]
let students = [
    ["Rahul", 21],
    ["Sita", 22],
    ["Arjun", 20]
];
console.log(students);
console.log("-----------------------------------------------");
//numeric enum
var PrintMedia;
(function (PrintMedia) {
    PrintMedia["NewsPaper"] = "newspaper";
    PrintMedia["Newsletter"] = "newsletter";
    PrintMedia["Magazine"] = "magazine";
    PrintMedia["Book"] = "book";
})(PrintMedia || (PrintMedia = {}));
function getMedia(mediaName) {
    if (mediaName === "Forbes" || mediaName === "Outlook") {
        return PrintMedia.Magazine;
    }
    else if (mediaName === "The Hindu" || mediaName === "Times") {
        return PrintMedia.NewsPaper;
    }
    else {
        // ✅ Default fallback
        return PrintMedia.Book;
    }
}
let mediaType = getMedia("Forbes");
console.log(mediaType); // Output: magazine
console.log("-----------------------------------------------");
// ✅ Use constant instead of function for computed enum
const discount = 10;
var Pricing;
(function (Pricing) {
    Pricing[Pricing["Base"] = 100] = "Base";
    Pricing[Pricing["Discount"] = 10] = "Discount";
    Pricing[Pricing["Final"] = 90] = "Final"; // ✅ Expression using constant
})(Pricing || (Pricing = {}));
console.log(Pricing.Base); // 100
console.log(Pricing.Discount); // 10
console.log(Pricing.Final); // 90
console.log("-----------------------------------------------");
//heterogeneous enum
var MixedValues;
(function (MixedValues) {
    MixedValues[MixedValues["ID"] = 101] = "ID";
    MixedValues["Name"] = "SRIRAM"; // string
})(MixedValues || (MixedValues = {}));
console.log(MixedValues.ID); // 101
console.log(MixedValues.Name); // SRIRAM
console.log("-----------------------------------------------");
//union
// union
function displayType(code) {
    if (typeof code === "number") {
        console.log("Code is a number:", code);
    }
    else {
        console.log("Code is a string:", code);
    }
}
displayType(101); // Code is a number: 101
displayType("Hello"); // Code is a string: Hello
console.log("-----------------------------------------------");
//Any
let something = "Hello World";
something = 23;
something = true;
let arr = ["John", 21, true];
arr.push("smith");
console.log(arr);
//void
function sayHi() {
    console.log("hi");
}
let speech = sayHi();
console.log(speech);
console.log("-----------------------------------------------");
// Function implementation
function sum3(a, b) {
    return a + b;
}
// Usage
console.log(sum3(5, 10));
console.log(sum3("Hello, ", "World!"));
console.log("-----------------------------------------------");
console.log("-----------------------------------------------");
console.log("-----------------------------------------------");
export {};
//# sourceMappingURL=test.js.map