# Find all n-digit strictly increasing numbers (Bottom-up and Top-down approach)

> Source: https://www.techiedelight.com/find-n-digit-strictly-increasing-numbers-bottom-top-approach/

[String](https://www.techiedelight.com/Category/String/)

Find all n–digit strictly increasing numbers where `n` varies from `1` to `9`. A number is strictly increasing if every digit is greater than its preceding digit.

For example,

**8–digit strictly increasing numbers are:** 12345678 12345679 12345689 12345789 12346789 12356789 12456789 13456789 23456789 **7–digit strictly increasing numbers are:** 1234567 1234568 1234569 1234578 1234579 1234589 1234678 1234679 1234689 1234789 1235678 1235679 1235689 1235789 1236789 1245678 1245679 1245689 1245789 1246789 1256789 1345678 1345679 1345689 1345789 1346789 1356789 1456789 2345678 2345679 2345689 2345789 2346789 2356789 2456789 3456789

> 

A simple solution would be to generate all n–digit numbers and print only those numbers that satisfy the given constraints. The time complexity of this solution would be exponential.

A better solution is to generate only those n–digit numbers that satisfy the given constraints. The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We fill the current index with digits greater than the previous digit and recur for the next index at each point in the recursion. There are two approaches to solve this problem:

## 1\. Bottom-Up Approach

In the bottom-up approach, we start from the first index and recursively fill the digits from left to right. Following is the TypeScript program that demonstrates it:

```ts
// Function to find all n–digit strictly increasing numbers
// in a bottom-up manner
const printStrictlyInc = (n: number, result: string = '', prev: string = '0'): void => {

    // if the string becomes n–digit, print it
    if (n === 0) {
        console.log(result);
        return;
    }

    // start from the next digit (the last digit is `prev`)
    for (let ch = prev.charCodeAt(0) + 1; ch <= '9'.charCodeAt(0); ch++) {
        printStrictlyInc(n - 1, result + String.fromCharCode(ch), String.fromCharCode(ch));
    }
};

const n = 7;
printStrictlyInc(n);
```

**Output:** 1234567 1234568 1234569 1234578 1234579 1234589 1234678 1234679 1234689 1234789 1235678 1235679 1235689 1235789 1236789 1245678 1245679 1245689 1245789 1246789 1256789 1345678 1345679 1345689 1345789 1346789 1356789 1456789 2345678 2345679 2345689 2345789 2346789 2356789 2456789 3456789

**Output:** 1234567 1234568 1234569 1234578 1234579 1234589 1234678 1234679 1234689 1234789 1235678 1235679 1235689 1235789 1236789 1245678 1245679 1245689 1245789 1246789 1256789 1345678 1345679 1345689 1345789 1346789 1356789 1456789 2345678 2345679 2345689 2345789 2346789 2356789 2456789 3456789

## 2\. Top-Down Approach

In the top-down approach, we start from the last index and recursively fill the digits from right to left. The implementation can be seen below in TypeScript:

```ts
// Function to find all n–digit strictly increasing
// numbers in a top-down manner
const printStrictlyInc = (n: number, result: string = '', curr: string = '9'): void => {

    // if the string becomes n–digit, print it
    if (n === 0) {
        console.log(result);
        return;
    }

    let ch = curr.charCodeAt(0);
    while (ch >= '1'.charCodeAt(0)) {
        printStrictlyInc(n - 1, String.fromCharCode(ch) + result, String.fromCharCode(ch - 1));
        ch = ch - 1;
    }
};

const n = 7;
printStrictlyInc(n);
```

**Output:** 3456789 2456789 1456789 2356789 1356789 1256789 2346789 1346789 1246789 1236789 2345789 1345789 1245789 1235789 1234789 2345689 1345689 1245689 1235689 1234689 1234589 2345679 1345679 1245679 1235679 1234679 1234579 1234569 2345678 1345678 1245678 1235678 1234678 1234578 1234568 1234567

**Output:** 3456789 2456789 1456789 2356789 1356789 1256789 2346789 1346789 1246789 1236789 2345789 1345789 1245789 1235789 1234789 2345689 1345689 1245689 1235689 1234689 1234589 2345679 1345679 1245679 1235679 1234679 1234579 1234569 2345678 1345678 1245678 1235678 1234678 1234578 1234568 1234567
