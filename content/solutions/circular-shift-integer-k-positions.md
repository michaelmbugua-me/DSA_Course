# Circular shift on the binary representation of an integer by `k` positions

> Source: https://www.techiedelight.com/circular-shift-integer-k-positions/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given two positive integers `n` and `k`, perform a circular shift on the binary representation of `n` by `k` positions.

The circular shift can be of two types:

  1. Left circular shift (moving the final bit to the first position while shifting all other bits to the next position).
  2. Right circular shift (moving the first bit to the last position while shifting all other bits to the previous position).

For example,

**Input:** N = 127 (00000000000000000000000001111111) shift = 3 **Output:** Left Shift 00000000000000000000001111111000 Right Shift 11100000000000000000000000001111

> 

The idea is to perform a normal bitwise left or right shift by first isolating the sequence of k–bits from the right or left side, respectively. Finally, return the bitwise `OR` of the shifted number with isolated bits at their correct position.

For example, consider `n = 127` which is `00000000000000000000000001111111`.

Circular Right shift by 3:

1\. Isolate the 3–bits from the right: 00000000000000000000000001111**111** 2\. Right shift by 3 00000000000000000000000001111****111**000** 00000000000000000000000001111 3\. OR with isolated bits: 00000000000000000000000000001111 **111** 00000000000000000000000000000 ———————————————————————————————— 11100000000000000000000000001111

Circular Left shift by 3:

1\. Isolate the 3–bits from the left: **000** 00000000000000000000001111111 2\. Left shift by 3: ****00000000000000000000000001111111 00000000000000000000001111111**000** 3\. OR with isolated bits: 00000000000000000000001111111000 00000000000000000000000000000**000** ———————————————————————————————— 00000000000000000000001111111000

Following is a TypeScript program that demonstrates it:

```ts
// convert a number to its 32–bit binary string representation
const toBinaryString = (n: number): string =>
    (n >>> 0).toString(2).padStart(32, '0');

// Function to perform left circular shift or right circular
// shift on integer `n` by `k` positions based on flag `isLeftShift`
const shift = (n: number, k: number, isLeftShift: boolean): number => {

    // left shift by `k`
    if (isLeftShift) {
        return (n << k) | (n >>> (32 - k));
    }

    // right shift by `k`
    return (n >>> k) | (n << (32 - k));
};

// demo

const n = 127;
const shiftBy = 3;

console.log('No Shift    ' + toBinaryString(n));
console.log('Left Shift  ' + toBinaryString(shift(n, shiftBy, true)));
console.log('Right Shift ' + toBinaryString(shift(n, shiftBy, false)));
```

**Output:** No Shift 00000000000000000000000001111111 Left Shift 00000000000000000000001111111000 Right Shift 11100000000000000000000000001111

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 96

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
