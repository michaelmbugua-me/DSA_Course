# Pattern 15: Dynamic Programming (bonus)

> Extension to the 14 Patterns article — DP deserves its own card.

## Overview

Break a problem into overlapping subproblems, solve each once, and cache the answers. Two techniques: **memoization** (top-down recursion + cache) and **tabulation** (bottom-up table). Every DP solution has: a state (what defines a subproblem), a recurrence (how states combine), a base case, and an answer location.

## Recognition cues

- "Count the number of ways...", "maximum/minimum value of...", "can you reach/achieve..."
- Choices at each step with an optimal substructure (today's choice depends on smaller instances)
- Brute force is exponential but the state space is small (n, n·W, n·sum, n·k...)
- Strings: subsequences, edit distance, palindromes
- Sequences: LIS, knapsack, coin change, house robber, grid paths

## Template (TypeScript)

```ts
function dp(items: number[]): number {
  // 1. define state: dp[i] = answer for first i items (or dp[i][capacity])
  // 2. recurrence: dp[i] = combine(dp[i-1], dp[i-2], choices...)
  // 3. base case, 4. fill order, 5. answer
  const n = items.length;
  const table = new Array(n + 1).fill(0);
  table[0] = base; // TODO
  for (let i = 1; i <= n; i++) {
    table[i] = Math.max(table[i - 1], table[i - 2] + items[i - 1]);
  }
  return table[n];
}
```

Knapsack shape (0/1): iterate items outer, capacity inner, take `max(skip, take)`. Unbounded (coin change): capacity outer, items inner.

## Complexity

- Time: O(number of states × transition cost) — e.g. O(n·W) knapsack, O(n²) LCS
- Space: O(states), usually reducible to one row (rolling array)

## Common pitfalls

- Wrong state definition — the #1 failure mode; spend interview time here
- Off-by-one when state means "first i items" vs "index i"
- Forgetting that some problems need a **second dimension** (days, transactions, colors)
- Top-down recursion blowing the stack — convert to tabulation for big n
- Greedy feel + DP reality: if a local choice can be provably optimal, it's greedy; otherwise DP

## Practice problems in this repo

- [0–1 Knapsack Problem](../solutions/0-1-knapsack-problem.md)
- [Subset sum Problem](../solutions/subset-sum-problem.md)
- [Minimum Sum Partition Problem](../solutions/minimum-sum-partition-problem.md)
- [Rod Cutting](../solutions/rot-cutting.md)
- [Coin change-making problem (unlimited supply of coins)](../solutions/coin-change-making-problem-unlimited-supply-coins.md)
- [Coin Change Problem — total number of ways](../solutions/coin-change-problem-find-total-number-ways-get-denomination-coins.md)
- [Longest Increasing Subsequence](../solutions/longest-increasing-subsequence.md)
- [Maximum Sum Subarray Problem (Kadane's Algorithm)](../solutions/maximum-subarray-problem-kadanes-algorithm.md)
- [The Levenshtein Distance (Edit Distance) Problem](../solutions/levenshtein-distance-edit-distance-problem.md)
- [Longest Common Subsequence Problem](../solutions/longest-common-subsequence.md)
- [Longest Common Substring Problem](../solutions/longest-common-substring-problem.md)
- [Longest Palindromic Substring variants](../solutions/longest-palindromic-substring-non-dp-space-optimized-solution.md)
- [Word Break Problem](../solutions/word-break-problem.md)
- [Matrix Chain Multiplication](../solutions/matrix-chain-multiplication.md)
- [Count number of paths in a matrix with given cost](../solutions/counting-paths-on-grid-to-reach-destination-cell.md)
- [Weighted Interval Scheduling Problem](../solutions/weighted-interval-scheduling-problem.md)
