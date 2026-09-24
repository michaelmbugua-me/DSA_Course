# Convert max heap to min heap in linear time

> Source: https://www.techiedelight.com/convert-max-heap-min-heap-linear-time/

Given an array representing a max-heap, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) convert it into the min-heap in linear time.

> 

The idea is simple and efficient and inspired by the [Heapsort algorithm](https://techiedelight.com/heap-sort-place-place-implementation-c-c/). The idea is to build the min-heap in-place using an array representing the max-heap. In other words, this is a trick question!! We should not be bothered about whether the given array is max-heap or not. The problem is the same as [building a min-heap from an unsorted array](https://techiedelight.com/min-heap-max-heap-implementation-c/).

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

class MinHeap
{
    // return left child of `A[i]`
    int LEFT(int i) {
        return (2*i + 1);
    }

    // return right child of `A[i]`
    int RIGHT(int i) {
        return (2*i + 2);
    }

    // Recursive function to implement the heapify-down algorithm.
    // The node at index `i` and its two direct children
    // violates the heap property
    void heapify(vector<int> &A, int i, int size)
    {
        // get left and right child of node at index `i`
        int left = LEFT(i);
        int right = RIGHT(i);

        int smallest = i;

        // compare `A[i]` with its left and right child
        // and find the smallest value
        if (left < size && A[left] < A[i]) {
            smallest = left;
        }

        if (right < size && A[right] < A[smallest]) {
            smallest = right;
        }

        // swap with a child having lesser value and
        // call heapify-down on the child
        if (smallest != i)
        {
            swap(A[i], A[smallest]);
            heapify(A, smallest, size);
        }
    }

public:

    // Constructor (Build-Heap – convert max-heap into min-heap)
    MinHeap(vector<int> &A)
    {
        int n = A.size();

        // call heapify starting from the last internal node all the
        // way up to the root node
        int i = (n - 2) / 2;
        while (i >= 0) {
            heapify(A, i--, n);
        }
    }

    // Function to remove an element with the highest priority (present at the root)
    int pop(vector<int> &A, int size)
    {
        // if the heap has no elements
        if (size <= 0) {
            return -1;
        }

        int top = A[0];

        // replace the heap's root with the last element
        // of the array
        A[0] = A[size-1];

        // call heapify-down on the root node
        heapify(A, 0, size - 1);

        return top;
    }
};

// Convert max-heap into min-heap in linear time
int main()
{
    /*
               9
             /   \
            /     \
           4       7
          / \     / \
         /   \   /   \
        1    -2 6     5

    */

    // an array representing the max-heap
    vector<int> A = { 9, 4, 7, 1, -2, 6, 5 };

    // build a min-heap by initializing it by the given array
    MinHeap pq(A);

    // print the min-heap
    /*
               -2
             /    \
            /      \
           1        5
          / \      / \
         /   \    /   \
        9     4  6     7
    */

    for (int i: A) {
        cout << i << " ";
    }

    // repeatedly pop from the heap till it becomes empty
    /*
    int n = A.size();
    while (n > 0)
    {
        cout << pq.pop(A, n) << " ";
        n--;
    }*/

    return 0;
}
```

**Output:** -2 1 5 9 4 6 7

##

```java
import java.util.Arrays;

class MinHeap
{
    // return left child of `A[i]`
    private static int LEFT(int i) {
        return (2*i + 1);
    }

    // return right child of `A[i]`
    private static int RIGHT(int i) {
        return (2*i + 2);
    }

    // Recursive function to implement the heapify-down algorithm.
    // The node at index `i` and its two direct children
    // violates the heap property
    private static void heapify(int[] A, int i, int size)
    {
        // get left and right child of node at index `i`
        int left = LEFT(i);
        int right = RIGHT(i);

        int smallest = i;

        // compare `A[i]` with its left and right child
        // and find the smallest value
        if (left < size && A[left] < A[i]) {
            smallest = left;
        }

        if (right < size && A[right] < A[smallest]) {
            smallest = right;
        }

        // swap with a child having lesser value and
        // call heapify-down on the child
        if (smallest != i)
        {
            swap(A, i, smallest);
            heapify(A, smallest, size);
        }
    }

    // Utility function to swap two indices in the array
    private static void swap(int[] A, int i, int j)
    {
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    // Function to convert a max-heap into a min-heap
    public static void convert(int[] A)
    {
        // Build-Heap: Call heapify starting from the last internal
        // node all the way up to the root node
        int i = (A.length - 2) / 2;
        while (i >= 0) {
            heapify(A, i--, A.length);
        }
    }
}

// Convert max-heap into min-heap in linear time
class Main
{
    public static void main(String[] args)
    {
        /*
                   9
                 /   \
                /     \
               4       7
              / \     / \
             /   \   /   \
            1    -2 6     5
        */

        // an array representing the max-heap
        int[] A = { 9, 4, 7, 1, -2, 6, 5 };

        // build a min-heap by initializing it by the given array
        MinHeap.convert(A);

        // print the min-heap
        /*
                   -2
                 /    \
                /      \
               1        5
              / \      / \
             /   \    /   \
            9     4  6     7
        */

        System.out.println(Arrays.toString(A));
    }
}
```

##

```python3
# return left child of `A[i]`
def LEFT(i):
    return 2*i + 1

# return right child of `A[i]`
def RIGHT(i):
    return 2*i + 2

# Recursive function to implement the heapify-down algorithm.
# The node at index `i` and its two direct children
# violates the heap property
def heapify(A, i, size):

    # get left and right child of node at index `i`
    left = LEFT(i)
    right = RIGHT(i)

    smallest = i

    # compare `A[i]` with its left and right child
    # and find the smallest value
    if left < size and A[left] < A[i]:
        smallest = left

    if right < size and A[right] < A[smallest]:
        smallest = right

    # swap with a child having lesser value and
    # call heapify-down on the child
    if smallest != i:
        swap(A, i, smallest)
        heapify(A, smallest, size)

# Utility function to swap two indices in a list
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Function to convert a max-heap into a min-heap
def convert(A):

    # Build-Heap: Call heapify starting from the last internal
    # node all the way up to the root node
    i = (len(A) - 2) // 2
    while i >= 0:
        heapify(A, i, len(A))
        i = i - 1

# Convert max-heap into min-heap in linear time
if __name__ == '__main__':

    '''
               9
             /   \
            /     \
           4       7
          / \     / \
         /   \   /   \
        1    -2 6     5

    '''

    # a list representing the max-heap
    A = [9, 4, 7, 1, -2, 6, 5]

    # build a min-heap by initializing it by the given list
    convert(A)

    # print the min-heap
    '''
               -2
             /    \
            /      \
           1        5
          / \      / \
         /   \    /   \
        9     4  6     7
    '''

    print(A)
```

The time complexity of the above solution is the same as the building of a heap, i.e., O(n) for an input containing `n` items. It also requires O(n) implicit space for the call stack.

**Exercise:** [Convert min-heap into max-heap in O(n) time](https://techiedelight.com/convert-min-heap-to-max-heap-linear-time/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 162

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
