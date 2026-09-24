# Find the smallest range with at least one element from each of the given lists

> Source: https://www.techiedelight.com/find-smallest-range-least-one-element-given-lists/

Given `M` sorted lists of variable length, efficiently compute the smallest range, including at least one element from each list.

For example,

**Input:** 4 sorted lists of variable length [ 3, **6** , 8, 10, 15 ] [ 1, **5** , 12 ] [ **4** , 8, 15, 16 ] [ 2, **6** ] **Output:** The minimum range is 4–6 **Input:** 4 sorted lists of variable length [ 2, 3, **4** , 8, 10, 15 ] [ 1, **5** , 12 ] [ **7** , 8, 15, 16 ] [ 3, **6** ] **Output:** The minimum range is 4–7

> 

We can solve this problem in O(N.log(M)) time using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) where `N` is the total number of elements present in `M` lists. The idea is to construct a min-heap of size `M` and insert the first element of each list into it. Then pop the root element (minimum element) from the heap and insert the next element from the “same” list as the popped element. Repeat this process until any list is exhausted. To find the minimum range, maintain a variable `high` that stores the maximum element present in a heap at any point. Since the minimum element is present in the min-heap at its root, compute the range (high element – root element) and return the minimum range found at every pop operation.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

// Data structure to store a heap node
struct Node
{
    // `value` stores the element,
    // `list_num` stores the list number of the element,
    // `index` stores the column number of the list from which element was taken
    int value, list_num, index;
};

// Comparison object to be used to order the heap
struct comp
{
    bool operator()(const Node &lhs, const Node &rhs) const {
        return lhs.value > rhs.value;
    }
};

// Function to compute the minimum range that includes at least one element
// from each of the given `M` lists
pair<int, int> findMinimumRange(vector<vector<int>> lists)
{
    // invalid input
    if (lists.size() == 0) {
        return {-1, -1};
    }

    int M = lists.size();

    // `high` will be the maximum element in a heap
    int high = INT_MIN;

    // stores minimum and maximum elements found so far in a heap
    pair<int, int> p = { 0, INT_MAX };

    // create an empty min-heap
    priority_queue<Node, vector<Node>, comp> pq;

    // push the first element of each list into the min-heap
    // along with the list number and their index in the list
    for (int i = 0; i < M; i++)
    {
        // invalid input
        if (lists[i].size() == 0) {
            return {-1, -1};
        }

        pq.push({lists[i][0], i, 0});
        high = max(high, lists[i][0]);
    }

    // run till the end of any list is reached
    while (true)
    {
        // get root node information from the min-heap
        int low = pq.top().value;
        int i = pq.top().list_num;
        int j = pq.top().index;

        // remove the root node
        pq.pop();

        // update `low` and `high` if a new minimum is found
        if (high - low < p.second - p.first) {
            p = {low, high};
        }

        // return on reaching the end of any list
        if (j == lists[i].size() - 1) {
            return p;
        }

        // take the next element from the "same" list and
        // insert it into the min-heap
        pq.push({lists[i][j + 1], i, j + 1});

        // update high if the new element is greater
        high = max(high, lists[i][j + 1]);
    }
}

int main()
{
    vector<vector<int>> lists =
    {
        { 3, 6, 8, 10, 15 },
        { 1, 5, 12 },
        { 4, 8, 15, 16},
        { 2, 6 }
    };

    pair<int, int> p = findMinimumRange(lists);
    cout << "The minimum range is (" << p.first << ", " << p.second << ")";

    return 0;
}
```

**Output:** The minimum range is (4, 6)

##

```java
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

// A class to store a heap node
class Node implements Comparable
{
    // `value` stores the element
    private int value;

    // `listNum` stores the list number of the element
    private int listNum;

    // `index` stores the column number of the list from which element was taken
    private int index;

    Node(int value, int listNum, int index)
    {
        this.value = value;
        this.listNum = listNum;
        this.index = index;
    }

    public int getValue() {
        return value;
    }

    public int getListNum() {
        return listNum;
    }

    public int getIndex() {
        return index;
    }

    @Override
    public int compareTo(Object o)
    {
        Node node = (Node)o;
        return value - node.value;
    }
}

// A simple Pair class in Java
class Pair<U, V> {
    private final U first;      // first field of a pair
    private final V second;     // second field of a pair

    Pair(U first, V second)
    {
        this.first = first;
        this.second = second;
    }

    public U getFirst() {
        return first;
    }

    public V getSecond() {
        return second;
    }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ')';
    }
}

class Main
{
    // Function to compute the minimum range that includes at least one element
    // from each of the given `M` lists
    public static Pair<Integer, Integer> findMinimumRange(List<List<Integer>> lists)
    {
        // invalid input
        if (lists == null || lists.size() == 0) {
            return new Pair(-1, -1);
        }

        // `high` will be the maximum element in a heap
        int high = Integer.MIN_VALUE;

        // stores minimum and maximum elements found so far in a heap
        Pair<Integer, Integer> p = new Pair(0, Integer.MAX_VALUE);

        // create an empty min-heap
        PriorityQueue<Node> pq = new PriorityQueue<>();

        // push the first element of each list into the min-heap
        // along with the list number and their index in the list
        for (int i = 0; i < lists.size(); i++)
        {
            // invalid input
            if (lists.get(i) == null || lists.get(i).size() == 0) {
                return new Pair(-1, -1);
            }

            pq.add(new Node(lists.get(i).get(0), i, 0));
            high = Integer.max(high, lists.get(i).get(0));
        }

        // run till the end of any list is reached
        while (true)
        {
            // remove the root node
            Node top = pq.poll();

            // retrieve root node information from the min-heap
            int low = top.getValue();
            int i = top.getListNum();
            int j = top.getIndex();

            // update `low` and `high` if a new minimum is found
            if (high - low < p.getSecond() - p.getFirst()) {
                p = new Pair(low, high);
            }

            // return on reaching the end of any list
            if (j == lists.get(i).size() - 1) {
                return p;
            }

            // take the next element from the "same" list and
            // insert it into the min-heap
            pq.add(new Node(lists.get(i).get(j + 1), i, j + 1));

            // update high if the new element is greater
            high = Integer.max(high, lists.get(i).get(j + 1));
        }
    }

    public static void main(String[] args)
    {
        List<List<Integer>> lists = Arrays.asList(
                Arrays.asList(3, 6, 8, 10, 15),
                Arrays.asList(1, 5, 12),
                Arrays.asList(4, 8, 15, 16),
                Arrays.asList(2, 6)
        );

        System.out.println("The minimum range is " + findMinimumRange(lists));
    }
}
```

##

```python3
import sys
from heapq import heappop, heappush

# A class to store a heap node
class Node:
    def __init__(self, value, list_num, index):
        # `value` stores the element
        self.value = value

        # `list_num` stores the lists number of the element
        self.list_num = list_num

        # `index` stores the column number of the lists from which element was taken
        self.index = index

    # Override the `__lt__()` function to make `Node` class work with min-heap
    def __lt__(self, other):
        return self.value < other.value

# Function to compute the minimum range that includes at least one element
# from each of the given `M` lists
def findMinimumRange(lists):

    # invalid input
    if not lists:
        return -1, -1

    # `high` will be the maximum element in a heap
    high = -sys.maxsize

    # stores minimum and maximum elements found so far in a heap
    p = (0, sys.maxsize)

    # create an empty min-heap
    pq = []

    # push the first element of each lists into the min-heap
    # along with the lists number and their index in the lists
    for i in range(len(lists)):
        if not lists[i]:        # invalid input
            return -1, -1
        heappush(pq, Node(lists[i][0], i, 0))
        high = max(high, lists[i][0])

    # run till the end of any lists is reached
    while True:

        # remove the root node
        top = heappop(pq)

        # retrieve root node information from the min-heap
        low = top.value
        i = top.list_num
        j = top.index

        # update `low` and `high` if a new minimum is found
        if high - low < p[1] - p[0]:
            p = (low, high)

        # return on reaching the end of any lists
        if j == len(lists[i]) - 1:
            return p

        # take the next element from the "same" lists and
        # insert it into the min-heap
        heappush(pq, Node(lists[i][j + 1], i, j + 1))

        # update high if the new element is greater
        high = max(high, lists[i][j + 1])

if __name__ == '__main__':

    lists = [[3, 6, 8, 10, 15], [1, 5, 12], [4, 8, 15, 16], [2, 6]]
    print('The minimum range is', findMinimumRange(lists))
```

The time complexity of the above solution is O(N.log(M)) as the heap has size `M`, and we pop and push at most `N` times, where `N` is the total number of elements present in all lists. Note that each pop/push operation takes O(log(M)) time.

Also See:

> [Merge `M` sorted lists of variable length](https://www.techiedelight.com/merge-m-sorted-lists-variable-length/ "Merge `M` sorted lists of variable length")

> [Merge `M` sorted lists each containing `N` elements](https://www.techiedelight.com/merge-m-sorted-lists-containing-n-elements/ "Merge `M` sorted lists each containing `N` elements")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 189

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
