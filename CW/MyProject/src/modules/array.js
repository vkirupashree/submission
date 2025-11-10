function findCommon(arr1, arr2) {
    // Check if both are strings
    const bothStrings = typeof arr1 === "string" && typeof arr2 === "string";
    // Check if both are arrays
    const bothArrays = Array.isArray(arr1) && Array.isArray(arr2);
    if (!bothStrings && !bothArrays) {
        throw new Error("Arguments must be both arrays of the same type or both strings");
    }
    let v1;
    let v2;
    if (bothStrings) {
        v1 = [...arr1.toLowerCase()];
        v2 = [...arr2.toLowerCase()];
    }
    else {
        v1 = [...arr1];
        v2 = [...arr2];
    }
    const result = new Set();
    for (let i = 0; i < v1.length; i++) {
        if (v2.includes(v1[i])) {
            result.add(v1[i]);
        }
    }
    return [...result];
}
// ✅ Works
console.log(findCommon([1, 2, 3], [2, 3, 4])); // [2, 3]
console.log(findCommon("sriram", "rajesh")); // ['r', 'a']
export {};
// ❌ Throws runtime error
// console.log(findCommon([1, 2, 3, 4], "Rajesh"));
//# sourceMappingURL=array.js.map