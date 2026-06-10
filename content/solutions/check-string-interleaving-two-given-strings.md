# Check if a string is interleaving of two other given strings

> Source: https://www.techiedelight.com/check-string-interleaving-two-given-strings/

Given three strings, return true if the third string is interleaving the first and second strings, i.e., it is formed from all characters of the first and second string, and the order of characters is preserved.

For example,

ACDB is interleaving of AB and CD ADEBCF is interleaving of ABC and DEF ACBCD is interleaving of ABC and CD ACDABC is interleaving of ABC and ACD

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), as demonstrated below in TypeScript:

```ts
// Function to check if strings 'X' and 'Y' are interleaving of 'S' or not
const isInterleaving = (X: string, Y: string, S: string): boolean => {

    // return true if the end of all strings is reached
    if (X.length === 0 && Y.length === 0 && S.length === 0) {
        return true;
    }

    // return false if the end of string 'S' is reached,
    // but 'X' or 'Y' is not empty
    if (S.length === 0) {
        return false;
    }

    // if string 'X' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring
    if (X.length !== 0 && S[0] === X[0]) {
        return isInterleaving(X.slice(1), Y, S.slice(1));
    }

    // if string 'Y' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring
    if (Y.length !== 0 && S[0] === Y[0]) {
        return isInterleaving(X, Y.slice(1), S.slice(1));
    }

    return false;
};

// demo

const X = 'ABC';
const Y = 'DEF';
const S = 'ADEBFC';

if (isInterleaving(X, Y, S)) {
    console.log('Interleaving');
} else {
    console.log('Not an Interleaving');
}
```

The time complexity of the above solution is O(m + n), where `m` and `n` are the length of the string `X` and `Y`. The auxiliary space required by the program is O(1).

The problem with the above solution is that it doesn’t handle duplicates. Suppose `X = "ABC"` and `Y = "ACD"`, then the above solution will return false for string `S = "ACDABC"`. The reason is that if the current character of `S` matches the current character of both `X` and `Y`, the solution will always pair `S` with `X` and do not check if the solution can be formed by pairing `S` with `Y` or not.

We can easily handle duplicates by pairing `S` with both `X` and `Y` and recursively check if the solution can be formed by either of them or not. Following is a TypeScript implementation of the idea:

```ts
// Function to check if strings 'X' and 'Y' are interleaving of 'S' or not
const isInterleaving = (X: string, Y: string, S: string): boolean => {

    // return true if the end of all strings is reached
    if (X.length === 0 && Y.length === 0 && S.length === 0) {
        return true;
    }

    // return false if the end of string 'S' is reached,
    // but 'X' or 'Y' is not empty
    if (S.length === 0) {
        return false;
    }

    // if string 'X' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring
    const x = (X.length !== 0 && S[0] === X[0]) && isInterleaving(X.slice(1), Y, S.slice(1));

    // if string 'Y' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring
    const y = (Y.length !== 0 && S[0] === Y[0]) && isInterleaving(X, Y.slice(1), S.slice(1));

    return x || y;
};

// demo

const X = 'ABC';
const Y = 'ACD';
const S = 'ACDABC';

if (isInterleaving(X, Y, S)) {
    console.log('Interleaving');
} else {
    console.log('Not an Interleaving');
}
```

The worst-case time complexity of the above solution is exponential and occupies space in the call stack. The worst case happens when all characters of `X` and `Y` are the same. We can use dynamic programming to reduce the worst-case time complexity and space complexity to O(m.n).

The DP solution is discussed below in TypeScript:

```ts
// Function to check if strings 'X' and 'Y' are interleaving of string 'S' or not
const isInterleaving = (X: string, Y: string, S: string, T: Map<string, boolean>): boolean => {

    // return true if the end of all strings is reached
    if (X.length === 0 && Y.length === 0 && S.length === 0) {
        return true;
    }

    // return false if the end of string 'S' is reached,
    // but string 'X' or 'Y' is not empty

    if (S.length === 0) {
        return false;
    }

    // calculate a unique map key by using delimiter `|`
    const key = X + "|" + Y + "|" + S;

    // if the subproblem is seen for the first time
    if (!T.has(key)) {
        // if string 'X' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        const x = (X.length !== 0 && S[0] === X[0]) &&
            isInterleaving(X.slice(1), Y, S.slice(1), T);

        // if string 'Y' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        const y = (Y.length !== 0 && S[0] === Y[0]) &&
            isInterleaving(X, Y.slice(1), S.slice(1), T);

        T.set(key, x || y);
    }

    return T.get(key)!;
};

// demo

const X = 'ABC';
const Y = 'ACD';
const S = 'ACDABC';

// map to store solution to already computed subproblems
const T = new Map<string, boolean>();

if (isInterleaving(X, Y, S, T)) {
    console.log('Interleaving');
} else {
    console.log('Not an Interleaving');
}
```
