# Counting Sort Algorithm – C, Java, and Python Implementation

> Source: https://www.techiedelight.com/counting-sort-algorithm-implementation/

Given a collection of `n` items, each of which has a non-negative integer key whose maximum value is at most `k`, effectively sort it using the counting sort algorithm.

> [Practice this algorithm](https://techiedelight.com/?problem=CountingSort)

## Overview

Counting sort is an integer-based sorting algorithm for sorting an array whose keys lie between a specific range. It counts the total number of elements with each distinct key value and then uses those counts to determine the positions of each key value in the output.

We can use counting sort to find the most frequent letter in a file or sort a limited range array efficiently. It is often used as a subroutine in the radix sorting algorithm, and because of this, counting sort needs to be a stable sort.

## Algorithm

The algorithm loops over the items, computing a histogram of each key’s number of times within the input collection. It then performs a prefix sum computation to determine, for each key, the starting position in the output array of the items having that key. Finally, it loops over the items again, moving each item into its sorted position in the output array.

The algorithm can be implemented as below in C, Java, and Python. In the below code:

  1. After the first for-loop, `freq[i]` stores the total number of items with a key equal to `i`.
  2. After the second for-loop, it instead stores the total number of items with a key less than `i`, which is the same as the first index at which an item with key `i` should be stored in the output array.
  3. Throughout the third loop, `freq[i]` always stores the next position in the output array into which an item with key `i` should be stored, so each item is moved to its correct position in the output array.

```c
#include <stdio.h>
#include <string.h>

/*
 `arr` ——> the input integer array to be sorted
   `n` ——> the length of the input array
   `k` ——> a number such that all integers are in range `0…k-1`
*/
void countsort(int arr[], int n, int k)
{
    // create an integer array of size `n` to store the sorted array
    int output[n];

    // create an integer array of size `k + 1`, initialized by all zero
    int freq[k + 1];
    memset(freq, 0, sizeof(freq));

    // 1. Using the value of each item in the input array as an index,
    // store each integer's count in `freq[]`
    for (int i = 0; i < n; i++) {
        freq[arr[i]]++;
    }

    // 2. Calculate the starting index for each integer
    int total = 0;
    for (int i = 0; i < k + 1; i++)
    {
        int oldCount = freq[i];
        freq[i] = total;
        total += oldCount;
    }

    // 3. Copy to the output array, preserving the order of inputs with equal keys
    for (int i = 0; i < n; i++)
    {
        output[freq[arr[i]]] = arr[i];
        freq[arr[i]]++;
    }

    // copy the output array back to the input array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

int main()
{
    int arr[] = { 4, 2, 10, 10, 1, 4, 2, 1, 10 };
    int n = sizeof(arr) / sizeof(arr[0]);

    // range of array elements
    int k = 10;

    countsort(arr, n, k);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

**Output:** 1 1 2 2 4 4 10 10 10

##

```java
import java.util.Arrays;

class Main
{
    /*
     `arr` ——> the input integer array to be sorted
       `k` ——> a number such that all integers are in range `0…k-1`
    */
    public static void countsort(int[] arr, int k)
    {
        // create an integer array of size `n` to store the sorted array
        int[] output = new int[arr.length];

        // create an integer array of size `k + 1`, initialized by all zero
        int[] freq = new int[k + 1];

        // using the value of each item in the input array as an index,
        // store each integer's count in `freq[]`
        for (int i: arr) {
            freq[i]++;
        }

        // calculate the starting index for each integer
        int total = 0;
        for (int i = 0; i < k + 1; i++)
        {
            int oldCount = freq[i];
            freq[i] = total;
            total += oldCount;
        }

        // copy to the output array, preserving the order of inputs with equal keys
        for (int i: arr)
        {
            output[freq[i]] = i;
            freq[i]++;
        }

        // copy the output array back to the input array
        Arrays.setAll(arr, i -> output[i]);
    }

    public static void main(String[] args)
    {
        int[] arr = { 4, 2, 10, 10, 1, 4, 2, 1, 10 };

        // range of array elements
        int k = 10;

        countsort(arr, k);
        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
'''
 `A` ——> the input list of integers to be sorted
 `k` ——> a number such that all integers are in range `0…k-1`
'''

def countsort(A, k):

    # create an integer list of size `n` to store the sorted list
    output = [0] * len(A)

    # create an integer list of size `k + 1`, initialized by all zero
    freq = [0] * (k + 1)

    # using the value of each item in the input list as an index,
    # store each integer's count in `freq[]`
    for i in A:
        freq[i] = freq[i] + 1

    # calculate the starting index for each integer
    total = 0
    for i in range(k + 1):
        oldCount = freq[i]
        freq[i] = total
        total += oldCount

    # copy to the output list, preserving the order of inputs with equal keys
    for i in A:
        output[freq[i]] = i
        freq[i] = freq[i] + 1

    # copy the output list back to the input list
    for i in range(len(A)):
        A[i] = output[i]

if __name__ == '__main__':

    A = [4, 2, 10, 10, 1, 4, 2, 1, 10]

    # range of list elements
    k = 10

    countsort(A, k)
    print(A)
```

Unlike other sorting algorithms like [Insertion sort](https://techiedelight.com/insertion-sort-iterative-recursive/), [Selection sort](https://techiedelight.com/selection-sort-iterative-recursive/), [Merge sort](https://techiedelight.com/merge-sort/), [Quicksort](https://techiedelight.com/quicksort/), etc., Counting sort is not a comparison sort. It uses key values as indices into an array, as evident from the above code.

Following is the simpler version of counting sort that doesn’t produce a stable sort, i.e., the relative order of items with equal keys is not preserved anymore.

```c
#include <stdio.h>
#include <string.h>

/*
 `arr` ——> the input integer array to be sorted
   `n` ——> the length of the input array
   `k` ——> a number such that all integers are in range `0…k-1`
*/
void countsort(int arr[], int n, int k)
{
    // create an integer array of size `k + 1` to store each integer's count
    // in the input array
    int freq[k + 1];

    // initialize the integer array by 0
    memset(freq, 0, sizeof(freq));

    // using the value of each item in the input array as an index,
    // store each integer's count in `freq[]`
    for (int i = 0; i < n; i++) {
        freq[arr[i]]++;
    }

    // overwrite the input array with sorted order
    int index = 0;
    for (int i = 0; i < k + 1; i++)
    {
        while (freq[i]--) {
            arr[index++] = i;
        }
    }
}

int main()
{
    int arr[] = { 4, 2, 10, 10, 1, 4, 2, 1, 10 };
    int n = sizeof(arr) / sizeof(arr[0]);

    // specify the range of array elements
    int k = 10;

    countsort(arr, n, k);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

**Output:** 1 1 2 2 4 4 10 10 10

##

```java
import java.util.Arrays;

class Main
{
    /*
     `arr` ——> the input integer array to be sorted
       `k` ——> a number such that all integers are in range `0…k-1`
    */
    public static void countsort(int[] arr, int k)
    {
        // create an integer array of size `k + 1` to store each integer's count
        // in the input array
        int[] freq = new int[k + 1];

        // using the value of each item in the input array as an index,
        // store each integer's count in `freq[]`
        for (int i: arr) {
            freq[i]++;
        }

        // overwrite the input array with sorted order
        int index = 0;
        for (int i = 0; i < k + 1; i++)
        {
            while (freq[i]-- > 0) {
                arr[index++] = i;
            }
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 4, 2, 10, 10, 1, 4, 2, 1, 10 };

        // range of array elements
        int k = 10;

        countsort(arr, k);
        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
'''
 `A` ——> the input list of integers to be sorted
 `k` ——> a number such that all integers are in range `0…k-1`
'''
def countsort(A, k):

    # create an integer list of size `k + 1` to store each integer's count
    # in the input list
    freq = [0] * (k + 1)

    # using the value of each item in the input list as an index,
    # store each integer's count in `freq[]`
    for i in A:
        freq[i] += 1

    # overwrite the input list with sorted order
    index = 0
    for i in range(k + 1):
        while freq[i] > 0:
            A[index] = i
            index += 1
            freq[i] -= 1

if __name__ == '__main__':

    A = [4, 2, 10, 10, 1, 4, 2, 1, 10]

    # range of list elements
    k = 10

    countsort(A, k)
    print(A)
```

## Performance

The time complexity of the counting sort is O(n + k), where `n` is the size of the input and `k` is the input range. Since it uses arrays of length `k+1` and `n`, the total space used by the algorithm is also O(n + k). Counting sort can be highly space-efficient when the range of keys `k` is significantly less than the total number of items `n`, but when variation in keys is significantly greater than the total number of items `k >> n`, counting sort consumes a lot of space.

**Exercise:**

1\. Extend the solution to handle negative integers.

2\. Provide the exact range of keys by calculating the maximum and minimum key values’ difference.

**References:** <https://en.wikipedia.org/wiki/Counting_sort>
