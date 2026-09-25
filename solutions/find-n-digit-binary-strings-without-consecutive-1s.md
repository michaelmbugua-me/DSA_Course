# Find all n-digit binary numbers without any consecutive 1’s

> Source: https://www.techiedelight.com/find-n-digit-binary-strings-without-consecutive-1s/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a positive integer `n`, count all n–digit binary numbers without any consecutive `1's`.

For example, for `n = 5`, the binary numbers that satisfy the given constraints are: `[00000, 00001, 00010, 00100, 00101, 01000, 01001, 01010, 10000, 10001, 10010, 10100, 10101]`.

> 

A simple solution would be to generate all n–digit integers and print only those integers that satisfy the given constraints. The complexity of this solution would be exponential.

A better solution is to generate only those n–digit integers that satisfy the given constraints. The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We append `0` and `1` to the partially formed number and recur with one less digit at each point in the recursion. Here, the trick is to append `1` and recur only if the last digit of the partially formed number is `0`. That way, we will never have any consecutive `1's` in the output string.

Following is the TypeScript implementation of the idea:

```ts
// count all n–digit binary numbers without any consecutive 1's
const countStrings = (n: number, lastDigit: number = 0): number => {

    // base case
    if (n === 0) {
        return 0;
    }

    // if only one digit is left
    if (n === 1) {
        return (lastDigit === 1) ? 1 : 2;
    }

    // if the last digit is 0, we can have both 0 and 1 at the current position
    if (lastDigit === 0) {
        return countStrings(n - 1, 0) + countStrings(n - 1, 1);
    }

    // if the last digit is 1, we can have only 0 at the current position
    else {
        return countStrings(n - 1, 0);
    }
};

// total number of digits
const n = 5;

console.log(`The total number of ${n}–digit binary numbers without any consecutive 1's is ${countStrings(n)}`);
```

**Output:** The total number of 5–digit binary numbers without any consecutive 1’s is 13

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are getting computed repeatedly. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly.

The algorithm can be implemented as follows in TypeScript, where we solve smaller subproblems first, then solve larger subproblems from them.

```ts
// Function to count all n–digit binary numbers without any consecutive 1's
const countStrings = (n: number): number => {

    const T: number[][] = Array.from({ length: n + 1 }, () => new Array(2).fill(0));

    // if only one digit is left
    T[1][0] = 2;
    T[1][1] = 1;

    for (let i = 2; i <= n; i++) {

        // if the last digit is 0, we can have both 0 and 1 at the current position
        T[i][0] = T[i - 1][0] + T[i - 1][1];

        // if the last digit is 1, we can have only 0 at the current position
        T[i][1] = T[i - 1][0];
    }

    return T[n][0];
};

// total number of digits
const n = 5;

console.log(`The total number of ${n}–digit binary numbers without any consecutive 1's is ${countStrings(n)}`);
```

**Output:** The total number of 5–digit binary numbers without any consecutive 1’s is 13

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the total number of digits.

How to print all binary numbers?

The following recursive code in TypeScript prints all binary numbers as well:

```ts
// Function to print all n–digit binary numbers without any consecutive 1's
const countStrings = (n: number, out: string, last_digit: number): void => {
    // if the number becomes n–digit, print it
    if (n === 0) {
        console.log(out);
        return;
    }

    // append 0 to the result and recur with one less digit
    countStrings(n - 1, out + '0', 0);

    // append 1 to the result and recur with one less digit
    // only if the last digit is 0
    if (last_digit === 0) {
        countStrings(n - 1, out + '1', 1);
    }
};

// total number of digits
const n = 5;

countStrings(n, '', 0);
```

**Output:** 00000 00001 00010 00100 00101 01000 01001 01010 10000 10001 10010 10100 10101
