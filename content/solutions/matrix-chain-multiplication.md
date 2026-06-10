# Matrix Chain Multiplication using Dynamic Programming

> Source: https://www.techiedelight.com/matrix-chain-multiplication/

Matrix chain multiplication problem: Determine the optimal parenthesization of a product of `n` matrices.

Matrix chain multiplication (or Matrix Chain Ordering Problem, MCOP) is an optimization problem that to find the most efficient way to multiply a given sequence of matrices. The problem is not actually to perform the multiplications but merely to decide the sequence of the matrix multiplications involved.

The matrix multiplication is associative as no matter how the product is parenthesized, the result obtained will remain the same. For example, for four matrices `A`, `B`, `C`, and `D`, we would have:

((AB)C)D = ((A(BC))D) = (AB)(CD) = A((BC)D) = A(B(CD))

However, the order in which the product is parenthesized affects the number of simple arithmetic operations needed to compute the product. For example, if `A` is a `10 × 30` matrix, `B` is a `30 × 5` matrix, and `C` is a `5 × 60` matrix, then computing `(AB)C` needs `(10×30×5) + (10×5×60)` = `1500 + 3000` = `4500` operations while computing `A(BC)` needs `(30×5×60) + (10×30×60)` = `9000 + 18000` = `27000` operations. Clearly, the first method is more efficient.

> 

The idea is to break the problem into a set of related subproblems that group the given matrix to yield the lowest total cost.

Following is the recursive algorithm to find the minimum cost:

  * Take the sequence of matrices and separate it into two subsequences.
  * Find the minimum cost of multiplying out each subsequence.
  * Add these costs together, and add in the price of multiplying the two result matrices.
  * Do this for each possible position at which the sequence of matrices can be split, and take the minimum over all of them.

For example, if we have four matrices `ABCD`, we compute the cost required to find each of `(A)(BCD)`, `(AB)(CD)`, and `(ABC)(D)`, making recursive calls to find the minimum cost to compute `ABC`, `AB`, `CD`, and `BCD` and then choose the best one. Better still, this yields the minimum cost and demonstrates the best way of doing the multiplication.

Following is a TypeScript implementation of the idea:

```ts
// Function to find the most efficient way to multiply
// a given sequence of matrices
function matrixChainMultiplication(dims: number[], i: number, j: number): number {

    // base case: one matrix
    if (j <= i + 1) {
        return 0;
    }

    // stores the minimum number of scalar multiplications (i.e., cost)
    // needed to compute matrix `M[i+1] … M[j] = M[i…j]`
    let min = Number.MAX_SAFE_INTEGER;

    // take the minimum over each possible position at which the
    // sequence of matrices can be split

    /*
        (M[i+1]) × (M[i+2]………………M[j])
        (M[i+1]M[i+2]) × (M[i+3…………M[j])
        …
        …
        (M[i+1]M[i+2]…………M[j-1]) × (M[j])
    */

    for (let k = i + 1; k <= j - 1; k++)
    {
        // recur for `M[i+1]…M[k]` to get an `i × k` matrix
        let cost = matrixChainMultiplication(dims, i, k);

        // recur for `M[k+1]…M[j]` to get an `k × j` matrix
        cost += matrixChainMultiplication(dims, k, j);

        // cost to multiply two `i × k` and `k × j` matrix
        cost += dims[i] * dims[k] * dims[j];

        if (cost < min) {
            min = cost;
        }
    }

    // return the minimum cost to multiply `M[j+1]…M[j]`
    return min;
}

// Matrix Chain Multiplication Problem

// Matrix `M[i]` has dimension `dims[i-1] × dims[i]` for `i=1…n`
// input is 10 × 30 matrix, 30 × 5 matrix, 5 × 60 matrix
const dims = [10, 30, 5, 60];

console.log(`The minimum cost is ${matrixChainMultiplication(dims, 0, dims.length - 1)}`);
```

**Output:** The minimum cost is 4500

The time complexity of the above solution is exponential as we are doing a lot of redundant work. For example, for matrix `ABCD`, the code will make a recursive call to find the best cost for computing both `ABC` and `AB`. But finding the best cost for computing `ABC` also requires finding the best cost for `AB`. As the recursion grows deeper, more and more of this type of unnecessary repetition occurs. The idea is to use **memoization**. Now each time we compute the minimum cost needed to multiply out a specific subsequence, save it. If we are ever asked to compute it again, simply give the saved answer and do not recompute it.

This approach is demonstrated below in TypeScript:

```ts
// Function to find the most efficient way to multiply
// a given sequence of matrices
function matrixChainMultiplication(dims: number[], i: number, j: number, lookup: number[][]): number {

    // base case: one matrix
    if (j <= i + 1) {
        return 0;
    }

    // stores the minimum number of scalar multiplications (i.e., cost)
    // needed to compute matrix `M[i+1] … M[j] = M[i…j]`
    let min = Number.MAX_SAFE_INTEGER;

    // if the subproblem is seen for the first time, solve it and
    // store its result in a lookup table
    if (lookup[i][j] === 0)
    {
        // take the minimum over each possible position at which the
        // sequence of matrices can be split

        /*
            (M[i+1]) × (M[i+2]………………M[j])
            (M[i+1]M[i+2]) × (M[i+3…………M[j])
            …
            …
            (M[i+1]M[i+2]…………M[j-1]) × (M[j])
        */

        for (let k = i + 1; k <= j - 1; k++)
        {
            // recur for `M[i+1]…M[k]` to get an `i × k` matrix
            let cost = matrixChainMultiplication(dims, i, k, lookup);

            // recur for `M[k+1]…M[j]` to get an `k × j` matrix
            cost += matrixChainMultiplication(dims, k, j, lookup);

            // cost to multiply two `i × k` and `k × j` matrix
            cost += dims[i] * dims[k] * dims[j];

            if (cost < min) {
                min = cost;
            }
        }

        lookup[i][j] = min;
    }

    // return the minimum cost to multiply `M[j+1]…M[j]`
    return lookup[i][j];
}

// Matrix Chain Multiplication Problem

// Matrix `M[i]` has dimension `dims[i-1] × dims[i]` for `i=1…n`
// input is 10 × 30 matrix, 30 × 5 matrix, 5 × 60 matrix
const dims = [10, 30, 5, 60];

// lookup table to store the solution to already computed subproblems
const lookup: number[][] = Array.from({ length: dims.length }, () => Array(dims.length).fill(0));

console.log(`The minimum cost is ${matrixChainMultiplication(dims, 0, dims.length - 1, lookup)}`);
```

**Output:** The minimum cost is 4500

The time complexity of the above top-down solution is O(n3) and requires O(n2) extra space, where `n` is the total number of matrices.

The following [bottom-up approach](https://techiedelight.com/introduction-dynamic-programming/#bottom-up) computes, for each `2 <= k <= n`, the minimum costs of all subsequences of length `k`, using the prices of smaller subsequences already computed. It has the same asymptotic runtime and requires no recursion.

Following is a TypeScript implementation of the idea:

```ts
// Function to find the most efficient way to multiply
// a given sequence of matrices
function matrixChainMultiplication(dims: number[]): number {
    const n = dims.length;

    // c[i, j] = Minimum number of scalar multiplications (i.e., cost)
    // needed to compute matrix `M[i] M[i+1] … M[j] = M[i…j]`
    // The cost is zero when multiplying one matrix
    const c: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    for (let len = 2; len <= n; len++)        // subsequence lengths
    {
        for (let i = 1; i <= n - len + 1; i++)
        {
            const j = i + len - 1;
            c[i][j] = Number.MAX_SAFE_INTEGER;

            for (let k = i; j < n && k <= j - 1; k++)
            {
                const cost = c[i][k] + c[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
                if (cost < c[i][j]) {
                    c[i][j] = cost;
                }
            }
        }
    }
    return c[1][n - 1];
}

// Matrix Chain Multiplication Problem

// Matrix `M[i]` has dimension `dims[i-1] × dims[i]` for `i=1…n`
// input is 10 × 30 matrix, 30 × 5 matrix, 5 × 60 matrix
const dims = [10, 30, 5, 60];

console.log(`The minimum cost is ${matrixChainMultiplication(dims)}`);
```

**Output:** The minimum cost is 4500
