# Find the missing number in an array without using any extra space

> Source: https://www.techiedelight.com/find-missing-number-array-without-extra-space/

Given a limited range array of size `n` and containing elements between 1 and `n+1` with one element missing, find the missing number without using any extra space.

For example,

**Input:** { 3, 2, 4, 6, 1 } **Output:** The missing element is 5 **Input:** { 3, 2, 4, 5, 6 } **Output:** The missing element is 1 **Input:** { 3, 2, 4, 5, 1 } **Output:** The missing element is 6

> 

The idea is to calculate the sum of all array elements. Then the missing number is the sum of elements between 1 and `n+1` minus the actual sum, i.e., the missing number is:

`(1 + 2 … + n + (n+1)) - (arr[0] + arr[1] + … + arr[n-1])`

We can find the sum of elements between 1 and `n` using the following formula:

`1 + 2 + … + n = n×(n+1)/2`

Following is the TypeScript program that demonstrates it:

```ts
// Find the missing number in a limited range array `arr[1…n+1]`
const findMissingElement = (arr: number[]): number => {
    const n = arr.length;

    // calculate the sum of all elements of input array
    const total = arr.reduce((x, y) => x + y, 0);

    // expected sum - actual sum
    return (n + 1) + Math.floor(n * (n + 1) / 2) - total;
};

// input array contains `n` numbers between 1 and `n+1`
// with one number missing and no duplicates
const arr = [3, 2, 4, 6, 1];

console.log(`The missing element is ${findMissingElement(arr)}`);
```

**Output:** The missing element is 5

We can also solve this problem by taking XOR of all array elements with numbers 1 to `n+1`. Since the same elements will cancel each other as `a^a = 0`, `0^0 = 0` and `a^0 = a`, we will be left with the missing number. This approach is demonstrated below in TypeScript:

```ts
// Find the missing number in a limited range array `arr[1…n+1]`
const findMissingElement = (arr: number[]): number => {
    const n = arr.length;

    let xor = 0;

    // take xor of all array elements
    for (let i = 0; i < n; i++) {
        xor ^= arr[i];
    }

    // take xor of numbers from 1 to `n+1`
    for (let i = 1; i <= n + 1; i++) {
        xor ^= i;
    }

    // same elements will cancel each other as a ^ a = 0
    // also, 0 ^ 0 = 0 and a ^ 0 = a

    // `xor` will contain the missing number
    return xor;
};

// input array contains `n` numbers between 1 and `n+1`
// with one number missing and no duplicates
const arr = [1, 2, 3, 4, 6];

console.log(`The missing element is ${findMissingElement(arr)}`);
```

**Output:** The missing element is 5

Since the array contains all distinct elements and all elements lie in range 1 to `n+1`, use this property to solve this problem. Initially check if the missing number lies in range 1 to `n`. If a missing number is not found in range 1 to `n`, then the missing number is `n+1`.

To check if a missing number lies in range 1 to `n` or not, mark array elements as negative by using array elements as indexes. For each array element `arr[i]`, get the absolute value of element `abs(arr[i])` and make the element at index `abs(arr[i])-1` negative. Finally, traverse the array again to find the first index, which has a positive value. If a positive number is found at index `i`, then the missing number is `i+1`. If no positive element is found, then the missing number is `n+1`.

The algorithm can be implemented as follows in TypeScript. This solution modifies the original array. We can restore the original array before returning by making negative elements positive.

```ts
// Find the missing number in a limited range array `arr[1…n+1]`
// This method won't work for negative numbers
const findMissingElement = (arr: number[]): number => {
    const n = arr.length;

    // Case 1. The missing number is in range 1 to `n`

    // do for each array element
    for (let i = 0; i < n; i++)
    {
        // get absolute value of the current element
        const absVal = Math.abs(arr[i]);

        // make element at index `abs(arr[i])-1` negative
        if (absVal - 1 < n) {
            arr[absVal - 1] = -arr[absVal - 1];
        }
    }

    // check for missing numbers from 1 to `n`
    for (let i = 0; i < n; i++)
    {
        if (arr[i] > 0) {
            return i + 1;
        }
    }

    // Case 2. If numbers from 1 to `n` are present in the array,
    // then the missing number is `n+1`
    return n + 1;
};

// input array contains `n` numbers between 1 and `n+1`
// with one number missing and no duplicates
const arr = [3, 2, 4, 5, 6];

console.log(`The missing element is ${findMissingElement(arr)}`);
```

**Output:** The missing element is 1
