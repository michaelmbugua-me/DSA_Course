# Check if an array represents a min-heap or not

> Source: https://www.techiedelight.com/check-given-array-represents-min-heap-not/

Given an integer array, check if it represents [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) or not.

For example, the first array represents a min-heap, but the second array isn’t as it violate the heap property.

> 

Since the input is an array, the heap’s structural property (_all levels except the last level are full_) cannot be violated. We only have to worry about the Min Heap Property (_the priority of a node is at least as large as that of its parent_) for a given problem.

Since array indexing begins from `0`, for a given index `i` of an array of size `n`, if `2×i + 2 > n` is true then `A[i]` represents a leaf node. Otherwise, when `2×i + 2 <= n` is true, `A[i]` represents internal heap node.

For instance, consider array `[2, 3, 4, 5, 10, 15]` of size `n = 6`. Here, `[2, 3, 4]` are internal nodes as `2×i + 2 <= 6` is true and `[5, 10, 15]` are leaf nodes as `2×i + 2 > 6` is true.

Now that we know how to differentiate between a leaf node and an internal node based on the given array index and the total number of nodes, let’s return to the given problem.

## Recursive Solution

We can efficiently solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to start from the root node (at index 0) and check if the left and right child (if any) of the root node is greater than the root node or not. If true, recursively call the procedure for both its children; otherwise, return false from the function. Following is the complete algorithm:

  * If the current node is a leaf node, return true as every leaf node is a heap.
  * If the current node is an internal node,
    * Recursively check if the left child is min-heap or not.
    * Recursively check if the right child is min-heap or not (if it exists).
    * Return true if both left and right child are min-heap; otherwise, return false.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to check if a given array represents min-heap or not
bool checkMinHeap(vector<int> const A, int i)
{
    // if `i` is a leaf node, return true as every leaf node is a heap
    if (2*i + 2 > A.size()) {
        return true;
    }

    // if `i` is an internal node

    // recursively check if the left child is a heap
    bool left = (A[i] <= A[2*i + 1]) && checkMinHeap(A, 2*i + 1);

    // recursively check if the right child is a heap (to avoid the array index out
    // of bounds, first check if the right child exists or not)
    bool right = (2*i + 2 == A.size()) ||
            (A[i] <= A[2*i + 2] && checkMinHeap(A, 2*i + 2));

    // return true if both left and right child are heaps
    return left && right;
}

int main()
{
    vector<int> A = {1, 2, 3, 4, 5, 6};

    // start with index 0 (the root of the heap)
    int index = 0;

    if (checkMinHeap(A, index)) {
        cout << "The given array is a min-heap";
    }
    else {
        cout << "The given array is not a min-heap";
    }

    return 0;
}
```

**Output:** The given array is a min-heap

##

```java
class Main
{
    // Function to check if a given array represents min-heap or not
    public static boolean checkMinHeap(int[] A, int i)
    {
        // if `i` is a leaf node, return true as every leaf node is a heap
        if (2*i + 2 > A.length) {
            return true;
        }

        // if `i` is an internal node

        // recursively check if the left child is a heap
        boolean left = (A[i] <= A[2*i + 1]) && checkMinHeap(A, 2*i + 1);

        // recursively check if the right child is a heap (to avoid the array index out
        // of bounds, first check if the right child exists or not)
        boolean right = (2*i + 2 == A.length) ||
                        (A[i] <= A[2*i + 2] && checkMinHeap(A, 2*i + 2));

        // return true if both left and right child are heaps
        return left && right;
    }

    public static void main(String[] args)
    {
        int[] A = {1, 2, 3, 4, 5, 6};

        // start with index 0 (the root of the heap)
        int index = 0;

        if (checkMinHeap(A, index)) {
            System.out.println("The given array is a min-heap");
        }
        else {
            System.out.println("The given array is not a min-heap");
        }
    }
}
```

##

```python3
# Function to check if the given list represents min-heap or not
def checkMinHeap(A, i):

    # if `i` is a leaf node, return true as every leaf node is a heap
    if 2*i + 2 > len(A):
        return True

    # if `i` is an internal node

    # recursively check if the left child is a heap
    left = (A[i] <= A[2*i + 1]) and checkMinHeap(A, 2*i + 1)

    # recursively check if the right child is a heap (to avoid the list index out
    # of bounds, first check if the right child exists or not)
    right = (2*i + 2 == len(A)) or (A[i] <= A[2*i + 2]
                                    and checkMinHeap(A, 2*i + 2))

    # return true if both left and right child are heaps
    return left and right

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6]

    # start with index 0 (the root of the heap)
    index = 0

    if checkMinHeap(A, index):
        print('The given list is a min-heap')
    else:
        print('The given list is not a min-heap')
```

## Iterative Solution

As recursion is costly, we can easily convert the above recursive function into an iterative one. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Iterative function to check if a given array represents min-heap or not
bool checkMinHeap(vector<int> const &A)
{
    int n = A.size();

    // base case
    if (n <= 1) {
        return true;
    }

    // check for all internal nodes that their left child and
    // right child (if present) holds min-heap property or not
    for (int i = 0; i <= (n - 2) / 2; i++)
    {
        if (A[i] > A[2*i + 1] || ((2*i + 2 != n) && A[i] > A[2*i + 2])) {
            return false;
        }
    }
    return true;
}

int main()
{
    vector<int> A = { 2, 3, 5, 8, 10 };

    if (checkMinHeap(A)) {
        cout << "The given array is a min-heap";
    }
    else {
        cout << "The given array is not a min-heap";
    }

    return 0;
}
```

**Output:** The given array is a min-heap

##

```java
class Main
{
    // Iterative function to check if a given array represents min-heap or not
    public static boolean checkMinHeap(int[] A)
    {
        // base case
        if (A.length <= 1) {
            return true;
        }

        // check for all internal nodes that their left child and
        // right child (if present) holds min-heap property or not

        // start with index 0 (the root of the heap)
        for (int i = 0; i <= (A.length - 2) / 2; i++)
        {
            if (A[i] > A[2*i + 1] || (2*i + 2 != A.length && A[i] > A[2*i + 2])) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args)
    {
        int[] A = {1, 2, 3, 4, 5, 6};

        if (checkMinHeap(A)) {
            System.out.println("The given array is a min-heap");
        }
        else {
            System.out.println("The given array is not a min-heap");
        }
    }
}
```

##

```python3
# Iterative function to check if a given list represents a min-heap or not
def checkMinHeap(A):

    # base case
    if len(A) <= 1:
        return True

    # check for all internal nodes that their left child and
    # right child (if present) holds min-heap property or not

    # start with index 0 (the root of the heap)
    for i in range((len(A) - 2) // 2 + 1):
        if A[i] > A[2*i + 1] or (2*i + 2 != len(A) and A[i] > A[2*i + 2]):
            return False

    return True

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6]

    if checkMinHeap(A):
        print('The given list is a min-heap')
    else:
        print('The given list is not a min-heap')
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

**Exercise:** Given an integer array, check if it represents max-heap or not.
