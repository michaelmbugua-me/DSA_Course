# Determine if two integers are equal without using comparison and arithmetic operators

> Source: https://www.techiedelight.com/determine-two-integers-equal-without-using-comparison-arithmetic-operators/

This post will discuss how to determine whether two integers are equal without using comparison operators `(==, !=, <, >, <=, >=)` and arithmetic operators `(+, -, *, /, %)`.

## 1\. Using Bitwise XOR Operator

The simplest solution is to use the bitwise XOR operator. We know that for equal numbers, the XOR operator returns 0. We can make use of this fact, demonstrated below in TypeScript:

```ts
// Determine if two integers are equal without using comparison operators
// and arithmetic operators
function checkForEquality(x: number, y: number): boolean {
  return (x ^ y) === 0;
}

const x = 10;
const y = 10;

if (checkForEquality(x, y)) {
  console.log(`x=${x} is equal to y=${y}`);
} else {
  console.log(`x=${x} is not equal to y=${y}`);
}
```

**Output:** x=10 is equal to y=10

## 2\. Using Array Index + Ternary Operator

We can also take advantage of the fact that a garbage value is assigned to a local array in C by default. The idea is to use the first number as the array index and set the value to 0. Then, check if the array is set for the second number or not.

Following is the TypeScript implementation of the idea. Please note that this solution won’t work on negative numbers, consumes a lot of memory, and might access the array’s invalid indices.

```ts
// Determine if two integers are equal without using comparison operators
// and arithmetic operators
function checkForEquality(x: number, y: number): boolean {
  const arr = new Array(x + 1);
  arr[x] = 0;

  return arr[y] === 0;
}

const x = 10, y = 10;

if (checkForEquality(x, y)) {
  console.log(`x=${x} is equal to y=${y}`);
} else {
  console.log(`x=${x} is not equal to y=${y}`);
}
```

**Output:** x=10 is equal to y=10

## 3\. Using Hashing

Since the previous approach consumes a lot of memory, a more space-efficient version uses a [hash map](https://techiedelight.com/hashing-in-data-structure/). The hash-based implementation can be seen below in TypeScript:

```ts
// Determine if two integers are equal without using comparison
// and arithmetic operators
function checkForEquality(x: number, y: number): boolean {
  const map = new Map<number, boolean>();
  map.set(x, true);

  return map.get(y) === true;
}

const x = 0, y = 2;

if (checkForEquality(x, y)) {
  console.log("x is equal to y");
} else {
  console.log("x is not equal to y");
}
```

**Output:** x is not equal to y
