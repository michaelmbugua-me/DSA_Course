# Find all substrings of a string that are a permutation of another string

> Source: https://www.techiedelight.com/find-substrings-string-permutation-given-string/

[String](https://www.techiedelight.com/Category/String/)

Find all substrings of a string that contains all characters of another string. In other words, find all substrings of the first string that are anagrams of the second string.

Please note that the problem specifically targets [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

`The first string is 'XYYZXZYZXXYZ' The second string is 'XYZ' Anagram 'YZX' present at index 2 Anagram 'XZY' present at index 4 Anagram 'YZX' present at index 6 Anagram 'XYZ' present at index 9 `

> 

The idea is to maintain a [sliding window](https://techiedelight.com/sliding-window-problems/) of size `m`, where `m` is the length of the second string. At any point, the sliding window would contain a substring of the first string of size `m`. At each iteration of the loop, remove the leftmost element from the sliding window and add the next character of the first string to it, so it points to the next substring of the first string.

At each point the window changes, compare the window’s characters with that of the second string. If all characters in the current window match that of the second string, we have found an anagram. After all substrings of the first string are considered, i.e., the window reaches the first string’s last character, the process terminates.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to find all substrings of string 'X' that are
// permutations of string 'Y'
const findAllAnagrams = (X: string, Y: string): void => {
    // `m` and `n` store the length of the string 'Y' and 'X', respectively
    const m = Y.length;
    const n = X.length;

    // invalid input
    if (m > n) {
        return;
    }

    // helper to check whether two multisets are equal
    const equal = (a: Map<string, number>, b: Map<string, number>): boolean => {
        if (a.size !== b.size) {
            return false;
        }
        for (const [ch, count] of a) {
            if (b.get(ch) !== count) {
                return false;
            }
        }
        return true;
    };

    // maintains the count of characters in the current window
    const window = new Map<string, number>();

    // maintains the count of characters in the second string
    const set = new Map<string, number>();

    // insert all characters of string 'Y' into a set
    for (let i = 0; i < m; i++) {
        set.set(Y[i], (set.get(Y[i]) ?? 0) + 1);
    }

    // maintain a sliding window of size `m` with adjacent characters
    // of string 'X'
    for (let i = 0; i < n; i++) {
        // add first `m` characters of string 'X' to the current window
        if (i < m) {
            window.set(X[i], (window.get(X[i]) ?? 0) + 1);
        } else {
            // If all characters in the current window match that of the
            // string 'Y', we found an anagram
            if (equal(window, set)) {
                console.log(`Anagram ${X.slice(i - m, i)} present at index ${i - m}`);
            }

            // consider the next substring of 'X' by removing the leftmost
            // element of the sliding window and add the next character
            // of string 'X' to it

            // delete only "one" occurrence of the leftmost element of the
            // current window
            const count = window.get(X[i - m]) ?? 0;
            if (count === 1) {
                window.delete(X[i - m]);
            } else if (count > 1) {
                window.set(X[i - m], count - 1);
            }

            // insert the next character of the string 'X' into the current window
            window.set(X[i], (window.get(X[i]) ?? 0) + 1);
        }
    }

    // if the last `m` characters of string 'X' matches that of string 'Y',
    // we found an anagram
    if (equal(window, set)) {
        console.log(`Anagram ${X.slice(n - m, n)} present at index ${n - m}`);
    }
};

const X = 'XYYZXZYZXXYZ';
const Y = 'XYZ';
findAllAnagrams(X, Y);
```

**Output:** Anagram YZX present at index 2 Anagram XZY present at index 4 Anagram YZX present at index 6 Anagram XYZ present at index 9

The time complexity of this solution would be O((n – m) × m) as there are `n-m` substrings of size `m`, and it takes O(m) time and O(m) space to check if they are anagrams or not. Here, `n` and `m` are lengths of the first and second strings, respectively.

We can also solve this problem using a permutation check helper, which determines if a sequence is a permutation of another sequence:

```ts
// Function to find all substrings of string 'X' that are
// permutations of string 'Y'
const findAllAnagrams = (X: string, Y: string): void => {
    // `m` and `n` store the length of the string 'Y' and 'X', respectively
    const m = Y.length;
    const n = X.length;

    // invalid input
    if (m > n) {
        return;
    }

    // determines if a sequence is a permutation of another sequence
    const isPermutation = (a: string, b: string): boolean => {
        if (a.length !== b.length) {
            return false;
        }
        const counts = new Map<string, number>();
        for (const ch of a) {
            counts.set(ch, (counts.get(ch) ?? 0) + 1);
        }
        for (const ch of b) {
            const count = counts.get(ch) ?? 0;
            if (count === 0) {
                return false;
            }
            counts.set(ch, count - 1);
        }
        return true;
    };

    for (let i = 0; i <= n - m; i++) {
        // if a substring `X[i…i+m]` is a permutation of 'Y'
        if (isPermutation(X.slice(i, i + m), Y)) {
            console.log(`Anagram ${X.slice(i, m + i)} present at index ${i}`);
        }
    }
};

const X = 'XYYZXZYZXXYZ';
const Y = 'XYZ';
findAllAnagrams(X, Y);
```

**Output:** Anagram YZX present at index 2 Anagram XZY present at index 4 Anagram YZX present at index 6 Anagram XYZ present at index 9
