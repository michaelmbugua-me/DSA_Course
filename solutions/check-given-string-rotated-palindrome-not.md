# Check if a string is a rotated palindrome or not

> Source: https://www.techiedelight.com/check-given-string-rotated-palindrome-not/

[String](https://www.techiedelight.com/Category/String/)

Given a string, check if it is a rotated palindrome or not.

For example,

`CBAABCD` is a rotated palindrome as it is a rotation of palindrome `ABCDCBA`. `BAABCC` is a rotated palindrome as it is a rotation of palindrome `ABCCBA`.

> 

## Approach 1

A naive solution is to consider all rotations of the given string and check if any rotation is a palindrome or not. If we have found a rotation that is a palindrome, return true; otherwise, return false.

Following is a TypeScript implementation of the idea:

```ts
// Recursive function to check if `s[low…high]` is a palindrome or not
const isPalindrome = (s: string, low: number, high: number): boolean => {
    return low >= high || (s[low] === s[high] && isPalindrome(s, low + 1, high - 1));
};

// Function to check if a given string is a rotated palindrome or not
const isRotatedPalindrome = (s: string): boolean => {

    // length of the given string
    const n = s.length;

    // check for all rotations of the given string if it
    // is palindrome or not
    for (let i = 0; i < n; i++) {

        // in-place rotate the string by 1 unit
        s = s.slice(1) + s[0];

        // return true if the rotation is a palindrome
        if (isPalindrome(s, 0, n - 1)) {
            return true;
        }
    }

    // return false if no rotation is a palindrome
    return false;
};

// demo

// palindromic string
let s = 'ABCDCBA';

// rotate it by 2 units
s = s.slice(2) + s.slice(0, 2);

if (isRotatedPalindrome(s)) {
    console.log('The string is a rotated palindrome');
} else {
    console.log('The string is not a rotated palindrome');
}
```

**Output:** The string is a rotated palindrome

## Approach 2

The problem is similar to finding the [Longest Palindromic Substring](https://techiedelight.com/longest-palindromic-substring-non-dp-space-optimized-solution/) problem. Let the given string be `S` of length `n`. The idea is to concatenate the string with itself, i.e., `(S = S + S)`, and find a palindromic substring of length `n` in the modified string `(S + S)`. If a palindromic substring of length `n` exists in the modified string, return true; otherwise, return false.

Following is a TypeScript implementation of the idea:

```ts
// Expand in both directions of `low` and `high` to find
// palindrome of length `k`
const expand = (s: string, low: number, high: number, k: number): boolean => {

    while (low >= 0 && high < s.length && s[low] === s[high]) {

        // return true palindrome of length `k` is found
        if (high - low + 1 === k) {
            return true;
        }

        // Expand in both directions
        low = low - 1;
        high = high + 1;
    }

    // return false if palindrome of length `k` is not found
    return false;
};

// Function to check if a palindromic substring of length `k` exists or not
const longestPalindromicSubstring = (s: string, k: number): boolean => {

    for (let i = 0; i < s.length - 1; i++) {
        // check if odd or even length palindrome of length `k`
        // having `s[i]` as its midpoint exists
        if (expand(s, i, i, k) || expand(s, i, i + 1, k)) {
            return true;
        }
    }

    return false;
};

// Function to check if a given string is a rotated palindrome or not
const isRotatedPalindrome = (s: string): boolean => {

    // length of the given string
    const n = s.length;

    // return true if the longest palindromic substring of length `n`
    // exists in the string `s + s`
    return longestPalindromicSubstring(s + s, n);
};

// demo

// palindromic string
let s = 'ABCCBA';

// rotate it by 2 units
s = s.slice(2) + s.slice(0, 2);

if (isRotatedPalindrome(s)) {
    console.log('The string is a rotated palindrome');
} else {
    console.log('The string is not a rotated palindrome');
}
```

The time complexity of both above-discussed methods is O(n2), where `n` is the length of the input string and doesn’t require any extra space.
