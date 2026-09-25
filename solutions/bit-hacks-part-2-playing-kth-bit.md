# Bit Hacks – Part 2 (Playing with k’th bit)

> Source: https://www.techiedelight.com/bit-hacks-part-2-playing-kth-bit/

[Binary](https://www.techiedelight.com/Category/Binary/)

This post will discuss a few related problems that operate on the k’th bit of a number.

The following problems are covered in this post:

  * Turn off k’th bit in a number.
  * Turn on k’th bit in a number.
  * Check if k’th bit is set for a number.
  * Toggle the k’th bit.

## Problem 1. Turn off k’th bit in a number

> 

The idea is to use bitwise `<<`, `&`, and `~` operators. Using the expression `~ (1 << (k - 1))`, we get a number with all its bits set, except the `k'th` bit. If we do a bitwise AND of this expression with `n`, i.e., `n & ~(1 << (k - 1))`, we get a number which has all bits the same as `n` except the `k'th` bit which will be set to 0.

For example, consider `n = 20` and `k = 3`.

00010100 & (n = 20) 11111011 ~ (1 << (3-1)) ~~~~~~~~ 00010000

Following is the TypeScript implementation of the idea:

```ts
// Function to turn off k'th bit in `n`
function turnOffKthBit(n: number, k: number): number {
    return n & ~(1 << (k - 1));
}

let n = 20;
const k = 3;

const toBinaryString = (n: number): string => n.toString(2).padStart(8, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`Turning k'th bit off…`);
n = turnOffKthBit(n, k);
console.log(`${n} in binary is ${toBinaryString(n)}`);
```

**Output:** 20 in binary is 00010100 Turning k’th bit off 16 in binary is 00010000


## Problem 2. Turn on k’th bit in a number

> 

The idea is to use bitwise `<<` and `|` operators. Using the expression `1 << (k - 1)`, we get a number with all bits 0, except the `k'th` bit. If we do bitwise `OR` of this expression with `n`, i.e., `n | (1 << (k - 1))`, we get a number which has all bits the same as `n` except the `k'th` bit which will be set to 1.

For example, consider `n = 20` and `k = 4`.

00010100 | (n = 20) 00001000 (1 << (4 – 1)) ~~~~~~~~ 00011100

Following is the TypeScript program that demonstrates it:

```ts
// Function to turn on k'th bit in `n`
function turnOnKthBit(n: number, k: number): number {
    return n | (1 << (k - 1));
}

let n = 20;
const k = 4;

const toBinaryString = (n: number): string => n.toString(2).padStart(8, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`Turning k'th bit on…`);
n = turnOnKthBit(n, k);
console.log(`${n} in binary is ${toBinaryString(n)}`);
```

**Output:** 20 in binary is 00010100 Turning k’th bit on 28 in binary is 00011100


## Problem 3. Check if k’th bit is set for a number

> 

The idea is to use bitwise `<<` and `&` operators. Using the expression `1 << (k - 1)`, we get a number with all bits 0, except the `k'th` bit. If we do bitwise `AND` of this expression with `n`, i.e., `n & (1 << (k - 1))`, any non-zero value indicates that its `k'th` bit is set.

For example, consider `n = 20` and `k = 3`.

00010100 & (n = 20) 00000100 (1 << (3-1)) ~~~~~~~~ 00000100 non-zero value

Following is the TypeScript implementation of the idea:

```ts
// Function to check if k'th bit is set for `n` or not
function isKthBitSet(n: number, k: number): boolean {
    return (n & (1 << (k - 1))) !== 0;
}

const n = 20;
const k = 3;

const toBinaryString = (n: number): string => n.toString(2).padStart(8, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);

if (isKthBitSet(n, k)) {
    console.log(`k'th bit is set`);
} else {
    console.log(`k'th bit is not set`);
}
```

**Output:** 20 in binary is 00010100 k’th bit is set
