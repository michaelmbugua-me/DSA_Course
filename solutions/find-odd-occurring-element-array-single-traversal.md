# Find the odd occurring element in an array in a single traversal

> Source: https://www.techiedelight.com/find-odd-occurring-element-array-single-traversal/

Given an integer array, duplicates are present in it in a way that all duplicates appear an even number of times except one which appears an odd number of times. Find that odd appearing element in linear time and without using any extra memory.

For example,

**Input:** arr[] = [4, 3, 6, 2, 6, 4, 2, 3, 4, 3, 3] **Output:** The odd occurring element is 4

> 

For an input containing `n` elements, we can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in O(n) time. We initially traverse the array and maintain the frequency of each element in a hash table. Then, after each array element is processed, return the element with the odd frequency. The problem with this approach is that it requires O(n) extra space as well. Also, it requires one traversal of the array and one traversal of the hash table.

We can solve this problem in a single traversal of the array and constant space. The idea is to use the XOR operator. We know that if we XOR a number with itself an odd number of times, the result is the number itself; otherwise, if we XOR a number an even number of times with itself, the result is 0. Also, the XOR of a number with 0 is always the number itself.

XOR of ‘x’ with 0: x ^ 0 = x XOR of ‘x’ with itself even number of times: x ^ x = 0 x ^ x ^ x ^ x = (x ^ x) ^ (x ^ x) = 0 ^ 0 = 0 XOR of ‘x’ with itself odd number of times: (x ^ x ^ x) = (x ^ (x ^ x)) = (x ^ 0) = x (x ^ x ^ x ^ x ^ x) = (x ^ (x ^ x) ^ (x ^ x)) = (x ^ 0 ^ 0) = x

So, if we take XOR of all array elements, even appearing elements will cancel each other, and we are left with the only odd appearing element. Following is the TypeScript implementation of the idea:

```ts
// Function to find an odd occurring element in a given array
const findOddOccuring = (arr: number[]): number => {
    let xor = 0;
    for (const i of arr) {
        xor = xor ^ i;
    }

    return xor;
};

const arr = [4, 3, 6, 2, 6, 4, 2, 3, 4, 3, 3];
console.log(`The odd occurring element is ${findOddOccuring(arr)}`);
```

**Output:** The odd occurring element is 4

Also See:

> [Find two odd occurring elements in an array without using any extra space](https://www.techiedelight.com/find-two-odd-occurring-element-array-without-extra-space/ "Find two odd occurring elements in an array without using any extra space")

> [Find the odd occurring element in an array in logarithmic time](https://www.techiedelight.com/find-odd-occurring-element-logn-time/ "Find the odd occurring element in an array in logarithmic time")

> [Find all odd occurring elements in an array having a limited range of elements](https://www.techiedelight.com/find-odd-occurring-elements-array/ "Find all odd occurring elements in an array having a limited range of elements")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 190

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Easy](https://www.techiedelight.com/Tags/easy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
