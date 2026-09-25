# Maximize the value of an expression

> Source: https://www.techiedelight.com/maximize-value-of-the-expression/

Given an array A, maximize value of expression `(A[s] - A[r] + A[q] - A[p])`, where `p`, `q`, `r`, and `s` are indices of the array and `s > r > q > p`.

For example,

**Input:** A[] = [3, 9, 10, 1, 30, 40] **Output:** 46 **Explanation:** The expression (40 – 1 + 10 – 3) will result in the maximum value

> 

A naive solution would be to generate all combinations of such numbers. The time complexity of this solution would be O(n4), where `n` is the size of the input.

We can use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. The idea is to create four lookup tables, `first[]`, `second[]`, `third[]`, and `fourth[]`, where:

  * `first[]` stores the maximum value of `A[s]`.
  * `second[]` stores the maximum value of `A[s] - A[r]`.
  * `third[]` stores the maximum value of `A[s] - A[r] + A[q]`.
  * `fourth[]` stores the maximum value of `A[s] - A[r] + A[q] - A[p]`.

The maximum value would then be present in index 0 of `fourth[]`, which is our required answer. The implementation can be seen below in TypeScript:

```ts
// Function to find the maximum value of the expression
// (A[l] - A[k] + A[j] - A[i]), where l > k > j > i
function maximizeExpression(A: number[]): number {

    // input should have at least 4 elements
    if (A.length < 4) {
        process.exit(-1);
    }

    // create 4 lookup tables and initialize them to `-Infinity`
    const first: number[] = Array(A.length + 1).fill(Number.NEGATIVE_INFINITY);
    const second: number[] = Array(A.length).fill(Number.NEGATIVE_INFINITY);
    const third: number[] = Array(A.length - 1).fill(Number.NEGATIVE_INFINITY);
    const fourth: number[] = Array(A.length - 2).fill(Number.NEGATIVE_INFINITY);

    // `first` stores the maximum value of `A[l]`
    for (let i = A.length - 1; i >= 0; i--) {
        first[i] = Math.max(first[i + 1], A[i]);
    }

    // `second` stores the maximum value of `A[l] - A[k]`
    for (let i = A.length - 2; i >= 0; i--) {
        second[i] = Math.max(second[i + 1], first[i + 1] - A[i]);
    }

    // `third` stores the maximum value of `A[l] - A[k] + A[j]`
    for (let i = A.length - 3; i >= 0; i--) {
        third[i] = Math.max(third[i + 1], second[i + 1] + A[i]);
    }

    // `fourth` stores the maximum value of `A[l] - A[k] + A[j] - A[i]`
    for (let i = A.length - 4; i >= 0; i--) {
        fourth[i] = Math.max(fourth[i + 1], third[i + 1] - A[i]);
    }

    // maximum value would be present at `fourth[0]`
    return fourth[0];
}

const A = [3, 9, 10, 1, 30, 40];
console.log(maximizeExpression(A));
```

**Output:** 46

The time complexity of the above solution is O(n) and requires O(n) extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 182

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
