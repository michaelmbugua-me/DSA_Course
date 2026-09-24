# Find k’th largest element in an array

> Source: https://www.techiedelight.com/find-kth-largest-element-array/

Given an integer array, find k’th largest element in the array where k is a positive integer less than or equal to the length of array.

For example,

**Input:** arr = [7, 4, 6, 3, 9, 1] k = 2 **Output:** The 2nd largest array element is 7

> 

A simple solution would be to use an [efficient sorting algorithm](https://techiedelight.com/quicksort/) to sort the array in descending order and return the element at `(k-1)'th` index. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the size of the input. We can improve the time complexity using the following methods:

## Using Min Heap

We can easily solve this problem in O(n.log(k)) by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `k` and insert the first `k` elements of array `A[0…k-1]` into the min-heap. Then for each of the remaining array elements `A[k…n-1]`, if that element is more than the min-heap’s root, replace the root with the current element. Repeat this process until the array is exhausted. Now we will be left with top `k` largest array elements in the min-heap, and `k'th` largest element will reside at the root of the min-heap.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to find the k'th largest element in an array using min-heap
int findKthLargest(vector<int> const &ints, int k)
{
    // base case
    if (ints.size() < k) {
        exit(-1);
    }

    // create a min-heap using `std::priority_queue` and insert
    // the first `k` array elements into the heap
    // `std::greater` is used as the comparison function for min-heap
    priority_queue<int, vector<int>, greater<int>> pq(ints.begin(), ints.begin() + k);

    // do for remaining array elements
    for (int i = k; i < ints.size(); i++)
    {
        // if the current element is more than the root of the heap
        if (ints[i] > pq.top())
        {
            // replace root with the current element
            pq.pop();
            pq.push(ints[i]);
        }
    }

    // return the root of min-heap
    return pq.top();
}

int main()
{
    vector<int> ints = { 7, 4, 6, 3, 9, 1 };
    int k = 2;

    cout << "k'th largest array element is " << findKthLargest(ints, k);

    return 0;
}
```

**Output:** k’th largest array element is 7

##

```java
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Main
{
    // Function to find the k'th largest element in an array using min-heap
    public static int findKthLargest(List<Integer> ints, int k)
    {
        // base case
        if (ints == null || ints.size() < k) {
            System.exit(-1);
        }

        // create a min-heap using the `PriorityQueue` class and insert
        // the first `k` array elements into the heap
        PriorityQueue<Integer> pq = new PriorityQueue<>(ints.subList(0, k));

        // do for remaining array elements
        for (int i = k; i < ints.size(); i++)
        {
            // if the current element is more than the root of the heap
            if (ints.get(i) > pq.peek())
            {
                // replace root with the current element
                pq.poll();
                pq.add(ints.get(i));
            }
        }

        // return the root of min-heap
        return pq.peek();
    }

    public static void main(String[] args)
    {
        List<Integer> ints = Arrays.asList(7, 4, 6, 3, 9, 1);
        int k = 2;

        System.out.println("k'th largest array element is " + findKthLargest(ints, k));
    }
}
```

##

```python3
import heapq

# Function to find the k'th largest element in a list using min-heap
def find_kth_largest(ints, k):

    # base case
    if not ints or len(ints) < k:
        exit(-1)

    # build a min-heap from the first `k` elements in the list
    pq = ints[0:k]
    heapq.heapify(pq)

    # do for remaining list elements
    for i in range(k, len(ints)):
        # if the current element is more than the root of the heap
        if ints[i] > pq[0]:
            # replace root with the current element
            heapq.heapreplace(pq, ints[i])

    # return the root of min-heap
    return pq[0]

if __name__ == '__main__':

    ints = [7, 4, 6, 3, 9, 1]
    k = 2

    print('k\'th largest element in the list is', find_kth_largest(ints, k))
```

## Using Max Heap

We can easily solve this problem in O(n + k.log(n)) by using a [max-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to simply construct a max-heap of size `n` and insert all the array elements `[0…n-1]` into it. Then pop first `k-1` elements from it. Now `k'th` largest element will reside at the root of the max-heap.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to find the k'th largest element in an array using max-heap
int findKthLargest(vector<int> const &ints, int k)
{
    // base case
    if (ints.size() < k) {
        exit(-1);
    }

    // build a max-heap using `std::priority_queue`
    // from all elements of the vector
    priority_queue<int, vector<int>> pq(less<int>(), ints);

    // pop from max-heap exactly `k-1` times
    while (--k) {
        pq.pop();
    }

    // return the root of max-heap
    return pq.top();
}

int main()
{
    vector<int> ints = { 7, 4, 6, 3, 9, 1 };
    int k = 2;

    cout << "k'th largest array element is " << findKthLargest(ints, k);

    return 0;
}
```

**Output:** k’th largest array element is 7

##

```java
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Main
{
    // Function to find the k'th largest element in an array using max-heap
    public static int findKthLargest(List<Integer> ints, int k)
    {
        // base case
        if (ints == null || ints.size() < k) {
            System.exit(-1);
        }

        // build a max-heap using the `PriorityQueue` class from all
        // elements in the list
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
                                    // or pass `Comparator.reverseOrder()`
        pq.addAll(ints);

        // pop from max-heap exactly `k-1` times
        while (--k > 0) {
            pq.poll();
        }

        // return the root of max-heap
        return pq.peek();
    }

    public static void main(String[] args)
    {
        List<Integer> ints = Arrays.asList(7, 4, 6, 3, 9, 1);
        int k = 2;

        System.out.println("k'th largest array element is " + findKthLargest(ints, k));
    }
}
```

##

```python3
import heapq

# A simple implementation of max-heap based on `heapq`
class MaxHeap:

    def __init__(self, data=None):
        if data is None:
            self.data = []
        else:
            self.data = [-i for i in data]
            heapq.heapify(self.data)

    def top(self):
        return -self.data[0]

    def push(self, item):
        heapq.heappush(self.data, -item)

    def pop(self):
        return -heapq.heappop(self.data)

    def replace(self, item):
        return heapq.heapreplace(self.data, -item)

# Function to find the k'th largest element in a list using max-heap
def find_kth_largest(ints, k):

    # base case
    if not ints or len(ints) < k:
        exit(-1)

    # build a max-heap from all elements in the list
    pq = MaxHeap(ints)

    # pop from max-heap exactly `k-1` times
    while k > 1:
        pq.pop()
        k = k - 1

    # return the root of max-heap
    return pq.top()

if __name__ == '__main__':

    ints = [7, 4, 6, 3, 9, 1]
    k = 2

    print('k\'th largest element in the list is', find_kth_largest(ints, k))
```

## Using STL

We can easily solve this problem by using [std::nth_element](https://cplusplus.com/reference/algorithm/nth_element/) in C++. Special thanks to a reader for sharing this approach in the comments. Following is the prototype of `std::nth_element`, which rearranges the elements in range `[first, last)` so that the element at the `n'th` position is the element that would be in that position in a sorted sequence:

`void nth_element (RandomAccessIterator first, RandomAccessIterator nth, RandomAccessIterator last)`

`std::nth_element` is typically implemented using a version of [quickselect](https://techiedelight.com/quickselect-algorithm/) called [Introselect](https://en.wikipedia.org/wiki/Introselect). Introselect is a hybrid of quickselect and [median of medians](https://en.wikipedia.org/wiki/Median_of_medians). If quickselect takes too long (bad pivot selection), then it falls back to the slower but guaranteed linear time algorithm, thus capping its worst-case runtime before it becomes worse than linear.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

// Function to find the k'th largest element in an array
int findKthLargest(vector<int> ints, int k)
{
    // base case
    if (ints.size() < k) {
        exit(-1);
    }

    nth_element(ints.begin(), ints.begin() + k - 1, ints.end(), greater<int>());
    return ints[k - 1];
}

int main()
{
    vector<int> ints = { 7, 4, 6, 3, 9, 1 };
    int k = 2;

    cout << "k'th largest array element is " << findKthLargest(ints, k);

    return 0;
}
```

**Output:** k’th largest array element is 7
