# Find floor and ceil of a number in a sorted integer array

> Source: https://www.techiedelight.com/find-floor-ceil-number-sorted-array/

Given a sorted integer array, find the floor and ceil of a given number in it. The floor and ceil map the given number to the largest previous or the smallest following integer in the array.

More precisely, for a number `x`, `floor(x)` is the largest integer in the array less than or equal to `x`, and `ceil(x)` is the smallest integer in the array greater than or equal to `x`. If the floor or ceil doesn’t exist, consider it to be -1. For example,

**Input:** nums[] = [1, 4, 6, 8, 9] Number: 0 to 10 **Output:** Number 0 —> ceil is 1, floor is -1 Number 1 —> ceil is 1, floor is 1 Number 2 —> ceil is 4, floor is 1 Number 3 —> ceil is 4, floor is 1 Number 4 —> ceil is 4, floor is 4 Number 5 —> ceil is 6, floor is 4 Number 6 —> ceil is 6, floor is 6 Number 7 —> ceil is 8, floor is 6 Number 8 —> ceil is 8, floor is 8 Number 9 —> ceil is 9, floor is 9 Number 10 —> ceil is -1, floor is 9

> 

A simple solution would be to run a linear search on the array and find the largest integer in the array less than or equal to `x` and the smallest integer in the array greater than or equal to `x`. That would be the floor and ceil of the number `x`, respectively. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input.

We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/). The basic idea remains the same. We find the middle element and move to the left or right subarray based on comparison result with the given number. Following is the complete algorithm:

findCeil(nums[low, high], x)

Initialize ceil to -1 and iterate till our search space is exhausted.

  * If `x` is equal to the middle element, it is the ceil.
  * If `x` is less than the middle element, the ceil exists in subarray `nums[low…mid]`; update ceil to the middle value and reduce our search space to the left subarray `nums[low…mid-1]`.
  * If `x` is more than the middle element, the ceil exists in the right subarray `nums[mid+1…high]`.

findFloor(nums[low, high], x)

Initialize floor to -1 and iterate till our search space is exhausted.

  * If `x` is equal to the middle element, it is the floor.
  * If `x` is less than the middle element, the floor exists in the left subarray `nums[low…mid-1]`.
  * If `x` is more than the middle element, the floor exists in subarray `nums[mid…high]`; update floor to the middle element and reduce our search space to the right subarray `nums[mid+1…high]`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the ceil of `x` in a sorted array `nums`,
// i.e., the smallest integer greater than or equal to `x`
function getCeil(nums: number[], x: number): number {

    // search space is nums[left…right]
    let left = 0;
    let right = nums.length - 1;

    // initialize ceil to -1
    let ceil = -1;

    // loop till the search space is exhausted
    while (left <= right) {

        // find the mid-value in the search space
        const mid = (left + right) / 2 | 0;

        // if `x` is equal to the middle element, it is the ceil
        if (nums[mid] === x) {
            return nums[mid];
        }

        // if `x` is less than the middle element, the ceil exists in the
        // subarray nums[left…mid]; update ceil to the middle element
        // and reduce our search space to the left subarray nums[left…mid-1]
        else if (x < nums[mid]) {
            ceil = nums[mid];
            right = mid - 1;
        }

        // if `x` is more than the middle element, the ceil exists in the
        // right subarray nums[mid+1…right]
        else {
            left = mid + 1;
        }
    }

    return ceil;
}

// Function to find the floor of `x` in a sorted array `nums`,
// i.e., the largest integer less than or equal to `x`
function getFloor(nums: number[], x: number): number {

    let left = 0;
    let right = nums.length - 1;

    // initialize floor to -1
    let floor = -1;

    // loop till the search space is exhausted
    while (left <= right) {

        // find the mid-value in the search space
        const mid = (left + right) / 2 | 0;

        // if `x` is equal to the middle element, it is the floor
        if (nums[mid] === x) {
            return nums[mid];
        }

        // if `x` is less than the middle element, the floor exists in the left
        // subarray nums[left…mid-1]
        else if (x < nums[mid]) {
            right = mid - 1;
        }

        // if `x` is more than the middle element, the floor exists in the
        // subarray nums[mid…right]; update floor to the middle element
        // and reduce our search space to the right subarray nums[mid+1…right]
        else {
            floor = nums[mid];
            left = mid + 1;
        }
    }

    return floor;
}

const nums = [1, 4, 6, 8, 9];

for (let i = 0; i <= Math.max(...nums) + 1; i++) {
    console.log(`Number ${i} —> ceil is ${getCeil(nums, i)}, floor is ${getFloor(nums, i)}`);
}
```

**Output:** Number 0 —> ceil is 1, floor is -1 Number 1 —> ceil is 1, floor is 1 Number 2 —> ceil is 4, floor is 1 Number 3 —> ceil is 4, floor is 1 Number 4 —> ceil is 4, floor is 4 Number 5 —> ceil is 6, floor is 4 Number 6 —> ceil is 6, floor is 6 Number 7 —> ceil is 8, floor is 6 Number 8 —> ceil is 8, floor is 8 Number 9 —> ceil is 9, floor is 9 Number 10 —> ceil is -1, floor is 9

The time complexity of the above solution is O(log(n)) and doesn’t require any extra space.

**Exercise:** [Write a recursive solution to find the floor and ceil of a number](https://techiedelight.com/find-floor-ceil-number-sorted-array-recursive/).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 202

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
