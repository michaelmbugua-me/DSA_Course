# Selection Sort Algorithm – Iterative & Recursive | C, Java, Python

> Source: https://www.techiedelight.com/selection-sort-iterative-recursive/

Given an integer array, sort it using the selection sort algorithm.

## Selection Sort Overview

Selection sort is an unstable, [in-place sorting algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) known for its simplicity. It has performance advantages over more complicated algorithms in certain situations, particularly where the auxiliary memory is limited. It can be implemented as a stable sort and requires O(n2) time to sort `n` items, making it inefficient to use on large lists. Among simple average-case O(n2) algorithms, selection sort almost always outperforms [bubble sort](https://techiedelight.com/bubble-sort-iterative-recursive/) and generally performs worse than the [insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/).

The biggest advantage of using a selection sort is that it does a maximum of `n` swaps (memory write). The insertion sort, on the other hand, does O(n2) number of writes. This can be critical if memory-write operation is significantly more expensive than memory-read operation, such as flash memory, where every write lessens the memory’s lifespan.

## How Selection Sort works?

The idea is to divide the array into two subsets – sorted subset and unsorted subset. Initially, the sorted subset is empty, and the unsorted subset is the entire input list. The algorithm proceeds by finding the smallest _(or largest, depending on sorting order)_ element in the unsorted subset, swapping it with the leftmost unsorted element _(putting it in sorted order)_ , and moving the subset boundaries one element to the right. The following example explains it all:

** 3 5 8 4 1 9 -2** **_i = 0_ -2 5 8 4 1 9 3** **_i = 1_ -2 1 8 4 5 9 3** **_i = 2_ -2 1 3 4 5 9 8** **_i = 3_ -2 1 3 4 5 9 8** **_i = 4_ -2 1 3 4 5 9 8** **_i = 5_ -2 1 3 4 5 8 9**

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

Following is an iterative implementation of the selection sort algorithm in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to swap values at two indices in an array
void swap(int arr[], int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Function to perform selection sort on `arr[]`
void selectionSort(int arr[], int n)
{
    // run `n-1` times
    for (int i = 0; i < n - 1; i++)
    {
        // find the minimum element in the unsorted subarray `[i…n-1]`
        // and swap it with `arr[i]`
        int min = i;

        for (int j = i + 1; j < n; j++)
        {
            // if `arr[j]` is less, then it is the new minimum
            if (arr[j] < arr[min]) {
                min = j;    // update the index of minimum element
            }
        }

        // swap the minimum element in subarray `arr[i…n-1]` with `arr[i]`
        swap(arr, min, i);
    }
}

// Function to print `n` elements of array `arr`
void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}

int main(void)
{
    int arr[] = { 3, 5, 8, 4, 1, 9, -2 };
    int n = sizeof(arr) / sizeof(arr[0]);

    selectionSort(arr, n);
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

    // Function to perform selection sort on `arr[]`
    public static void selectionSort(int[] arr)
    {
        // run `n-1` times, where `n` is array length
        for (int i = 0; i < arr.length - 1; i++)
        {
            // find the minimum element in the unsorted subarray `[i…n-1]`
            // and swap it with `arr[i]`
            int min = i;

            for (int j = i + 1; j < arr.length; j++)
            {
                // if `arr[j]` is less, then it is the new minimum
                if (arr[j] < arr[min]) {
                    min = j;    // update the index of minimum element
                }
            }

            // swap the minimum element in subarray `arr[i…n-1]` with `arr[i]`
            swap(arr, min, i);
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 3, 5, 8, 4, 1, 9, -2 };

        selectionSort(arr);

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

# Function to perform selection sort on a list
def selectionSort(A):

    for i in range(len(A) - 1):

        # find the minimum element in the unsorted sublist `A[i…n-1]`
        # and swap it with `A[i]`
        min = i

        for j in range(i + 1, len(A)):
            # if the `A[j]` element is less, then it is the new minimum
            if A[j] < A[min]:
                min = j        # update the index of minimum element

        # swap the minimum element in sublist `A[i…n-1]` with `A[i]`
        swap(A, min, i)

if __name__ == '__main__':

    A = [3, 5, 8, 4, 1, 9, -2]

    selectionSort(A)

    # print the sorted list
    print(A)
```

Both the worst-case and best-case time complexity of selection sort is O(n2), where `n` is the input size, and it doesn’t require any extra space.

The selection sort algorithm can be implemented recursively. Following is the recursive implementation of the selection sort algorithm in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to swap values at two indices in an array
void swap(int arr[], int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Recursive function to perform selection sort on subarray `arr[i…n-1]`
void selectionSort(int arr[], int i, int n)
{
    // find the minimum element in the unsorted subarray `[i…n-1]`
    // and swap it with `arr[i]`
    int min = i;
    for (int j = i + 1; j < n; j++)
    {
        // if `arr[j]` is less, then it is the new minimum
        if (arr[j] < arr[min]) {
            min = j;    // update the index of minimum element
        }
    }

    // swap the minimum element in subarray `arr[i…n-1]` with `arr[i]`
    swap(arr, min, i);

    if (i + 1 < n) {
        selectionSort(arr, i + 1, n);
    }
}

// Function to print `n` elements of array `arr`
void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}

int main()
{
    int arr[] = { 3, 5, 8, 4, 1, 9, -2 };
    int n = sizeof(arr) / sizeof(arr[0]);

    selectionSort(arr, 0, n);
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

    // Recursive function to perform selection sort on subarray `arr[i…n-1]`
    public static void selectionSort(int[] arr, int i, int n)
    {
        // find the minimum element in the unsorted subarray `[i…n-1]`
        // and swap it with `arr[i]`
        int min = i;
        for (int j = i + 1; j < n; j++)
        {
            // if `arr[j]` is less, then it is the new minimum
            if (arr[j] < arr[min]) {
                min = j;    // update the index of minimum element
            }
        }

        // swap the minimum element in subarray `arr[i…n-1]` with `arr[i]`
        swap(arr, min, i);

        if (i + 1 < n) {
            selectionSort(arr, i + 1, n);
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 3, 5, 8, 4, 1, 9, -2 };

        selectionSort(arr, 0, arr.length);

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

# Recursive function to perform selection sort on sublist `A[i…n-1]`
def selectionSort(A, i, n):

    # find the minimum element in the unsorted sublist `A[i…n-1]`
    # and swap it with `A[i]`
    min = i
    for j in range(i + 1, n):

        # if the `A[j]` element is less, then it is the new minimum
        if A[j] < A[min]:
            min = j            # update the index of minimum element

    # swap the minimum element in sublist `A[i…n-1]` with `A[i]`
    swap(A, min, i)

    if i + 1 < n:
        selectionSort(A, i + 1, n)

if __name__ == '__main__':

    A = [3, 5, 8, 4, 1, 9, -2]

    selectionSort(A, 0, len(A))

    # print the sorted list
    print(A)
```

The time complexity of the selection sort recursive algorithm remains the same as the iterative version. However, the auxiliary space used by the recursive version is O(n) for the call stack.

**References:** <https://en.wikipedia.org/wiki/Selection_sort>
