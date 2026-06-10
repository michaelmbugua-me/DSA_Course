# Determine whether a string is a palindrome or not

> Source: https://www.techiedelight.com/determine-given-string-is-palindrome-not/

Write a program to determine whether a given string is palindrome. A palindromic string is a string that remains the same with its characters reversed. Like `ABCBA`, for example, is “symmetrical”.

> 

A simple solution would be to reverse the string and compare if the original string is equal to the reversed string or not. If strings are found to be equal, we can say that the given string is a palindrome. This solution, though concise and straightforward, is not [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/). Also, the comparison function might end up iterating till the end of the string. This solution is linear on paper, but we can still do better.

We can easily check for palindromic string in-place without using extra string and without iterating through the complete string. The idea is to take two pointers that point at the beginning and end of the string and start comparing characters pointed by them. The first iteration will check if the first and last characters are the same, and the next iteration will compare the next pair and so on. If a mismatch happens at any point, we can say that the given string is not a palindrome.

## Iterative Version

The iterative implementation can be seen below in TypeScript:

```ts
// Iterative function to check if the given string is a palindrome or not
function isPalindrome(s: string): boolean {
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    // if a mismatch happens
    if (s[i] !== s[j]) {
      return false;
    }

    i = i + 1;
    j = j - 1;
  }

  return true;
}

const s = "XYBYBYX";

if (isPalindrome(s)) {
  console.log("Palindrome");
} else {
  console.log("Not Palindrome");
}
```

**Output:** Palindrome

## Recursive Version

The recursive implementation can be seen below in TypeScript:

```ts
// Recursive function to check if `s[low…high]` is a palindrome or not
function isPalindrome(s: string, low: number, high: number): boolean {
  // base case
  if (low >= high) {
    return true;
  }

  // return false if mismatch happens
  if (s[low] !== s[high]) {
    return false;
  }

  // move to the next pair
  return isPalindrome(s, low + 1, high - 1);
}

const s = "XYBYBYX";

if (isPalindrome(s, 0, s.length - 1)) {
  console.log("Palindrome");
} else {
  console.log("Not Palindrome");
}
```

**Output:** Palindrome

We can also rewrite the above recursive code in a single line (remember, an interviewer can ask this as a follow-up question or even start with this problem itself).

```ts
// Recursive function to check if `s[low…high]` is a palindrome or not
function isPalindrome(s: string, low: number, high: number): boolean {
  return low >= high || (s[low] === s[high] && isPalindrome(s, low + 1, high - 1));
}

const s = "XYBYBYX";
const len = s.length;

if (isPalindrome(s, 0, len - 1)) {
  console.log("Palindrome");
} else {
  console.log("Not Palindrome");
}
```

**Output:** Palindrome
