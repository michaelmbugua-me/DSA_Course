# Activity Selection Problem using Dynamic Programming

> Source: https://www.techiedelight.com/activity-selection-problem-using-dynamic-programming/

Given a set of activities and the starting and finishing time of each activity, find the maximum number of activities that can be performed by a single person assuming that a person can only work on a single activity at a time.

This problem is called the activity selection problem, which concerns the selection of non-conflicting activities to perform within a given time frame, given a set of activities each marked by a start and finish time.

For example,

**Input:** {1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 8}, {5, 9}, {6, 10}, {8, 11}, {8, 12}, {2, 13}, {12, 14} **Output:** {1, 4}, {5, 7}, {8, 11}, {12, 14}

> 

In the [previous post](https://techiedelight.com/activity-selection-problem/), we have discussed a [greedy approach](https://techiedelight.com/greedy-algorithm-problems/) for activity selection problem. This post will discuss a [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution for the activity selection problem, which is nothing but a variation of the [Longest Increasing Subsequence (LIS)](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/) problem.

The idea is first to sort given activities in increasing order of their start time. Let `activities[0…n-1]` be the sorted array of activities. We can define an array `L` such that `L[i]` itself is an array that stores maximum non-conflicting activities ending at `i'th` activity. Therefore, `L[i]` can be recursively written as:

L[i] = activities[i] + { max(L[j]), where j < i and activities[j].end < activities[i].start } = activities[i], if there is no such j

For example, consider the following sorted activities:

{0, 6} {1, 4} {2, 13} {3, 5} {3, 8} {5, 7} {5, 9} {6, 10} {8, 11} {8, 12} {12, 14}

Then `L[]` would be:

L[0]: {0, 6} L[1]: {1, 4} L[2]: {2, 13} L[3]: {3, 5} L[4]: {3, 8} L[5]: {1, 4} {5, 7} L[6]: {1, 4} {5, 9} L[7]: {1, 4} {6, 10} L[8]: {1, 4} {5, 7} {8, 11} L[9]: {1, 4} {5, 7} {8, 12} L[10]: {1, 4} {5, 7} {8, 11} {12, 14}

1\. Count the maximum number of non-conflicting activities:

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

// Data structure to store the start and finish time of the activities.
struct Activity
{
    int start;
    int finish;
};

// Returns the maximum count of non-conflicting activities that can be performed
// by a single person
int findNonConflictingActivitiesLength(vector<Activity> activities)        // no-ref, no-const
{
    // sort the activities according to increasing order of their start time
    sort(activities.begin(), activities.end(),
        [](Activity &x, Activity &y) {
            return x.start < y.start;
        });

    // L[i] stores the maximum count of non-conflicting activities ending at i'th activity
    vector<int> L(activities.size());

    for (int i = 0; i < activities.size(); i++)
    {
        // consider each `j` less than `i`
        for (int j = 0; j < i; j++)
        {
            // L[i] = max(L[j]), where `activities[j].finish` is less than `activities[i].start`
            if (activities[j].finish < activities[i].start && L[i] < L[j]) {
                L[i] = L[j];
            }
        }

        // increment L[i] since it ends at the i'th activity
        L[i]++;
    }

    // return the maximum activity length in the vector
    return *max_element(L.begin(), L.end());
}

int main()
{
    // Each pair stores the start and the finish time of a activity
    vector<Activity> activities =
    {
        {1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 8}, {5, 9},
        {6, 10}, {8, 11}, {8, 12}, {2, 13}, {12, 14}
    };

    cout << "The maximum number of non-conflicting activities is "
         << findNonConflictingActivitiesLength(activities);

    return 0;
}
```

**Output:** The maximum number of non-conflicting activities is 4

##

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

// A class to store the start and finish time of the activities.
class Activity
{
    public final int start;     // start field of a activity
    public final int finish;    // finish field of a activity

    // Constructs a new Activity with specified values
    private Activity(int start, int finish)
    {
        this.start = start;
        this.finish = finish;
    }

    // Factory method for creating a Activity immutable instance
    public static Activity of(int a, int b)
    {
        // calls private constructor
        return new Activity(a, b);
    }
}

class Main
{
    // Returns the maximum count of non-conflicting activities that can be performed
    // by a single person
    public static int findNonConflictingActivitiesLength(List<Activity> activities)
    {
        // Sort the activities according to increasing order of their start time
        Collections.sort(activities, Comparator.comparingInt(activity -> activity.start));

        // L[i] stores the maximum count of non-conflicting activities ending at i'th activity
        int[] L = new int[activities.size()];

        for (int i = 0; i < activities.size(); i++)
        {
            // consider each `j` less than `i`
            for (int j = 0; j < i; j++)
            {
                // L[i] = Math.max(L[j]), where `activities[j].finish` is less than
                // `activities[i].start`
                if (activities.get(j).finish < activities.get(i).start && L[i] < L[j]) {
                    L[i] = L[j];
                }
            }

            // increment L[i] since it ends at the i'th activity
            L[i]++;
        }

        // return the maximum activity length in the list
        return Arrays.stream(L).max().getAsInt();
    }

    public static void main(String[] args)
    {
        // Each pair stores the start and the finish time of a activity
        List<Activity> activities = Arrays.asList(
                Activity.of(1, 4), Activity.of(3, 5), Activity.of(0, 6),
                Activity.of(5, 7), Activity.of(3, 8), Activity.of(5, 9),
                Activity.of(6, 10), Activity.of(8, 11), Activity.of(8, 12),
                Activity.of(2, 13), Activity.of(12, 14)
        );

        System.out.println("The maximum number of non-conflicting activities is "
                + findNonConflictingActivitiesLength(activities));
    }
}
```

##

```python3
# Returns the maximum count of non-conflicting activities that can be performed
# by a single person
def findNonConflictingActivitiesLength(activities):

    # Sort the activities according to increasing order of their start time
    activities.sort(key=lambda x: x[0])

    # L[i] stores the maximum count of non-conflicting activities ending at i'th activity
    L = [0] * len(activities)

    for i in range(len(activities)):
        # consider each `j` less than `i`
        for j in range(i):
            # L[i] = max(L[j]), where `activities[j].finish` is less than `activities[i].start`
            if activities[j][1] < activities[i][0] and L[i] < L[j]:
                L[i] = L[j]

        # increment L[i] since it ends at the i'th activity
        L[i] = L[i] + 1

    # return the maximum activity length in the list
    return max(L)

if __name__ == '__main__':

    # Each pair stores the start and the finish time of a activity
    activities = [
        (1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9),
        (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)
    ]

    print('The maximum number of non-conflicting activities is',
        findNonConflictingActivitiesLength(activities))
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the total number of given activities.

2\. Print the maximum number of non-conflicting activities:

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

// Data structure to store the start and finish time of the activities.
struct Activity
{
    int start;
    int finish;
};

// Find the maximum number of non-conflicting activities that can be performed
// by a single person
void findNonConflictingActivities(vector<Activity> activities)        // no-ref, no-const
{
    // sort the activities according to increasing order of their start time
    sort(activities.begin(), activities.end(),
        [](Activity &x, Activity &y) {
            return x.start < y.start;
        });

    // `L[i]` stores the maximum non-conflicting activities that end at i'th activity
    vector<vector<Activity>> L(activities.size());

    for (int i = 0; i < activities.size(); i++)
    {
        // consider each `j` less than `i`
        for (int j = 0; j < i; j++)
        {
            // L[i] = max(L[j]), where `activities[j].finish` is less than `activities[i].start`
            if (activities[j].finish < activities[i].start &&
                L[i].size() < L[j].size()) {
                L[i] = L[j];
            }
        }

        // `L[i]` ends at i'th activity
        L[i].push_back(activities[i]);
    }

    // find the vector having the maximum size
    vector<Activity> max;
    for (auto &pair: L)
    {
        if (max.size() < pair.size()) {
            max = pair;
        }
    }

    // print maximum non-conflicting activities
    for (Activity &pair: max) {
        cout << "{" << pair.start << ", " << pair.finish << "} ";
    }
}

int main()
{
    // Each pair stores the start and the finish time of a activity
    vector<Activity> activities =
    {
        {1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 8}, {5, 9},
        {6, 10}, {8, 11}, {8, 12}, {2, 13}, {12, 14}
    };

    findNonConflictingActivities(activities);

    return 0;
}
```

**Output:** {1, 4} {5, 7} {8, 11} {12, 14}

##

```java
import java.util.*;

// A class to store the start and finish time of the activities.
class Activity
{
    public int start, finish;

    Activity(int start, int finish)
    {
        this.start = start;
        this.finish = finish;
    }

    @Override
    public String toString() {
        return "(" + this.start + ", " + this.finish + ")";
    }
}

class Main
{
    // Find the maximum number of non-conflicting activities that can be performed
    // by a single person
    public static void findNonConflictingActivities(List<Activity> activities)
    {
        // sort the activities according to increasing order of their start time
        Collections.sort(activities, Comparator.comparingInt(x -> x.start));

        // `L[i]` stores the maximum non-conflicting activities that end at i'th activity
        List<List<Activity>> L = new ArrayList<>();
        for (var activity: activities) {
            L.add(new ArrayList<>());
        }

        for (int i = 0; i < activities.size(); i++)
        {
            // consider each `j` less than `i`
            for (int j = 0; j < i; j++)
            {
                // L[i] = Math.max(L[j]), where `activities[j].finish` is less than
                // `activities[i].start`
                if (activities.get(j).finish < activities.get(i).start &&
                        L.get(i).size() < L.get(j).size()) {
                    L.set(i, new ArrayList<>(L.get(j)));
                }
            }

            // `L[i]` ends at i'th activity
            L.get(i).add(activities.get(i));
        }

        // find the list having a maximum size
        List<Activity> max = L.stream().max(Comparator.comparingInt(x -> x.size())).get();

        // print maximum non-conflicting activities
        System.out.print(max);
    }

    public static void main(String[] args)
    {
        // Each pair stores the start and the finish time of a activity
        List<Activity> activities = Arrays.asList(new Activity(1, 4), new Activity(3, 5),
                new Activity(0, 6), new Activity(5, 7),
                new Activity(3, 8), new Activity(5, 9),
                new Activity(6, 10), new Activity(8, 11),
                new Activity(8, 12), new Activity(2, 13),
                new Activity(12, 14));

        findNonConflictingActivities(activities);
    }
}
```

##

```python3
# Find the maximum number of non-conflicting activities that can be performed
# by a single person
def findNonConflictingActivities(activities):

    # sort the activities according to increasing order of their start time
    activities.sort(key=lambda x: x[0])

    # `L[i]` stores the maximum non-conflicting activities that end at i'th activity
    L = [[] for _ in range(len(activities))]

    for i in range(len(activities)):
        # consider each `j` less than `i`
        for j in range(i):
            # L[i] = max(L[j]), where `activities[j].finish` is less than `activities[i].start`
            start, finish = (activities[i][0], activities[j][1])
            if finish < start and len(L[i]) < len(L[j]):
                L[i] = L[j].copy()

        # `L[i]` ends at i'th activity
        L[i].append(activities[i])

    # find the list having a maximum size
    max = []
    for pair in L:
        if len(max) < len(pair):
            max = pair

    # print maximum non-conflicting activities
    print(max)

if __name__ == '__main__':

    # Each pair stores the start and the finish time of a activity
    activities = [(1, 4), (3, 5), (0, 6), (5, 7),
            (3, 8), (5, 9), (6, 10), (8, 11),
            (8, 12), (2, 13), (12, 14)]

    findNonConflictingActivities(activities)
```

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the total number of given activities.
