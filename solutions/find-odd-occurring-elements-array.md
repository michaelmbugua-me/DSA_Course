# Find all odd occurring elements in an array having a limited range of elements

> Source: https://www.techiedelight.com/find-odd-occurring-elements-array/

Given an array having elements between 0 and 31, find elements that occur an odd number of times without using the extra space.

For example,

**Input:** nums[] = [5, 8, 2, 5, 8, 2, 8, 5, 1, 8, 2] **Output:** The odd occurring elements are 5, 2, and 1 **Explanation:** 1 occurs once. 2 and 5 occurs thrice. 8 occurs four times.

> 

A simple solution would be to store frequencies of the array elements in a count array or a map and print elements with odd frequencies. This approach’s advantage is that it can work on any input range in linear time, but it requires extra space.

To solve this problem in linear time and constant space, use the bitwise XOR operator. We know that the result of an XOR operation is 0 if both the first and second bit are 0 or both are 1, and the result is 1 only if only the first bit is 1 or only the second bit is 1.

To illustrate, consider the input array `nums[] = { 5, 8, 2, 5, 8, 2, 8, 5, 1, 8, 2 }`. If we consider each array element, right shift 1 by its value, and take XOR of all the results, we will get `00000000 00000000 00000000 00100110`.

Each 1 at the `i'th` index from the right represents the odd occurrence of element `i` in the array. Each 0 at the `i'th` index from the right illustrates even or non-occurrence of element `i` in the array. The odd occurring elements are 1, 2, and 5 since 1 holds 1st, 2nd, and 5th position.

The algorithm can be implemented as follows in TypeScript:

```ts
// Find odd occurring elements in a given array
const findRepeating = (nums: number[]): void => {

    let xor = 0;
    for (const i of nums) {
        xor ^= (1 << i);
    }

    process.stdout.write('The odd occurring elements are ');
    for (const i of nums) {
        if ((xor & (1 << i)) !== 0) {
            process.stdout.write(i + ' ');
            xor ^= (1 << i);    // to avoid printing duplicates
        }
    }
};

const nums = [5, 8, 2, 5, 8, 2, 8, 5, 1, 8, 2];
findRepeating(nums);
```

**Output:** The odd occurring elements are 5 2 1

**Exercise:**

1\. Extend the solution for finding even occurring elements. 2\. Extend the solution for handling the range 0 to 63.

**Author:** Aditya Goel

Also See:

> [Find two odd occurring elements in an array without using any extra space](https://www.techiedelight.com/find-two-odd-occurring-element-array-without-extra-space/ "Find two odd occurring elements in an array without using any extra space")

> [Find the odd occurring element in an array in a single traversal](https://www.techiedelight.com/find-odd-occurring-element-array-single-traversal/ "Find the odd occurring element in an array in a single traversal")

> [Find two duplicate elements in a limited range array (using XOR)](https://www.techiedelight.com/find-two-duplicate-elements-limited-range-array-using-xor/ "Find two duplicate elements in a limited range array \(using XOR\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
