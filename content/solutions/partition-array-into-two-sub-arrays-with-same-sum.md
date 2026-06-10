# Partition an array into two subarrays with the same sum

> Source: https://www.techiedelight.com/partition-array-into-two-sub-arrays-with-same-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, partition it into two subarrays having the same sum of elements.

For example,

**Input:** {6, -4, -3, 2, 3} **Output:** The two subarrays are {6, -4} and {-3, 2, 3} having equal sum of 2 **Input:** {6, -5, 2, -4, 1} **Output:** The two subarrays are {} and {6, -5, 2, -4, 1} having equal sum of 0

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

A simple solution is to iterate the array and calculate the sum of the left and right subarray for each array element. The time complexity of this solution is O(n2), where `n` is the size of the input. Following is the TypeScript program that demonstrates it:

```ts
// Partition the array into two subarrays with the same sum
function partition(A: number[]): number {

    // do for each element in the array
    for (let i = 0; i < A.length; i++) {
        let left_sum = 0;
        for (let j = 0; j < i; j++) {
            left_sum += A[j];
        }

        let right_sum = 0;
        for (let j = i; j < A.length; j++) {
            right_sum += A[j];
        }

        // if the sum of `A[0…i-1]` is equal to `A[i, n-1]`
        if (left_sum === right_sum) {
            return i;
        }
    }

    // invalid input
    return -1;
}

const A = [6, -4, -3, 2, 3];

// get index `i` that points to the starting of the second subarray
const i = partition(A);

if (i !== -1) {
    console.log(A.slice(0, i));     // print the first subarray, `A[0, i-1]`
    console.log(A.slice(i));        // print the second subarray, `A[i, A.length)`
} else {
    console.log("The array can't be partitioned");
}
```

We can also solve this problem in O(n) time and O(1) space. The idea is to preprocess the array and calculate the sum of all array elements. Then for each array element, we can calculate its right sum in O(1) time by using the following formula:

sum of right subarray = total sum – sum of elements so far

Following is the implementation of the above approach in TypeScript:

```ts
// Partition the array into two subarrays with the same sum
function partition(A: number[]): number {

    // calculate the sum of all array elements
    const total_sum = A.reduce((a, b) => a + b, 0);

    // variable to maintain the sum of processed elements
    let sum_so_far = 0;

    // do for each element in the array
    for (let i = 0; i < A.length; i++) {

        // if the sum of `A[0…i-1]` is equal to `A[i, n-1]`
        if (sum_so_far === total_sum - sum_so_far) {
            return i;
        }

        // update `sum_so_far` by including the value of the current element
        sum_so_far += A[i];
    }

    return -1;
}

const A = [6, -4, -3, 2, 3];

// get index `i` that points to the starting of the second subarray
const i = partition(A);

if (i !== -1) {
    console.log(A.slice(0, i));     // print the first subarray, `A[0, i-1]`
    console.log(A.slice(i));        // print the second subarray, `A[i, A.length)`
} else {
    console.log("The array can't be partitioned");
}
```
