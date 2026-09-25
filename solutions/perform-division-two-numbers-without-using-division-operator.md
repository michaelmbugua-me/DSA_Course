# Perform division of two numbers without using division operator

> Source: https://www.techiedelight.com/perform-division-two-numbers-without-using-division-operator/

Write a program to perform a division of two numbers without using the division operator (‘/’).

## Approach #1: Division using Repeated Subtraction

We know that divisions can be solved by repeatedly subtracting the divisor from the dividend until it becomes less than the divisor. The total number of times the repeated subtraction is carried out is equal to the quotient.

This approach is demonstrated below in TypeScript:

```ts
// Function to perform division `x/y` of two numbers `x` and `y` without
// using the division operator in the code
function divide(x: number, y: number): number {

    // handle divisibility by 0
    if (y === 0) {
        console.log('Error!! Divisible by 0');
        process.exit(-1);
    }

    // store sign of the result
    let sign = 1;
    if (x * y < 0) {
        sign = -1;
    }

    // convert both dividend and divisor to positive
    x = Math.abs(x);
    y = Math.abs(y);

    // initialize quotient by 0
    let quotient = 0;

    // loop till dividend `x` becomes less than divisor `y`
    while (x >= y) {
        x = x - y;                  // perform a reduction on the dividend
        quotient = quotient + 1;    // increase quotient by 1
    }

    console.log(`Remainder is ${x}`);
    return sign * quotient;
}

const dividend = 22;
const divisor = -7;

console.log(`Quotient is ${divide(dividend, divisor)}`);
```

Following is the recursive version of the above program in TypeScript:

```ts
// Recursive function to perform division `x/y` of two positive numbers
// `x` and `y` without using the division operator in the code
function division(x: number, y: number): number {

    if (x < y) {
        console.log(`Remainder is ${x}`);
        return 0;
    }
    return 1 + division(x - y, y);
}

// Wrapper over `division()` function to handle negative dividend or divisor
function divide(x: number, y: number): number {

    // handle divisibility by 0
    if (y === 0) {
        console.log('Error!! Divisible by 0');
        process.exit(-1);
    }

    // store sign of the result
    let sign = 1;
    if (x * y < 0) {
        sign = -1;
    }

    return sign * division(Math.abs(x), Math.abs(y));
}

const dividend = 22;
const divisor = -7;

console.log(`Quotient is ${divide(dividend, divisor)}`);
```

## Approach #2

```ts
// Function to perform division `x/y` of two numbers `x` and `y`
// without using the division operator in the code
function divide(x: number, y: number): number {

    // handle divisibility by 0
    if (y === 0) {
        console.log('Error!! Divisible by 0');
        process.exit(-1);
    }

    // store sign of the result
    let sign = 1;
    if (x * y < 0) {
        sign = -1;
    }

    // convert both dividend and divisor to positive
    x = Math.abs(x);
    y = Math.abs(y);

    // initialize denominator by `y`
    let denominator = y;

    // initialize quotient by 1
    let quotient = 1;

    // Double denominator and quotient value until denominator is more than
    // dividend `x`
    while (x > denominator) {
        denominator *= 2;
        quotient *= 2;
    }

    // Subtract divisor `y` from the denominator and reduce quotient by 1 until
    // the denominator is less than dividend `x`
    while (denominator > x) {
        denominator -= y;
        quotient -= 1;
    }

    console.log(`The remainder is ${x - denominator}`);
    return sign * quotient;
}

const dividend = 22;
const divisor = -7;

console.log(`The quotient is ${divide(dividend, divisor)}`);
```

**Output:** The remainder is 1 The quotient is -3
