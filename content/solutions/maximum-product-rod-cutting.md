# Maximum Product Rod Cutting

> Source: https://www.techiedelight.com/maximum-product-rod-cutting/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a rod of length `n`, find the optimal way to cut the rod into smaller rods to maximize the product of each of the smaller rod’s price. Assume that each rod of length `i` has price `i`.

For example, consider the following rod of length 4:

**Best:** Cut the rod into two pieces of length 2 each to gain revenue of 2×2 = 4 **Cut Profit** 4 4 1, 3 (1 × 3) = 3 **2, 2 (2 × 2) = 4** 3, 1 (3 × 1) = 3 1, 1, 2 (1 × 1 × 2) = 2 1, 2, 1 (1 × 2 × 1) = 2 2, 1, 1 (2 × 1 × 1) = 2 1, 1, 1, 1 (1 × 1 × 1 × 1) = 1 Similarly, for n = 6, (3 × 3) = 9 For n = 8, (2 × 3 × 3) = 18 For n = 15, (3 × 3 × 3 × 3 × 3) = 243

> 

The idea is simple. First, partition the given rod of length `n` into two parts of length `i` and `n-i` for each `1 <= i <= n`. Then recur for the rod of length `n-i` but don’t divide rod of length `i` any further. Finally, take a maximum of all values. This yields the following recursive relation:

rodcut(n) = max { n, i * rodcut(n – i) } where 1 <= i <= n

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the best way to cut a rod of length `n`
// where the rod of length `i` has price `i`
function findMaxProfit(n: number): number {

    // base case
    if (n <= 1) {
        return n;
    }

    // rod of length `n` has at least cost of `n`
    let maxValue = n;

    // one by one, partition the given rod of length `n` into two parts of
    // length (1, n-1), (2, n-2), … (n-1 , 1), (n, 0) and take maximum
    for (let i = 1; i <= n; i++) {
        maxValue = Math.max(maxValue, i * findMaxProfit(n - i));
    }

    return maxValue;
}

// `n` is rod length
const n = 15;        // 3 × 5 times

console.log(`The maximum profit is ${findMaxProfit(n)}`);
```

The time complexity of the above solution is O(nn) and occupies space in the call stack, where `n` is the rod length.

We have seen that the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. So, the problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). Let’s consider a recursion tree for the rod of length 4.

As we can see, the same subproblems (highlighted in the same color) are getting computed repeatedly. So, the problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, where subproblem solutions are _memo_ ized rather than computed and again.

We will solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `T[i]`, which stores the maximum profit achieved from the rod of length `i` for each `1 <= i <= n`. It uses the value of smaller values `i` already computed.

Following is a TypeScript implementation of the idea:

```ts
function findMaxProfit(n: number): number {

    // `T[i]` stores the maximum profit achieved from the rod of length `i`.
    // A rod of length `i` has at least cost `i`
    const T: number[] = Array.from({ length: n + 1 }, (_, i) => i);

    // consider rod of length `i`
    for (let i = 2; i <= n; i++)
    {
        // divide the rod of length `i` into two rods of length `j`
        // and `i-j` each and take maximum
        for (let j = 1; j <= i; j++) {
            T[i] = Math.max(T[i], j * T[i - j]);
        }
    }

    // `T[n]` stores the maximum profit achieved from the rod of length `n`
    return T[n];
}

// rod length
const n = 15;

console.log(`The maximum profit is ${findMaxProfit(n)}`);
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the rod length.
