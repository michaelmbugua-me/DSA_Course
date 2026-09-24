# Activity Selection Problem

> Source: https://www.techiedelight.com/activity-selection-problem/

Activity Selection Problem: Given a set of activities, along with the starting and finishing time of each activity, find the maximum number of activities performed by a single person assuming that a person can only work on a single activity at a time.

For example,

**Input:** Following set of activities (1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9), (6, 10), (8, 11), (8, 12), (2, 13), (12, 14) **Output:** (1, 4), (5, 7), (8, 11), (12, 14)

> 

The activity selection problem is a problem concerning selecting non-conflicting activities to perform within a given time frame, given a set of activities each marked by a start and finish time. A classic application of this problem is scheduling a room for multiple competing events, each having its time requirements (start and end time).

Let’s assume there exist `n` activities each being represented by a start time si and finish time `fj`. Two activities `i` and `j` are said to be non-conflicting if `si = fj` or `sj = fi`.

We can solve this problem by being greedy. Using a [greedy approach](https://techiedelight.com/greedy-algorithm-problems/) will always result in an optimal solution to this problem. The idea is to initially [sort the activities](https://techiedelight.com/sort-vector-custom-objects-cpp/) in increasing order of their finish times and create a set `S` to store the selected activities and initialize it with the first activity. Then from the second activity onward, include the activity in the activities list if the activity’s start time is greater or equal to the finish time of the last selected activity. Repeat this for each activity involved.

Following is the implementation of the above algorithm in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_set>
using namespace std;

struct Pair
{
    // stores start and finish time of the activities
    int start, finish;
};

// Activity selection problem
void selectActivity(vector<Pair> activities)        // no-ref, no-const
{
    // `k` keeps track of the index of the last selected activity
    int k = 0;

    // set to store the selected activities index
    unordered_set<int> out;

    // select 0 as the first activity
    if (activities.size() > 0) {
        out.insert(0);
    }

    // sort the activities according to their finishing time
    sort(activities.begin(), activities.end(),
        [](auto const &lhs, auto const &rhs) {
            return lhs.finish < rhs.finish;
        });

    // start iterating from the second element of the
    // vector up to its last element
    for (int i = 1; i < activities.size(); i++)
    {
        // if the start time of the i'th activity is greater or equal
        // to the finish time of the last selected activity, it
        // can be included in the activities list

        if (activities[i].start >= activities[k].finish)
        {
            out.insert(i);
            k = i;            // update `i` as the last selected activity
        }
    }

    for (int i: out)
    {
        cout << "{" << activities[i].start << ", " << activities[i].finish
             << "}" << endl;
    }
}

int main()
{
    // List of pairs with each pair storing start time
    // and finish time of the activities
    vector<Pair> activities =
    {
        {1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 8}, {5, 9},
        {6, 10}, {8, 11}, {8, 12}, {2, 13}, {12, 14}
    };

    selectActivity(activities);

    return 0;
}
```

**Output:** {1, 4} {5, 7} {8, 11} {12, 14}

##

```java
import java.util.*;
import java.util.stream.Collectors;

// A simple pair class to store the start and finish time
// of the activities
class Pair
{
    private int start, finish;

    public Pair(int start, int finish)
    {
        this.start = start;
        this.finish = finish;
    }

    public int getFinish() {
        return finish;
    }

    public int getStart() {
        return start;
    }

    @Override
    public String toString() {
        return "(" + getStart() + ", " + getFinish() + ")";
    }
}

class Main
{
    // Activity selection problem
    public static List<Pair> selectActivity(List<Pair> activities)
    {
        // `k` keeps track of the index of the last selected activity
        int k = 0;

        // set to store the selected activities index
        Set<Integer> result = new HashSet<>();

        // select 0 as the first activity
        if (activities.size() > 0) {
            result.add(0);
        }

        // sort the activities according to their finishing time
        Collections.sort(activities, Comparator.comparingInt(Pair::getFinish));

        // start iterating from the second element of the
        // list up to its last element
        for (int i = 1; i < activities.size(); i++)
        {
            // if the start time of the i'th activity is greater or equal
            // to the finish time of the last selected activity, it
            // can be included in the activities list

            if (activities.get(i).getStart() >= activities.get(k).getFinish())
            {
                result.add(i);
                k = i;            // update `i` as the last selected activity
            }
        }

        return result.stream()
                .map(activities::get)
                .collect(Collectors.toList());
    }

    public static void main(String[] args)
    {
        // List of given activities. Each activity has an identifier, a deadline, and a
        // profit associated with it
        List<Pair> activities = Arrays.asList(new Pair(1, 4), new Pair(3, 5),
                new Pair(0, 6), new Pair(5, 7), new Pair(3, 8),
                new Pair(5, 9), new Pair(6, 10), new Pair(8, 11),
                new Pair(8, 12), new Pair(2, 13), new Pair(12, 14));

        List<Pair> result = selectActivity(activities);
        System.out.println(result);
    }
}
```

##

```python3
# Activity selection problem
def selectActivity(activities):

    # `k` keeps track of the index of the last selected activity
    k = 0

    # set to store the selected activities index
    out = set()

    # select 0 as the first activity
    if len(activities):
        out.add(0)

    # sort the activities according to their finishing time
    activities.sort(key=lambda x: x[1])

    # start iterating from the second element of the
    # list up to its last element
    for i in range(1, len(activities)):

        # if the start time of the i'th activity is greater or equal
        # to the finish time of the last selected activity, it
        # can be included in the activities list

        if activities[i][0] >= activities[k][1]:
            out.add(i)
            k = i            # update `i` as the last selected activity

    return out

if __name__ == '__main__':

    # List of given activities. Each activity has an identifier, a deadline, and a
    # profit associated with it
    activities = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9),
                (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)]

    result = selectActivity(activities)
    print([activities[i] for i in result])
```

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of activities. The auxiliary space required by the program is constant.

Weighted Activity Selection Problem:

Weighted activity selection is a generalized version of the activity selection problem that involves selecting an optimal set of non-overlapping activities to maximize the total weight. Unlike the unweighted version, there is no greedy solution to the weighted activity selection problem.

References:

<https://en.wikipedia.org/wiki/Activity_selection_problem>

<http://www.personal.kent.edu/~rmuhamma/Algorithms/MyAlgorithms/Greedy/actSelectionGreedy.htm>

**Also See:**

> [Activity Selection Problem using Dynamic Programming](https://techiedelight.com/activity-selection-problem-using-dynamic-programming/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Easy](https://www.techiedelight.com/Tags/easy/), [Greedy](https://www.techiedelight.com/Tags/Greedy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
