# Reverse bits of an integer using a lookup table

> Source: https://www.techiedelight.com/reverse-bits-integer-using-lookup-table/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, reverse its bits using binary operators and lookup table in O(1) time.

For example, `1691315356` in binary is `01100100110011110110110010011100`. On reversing its bits, we get number `959902502` which is `00111001001101101111001100100110` in binary.

> 

We have discussed two solutions to reverse bits of a number in the [previous post](https://techiedelight.com/reverse-bits-of-given-integer/). Both solutions have a worst-case time complexity of O(log(n)). In this post, an O(1) time solution is discussed.

The idea is to use a **lookup table** to return the reverse of a number in constant time. An integer usually takes 4 bytes for storage. That means the maximum number it can store is `232-1`. A lookup table for all `232-1` integers will be infeasible (Not to forget, we have negative numbers too). The trick is to create an `8–bit (1 byte)` version of the table, then iterate over each byte in the integer to be checked and summing the lookup table results.

1 byte with all its bits set is 255 in decimal (`11111111` in binary), and all bits unset is 0 in decimal (`00000000` in binary). So, the lookup table should be of size 256 `(0-255)`.

The following solution generates the lookup table at runtime. The first and last few numbers of the sequence will be.

{ 0, 128, 64, 192, 32, 160, … , 95, 223, 63, 191, 127, 255 } as 0 reverse is 0 1 reverse is 128 2 reverse is 64 3 reverse is 192 4 reverse is 32 5 reverse is 160 … … 250 reverse is 95 251 reverse is 223 252 reverse is 63 253 reverse is 191 254 reverse is 127 255 reverse is 255

Consider the binary number `01100100110011110110110010011100`. The process can be summarized as ‘Split, Reverse, and Rearrange’:

**1\. Split the integer into 8–bit chunks** 01100100 | 11001111 | 01101100 | 10011100 **2\. Reverse the chunks using lookup table** lookup[10011100] = 00111001 lookup[01101100] = 00110110 lookup[11001111] = 11110011 lookup[01100100] = 00100110 00100110 | 11110011 | 00110110 | 00111001 **3\. Rearrange chunks** 00111001 | 00110110 | 11110011 | 00100110

The following TypeScript solution combines the Split, Reverse, and Rearrange in a single expression for each chunk:

```ts
// Helpers to generate the lookup table (the C++ macros `R2`, `R4`, `R6`, and
// `REVERSE_BITS` are reproduced below at runtime)
const R2 = (n: number): number[] => [n, n + 2 * 64, n + 1 * 64, n + 3 * 64];
const R4 = (n: number): number[] => [...R2(n), ...R2(n + 2 * 16), ...R2(n + 1 * 16), ...R2(n + 3 * 16)];
const R6 = (n: number): number[] => [...R4(n), ...R4(n + 2 * 4), ...R4(n + 1 * 4), ...R4(n + 3 * 4)];

// lookup table to store the reverse of each index of the table.
// The helper `REVERSE_BITS` generates the table
const lookup: number[] = [...R6(0), ...R6(2), ...R6(1), ...R6(3)];

// Function to reverse bits of `n` using a lookup table
function reverseBits(n: number): number {
    // print lookup table (reverse of integer `i`)
    /*
    for (let i = 0; i < 256; i++) {
        console.log(i + ' reverse is ' + lookup[i]);
    }
    */

    /* Assuming a 32–bit (4 bytes) integer, break the integer into 8–bit chunks.
       Note mask used `0xff` is `11111111` in binary */

    // split, reverse, and rearrange each chunk

    const reverse = lookup[n & 0xff] << 24 |      // consider the first 8 bits
        lookup[(n >> 8) & 0xff] << 16 |           // consider the next 8 bits
        lookup[(n >> 16) & 0xff] << 8 |           // consider the next 8 bits
        lookup[(n >> 24) & 0xff];                 // consider last 8 bits

    return reverse >>> 0;
}

const n = 1691315356;

const toBinary = (x: number): string => (x >>> 0).toString(2).padStart(32, '0');

console.log(`${n} in binary is ${toBinary(n)}`);
console.log(`On reversing bits ${toBinary(reverseBits(n))}`);
```

**Output:** 1691315356 in binary is 01100100110011110110110010011100 On reversing bits 00111001001101101111001100100110

Also See:

> [Count set bits using a lookup table](https://www.techiedelight.com/count-set-bits-using-lookup-table/ "Count set bits using a lookup table")

> [Compute the parity of a number using a lookup table](https://www.techiedelight.com/compute-parity-number-using-lookup-table/ "Compute the parity of a number using a lookup table")

> [Reverse bits of an integer](https://www.techiedelight.com/reverse-bits-of-given-integer/ "Reverse bits of an integer")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 87

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
