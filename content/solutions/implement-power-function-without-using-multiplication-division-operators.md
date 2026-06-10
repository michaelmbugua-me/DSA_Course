# Implement power function without using multiplication and division operators

> Source: https://www.techiedelight.com/implement-power-function-without-using-multiplication-division-operators/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given two positive integers, implement the power function without using multiplication and division operators.

For example, for given two integers, `x` and `y`, `pow(x, y)` should return `x` raised to the power of `y`, i.e., `xy`.

> 

## Method 1: Using Recursion

We know that `pow(x, y)` can be recursively written as:

pow(x, y) = pow(x, y – 1) * x pow(x, 0) = 1

For example, if `x = 7`, we can get `7y` by adding `7y-1` exactly `7` times to the result. Following is a TypeScript program that demonstrates it:

```ts
function pow(a: number, b: number): number {

    if (b === 0) {
        return 1;
    }

    const power = pow(a, b - 1);

    let result = 0;
    for (let i = 0; i < a; i++) {
        result += power;
    }

    return result;
}

console.log(pow(7, 3));
```

**Output:** 343

## Method 2

The idea is if `x = ab`, then `log(x) = b.log(a)`. Since, `x` can be expressed as `x = elog(x)`, by substituting the value of `log(x)` in the equation, we get `**x = e b.log(a)**`.

Following is the TypeScript implementation of the idea:

```ts
function pow(a: number, b: number): number {

    let logx = 0;
    for (let i = 0; i < b; i++) {
        logx += Math.log(a);
    }

    return Math.round(Math.exp(logx));
}

console.log(pow(2, 10));
```

**Output:** 1024
