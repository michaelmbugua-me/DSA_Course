# Round up to the previous power of 2

> Source: https://www.techiedelight.com/round-previous-power-2/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given a positive number `n`, find the previous power of 2. If `n` itself is a power of 2, return `n`.

For example,

**Input:** n = 20 **Output:** 16 **Input:** n = 16 **Output:** 16

> 

## Approach 1

The idea is to unset the rightmost bit of `n` until only one bit is left, which will be the last set bit of the given number and a previous power of 2. This approach is demonstrated below in TypeScript:

```ts
// Compute a power of two less than or equal to `n`
function findPreviousPowerOf2(n: number): number {
    // do till only one bit is left
    while (n & n - 1) {
        n = n & n - 1;      // unset rightmost bit
    }

    // `n` is now a power of two (less than or equal to `n`)
    return n;
}

// demo
const n = 128;
console.log('The previous power of 2 is', findPreviousPowerOf2(n));
```

## Approach 2

The idea is to run a loop by initializing the _result_ by 1. We double the _result_ value at each iteration of the loop and divide `n` in half and continue the loop till `n` becomes 0.

Following is a TypeScript implementation based on the above idea:

```ts
// Compute a power of two less than or equal to `n`
function findPreviousPowerOf2(n: number): number {
    // initialize result by 1
    let k = 1;

    // double `k` and divide `n` in half till it becomes 0
    while (n) {
        k = k << 1;         // double `k`
        n >>= 1;
    }

    return k >> 1;
}

// demo
const n = 127;
console.log('The previous power of 2 is', findPreviousPowerOf2(n));
```

## Approach 3

The idea is to calculate the position `p` of the last set bit of `n` and return a number with its `p'th` bit set. In other words, drop all set bits from `n` except its last set bit.

The implementation can be seen below in TypeScript:

```ts
// Compute a power of two less than or equal to `n`
function findPreviousPowerOf2(n: number): number {
    // drop all set bits from `n` except its last set bit
    return 1 << Math.floor(Math.log2(n));
}

// demo
const n = 20;
console.log('The previous power of 2 is', findPreviousPowerOf2(n));
```

**Output:** The previous power of 2 is 16
