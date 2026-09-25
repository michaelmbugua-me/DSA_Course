# Find the number of rotations in a circularly sorted array

> Source: https://www.techiedelight.com/find-number-rotations-circularly-sorted-array/

Given a circularly sorted integer array, find the total number of times the array is rotated. Assume there are no duplicates in the array, and the rotation is in the anti-clockwise direction.

For example,

**Input:** nums = [8, 9, 10, 2, 5, 6] **Output:** The array is rotated 3 times **Input:** nums = [2, 5, 6, 8, 9, 10] **Output:** The array is rotated 0 times

> 

If we carefully analyze the problem, we can see that the total number of rotations is equal to the total number of elements before the minimum element, or the index of the minimum element.

A simple solution would be to run a linear search on the array and find the minimum element index. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is circularly sorted.

We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/). We have already reduced the problem to find out the first element of the sorted sequence. The first element (Pivot) has one special property (let’s call it the pivot’s property) – both the next and previous element of the pivot element are greater than it. No other array element will have this property except the pivot element. Since the array is circularly sorted,

  * If the pivot is the last element, then the first element will be considered its next element.
  * If the pivot is the first element, then the last element will be considered its previous element.

We know that the middle element always divides the array into two subarrays, and the pivot element can lie only in one of these halves. It is worth noticing that at least one of these subarrays will always be sorted. If middle element happens to be the point of rotation (minimum element), then both left and right subarrays are sorted. Still, in any case, one half (subarray) must be sorted, and we will use this property to discard the left half or the right half at each iteration of the binary search.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the total number of times the array is rotated
const findRotationCount = (nums: number[]): number => {

    // search space is nums[left…right]
    let [left, right] = [0, nums.length - 1];

    // loop till the search space is exhausted
    while (left <= right) {

        // if the search space is already sorted, we have
        // found the minimum element (at index `left`)
        if (nums[left] <= nums[right]) {
            return left;
        }

        const mid = Math.floor((left + right) / 2);

        // find the next and previous element of the `mid` element (in circular manner)
        const next = (mid + 1) % nums.length;
        const prev = (mid - 1 + nums.length) % nums.length;

        // if the `mid` element is less than both its next and previous
        // neighbor, it is the array's minimum element

        if (nums[mid] <= nums[next] && nums[mid] <= nums[prev]) {
            return mid;
        }

        // if nums[mid…right] is sorted, and `mid` is not the minimum element,
        // then the pivot element cannot be present in nums[mid…right],
        // discard nums[mid…right] and search in the left half

        else if (nums[mid] <= nums[right]) {
            right = mid - 1;
        }

        // if nums[left…mid] is sorted, then the pivot element cannot be present in it;
        // discard nums[left…mid] and search in the right half

        else if (nums[mid] >= nums[left]) {
            left = mid + 1;
        }
    }

    // invalid input
    return -1;
};

const nums = [8, 9, 10, 1, 2, 3, 4, 5, 6, 7];
console.log(`Array is rotated ${findRotationCount(nums)} times`);
```

**Output:** Array is rotated 3 times

The time complexity of the above solution is O(log(n)) and doesn’t require any extra space.

Also See:

> [Search an element in a circularly sorted array](https://www.techiedelight.com/search-element-circular-sorted-array/ "Search an element in a circularly sorted array")

> [Find a pair with the given sum in a circularly sorted array](https://www.techiedelight.com/find-pair-with-given-sum-circularly-sorted-array/ "Find a pair with the given sum in a circularly sorted array")

> [Count occurrences of a number in a sorted array with duplicates](https://www.techiedelight.com/count-occurrences-number-sorted-array-duplicates/ "Count occurrences of a number in a sorted array with duplicates")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 193

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
