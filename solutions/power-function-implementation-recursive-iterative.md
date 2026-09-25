# Efficiently implement power function – Iterative and Recursive

> Source: https://www.techiedelight.com/power-function-implementation-recursive-iterative/

Given two integers, `x` and `n`, where `n` is non-negative, efficiently compute the power function `pow(x, n)`.

For example,

pow(-2, 10) = 1024 pow(-3, 4) = 81 pow(5, 0) = 1 pow(-2, 3) = -8

> 

## 1\. Naive Iterative Solution

A simple solution to calculate `pow(x, n)` would multiply `x` exactly `n` times. We can do that by using a simple for loop. This is demonstrated below in TypeScript:

```ts
// Naive iterative solution to calculate `pow(x, n)`
function power(x: number, n: number): number {

    // initialize result by 1
    let pow = 1;

    // multiply `x` exactly `n` times
    for (let i = 0; i < n; i++) {
        pow = pow * x;
    }

    return pow;
}

const x = -2;
const n = 10;

console.log(`pow(${x}, ${n}) =`, power(x, n));
```

**Output:** pow(-2, 10) = 1024

The time complexity of the above solution is O(n).

## 2\. Using [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/)

We can recursively define the problem as:

power(x, n) = power(x, n / 2) × power(x, n / 2); // otherwise, `n` is even power(x, n) = x × power(x, n / 2) × power(x, n / 2); // if `n` is odd

Following is a TypeScript program that demonstrates it:

```ts
// Naive recursive solution to calculate `pow(x, n)`
// using divide-and-conquer
function power(x: number, n: number): number {

    // base condition
    if (n === 0) {
        return 1;
    }

    if (n & 1) {    // if `n` is odd
        return x * power(x, Math.floor(n / 2)) * power(x, Math.floor(n / 2));
    }

    // otherwise, `n` is even
    return power(x, Math.floor(n / 2)) * power(x, Math.floor(n / 2));
}

const x = -2;
const n = 10;

console.log(`pow(${x}, ${n}) =`, power(x, n));
```

**Output:** pow(-2, 10) = 1024

The time complexity of the above solution is O(n).

## 3\. Optimized Divide and Conquer Solution

The problem with the above solution is that the same subproblem is computed twice for each recursive call. We can optimize the above function by computing the solution of the subproblem once only.

The implementation can be seen below in TypeScript:

```ts
// Optimized recursive solution to calculate `pow(x, n)`
// using divide-and-conquer
function power(x: number, n: number): number {

    // base condition
    if (n === 0) {
        return 1;
    }

    // calculate subproblem recursively
    const pow = power(x, Math.floor(n / 2));

    if (n & 1) { // if `y` is odd
        return x * pow * pow;
    }

    // otherwise, `y` is even
    return pow * pow;
}

const x = -2;
const n = 10;

console.log(`pow(${x}, ${n}) =`, power(x, n));
```

**Output:** pow(-2, 10) = 1024
