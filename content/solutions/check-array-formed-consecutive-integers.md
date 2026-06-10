# Check if an array is formed by consecutive integers

> Source: https://www.techiedelight.com/check-array-formed-consecutive-integers/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, check if only consecutive integers form the array.

For example,

**Input:** { -1, 5, 4, 2, 0, 3, 1 } **Output:** The array contains consecutive integers from -1 to 5. **Input:** { 4, 2, 4, 3, 1 } **Output:** The array does not contain consecutive integers as element 4 is repeated.

> 

## Approach 1

For an array to contain consecutive integers,

  1. The difference between the maximum and minimum element in it should be exactly `n-1`.
  2. All elements in the array should be distinct (we can check this by inserting the elements in a set or using a visited array).

Following is a TypeScript implementation based on the above idea:

```ts
// Function to check if consecutive integers form a list
const isConsecutive = (A: number[]): boolean => {
    // base case
    if (A.length <= 1) {
        return true;
    }

    // compute the minimum and maximum element in a list
    const minimum = Math.min(...A);
    const maximum = Math.max(...A);

    // for a list to contain consecutive integers, the difference between
    // the maximum and minimum element in it should be exactly `n-1`
    if (maximum - minimum !== A.length - 1) {
        return false;
    }

    // create an empty set (we can also use a visited list)
    const visited = new Set<number>();

    // traverse the list and checks if each element appears only once
    for (const i of A) {
        // if an element is seen before, return false
        if (visited.has(i)) {
            return false;
        }

        // mark element as seen
        visited.add(i);
    }

    // we reach here when all elements in the list are distinct
    return true;
};

const A = [-1, 5, 4, 2, 0, 3, 1];

if (isConsecutive(A)) {
    console.log("The array contains consecutive integers");
}
else {
    console.log("The array does not contain consecutive integers");
}
```

**Output:** The array contains consecutive integers

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

## Approach 2

We can check if an array contains consecutive integers by inserting all array elements in a sorted set and

  1. Check if all elements are distinct (we can check this while inserting the elements in the set).
  2. Check if the difference between consecutive elements in the sorted set is 1.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to check if consecutive integers form a list
const isConsecutive = (A: number[]): boolean => {

    // 1. Check if all elements in the list are distinct

    const s = new Set(A);
    if (A.length !== s.size) {
        return false;
    }

    // 2. Check if all elements present in the set are consecutive
    let prev = Number.MAX_SAFE_INTEGER;

    // iterate through the sorted set and check if the difference between
    // consecutive elements is 1
    for (const curr of [...s].sort((a, b) => a - b)) {
        if (prev !== Number.MAX_SAFE_INTEGER && (curr !== prev + 1)) {
            return false;
        }
        prev = curr;
    }

    return true;
};

const A = [-1, 5, 4, 2, 0, 3, 1];

if (isConsecutive(A)) {
    console.log("The array contains consecutive integers");
}
else {
    console.log("The array does not contain consecutive integers");
}
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the input.
