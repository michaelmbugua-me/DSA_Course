# Pattern 4: Merge Intervals

> From [14 Patterns to Ace Any Coding Interview Question](https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed) by Fahim ul Haq, extended with templates, complexity analysis and practice problems from this repo.

## Overview

Efficient technique for dealing with **overlapping intervals** (ranges with a start and end). Sort intervals by start time, then walk through them merging each interval into the previous one whenever they overlap. Any interval problem reduces to handling the 6 ways two intervals `[a_start, a_end]` and `[b_start, b_end]` can relate: no overlap (a before b / b before a), partial overlap (4 variants), and full containment (2 variants).

## Recognition cues

- Words like "intervals", "ranges", "meetings", "schedules", "time slots"
- Asked to produce a list of **mutually exclusive** intervals
- Asked for the max number of "things happening at once" (CPU load, rooms, platforms)
- Any question where you insert an interval into an existing set

## Template (TypeScript)

```ts
type Interval = [number, number];

function mergeIntervals(intervals: Interval[]): Interval[] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: Interval[] = [];
  for (const [start, end] of intervals) {
    // no overlap with the last merged interval -> append
    if (merged.length === 0 || merged[merged.length - 1][1] < start) {
      merged.push([start, end]);
    } else {
      const last = merged[merged.length - 1];
      last[1] = Math.max(last[1], end); // overlap -> extend
    }
  }
  return merged;
}
```

Sorting by start guarantees each new interval only needs to be compared with the **last** merged one.

## Complexity

- Time: O(n log n) — dominated by the sort; the merge walk is O(n)
- Space: O(n) for the output

## Common pitfalls

- Forgetting `max(merged[-1][1], end)` — a big interval can fully contain the next small one
- Sorting by start but forgetting the boundary case `a.end == b.start` (depends on whether touching counts as overlapping)
- For "count max concurrent" variants: sweep line with events (+1 at start, −1 at end) is usually simpler than merging

## Practice problems in this repo

- [Merging Overlapping Intervals](../solutions/merging-overlapping-intervals.md)
- [Find minimum platforms needed in the station so to avoid any delay in arrival of any train](../solutions/minimum-number-of-platforms-needed-avoid-delay-arrival-train.md)
- [Weighted Interval Scheduling Problem](../solutions/weighted-interval-scheduling-problem.md)
- [Weighted Interval Scheduling using LIS algorithm](../solutions/weighted-interval-scheduling-problem-using-lis.md)
- [Job Sequencing Problem with Deadlines](../solutions/job-sequencing-problem-deadlines.md)
- [Activity Selection Problem](../solutions/activity-selection-problem.md)
