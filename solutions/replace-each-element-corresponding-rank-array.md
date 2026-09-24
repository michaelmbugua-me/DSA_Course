# Replace each array element by its corresponding rank

> Source: https://www.techiedelight.com/replace-each-element-corresponding-rank-array/

Given an array of distinct integers, replace each array element by its corresponding rank in the array.

The minimum array element has the rank 1; the second minimum element has a rank of 2, and so on… For example,

**Input:** { 10, 8, 15, 12, 6, 20, 1 } **Output:** { 4, 3, 6, 5, 2, 7, 1 }

> 

The idea is to store each element’s index in an ordered map (Since the array contains all distinct integers, we can use array elements and their index as key-value pairs in the map). Since elements are stored in sorted order in an ordered map, if we iterate through the map, we get elements in increasing order. Therefore, for each element in increasing order, we start assigning values starting from number 1 to `n`.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <map>
using namespace std;

// Function to replace each array element by its rank in the array
void transform(vector<int> &input)
{
    // create an empty ordered map
    map<int, int> map;

    // store (element, index) pair in a map
    for (int i = 0; i < input.size(); i++) {
        map[input[i]] = i;
    }

    // keys are stored in sorted order in an ordered map

    // rank starts from 1
    int rank = 1;

    // iterate through the map and replace each element with its rank
    for (auto i: map) {
        input[i.second] = rank++;        // `i.second` stores the index of element `i`
    }
}

int main()
{
    vector<int> input = { 10, 8, 15, 12, 6, 20, 1 };

    // transform the array
    transform(input);

    // print the transformed array
    for (int i: input) {
        cout << i << " ";
    }

    return 0;
}
```

**Output:** 4 3 6 5 2 7 1

##

```java
import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;

class Main
{
    // Function to replace each array element by its rank in the array
    public static void transform(int[] input)
    {
        // create an empty `TreeMap`
        Map<Integer, Integer> map = new TreeMap<>();

        // store (element, index) pair in `TreeMap`
        for (int i = 0; i < input.length; i++) {
            map.put(input[i], i);
        }

        // keys are stored in sorted order in `TreeMap`

        // rank starts from 1
        int rank = 1;

        // iterate through the map and replace each element with its rank
        for (var val: map.values()) {
            input[val] = rank++;
        }
    }

    public static void main(String[] args)
    {
        int[] input = { 10, 8, 15, 12, 6, 20, 1 };

        // transform the array
        transform(input);

        // print the transformed array
        System.out.println(Arrays.toString(input));
    }
}
```

##

```python3
# Function to replace each element of a list by its rank in the list
def transform(input):

    # create an empty dictionary
    d = {}

    # store (element, index) pair in a dictionary
    for i, e in enumerate(input):
        d[e] = i

    # rank starts from 1
    rank = 1

    # iterate through the dictionary in sorted order of their keys and
    # replace each element with its rank
    for key in sorted(d.keys()):
        input[d.get(key)] = rank
        rank = rank + 1

if __name__ == '__main__':

    input = [10, 8, 15, 12, 6, 20, 1]

    # transform the list
    transform(input)

    # print the transformed list
    print(input)
```

The time complexity of the above solution is O(n.log(n)), where `n` is the size of the input. This assumes O(log(n)) time operation for `std::map` or `TreeMap`. The auxiliary space required by the program is O(n).

We can also use a [heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) to solve this problem. The idea remains similar to the previous approach, but we store array elements and their index as key-value pairs in a max-heap. The primary benefit of using max-heap is that we get elements in decreasing order if we remove pairs from it. Therefore, for each element in decreasing order, we start assigning values starting from number `n` till `1`. Note that min-heap can also be used.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Function to replace each array element by its rank in the array
void transform(vector<int> &input)
{
    // construct a priority queue of pairs
    priority_queue<pair <int, int>> maxHeap;

    // push all input elements with their corresponding index in the priority queue
    for (size_t i = 0; i < input.size(); i++) {
        maxHeap.push({ input[i], i });
    }

    // get input size
    int rank = input.size();

    // run until max-heap is empty
    while (!maxHeap.empty())
    {
        // take the next maximum element from the heap and replace its value
        // in the input vector with its corresponding rank
        input[maxHeap.top().second] = rank;
        maxHeap.pop();

        // decrement rank for the next maximum element
        --rank;
    }
}

int main()
{
    vector<int> input { 10, 8, 15, 12, 6, 20, 1 };

    // transform the input
    transform(input);

    // print the transformed vector
    for (int i: input) {
        cout << i << " ";
    }

    return 0;
}
```

**Output:** 4 3 6 5 2 7 1

##

```java
import java.util.Arrays;
import java.util.PriorityQueue;

// A Pair class
class Pair<U, V>
{
    public final U first;       // first field of a pair
    public final V second;      // second field of a pair

    // Constructs a new Pair with specified values
    private Pair(U first, V second)
    {
        this.first = first;
        this.second = second;
    }

    // Factory method for creating a Typed Pair immutable instance
    public static <U, V> Pair <U, V> of(U a, V b)
    {
        // calls private constructor
        return new Pair<>(a, b);
    }
}

class Main
{
    // Function to replace each array element by its rank in the array
    public static void transform(int[] input)
    {
        // create a max-heap of `Pair` using the `PriorityQueue` class
        PriorityQueue<Pair<Integer, Integer>> pq;
        pq = new PriorityQueue<>((a, b) -> b.first - a.first);

        // push all input elements with their corresponding index in the priority queue
        for (int i = 0; i < input.length; i++) {
            pq.add(Pair.of(input[i], i));
        }

        // get input size
        int rank = input.length;

        // run until max-heap is empty
        while (!pq.isEmpty())
        {
            // take the next maximum element from the heap and replace its value
            // in the input array with its corresponding rank
            input[pq.poll().second] = rank;

            // decrement rank for the next maximum element
            --rank;
        }
    }

    public static void main(String[] args)
    {
        int[] input = { 10, 8, 15, 12, 6, 20, 1 };

        // transform the array
        transform(input);

        // print the transformed array
        System.out.println(Arrays.toString(input));
    }
}
```

##

```python3
import heapq
from heapq import heappop

class Pair:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Override the `__lt__()` function to make `Pair` class work with max-heap
    def __lt__(self, other):
        return self.x > other.x

# Function to replace each element of a list by its rank in a list
def transform(input):

    # build a max-heap of `Pair` from all elements in the list using their
    # corresponding index
    pq = [Pair(input[i], i) for i in range(len(input))]
    heapq.heapify(pq)

    # get input size
    rank = len(input)

    # run until max-heap is empty
    while pq:

        # take the next maximum element from the heap and replace its value
        # in the input list with its corresponding rank
        input[heappop(pq).y] = rank

        # decrement rank for the next maximum element
        rank = rank - 1

if __name__ == '__main__':

    input = [10, 8, 15, 12, 6, 20, 1]

    # transform the list
    transform(input)

    # print the transformed list
    print(input)
```

The time complexity of the above solution remains the same as the previous approach, i.e., O(n.log(n)). The auxiliary space required by the program also remains O(n).

**Exercise:** Convert the above solution to use min-heap.
