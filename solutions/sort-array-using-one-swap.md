# Sort an array in one swap whose two elements are swapped

> Source: https://www.techiedelight.com/sort-array-using-one-swap/

Given an array where all its elements are sorted in increasing order except two swapped elements, sort it in linear time. Assume there are no duplicates in the array.

For example,

**Input:** A[] = [3, 8, 6, 7, 5, 9] or [3, 5, 6, 9, 8, 7] or [3, 5, 7, 6, 8, 9] **Output:** A[] = [3, 5, 6, 7, 8, 9]

> 

The idea is to start from the second array element and compare every element with its previous element. We take two pointers, `x` and `y`, to store the conflict’s location. If the previous element is greater than the current element, update `x` to the previous element index and `y` to the current element index. If we find that the previous element is greater than the current element, update `y` to the current element index. Finally, after we are done processing each adjacent pair of elements, swap the elements at index `x` and `y`.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to sort an array where only two elements are swapped
function sortArray(A: number[]): void {

    // base case
    if (A.length <= 1) {
        return;
    }

    let x = -1, y = -1;
    let prev = A[0];

    // process each pair of adjacent elements
    for (let i = 1; i < A.length; i++) {

        // if the previous element is greater than the current element
        if (prev > A[i]) {
            // first occurrence of conflict
            if (x === -1) {
                x = i - 1;
                y = i;
            }
            else {
                // second occurrence of conflict
                y = i;
            }
        }

        prev = A[i];
    }

    // swap the elements at index `x` and `y`
    [A[x], A[y]] = [A[y], A[x]];
}

// const A = [3, 8, 6, 7, 5, 9];
const A = [3, 5, 6, 9, 8, 7];

sortArray(A);

// print the sorted array
console.log(A);
```

**Output:** [3, 5, 6, 7, 8, 9]

The time complexity of the above solution is O(n) since it does only a single scan of the input array of size `n`. The solution doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 188

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
