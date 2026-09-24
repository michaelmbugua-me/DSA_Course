# Introsort Algorithm – Overview and C++ Implementation

> Source: https://www.techiedelight.com/introsort-algorithm/

Given an integer array, sort it using introsort sorting algorithm.

## Introsort Overview

Introsort is an efficient [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), which usually beats all other sorting algorithms in terms of performance. Due to its high performance, it is used in several standard library sort functions, including some [C++ sort implementations](https://techiedelight.com/sort-vector-cpp/).

Introsort is a comparison sort, meaning that it can sort items of any type for which a _less-than_ relation is defined. It is usually not a stable sort, which means that if two elements have the same value, they might not hold the same relative position in the output as they did in the input.

## Introsort Implementation

Introsort is a hybrid of [Quicksort](https://techiedelight.com/quicksort/) and [heapsort algorithm](https://techiedelight.com/heap-sort-place-place-implementation-c-c/). A [hybrid algorithm](https://techiedelight.com/hybrid-quicksort/) combines two or more other algorithms that solve the same problem such that the resulting algorithm is better than the individual algorithms. Introsort begins with Quicksort and switches to heapsort when the recursion depth exceeds a level based on (the logarithm of) the total number of elements being sorted. When the total number of elements is below some threshold, introsort can switch to a non-recursive sorting algorithm such as [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/) that performs fewer swaps, comparisons or other operations on such small arrays.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is the C++ implementation of the introsort algorithm is similar to the GNU Standard C++ library. It uses introsort with a maximum depth of `2.log2(n)`, followed by an insertion sort on partitions smaller than 16. The Quicksort algorithm is optimized by [better pivot selection](https://techiedelight.com/boost-quicksort-performance/).

```
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

// Function to perform insertion sort on subarray `a[low…high]`
void insertionsort(int a[], int low, int high)
{
    // start from the second element in the subarray
    // (the element at index `low` is already sorted)
    for (int i = low + 1; i <= high; i++)
    {
        int value = a[i];
        int j = i;

        // find index `j` within the sorted subset a[0…i-1]
        // where element a[i] belongs
        while (j > low && a[j - 1] > value)
        {
            a[j] = a[j - 1];
            j--;
        }

        // Note that the subarray `a[j…i-1]` is shifted to
        // the right by one position, i.e., `a[j+1…i]`

        a[j] = value;
    }
}

// Function to partition the array using Lomuto partition scheme
int partition(int a[], int low, int high)
{
    // Pick the rightmost element as a pivot from the array
    int pivot = a[high];

    // elements less than the pivot will be pushed to the left of `pIndex`
    // elements more than the pivot will be pushed to the right of `pIndex`
    // equal elements can go either way
    int pIndex = low;

    // each time we find an element less than or equal to the pivot, `pIndex`
    // is incremented, and that element would be placed before the pivot.
    for (int i = low; i < high; i++)
    {
        if (a[i] <= pivot)
        {
            swap(a[i], a[pIndex]);
            pIndex++;
        }
    }

    // swap `pIndex` with pivot
    swap (a[pIndex], a[high]);

    // return `pIndex` (index of the pivot element)
    return pIndex;
}

// Quicksort randomized partition to rearrange elements across pivot
int randPartition(int a[], int low, int high)
{
    // choose a random index between `[low, high]`
    int pivotIndex = rand() % (high - low + 1) + low;

    // swap the end element with the element present at a random index
    swap(a[pivotIndex], a[high]);

    // call the partition procedure
    return partition(a, low, high);
}

// Function to perform heapsort on the given range of elements
void heapsort(int *begin, int *end)
{
    make_heap(begin, end);
    sort_heap(begin, end);
}

// Function to perform introsort on the given array
void introsort(int a[], int *begin, int *end, int maxdepth)
{
    // perform insertion sort if partition size is 16 or smaller
    if ((end - begin) < 16) {
        insertionsort(a, begin - a, end - a);
    }
    // perform heapsort if the maximum depth is 0
    else if (maxdepth == 0) {
        heapsort(begin, end + 1);
    }
    else {
        // otherwise, perform Quicksort
        int pivot = randPartition(a, begin - a, end - a);
        introsort(a, begin, a + pivot - 1, maxdepth - 1);
        introsort(a, a + pivot + 1, end, maxdepth - 1);
    }
}

int main()
{
    int a[] = { 5, 7, -8, 9, 10, 4, -7, 0, -12, 1, 6, 2, 3, -4, -15, 12 };
    int n = sizeof(a) / sizeof(a[0]);

    // get the maximum depth
    int maxdepth = log(n) * 2;

    // sort the array using introsort the algorithm
    introsort(a, a, a + n - 1, maxdepth);

    // print the sorted array
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }

    return 0;
}
```

**Output:** -15 -12 -8 -7 -4 0 1 2 3 4 5 6 7 9 10 12

## Introsort Performance

Introsort sorting algorithm provides both fast average performance and (asymptotically) optimal worst-case performance. Both the average-case and worst-case time complexity of introsort are O(n.log(n)), where `n` is the size of the input.

The auxiliary space required by the introsort algorithm is O(n) for the call stack when the naive Quicksort algorithm is used. To keep the stack depth bounded by O(log(n)), recur first into the partition’s smaller side, then use a [tail call](https://en.wikipedia.org/wiki/Tail_recursion) to recur into the other.

**References:** <https://en.wikipedia.org/wiki/Introsort>

Also See:

> [Hybrid QuickSort Algorithm](https://www.techiedelight.com/hybrid-quicksort/ "Hybrid QuickSort Algorithm")

> [Quicksort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/quicksort/ "Quicksort Algorithm – C++, Java, and Python Implementation")

> [Quicksort algorithm using Hoare’s partitioning scheme](https://www.techiedelight.com/quick-sort-using-hoares-partitioning-scheme/ "Quicksort algorithm using Hoare’s partitioning scheme")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 73

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
