# Check if a number is a power of 8 or not

> Source: https://www.techiedelight.com/check-given-number-power-8-not/

[Binary](https://www.techiedelight.com/Category/Binary/)

Given a positive number, check if it is a power of 8 or not.

> 

## Approach 1

A simple solution is to calculate `log8n` for a given number `n`. If it returns an integral value, then we can say that the number is a power of 8.

A TypeScript implementation can be seen below:

```ts
// Returns true if `n` is a power of 8
const checkPowerOf8 = (n: number): boolean => {

    // find `log8(n)`
    const i = Math.log(n) / Math.log(8);

    // return true if `log8(n)` is an integer
    return i - Math.floor(i) < 0.000001;
};

// demo
const n = 512 * 64;

if (checkPowerOf8(n)) {
    console.log(`${n} is a power of 8`);
} else {
    console.log(`${n} is not a power of 8`);
}
```

**Output:** 32768 is a power of 8

## Approach 2

The given number `n` is the power of 8 if it is the power of 2, and its only set bit is present at `(0, 3, 6, … , 30)` position.

### How to check for power of 2?

The expression `n & (n-1)` will unset the rightmost set bit of a number. If the number is the power of 2, it has only a 1–bit set, and `n & (n-1)` will unset the only set bit. So, we can say that `n & (n-1)` returns 0 if `n` is the power of 2; otherwise, it’s not a power of 2.

We can also the expression `(n & -n) == n` to check if a positive integer is a power of 2 or not. For more details, refer to [this post](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/).

### How to check the position of the set bit?

To check the position of its set bit, we can use `0xB6DB6DB6` as a mask. The mask `0xB6DB6DB6` has 0 in all `(0, 3, 6, … ,30)` position. So if the expression ` !(n & 0xB6DB6DB6)` is true, the position of the set bit in `n` is even.

(0xB6DB6DB6)16 = (10110110110110110110110110110110)2

Following is a TypeScript implementation of the idea:

```ts
// Returns true if `n` is a power of 8
const checkPowerOf8 = (n: number): boolean => {

    // return true if `n` is a power of 2, and its only
    // set bit is present at (0, 3, 6, … ) position
    return n !== 0 && (n & (n - 1)) === 0 && (n & 0xB6DB6DB6) === 0;
};

// demo
const n = 512;

if (checkPowerOf8(n)) {
    console.log(`${n} is a power of 8`);
} else {
    console.log(`${n} is not a power of 8`);
}
```

**Exercise:** Check if the number is a power of 4 or 16 or not. (Hint – Check the bit pattern)

Use mask `0xAAAAAAAA` to check for [power of 4](https://techiedelight.com/compiler/?run=mWZQZc") Use mask `0xEEEEEEEE` to check for [power of 16](https://techiedelight.com/compiler/?run=kpDlqi")
