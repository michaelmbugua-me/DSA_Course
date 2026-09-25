# Wildcard Pattern Matching

> Source: https://www.techiedelight.com/wildcard-pattern-matching/

Wildcard Pattern Matching: Given a string and a pattern containing wildcard characters, i.e., `*` and `?`, where `?` can match to any single character in the string and `*` can match to any number of characters including zero characters, design an efficient algorithm to check if the pattern matches with the complete string or not.

For example,

**Input:** string = “xyxzzxy”, pattern = “x***y” **Output:** Match **Input:** string = “xyxzzxy”, pattern = “x***x” **Output:** No Match **Input:** string = “xyxzzxy”, pattern = “x***x?” **Output:** Match **Input:** string = “xyxzzxy”, pattern = “*” **Output:** Match

> 

The idea is to use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. If we carefully analyze the problem, we can see that it can easily be further divided into subproblems. Let’s take the top-bottom approach to solve this problem.

For a given `pattern[0…m]` and `word[0…n]`,

  * If `pattern[m] == '*'`, if `*` matches the current character in the input string, move to the next character in the string; otherwise, ignore `*` and move to the next character in the pattern.
  * If `pattern[m] == '?'`, ignore current characters of both string and pattern and check if `pattern[0…m-1]` matches `word[0…n-1]`.
  * If the current character in the pattern is not a wildcard character, it should match the current character in the input string.

Special care has to be taken to handle base conditions:

  * If both the input string and pattern reach their end, return true.
  * If the only pattern reaches its end, return false.
  * If only the input string reaches its end, return true only if the remaining characters in the pattern are all `*`.

Following is the top-down DP solution in TypeScript using memoization:

```ts
// Function that matches the input string with a given wildcard pattern
function isMatch(word: string, pattern: string, n: number, m: number, lookup: boolean[][]): boolean {
    // If both the input string and pattern reach their end,
    // return true
    if (m < 0 && n < 0) {
        return true;
    }

    // If only the pattern reaches its end, return false
    else if (m < 0) {
        return false;
    }

    // If only the input string reaches its end, return true
    // if the remaining characters in the pattern are all '*'
    else if (n < 0) {
        for (let i = 0; i <= m; i++) {
            if (pattern[i] !== '*') {
                return false;
            }
        }

        return true;
    }

    // If the subproblem is encountered for the first time
    if (!lookup[n][m]) {
        if (pattern[m] === '*') {
            // 1. '*' matches with current characters in the input string.
            // Here, we will move to the next character in the string.

            // 2. Ignore '*' and move to the next character in the pattern
            lookup[n][m] = isMatch(word, pattern, n - 1, m, lookup) ||
                        isMatch(word, pattern, n, m - 1, lookup);
        } else {
            // If the current character is not a wildcard character, it
            // should match the current character in the input string
            if (pattern[m] !== '?' && pattern[m] !== word[n]) {
                lookup[n][m] = false;
            }
            // check if pattern[0…m-1] matches word[0…n-1]
            else {
                lookup[n][m] = isMatch(word, pattern, n - 1, m - 1, lookup);
            }
        }
    }

    return lookup[n][m];
}

const word = 'xyxzzxy';
const pattern = 'x***x?';

// create a DP lookup table
const lookup: boolean[][] = Array.from(
    { length: word.length + 1 },
    () => new Array(pattern.length + 1).fill(false)
);

if (isMatch(word, pattern, word.length - 1, pattern.length - 1, lookup)) {
    console.log('Match');
} else {
    console.log('No Match');
}
```

The time complexity of the above top-down solution is O(m.n) and requires O(m.n) extra space, where `n` is the length of the text and `m` is the length of the pattern.

Following is an iterative TypeScript implementation of the above code:

```ts
// Function that matches an input string with a given wildcard pattern
function isMatch(word: string, pattern: string): boolean {
    // get length of string and wildcard pattern
    const n = word.length;
    const m = pattern.length;

    // create a DP lookup table
    // all elements are initialized by false by default
    const T: boolean[][] = Array.from(
        { length: n + 1 },
        () => new Array(m + 1).fill(false)
    );

    // if both pattern and string are empty: match
    T[0][0] = true;

    // handle empty string case (i == 0)
    for (let j = 1; j <= m; j++) {
        if (pattern[j - 1] === '*') {
            T[0][j] = T[0][j - 1];
        }
    }

    // build a matrix in a bottom-up manner
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (pattern[j - 1] === '*') {
                T[i][j] = T[i - 1][j] || T[i][j - 1];
            } else if (pattern[j - 1] === '?' || word[i - 1] === pattern[j - 1]) {
                T[i][j] = T[i - 1][j - 1];
            }
        }
    }

    // last cell stores the answer
    return T[n][m];
}

const word = 'xyxzzxy';
const pattern = 'x***x?';

if (isMatch(word, pattern)) {
    console.log('Match');
} else {
    console.log('No Match');
}
```

The time complexity of the above bottom-up solution is O(m.n) and requires O(m.n) extra space, where `n` is the length of the text and `m` is the length of the pattern.
