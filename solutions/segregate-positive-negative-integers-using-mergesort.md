# Segregate positive and negative integers using merge sort

> Source: https://www.techiedelight.com/segregate-positive-negative-integers-using-mergesort/

Given an array of positive and negative integers, segregate them without changing the relative order of elements. The output should contain all positive numbers follow negative numbers while maintaining the same relative ordering.

For example,

**Input:** [9, -3, 5, -2, -8, -6, 1, 3] **Output:** [-3, -2, -8, -6, 9, 5, 1, 3]

> 

In the [previous post](https://techiedelight.com/positive-and-negative-integers-segregate/), we discussed how to segregate positive and negative integers in linear time and constant space using [Quicksort’s partitioning logic](https://techiedelight.com/quicksort/). The problem with this approach is that it changes the relative order of elements. This post will segregate positive and negative integers while maintaining their relative order using the [merge sort algorithm](https://techiedelight.com/merge-sort/).

The idea is simple. While merging the left– and right– subarray, merge in a way that negative elements of both left– and right– subarrays are copied first, followed by positive elements of left– and right– subarrays. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Merge two subarrays, `arr[low… mid]` and `arr[mid+1… high]`,
// such that all positive numbers follow negative numbers
void merge(int arr[], int aux[], int low, int mid, int high)
{
    int k = low;

    // copy negative elements from the left subarray
    for (int i = low; i <= mid; i++)
    {
        if (arr[i] < 0) {
            aux[k++] = arr[i];
        }
    }

    // copy negative elements from the right subarray
    for (int j = mid + 1; j <= high; j++)
    {
        if (arr[j] < 0) {
            aux[k++] = arr[j];
        }
    }

    // copy positive elements from the left subarray
    for (int i = low; i <= mid; i++)
    {
        if (arr[i] >= 0) {
            aux[k++] = arr[i];
        }
    }

    // copy positive elements from the right subarray
    for (int j = mid + 1; j <= high; j++)
    {
        if (arr[j] >= 0) {
            aux[k++] = arr[j];
        }
    }

    // copy back to the original array to reflect the relative order
    for (int i = low; i <= high; i++) {
        arr[i] = aux[i];
    }
}

// Segregate positive and negative integers using a mergesort-like routine
void partition(int arr[], int aux[], int low, int high)
{
    // base case
    if (high <= low) {
        return;
    }

    // find midpoint
    int mid = (low + ((high - low) >> 1));

    partition(arr, aux, low, mid);          // split/merge left half
    partition(arr, aux, mid + 1, high);     // split/merge right half

    merge(arr, aux, low, mid, high);        // join the two half runs
}

int main()
{
    int arr[] = { 9, -3, 5, -2, -8, -6, 1, 3 };
    int n = sizeof(arr)/sizeof(arr[0]);

    int aux[n];
    for (int i = 0; i < n; i++) {
        aux[i] = arr[i];
    }

    partition(arr, aux, 0, n - 1);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

**Output:** -3 -2 -8 -6 9 5 1 3

##

```java
import java.util.Arrays;

class Main
{
    // Merge two subarrays, `arr[low… mid]` and `arr[mid+1… high]`,
    // such that all positive numbers follow negative numbers
    public static void merge(int[] arr, int[] aux, int low, int mid, int high)
    {
        int k = low;

        // copy negative elements from the left subarray
        for (int i = low; i <= mid; i++)
        {
            if (arr[i] < 0) {
                aux[k++] = arr[i];
            }
        }

        // copy negative elements from the right subarray
        for (int j = mid + 1; j <= high; j++)
        {
            if (arr[j] < 0) {
                aux[k++] = arr[j];
            }
        }

        // copy positive elements from the left subarray
        for (int i = low; i <= mid; i++)
        {
            if (arr[i] >= 0) {
                aux[k++] = arr[i];
            }
        }

        // copy positive elements from the right subarray
        for (int j = mid + 1; j <= high; j++)
        {
            if (arr[j] >= 0) {
                aux[k++] = arr[j];
            }
        }

        // copy back to the original array to reflect sorted order
        for (int i = low; i <= high; i++) {
            arr[i] = aux[i];
        }
    }

    // Segregate positive and negative integers using a mergesort-like routine
    public static void partition(int[] arr, int[] aux, int low, int high)
    {
        // Base case
        if (high <= low) {
            return;
        }

        // find midpoint
        int mid = (low + ((high - low) >> 1));

        partition(arr, aux, low, mid);          // split/merge left half
        partition(arr, aux, mid + 1, high);     // split/merge right half

        merge(arr, aux, low, mid, high);        // join the two half runs
    }

    public static void main(String[] args)
    {
        int[] arr = { 9, -3, 5, -2, -8, -6, 1, 3 };
        int[] aux = Arrays.copyOf(arr, arr.length);

        partition(arr, aux, 0, arr.length - 1);

        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
# Merge two sublists, `A[low… mid]` and `A[mid+1… high]`,
# such that all positive numbers follow negative numbers
def merge(A, aux, low, mid, high):

    k = low

    # copy negative elements from the left sublist
    for i in range(low, mid + 1):
        if A[i] < 0:
            aux[k] = A[i]
            k = k + 1

    # copy negative elements from the right sublist
    for j in range(mid + 1, high + 1):
        if A[j] < 0:
            aux[k] = A[j]
            k = k + 1

    # copy positive elements from the left sublist
    for i in range(low, mid + 1):
        if A[i] >= 0:
            aux[k] = A[i]
            k = k + 1

    # copy positive elements from the right sublist
    for j in range(mid + 1, high + 1):
        if A[j] >= 0:
            aux[k] = A[j]
            k = k + 1

    # copy back to the original list to reflect sorted order
    for i in range(low, high + 1):
        A[i] = aux[i]

# Segregate positive and negative integers using a mergesort-like routine
def partition(A, aux, low, high):

    # Base case
    if high <= low:
        return

    # find midpoint
    mid = low + ((high - low) >> 1)

    partition(A, aux, low, mid)         # split/merge left half
    partition(A, aux, mid + 1, high)    # split/merge right half

    merge(A, aux, low, mid, high)       # join the two half runs

if __name__ == '__main__':

    A = [9, -3, 5, -2, -8, -6, 1, 3]
    aux = A.copy()

    partition(A, aux, 0, len(A) - 1)
    print(A)
```

The time complexity of this solution would be the same as merge sort O(n.log(n)) and requires O(n) extra space, where `n` is the size of the input.

Please note that a linear time straightforward solution exists to solve this problem. The objective of this article is to demonstrate the [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) approach.

**Exercise:** Modify the solution so that positive numbers will come first.

Also See:

> [Segregate positive and negative integers in linear time](https://www.techiedelight.com/positive-and-negative-integers-segregate/ "Segregate positive and negative integers in linear time")

> [Merge Sort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/merge-sort/ "Merge Sort Algorithm – C++, Java, and Python Implementation")

> [Iterative Merge Sort Algorithm (Bottom-up Merge Sort)](https://www.techiedelight.com/iterative-merge-sort-algorithm-bottom-up/ "Iterative Merge Sort Algorithm \(Bottom-up Merge Sort\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 187

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
