# The Levenshtein distance (Edit distance) Problem

> Source: https://www.techiedelight.com/levenshtein-distance-edit-distance-problem/

The Levenshtein distance (or Edit distance) is a way of quantifying how different two strings are from one another by counting the minimum number of operations required to transform one string into the other.

The Levenshtein distance between two words is the minimum number of single-character edits (i.e., insertions, deletions, or substitutions) required to change one word into the other. Each of these operations has a unit cost.

For example, the Levenshtein distance between `kitten` and `sitting` is 3. The minimal edit script that transforms the former into the latter is:

_**k**_ itten —> _**s**_ itten (substitution of s for k) sitt _**e**_ n —> sitt** _i_** n (substitution of i for e) sittin —> sittin _**g**_ (insertion of g at the end)

> 

The Edit distance problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can be broken down into yet simpler subproblems, and so on, until, finally, the solution becomes trivial.

**Problem:** Transform string `X[1…m]` into `Y[1…n]` by performing edit operations on string `X`.

**Subproblem:** Transform substring `X[1…i]` into `Y[1…j]` by performing edit operations on substring `X`.

**Case 1:** We have reached the end of either substring.

If substring `X` is empty, insert all remaining characters of substring `Y` into `X`. The cost of this operation is equal to the number of characters left in substring `Y`.

`('', 'ABC') ——> ('ABC', 'ABC') (cost = 3)`

If substring `Y` is empty, insert all remaining characters of substring `X` into `Y`. The cost of this operation is equal to the number of characters left in substring `X`.

`('ABC', '') ——> ('', '') (cost = 3)`

**Case 2:** The last characters of substring `X` and `Y` are the same.

If the last characters of substring `X` and substring `Y` matches, nothing needs to be done – simply recur for the remaining substring `X[0…i-1]`, `Y[0…j-1]`. As no edit operation is involved, the cost will be 0.

`('AC**C** ', 'AB**C** ') ——> ('AC', 'AB') (cost = 0)`

**Case 3:** The last characters of substring `X` and `Y` are different.

If the last characters of substring `X` and `Y` are different, return the minimum of the following operations:

  * Insert the last character of `Y` into `X`. The size of `Y` reduces by 1, and `X` remains the same. This accounts for `X[1…i]`, `Y[1…j-1]` as we move in on the target substring, but not in the source substring.

`('AB**A** ', 'AB**C** ') ——> ('ABA**C** ', 'AB**C** ') == ('ABA', 'AB') (using case 2)`

  * Delete the last character of `X`. The size of `X` reduces by 1, and `Y` remains the same. This accounts for `X[1…i-1]`, `Y[1…j]` as we move in on the source string, but not in the target string.

`('AB**A** ', 'AB**C** ') ——> ('AB', 'ABC')`

  * Substitute (Replace) the current character of `X` by the current character of `Y`. The size of both `X` and `Y` reduces by 1. This accounts for `X[1…i-1]`, `Y[1…j-1]` as we move in both the source and target string.

`('AB**A** ', 'AB**C** ') —> ('ABC', 'ABC') == ('AB', 'AB') (using case 2)`

It is basically the same as case 2, where the last two characters match, and we move in both the source and target string, except it costs an edit operation.

So, we can define the problem recursively as:

| max(i, j) when min(i, j) = 0 dist[i][j] = | dist[i – 1][j – 1] when X[i-1] == Y[j-1] | 1 + minimum { dist[i – 1][j], when X[i-1] != Y[j-1] | dist[i][j – 1], | dist[i – 1][j – 1] }

Following is a TypeScript implementation of the idea:

```ts
// Function to find Levenshtein distance between string `X` and `Y`.
// `m` and `n` is the total number of characters in `X` and `Y`, respectively
function dist(X: string, m: number, Y: string, n: number): number {
  // base case: empty strings (case 1)
  if (m === 0) {
    return n;
  }

  if (n === 0) {
    return m;
  }

  // if the last characters of the strings match (case 2)
  const cost = X[m - 1] === Y[n - 1] ? 0 : 1;

  return Math.min(dist(X, m - 1, Y, n) + 1,      // deletion (case 3a))
    dist(X, m, Y, n - 1) + 1,                    // insertion (case 3b))
    dist(X, m - 1, Y, n - 1) + cost);            // substitution (case 2 + 3c)
}

const X = 'kitten';
const Y = 'sitting';

console.log('The Levenshtein distance is', dist(X, X.length, Y, Y.length));
```

**Output:** The Levenshtein distance is 3

The time complexity of the above solution is exponential and occupies space in the call stack.

As seen above, the problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly.

The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them.

The invariant maintained throughout the algorithm is that we can transform the initial segment `X[1…i]` into `Y[1…j]` using a minimum of `T[i, j]` operations. In the end, the bottom-right array element contains the answer.

For example, let `X` be ‘kitten’, and `Y` be ‘sitting’. The Levenshtein distance between `X` and `Y` is 3. The `i'th` row and `j'th` column in the table below show the Levenshtein distance of substring `X[0…i-1]` and `Y[0…j-1]`.

Following is a TypeScript implementation of the idea:

```ts
// Function to find Levenshtein distance between string `X` and `Y`.
function dist(X: string, Y: string): number {
  // `m` and `n` is the total number of characters in `X` and `Y`, respectively
  const m = X.length, n = Y.length;

  // For all pairs of `i` and `j`, `T[i, j]` will hold the Levenshtein distance
  // between the first `i` characters of `X` and the first `j` characters of `Y`.
  // Note that `T` holds `(m+1)×(n+1)` values.
  const T: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // we can transform source prefixes into an empty string by
  // dropping all characters
  for (let i = 1; i <= m; i++) {
    T[i][0] = i;                                // (case 1)
  }

  // we can reach target prefixes from empty source prefix
  // by inserting every character
  for (let j = 1; j <= n; j++) {
    T[0][j] = j;                                // (case 1)
  }

  // fill the lookup table in a bottom-up manner
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // if the last characters of the strings match (case 2)
      const cost = X[i - 1] === Y[j - 1] ? 0 : 1;

      T[i][j] = Math.min(T[i - 1][j] + 1,       // deletion (case 3b)
        T[i][j - 1] + 1,                        // insertion (case 3a)
        T[i - 1][j - 1] + cost);                // replace (case 2 + 3c)
    }
  }

  return T[m][n];
}

const X = 'kitten';
const Y = 'sitting';

console.log('The Levenshtein distance is', dist(X, Y));
```

**Output:** The Levenshtein distance is 3

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` is the length of the first string and `n` is the length of the second string. It turns out that only two rows of the table are needed for the construction if one does not want to reconstruct the edited input strings (the previous row and the current row being calculated).

**Exercise:** Modify iterative version to use only two matrix rows.

**References:** [Levenshtein Distance – Wikipedia](https://en.wikipedia.org/wiki/Levenshtein_distance)
