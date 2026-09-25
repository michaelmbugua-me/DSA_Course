# Brian Kernighan’s Algorithm to count set bits in an integer

> Source: https://www.techiedelight.com/brian-kernighans-algorithm-count-set-bits-integer/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given an integer, count its set bits.

For example,

**Input:** n = -1 (11…1111) **Output:** The total number of set bits in -1 is 32 **Input:** n = 16 (00001000) **Output:** The total number of set bits in 16 is 1

> 

## 1\. Brute-Force Solution

A simple solution is to consider every bit (set or unset) in a number and maintain a counter to keep track of the set bits. This method is demonstrated below in TypeScript:

```ts
// Naive solution to count the total number of set bits in `n`
function countSetBits(n: number): number {
    let count = 0;
    for (let i = 0; i < 32; i++) {
        count += (n & 1);    // check last bit
        n >>= 1;
    }
    return count;
}

const n = 16;
const toBinaryString = (n: number): string => n.toString(2).padStart(8, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`The total number of set bits in ${n} is ${countSetBits(n)}`);
```

**Output:** 16 in binary is 00010000 The total number of set bits in 16 is 1


The above brute-force approach requires one iteration per bit. So on a 32–bit integer, it goes through 32 iterations.

## 2\. Using Brian Kernighan’s algorithm

We can use Brian Kernighan’s algorithm to improve the above naive algorithm’s performance. The idea is to only consider the set bits of an integer by turning off its rightmost set bit (after counting it), so the next iteration of the loop considers the _next_ rightmost bit.

The expression `n & (n-1)` can be used to turn off the rightmost set bit of a number `n`. This works as the expression `n-1` flips all the bits after the rightmost set bit of `n`, including the rightmost set bit itself. Therefore, `n & (n-1)` results in the last bit flipped of `n`.

For example, consider number 52, which is `00110100` in binary, and has a total 3 bits set.

**1st iteration of the loop: n = 52** 00110100 & (n) 00110011 (n-1) ~~~~~~~~ 00110000 **2nd iteration of the loop: n = 48** 00110000 & (n) 00101111 (n-1) ~~~~~~~~ 00100000 **3rd iteration of the loop: n = 32** 00100000 & (n) 00011111 (n-1) ~~~~~~~~ 00000000 (n = 0)

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to count the total number of set bits in `n`
function countSetBits(n: number): number {

    // `count` stores the total bits set in `n`
    let count = 0;

    while (n) {
        n = n & (n - 1);    // clear the least significant bit set
        count++;
    }

    return count;
}

const n = -1;

const toBinaryString = (n: number): string =>
    (n >>> 0).toString(2).padStart(32, '0');

console.log(`${n} in binary is ${toBinaryString(n)}`);
console.log(`The total number of set bits in ${n} is ${countSetBits(n)}`);
```

**Output:** -1 in binary is 11111111111111111111111111111111 The total number of set bits in -1 is 32

The Brian Kernighan’s algorithm goes through as many iterations as there are set bits. So if we have a 32–bit word with only the high bit set, it will only go through the loop once.

## 3\. Using GCC built-in function

GCC also provides a built-in function `int **__builtin_popcount** (unsigned int n)` that returns the total number of set bits in `n`. JavaScript has no direct builtin equivalent, but the set bits can be counted from the binary representation. The following TypeScript program demonstrates it:

```ts
const n = 16;

const count = (n >>> 0).toString(2).replace(/0/g, '').length;

console.log(`The total number of set bits in ${n} is ${count}`);
```

**Output:** The total number of set bits in 16 is 1
