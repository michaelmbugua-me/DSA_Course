# Find all n-digit numbers with equal sum of digits at even and odd indices

> Source: https://www.techiedelight.com/find-n-digit-numbers-with-equal-sum-even-odd-digits/

Find all n–digit numbers with an equal sum of digits at even and odd indices, where `n` varies from `2` to `9`.

For example,

3–digit numbers with an equal sum of digits at even and odd indices 110 121 132 143 154 165 176 187 198 220 231 242 253 264 275 286 297 330 341 352 363 374 385 396 440 451 462 473 484 495 550 561 572 583 594 660 671 682 693 770 781 792 880 891 990 5–digit numbers with an equal sum of digits at even and odd indices 10010 10021 10032 10043 10054 10065 10076 10087 10098 10120 10131 10142 10153 10164 10175 10186 10197 10230 10241 10252 10263 10274 10285 10296 10340 10351 10362 10373 10384 10395 10450 10461 10472 10483 10494 10560 10571 10582 10593 10670 10681 10692 10780 10791 10890 11000 11011 11022 11033 11044 11055 11066 11077 11088 11099 11110 11121 11132 11143 11154 11165 11176 11187 11198 11220 …… …… and many more…

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We append digits from `0` to `9` to the partially formed number and recur with one less digit at each point in the recursion. We also maintain a variable to store the difference between even and odd digits so far in the partially formed number. If we have filled n–digits and the difference is `0`, print the number. One special case we need and handle that the number should not start with `0`.

The algorithm can be implemented as follows in TypeScript in a bottom-up manner, i.e., we start from the first index and recursively fill the digits from left to right.

```ts
// Function to find all n–digit numbers with an equal sum of digits at even
// and odd index in a bottom-up manner
const findNdigitNums = (n: number, result: string = '', diff: number = 0): void => {

    // if the number is less than n–digit
    if (n > 0) {

        let ch = '0'.charCodeAt(0);

        // special case: number cannot start from 0
        if (result === '') {
            ch = '1'.charCodeAt(0);
        }

        // consider every valid digit and put it in the current
        // index and recur for the next index
        while (ch <= '9'.charCodeAt(0)) {

            // update difference between odd and even digits
            const absdiff = (n & 1)
                ? diff + (ch - '0'.charCodeAt(0))   // add value to `diff` if the digit is odd
                : diff - (ch - '0'.charCodeAt(0));  // subtract a value from `diff` if even

            findNdigitNums(n - 1, result + String.fromCharCode(ch), absdiff);
            ch = ch + 1;
        }
    }

    // if the number becomes n–digit with an equal sum of even and odd
    // digits, print it
    else if (n === 0 && Math.abs(diff) === 0) {
        console.log(result);
    }
};

const n = 3;    // n–digit

findNdigitNums(n);
```

**Output:** 110 121 132 143 154 165 176 187 198 220 231 242 253 264 275 286 297 330 341 352 363 374 385 396 440 451 462 473 484 495 550 561 572 583 594 660 671 682 693 770 781 792 880 891 990

**Output:** 110 121 132 143 154 165 176 187 198 220 231 242 253 264 275 286 297 330 341 352 363 374 385 396 440 451 462 473 484 495 550 561 572 583 594 660 671 682 693 770 781 792 880 891 990

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find all n-digit binary numbers with an equal sum of bits in their two halves](https://www.techiedelight.com/find-n-digit-binary-numbers-equal-sum-bits-two-halves/ "Find all n-digit binary numbers with an equal sum of bits in their two halves")

> [Find all n-digit numbers with a given sum of digits](https://www.techiedelight.com/find-all-n-digit-numbers-given-sum-digits/ "Find all n-digit numbers with a given sum of digits")

> [Find all n-digit strictly increasing numbers (Bottom-up and Top-down approach)](https://www.techiedelight.com/find-n-digit-strictly-increasing-numbers-bottom-top-approach/ "Find all n-digit strictly increasing numbers \(Bottom-up and Top-down approach\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
