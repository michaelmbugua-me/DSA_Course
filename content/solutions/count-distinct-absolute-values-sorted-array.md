# Count distinct absolute values in a sorted array

> Source: https://www.techiedelight.com/count-distinct-absolute-values-sorted-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of sorted integers that may contain several duplicate elements, count the total number of distinct absolute values in it.

For example,

**Input:** { -1, -1, 0, 1, 1, 1 } **Output:** The total number of distinct absolute values is 2 (0 and 1) **Input:** { -2, -1, 0, 1, 2, 3 } **Output:** The total number of distinct absolute values is 4 (0, 1, 2 and 3) **Input:** { -1, -1, -1, -1 } **Output:** The total number of distinct absolute values is 1 (only 1)

> 

We can easily solve this problem by inserting the absolute value of each array element into a set. We know that a set doesn’t permit duplicates, and hence its size would be the desired count. This approach is demonstrated below in TypeScript:

```ts
// Returns the total number of distinct absolute values in a given input
function findDistinctCount(input: number[]): number {
    const s = new Set(input.map(i => Math.abs(i)));
    return s.size;
}

const input = [-1, -1, 0, 1, 1, 1];
console.log('The total number of distinct absolute values is', findDistinctCount(input));
```

**Output:** The total number of distinct absolute values is 2

The time complexity of the above solution is O(n), where `n` is the size of the input. It doesn’t take advantage of the fact that the input is already sorted and requires O(n) extra space. We can use the [sliding window](https://techiedelight.com/sliding-window-problems/) approach to easily solve this problem in O(1) extra space.

The idea is to initialize the distinct count as the total number of elements present in the input. The program checks for a pair with zero-sum with the help of two index variables (initially pointing to two corners of the array). If the pair with zero-sum is found (or duplicates are encountered), decrement the count of distinct elements. Finally, return the updated count.

The algorithm can be implemented as follows in TypeScript:

```ts
// Returns the total number of distinct absolute values in a given input
function findDistinctCount(A: number[]): number {
    // initialize the distinct count as input size
    let distinct_count = A.length;

    // points to the left and right boundary of the current window,
    // i.e., the current window is formed by `A[left, right]`
    let left = 0;
    let right = A.length - 1;

    // loop until the left index of the current window is less than the right index
    while (left < right) {
        // remove any duplicate elements from the left and right of the current
        // window and decrease the distinct count for each duplicate found
        while (left < right && A[left] === A[left + 1]) {
            distinct_count = distinct_count - 1;
            left = left + 1;
        }

        while (right > left && A[right] === A[right - 1]) {
            distinct_count = distinct_count - 1;
            right = right - 1;
        }

        // if only one element is left, break the loop
        if (left === right) {
            break;
        }

        const total = A[left] + A[right];

        // decrease the distinct count if the zero-sum pair is encountered
        if (total === 0) {
            distinct_count = distinct_count - 1;
            left = left + 1;
            right = right - 1;
        }
        // if the sum is negative, incrementing the left index might still lead
        // to a zero-sum pair
        else if (total < 0) {
            left = left + 1;
        }
        // if the sum is positive, decrementing the right index might still lead
        // to a zero-sum pair
        else {
            right = right - 1;
        }
    }

    return distinct_count;
}

const input = [-1, -1, 0, 1, 1, 1];
console.log('The total number of distinct absolute values is', findDistinctCount(input));
```

**Output:** The total number of distinct absolute values is 2

**Author:** Aditya Goel
