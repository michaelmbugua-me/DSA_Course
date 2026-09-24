# Job Sequencing Problem with Deadlines

> Source: https://www.techiedelight.com/job-sequencing-problem-deadlines/

Given a list of tasks with deadlines and total profit earned on completing a task, find the maximum profit earned by executing the tasks within the specified deadlines. Assume that each task takes one unit of time to complete, and a task can’t execute beyond its deadline. Also, only a single task will be executed at a time.

For example, consider the following set of tasks with a deadline and the profit associated with it. If we choose tasks 1, 3, 4, 5, 6, 7, 8, and 9, we can achieve a maximum profit of 109. Note that task 2 and task 10 are left out.

Tasks Deadlines Profit 1 9 15 2 2 2 3 5 18 4 7 1 5 4 25 6 2 20 7 5 8 8 7 10 9 4 12 10 3 5

> 

We can easily solve this problem by following a [Greedy approach](https://techiedelight.com/greedy-algorithm-problems/). The idea is simple – consider each task decreasing order of their profits and schedule it in the latest possible free slot that meets its deadline. If no such slot is there, don’t schedule the task.

The following table shows the tasks arranged based on their associated profits. Here, task 5 has a maximum priority associated with it as it has a maximum gain of 30. Similarly, task 4 has the least priority. The greedy approach will consider the tasks in decreasing order of their priority.

Tasks Deadlines Profit (Maximum first) 5 4 25 6 2 20 3 5 18 1 9 15 9 4 12 8 7 10 7 5 8 10 3 5 2 2 2 4 7 1

To demonstrate the greedy approach, let’s consider the deadlines in the form of a circular structure, as shown below. A given task can fill each slot. Now, let’s start allocated the tasks based on the deadlines. We will start with task 5, having a deadline of 4, and fill it empty slot `3–4`.

Next, consider task 6 having deadline 2 and fill it empty slot `1–2`.

Next, consider task 3 having deadline 5 and fill it empty slot `4–5`.

Next, consider task 1 having deadline 9 and fill it empty slot `8–9`.

Next, consider task 9 having deadline 4. As slot `3–4` is already filled with task 5, we will consider the next free slot `2–3` and assign task 9.

Next, consider task 8 having deadline 7 and fill it empty slot `6–7`.

Next, consider task 7 having a deadline of 5. As slot `4–5` is already filled with task 3, we will consider the next free slot `0–1` and assign task 7.

Next, consider task 10 having a deadline of 3. Since all slots before deadline 3 are filled, ignore the task. Similarly, ignore the next task 2 having deadline 2.

The last task is task 4, having deadline 7, gets the next empty slot `6–5`.

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Stores the maximum deadline that can be associated with a job
#define T 15

// Data structure to store job details. Each job has an identifier,
// a deadline, and profit associated with it.
struct Job {
    int taskId, deadline, profit;
};

// Function to schedule jobs to maximize profit
void scheduleJobs(vector<Job> jobs)        // no-ref, no-const
{
    // stores the maximum profit that can be earned by scheduling jobs
    int profit = 0;

    // array to store used and unused slots info
    vector<int> slot(T, -1);

    // arrange the jobs in decreasing order of their profits
    sort(jobs.begin(), jobs.end(),
        [](Job &a, Job &b) {
            return a.profit > b.profit;    // using C++11 lambda comparison
        });

    // consider each job in decreasing order of their profits
    for (const Job &job: jobs)
    {
        // search for the next free slot and map the task to that slot
        for (int j = job.deadline - 1; j >= 0; j--)
        {
            if (j < T && slot[j] == -1)
            {
                slot[j] = job.taskId;
                profit += job.profit;
                break;
            }
        }
    }

    // print the scheduled jobs
    cout << "The scheduled jobs are ";
    for (int i = 0; i < T; i++)
    {
        if (slot[i] != -1) {
            cout << slot[i] << " ";
        }
    }

    // print the total profit that can be earned
    cout << "\nThe total profit earned is " << profit;
}

int main()
{
    // vector of given jobs. Each job has an identifier, a deadline, and
    // profit associated with it
    vector<Job> jobs =
    {
        {1, 9, 15}, {2, 2, 2}, {3, 5, 18}, {4, 7, 1}, {5, 4, 25},
        {6, 2, 20}, {7, 5, 8}, {8, 7, 10}, {9, 4, 12}, {10, 3, 5}
    };

    // schedule jobs and calculate the maximum profit
    scheduleJobs(jobs);

    return 0;
}
```

**Output:** The scheduled jobs are 7 6 9 5 3 4 8 1 The total profit earned is 109

##

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

// Data structure to store job details. Each job has an identifier,
// a deadline, and profit associated with it.
class Job
{
    public int taskId, deadline, profit;

    public Job(int taskId, int deadline, int profit)
    {
        this.taskId = taskId;
        this.deadline = deadline;
        this.profit = profit;
    }
}

class Main
{
    // Function to schedule jobs to maximize profit
    public static void scheduleJobs(List<Job> jobs, int T)
    {
        // stores the maximum profit that can be earned by scheduling jobs
        int profit = 0;

        // array to store used and unused slots info
        int[] slot = new int[T];
        Arrays.fill(slot, -1);

        // arrange the jobs in decreasing order of their profits
        Collections.sort(jobs, (a, b) -> b.profit - a.profit);

        // consider each job in decreasing order of their profits
        for (Job job: jobs)
        {
            // search for the next free slot and map the task to that slot
            for (int j = job.deadline - 1; j >= 0; j--)
            {
                if (j < T && slot[j] == -1)
                {
                    slot[j] = job.taskId;
                    profit += job.profit;
                    break;
                }
            }
        }

        // print the scheduled jobs
        System.out.println("The scheduled jobs are " +
                Arrays.stream(slot).filter(val -> val != -1).boxed()
                        .collect(Collectors.toList()));

        // print total profit that can be earned
        System.out.println("The total profit earned is " + profit);
    }

    public static void main(String[] args)
    {
        // List of given jobs. Each job has an identifier, a deadline, and
        // profit associated with it
        List<Job> jobs = Arrays.asList(
                new Job(1, 9, 15), new Job(2, 2, 2), new Job(3, 5, 18),
                new Job(4, 7, 1), new Job(5, 4, 25), new Job(6, 2, 20),
                new Job(7, 5, 8), new Job(8, 7, 10), new Job(9, 4, 12),
                new Job(10, 3, 5));

        // stores the maximum deadline that can be associated with a job
        final int T = 15;

        // schedule jobs and calculate the maximum profit
        scheduleJobs(jobs, T);
    }
}
```

##

```python3
# A class to store job details. Each job has an identifier,
# a deadline, and profit associated with it.
class Job:
    def __init__(self, taskId, deadline, profit):
        self.taskId = taskId
        self.deadline = deadline
        self.profit = profit

# Function to schedule jobs to maximize profit
def scheduleJobs(jobs, T):

    # stores the maximum profit that can be earned by scheduling jobs
    profit = 0

    # list to store used and unused slots info
    slot = [-1] * T

    # arrange the jobs in decreasing order of their profits
    jobs.sort(key=lambda x: x.profit, reverse=True)

    # consider each job in decreasing order of their profits
    for job in jobs:
        # search for the next free slot and map the task to that slot
        for j in reversed(range(job.deadline)):
            if j < T and slot[j] == -1:
                slot[j] = job.taskId
                profit += job.profit
                break

    # print the scheduled jobs
    print('The scheduled jobs are', list(filter(lambda x: x != -1, slot)))

    # print total profit that can be earned
    print('The total profit earned is', profit)

if __name__ == '__main__':

    # List of given jobs. Each job has an identifier, a deadline, and
    # profit associated with it
    jobs = [
        Job(1, 9, 15), Job(2, 2, 2), Job(3, 5, 18), Job(4, 7, 1), Job(5, 4, 25),
        Job(6, 2, 20), Job(7, 5, 8), Job(8, 7, 10), Job(9, 4, 12), Job(10, 3, 5)
    ]

    # stores the maximum deadline that can be associated with a job
    T = 15

    # schedule jobs and calculate the maximum profit
    scheduleJobs(jobs, T)
```

The time complexity of the above solution is O(n2), where `n` is the total number of jobs.

**Reference:**

[Job Sequencing Problem With Deadlines – YouTube](https://www.youtube.com/watch?v=yHsDLU3ZqNM)

Also See:

> [Weighted Interval Scheduling – Dynamic Programming Solution](https://www.techiedelight.com/weighted-interval-scheduling-problem-using-lis/ "Weighted Interval Scheduling – Dynamic Programming Solution")

> [Weighted Interval Scheduling Problem](https://www.techiedelight.com/weighted-interval-scheduling-problem/ "Weighted Interval Scheduling Problem")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 202

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
