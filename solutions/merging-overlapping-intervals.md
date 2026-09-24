# Merging Overlapping Intervals

> Source: https://www.techiedelight.com/merging-overlapping-intervals/

Given a set of intervals, print all non-overlapping intervals after merging the overlapping intervals.

For example,

**Input:** {1, 5}, {2, 3}, {4, 6}, {7, 8}, {8, 10}, {12, 15} **Output:** Intervals after merging overlapping intervals are {1, 6}, {7, 10}, {12, 15}.

> 

The idea is to [sort the intervals](https://techiedelight.com/sort-vector-cpp/) in increasing order of their starting time. Then create an empty stack and for each interval,

  * If the [stack](https://techiedelight.com/stack-implementation/) is empty or the top interval in the stack does not overlap with the current interval, push it into the stack.
  * If the top interval of the stack overlaps with the current interval, merge both intervals by updating the end of the top interval at the ending of the current interval.

Finally, print all non-overlapping intervals present in the stack. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

// Data structure to represent an interval
struct Interval
{
    int begin, end;

    bool operator<(Interval const &i) {
        return (begin < i.begin);
    }
};

// Function to merge overlapping intervals
void mergeIntervals(vector<Interval> intervals)        // no-ref, no-const
{
    // sort the intervals in increasing order of their starting time
    sort(intervals.begin(), intervals.end());

    // create an empty stack
    stack<Interval> s;

    // do for each interval
    for (const Interval &curr: intervals)
    {
        // if the stack is empty or the top interval in the stack does not overlap
        // with the current interval, push it into the stack
        if (s.empty() || curr.begin > s.top().end) {
            s.push(curr);
        }

        // if the top interval of the stack overlaps with the current interval,
        // merge two intervals by updating the end of the top interval
        // to the current interval
        if (s.top().end < curr.end) {
            s.top().end = curr.end;
        }
    }

    // print all non-overlapping intervals
    while (!s.empty())
    {
        cout << '{' << s.top().begin << ", " << s.top().end << "}\n";
        s.pop();
    }
}

int main()
{
    vector<Interval> intervals = { { 1, 5 }, { 2, 3 }, { 4, 6 }, { 7, 8 },
                            { 8, 10 }, {12, 15} };

    mergeIntervals(intervals);

    return 0;
}
```

**Output:** {12, 15} {7, 10} {1, 6}

##

```java
import java.util.*;

// A class to represent an interval
class Interval
{
    int begin, end;

    Interval(int begin, int end)
    {
        this.begin = begin;
        this.end = end;
    }

    @Override
    public String toString() {
        return "{" + begin + ", " + end + "}";
    }
}

class Main
{
    // Function to merge overlapping intervals
    public static void mergeIntervals(List<Interval> intervals)
    {
        // sort the intervals in increasing order of their starting time
        Collections.sort(intervals, Comparator.comparingInt(a -> a.begin));

        // create an empty stack
        Stack<Interval> stack = new Stack<>();

        // do for each interval
        for (Interval curr: intervals)
        {
            // if the stack is empty or the top interval in the stack does not overlap
            // with the current interval, push it into the stack
            if (stack.empty() || curr.begin > stack.peek().end) {
                stack.push(curr);
            }

            // if the top interval of the stack overlaps with the current interval,
            // merge two intervals by updating the end of the top interval
            // to the current interval
            if (stack.peek().end < curr.end) {
                stack.peek().end = curr.end;
            }
        }

        // print all non-overlapping intervals
        while (!stack.empty()) {
            System.out.println(stack.pop());
        }
    }

    public static void main(String[] args)
    {
        List<Interval> intervals = Arrays.asList(
                new Interval(1, 5), new Interval(2, 3),
                new Interval(4, 6), new Interval(7, 8),
                new Interval(8, 10), new Interval(12, 15)
        );

        mergeIntervals(intervals);
    }
}
```

##

```python3
from collections import deque

# A class to represent an interval
class Interval:
    def __init__(self, begin, end):
        self.begin = begin
        self.end = end

    def __repr__(self):
        return str((self.begin, self.end))

# Function to merge overlapping intervals
def mergeIntervals(intervals):

    # sort the intervals in increasing order of their starting time
    intervals.sort(key=lambda x: x.begin)

    # create an empty stack
    stack = deque()

    # do for each interval
    for curr in intervals:

        # if the stack is empty or the top interval in the stack does not overlap
        # with the current interval, push it into the stack
        if not stack or curr.begin > stack[-1].end:
            stack.append(curr)

        # if the top interval of the stack overlaps with the current interval,
        # merge two intervals by updating the end of the top interval
        # to the current interval
        if stack[-1].end < curr.end:
            stack[-1].end = curr.end

    # print all non-overlapping intervals
    while stack:
        print(stack.pop())

if __name__ == '__main__':

    intervals = [Interval(1, 5), Interval(2, 3), Interval(4, 6),
                Interval(7, 8), Interval(8, 10), Interval(12, 15)]

    mergeIntervals(intervals)
```

The time complexity of the above solution O(n.log(n)) and requires O(n) extra space, where `n` is the total number of given intervals.

Also See:

> [Insert an interval by merging overlapping intervals](https://www.techiedelight.com/insert-interval-by-merging-overlapping-intervals/ "Insert an interval by merging overlapping intervals")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 182

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
