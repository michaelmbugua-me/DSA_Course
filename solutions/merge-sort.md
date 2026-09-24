# Merge Sort Algorithm – C++, Java, and Python Implementation

> Source: https://www.techiedelight.com/merge-sort/

Given an integer array, sort it using the merge sort algorithm.

## Merge sort Overview

Merge sort is an efficient sorting algorithm that produces a stable sort, which means that if two elements have the same value, they hold the same relative position in the sorted sequence as they did in the input. In other words, the relative order of elements with equal values is preserved in the sorted sequence. Merge sort is a comparison sort, which means that it can sort any input for which a _less-than_ relation is defined.

## How Merge sort works?

Merge sort is a [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) algorithm. Like all divide-and-conquer algorithms, merge sort divides a large array into two smaller subarrays and then recursively sort the subarrays. Basically, two steps are involved in the whole process:

  1. Divide the unsorted array into `n` subarrays, each of size `1` (an array of size `1` is considered sorted).
  2. Repeatedly merge subarrays to produce new sorted subarrays until only `1` subarray is left, which would be our sorted array.

The [following diagram](https://en.wikipedia.org/wiki/File:Merge_sort_algorithm_diagram.svg) represents a top-down view of the recursive merge sort algorithm used to sort an `7`-element integer array:

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is the C, Java, and Python implementation of the merge sort algorithm:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 15

// Merge two sorted subarrays `arr[low … mid]` and `arr[mid+1 … high]`
void Merge(int arr[], int aux[], int low, int mid, int high)
{
    int k = low, i = low, j = mid + 1;

    // while there are elements in the left and right runs
    while (i <= mid && j <= high)
    {
        if (arr[i] <= arr[j]) {
            aux[k++] = arr[i++];
        }
        else {
            aux[k++] = arr[j++];
        }
    }

    // copy remaining elements
    while (i <= mid) {
        aux[k++] = arr[i++];
    }

    // No need to copy the second half (since the remaining items
    // are already in their correct position in the auxiliary array)

    // copy back to the original array to reflect sorted order
    for (int i = low; i <= high; i++) {
        arr[i] = aux[i];
    }
}

// Sort array `arr[low…high]` using auxiliary array `aux`
void mergesort(int arr[], int aux[], int low, int high)
{
    // base case
    if (high <= low) {        // if run size <= 1
        return;
    }

    // find midpoint
    int mid = (low + ((high - low) >> 1));

    // recursively split runs into two halves until run size <= 1,
    // then merge them and return up the call chain

    mergesort(arr, aux, low, mid);          // split/merge left half
    mergesort(arr, aux, mid + 1, high);     // split/merge right half

    Merge(arr, aux, low, mid, high);        // merge the two half runs.
}

// Function to check if arr is sorted in ascending order or not
int isSorted(int arr[])
{
    int prev = arr[0];
    for (int i = 1; i < N; i++)
    {
        if (prev > arr[i])
        {
            printf("MergeSort Fails!!");
            return 0;
        }
        prev = arr[i];
    }

    return 1;
}

// Implementation of merge sort algorithm in C
int main(void)
{
    int arr[N], aux[N];
    srand(time(NULL));

    // generate random input of integers
    for (int i = 0; i < N; i++) {
        aux[i] = arr[i] = (rand() % 100) - 50;
    }

    // sort array `arr` using auxiliary array `aux`
    mergesort(arr, aux, 0, N - 1);

    if (isSorted(arr))
    {
        for (int i = 0; i < N; i++) {
            printf("%d ", arr[i]);
        }
    }

    return 0;
}
```

**Output:** -50 -41 -34 -23 -21 -11 5 9 10 19 26 33 35 40 49

##

```java
import java.util.Arrays;

class Main
{
    // Merge two sorted subarrays `arr[low … mid]` and `arr[mid+1 … high]`
    public static void merge(int[] arr, int[] aux, int low, int mid, int high)
    {
        int k = low, i = low, j = mid + 1;

        // while there are elements in the left and right runs
        while (i <= mid && j <= high)
        {
            if (arr[i] <= arr[j]) {
                aux[k++] = arr[i++];
            }
            else {
                aux[k++] = arr[j++];
            }
        }

        // copy remaining elements
        while (i <= mid) {
            aux[k++] = arr[i++];
        }

        // No need to copy the second half (since the remaining items
        // are already in their correct position in the auxiliary array)

        // copy back to the original array to reflect sorted order
        for (i = low; i <= high; i++) {
            arr[i] = aux[i];
        }
    }

    // Sort array `arr[low…high]` using auxiliary array `aux`
    public static void mergesort(int[] arr, int[] aux, int low, int high)
    {
        // base case
        if (high <= low) {        // if run size <= 1
            return;
        }

        // find midpoint
        int mid = (low + ((high - low) >> 1));

        // recursively split runs into two halves until run size <= 1,
        // then merge them and return up the call chain

        mergesort(arr, aux, low, mid);          // split/merge left half
        mergesort(arr, aux, mid + 1, high);     // split/merge right half

        merge(arr, aux, low, mid, high);        // merge the two half runs
    }

    // Function to check if arr is sorted in ascending order or not
    public static boolean isSorted(int[] arr)
    {
        int prev = arr[0];
        for (int i = 1; i < arr.length; i++)
        {
            if (prev > arr[i])
            {
                System.out.println("MergeSort Fails!!");
                return false;
            }
            prev = arr[i];
        }

        return true;
    }

    // Implementation of merge sort algorithm in Java
    public static void main(String[] args)
    {
        int[] arr = { 12, 3, 18, 24, 0, 5, -2 };
        int[] aux = Arrays.copyOf(arr, arr.length);

        // sort array `arr` using auxiliary array `aux`
        mergesort(arr, aux, 0, arr.length - 1);

        if (isSorted(arr)) {
            System.out.println(Arrays.toString(arr));
        }
    }
}
```

##

```python3
# Merge two sorted sublists `A[low … mid]` and `A[mid+1 … high]`
def merge(A, aux, low, mid, high):

    k = low
    i = low
    j = mid + 1

    # while there are elements in the left and right runs
    while i <= mid and j <= high:

        if A[i] <= A[j]:
            aux[k] = A[i]
            k = k + 1
            i = i + 1
        else:
            aux[k] = A[j]
            k = k + 1
            j = j + 1

    # copy remaining elements
    while i <= mid:
        aux[k] = A[i]
        k = k + 1
        i = i + 1

    # No need to copy the second half (since the remaining items
    # are already in their correct position in the auxiliary array)

    # copy back to the original list to reflect sorted order
    for i in range(low, high + 1):
        A[i] = aux[i]

# Sort list `A[low…high]` using auxiliary list aux
def mergesort(A, aux, low, high):

    # base case
    if high <= low:                     # if run size <= 1
        return

    # find midpoint
    mid = (low + ((high - low) >> 1))

    # recursively split runs into two halves until run size <= 1,
    # then merge them and return up the call chain

    mergesort(A, aux, low, mid)         # split/merge left half
    mergesort(A, aux, mid + 1, high)    # split/merge right half

    merge(A, aux, low, mid, high)       # merge the two half runs

# Function to check if `A` is sorted in ascending order or not
def isSorted(A):

    prev = A[0]
    for i in range(1, len(A)):
        if prev > A[i]:
            print("MergeSort Fails!!")
            return False

        prev = A[i]

    return True

# Implementation of merge sort algorithm in Python
if __name__ == '__main__':

    A = [12, 3, 18, 24, 0, 5, -2]
    aux = A.copy()

    # sort list `A` using auxiliary list `aux`
    mergesort(A, aux, 0, len(A) - 1)

    if isSorted(A):
        print(A)
```

## Merge Sort Performance

The worst-case time complexity of merge sort is O(n.log(n)), where `n` is the size of the input. The recurrence relation is:

`T(n) = 2T(n/2) + cn = O(n.log(n))`

The recurrence basically summarizes the merge sort algorithm – Sort two lists of half the original list’s size and add the `n` steps taken to merge the resulting two lists.

The auxiliary space required by the merge sort algorithm is O(n) for the call stack.

**Also See:**

> [Iterative Merge Sort Algorithm (Bottom-up Merge Sort)](https://techiedelight.com/iterative-merge-sort-algorithm-bottom-up/)

> [External Merge Sort Algorithm](https://techiedelight.com/external-merge-sort/)

**References:** <https://en.wikipedia.org/wiki/Merge_sort>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 229

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Easy](https://www.techiedelight.com/Tags/easy/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
