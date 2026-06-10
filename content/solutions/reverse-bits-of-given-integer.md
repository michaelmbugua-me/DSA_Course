# Reverse bits of an integer

> Source: https://www.techiedelight.com/reverse-bits-of-given-integer/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, reverse its bits using binary operators.

For example, `-100` in binary is `11111111111111111111111110011100`. On reversing its bits, we get number `973078527` which is `00111001111111111111111111111111` in binary.

> 

The idea is to initialize the result by 0 (all bits 0) and process the given number starting from its least significant bit. If the current bit is 1, set the corresponding most significant bit in the result and finally move on to the next bit in the input number. Repeat this till all its bits are processed.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to reverse bits of a given integer
function reverseBits(n: number): number {
    const SIZE = 32;            // Assume 32-bit integer
    let pos = SIZE - 1;         // maintains shift

    // store reversed bits of `n`. Initially, all bits are set to 0
    let reverse = 0;

    // do till all bits are processed
    while (pos >= 0 && n) {
        // if the current bit is 1, then set the corresponding bit in the result
        if (n & 1) {
            reverse = reverse | (1 << pos);
        }

        n >>= 1;                // drop current bit (divide by 2)
        pos--;                  // decrement shift by 1
    }

    return reverse >>> 0;
}

const n = -100;

const toBinaryString = (x: number): string => (x >>> 0).toString(2).padStart(32, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`On reversing bits ${toBinaryString(reverseBits(n))}`);
```

**Output:** -100 in binary is 11111111111111111111111110011100 On reversing bits 00111001111111111111111111111111



The above solution will process all bits in an integer till its last set bit. The code can be optimized to consider only set bits in an integer (which will be relatively less). The idea is to find the position of the rightmost set bit in the number and set the corresponding bit in the result, and finally, unset the rightmost set bit. Repeat this till all set bits are processed.

Please refer to [this post](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/) to find the position of the rightmost set bit and unset it. The algorithm can be implemented as follows in TypeScript:

```ts
// Function to reverse bits of a given integer
function reverseBits(n: number): number {
    const SIZE = 32;            // Assume 32-bit integer

    // store reversed bits of `n`. Initially, all bits are set to 0
    let reverse = 0;

    // do till all set bits are processed
    while (n !== 0) {
        // find the position of the rightmost set bit
        const pos = Math.log2(n & -n) + 1;

        // set the corresponding bit in the result
        // (set the leftmost bit at `pos`)
        reverse = reverse | (1 << (SIZE - pos));

        // unset the rightmost set bit of a number
        n = n & (n - 1);
    }

    return reverse >>> 0;
}

const n = -100;

const toBinaryString = (x: number): string => (x >>> 0).toString(2).padStart(32, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`On reversing bits ${toBinaryString(reverseBits(n))}`);
```

**Output:** -100 in binary is 11111111111111111111111110011100 On reversing bits 00111001111111111111111111111111

**Read More:**

> [Reverse bits of an integer using a lookup table](https://techiedelight.com/reverse-bits-integer-using-lookup-table/)
