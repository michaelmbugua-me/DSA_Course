# Merge `M` sorted lists of variable length

> Source: https://www.techiedelight.com/merge-m-sorted-lists-variable-length/

Given `M` sorted lists of variable length, merge them efficiently in sorted order.

For example,

**Input:** 4 sorted lists of variable length [10, 20, 30, 40] [15, 25, 35] [27, 29, 37, 48, 93] [32, 33] **Output:** [10, 15, 20, 25, 27, 29, 30, 32, 33, 35, 37, 40, 48, 93]

> 

A simple solution would be to create an auxiliary array containing all lists’ elements (order doesn’t matter). Then use an efficient sorting algorithm to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and print the elements. The worst-case time complexity of this approach will be O(N.log(N)), where `N` is the total number of elements present in all lists. Also, this approach does not take advantage of the fact that each list is already sorted.

We can easily solve this problem in O(N.log(M)) time by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `M` and insert the first element of each list into it. Then pop the root element (minimum element) from the heap and insert the next element from the “same” list as the popped element. Repeat this process till the heap is exhausted. Depending upon the requirement, either print the popped element or store it in an auxiliary array.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Data structure to store a heap node
struct Node
{
    // `val` stores the element,
    // `i` stores the list number of the element,
    // `index` stores the column number of the list from which element was taken
    int val, i, index;
};

// Comparison object to be used to order the min-heap
struct comp
{
    bool operator()(const Node &lhs, const Node &rhs) const {
        return lhs.val > rhs.val;
    }
};

// Function to merge `M` sorted lists of variable length and
// print them in ascending order
void printSorted(vector<vector<int>> const &lists)
{
    int M = lists.size();

    // create an empty min-heap
    priority_queue<Node, vector<Node>, comp> pq;

    // push the first element of each list into the min-heap
    // along with the list number and their index in the list
    for (int i = 0; i < M; i++)
    {
        if (lists[i].size() >= 1) {
            pq.push({lists[i][0], i, 0});
        }
    }

    // run till min-heap is empty
    while (!pq.empty())
    {
        // extract the minimum node from the min-heap
        Node min = pq.top();
        pq.pop();

        // print the minimum element
        cout << min.val << " ";

        // take the next element from the "same" list and
        // insert it into the min-heap
        if (min.index + 1 < lists[min.i].size())
        {
            min.index += 1;
            min.val = lists[min.i][min.index];
            pq.push(min);
        }
    }
}

int main()
{
    // `M` lists of variable size
    vector<vector<int>> lists =
    {
        { 10, 20, 30, 40 },
        { 15, 25, 35 },
        { 27, 29, 37, 48, 93 },
        { 32, 33 }
    };

    printSorted(lists);

    return 0;
}
```

**Output:** 10 15 20 25 27 29 30 32 33 35 37 40 48 93

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

    // `i` stores the list number of the element
    private int i;

    // `index` stores the column number of the list from which
    // element was taken
    private int index;

    // Constructor
    public Node(int value, int i, int index)
    {
        this.value = value;
        this.i = i;
        this.index = index;
    }

    public int getValue() {
        return value;
    }

    public int getListNum() {
        return i;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public void setValue(int value) {
        this.value = value;
    }

    @Override
    public int compareTo(Object o)
    {
        Node node = (Node)o;
        return value - node.value;
    }
}

class Main
{
    // Function to merge `M` sorted lists of variable length and
    // print them in ascending order
    public static void printSorted(List<List<Integer>> lists)
    {
        // create an empty min-heap
        PriorityQueue<Node> pq = new PriorityQueue<Node>();

        // push the first element of each list into the min-heap
        // along with the list number and their index in the list
        for (int i = 0; i < lists.size(); i++)
        {
            if (lists.get(i).size() >= 1) {
                pq.add(new Node(lists.get(i).get(0), i, 0));
            }
        }

        // run till min-heap is empty
        while (!pq.isEmpty())
        {
            // extract the minimum node from the min-heap
            Node min = pq.poll();

            // print the minimum element
            System.out.print(min.getValue() + " ");

            // take the next element from the "same" list and insert it into the
            // min-heap
            if (min.getIndex() + 1 < lists.get(min.getListNum()).size())
            {
                min.setIndex(min.getIndex() + 1);
                min.setValue(lists.get(min.getListNum()).get(min.getIndex()));
                pq.add(min);
            }
        }
    }

    public static void main(String[] args)
    {
        List<List<Integer>> lists = Arrays.asList(
                                        Arrays.asList(10, 20, 30, 40),
                                        Arrays.asList(15, 25, 35),
                                        Arrays.asList(27, 29, 37, 48, 93),
                                        Arrays.asList(32, 33)
                                    );

        printSorted(lists);
    }
}
```

##

```python3
import heapq
from heapq import heappop, heappush

# A class to store a heap node
class Node:
    def __init__(self, value, list_num, index):
        # `value` stores the element
        self.value = value

        # `list_num` stores the list number of the element
        self.list_num = list_num

        # `index` stores the column number of the list from which element was taken
        self.index = index

    # Override the `__lt__()` function to make `Node` class work with min-heap
    def __lt__(self, other):
        return self.value < other.value

# Function to merge `M` sorted lists of variable length and
# print them in ascending order
def print_sorted(lists):

    # push the first element of each list into the min-heap
    # along with the list number and their index in the list
    pq = [Node(lists[i][0], i, 0) for i in range(len(lists)) if len(lists[i]) >= 1]
    heapq.heapify(pq)

    # run till min-heap is empty
    while pq:

        # extract the minimum node from the min-heap
        min = heappop(pq)

        # print the minimum element
        print(min.value, end=' ')

        # take the next element from the 'same' list and insert it into the min-heap
        if min.index + 1 < len(lists[min.list_num]):
            min.index = min.index + 1
            min.value = lists[min.list_num][min.index]
            heappush(pq, min)

if __name__ == '__main__':

    list = [[10, 20, 30, 40], [15, 25, 35], [27, 29, 37, 48, 93], [32, 33]]
    print_sorted(list)
```

The time complexity of the above solution is O(N.log(M)) as the heap has size `M`, and we pop and push exactly `N` times, where `N` is the total number of elements. Note that each pop/push operation takes O(log(M)) time.

Also See:

> [Merge `M` sorted lists each containing `N` elements](https://www.techiedelight.com/merge-m-sorted-lists-containing-n-elements/ "Merge `M` sorted lists each containing `N` elements")

> [Efficiently merge `k` sorted linked lists](https://www.techiedelight.com/efficiently-merge-k-sorted-linked-lists/ "Efficiently merge `k` sorted linked lists")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 174

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
