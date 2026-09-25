# Merging Overlapping Intervals

> Source: https://www.techiedelight.com/merging-overlapping-intervals/

Given a set of intervals, print all non-overlapping intervals after merging the overlapping intervals.

For example,

**Input:** {1, 5}, {2, 3}, {4, 6}, {7, 8}, {8, 10}, {12, 15} **Output:** Intervals after merging overlapping intervals are {1, 6}, {7, 10}, {12, 15}.

> 

The idea is to [sort the intervals](https://techiedelight.com/sort-vector-cpp/) in increasing order of their starting time. Then create an empty stack and for each interval,

  * If the [stack](https://techiedelight.com/stack-implementation/) is empty or the top interval in the stack does not overlap with the current interval, push it into the stack.
  * If the top interval of the stack overlaps with the current interval, merge both intervals by updating the end of the top interval at the ending of the current interval.

Finally, print all non-overlapping intervals present in the stack. The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent an interval
class Interval {
    begin: number;
    end: number;
    constructor(begin: number, end: number) {
        this.begin = begin;
        this.end = end;
    }
}

// Function to merge overlapping intervals
function mergeIntervals(intervals: Interval[]): void {

    // sort the intervals in increasing order of their starting time
    intervals.sort((a, b) => a.begin - b.begin);

    // create an empty stack
    const stack: Interval[] = [];

    // do for each interval
    for (const curr of intervals) {

        // if the stack is empty or the top interval in the stack does not overlap
        // with the current interval, push it into the stack
        if (!stack.length || curr.begin > stack[stack.length - 1].end) {
            stack.push(curr);
        }

        // if the top interval of the stack overlaps with the current interval,
        // merge two intervals by updating the end of the top interval
        // to the current interval
        if (stack[stack.length - 1].end < curr.end) {
            stack[stack.length - 1].end = curr.end;
        }
    }

    // print all non-overlapping intervals
    while (stack.length) {
        const top = stack.pop();
        if (top === undefined) {
            break;
        }
        console.log(`{${top.begin}, ${top.end}}`);
    }
}

const intervals = [new Interval(1, 5), new Interval(2, 3), new Interval(4, 6),
               new Interval(7, 8), new Interval(8, 10), new Interval(12, 15)];

mergeIntervals(intervals);
```

**Output:** {12, 15} {7, 10} {1, 6}

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
