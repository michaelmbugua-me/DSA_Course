# Find the probability that a person is alive after taking `n` steps on an island

> Source: https://www.techiedelight.com/probability-alive-after-taking-n-steps-island/

An island is in the form of a square matrix, and a person is standing inside the matrix. The person can move one step in any direction (right, left, top, down) in the matrix. Calculate the probability that the person is alive after walking `n` steps on the island, provided that the person dies on stepping outside the matrix.

For example,

**Input:** 2 × 2 matrix The starting coordinates is (0, 0) The total number of steps is 1 **Output:** The alive probability is 0.5 **Input:** 3 × 3 matrix The starting coordinates is (1, 1) The total number of steps is 1 **Output:** The alive probability is 1 **Input:** 3 × 3 matrix The starting coordinates is (0, 0) The total number of steps is 3 **Output:** The alive probability is 0.25

> 

The following solution assumes all steps carry equal probability, i.e., `1/4` or `0.25`. It can easily be modified to handle unequal probabilities.

We can easily solve this problem with the help of [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/). For given position `(x, y)` and remaining steps `n`, the main problem can easily be divided into subproblems:

Prob(x, y, n) = (Prob(x – 1, y, n – 1) + Prob(x + 1, y, n – 1) + Prob(x, y – 1, n – 1) + Prob(x, y + 1, n – 1)) / 4

Following is a TypeScript implementation of the idea:

```ts
// Find the probability that a person is alive after he walks `n` steps
// from location (x, y) on an `N × N` island
function aliveProbability(N: number, x: number, y: number, n: number, dp: Map<string, number>): number {

    // base case
    if (n === 0) {
        return 1.0;
    }

    // calculate unique map key from current coordinates (x, y) of person
    // and number of steps(n) left
    const key = `${x}|${y}|${n}`;

    // if the subproblem is seen for the first time
    if (!dp.has(key)) {
        let p = 0.0;

        // move one step up
        if (x > 0) {
            p += 0.25 * aliveProbability(N, x - 1, y, n - 1, dp);
        }

        // move one step down
        if (x < N - 1) {
            p += 0.25 * aliveProbability(N, x + 1, y, n - 1, dp);
        }

        // move one step left
        if (y > 0) {
            p += 0.25 * aliveProbability(N, x, y - 1, n - 1, dp);
        }

        // move one step right
        if (y < N - 1) {
            p += 0.25 * aliveProbability(N, x, y + 1, n - 1, dp);
        }

        dp.set(key, p);
    }

    return dp.get(key)!;
}

const N = 3;          // `N × N` island
const n = 3;          // total number of steps to be taken
const x = 0, y = 0;   // starting coordinates

// map to store solution to already computed subproblems
const dp = new Map<string, number>();

// calculate alive probability
console.log(`The alive probability is ${aliveProbability(N, x, y, n, dp)}`);
```

**Output:** The alive probability is 0.25

The time complexity of the proposed solution is O(N2) for an `N × N` matrix. The auxiliary space required by the program is O(N2).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 216

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Top-down](https://www.techiedelight.com/Tags/Memoization/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
