# Find k’th smallest element in an array

> Source: https://www.techiedelight.com/find-kth-smallest-element-array/

Given an integer array, find `k'th` smallest element in the array where `k` is a positive integer less than or equal to the length of array.

For example,

**Input:** arr = [7, 4, 6, 3, 9, 1] k = 3 **Output:** k’th smallest array element is 4

> 

A simple solution would be to use an [efficient sorting algorithm](https://techiedelight.com/quicksort/) to sort the array in ascending order and return the element at `(k-1)'th` index. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the size of the input. We can improve the time complexity using the following methods:

## Using Max Heap

We can easily solve this problem in O(n.log(k)) time by using a [max-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap), where `n` is the size of the input. The idea is to simply construct a max-heap of size `k` and insert the first `k` elements of array `[0…k-1]` into the max-heap. Then for each of the remaining array elements `[k…n-1]`, if that element is less than the heap’s root, replace the root with the current element. Repeat this process till the array is exhausted. Now, we will be left with `k` smallest array elements in the max-heap, and `k'th` smallest element will reside at the root of the max-heap.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to find the k'th smallest element in an array using max-heap
int findKthSmallest(vector<int> const &input, int k)
{
    // base case
    if (input.size() < k) {
        exit(-1);
    }

    // create a max-heap using `std::priority_queue` and
    // insert the first `k` array elements into the heap
    priority_queue<int, vector<int>> pq(input.begin(), input.begin() + k);

    // do for remaining array elements
    for (int i = k; i < input.size(); i++)
    {
        // if the current element is less than the root of the heap
        if (input[i] < pq.top())
        {
            // replace root with the current element
            pq.pop();
            pq.push(input[i]);
        }
    }

    // return the root of max-heap
    return pq.top();
}

int main()
{
    vector<int> input = { 7, 4, 6, 3, 9, 1 };
    int k = 3;

    cout << "k'th smallest array element is " << findKthSmallest(input, k);

    return 0;
}
```

**Output:** k’th smallest array element is 4

##

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

class Main
{
    // Function to find the k'th smallest element in an array using max-heap
    public static int findKthSmallest(List<Integer> input, int k)
    {
        // base case
        if (input == null || input.size() < k) {
            System.exit(-1);
        }

        // create a max-heap using the `PriorityQueue` class and
        // insert the first `k` array elements into the heap
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
        pq.addAll(input.subList(0, k));

        // do for remaining array elements
        for (int i = k; i < input.size(); i++)
        {
            // if the current element is less than the root of the heap
            if (input.get(i) < pq.peek())
            {
                // replace root with the current element
                pq.poll();
                pq.add(input.get(i));
            }
        }

        // return the root of max-heap
        return pq.peek();
    }

    public static void main(String[] args)
    {
        List<Integer> input = Arrays.asList(7, 4, 6, 3, 9, 1);
        int k = 3;

        System.out.println("k'th smallest array element is " +
                    findKthSmallest(input, k));
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

# Function to find the k'th smallest element in a list using max-heap
def find_kth_smallest(input, k):

    # base case
    if not input or len(input) < k:
        exit(-1)

    # build a max-heap from the first `k` elements in the list
    pq = MaxHeap(input[0:k])

    # do for remaining list elements
    for i in range(k, len(input)):
        # if the current element is less than the root of the heap
        if input[i] < pq.top():
            # replace root with the current element
            pq.replace(input[i])

    # return the root of max-heap
    return pq.top()

if __name__ == '__main__':

    input = [7, 4, 6, 3, 9, 1]
    k = 3

    print('k\'th smallest element in the list is', find_kth_smallest(input, k))
```

## Using Min Heap

We can easily solve this problem in O(n + k.log(n)) by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `n` and insert all the array elements `input[0…n-1]` into it. Then pop first `k-1` elements from it. Now `k'th` smallest element will reside at the root of the min-heap.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to find the k'th smallest element in an array using min-heap
int findKthSmallest(vector<int> const &input, int k)
{
    // base case
    if (input.size() < k) {
        exit(-1);
    }

    // create an empty min-heap and initialize it with all elements
    // use `std::greater` as the comparison function for min-heap
    priority_queue<int, vector<int>, greater<int>> pq(input.begin(), input.end());

    // pop from min-heap exactly `k-1` times
    while (--k) {
        pq.pop();
    }

    // return the root of min-heap
    return pq.top();
}

int main()
{
    vector<int> input = { 7, 4, 6, 3, 9, 1 };
    int k = 3;

    cout << "k'th smallest array element is " << findKthSmallest(input, k);

    return 0;
}
```

**Output:** k’th smallest array element is 4

##

```java
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Main
{
    // Function to find the k'th smallest element in an array using min-heap
    public static int findKthSmallest(List<Integer> input, int k)
    {
        // base case
        if (input == null || input.size() < k) {
            System.exit(-1);
        }

        // create an empty min-heap and initialize it with all input elements
        PriorityQueue<Integer> pq = new PriorityQueue<>(input);

        // pop from min-heap exactly `k-1` times
        while (--k > 0) {
            pq.poll();
        }

        // return the root of min-heap
        return pq.peek();
    }

    public static void main(String[] args)
    {
        List<Integer> input = Arrays.asList(7, 4, 6, 3, 9, 1);
        int k = 3;

        System.out.println("k'th smallest array element is " +
                        findKthSmallest(input, k));
    }
}
```

##

```python3
import heapq
from heapq import heappop

# Function to find the k'th smallest element in a list using min-heap
def find_kth_smallest(input, k):

    # base case
    if not input or len(input) < k:
        exit(-1)

    # transform the input list into a min-heap
    heapq.heapify(input)

    # pop from min-heap exactly `k-1` times
    while k > 1:
        heappop(input)
        k = k - 1

    # return the root of min-heap
    return input[0]

if __name__ == '__main__':

    input = [7, 4, 6, 3, 9, 1]
    k = 3

    print('k\'th smallest element in the list is', find_kth_smallest(input, k))
```

## Using STL

We can easily solve this problem by using [std::nth_element](https://cplusplus.com/reference/algorithm/nth_element/) in C++. Following is the prototype of `std::nth_element`, which rearranges the elements in range `[first, last)` so that the element at the `n'th` position is the element that would be in that position in a sorted sequence:

`void nth_element (RandomAccessIterator first, RandomAccessIterator n, RandomAccessIterator last)`

`std::nth_element` is typically implemented using a fancy version of [quickselect](https://techiedelight.com/quickselect-algorithm/) called introselect. We can imagine quickselect as a Quicksort version where the recursive call is only executed on the side, which contains the element. Introselect ensures the worst-case linear running time if quickselect takes too long (bad pivot selection). It basically switches to an algorithm with worst-case O(n) time, which is slower in most cases but saves the day when quickselect has trouble.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find the k'th smallest element in an array
int findKthSmallest(vector<int> input, int k)
{
    // base case
    if (input.size() < k) {
        exit(-1);
    }

    nth_element(input.begin(), input.begin() + k - 1, input.end());
    return input[k - 1];
}

int main()
{
    vector<int> input = { 7, 4, 6, 3, 9, 1 };
    int k = 3;

    cout << "k'th smallest array element is " << findKthSmallest(input, k);

    return 0;
}
```

**Output:** k’th smallest array element is 7
