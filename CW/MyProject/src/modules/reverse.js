// reverse.ts
// Generic reverse function
function reverse(input) {
    if (Array.isArray(input)) {
        return [...input].reverse();
    }
    else if (typeof input === "string") {
        return [...input].reverse().join("");
    }
    else {
        throw new Error("Input must be an array or string");
    }
}
// Helper function: returns array of first n square numbers
const square = (n) => {
    const result = [];
    for (let i = 1; i <= n; i++)
        result.push(i * i);
    return result;
};
console.log("int arr reverse..", reverse([1, 2, 3, 4]));
console.log("string reverse...", reverse("kirupa"));
console.log("fn result reverse...", reverse([...square(10)]));
const num = 57;
const reversedNum = reverse(num + "");
console.log("reverse of a number...", Number(reversedNum));
export {};
//# sourceMappingURL=reverse.js.map