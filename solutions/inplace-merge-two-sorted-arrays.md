# In-place merge two sorted arrays

> Source: https://www.techiedelight.com/inplace-merge-two-sorted-arrays/

Given two sorted arrays, `X[]` and `Y[]` of size `m` and `n` each, merge elements of `X[]` with elements of array `Y[]` by maintaining the sorted order, i.e., fill `X[]` with the first `m` smallest elements and fill `Y[]` with remaining elements.

Do the conversion [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) and without using any other data structure.

For example,

**Input:** X[] = { 1, 4, 7, 8, 10 } Y[] = { 2, 3, 9 } **Output:** X[] = { 1, 2, 3, 4, 7 } Y[] = { 8, 9, 10 }

> 

The idea is simple. Consider each array element `X[]` and ignore it if it is already in the correct order (i.e., the element smallest among all remaining elements); otherwise, swap it with the smallest element, which happens to be the first element of `Y[]`. After swapping, move the element (now present at `Y[0]`) to its correct position in `Y[]` to maintain the sorted order.

Following is the implementation in TypeScript based on the above idea. The merge process is almost similar to the merge routine of the [merge sort algorithm](https://techiedelight.com/merge-sort/). The only difference is that we are not using an auxiliary array for merging.

```ts
// Function to in-place merge two sorted arrays `X` and `Y`
// invariant: `X` and `Y` are sorted at any point
function merge(X: number[], Y: number[]): void {

    const m = X.length;
    const n = Y.length;

    // Consider each element `X[i]` of array `X[]` and ignore the element if it is
    // already in the correct order; otherwise, swap it with the next smaller
    // element, which happens to be the first element of `Y[]`.
    for (let i = 0; i < m; i++) {

        // compare the current element of `X[]` with the first element of `Y[]`
        if (X[i] > Y[0]) {

            // swap `X[i]` with `Y[0]`
            const temp = X[i];
            X[i] = Y[0];
            Y[0] = temp;

            const first = Y[0];

            // move `Y[0]` to its correct position to maintain the sorted
            // order of `Y[]`. Note: `Y[1…n-1]` is already sorted
            let k = 1;
            while (k < n && Y[k] < first) {
                Y[k - 1] = Y[k];
                k = k + 1;
            }

            Y[k - 1] = first;
        }
    }
}

const X = [1, 4, 7, 8, 10];
const Y = [2, 3, 9];

merge(X, Y);

console.log('X:', X);
console.log('Y:', Y);
```

**Output:** X: 1 2 3 4 7 Y: 8 9 10

The time complexity of the above solution is O(m.n), where `m` is the size of the first array and `n` is the size of the second array. The solution doesn’t require any extra space. The problem, in fact, can be solved in linear time and constant space. This approach is highly complicated and is discussed [here](http://www.akira.ruc.dk/~keld/teaching/algoritmedesign_f04/Artikler/04/Huang88.pdf). Thanks to Tim for suggesting this optimized approach in the comments.

Also See:

> [Merge two arrays by satisfying given constraints](https://www.techiedelight.com/merge-two-arrays-satisfying-given-constraints/ "Merge two arrays by satisfying given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 199

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
