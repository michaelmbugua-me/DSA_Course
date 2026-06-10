# Find minimum cuts needed for the palindromic partition of a string

> Source: https://www.techiedelight.com/find-minimum-cuts-needed-palindromic-partition-string/

Given a string, find the minimum cuts needed to partition it such that each partition is a palindrome.

For example,

  1. `BABABCBADCD` – The minimum cuts required are 2 as `BAB|ABCBA|DCD`.
  2. `ABCBA` – The minimum cuts required are 0 as `ABCBA` is already a palindrome.
  3. `ABCD` – The minimum cuts required are 3 as `A|B|C|D`.

> 

We can break the problem into a set of related subproblems that partition the given string to yield the lowest total cuts. Following is the recursive algorithm to find the minimum cuts:

  1. Separate the given string into two subsequences.
  2. Recursively find the minimum cuts required in each subsequence.
  3. Do this for each possible position at which the string can be cut, and take the minimum over all of them.

For example, if we have string `ABCB`, compute the cuts required to find each of `A|BCB`, `AB|CB`, and `ABC|B`, making recursive calls to find the minimum cuts to compute `BCB`, `AB`, `CB`, and `ABC` to choose the best one.

Following is a TypeScript implementation of the idea:

**Output:** The minimum cuts required are 2

```ts
// Function to check if string `X[i…j]` is a palindrome or not
function isPalindrome(X: string, i: number, j: number): boolean {

    while (i <= j) {
        if (X[i] !== X[j]) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}

// Recursive function to find the minimum cuts needed in a string
// such that each partition is a palindrome
function findMinCuts(X: string, i: number, j: number): number {

    // base case: if starting index `i` and ending index `j` are equal,
    // or `X[i…j]` is already a palindrome.
    if (i === j || isPalindrome(X, i, j)) {
        return 0;
    }

    // stores the minimum number of cuts needed to partition `X[i…j]`
    let min = Infinity;

    // take the minimum over each possible position at which the
    // string can be cut

    /*
        (X[i]) | (X[i+1…j])
        (X[i…i+1]) | (X[i+2…j])
        (X[i…i+2]) | (X[i+3…j])
        …
        …
        (X[i…j-1]) | (X[j])
    */

    for (let k = i; k < j; k++) {

        // recur to get minimum cuts required in `X[i…k]` and `X[k+1…j]`
        const count = 1 + findMinCuts(X, i, k) + findMinCuts(X, k + 1, j);

        if (count < min) {
            min = count;
        }
    }

    // return the minimum cuts required
    return min;
}

// Wrapper over findMinCuts() function
function findMinimumCuts(X: string): number {

    // base case
    if (!X) {
        return 0;
    }

    return findMinCuts(X, 0, X.length - 1);
}

const X = 'BABABCBADCD';    // BAB|ABCBA|DCD
console.log(`The minimum cuts required are ${findMinimumCuts(X)}`);
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed. Since both optimal substructure and overlapping subproblems properties of dynamic programming are satisfied, we can save subproblem solutions in memory rather than computed them repeatedly.

We can further optimize the above recursive solution by removing the `isPalindrome()` function, which takes linear time in the worst case. Instead, the idea is to preprocess the string and maintain a lookup table to check if the substring starting at index `i` and ending at index `j` is a palindrome or not in constant time. This is demonstrated below in TypeScript:

**Output:** The minimum cuts required are 2

```ts
// Bottom-up DP function to mark if string `X[i…j]` is a palindrome
// or not for all possible values of `i` and `j`
function findAllPalindromes(X: string, isPalin: boolean[][]): void {

    for (let i = X.length - 1; i >= 0; i--) {
        for (let j = i; j < X.length; j++) {
            if (i === j) {
                isPalin[i][j] = true;
            } else if (X[i] === X[j]) {
                isPalin[i][j] = (j - i === 1) ? true : isPalin[i + 1][j - 1];
            } else {
                isPalin[i][j] = false;
            }
        }
    }
}

// Recursive function to find the minimum cuts needed in a string
// such that each partition is a palindrome
function findMinCuts(i: number, j: number, isPalin: boolean[][],
                     lookup: Map<string, number>): number {

    // base case: if starting index `i` and ending index `j` are equal,
    // or `X[i…j]` is already a palindrome.
    if (i === j || isPalin[i][j]) {
        return 0;
    }

    // construct a unique key from dynamic elements of the input.
    // lookup[key] stores the minimum number of cuts needed to partition `X[i…j]`
    const key = `${i}|${j}`;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (!lookup.has(key)) {

        // take the minimum over each possible position at which they can be cut

        /*
            (X[i])     | (X[i+1…j])
            (X[i…i+1]) | (X[i+2…j])
            (X[i…i+2]) | (X[i+3…j])
            …
            …
            (X[i…j-1]) | (X[j])
        */

        lookup.set(key, Infinity);
        for (let k = i; k < j; k++) {
            // recur to get minimum cuts required in `X[i…k]` and `X[k+1…j]`
            const count = 1 + findMinCuts(i, k, isPalin, lookup) +
                    findMinCuts(k + 1, j, isPalin, lookup);

            const current = lookup.get(key);
            if (current === undefined || count < current) {
                lookup.set(key, count);
            }
        }
    }

    // return the minimum cuts required
    const result = lookup.get(key);
    if (result === undefined) {
        return Infinity;
    }
    return result;
}

function findMinimumCuts(X: string): number {

    // base case
    if (!X) {
        return 0;
    }

    // create a map to store solutions to subproblems
    const lookup = new Map<string, number>();

    // isPalin[i][j] stores if substring X[i][j] is palindrome or not
    const isPalin: boolean[][] = Array.from({ length: X.length + 1 }, () =>
        Array(X.length + 1).fill(false));

    // find all substrings of `X` that are palindromes
    findAllPalindromes(X, isPalin);

    return findMinCuts(0, X.length - 1, isPalin, lookup);
}

const X = 'BABABCBADCD';

console.log(`The minimum cuts required are ${findMinimumCuts(X)}`);
```

The time complexity of the above top-down solution is O(n3) and requires O(n2) extra space, where `n` is the length of the input string.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. It has the “less” asymptotic runtime and requires no recursion. The approach is demonstrated below in TypeScript:

```ts
// Bottom-up DP function to mark if string `X[i…j]` is a palindrome
// or not for all possible values of `i` and `j`
function findAllPalindromes(X: string, isPalindrome: boolean[][]): void {
    const n = X.length;

    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (i === j) {
                isPalindrome[i][j] = true;
            } else if (X[i] === X[j]) {
                isPalindrome[i][j] = (j - i === 1) ? true : isPalindrome[i + 1][j - 1];
            } else {
                isPalindrome[i][j] = false;
            }
        }
    }
}

// Iterative function to find the minimum cuts needed in a string
// such that each partition is a palindrome
function findMinCuts(X: string, isPalindrome: boolean[][]): number {
    const n = X.length;

    // create a lookup table to store solutions to subproblems
    // `lookup[i]` stores the minimum cuts needed in substring `X[i…n)`
    const lookup: number[] = Array(n).fill(0);

    // start from the string's end
    for (let i = n - 1; i >= 0; i--) {
        lookup[i] = Infinity;

        // if `X[i…n-1]` is a palindrome, the total cuts needed is 0
        if (isPalindrome[i][n - 1]) {
            lookup[i] = 0;
        } else {
            // otherwise, find lookup[i]
            for (let j = n - 2; j >= i; j--) {
                if (isPalindrome[i][j]) {
                    lookup[i] = Math.min(lookup[i], 1 + lookup[j + 1]);
                }
            }
        }
    }

    return lookup[0];
}

// Wrapper over findMinCuts() function
function findMinimumCuts(X: string): number {
    const n = X.length;

    // base case
    if (n === 0) {
        return 0;
    }

    // isPalindrome[i][j] stores if substring X[i][j] is palindrome or not
    const isPalindrome: boolean[][] = Array.from({ length: n + 1 }, () =>
        Array(n + 1).fill(false));

    // find all substrings of `X` that are palindromes
    findAllPalindromes(X, isPalindrome);

    return findMinCuts(X, isPalindrome);
}

const X = "BABABCBADCEDE";     // BAB|ABCBA|D|C|EDE

console.log(`The minimum cuts required are ${findMinimumCuts(X)}`);
```

**Output:** The minimum cuts required are 4
