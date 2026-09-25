# Count occurrences of a number in a sorted array with duplicates

> Source: https://www.techiedelight.com/count-occurrences-number-sorted-array-duplicates/

Given a sorted integer array containing duplicates, count occurrences of a given number. If the element is not found in the array, report that as well.

For example,

**Input:** nums[] = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 5 **Output:** Target 5 occurs 3 times **Input:** nums[] = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 6 **Output:** Target 6 occurs 2 times

> 

A simple solution would be to run a linear search on the array and count the number of occurrences of the given element. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is sorted.

Another solution would be to run a [binary search](https://techiedelight.com/binary-search/) on the given sorted array and find the index of any occurrence of the given number `target`. Since the array is sorted, all occurrences of `target` will be adjacent. So, run a linear scan to find all instances of `target` to the left of the found index, and its right. The worst-case time complexity of this solution remains O(n). The worst case happens when all the array elements are the same as the given number.

We can easily solve this problem in O(log(n)) time by **modifying the binary search algorithm**. The idea is to find the index of the first and last occurrence of the given number and return one more than the difference between two indices. We have already discussed how and [find the first and last occurrence of a number](https://techiedelight.com/find-first-or-last-occurrence-of-a-given-number-sorted-array/) in O(log(n)) time in the previous post.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the first or last occurrence of a given number in
// a sorted list of integers. If `searchFirst` is true, return the
// first occurrence of the number; otherwise, return its last occurrence.
function binarySearch(nums: number[], target: number, searchFirst: boolean): number {
    // search space is nums[left…right]
    let [left, right] = [0, nums.length - 1];

    // initialize the result by -1
    let result = -1;

    // loop till the search space is exhausted
    while (left <= right) {
        // find the mid-value in the search space and compares it with the target
        const mid = Math.floor((left + right) / 2);

        // if the target is found, update the result
        if (target === nums[mid]) {
            result = mid;

            // go on searching towards the left (lower indices)
            if (searchFirst) {
                right = mid - 1;
            }
            // go on searching towards the right (higher indices)
            else {
                left = mid + 1;
            }
        }
        // if the target is less than the middle element, discard the right half
        else if (target < nums[mid]) {
            right = mid - 1;
        }
        // if the target is more than the middle element, discard the left half
        else {
            left = mid + 1;
        }
    }

    // return the found index or -1 if the element is not found
    return result;
}

const nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9];
const target = 5;

const first = binarySearch(nums, target, true);   // pass true for the first occurrence
const last = binarySearch(nums, target, false);   // pass false for the last occurrence

const count = last - first + 1;

if (first !== -1) {
    console.log(`Element ${target} occurs ${count} times`);
} else {
    console.log('Element found not in the list');
}
```

**Output:** Element 5 occurs 3 times

The time complexity of the above solution is O(log(n)) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find the frequency of each element in a sorted array containing duplicates](https://www.techiedelight.com/find-frequency-element-sorted-array-containing-duplicates/ "Find the frequency of each element in a sorted array containing duplicates")

> [Search an element in a circularly sorted array](https://www.techiedelight.com/search-element-circular-sorted-array/ "Search an element in a circularly sorted array")

> [Find the first or last occurrence of a given number in a sorted array](https://www.techiedelight.com/find-first-or-last-occurrence-of-a-given-number-sorted-array/ "Find the first or last occurrence of a given number in a sorted array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
