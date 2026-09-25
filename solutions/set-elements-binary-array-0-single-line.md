# Set both elements of a binary array to 0 in a single line

> Source: https://www.techiedelight.com/set-elements-binary-array-0-single-line/

Given a binary array of size two having at least one element as zero, write a single line function to set both its elements to zero. Use of ternary operator and direct assignment of elements are not allowed.

There are three combinations of array elements as per problem constraints:

  1. arr[0] = 0 and arr[1] = 1
  2. arr[0] = 1 and arr[1] = 0
  3. arr[0] = 0 and arr[1] = 0

There are many ways to solve the given problem. We will discuss a few of them:

## Method 1: Using assignment operator twice

We can use any of the following single line expressions to convert both elements of the given array to 0:

  * arr[0] = arr[1] = arr[!arr[1]], or
  * arr[0] = arr[1] = arr[0] & arr[1], or
  * arr[0] = arr[1] -= arr[1] // or arr[1] = arr[0] -= arr[0]

This is demonstrated below in TypeScript:

```ts
function convert(arr: number[]): void {
    arr[0] = arr[1] = arr[0] & arr[1];
    // arr[0] = arr[1] -= arr[1];
    // arr[1] = arr[0] -= arr[0];
}

// demo
const first = [0, 1];
convert(first);
console.log(`${first[0]} ${first[1]}`);

const second = [1, 0];
convert(second);
console.log(`${second[0]} ${second[1]}`);

const third = [0, 0];
convert(third);
console.log(`${third[0]} ${third[1]}`);
```

## Method 2: Using negation (logical NOT) operator

We can use the negation operator with an assignment operator to convert both elements of the given array to 1 in a single line:

  * arr[!arr[0]] = arr[arr[0]], or
  * arr[arr[1]] = arr[!arr[1]], or
  * arr[!arr[0]] = arr[!arr[1]]

Following is the TypeScript program that demonstrates it:

```ts
function convert(arr: number[]): void {
    arr[Number(!arr[1])] = arr[arr[0]];
    // arr[Number(!arr[0])] = arr[Number(!arr[1])];
    // arr[Number(!arr[0])] = 0;
}

// demo
const first = [0, 1];
convert(first);
console.log(`${first[0]} ${first[1]}`);

const second = [1, 0];
convert(second);
console.log(`${second[0]} ${second[1]}`);

const third = [0, 0];
convert(third);
console.log(`${third[0]} ${third[1]}`);
```

## Method 3: Using only assignment operator

We can directly use an assignment operator to set both elements of the given binary array to 0 in a single line:

  * arr[arr[1]] = arr[arr[0]], or
  * arr[1 – arr[0]] = arr[1 – arr[1]], or
  * arr[arr[1]] = 0

The implementation can be seen below in TypeScript:

```ts
function convert(arr: number[]): void {
    arr[arr[1]] = arr[arr[0]];
    // arr[1 - arr[0]] = arr[1 - arr[1]];
    // arr[arr[1]] = 0;
}

// demo
const first = [0, 1];
convert(first);
console.log(`${first[0]} ${first[1]}`);

const second = [1, 0];
convert(second);
console.log(`${second[0]} ${second[1]}`);

const third = [0, 0];
convert(third);
console.log(`${third[0]} ${third[1]}`);
```

**Output:** 0 0 0 0 0 0
