# Decode an array constructed from another array

> Source: https://www.techiedelight.com/decode-the-array-constructed-another-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array constructed from another array `A` by taking the sum of every distinct pair in it, decode it to get the original array `A` back.

If the original array is `A[0], A[1], … , A[n-1]`, then the input array is

{ (A[0] + A[1]), (A[0] + A[2]), … (A[0] + A[n-1]), (A[1] + A[2]), (A[1] + A[3]), … (A[1] + A[n-1]), … … (A[i] + A[i+1]), (A[i] + A[i+2]), … (A[i] + A[n-1]), … … (A[n-2] + A[n-1]) }

For example,

**Input:** { 3, 4, 5, 5, 6, 7 } **Output:** { 1, 2, 3, 4 } **Input:** { 3, 4, 5, 6, 5, 6, 7, 7, 8, 9 } **Output:** { 1, 2, 3, 4, 5 } **Input:** { 3 } **Output:** { 1, 2 } or { 2, 1 } or { 0, 3 } or { 3, 0 } **Input:** { 3, 4, 5 } **Output:** { 1, 2, 3 }

> 

The idea is to calculate the first element of the original array by using the following relation:

`A[0] = (inp[0] + inp[1] - inp[n-1]) / 2`

As per problem constraints,  inp[0] = A[0] + A[1] inp[1] = A[0] + A[2] inp[n-1] = A[1] + A[2]

Note that the above relation works only when the size of the input array `m` is more than 2. For `m <= 2`, we need to handle the code separately.

Once we know the first element, we can easily derive the remaining elements of the original array by using the relation `A[i] = inp[i-1] - A[0]`.

Note that if `m` is the size of the given array and `n` is the size of the original array, then the relation between `m` and `n` is `m = n×(n-1)/2`, or `n2-n-2×m = 0`.

Solving the above equation, we get `n = (sqrt(8×m+1)+1)/2`. Refer to this [link](https://www.wolframalpha.com/input/?i=y%5E2-y-2x) for proof of correctness of the above equation.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to decode a given array to get back the original array elements
function decode(inp: number[]): void {
    // base case
    const m = inp.length;
    if (m === 0 || m === 2) {
        return;
    }

    // calculate the size of the original array
    const n = Math.floor((Math.sqrt(8 * m + 1) + 1) / 2);

    // create an auxiliary space of size `n` to store elements
    // of the original array
    const A = new Array(n).fill(0);

    // calculate the first element of the original array
    if (n === 1 || m === 1) {
        A[0] = inp[0];
    } else if (n === 2) {
        A[0] = inp[0] - inp[1];
    } else {
        A[0] = Math.floor((inp[0] + inp[1] - inp[n - 1]) / 2);
    }

    // calculate the remaining elements of the original array using
    // the first element
    for (let i = 1; i < n; i++) {
        A[i] = inp[i - 1] - A[0];
    }

    // print the original array
    console.log(A);
}

const inp = [3, 4, 5, 6, 5, 6, 7, 7, 8, 9];
decode(inp);
```

**Output:** 1 2 3 4 5

The time complexity of the above solution is O(n) and requires O(n) extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.61/5. Vote count: 235

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
