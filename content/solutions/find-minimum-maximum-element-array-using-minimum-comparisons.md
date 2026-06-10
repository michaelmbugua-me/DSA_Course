# Find the minimum and maximum element in an array using minimum comparisons

> Source: https://www.techiedelight.com/find-minimum-maximum-element-array-using-minimum-comparisons/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find out the minimum and maximum element present using minimum comparisons.

For example,

**Input:** nums[] = [5, 7, 2, 4, 9, 6] **Output:** The minimum array element is 2 The maximum array element is 9

> 

A naive solution is to compare each array element for minimum and maximum elements by considering a single item at a time. The time complexity of this solution would be linear. The implementation can be seen below in TypeScript:

```ts
// Naive solution to find the minimum and maximum number in an array
function findMinAndMax(nums: number[]): void {

    // initialize minimum and maximum element with the first element
    let max = nums[0];
    let min = nums[0];

    // do for each array element
    for (let i = 1; i < nums.length; i++) {

        // if the current element is greater than the maximum found so far
        if (nums[i] > max) {
            max = nums[i];
        }

        // if the current element is smaller than the minimum found so far
        else if (nums[i] < min) {
            min = nums[i];
        }
    }

    console.log(`The minimum array element is ${min}`);
    console.log(`The maximum array element is ${max}`);
}

const nums = [5, 7, 2, 4, 9, 6];

// find the minimum and maximum element, respectively
findMinAndMax(nums);
```

**Output:** The minimum array element is 2 The maximum array element is 9

Performance:

The above solution does `2×(n-1)` comparisons in the best case and `3×(n-1)` comparisons in the worst case. The worst case happens when all array elements are equal or are sorted in descending order. The best case happens when the input is sorted in ascending order. (Note that we have also considered `n-1` comparisons done by for-loop).

Can we do better?

We can improve comparisons done by the above solution by considering elements in pairs. One particular case we need to handle separately when the array has an odd number of items. Following is a TypeScript program that demonstrates it:

```ts
// Optimized solution to find the minimum and maximum number in an array
function findMinAndMax(nums: number[]): void {

    const n = nums.length;

    // initialize minimum element by INFINITY and the maximum element by -INFINITY
    let max = -Infinity;
    let min = Infinity;

    // if the array has an odd number of elements, ignore the last
    // element and consider it later
    let m = n;
    if (n & 1) {
        m = m - 1;
    }

    // compare elements in pairs, i.e., nums[i] and nums[i+1]
    for (let i = 0; i < m; i = i + 2) {

        let maximum, minimum;

        // find maximum and minimum among nums[i] and nums[i+1]

        if (nums[i] > nums[i + 1]) {    // 1st comparison
            minimum = nums[i + 1];
            maximum = nums[i];
        } else {
            minimum = nums[i];
            maximum = nums[i + 1];
        }

        // update max
        if (maximum > max) {        // 2nd comparison
            max = maximum;
        }

        // update min
        if (minimum < min) {        // 3rd comparison
            min = minimum;
        }
    }

    // handle the last element if the array has an odd number of elements
    if (n & 1) {
        if (nums[m] > max) { max = nums[m]; }
        if (nums[m] < min) { min = nums[m]; }
    }

    console.log(`The minimum array element is ${min}`);
    console.log(`The maximum array element is ${max}`);
}

const nums = [4, 7, 5, 1, 3];
findMinAndMax(nums);
```

**Output:** The minimum array element is 1 The maximum array element is 7

Performance:

If the array has an even number of elements `n`, then the above solution does `n/2 + 3n/2 + 2` comparisons in both best and worst-case. (Note that we have also considered `n/2` comparisons done by for-loop).

If the array has an odd number of elements `n`, then the above solution does `(n-1)/2 + 3(n-1)/2 + 4` comparisons in both best and worst-case. (We have also considered `(n-1)/2` comparisons done by for-loop).
