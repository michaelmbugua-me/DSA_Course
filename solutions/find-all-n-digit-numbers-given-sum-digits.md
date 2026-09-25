# Find all n-digit numbers with a given sum of digits

> Source: https://www.techiedelight.com/find-all-n-digit-numbers-given-sum-digits/

[String](https://www.techiedelight.com/Category/String/)

Find all n–digit numbers with a given sum where `n` varies from `1` to `9` and `sum <= 81` (Maximum possible sum in a 9–digit number).

For example,

**3–digit numbers with sum 6 are** 105 114 123 132 141 150 204 213 222 231 240 303 312 321 330 402 411 420 501 510 600 **5–digit numbers with sum 42 are** 69999 78999 79899 79989 79998 87999 88899 88989 88998 89799 89889 89898 89979 89988 89997 96999 97899 97989 97998 98799 98889 98898 98979 98988 98997 99699 99789 99798 99879 99888 99897 99969 99978 99987 99996

> 

A simple solution would be to generate all n–digit numbers and print only those numbers that satisfy the given constraints. The time complexity of this solution would be exponential.

A better solution is to generate only those n–digit numbers that satisfy the given constraints. The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We append digits from `0` to `9` to the partially formed number and recur with one less digit at each point in the recursion. One particular case we need to handle that the number should not start with `0`. We also maintain the sum of digits so far in the partially formed number. The code can be optimized to return if the sum of digits so far is more than the given sum at any point in the recursion.

The algorithm can be implemented as follows in TypeScript in a bottom-up manner, i.e., start from the first index and recursively fill the digits from left to right.

```ts
// Function to find all n–digit numbers with a sum of digits equal to `target`
// in a bottom-up manner
function findNdigitNums(n: number, target: number, result = ''): void {

    // if the number is less than n–digit and its sum of digits is
    // less than the given sum
    if (n > 0 && target >= 0) {

        let d = 0;
        if (result === '') {        // special case: number cannot start from 0
            d = 1;
        }

        // consider every valid digit and put it in the current index,
        // and recur for the next index
        while (d <= 9) {
            findNdigitNums(n - 1, target - d, result + d.toString());
            d = d + 1;
        }
    }

    // if the number becomes n–digit and its sum of digits is
    // equal to the given sum, print it
    else if (n === 0 && target === 0) {
        process.stdout.write(result + ' ');
    }
}

const n = 3;          // n–digit
const target = 6;     // given sum

findNdigitNums(n, target);
```

**Output:** 105 114 123 132 141 150 204 213 222 231 240 303 312 321 330 402 411 420 501 510 600

Also See:

> [Find all n-digit numbers with equal sum of digits at even and odd indices](https://www.techiedelight.com/find-n-digit-numbers-with-equal-sum-even-odd-digits/ "Find all n-digit numbers with equal sum of digits at even and odd indices")

> [Find all n-digit binary numbers with an equal sum of bits in their two halves](https://www.techiedelight.com/find-n-digit-binary-numbers-equal-sum-bits-two-halves/ "Find all n-digit binary numbers with an equal sum of bits in their two halves")

> [Find all n-digit strictly increasing numbers (Bottom-up and Top-down approach)](https://www.techiedelight.com/find-n-digit-strictly-increasing-numbers-bottom-top-approach/ "Find all n-digit strictly increasing numbers \(Bottom-up and Top-down approach\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.59/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
