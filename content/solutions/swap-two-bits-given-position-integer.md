# Swap two bits at a given position in an integer

> Source: https://www.techiedelight.com/swap-two-bits-given-position-integer/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, swap two bits at given positions in a binary representation of it.

For example,

**Input:** n = 31 (31 in binary is 00011111) p = 2, q = 6 (3rd and 7th bit from the right) **Output:** 91 **Explanation:** 91 in binary is 01011011

> 

We can solve this problem by checking if the two bits at given positions are the same or not. If they are the same, nothing needs to be done; otherwise, if they are not the same (i.e., one is 0 and the other is 1), then we can XOR them with `1 << position`. This logic will work because:

XOR with 1 will toggle the bits 0 ^ 1 = 1 1 ^ 1 = 0 XOR with 0 will have no impact 0 ^ 0 = 0 1 ^ 0 = 1

Following is a TypeScript implementation of the idea:

```ts
// Function to swap bits at position `p` and `q` in integer `n`
function swap(n: number, p: number, q: number): number {
    // if bits are different at position `p` and `q`
    if ((((n & (1 << p)) >> p) ^ ((n & (1 << q)) >> q)) === 1) {
        n ^= 1 << p;
        n ^= 1 << q;
    }
    return n;
}

let n = 31;

// swap 3rd and 7th bit from the right
const p = 2;
const q = 6;

console.log(`${n} in binary is`, n.toString(2).padStart(8, '0'));
n = swap(n, p, q);
console.log(`${n} in binary is`, n.toString(2).padStart(8, '0'));
```

Also See:

> [Swap individual bits at a given position in an integer](https://www.techiedelight.com/swap-individual-bits-given-position-integer/ "Swap individual bits at a given position in an integer")

> [Swap adjacent bits of a number](https://www.techiedelight.com/swap-adjacent-bits-number/ "Swap adjacent bits of a number")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 55

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
