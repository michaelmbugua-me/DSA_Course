# Bubble Sort Algorithm – Iterative & Recursive | C, Java, Python

> Source: https://www.techiedelight.com/bubble-sort-iterative-recursive/

Given an integer array, sort it using the bubble sort algorithm.

## Bubble Sort Overview

Bubble sort is a stable, [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) named for smaller or larger elements “bubble” to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even compared to [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/), and is not recommended for large input.

The only significant advantage that bubble sort has over most other implementations, even [Quicksort](https://techiedelight.com/quicksort/), but not insertion sort, is the ability to detect if the list is already sorted. When the list is already sorted (best-case), bubble sort runs in linear time.

## How Bubble Sort works?

Each pass of bubble sort steps through the list to be sorted compares each pair of adjacent items and swaps them if they are in the wrong order. _At the end of each pass, the next largest element will “Bubble” up to its correct position._ These passes through the list are repeated until no swaps are needed, which indicates that the list is sorted. In the worst-case, we might end up making an `n-1` pass, where `n` is the input size.

**__ 3 5 8 4 1 9 -2 ** **_pass 1_ 3 5 4 1 8 -2 9** **_pass 2_ 3 4 1 5 -2 8 9** **_pass 3_ 3 1 4 -2 5 8 9** **_pass 4_ 1 3 -2 4 5 8 9** **_pass 5_ 1 -2 3 4 5 8 9** **_pass 6_ -2  1 3 4 5 8 9**

A detailed illustration of how each pass works can be seen [here](https://en.wikipedia.org/wiki/Bubble_sort#Step-by-step_example).

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

## Insertion Sort Implementation

Following is an iterative implementation of the bubble sort algorithm in C, Java, and Python. The implementation can be easily optimized by observing that the `n'th` pass finds the `n'th` largest element and puts it in its final place. So, the inner loop can avoid looking at the last `n-1` items when running for the `n'th` time. Another optimization is to stop the algorithm when the inner loop didn’t do any swap.

```c
#include <stdio.h>

// Utility function to swap values at two indices in an array
void swap(int arr[], int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Function to print `n` elements of array `arr`
void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}

// Function to perform bubble sort on a given array `arr[]`
void bubbleSort(int arr[], int n)
{
    // `n-1` passes
    for (int k = 0; k < n - 1; k++)
    {
        // last `k` items are already sorted, so the inner loop can
        // avoid looking at the last `k` items
        for (int i = 0; i < n - 1 - k; i++)
        {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }

        // the algorithm can be terminated if the inner loop didn't do any swap
    }
}

int main(void)
{
    int arr[] = { 3, 5, 8, 4, 1, 9, -2 };
    int n = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, n);
    printArray(arr, n);

    return 0;
}
```

**Output:** -2 1 3 4 5 8 9

##

```java
import java.util.Arrays;

class Main
{
    // Utility function to swap values at two indices in the array
    public static void swap(int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Function to perform bubble sort on a given array `arr[]`
    public static void bubbleSort(int[] arr)
    {
        // `n-1` passes where `n` is the array's length
        for (int k = 0; k < arr.length - 1; k++)
        {
            // last `k` items are already sorted, so the inner loop can
            // avoid looking at the last `k` items
            for (int i = 0; i < arr.length - 1 - k; i++)
            {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                }
            }

            // the algorithm can be terminated if the inner loop
            // didn't do any swap
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 3, 5, 8, 4, 1, 9, -2 };

        bubbleSort(arr);

        // print the sorted array
        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
# Utility function to swap values at two indices in the list
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Function to perform bubble sort on a list
def bubbleSort(A):

    # `len(A)-1` passes
    for k in range(len(A) - 1):

        # last `k` items are already sorted, so the inner loop can
        # avoid looking at the last `k` items
        for i in range(len(A) - 1 - k):
            if A[i] > A[i + 1]:
                swap(A, i, i + 1)

    # the algorithm can be terminated if the inner loop didn't do any swap

if __name__ == '__main__':

    A = [3, 5, 8, 4, 1, 9, -2]

    bubbleSort(A)

    # print the sorted list
    print(A)
```

The bubble sort algorithm can be implemented recursively as well. Following is the recursive implementation of the bubble sort algorithm in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to swap values at two indices in an array
void swap(int arr[], int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Function to print `n` elements of array `arr`
void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}

// Recursive function to perform bubble sort on subarray `arr[i…n]`
void bubbleSort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        if (arr[i] > arr[i + 1]) {
            swap(arr, i, i + 1);
        }
    }

    if (n - 1 > 1) {
        bubbleSort(arr, n - 1);
    }
}

int main(void)
{
    int arr[] = { 3, 5, 8, 4, 1, 9, -2 };
    int n = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, n);
    printArray(arr, n);

    return 0;
}
```

**Output:** -2 1 3 4 5 8 9

##

```java
import java.util.Arrays;

class Main
{
    // Utility function to swap values at two indices in the array
    public static void swap(int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Recursive function to perform bubble sort on subarray `arr[i…n]`
    public static void bubbleSort(int[] arr, int n)
    {
        for (int i = 0; i < n - 1; i++)
        {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }

        if (n - 1 > 1) {
            bubbleSort(arr, n - 1);
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 3, 5, 8, 4, 1, 9, -2 };

        bubbleSort(arr, arr.length);

        // print the sorted array
        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
# Utility function to swap values at two indices in the list
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Recursive function to perform bubble sort on sublist `A[i…n]`
def bubbleSort(A, n):

    for i in range(n - 1):
        if A[i] > A[i + 1]:
            swap(A, i, i + 1)

    if n - 1 > 1:
        bubbleSort(A, n - 1)

if __name__ == '__main__':

    A = [ 3, 5, 8, 4, 1, 9, -2 ]

    bubbleSort(A, len(A))

    # print the sorted list
    print(A)
```

## Insertion Sort Performance

The worst-case time complexity of bubble sort is O(n2), where `n` is the size of the input. The worst case happens when the array is reverse sorted. The best-case time complexity of bubble sort is O(n). The best case happens when the array is already sorted, and the algorithm is modified to stop running when the inner loop didn’t do any swap. The optimized implementation can be seen [here](https://techiedelight.com/compiler/?run=KekcmH).

The auxiliary space used by the iterative version is O(1) and O(n) by the recursive version for the call stack.

**References:** <https://en.wikipedia.org/wiki/Bubble_sort>
