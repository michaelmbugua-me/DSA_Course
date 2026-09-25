# Find the minimum number possible by doing at-most `k` swaps

> Source: https://www.techiedelight.com/find-minimum-number-possible-k-swaps/

Given a positive integer, find the minimum number possible by doing at-most `k` swap operations upon its digits.

For example,

**Input:** S = 934651, k = 1 **Output:** 134659 **Input:** S = 934651, k = 2 **Output:** 134569 **Input:** S = 52341, k = 2 **Output:** 12345 (Only 1 swap needed) **Input:** S = 12345, k = 2 **Output:** 12345 (no change as all digits are already sorted in increasing order)

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to consider every digit and swap it with digits following it, one at a time, and see if it leads to the minimum number. This process repeats `k` times.

The implementation can be seen below in TypeScript:

```ts
const swap = (digits: string[], i: number, j: number): void => {
    const digit = digits[i];
    digits[i] = digits[j];
    digits[j] = digit;
};

// Find the minimum number formed by doing at-most `k` swap operations upon
// digits of the string
const findMin = (digits: string[], k: number, min_so_far: string): string => {

    // compare the current number with a minimum number so far
    const num = digits.join('');
    if (num < min_so_far) {
        min_so_far = num;
    }

    // base case: no swaps left
    if (k < 1) {
        return min_so_far;
    }

    // do for each digit in the input string
    for (let i = 0; i < digits.length - 1; i++) {

        // compare the current digit with the remaining digits
        for (let j = i + 1; j < digits.length; j++) {

            // if the digit at i'th index is more than the digit at j'th index
            if (digits[i] > digits[j]) {
                // swap `digits[i]` with `digits[j]`
                swap(digits, i, j);

                // recur for remaining `k-1` swap
                min_so_far = findMin(digits, k - 1, min_so_far);

                // backtrack: restore the list
                swap(digits, i, j);
            }
        }
    }

    return min_so_far;
};

const findMinimum = (s: string, k: number): string => {

    // base case
    if (!s) {
        return s;
    }

    // convert digits of a given integer to a list of strings to
    // facilitate operations on them
    const digits = s.split('');
    return findMin(digits, k, s);
};

// input number
const s = '934651';
const k = 2;

const min = findMinimum(s, k);
console.log(`The minimum number formed by doing at-most ${k} swaps is ${min}`);
```

**Output:** The minimum number formed by doing at-most 2 swaps is 134569

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
