# Find XOR of two numbers without using the XOR operator

> Source: https://www.techiedelight.com/bit-hacks-part-6-random-problems/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given two integers, find their XOR without using the XOR operator.

> 

A naive solution would be to consider every bit present in both numbers one by one (either from left or right) and compare them. If the current bit is the same in both numbers (i.e., both are 0 or both are 1), set it as 0; otherwise, set it as 1 and move to the next pair of bits until all bits are processed.

The expression `(x | y) - (x & y)` is equivalent to `x ^ y` (finding XOR of two numbers `x` and `y`). The XOR works by setting the bits which are set in either of one of the given numbers `(0 ^ 1 = 1, 1 ^ 0 = 1)` and finally taking out the common bits present in both numbers `(1 ^ 1 = 0)`.

For example,

01000001 | (x = 65) 01010000 (y = 80) ~~~~~~~~ 01010001 (x | y) 01000001 & (x = 65) 01010000 (y = 80) ~~~~~~~~ 01000000 (x & y)

Now, the result `x ^ y` would be `(x | y) - (x & y) = (01010001 - 01000000) = 00010001`. Following is the TypeScript program that demonstrates it:

```ts
// Function to find XOR of two numbers without using XOR operator
function findBits(x: number, y: number): number {
    return (x | y) - (x & y);
}

const x = 65;
const y = 80;

const toBinaryString = (n: number): string => n.toString(2).padStart(8, '0');

console.log(`The first number in binary is ${toBinaryString(x | y)}`);
console.log(`The second number in binary is ${toBinaryString(x & y)}`);

console.log(`\nXOR is ${toBinaryString(findBits(x, y))}`);
```

**Output:** The first number in binary is 01000001 The second number in binary is 01010000 XOR is 00010001

**Suggested Read:** <https://graphics.stanford.edu/~seander/bithacks.html>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 116

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
