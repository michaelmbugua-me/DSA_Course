# Find the longest even-length palindromic sum substring of a string

> Source: https://www.techiedelight.com/longest-even-length-palidromic-sum-substring/

[String](https://www.techiedelight.com/Category/String/)

Find the length of the longest contiguous substring of a given string, such that the length of the substring is `2×n` digits and the sum of the leftmost `n` digits is equal to the sum of the rightmost `n` digits. If there is no such substring, return `0`.

The problem differs from the problem of finding the longest even-length palindromic sum subsequence. Unlike subsequences, [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) are required to occupy consecutive positions within the original string.

For example,

**Input:** 13267224 The length of the longest palindromic sum substring is 6. **326722** = (3 + 2 + 6) = (7 + 2 + 2) = 11 **Input:** 546374 The length of the longest palindromic sum substring is 4. **4637** = (4 + 6) = (3 + 7) = 10

> 

The idea is to consider every even length substring present in the string and calculate the sum of digits of their left and right half. Then, return the maximum length among the length of all substrings that have an equal sum in the left and right half.

The algorithm can be implemented as follows in TypeScript. To calculate the sum of the left and right half in constant time, a sum array is maintained.

```ts
// Function to find the maximum length of a substring with an equal sum
// of left and right half
function longestPalindrome(s: string): number {
  // `total[i]` stores sum of digits of a substring `s[0…i-1]`
  const total: number[] = Array(s.length + 1).fill(0);

  for (let i = 1; i <= s.length; i++) {
    total[i] = total[i - 1] + Number(s[i - 1]);
  }

  // stores the maximum length of a substring with an equal sum
  // of left and right half
  let max = 0;

  // consider even length substring from index `i` to `j`
  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j += 2) {
      // calculate the length of the substring
      const length = j - i + 1;

      // find the middle index of the substring
      const mid = i + Math.floor(length / 2);

      // if the sum of the left and right half is the same as the length of
      // the substring is more than the maximum length found so far
      if (total[mid] - total[i] === total[j + 1] - total[mid] && max < length) {
        max = length;
      }
    }
  }

  return max;
}

const s = '13267224';
console.log('The length of the longest palindromic sum substring is',
  longestPalindrome(s));
```

**Output:** The length of the longest palindromic sum substring is 6

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the length of the input string.

Can we do it with constant space?

We know that an even length palindrome will have two middle points. The idea is to consider every adjacent pair of digits in the string as midpoints and expand in both directions to find the maximum length palindrome. The longest palindromic substring problem inspires the idea.

Following is a TypeScript implementation of the idea:

```ts
// Expand in both directions of `low` and `high` to find the maximum length palindrome
function expand(s: string, low: number, high: number, max: number): number {
  let leftsum = 0, rightsum = 0;

  while (low >= 0 && high < s.length) {
    // update sum of the left and right half
    leftsum += Number(s[low]);
    rightsum += Number(s[high]);

    // update the maximum length of palindrome if the sum of the left half
    // becomes the same as the right half
    if (leftsum === rightsum && high - low + 1 > max) {
      max = high - low + 1;
    }

    // Expand in both directions
    low--;
    high++;
  }

  return max;
}

// Function to find the maximum length of a substring with an equal
// sum of left and right half
function longestPalindrome(s: string): number {
  // stores the maximum length of a substring with an equal sum
  // of left and right half
  let max = 0;

  // an even length palindrome will have two middle points

  // consider every adjacent pair of digits as midpoints and
  // expand in both directions to find the maximum length palindrome
  for (let i = 0; i < s.length - 1; i++) {
    max = expand(s, i, i + 1, max);
  }

  return max;
}

const s = '546374';
console.log('The length of the longest palindromic sum substring is',
  longestPalindrome(s));
```

**Output:** The length of the longest palindromic sum substring is 4

The time complexity of the above solution is O(n2), where `n` is the length of the input string and doesn’t require any extra space.
