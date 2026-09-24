# Hybrid QuickSort Algorithm

> Source: https://www.techiedelight.com/hybrid-quicksort/

In this article, a hybrid of the [Quicksort](https://techiedelight.com/quicksort/) with [Insertion Sort](https://techiedelight.com/insertion-sort-iterative-recursive/) is discussed to achieve better performance.

A Hybrid Algorithm is an algorithm that combines two or more other algorithms that solve the same problem, either choosing one (depending on the data) or switching between them throughout the algorithm. This is generally done to combine each of the desired features so that the overall algorithm is better than the individual components.

[Quicksort](https://techiedelight.com/quicksort/) is one of the fastest sorting algorithms for sorting large data. When implemented well, it can be about two or three times faster than its main competitors, [merge sort](https://techiedelight.com/merge-sort/) and [heapsort](https://techiedelight.com/heap-sort-place-place-implementation-c-c/). There have been various variants proposed to boost its performance. Most of them we have already discussed here. Let’s revisit a few important optimizations that can be applied to Quicksort.

Tail Recursion:

To make sure at most, O(log(n)) space is used for an input containing `n` elements, recur first into the partition’s smaller side, then use a tail call to recur into the other. As such, we successfully sort the array in a way that minimizes the recursive depth.

Hybrid with Insertion Sort:

When the total number of elements is below some threshold (perhaps ten elements), switch to a non-recursive sorting algorithm such as [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/) that performs fewer swaps, comparisons, or other operations on such small arrays.

Instead of “many small sorts” optimization, we can stop when the total number of elements is less than some threshold `k`. Later, when the whole array has been processed, each element will be at most `k` positions away from its final sorted position. Now, if we perform insertion sort on it, it will take O(k.n) time to finish the sort, which is linear as `k` is a constant.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is the C++ and Java programs to demonstrate the Quicksort’s performance with its hybrid with insertion sort (and using tail optimizations):

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

// Total number of elements to be sorted
#define N 100000

// Total number of sorting runs
#define NUM 10

// Function to perform insertion sort on `arr[]`
void insertionSort(int arr[], int low, int n)
{
    // Start from the second element (the element at index 0
    // is already sorted)
    for (int i = low + 1; i <= n; i++)
    {
        int value = arr[i];
        int j = i;

        // find index `j` within the sorted subset `arr[0…i-1]`
        // where element `arr[i]` belongs
        while (j > low && arr[j - 1] > value)
        {
            arr[j] = arr[j - 1];
            j--;
        }

        // note that subarray `arr[j…i-1]` is shifted to
        // the right by one position, i.e., `arr[j+1…i]`

        arr[j] = value;
    }
}

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

void quicksort(int a[], int low, int high)
{
    // base condition
    if (low >= high) {
        return;
    }

    // rearrange elements across pivot
    int pivot = partition(a, low, high);

    // recur on subarray containing elements that are less than the pivot
    quicksort(a, low, pivot - 1);

    // recur on subarray containing elements that are more than the pivot
    quicksort(a, pivot + 1, high);
}

void optimizedQuicksort(int A[], int low, int high)
{
    while (low < high)
    {
        // switch to insertion sort if the size is 10 or smaller
        if (high - low < 10)
        {
            insertionSort(A, low, high);
            break;
        }
        else {
            int pivot = partition(A, low, high);

            // tail call optimizations – recur on the smaller subarray
            if (pivot - low < high - pivot)
            {
                optimizedQuicksort(A, low, pivot - 1);
                low = pivot + 1;
            }
            else {
                optimizedQuicksort(A, pivot + 1, high);
                high = pivot - 1;
            }
        }
    }
}

int main()
{
    int arr[N], dup[N];

    // seed for random input
    srand(time(NULL));

    // to measure the time taken by optimized and non-optimized Quicksort
    clock_t begin, end;
    double t1 = 0.0, t2 = 0.0;

    // perform Quicksort NUM times and take an average
    for (int i = 0; i < NUM; i++)
    {
        // generate random input
        for (int i = 0; i < N; i++) {
            dup[i] = arr[i] = rand() % 100000;
        }

        // Perform non-optimized Quicksort on the array
        begin = clock();
        quicksort(arr, 0, N - 1);
        end = clock();

        // calculate the time taken by non-optimized Quicksort
        t1 += (double)(end - begin) / CLOCKS_PER_SEC;

        // Perform optimized Quicksort on the duplicate array
        begin = clock();
        optimizedQuicksort(dup, 0, N - 1);
        end = clock();

        // calculate the time taken by optimized Quicksort
        t2 += (double)(end - begin) / CLOCKS_PER_SEC;
    }

    cout << "The average time taken by non-optimized Quicksort: " << t1/NUM;
    cout << "\nThe average time taken by optimized Quicksort: " << t2/NUM;

    return 0;
}
```

**Output:** The average time taken by non-optimized Quicksort: 0.0239415 The average time taken by optimized Quicksort: 0.0219416

##

```java
import java.util.Arrays;
import java.util.Random;

class Main
{
    // Total number of elements to be sorted
    private static final int N = 10000;

    // Total number of sorting runs
    private static final int NUM = 10;

    // Function to perform insertion sort on `arr[]`
    public static void insertionSort(int[] arr, int low, int n)
    {
        // Start from the second element (the element at index 0
        // is already sorted)
        for (int i = low + 1; i <= n; i++)
        {
            int value = arr[i];
            int j = i;

            // find index `j` within the sorted subset `arr[0…i-1]`
            // where element `arr[i]` belongs
            while (j > low && arr[j - 1] > value)
            {
                arr[j] = arr[j - 1];
                j--;
            }

            // note that subarray `arr[j…i-1]` is shifted to
            // the right by one position, i.e., `arr[j+1…i]`

            arr[j] = value;
        }
    }

    public static int partition(int[] a, int low, int high)
    {
        // Pick the rightmost element as a pivot from the array
        int pivot = a[high];

        // elements less than the pivot will be pushed to the left of `pIndex`
        // elements more than the pivot will be pushed to the right of `pIndex`
        // equal elements can go either way
        int pIndex = low;

        // each time we find an element less than or equal to the pivot,
        // `pIndex` is incremented, and that element would be placed
        // before the pivot.
        for (int i = low; i < high; i++)
        {
            if (a[i] <= pivot)
            {
                int temp = a[i];
                a[i] = a[pIndex];
                a[pIndex] = temp;

                pIndex++;
            }
        }

        // swap `pIndex` with pivot
        int temp = a[high];
        a[high] = a[pIndex];
        a[pIndex] = temp;

        // return `pIndex` (index of the pivot element)
        return pIndex;
    }

    public static void quicksort(int[] a, int low, int high)
    {
        // base condition
        if (low >= high) {
            return;
        }

        // rearrange elements across pivot
        int pivot = partition(a, low, high);

        // recur on subarray containing elements less than the pivot
        quicksort(a, low, pivot - 1);

        // recur on subarray containing elements more than the pivot
        quicksort(a, pivot + 1, high);
    }

    public static void optimizedQuicksort(int[] A, int low, int high)
    {
        while (low < high)
        {
            // switch to insertion sort if the size is 10 or smaller
            if (high - low < 10)
            {
                insertionSort(A, low, high);
                break;
            }
            else {
                int pivot = partition(A, low, high);

                // tail call optimizations – recur on the smaller subarray
                if (pivot - low < high - pivot)
                {
                    optimizedQuicksort(A, low, pivot - 1);
                    low = pivot + 1;
                }
                else {
                    optimizedQuicksort(A, pivot + 1, high);
                    high = pivot - 1;
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int[] arr = new int[N];

        // to measure the time taken by optimized and non-optimized Quicksort
        long begin, end;
        long t1 = 0, t2 = 0;

        // perform Quicksort NUM times and take an average
        for (int i = 0; i < NUM; i++)
        {
            // generate random input
            Arrays.fill(arr, new Random().nextInt());
            int[] dup = Arrays.copyOf(arr, N);

            // Perform non-optimized Quicksort on the array

            begin = System.nanoTime();
            quicksort(arr, 0, N - 1);
            end = System.nanoTime();

            // calculate the time taken by non-optimized Quicksort
            t1 += (end - begin);

            // Perform optimized Quicksort on the duplicate array
            begin = System.nanoTime();
            optimizedQuicksort(dup, 0, N - 1);
            end = System.nanoTime();

            // calculate the time taken by optimized Quicksort
            t2 += (end - begin);
        }

        System.out.println("The average time taken by the non-optimized Quicksort: " +
                t1/NUM + "ns");
        System.out.println("The average time taken by the optimized Quicksort: " +
                t2/NUM + "ns");
    }
}
```

The optimal cut-off for switching from Quicksort to Insertion sort is taken as 10 in the above program. As demonstrated by running the optimized and non-optimized Quicksort 10 times on 1 million elements (in C++ version) and taking an average of time taken by each, we can say that the optimized version is much faster than the non-optimized Quicksort.

Note if the input contains many repeated elements, Quicksort exhibits poor performance even with optimizations discussed above. We can use an alternative linear-time partition routine (sometimes called the Dutch national flag problem) to solve this problem that separates the values into three groups: values less than the pivot, values equal to the pivot, and values greater than the pivot. We have discussed this approach [here](https://techiedelight.com/quicksort-using-dutch-national-flag-algorithm/).

**References:**

1\. <https://en.wikipedia.org/wiki/Quicksort> 2\. <https://en.wikipedia.org/wiki/Hybrid_algorithm>

Also See:

> [Introsort Algorithm – Overview and C++ Implementation](https://www.techiedelight.com/introsort-algorithm/ "Introsort Algorithm – Overview and C++ Implementation")

> [Quicksort algorithm using Hoare’s partitioning scheme](https://www.techiedelight.com/quick-sort-using-hoares-partitioning-scheme/ "Quicksort algorithm using Hoare’s partitioning scheme")

> [How to Boost QuickSort Performance?](https://www.techiedelight.com/boost-quicksort-performance/ "How to Boost QuickSort Performance?")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 67

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
