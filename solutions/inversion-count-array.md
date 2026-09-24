# Inversion count of an array

> Source: https://www.techiedelight.com/inversion-count-array/

Given an array, find the total number of inversions of it. If `(i < j)` and `(A[i] > A[j])`, then pair `(i, j)` is called an inversion of an array `A`. We need to count all such pairs in the array.

For example,

**Input:** A[] = [1, 9, 6, 4, 5] **Output:** The inversion count is 5 There are 5 inversions in the array: (9, 6), (9, 4), (9, 5), (6, 4), (6, 5)

> 

## 1\. Brute-Force Solution

A simple solution would be for each array element count all elements less than it to its right and add the count to output. The complexity of this solution is O(n2), where `n` is the size of the input.

```c
#include <stdio.h>

// Function to find inversion count of a given array
int findInversionCount(int arr[], int n)
{
    int inversionCount = 0;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (arr[i] > arr[j]) {
                inversionCount++;
            }
        }
    }
    return inversionCount;
}

int main()
{
    int arr[] = { 1, 9, 6, 4, 5 };
    int N = sizeof(arr)/sizeof(arr[0]);

    printf("The inversion count is %d", findInversionCount(arr, N));

    return 0;
}
```

**Output:** The inversion count is 5

##

```java
class Main
{
    // Function to find inversion count of a given array
    public static int findInversionCount(int[] arr)
    {
        int inversionCount = 0;

        for (int i = 0; i < arr.length - 1; i++)
        {
            for (int j = i + 1; j < arr.length; j++)
            {
                if (arr[i] > arr[j]) {
                    inversionCount++;
                }
            }
        }

        return inversionCount;
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 9, 6, 4, 5 };

        System.out.println("The inversion count is " + findInversionCount(arr));
    }
}
```

##

```python3
# Function to find inversion count of a given list
def findInversionCount(A):

    inversionCount = 0
    for i in range(len(A) - 1):
        for j in range(i + 1, len(A)):
            if A[i] > A[j]:
                inversionCount = inversionCount + 1

    return inversionCount

if __name__ == '__main__':

    A = [1, 9, 6, 4, 5]
    print("Inversion count is", findInversionCount(A))
```

## 2\. Using Merge Sort

This is a classic problem that can be solved by [merge sort algorithm](https://techiedelight.com/merge-sort/). Basically, for each array element, count all elements more than it to its left and add the count to the output. This whole magic happens inside the merge function of merge sort.

Let’s consider two subarrays involved in the merge process:

The implementation can be seen below in C, Java, and Python:

```c
#include <stdio.h>

// Merge two sorted subarrays `arr[low … mid]` and `arr[mid+1 … high]`
int Merge(int arr[], int aux[], int low, int mid, int high)
{
    int k = low, i = low, j = mid + 1;
    int inversionCount = 0;

    // while there are elements in the left and right runs
    while (i <= mid && j <= high)
    {
        if (arr[i] <= arr[j]) {
            aux[k++] = arr[i++];
        }
        else {
            aux[k++] = arr[j++];
            inversionCount += (mid - i + 1);    // NOTE
        }
    }

    // copy remaining elements
    while (i <= mid) {
        aux[k++] = arr[i++];
    }

    /* no need to copy the second half (since the remaining items
       are already in their correct position in the temporary array) */

    // copy back to the original array to reflect sorted order
    for (int i = low; i <= high; i++) {
        arr[i] = aux[i];
    }

    return inversionCount;
}

// Sort array `arr[low…high]` using auxiliary array `aux`
int MergeSort(int arr[], int aux[], int low, int high)
{
    // base case
    if (high <= low) {        // if run size <= 1
        return 0;
    }

    // find midpoint
    int mid = (low + ((high - low) >> 1));
    int inversionCount = 0;

    // recursively split runs into two halves until run size <= 1,
    // then merges them and return up the call chain

    // split/merge left half
    inversionCount += MergeSort(arr, aux, low, mid);

    // split/merge right half
    inversionCount += MergeSort(arr, aux, mid + 1, high);

    // merge the two half runs
    inversionCount += Merge(arr, aux, low, mid, high);

    return inversionCount;
}

int main()
{
    int arr[] = { 1, 9, 6, 4, 5 };

    int N = sizeof(arr)/sizeof(arr[0]);

    int aux[N];
    for (int i = 0; i < N; i++) {
        aux[i] = arr[i];
    }

    // get the inversion count by performing merge sort on arr
    printf("The inversion count is %d", MergeSort(arr, aux, 0, N - 1));

    return 0;
}
```

**Output:** The inversion count is 5

##

```java
import java.util.Arrays;

class Main
{
    // Merge two sorted subarrays `arr[low … mid]` and `arr[mid+1 … high]`
    public static int merge(int[] arr, int[] aux, int low, int mid, int high)
    {
        int k = low, i = low, j = mid + 1;
        int inversionCount = 0;

        // while there are elements in the left and right runs
        while (i <= mid && j <= high)
        {
            if (arr[i] <= arr[j]) {
                aux[k++] = arr[i++];
            }
            else {
                aux[k++] = arr[j++];
                inversionCount += (mid - i + 1);    // NOTE
            }
        }

        // copy remaining elements
        while (i <= mid) {
            aux[k++] = arr[i++];
        }

        /* no need to copy the second half (since the remaining items
           are already in their correct position in the temporary array) */

        // copy back to the original array to reflect sorted order
        for (i = low; i <= high; i++) {
            arr[i] = aux[i];
        }

        return inversionCount;
    }

    // Sort array `arr[low…high]` using auxiliary array `aux`
    public static int mergesort(int[] arr, int[] aux, int low, int high)
    {
        // base case
        if (high <= low) {        // if run size <= 1
            return 0;
        }

        // find midpoint
        int mid = (low + ((high - low) >> 1));
        int inversionCount = 0;

        // recursively split runs into two halves until run size <= 1,
        // then merges them and return up the call chain

        // split/merge left half
        inversionCount += mergesort(arr, aux, low, mid);

        // split/merge right half
        inversionCount += mergesort(arr, aux, mid + 1, high);

        // merge the two half runs
        inversionCount += merge(arr, aux, low, mid, high);

        return inversionCount;
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 9, 6, 4, 5 };
        int[] aux = Arrays.copyOf(arr, arr.length);

        // get the inversion count by performing merge sort on arr
        System.out.println("The inversion count is " +
                        mergesort(arr, aux, 0, arr.length - 1));
    }
}
```

##

```python3
# Merge two sorted sublists `A[low … mid]` and `A[mid+1 … high]`
def merge(A, aux, low, mid, high):

    k = i = low
    j = mid + 1
    inversionCount = 0

    # while there are elements in the left and right runs
    while i <= mid and j <= high:
        if A[i] <= A[j]:
            aux[k] = A[i]
            i = i + 1
        else:
            aux[k] = A[j]
            j = j + 1
            inversionCount += (mid - i + 1)        # NOTE

        k = k + 1

    # copy remaining elements
    while i <= mid:
        aux[k] = A[i]
        k = k + 1
        i = i + 1

    ''' no need to copy the second half (since the remaining items
        are already in their correct position in the temporary array) '''

    # copy back to the original list to reflect sorted order
    for i in range(low, high + 1):
        A[i] = aux[i]

    return inversionCount

# Sort list `A[low…high]` using auxiliary list `aux`
def mergesort(A, aux, low, high):

    # base case
    if high <= low:        # if run size <= 1
        return 0

    # find midpoint
    mid = low + ((high - low) >> 1)
    inversionCount = 0

    # recursively split runs into two halves until run size <= 1,
    # then merges them and return up the call chain

    inversionCount += mergesort(A, aux, low, mid)       # split/merge left half
    inversionCount += mergesort(A, aux, mid + 1, high)  # split/merge right half
    inversionCount += merge(A, aux, low, mid, high)     # merge the two half runs

    return inversionCount

if __name__ == '__main__':

    A = [1, 9, 6, 4, 5]
    aux = A.copy()

    # get the inversion count by performing merge sort on a list
    print("Inversion count is", mergesort(A, aux, 0, len(A) - 1))
```

The time complexity of the above solution is O(n.log(n)) (same as that of merge sort algorithm), and the auxiliary space used by the program is O(n).
