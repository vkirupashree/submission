// reverse.ts

// Generic reverse function
function reverse<T>(input: T[] | string): T[] | string {
    if (Array.isArray(input)) {
        return [...input].reverse();
    } else if (typeof input === "string") {
        return [...input].reverse().join("");
    } else {
        throw new Error("Input must be an array or string");
    }
}

// Helper function: returns array of first n square numbers
const square = (n: number): number[] => {
    const result: number[] = [];
    for (let i = 1; i <= n; i++) result.push(i * i);
    return result;
};



console.log("int arr reverse..", reverse([1, 2, 3, 4]));


console.log("string reverse...", reverse("kirupa"));

console.log("fn result reverse...", reverse([...square(10)]));

const num = 57;
const reversedNum = reverse(num + "") as string;
console.log("reverse of a number...", Number(reversedNum));
