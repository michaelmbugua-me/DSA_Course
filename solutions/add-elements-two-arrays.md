# Add elements of two arrays into a new array

> Source: https://www.techiedelight.com/add-elements-two-arrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given two arrays of positive integers, add their elements into a new array. The solution should add both arrays, one by one starting from the 0th index, and split the sum into individual digits if it is a 2–digit number.

For example,

**Input:** a = { 23, 5, 2, 7, 87 } b = { 4, 67, 2, 8 } **Output:** { 2, 7, 7, 2, 4, 1, 5, 8, 7 } **Input:** a = {} b = { 4, 67, 2, 8 } **Output:** { 4, 6, 7, 2, 8 }

> 

The idea is to run a loop that considers every pair of elements present at the same index in both arrays and adds them. If the sum is a 2–digit number, add its digits to the result array; otherwise, add the single-digit sum to the result array. Finally, add the remaining elements of the larger array to the result array.

Following is the TypeScript program that demonstrates it:

```ts
// Recursive function to separate the digits of a positive integer
// and add them to a given list
function split_number(num: number, result: number[]): void {

    if (num > 0) {
        split_number(Math.floor(num / 10), result);
        result.push(num % 10);
    }
}

// Function to add two lists
function append(a: number[], b: number[], result: number[]): void {

    const m = a.length;
    const n = b.length;

    // loop till either `a` or `b` runs out
    let i = 0;
    while (i < m && i < n) {

        // get the sum of the next element from each list
        const total = a[i] + b[i];

        // separate the digits of the sum and add them to the output list
        split_number(total, result);
        i = i + 1;
    }

    // process remaining elements of the first list, if any
    while (i < m) {
        split_number(a[i], result);
        i = i + 1;
    }

    // process remaining elements of the second list, if any
    while (i < n) {
        split_number(b[i], result);
        i = i + 1;
    }
}

// input lists
const a = [23, 5, 2, 7, 87];
const b = [4, 67, 2, 8];

// list to store the output
const result: number[] = [];
append(a, b, result);

// print the output list
console.log(result);
```

**Output:** 2 7 7 2 4 1 5 8 7


Here’s another solution that constructs a string containing the result by appending the sum of each pair of elements to it and finally add each character to a list of integers.

```ts
// Function to add two lists
function add(a: number[], b: number[]): number[] {

    const m = a.length;
    const n = b.length;
    let s = '';

    // loop till either `a` or `b` runs out
    let i = 0;
    while (i < m && i < n) {
        s += String(a[i] + b[i]);
        i = i + 1;
    }

    // process remaining elements of the first list, if any
    while (i < m) {
        s = s + String(a[i]);
        i = i + 1;
    }

    // process remaining elements of the second list, if any
    while (i < n) {
        s = s + String(b[i]);
        i = i + 1;
    }

    // add characters of the output string to a given list of integers
    return [...s].map(c => parseInt(c, 10));
}

// input lists
const a: number[] = [];
const b = [4, 67, 2, 8];

// list to store the output
const result = add(a, b);

// print the output list
console.log(result);
```

**Output:** 4 6 7 2 8

The time complexity of both above-discussed methods is O(m + n) and runs in constant space. Here, `m` and `n` are the size of the first and second array, respectively.

**Author:** Aditya Goel
