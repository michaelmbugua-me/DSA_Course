# Check if a string is k–palindrome or not

> Source: https://www.techiedelight.com/check-given-string-k-palindrome-not/

Write an efficient algorithm to check if a given string is k–palindrome or not. A string is k–palindrome if it becomes a palindrome on removing at most `k` characters from it.

For example,

**Input:** ABCDBA, k = 1 **Output:** k–palindrome **Explanation:** The string becomes a palindrome by removing either C or D from it. **Input:** ABCDECA, k = 1 **Output:** Not a k–palindrome **Explanation:** The string needs at least 2–removals from it to become a palindrome.

> 

By carefully analyzing the problem, we can see that it is a variation of the classic [Edit Distance Problem](https://techiedelight.com/levenshtein-distance-edit-distance-problem/), where we need to convert the given string to its reverse by removing at most `k` characters from it (i.e., only delete operation is allowed).

Please note that we need to perform at most `n` deletions from the original string and `n` deletions from the reverse string to make the original string and its reverse equal. Therefore, the expression `2×n <= 2×k` is satisfied if the string is k–palindrome.

This approach is demonstrated below in TypeScript:

```ts
// Function to check if the given string is k–palindrome or not
const isKPalindrome = (X: string, m: number, Y: string, n: number): number => {

    // if either string is empty, remove all characters from the other string
    if (m === 0 || n === 0) {
        return n + m;
    }

    // ignore the last characters of both strings if they are the same
    // and recur for the remaining characters
    if (X[m - 1] === Y[n - 1]) {
        return isKPalindrome(X, m - 1, Y, n - 1);
    }

    // if the last character of both strings is different

    // remove the last character from the first string and recur
    const x = isKPalindrome(X, m - 1, Y, n);

    // remove the last character from the second string and recur
    const y = isKPalindrome(X, m, Y, n - 1);

    // return one more than the minimum of the above two operations
    return 1 + Math.min(x, y);
};

// demo
const s = 'CABCBC';
const k = 2;

// get reverse of s
const rev = s.split('').reverse().join('');

if (isKPalindrome(s, s.length, rev, s.length) <= 2 * k) {
    console.log('k-palindrome');
} else {
    console.log('Not a k–palindrome');
}
```

**Output:** The string is k–palindrome

The worst-case time complexity of the above solution is O(2n), where `n` is the length of the input string. The worst case happens when the string contains all different characters. It also requires additional space for the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). Since both dynamic programming properties are satisfied, we can save subproblem solutions in memory rather than computing them repeatedly. The dynamic programming is demonstrated below in TypeScript, which runs in O(n2) time:

```ts
// Function to check if the given string is k–palindrome or not
const isKPalindrome = (X: string, k: number): boolean => {

    // 'Y' is a reverse of 'X'
    const Y = X.split('').reverse().join('');

    const n = X.length;

    // lookup table to store solution of already computed subproblems
    const T: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    // fill the lookup table `T[][]` in a bottom-up manner
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            // if either string is empty, remove all characters from the
            // other string
            if (i === 0 || j === 0) {
                T[i][j] = i + j;
            }

            // ignore the last characters of both strings if they are the same
            // and process the remaining characters
            else if (X[i - 1] === Y[j - 1]) {
                T[i][j] = T[i - 1][j - 1];
            }

            // if the last character of both strings is different, consider
            // minimum by removing the last character from 'X' and 'Y'
            else {
                T[i][j] = 1 + Math.min(T[i - 1][j], T[i][j - 1]);
            }
        }
    }

    return T[n][n] <= 2 * k;
};

// demo
const s = 'CABCBC';
const k = 2;

if (isKPalindrome(s, k)) {
    console.log('The string is k–palindrome');
} else {
    console.log('The string is not a k–palindrome');
}
```

**Output:** The string is k–palindrome

We can also solve this problem by finding the [Longest Palindromic Subsequence (LPS)](https://techiedelight.com/longest-palindromic-subsequence-using-dynamic-programming/) of a string. To make a string palindrome, the characters that don’t contribute to the LPS should be removed. Therefore, a string is k–palindrome if the difference between the length of LPS and the original string’s length is less than equal to `k`.

For example, the LPS of string `CABCBC` is `CBCBC`, and on removing `A` from it, the string becomes a palindrome. Following is a TypeScript implementation of the idea:

```ts
// Function to check if the given string is k–palindrome or not
const isKPalindrome = (X: string, k: number): boolean => {

    // 'Y' is a reverse of 'X'
    const Y = X.split('').reverse().join('');

    const n = X.length;

    // lookup table to store solution of already computed subproblems
    // T[i][j] stores the length of LCS of X[0…i-1] and Y[0…j-1]
    const T: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    // fill the lookup table in a bottom-up manner
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            // special case: first row or first column of the lookup table
            if (i === 0 || j === 0) {
                T[i][j] = 0;
            }

            // if the current character of 'X' and 'Y' matches
            else if (X[i - 1] === Y[j - 1]) {
                T[i][j] = T[i - 1][j - 1] + 1;
            }

            // if the current character of 'X' and 'Y' don't match
            else {
                T[i][j] = Math.max(T[i - 1][j], T[i][j - 1]);
            }
        }
    }

    // T[n][n] contains the length of LCS for 'X' and 'Y'
    // (or longest palindromic subsequence)

    // For the string to be k–palindrome, the difference between the length of
    // longest palindromic subsequence and the string should be <= k
    return n - T[n][n] <= k;
};

// demo
const s = 'CABCBC';
const k = 2;

if (isKPalindrome(s, k)) {
    console.log('The string is k–palindrome');
} else {
    console.log('The string is not a k–palindrome');
}
```

**Output:** The string is k–palindrome
