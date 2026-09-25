# Find two duplicate elements in a limited range array (using XOR)

> Source: https://www.techiedelight.com/find-two-duplicate-elements-limited-range-array-using-xor/

Given an integer array of size `n+2` containing elements between 1 and `n` with two element repeating, find both duplicate elements without using any extra memory in linear time.

For example,

**Input:** arr[] = [4, 3, 6, 5, 2, 4, 1, 1] **Output:** The duplicate elements are 1 and 4

> 

**Related Post:**

> [Find two odd occurring elements in an array without using any extra space](https://techiedelight.com/find-two-odd-occurring-element-array-without-extra-space/)

For an input containing `n` elements, we can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in O(n) time. The idea is to traverse the array and maintain the frequency of each element in a hash table. Then, after each array element is processed, return the elements with a frequency of two. The problem with this approach is that it requires O(n) extra space as well. Also, it requires one traversal of the array and one traversal of the hash table. The advantage of this approach is its simplicity and the fact that it will work for any number of duplicate elements present in the array.

We can solve this problem in a single traversal of the array and constant space. The idea is to use the XOR operator. We know that if we XOR a number with itself an odd number of times, the result is the number itself; otherwise, if we XOR a number an even number of times with itself, the result is 0. Also, XOR with 0 is always the number itself.

XOR of ‘x’ with 0: x ^ 0 = x XOR of ‘x’ with itself even number of times: x ^ x = 0 x ^ x ^ x ^ x = (x ^ x) ^ (x ^ x) = 0 ^ 0 = 0 XOR of ‘x’ with itself odd number of times: (x ^ x ^ x) = (x ^ (x ^ x)) = (x ^ 0) = x (x ^ x ^ x ^ x ^ x) = (x ^ (x ^ x) ^ (x ^ x)) = (x ^ 0 ^ 0) = x

If we take XOR of all array elements with every element in range `[1, n]`, even appearing elements will cancel each other. We are left with XOR of `x` and `y`, `x ^ y`, where `x` and `y` are two duplicate elements. Note that the duplicate elements will be _XOR_ ed three times in total, whereas all other elements will be _XOR_ ed twice.

How to find x and y?

We know that any set bit in `result = (x ^ y)` will be either set in `x` or `y` (but not in both as a bit will only set in `result` when it is set in one number and unset in the other).

The idea is to consider the rightmost set bit in `result` (or any other set bit) and split the array/range into two lists:

  1. The first list contains all the array elements and numbers in the range that have this bit set.
  2. The second list contains all the array elements and numbers in the range that have this bit unset.

As this rightmost bit is set in one number and unset in the other, we will have one duplicate element in each list. Basically, we have isolated traits of one number with the other, so that both `x` and `y` will go to different lists.

Now iterate each list once more, do XOR on each element in the list, and the result will be the duplicate element present in that list (since elements appearing twice will cancel each other).

Following is a TypeScript implementation based on the above idea:

```ts
const log2 = (x: number, base: number): number =>
    Math.floor(Math.log(x) / Math.log(base));

// Function to find two repeating elements in a list of size `n+2`
// having a range of elements from 1 to `n` using XOR operator
const findDuplicates = (arr: number[], n: number): void => {
    // take XOR of all list elements index 0 to `n-1` and
    // elements from 1 to `n`
    let result = arr[0] ^ arr[n + 1];
    for (let i = 1; i <= n; i++) {
        result = result ^ arr[i] ^ i;
    }

    // `x` and `y` are two odd appearing elements
    let x = 0;
    let y = 0;

    // `result` stores `x ^ y`

    // find the position of the rightmost set bit in `result`
    const k = log2(result & -result, 2);

    // split the list into two sublists
    for (let i = 0; i < n + 2; i++) {
        // list elements that have k'th bit 1
        if (arr[i] & (1 << k)) {
            x = x ^ arr[i];
        }

        // list elements that have k'th bit 0
        else {
            y = y ^ arr[i];
        }
    }

    // split range [1, n] into two subranges
    for (let i = 1; i <= n; i++) {
        // number `i` has k'th bit 1
        if (i & (1 << k)) {
            x = x ^ i;
        }

        // number `i` has k'th bit 0
        else {
            y = y ^ i;
        }
    }

    console.log(`The duplicate elements are ${x} and ${y}`);
};

const arr = [4, 3, 6, 5, 2, 4, 1, 1];
const n = 6;        // list size is `n+2`
findDuplicates(arr, n);
```

**Output:** The duplicate elements are 1 and 4

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
