# Iterative Implementation of Quicksort

> Source: https://www.techiedelight.com/iterative-implementation-of-quicksort/

Write an iterative version of the recursive Quicksort algorithm.

In the [previous post](https://techiedelight.com/quicksort/), we have discussed the recursive implementation of the Quicksort algorithm. We have seen that the Quicksort recursion stack can be optimized using tail recursion to minimize the recursive depth. Tail recursion makes sure that at most O(log(n)) space is used by recursing first into the smaller side of the partition of size `n`, then using a tail call to recur into the other. Tail recursion should be recognized by the compiler and optimized to its iterative counterpart.

We have also talked about another recursive stack space optimization. The idea was that when the total number of elements in the subarray is below some threshold `k` (perhaps ten elements), switch to a non-recursive sorting algorithm such as [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/) or stop processing the subarray and later perform insertion sort on it (in O(k.n) time), as each element will be at most `k` positions away from its final sorted position.

But despite these performance boosts, the algorithm remains recursive. How can we convert the algorithm into an iterative one? This post discusses its iterative implementation.

Instead of using recursion, the idea is to use a stack to store subarray’s starting and ending index for later processing. Note that the partitioning logic would remain the same.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

The iterative Quicksort implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
#include <vector>
#include <algorithm>
using namespace std;

int partition(int a[], int start, int end)
{
    // Pick the rightmost element as a pivot from the array
    int pivot = a[end];

    // elements less than the pivot goes to the left of `pIndex`
    // elements more than the pivot goes to the right of `pIndex`
    // equal elements can go either way
    int pIndex = start;

    // each time we find an element less than or equal to the pivot, `pIndex`
    // is incremented, and that element would be placed before the pivot.
    for (int i = start; i < end; i++)
    {
        if (a[i] <= pivot)
        {
            swap(a[i], a[pIndex]);
            pIndex++;
        }
    }

    // swap `pIndex` with pivot
    swap (a[pIndex], a[end]);

    // return `pIndex` (index of the pivot element)
    return pIndex;
}

// Iterative Quicksort routine
void iterativeQuicksort(int a[], int n)
{
    // create a stack of `std::pairs` for storing subarray start and end index
    stack<pair<int, int>> s;

    // get the starting and ending index of the given array
    int start = 0;
    int end = n - 1;

    // push the start and end index of the array into the stack
    s.push(make_pair(start, end));

    // loop till stack is empty
    while (!s.empty())
    {
        // remove top pair from the list and get subarray starting
        // and ending indices
        start = s.top().first, end = s.top().second;
        s.pop();

        // rearrange elements across pivot
        int pivot = partition(a, start, end);

        // push subarray indices containing elements that are
        // less than the current pivot to stack
        if (pivot - 1 > start) {
            s.push(make_pair(start, pivot - 1));
        }

        // push subarray indices containing elements that are
        // more than the current pivot to stack
        if (pivot + 1 < end) {
            s.push(make_pair(pivot + 1, end));
        }
    }
}

// Iterative Implementation of Quicksort
int main()
{
    int a[] = { 6, -3, 5, 1, 9, 8, 3, 2, -6 };
    int n = sizeof(a) / sizeof(a[0]);

    iterativeQuicksort(a, n);

    // print the sorted array
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }

    return 0;
}
```

**Output:** -6 -3 1 2 3 5 6 8 9

##

```java
import java.util.Arrays;
import java.util.Stack;

// A simple pair class in Java
class Pair
{
    private final int x;
    private final int y;

    Pair(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }
}

class Main
{
    public static void swap (int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static int partition(int a[], int start, int end)
    {
        // Pick the rightmost element as a pivot from the array
        int pivot = a[end];

        // elements less than the pivot will go to the left of `pIndex`
        // elements more than the pivot will go to the right of `pIndex`
        // equal elements can go either way
        int pIndex = start;

        // each time we find an element less than or equal to the pivot,
        // `pIndex` is incremented, and that element would be placed
        // before the pivot.
        for (int i = start; i < end; i++)
        {
            if (a[i] <= pivot)
            {
                swap(a, i, pIndex);
                pIndex++;
            }
        }

        // swap `pIndex` with pivot
        swap (a, pIndex, end);

        // return `pIndex` (index of the pivot element)
        return pIndex;
    }

    // Iterative Quicksort routine
    public static void iterativeQuicksort(int[] a)
    {
        // create a stack for storing subarray start and end index
        Stack<Pair> stack = new Stack<>();

        // get the starting and ending index of the given array
        int start = 0;
        int end = a.length - 1;

        // push the start and end index of the array into the stack
        stack.push(new Pair(start, end));

        // loop till stack is empty
        while (!stack.empty())
        {
            // remove top pair from the list and get subarray starting
            // and ending indices
            start = stack.peek().getX();
            end = stack.peek().getY();
            stack.pop();

            // rearrange elements across pivot
            int pivot = partition(a, start, end);

            // push subarray indices containing elements that are
            // less than the current pivot to stack
            if (pivot - 1 > start) {
                stack.push(new Pair(start, pivot - 1));
            }

            // push subarray indices containing elements that are
            // more than the current pivot to stack
            if (pivot + 1 < end) {
                stack.push(new Pair(pivot + 1, end));
            }
        }
    }

    // Iterative Implementation of Quicksort
    public static void main(String[] args)
    {
        int a[] = { 9, -3, 5, 2, 6, 8, -6, 1, 3 };

        iterativeQuicksort(a);

        // print the sorted array
        System.out.println(Arrays.toString(a));
    }
}
```

##

```python3
from collections import deque

def swap (A, i, j):
    temp = A[i]
    A[i] = A[j]
    A[j] = temp

def partition(a, start, end):

    # Pick the rightmost element as a pivot from the list
    pivot = a[end]

    # elements less than the pivot will go to the left of `pIndex`
    # elements more than the pivot will go to the right of `pIndex`
    # equal elements can go either way
    pIndex = start

    # each time we find an element less than or equal to the pivot,
    # `pIndex` is incremented, and that element would be placed
    # before the pivot.
    for i in range(start, end):
        if a[i] <= pivot:
            swap(a, i, pIndex)
            pIndex = pIndex + 1

    # swap `pIndex` with pivot
    swap(a, pIndex, end)

    # return `pIndex` (index of the pivot element)
    return pIndex

# Iterative Quicksort routine
def iterativeQuicksort(a):

    # create a stack for storing sublist start and end index
    stack = deque()

    # get the starting and ending index of a given list
    start = 0
    end = len(a) - 1

    # push the start and end index of the array into the stack
    stack.append((start, end))

    # loop till stack is empty
    while stack:

        # remove top pair from the list and get sublist starting
        # and ending indices
        start, end = stack.pop()

        # rearrange elements across pivot
        pivot = partition(a, start, end)

        # push sublist indices containing elements that are
        # less than the current pivot to stack
        if pivot - 1 > start:
            stack.append((start, pivot - 1))

        # push sublist indices containing elements that are
        # more than the current pivot to stack
        if pivot + 1 < end:
            stack.append((pivot + 1, end))

# Iterative Implementation of Quicksort
if __name__ == '__main__':

    a = [9, -3, 5, 2, 6, 8, -6, 1, 3]

    iterativeQuicksort(a)

    # print the sorted list
    print(a)
```

**Exercise:** Modify above code to print in descending order.

Also See:

> [Quicksort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/quicksort/ "Quicksort Algorithm – C++, Java, and Python Implementation")

> [Hybrid QuickSort Algorithm](https://www.techiedelight.com/hybrid-quicksort/ "Hybrid QuickSort Algorithm")

> [Introsort Algorithm – Overview and C++ Implementation](https://www.techiedelight.com/introsort-algorithm/ "Introsort Algorithm – Overview and C++ Implementation")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 150

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
