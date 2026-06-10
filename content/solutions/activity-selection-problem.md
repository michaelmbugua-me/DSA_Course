# Activity Selection Problem

> Source: https://www.techiedelight.com/activity-selection-problem/

Activity Selection Problem: Given a set of activities, along with the starting and finishing time of each activity, find the maximum number of activities performed by a single person assuming that a person can only work on a single activity at a time.

For example,

**Input:** Following set of activities (1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9), (6, 10), (8, 11), (8, 12), (2, 13), (12, 14) **Output:** (1, 4), (5, 7), (8, 11), (12, 14)

> 

The activity selection problem is a problem concerning selecting non-conflicting activities to perform within a given time frame, given a set of activities each marked by a start and finish time. A classic application of this problem is scheduling a room for multiple competing events, each having its time requirements (start and end time).

Let’s assume there exist `n` activities each being represented by a start time si and finish time `fj`. Two activities `i` and `j` are said to be non-conflicting if `si = fj` or `sj = fi`.

We can solve this problem by being greedy. Using a [greedy approach](https://techiedelight.com/greedy-algorithm-problems/) will always result in an optimal solution to this problem. The idea is to initially [sort the activities](https://techiedelight.com/sort-vector-custom-objects-cpp/) in increasing order of their finish times and create a set `S` to store the selected activities and initialize it with the first activity. Then from the second activity onward, include the activity in the activities list if the activity’s start time is greater or equal to the finish time of the last selected activity. Repeat this for each activity involved.

Following is the implementation of the above algorithm in TypeScript:

```ts
// Activity selection problem
function selectActivity(activities: [number, number][]): Set<number> {

    // `k` keeps track of the index of the last selected activity
    let k = 0;

    // set to store the selected activities index
    const out = new Set<number>();

    // select 0 as the first activity
    if (activities.length) {
        out.add(0);
    }

    // sort the activities according to their finishing time
    activities.sort((x, y) => x[1] - y[1]);

    // start iterating from the second element of the
    // list up to its last element
    for (let i = 1; i < activities.length; i++) {

        // if the start time of the i'th activity is greater or equal
        // to the finish time of the last selected activity, it
        // can be included in the activities list

        if (activities[i][0] >= activities[k][1]) {
            out.add(i);
            k = i;            // update `i` as the last selected activity
        }
    }

    return out;
}

// List of given activities. Each activity has an identifier, a deadline, and a
// profit associated with it
const activities: [number, number][] = [[1, 4], [3, 5], [0, 6], [5, 7], [3, 8], [5, 9],
            [6, 10], [8, 11], [8, 12], [2, 13], [12, 14]];

const result = selectActivity(activities);
console.log([...result].map(i => `(${activities[i][0]}, ${activities[i][1]})`));
```

**Output:** {1, 4} {5, 7} {8, 11} {12, 14}

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
