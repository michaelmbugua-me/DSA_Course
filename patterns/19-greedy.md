# Pattern 19: Greedy Algorithms (bonus)

> Extension to the 14 Patterns article — greedy is easy to apply and easy to get wrong. Learn to prove it.

## Overview

At each step take the choice that looks locally best, never revisiting it. A greedy algorithm is only correct when the problem has the **greedy-choice property** (a locally optimal choice leads to a globally optimal one) and **optimal substructure**. The interview skill isn't just writing the greedy — it's justifying why it's safe, usually with an exchange argument: "if an optimal solution didn't make this choice, swapping it in can't make the solution worse."

## Recognition cues

- "Maximum number of jobs/tasks", "minimum cost/coins", "schedule without overlap"
- A sort key that makes the best choice obvious (by end time, by ratio, by deadline)
- Sometimes combined with a heap (always keep the current best candidate at hand)
- Warning: if you can't articulate the exchange argument, the problem probably needs DP

## Template (Python)

```python3
def greedy(intervals):
    intervals.sort(key=lambda x: x[1])   # the crux: pick the sort key
    count = 0
    last_end = -inf
    for start, end in intervals:
        if start >= last_end:            # provably safe to take
            count += 1
            last_end = end
    return count
```

## Complexity

- Time: usually O(n log n) — one sort, one linear pass
- Space: O(1) beyond the sort

## Common pitfalls

- Picking a greedy that's *almost* right (e.g. earliest start instead of earliest end for activity selection)
- No exchange argument — when challenged in the interview, you need the two-line proof
- Coin change with arbitrary denominations is **not** greedy (fails for {1,3,4}) — DP territory
- Forgetting the counterexample check: mentally test your greedy on a tiny adversarial input

## Practice problems in this repo

- [Activity Selection Problem](../solutions/activity-selection-problem.md)
- [Job Sequencing Problem with Deadlines](../solutions/job-sequencing-problem-deadlines.md)
- [Merging Overlapping Intervals](../solutions/merging-overlapping-intervals.md)
- [Find minimum number of platforms needed in the station](../solutions/minimum-number-of-platforms-needed-avoid-delay-arrival-train.md)
- [Find largest number possible from set of given numbers](../solutions/find-largest-number-possible-set-given-numbers.md) — custom comparator greedy
- [Weighted Interval Scheduling Problem](../solutions/weighted-interval-scheduling-problem.md) — greedy + binary search
- [Trapping Rain Water within given set of bars](../solutions/trapping-rain-water-within-given-set-bars.md) — two-pointer greedy
- [Kruskal's Algorithm for finding Minimum Spanning Tree](../solutions/kruskals-algorithm-for-finding-minimum-spanning-tree.md) — greedy graph algorithm
- [Dijkstra's Single Source Shortest Path Algorithm](../solutions/single-source-shortest-paths-dijkstras-algorithm.md)
- [Huffman Coding](../solutions/huffman-coding.md)
