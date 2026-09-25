# Group elements of an array based on their first occurrence

> Source: https://www.techiedelight.com/group-elements-array-based-first-occurrence/

[Array](https://www.techiedelight.com/Category/Array/)

Given an unsorted integer array containing many duplicate elements, rearrange it such that the same element appears together and the relative order of the first occurrence of each element remains unchanged.

For example,

**Input:** { 1, 2, 3, 1, 2, 1 } **Output:** { 1, 1, 1, 2, 2, 3 } **Input:** { 5, 4, 5, 5, 3, 1, 2, 2, 4 } **Output:** { 5, 5, 5, 4, 4, 3, 1, 2, 2 }

> 

The idea is to use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem. Store the frequency of each element present in the input array in a map. Then traverse the input array, and for each element `A[i]`, two cases are possible:

  * If `A[i]` exists in the map, then this is the first occurrence of `A[i]` in the input array. Print the element, `A[i]`, `k` times, where `k` is the frequency of `A[i]` in the input array (stored in the map). Finally, delete `A[i]` from the map to avoid getting reprocessed.
  * If `A[i]` is not present on the map, then this is the repeated occurrence of `A[i]`. So move to the next element.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to group elements of a given list based on the first
// occurrence of each element
function rearrange(A: number[]): void {

    // create an empty map to store the frequency of each element
    // present in the input list
    const freq = new Map<number, number>();

    // traverse the input list and update the frequency of each element
    for (const i of A) {
        freq.set(i, (freq.get(i) ?? 0) + 1);
    }

    for (const i of A) {
        // if `i` exists in the map (first occurrence of `i`)
        if (freq.get(i)) {
            // print `n` times, where `n = freq[i]`
            for (let _ = 0; _ < freq.get(i)!; _++) {
                console.log(i);
            }

            // remove the element from the map, so it would not
            // get processed again
            freq.set(i, 0);
        }
    }
}

const A = [5, 4, 5, 5, 3, 1, 2, 2, 4];
rearrange(A);
```

**Output:** 5 5 5 4 4 3 1 2 2

The time complexity of the above solution O(n) and requires O(n) extra space, where `n` is the size of the input.

Also See:

> [Efficiently calculate the frequency of all elements present in a limited range array](https://www.techiedelight.com/calculate-frequency-elements-present-array-specified-range/ "Efficiently calculate the frequency of all elements present in a limited range array")

> [Sort an array based on order defined by another array](https://www.techiedelight.com/custom-sort-sort-elements-array-order-elements-defined-second-array/ "Sort an array based on order defined by another array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.95/5. Vote count: 129

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
