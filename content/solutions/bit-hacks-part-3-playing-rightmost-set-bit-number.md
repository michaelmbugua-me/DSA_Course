# Bit Hacks – Part 3 (Playing with the rightmost set bit of a number)

> Source: https://www.techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/

[Binary](https://www.techiedelight.com/Category/Binary/)

This post will discuss a few related problems related to unsetting the rightmost set bit of a number.

## How to unset the rightmost set bit of a number?

> 

The expression `n & (n-1)` will turn off the rightmost set bit of a number `n`. The expression `n-1` will have all the bits flipped after the rightmost set bit of `n` (including the rightmost set bit). So, `n & (n-1)` will result in the last bit flipped of `n`. Consider,

00010100 & (n = 20) 00010011 (n-1 = 19) ~~~~~~~~ 00010000 00…00000000 & (n = 0, no rightmost bit) 11…11111111 (n-1 = -1) ~~~~~~~~~~~ 00…00000000

The following problems can be solved by unset the rightmost set bit of a number:

  * Check if a positive integer is a power of 2 without using any branching or loop.
  * Find position of the rightmost set bit.
  * Find position of the only set bit in a number.
  * Computing parity of a number.

## Problem 1. Check if a positive integer is a power of 2 without using any branching or loop.

As discussed above, the expression `n & (n-1)` will unset the rightmost set bit of a number. If the number is a power of 2, it has only a 1–bit set, and `n & (n-1)` will unset the only set bit. So, we can say that `n & (n-1)` returns 0 if `n` is a power of 2; otherwise, it’s not a power of 2.

For example,

00010000 & (n = 16, only one set bit) 00001111 (n-1 = 15) ~~~~~~~~ 00000000

## Problem 2. Find the position of the rightmost set bit

> 

The idea is to unset the rightmost bit of number `n` and XOR the result with `n`. Then the rightmost set bit in `n` will be the position of the only set bit in the result. Note that if `n` is odd, we can directly return 1 as the first bit is always set for odd numbers.

For example, the number 20 in binary is `00010100`, and the position of the rightmost set bit is 3.

00010100 & (n = 20) 00010011 (n-1 = 19) ~~~~~~~~ 00010000 ^ (XOR result number with n) 00010100 ~~~~~~~~ 00000100 —— rightmost set bit will tell us the position

Following is the TypeScript implementation of the idea:

```ts
// Returns the position of the rightmost set bit of `n`
function positionOfRightmostSetBit(n: number): number {

    // if the number is odd, return 1
    if (n & 1) {
        return 1;
    }

    // unset rightmost bit and xor with the number itself
    n = n ^ (n & (n - 1));

    // find the position of the only set bit in the result;
    // we can directly return `log2(n) + 1` from the function
    let pos = 0;
    while (n) {
        n = n >> 1;
        pos = pos + 1;
    }

    return pos;
}

const n = 20;

const toBinaryString = (n: number): string => n.toString(2).padStart(8, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`The position of the rightmost set bit is ${positionOfRightmostSetBit(n)}`);
```

**Output:** 20 in binary is 00010100 The position of the rightmost set bit is 3


### Alternate Solution:

The idea is to negate `n` and perform bitwise `AND` operation with itself, i.e., `n & -n`. Then the position of the rightmost set bit in `n` will be the position of the only set bit in the result. We can also use this hack for problem 1. If `(n & -n) == n`, then the positive integer `n` is a power of 2.

For example,

00…0010100 & (n = 20) 11…1101100 (-n = -20) ~~~~~~~~~~ 00…0000100

Following is the TypeScript implementation of the idea:

```ts
// Returns the position of the rightmost set bit of `n`
function positionOfRightmostSetBit(n: number): number {

    // if the number is odd, return 1
    if (n & 1) {
        return 1;
    }

    return Math.floor(Math.log2(n & -n)) + 1;
}

const n = 20;

console.log(`The position of the rightmost set bit is ${positionOfRightmostSetBit(n)}`);
```

**Output:** The position of the rightmost set bit is 3


## Problem 3. Find the position of the only set bit in a number

The idea is to unset the rightmost bit of the number `n` and check if it becomes 0 or not. If it is non-zero, we know that there is another set bit present, and we have invalid input. If it becomes 0, then we can find the position of the only set bit by processing every bit of `n` one by one or directly using `log2(n) + 1`.

For example, the number 16 in binary is `00010000`, and the position of the rightmost set bit is 5.

00010000 & (n = 16) 00001111 (n-1 = 15) ~~~~~~~~ 00000000 log2(16) + 1 = 5

Following is the TypeScript implementation of the idea:

```ts
// Returns position of the only set bit of `n`
function positionOfSetBit(n: number): number {

    // unset the rightmost bit and check if the number is non-zero
    if (n & (n - 1)) {
        console.log('Wrong input');
        return 1;
    }

    return Math.floor(Math.log2(n)) + 1;
}

const n = 16;

const toBinaryString = (n: number): string => n.toString(2).padStart(8, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`The position of the only set bit is ${positionOfSetBit(n)}`);
```

**Output:** 16 in binary is 00010000 The position of the only set bit is 5
