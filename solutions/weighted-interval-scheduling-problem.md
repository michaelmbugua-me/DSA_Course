# Weighted Interval Scheduling Problem

> Source: https://www.techiedelight.com/weighted-interval-scheduling-problem/

Given a list of jobs where each job has a start and finish time, and has profit associated with it, find a maximum profit subset of non-overlapping jobs.

For example, consider the following jobs with their starting time, finishing time, and associated profit:

Job 1: (0, 6, 60) Job 2: (1, 4, 30) Job 3: (3, 5, 10) Job 4: (5, 7, 30) Job 5: (5, 9, 50) Job 6: (7, 8, 10) The maximum profit is 80, which is achieved by picking job 2 and Job 5.

> 

This problem is a standard variation of the [Activity Selection Problem](https://techiedelight.com/activity-selection-problem/). The [greedy algorithm](https://techiedelight.com/greedy-algorithm-problems/) works fine for the activity selection problem since all jobs have equal weight. But the greedy approach won’t work with weighted jobs since even a single job may have more profit than all jobs combined.

## 1\. Naive Recursive Solution

The idea is to [sort the jobs](https://techiedelight.com/sort-vector-custom-objects-cpp/) in increasing order of their finish times and then use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For each job, there are two possibilities:

  1. Include the current job results and recur only for non-conflicting jobs with the current job. Since the jobs are sorted according to their finish times, we can find the last non-conflicting job by performing a linear search or [binary search](https://techiedelight.com/binary-search/) on the sorted input.
  2. Exclude the current job from the result and recur for the remaining items.

Finally, return the maximum profit we get by including or excluding the current job. The recursive algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a Job
class Job {
    start: number;
    finish: number;
    profit: number;
    constructor(start: number, finish: number, profit: number) {
        this.start = start;
        this.finish = finish;
        this.profit = profit;
    }
}

// Function to find the index of the last job which doesn't conflict with the given job.
// It performs a linear search on the given list of jobs.
function findLastNonConflictingJob(jobs: Job[], n: number): number {
    // find the last job index whose finish time is less than or equal to the
    // given job's start time
    for (let i = n - 1; i >= 0; i--) {
        if (jobs[i].finish <= jobs[n].start) {
            return i;
        }
    }

    // return the negative index if no non-conflicting job is found
    return -1;
}

// A recursive function to find the maximum profit subset of non-overlapping
// jobs, which are sorted according to finish time
function findMaxProfit(jobs: Job[], n: number): number {
    // base case
    if (n < 0) {
        return 0;
    }

    // return if only one item is remaining
    if (n === 0) {
        return jobs[0].profit;
    }

    // find the index of the last non-conflicting job with the current job
    const index = findLastNonConflictingJob(jobs, n);

    // include the current job and recur for non-conflicting jobs `[0, index]`
    const incl = jobs[n].profit + findMaxProfit(jobs, index);

    // exclude the current job and recur for remaining items `[0, n-1]`
    const excl = findMaxProfit(jobs, n - 1);

    // return the maximum profit by including or excluding the current job
    return Math.max(incl, excl);
}

// Wrapper over `findMaxProfit()` function
function maxProfit(jobs: Job[]): number {
    // sort jobs in increasing order of their finish times
    jobs.sort((x, y) => x.finish - y.finish);

    return findMaxProfit(jobs, jobs.length - 1);
}

const jobs = [
    new Job(0, 6, 60), new Job(1, 4, 30), new Job(3, 5, 10),
    new Job(5, 7, 30), new Job(5, 9, 50), new Job(7, 8, 10)
];

console.log('The maximum profit is', maxProfit(jobs));
```

The time complexity of the above solution is exponential and occupies space in the call stack.

## 2\. Dynamic Programming Solution

The above solution has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and also exhibits [overlapping subproblem](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). So, we can solve this problem in a bottom-up manner using dynamic programming, in which we solve smaller subproblems first, then solve larger subproblems from them. The bottom-up approach can be implemented as follows in TypeScript:

```ts
// A class to store a Job
class Job {
    start: number;
    finish: number;
    profit: number;
    constructor(start: number, finish: number, profit: number) {
        this.start = start;
        this.finish = finish;
        this.profit = profit;
    }
}

// Function to find the index of the last job which doesn't conflict with the given job.
// It performs a linear search on the given list of jobs.
function findLastNonConflictingJob(jobs: Job[], n: number): number {
    // find the last job index whose finish time is less than or equal to the
    // given job's start time
    for (let i = n - 1; i >= 0; i--) {
        if (jobs[i].finish <= jobs[n].start) {
            return i;
        }
    }

    // return the negative index if no non-conflicting job is found
    return -1;
}

// Function to find the maximum profit of non-overlapping jobs using DP
function findMaxProfit(jobs: Job[]): number {
    // base case
    if (jobs.length === 0) {
        return 0;
    }

    // sort jobs in increasing order of their finish times
    jobs.sort((x, y) => x.finish - y.finish);

    // construct a lookup table where the i'th index stores the maximum profit
    // for the first `i` jobs
    const maxProfit: number[] = new Array(jobs.length);

    // maximum profit gained by including the first job
    maxProfit[0] = jobs[0].profit;

    // fill the `maxProfit` table in a bottom-up manner from the second index
    for (let i = 1; i < jobs.length; i++) {
        // find the index of the last non-conflicting job with the current job
        const index = findLastNonConflictingJob(jobs, i);

        // include the current job with its non-conflicting jobs
        let incl = jobs[i].profit;
        if (index !== -1) {
            incl += maxProfit[index];
        }

        // store the maximum profit by including or excluding the current job
        maxProfit[i] = Math.max(incl, maxProfit[i - 1]);
    }

    // return maximum profit
    return maxProfit[jobs.length - 1];
}

const jobs = [
    new Job(0, 6, 60),
    new Job(1, 4, 30),
    new Job(3, 5, 10),
    new Job(5, 7, 30),
    new Job(5, 9, 50),
    new Job(7, 8, 10)
];

console.log('The maximum profit is', findMaxProfit(jobs));
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the total number of jobs.

## 3\. Optimized Dynamic Programming Solution

We can further optimize the above dynamic programming solution to run in O(n.log(n)) time using the [binary search algorithm](https://techiedelight.com/binary-search/) to find the last non-conflicting job. The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a Job
class Job {
    start: number;
    finish: number;
    profit: number;
    constructor(start: number, finish: number, profit: number) {
        this.start = start;
        this.finish = finish;
        this.profit = profit;
    }
}

// Function to perform a binary search on the given jobs, which are
// sorted by finish time. The function returns the index of the last job,
// which doesn't conflict with the given job, i.e., whose finish time is
// less than or equal to the given job's start time.
function findLastNonConflictingJob(jobs: Job[], n: number): number {
    // search space
    let low = 0;
    let high = n;

    // iterate till the search space is exhausted
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (jobs[mid].finish <= jobs[n].start) {
            if (jobs[mid + 1].finish <= jobs[n].start) {
                low = mid + 1;
            } else {
                return mid;
            }
        } else {
            high = mid - 1;
        }
    }

    // return the negative index if no non-conflicting job is found
    return -1;
}

// Function to find the maximum profit of non-overlapping jobs using DP
function findMaxProfit(jobs: Job[]): number {
    // sort jobs in increasing order of their finish times
    jobs.sort((x, y) => x.finish - y.finish);

    // get the number of jobs
    const n = jobs.length;

    // base case
    if (n === 0) {
        return 0;
    }

    // construct a lookup table where the i'th index stores the maximum profit
    // for the first `i` jobs
    const maxProfit: number[] = new Array(n);

    // maximum profit gained by including the first job
    maxProfit[0] = jobs[0].profit;

    // fill the `maxProfit[]` table in a bottom-up manner from the second index
    for (let i = 1; i < n; i++) {
        // find the index of the last non-conflicting job with the current job
        const index = findLastNonConflictingJob(jobs, i);

        // include the current job with its non-conflicting jobs
        let incl = jobs[i].profit;
        if (index !== -1) {
            incl += maxProfit[index];
        }

        // store the maximum profit by including or excluding the current job
        maxProfit[i] = Math.max(incl, maxProfit[i - 1]);
    }

    // return maximum profit
    return maxProfit[n - 1];
}

const jobs = [
    new Job(0, 6, 60),
    new Job(1, 4, 30),
    new Job(3, 5, 10),
    new Job(5, 7, 30),
    new Job(5, 9, 50),
    new Job(7, 8, 10)
];

console.log(`The maximum profit is ${findMaxProfit(jobs)}`);
```

**Output:** The maximum profit is 80
