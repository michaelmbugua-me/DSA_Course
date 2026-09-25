# Swap individual bits at a given position in an integer

> Source: https://www.techiedelight.com/swap-individual-bits-given-position-integer/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, swap consecutive `b` bits starting from the given positions in a binary representation of an integer. The bits to be swapped should not overlap with each other.

For example,

**Input:** n = 15 (15 in binary is 00001111) p = 2, q = 5 (3rd and 6th bit from the right) b = 2 (Total number of consecutive bits in each sequence) **Output:** 99 (99 in binary is 01100011)

> 

The idea is to store the result of _XOR_ ing the pairs of bit values we want to swap in a variable `x`, and then the bits are set to the result of themselves XORed with `x`. The code goes as:

// isolate the bits to be swapped and take their XOR x = ((n >> p) ^ (n >> q)) & ((1 << b) – 1) // replace the bits to be swapped with the XOR bits and take its XOR with n result = n ^ ((x << p) | (x << q))

Note that the result is undefined if the sequences overlap.

For example, consider `n = 15`, `p = 2`, `q = 5` (3rd and 6th bit from the right) and number of consecutive bits in each sequence `b = 2`.

**00** 00**11** 11 (n = 15) 000000**11** ^ (n >> p) 000000**00** (n >> q) ~~~~~~~~ 00000011 ((n >> p) ^ (n >> q)) 00000011 & ((n >> p) ^ (n >> q)) 00000011 ((1 << b) – 1) ~~~~~~~~ 00000011 x 00001100 | (x << p) 01100000 (x << q) ~~~~~~~~ 01101100 ((x << p) | (x << q)) 00001111 ^ (n = 15) 01101100 (n ^ ((x << p) | (x << q))) ~~~~~~~~ 01100011

Following is a TypeScript implementation of the idea:

```ts
// Function to swap b–bits starting from position `p` and `q` in an integer `n`
function swapBits(n: number, p: number, q: number, b: number): number {

    // take XOR of bits to be swapped
    let x = (n >> p) ^ (n >> q);

    // only consider the last b–bits of `x`
    x = x & ((1 << b) - 1);

    // replace the bits to be swapped with the XORed bits
    // and take its XOR with `n`
    return n ^ ((x << p) | (x << q));
}

function toBinaryString(n: number): string {
    return (n >>> 0).toString(2).padStart(8, '0');
}

let n = 15;

const p = 2, q = 5;     // 3rd and 6th bit from the right
const b = 2;            // total number of consecutive bits in each sequence

console.log(`${n} in binary is ${toBinaryString(n)}`);
n = swapBits(n, p, q, b);
console.log(`${n} in binary is ${toBinaryString(n)}`);
```

**References:** <https://graphics.stanford.edu/~seander/bithacks.html#SwappingBitsXOR>

Also See:

> [Swap two bits at a given position in an integer](https://www.techiedelight.com/swap-two-bits-given-position-integer/ "Swap two bits at a given position in an integer")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 90

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
