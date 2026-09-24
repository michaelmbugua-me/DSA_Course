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

Now the algorithm picks the one with the highest profit. In the above example, `maxProfit[4]` has the maximum profit. This can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Data structure to store a Job
struct Job {
    int start, finish, profit;
};

// Function to find the maximum profit of non-overlapping jobs using LIS
int findMaxProfit(vector<Job> jobs)        // no-ref, no-const
{
    // sort the jobs according to increasing order of their start time
    sort(jobs.begin(), jobs.end(),
        [](Job &x, Job &y) {
            return x.start < y.start;
        });

    // get the number of jobs
    int n = jobs.size();

    // base case
    if (n == 0) {
        return 0;
    }

    // `maxProfit[i]` stores the maximum profit of non-conflicting jobs
    // ending at the i'th job
    int maxProfit[n];

    // consider every job
    for (int i = 0; i < n; i++)
    {
        // initialize current profit to 0
        maxProfit[i] = 0;

        // consider each `j` less than `i`
        for (int j = 0; j < i; j++)
        {
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
    return *max_element(maxProfit, maxProfit + n);
}

int main()
{
    vector<Job> jobs {
        { 0, 6, 60 },
        { 5, 9, 50 },
        { 1, 4, 30 },
        { 5, 7, 30 },
        { 3, 5, 10 },
        { 7, 8, 10 }
    };

    cout << "The maximum profit is " << findMaxProfit(jobs);

    return 0;
}
```

**Output:** The maximum profit is 80

##

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

// A class to store a Job
class Job
{
    int start, finish, profit;

    Job(int start, int finish, int profit)
    {
        this.start = start;
        this.finish = finish;
        this.profit = profit;
    }
}

class Main
{
    // Function to find the maximum profit of non-overlapping jobs using LIS
    public static int findMaxProfit(List<Job> jobs)
    {
        // sort the jobs according to increasing order of their start time
        Collections.sort(jobs, Comparator.comparingInt(x -> x.start));

        // get the number of jobs
        int n = jobs.size();

        // base case
        if (n == 0) {
            return 0;
        }

        // `maxProfit[i]` stores the maximum profit of non-conflicting jobs
        // ending at the i'th job
        int[] maxProfit = new int[n];

        // consider every job
        for (int i = 0; i < n; i++)
        {
            // initialize current profit to 0
            maxProfit[i] = 0;

            // consider each `j` less than `i`
            for (int j = 0; j < i; j++)
            {
                // if the j'th job is not conflicting with the i'th job and
                // is leading to the maximum profit
                if (jobs.get(j).finish <= jobs.get(i).start
                        && maxProfit[i] < maxProfit[j]) {
                    maxProfit[i] = maxProfit[j];
                }
            }

            // end the current task with i'th job
            maxProfit[i] += jobs.get(i).profit;
        }

        // return the maximum profit
        return Arrays.stream(maxProfit).max().getAsInt();
    }

    public static void main(String[] args)
    {
        List<Job> jobs = Arrays.asList(
                new Job( 0, 6, 60 ),
                new Job( 5, 9, 50 ),
                new Job( 1, 4, 30 ),
                new Job( 5, 7, 30 ),
                new Job( 3, 5, 10 ),
                new Job( 7, 8, 10 )
        );

        System.out.println("The maximum profit is " + findMaxProfit(jobs));
    }
}
```

##

```python3
# A class to store a Job
class Job:
    def __init__(self, start, finish, profit):
        self.start = start
        self.finish = finish
        self.profit = profit

# Function to find the maximum profit of non-overlapping jobs using LIS
def findMaxProfit(jobs):

    # base case
    if not jobs:
        return 0

    # sort the jobs according to increasing order of their start time
    jobs.sort(key=lambda x: x.start)

    # `maxProfit[i]` stores the maximum profit of non-conflicting jobs
    # ending at the i'th job
    maxProfit = [None] * len(jobs)

    # consider every job
    for i in range(len(jobs)):
        # initialize current profit to 0
        maxProfit[i] = 0

        # consider each `j` less than `i`
        for j in range(i):
            # if the j'th job is not conflicting with the i'th job and
            # is leading to the maximum profit
            if jobs[j].finish <= jobs[i].start and maxProfit[i] < maxProfit[j]:
                maxProfit[i] = maxProfit[j]

        # end the current task with i'th job
        maxProfit[i] += jobs[i].profit

    # return the maximum profit
    return max(maxProfit)

if __name__ == '__main__':

    jobs = [
        Job(0, 6, 60), Job(5, 9, 50), Job(1, 4, 30),
        Job(5, 7, 30), Job(3, 5, 10), Job(7, 8, 10)
    ]

    print('The maximum profit is', findMaxProfit(jobs))
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the total number of jobs.

How to print the jobs involved in maximum profit?

The idea is similar to the above bottom-up approach using dynamic programming, but we maintain an extra array to store the index of jobs involved in the maximum profit. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Data structure to store a Job
struct Job {
    int start, finish, profit;
};

// Function to print the non-overlapping jobs involved in maximum profit
// using the LIS algorithm
void findMaxProfitJobs(vector<Job> jobs)        // no-ref, no-const
{
    // sort the jobs according to increasing order of their start time
    sort(jobs.begin(), jobs.end(),
        [](Job &x, Job &y) {
            return x.start < y.start;
        });

    // get the number of jobs
    int n = jobs.size();

    // base case
    if (n == 0) {
        return;
    }

    // `tasks[i]` stores the index of non-conflicting jobs involved in the
    // maximum profit, which ends with the i'th job
    vector<int> tasks[n];

    // `maxProfit[i]` stores the total profit of jobs in `tasks[i]`
    int maxProfit[n];

    // consider every job
    for (int i = 0; i < n; i++)
    {
        // initialize current profit to 0
        maxProfit[i] = 0;

        // consider each `j` less than `i`
        for (int j = 0; j < i; j++)
        {
            // update i'th job if the j'th job is non-conflicting and leading to the
            // maximum profit
            if (jobs[j].finish <= jobs[i].start && maxProfit[i] < maxProfit[j])
            {
                tasks[i] = tasks[j];
                maxProfit[i] = maxProfit[j];
            }
        }

        // end current task with i'th job
        tasks[i].push_back(i);
        maxProfit[i] += jobs[i].profit;
    }

    // find an index with the maximum profit
    int index = 0;
    for (int i = 1; i < n; i++)
    {
        if (maxProfit[i] > maxProfit[index]) {
            index = i;
        }
    }

    cout << "The jobs involved in the maximum profit are ";
    for (int i: tasks[index])
    {
        cout << "(" << jobs[i].start << ", " << jobs[i].finish << ", "
             << jobs[i].profit << ") ";
    }
}

int main()
{
    vector<Job> jobs {
        { 0, 6, 60 },
        { 5, 9, 50 },
        { 1, 4, 30 },
        { 5, 7, 30 },
        { 3, 5, 10 },
        { 7, 8, 10 }
    };

    findMaxProfitJobs(jobs);

    return 0;
}
```

**Output:** The jobs involved in the maximum profit are (1, 4, 30) (5, 9, 50)

##

```java
import java.util.*;

// A class to store a Job
class Job
{
    int start, finish, profit;

    Job(int start, int finish, int profit)
    {
        this.start = start;
        this.finish = finish;
        this.profit = profit;
    }

    @Override
    public String toString()
    {
        return "(" + this.start + ", " + this.finish + ", "
                + this.profit + ") ";
    }
}

class Main
{
    // Function to print the non-overlapping jobs involved in maximum profit
    // using the LIS algorithm
    public static void findMaxProfitJobs(List<Job> jobs)
    {
        // sort the jobs according to increasing order of their start time
        Collections.sort(jobs, Comparator.comparingInt(x -> x.start));

        // get the number of jobs
        int n = jobs.size();

        // base case
        if (n == 0) {
            return;
        }

        // `tasks[i]` stores the index of non-conflicting jobs involved in the
        // maximum profit, which ends with the i'th job
        List<List<Integer>> tasks = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            tasks.add(new ArrayList<>());
        }

        // `maxProfit[i]` stores the total profit of jobs in `tasks[i]`
        int[] maxProfit = new int[n];

        // consider every job
        for (int i = 0; i < n; i++)
        {
            // consider each `j` less than `i`
            for (int j = 0; j < i; j++)
            {
                // update i'th job if the j'th job is non-conflicting and leading to
                // the maximum profit
                if (jobs.get(j).finish <= jobs.get(i).start &&
                        maxProfit[i] < maxProfit[j])
                {
                    tasks.set(i, new ArrayList<>(tasks.get(j)));
                    maxProfit[i] = maxProfit[j];
                }
            }

            // end current task with i'th job
            tasks.get(i).add(i);
            maxProfit[i] += jobs.get(i).profit;
        }

        // find an index with the maximum profit
        int index = 0;
        for (int i = 1; i < n; i++)
        {
            if (maxProfit[i] > maxProfit[index]) {
                index = i;
            }
        }

        System.out.print("The jobs involved in the maximum profit are ");
        for (Integer i: tasks.get(index)) {
            System.out.print(jobs.get(i));
        }
    }

    public static void main(String[] args)
    {
        List<Job> jobs = Arrays.asList(
                new Job(0, 6, 60),
                new Job(5, 9, 50),
                new Job(1, 4, 30),
                new Job(5, 7, 30),
                new Job(3, 5, 10),
                new Job(7, 8, 10)
        );

        findMaxProfitJobs(jobs);
    }
}
```

##

```python3
# A class to store a Job
class Job:
    def __init__(self, start, finish, profit):
        self.start = start
        self.finish = finish
        self.profit = profit

    def __repr__(self):
        return str((self.start, self.finish, self.profit))

# Function to print the non-overlapping jobs involved in maximum profit
# using the LIS algorithm
def findMaxProfitJobs(jobs):

    # base case
    if not jobs:
        return 0

    # sort the jobs according to increasing order of their start time
    jobs.sort(key=lambda x: x.start)

    # get the number of jobs
    n = len(jobs)

    # `tasks[i]` stores the index of non-conflicting jobs involved in the
    # maximum profit, which ends with the i'th job
    tasks = [[] for _ in range(n)]

    # `maxProfit[i]` stores the total profit of jobs in `tasks[i]`
    maxProfit = [0] * n

    # consider every job
    for i in range(n):
        # consider each `j` less than `i`
        for j in range(i):
            # update i'th job if the j'th job is non-conflicting and leading to the
            # maximum profit
            if jobs[j].finish <= jobs[i].start and maxProfit[i] < maxProfit[j]:
                tasks[i] = tasks[j].copy()
                maxProfit[i] = maxProfit[j]

        # end current task with i'th job
        tasks[i].append(i)
        maxProfit[i] += jobs[i].profit

    # find an index with the maximum profit
    index = 0
    for i in range(1, n):
        if maxProfit[i] > maxProfit[index]:
            index = i

    print('The jobs involved in the maximum profit are ', end='')
    for i in tasks[index]:
        print(jobs[i], end=' ')

if __name__ == '__main__':

    jobs = [
        Job(0, 6, 60),
        Job(5, 9, 50),
        Job(1, 4, 30),
        Job(5, 7, 30),
        Job(3, 5, 10),
        Job(7, 8, 10)
    ]

    findMaxProfitJobs(jobs)
```

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the total number of jobs.
