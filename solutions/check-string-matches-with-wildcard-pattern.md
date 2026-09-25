# Check if a string matches with the given wildcard pattern

> Source: https://www.techiedelight.com/check-string-matches-with-wildcard-pattern/

Given a string and a pattern containing wildcard characters, write an efficient algorithm to check if the string matches with the wildcard pattern or not.

The `?` wildcard character can match any character in the input string, and the `*` wildcard character can match to zero or more characters in the input string.

For example,

**Input:** string = XYXZZXY, pattern = X***Y **Output:** true **Input:** string = XYXZZXY, pattern = X***X **Output:** false **Input:** string = XYXZZXY, pattern = X***X? **Output:** true **Input:** string = XYXZZXY, pattern = * **Output:** true

> 

The idea is to solve this problem by dividing the problem into subproblems recursively. For a given `pattern[0…m]` and `word[0…n]`,

  1. If `pattern[m] == *`, if `*` matches the current character in the input string, move to the next character in the string; otherwise, ignore the `*` character and move to the next character in the pattern.
  2. If `pattern[m] == ?`, ignore the current characters of both string and pattern and check if `pattern[0…m-1]` matches `word[0…n-1]`.
  3. If the current character in the pattern is not a wildcard character, it should match the current character in the input string.

Special care has to be taken to handle base conditions:

  1. If both the input string and pattern reach their end, return true.
  2. If only the pattern reaches its end, return false.
  3. If only the input string reaches its end, return true only when the remaining characters in the pattern consists of all `*`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Recursive function to check if the input matches
// with a given wildcard pattern
const isMatch = (word: string, n: number, pattern: string, m: number): boolean => {

    // end of the pattern is reached
    if (m === pattern.length) {
        // return true only if the end of input is also reached
        return n === word.length;
    }

    // if the input reaches its end, return when the
    // remaining characters in the pattern are all '*'
    if (n === word.length) {
        for (let i = m; i < pattern.length; i++) {
            if (pattern[i] !== '*') {
                return false;
            }
        }

        return true;
    }

    // if the current wildcard character is '?' or the current character in
    // the pattern is the same as the current character in the input string
    if (pattern[m] === '?' || pattern[m] === word[n]) {
        // move to the next character in the pattern and the input string
        return isMatch(word, n + 1, pattern, m + 1);
    }

    // if the current wildcard character is '*'
    if (pattern[m] === '*') {
        // move to the next character in the input or
        // ignore '*' and move to the next character in the pattern
        return isMatch(word, n + 1, pattern, m) || isMatch(word, n, pattern, m + 1);
    }

    // we reach here when the current character in the pattern is not a
    // wildcard character, and it doesn't match the current
    // character in the input string
    return false;
};

// Check if a string matches with a given wildcard pattern
const isMatching = (word: string, pattern: string): boolean => isMatch(word, 0, pattern, 0);

// demo

console.log(isMatching('XYXZZXY', 'X***Y'));   // true
console.log(isMatching('XYXZZXY', 'X*ZZ??'));  // true
console.log(isMatching('XYXZZXY', '*X*X?'));   // true
console.log(isMatching('XYXZZXY', 'X***X'));   // false
console.log(isMatching('XYXZZXY', '*'));       // true
```

The time complexity of the above solution is exponential and occupies space in the call stack. [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) can bring down the time complexity to O(m.n) using O(m.n) extra space, where `m` is the length of the string and `n` is the length of the pattern. The dynamic programming solution is demonstrated below in TypeScript using memoization:

```ts
// Recursive function to check if the input string matches
// with a given wildcard pattern
const isMatch = (word: string, pattern: string, n: number, m: number,
                 lookup: Map<string, boolean>): boolean => {

    // construct a unique key from dynamic elements of the input
    const key = `${n}|${m}`;

    // if the subproblem is seen before
    if (lookup.has(key)) {
        return lookup.get(key)!;
    }

    // since the subproblem is seen for the first time, solve it and
    // store its result in a map

    // end of the pattern is reached
    if (m === pattern.length) {
        // return true only if the end of the input string is also reached
        lookup.set(key, n === word.length);
        return n === word.length;
    }

    // if the input string reaches its end, return when the
    // remaining characters in the pattern are all '*'

    if (n === word.length) {
        for (let i = m; i < pattern.length; i++) {
            if (pattern[i] !== '*') {
                lookup.set(key, false);
                return false;
            }
        }

        lookup.set(key, true);
        return true;
    }

    // if the current wildcard character is '?' or the current character in
    // the pattern is the same as the current character in the input string

    if (pattern[m] === '?' || pattern[m] === word[n]) {

        // move to the next character in the pattern and the input string
        lookup.set(key, isMatch(word, pattern, n + 1, m + 1, lookup));
    }

    // if the current wildcard character is '*'
    else if (pattern[m] === '*') {

        // move to the next character in the input string or
        // ignore '*' and move to the next character in the pattern

        lookup.set(key, isMatch(word, pattern, n + 1, m, lookup) ||
            isMatch(word, pattern, n, m + 1, lookup));
    }

    else {

        // we reach here when the current character in the pattern is not a
        // wildcard character, and it doesn't match the current
        // character in the input string

        lookup.set(key, false);
    }

    return lookup.get(key)!;
};

// Check if a string matches with a given wildcard pattern
const isMatching = (word: string, pattern: string): boolean => {
    const lookup = new Map<string, boolean>();
    return isMatch(word, pattern, 0, 0, lookup);
};

// demo

console.log(isMatching('XYXZZXY', 'X***Y'));   // true
console.log(isMatching('XYXZZXY', 'X*ZZ??'));  // true
console.log(isMatching('XYXZZXY', '*X*X?'));   // true
console.log(isMatching('XYXZZXY', 'X***X'));   // false
console.log(isMatching('XYXZZXY', '*'));       // true
```

**Exercise:** Implement dynamic programming solution using tabulation.
