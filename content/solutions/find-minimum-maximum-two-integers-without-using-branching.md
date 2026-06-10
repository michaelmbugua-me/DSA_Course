# Find minimum or maximum of two integers without using branching

> Source: https://www.techiedelight.com/find-minimum-maximum-two-integers-without-using-branching/

Given two integers, find their minimum and maximum without using branching.

## Approach 1

To find the `minimum(x, y)`, we can use the expression `y ^ ((x ^ y) & -(x < y))`.

Now, if `x` is less than `y`, then `-(x < y)` will be `-1` (all `1's` in binary representation), so the result `r` is:

r = y ^ ((x ^ y) & -(x < y)) r = y ^ ((x ^ y) & -1) r = y ^ (x ^ y) r = x

Alternatively, if `x` is more than `y`, then `-(x < y)` will be 0, so the result `r` is:

r = y ^ ((x ^ y) & -(x < y)) r = y ^ ((x ^ y) & 0) r = y ^ 0 r = y

To find the `maximum(x, y)`, we can use the expression `x ^ ((x ^ y) & -(x < y))`.

Now, if `x` is less than `y`, then `-(x < y)` will be `-1` (all 1’s in binary representation), so the result `r` is:

r = x ^ ((x ^ y) & -(x < y)) r = x ^ ((x ^ y) & -1) r = x ^ (x ^ y) r = x

If `x` is more than `y`, then `-(x < y)` will be 0, so the result `r` is:

r = x ^ ((x ^ y) & -(x < y)) r = x ^ ((x ^ y) & 0) r = x ^ 0 r = x

This approach is demonstrated below in TypeScript:

```ts
function findMin(x: number, y: number): number {
    return y ^ ((x ^ y) & -(x < y ? 1 : 0));
}

function findMax(x: number, y: number): number {
    return x ^ ((x ^ y) & -(x < y ? 1 : 0));
}

const x = 2, y = 4;

console.log(`min(${x}, ${y}) is ${findMin(x, y)}`);
console.log(`max(${x}, ${y}) is ${findMax(x, y)}`);
```

**Output:** min(2, 4) is 2 max(2, 4) is 4

## Approach 2

To find the `minimum(x, y)`, we can use the expression `y + ((x - y) & ((x - y) >> 31))`.

Now if `x` is less than `y`, then `(x - y) >> 31` will be `-1` (all 1’s in binary representation), so the result `r` is:

r = y + ((x – y) & ((x – y) >> 31)) r = y + ((x – y) & -1) r = y + (x – y) r = x

If `x` is more than `y`, then `(x - y) >> 31` will be 0, so the result `r` is:

r = y + ((x – y) & ((x – y) >> 31)) r = y + ((x – y) & 0) r = y + (0) r = y

Similarly, we can find the `maximum(x, y)` by using `x - ((x - y) & ((x - y) >> 31))`. The explanation is left for the users as an exercise.

```ts
function findMin(x: number, y: number): number {
    return y + ((x - y) & ((x - y) >> 31));
}

function findMax(x: number, y: number): number {
    return x - ((x - y) & ((x - y) >> 31));
}

const x = 2, y = 4;

console.log(`min(${x}, ${y}) is ${findMin(x, y)}`);
console.log(`max(${x}, ${y}) is ${findMax(x, y)}`);
```

**Output:** min(2, 4) is 2 max(2, 4) is 4

**References:** <https://graphics.stanford.edu/~seander/bithacks.html#IntegerMinOrMax>
