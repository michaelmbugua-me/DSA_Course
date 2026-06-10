# Weighted Interval Scheduling – Dynamic Programming Solution

> Source: https://www.techiedelight.com/weighted-interval-scheduling-problem-using-lis/

Given a list of jobs where each job has a start and finish time, and a profit associated with it, find a maximum profit subset of non-overlapping jobs.

For example, consider the following jobs with their starting time, finishing time, and associated profit. The maximum profit is `80`, and the jobs involved in the maximum profit are: `(1, 4, 30)` and `(5, 9, 50)`.

Job 1: (0, 6, 60) Job 2: (5, 9, 50) Job 3: (1, 4, 30) Job 4: (5, 7, 30) Job 5: (3, 5, 10) Job 6: (7, 8, 10)

> 

This post will discuss a [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution for [Weighted Interval Scheduling Problem](https://techiedelight.com/weighted-interval-scheduling-problem/), which is nothing but a variation of the [Longest Increasing Subsequence (LIS)](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/) algorithm.

The idea is first to sort given jobs in increasing order of their start time. Let `jobs[0…n-1]` be the sorted array of jobs. We can define an array `maxProfit[]` such that `maxProfit[i]` itself is an array that stores the non-conflicting jobs with maximum profit that ends with the `i'th` job.

Therefore, `maxProfit[i]` can be recursively written as:

maxProfit[i] = jobs[i] + { max(maxProfit[j]), where j < i and jobs[j].finish <= jobs[i].start } = jobs[i], if there is no such j

To demonstrate, consider the following jobs, which are sorted by their start time:

(0, 6, 60) (1, 4, 30) (3, 5, 10) (5, 7, 30) (5, 9, 50) (7, 8, 10)

The `maxProfit[]` would be:

maxProfit[0]: (0, 6, 60) maxProfit[1]: (1, 4, 30) maxProfit[2]: (3, 5, 10) maxProfit[3]: (1, 4, 30) (5, 7, 30) maxProfit[4]: (1, 4, 30) (5, 9, 50) maxProfit[5]: (0, 6, 60) (7, 8, 10)

Now the algorithm picks the one with the highest profit. In the above example, `maxProfit[4]` has the maximum profit. This can be implemented as follows in TypeScript:

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

// Function to find the maximum profit of non-overlapping jobs using LIS
function findMaxProfit(jobs: Job[]): number {
    // base case
    if (jobs.length === 0) {
        return 0;
    }

    // sort the jobs according to increasing order of their start time
    jobs.sort((x, y) => x.start - y.start);

    // get the number of jobs
    const n = jobs.length;

    // `maxProfit[i]` stores the maximum profit of non-conflicting jobs
    // ending at the i'th job
    const maxProfit: number[] = new Array(n);

    // consider every job
    for (let i = 0; i < n; i++) {
        // initialize current profit to 0
        maxProfit[i] = 0;

        // consider each `j` less than `i`
        for (let j = 0; j < i; j++) {
            // if the j'th job is not conflicting with the i'th job and
            // is leading to the maximum profit
            if (jobs[j].finish <= jobs[i].start && maxProfit[i] < maxProfit[j]) {
                maxProfit[i] = maxProfit[j];
            }
        }

        // end the current task with i'th job
        maxProfit[i] += jobs[i].profit;
    }

    // return the maximum profit
    return Math.max(...maxProfit);
}

const jobs = [
    new Job(0, 6, 60), new Job(5, 9, 50), new Job(1, 4, 30),
    new Job(5, 7, 30), new Job(3, 5, 10), new Job(7, 8, 10)
];

console.log('The maximum profit is', findMaxProfit(jobs));
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the total number of jobs.

How to print the jobs involved in maximum profit?

The idea is similar to the above bottom-up approach using dynamic programming, but we maintain an extra array to store the index of jobs involved in the maximum profit. This is demonstrated below in TypeScript:

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

// Function to print the non-overlapping jobs involved in maximum profit
// using the LIS algorithm
function findMaxProfitJobs(jobs: Job[]): void {
    // base case
    if (jobs.length === 0) {
        return;
    }

    // sort the jobs according to increasing order of their start time
    jobs.sort((x, y) => x.start - y.start);

    // get the number of jobs
    const n = jobs.length;

    // `tasks[i]` stores the index of non-conflicting jobs involved in the
    // maximum profit, which ends with the i'th job
    const tasks: number[][] = Array.from({ length: n }, () => []);

    // `maxProfit[i]` stores the total profit of jobs in `tasks[i]`
    const maxProfit: number[] = new Array(n).fill(0);

    // consider every job
    for (let i = 0; i < n; i++) {
        // consider each `j` less than `i`
        for (let j = 0; j < i; j++) {
            // update i'th job if the j'th job is non-conflicting and leading to the
            // maximum profit
            if (jobs[j].finish <= jobs[i].start && maxProfit[i] < maxProfit[j]) {
                tasks[i] = [...tasks[j]];
                maxProfit[i] = maxProfit[j];
            }
        }

        // end current task with i'th job
        tasks[i].push(i);
        maxProfit[i] += jobs[i].profit;
    }

    // find an index with the maximum profit
    let index = 0;
    for (let i = 1; i < n; i++) {
        if (maxProfit[i] > maxProfit[index]) {
            index = i;
        }
    }

    process.stdout.write('The jobs involved in the maximum profit are ');
    for (const i of tasks[index]) {
        process.stdout.write(`(${jobs[i].start}, ${jobs[i].finish}, ${jobs[i].profit}) `);
    }
}

const jobs = [
    new Job(0, 6, 60),
    new Job(5, 9, 50),
    new Job(1, 4, 30),
    new Job(5, 7, 30),
    new Job(3, 5, 10),
    new Job(7, 8, 10)
];

findMaxProfitJobs(jobs);
```

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the total number of jobs.
