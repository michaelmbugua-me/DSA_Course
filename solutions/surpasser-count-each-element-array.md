# Find surpasser count for each array element

> Source: https://www.techiedelight.com/surpasser-count-each-element-array/

Given an integer array having distinct elements, find the surpasser count for each element in it. In other words, for each array element, find the total number of elements to its right, which are greater than it.

For example,

**Input:** { 4, 6, 3, 9, 7, 10 } **Output:** { 4, 3, 3, 1, 1, 0 }

> 

A simple solution would be for each array element, count all elements greater than it to its right. The implementation of this approach can be seen [here](https://techiedelight.com/compiler/?run=pqkGMd). It runs in O(n2) time, where `n` is the size of the input.

We can reduce the time complexity to O(n.log(n)) by using [merge sort algorithm](https://techiedelight.com/merge-sort/). The problem is similar to finding the [inversion count of an array](https://techiedelight.com/inversion-count-array/). Since surpasser is just the opposite of inversion, [sort the array in descending order](https://techiedelight.com/sort-array-descending-order-cpp/) and maintain a map to store the surpasser count for each distinct array element.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
#include <cstring>
using namespace std;

// Function to merge two sorted subarrays `arr[low … mid]` and
// `arr[mid+1 … high]`
void merge(int arr[], int aux[], int low, int mid, int high,
            auto &surpasser_count)
{
    int k = low, i = low, j = mid + 1;
    int count = 0;

    // run if there are elements in the left and right runs
    while (i <= mid && j <= high)
    {
        if (arr[i] > arr[j])
        {
            // update surpasser count of `arr[i]`
            surpasser_count[arr[i]] += count;

            aux[k++] = arr[i++];
        }
        else {
            aux[k++] = arr[j++];
            count++;
        }
    }

    // copy remaining elements
    while (i <= mid)
    {
        surpasser_count[arr[i]] += count;
        aux[k++] = arr[i++];
    }

    /* no need to copy the second half (since the remaining items
       are already in their correct position in the temporary array) */

    // copy back to the original array to reflect sorted order
    for (int i = low; i <= high; i++) {
        arr[i] = aux[i];
    }
}

// Function to sort array `arr[low…high]` in descending order
void merge_sort(int arr[], int aux[], int low, int high,
                auto &surpasser_count)
{
    // base case: run size is less than or equal to 1
    if (high <= low) {
        return;
    }

    // find midpoint
    int mid = (low + ((high - low) >> 1));

    // recursively split runs into two halves until run size == 1,
    // merge them, and return up the call chain

    merge_sort(arr, aux, low, mid, surpasser_count);
    merge_sort(arr, aux, mid + 1, high, surpasser_count);

    merge(arr, aux, low, mid, high, surpasser_count);
}

// Function to find the surpasser count for each array element
auto surpasserCount(int const A[], int n)
{
    unordered_map<int, int> surpasser_count;

    // create two copies of the original array
    int aux[n], arr[n];
    memcpy(aux, A, n * sizeof(A[0]));
    memcpy(arr, A, n * sizeof(A[0]));

    // sort array `arr[]` in descending order using auxiliary array aux[]
    merge_sort(arr, aux, 0, n - 1, surpasser_count);

    return surpasser_count;
}

int main()
{
    int arr[] = { 4, 6, 3, 9, 7, 10 };
    int n = sizeof(arr) / sizeof(arr[0]);

    // find the surpasser count for array elements
    unordered_map<int, int> surpasser_count = surpasserCount(arr, n);
    for (int i = 0; i < n; i++) {
        cout << surpasser_count[arr[i]] << " ";
    }

    return 0;
}
```

**Output:** 4 3 3 1 1 0

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to merge two sorted subarrays `arr[low … mid]` and
    // `arr[mid+1 … high]`
    public static void merge(int[] arr, int[] aux, int low, int mid, int high,
                            Map<Integer, Integer> count)
    {
        int k = low, i = low, j = mid + 1;
        int c = 0;

        // run if there are elements in the left and right runs
        while (i <= mid && j <= high)
        {
            if (arr[i] > arr[j])
            {
                // update surpasser count of `arr[i]`
                count.put(arr[i], count.getOrDefault(arr[i], 0) + c);

                aux[k++] = arr[i++];
            }
            else {
                aux[k++] = arr[j++];
                c++;
            }
        }

        // copy remaining elements
        while (i <= mid)
        {
            count.put(arr[i], count.getOrDefault(arr[i], 0) + c);
            aux[k++] = arr[i++];
        }

        /* no need to copy the second half (since the remaining items
           are already in their correct position in the temporary array) */

        // copy back to the original array to reflect sorted order
        while (low <= high)
        {
            arr[low] = aux[low];
            low++;
        }
    }

    // Function to sort array `arr[low…high]` in descending order
    public static void mergesort(int[] arr, int[] aux, int low, int high,
                                Map<Integer, Integer> count)
    {
        // base case: run size is less than or equal to 1
        if (high <= low) {
            return;
        }

        // find midpoint
        int mid = (low + ((high - low) >> 1));

        // recursively split runs into two halves until run size == 1,
        // merge them, and return up the call chain

        mergesort(arr, aux, low, mid, count);
        mergesort(arr, aux, mid + 1, high, count);

        merge(arr, aux, low, mid, high, count);
    }

    // Function to find the surpasser count for each array element
    public static Map<Integer, Integer> getSurpasserCount(int[] A)
    {
        Map<Integer, Integer> count = new HashMap<>();

        // create two copies of the original array
        int[] aux = Arrays.copyOf(A, A.length);
        int[] arr = Arrays.copyOf(A, A.length);

        // sort array `arr[]` in descending order using auxiliary array aux[]
        mergesort(arr, aux, 0, A.length - 1, count);

        return count;
    }

    public static void main(String[] args)
    {
        int[] A = { 4, 6, 3, 9, 7, 10 };

        // find the surpasser count for array elements
        Map<Integer, Integer> surpasserCount = getSurpasserCount(A);

        for (int value: A) {
            System.out.print(surpasserCount.get(value) + " ");
        }
    }
}
```

##

```python3
# Function to merge two sorted sublists `A[low … mid]` and
# `A[mid + 1 … high]`
def merge(A, aux, low, mid, high, count):

    k = i = low
    j = mid + 1
    c = 0

    # run if there are elements in the left and right runs
    while i <= mid and j <= high:

        if A[i] > A[j]:
            # update surpasser count of `A[i]`
            count[A[i]] = count.get(A[i], 0) + c
            aux[k] = A[i]
            i = i + 1
        else:
            aux[k] = A[j]
            j = j + 1
            c = c + 1

        k = k + 1

    # copy remaining elements
    while i <= mid:
        count[A[i]] = count.get(A[i], 0) + c
        aux[k] = A[i]
        k = k + 1
        i = i + 1

    ''' no need to copy the second half (since the remaining items
        are already in their correct position in the temporary array) '''

    # copy back to the original list to reflect sorted order
    for i in range(low, high + 1):
        A[i] = aux[i]

# Function to sort list `A[low…high]` in descending order
def mergesort(A, aux, low, high, count):

    # base case: run size is less than or equal to 1
    if high <= low:
        return

    # find midpoint
    mid = low + ((high - low) >> 1)

    # recursively split runs into two halves until run size == 1,
    # merge them, and return up the call chain

    mergesort(A, aux, low, mid, count)
    mergesort(A, aux, mid + 1, high, count)

    merge(A, aux, low, mid, high, count)

# Function to find the surpasser count for each element of a list
def getSurpasserCount(A):

    count = {}

    # create two copies of the original list
    aux = A.copy()
    A = A.copy()

    # sort the list in descending order using auxiliary space `aux`
    mergesort(A, aux, 0, len(A) - 1, count)

    return count

if __name__ == '__main__':

    A = [4, 6, 3, 9, 7, 10]

    # find the surpasser count for list elements
    surpasserCount = getSurpasserCount(A)

    for value in A:
        print(surpasserCount.get(value), end=' ')
```

Also See:

> [Inversion count of an array](https://www.techiedelight.com/inversion-count-array/ "Inversion count of an array")

> [Merge Sort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/merge-sort/ "Merge Sort Algorithm – C++, Java, and Python Implementation")

> [Segregate positive and negative integers using merge sort](https://www.techiedelight.com/segregate-positive-negative-integers-using-mergesort/ "Segregate positive and negative integers using merge sort")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
