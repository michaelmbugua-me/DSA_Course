# Multiply two numbers without using a multiplication operator or loops

> Source: https://www.techiedelight.com/multiply-two-numbers-without-using-multiplication-operator-loops/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given two integers, multiply them without using the multiplication operator or conditional loops.

## 1\. Using Recursion

The idea is that for given two numbers `a` and `b`, we can get `a×b` by adding an integer `a` exactly `b` times to the result. This approach is demonstrated below in TypeScript:

```ts
function mul(a: number, b: number): number {

    // base cases
    if (a === 0 || b === 0) {
        return 0;
    }

    if (b === 1) {
        return a;
    }

    if (a === 1) {
        return b;
    }

    return a + mul(a, b - 1);
}

function multiply(a: number, b: number): number {
    const m = mul(a, Math.abs(b));
    return b < 0 ? -m : m;
}

console.log(multiply(3, 4));
console.log(multiply(-3, -4));
console.log(multiply(-3, 4));
console.log(multiply(3, -4));
```

**Output:** 12 12 -12 -12

## 2\. Iterative solution using Bitwise operators

If loops are allowed, we can use the following relation:

multiply(a, b) = | multiply(a*2, b/2) if b is even | b + multiply(a*2, b/2) if b is odd

The implementation can be seen below in TypeScript:

```ts
function multiply(a: number, b: number): number {

    // flag to store if the result is positive or negative
    let isNegative = false;

    // if both numbers are negative, make both numbers
    // positive since the result will be positive anyway
    if (a < 0 && b < 0) {
        a = -a;
        b = -b;
    }

    // if only `a` is negative, make it positive
    // and mark the result as negative
    if (a < 0) {
        a = -a;
        isNegative = true;
    }

    // if only `b` is negative, make it positive
    // and mark the result as negative
    if (b < 0) {
        b = -b;
        isNegative = true;
    }

    // initialize result by 0
    let result = 0;

    // run till `b` becomes 0
    while (b) {
        // if `b` is odd, add `b` to the result
        if (b & 1) {
            result += a;
        }

        a = a << 1;     // multiply `a` by 2
        b = b >> 1;     // divide `b` by 2
    }

    return isNegative ? -result : result;
}

console.log(multiply(3, 4));        // 12
console.log(multiply(-3, -4));      // 12
console.log(multiply(-3, 4));       // -12
console.log(multiply(3, -4));       // -12
```

The recursive version of the above solution is left as an exercise to the readers.
