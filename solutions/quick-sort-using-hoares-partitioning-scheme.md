# Quicksort algorithm using Hoare’s partitioning scheme

> Source: https://www.techiedelight.com/quick-sort-using-hoares-partitioning-scheme/

Implement the Quicksort algorithm using Hoare’s Partitioning scheme.

As the [Lomuto partition scheme](https://techiedelight.com/quicksort/) is more compact and easy to understand, it is frequently used in the partition process of Quicksort. But this scheme degrades to O(n2) when the array is already sorted or when the array has all equal elements. In this post, a much more efficient Hoare partition scheme is discussed.

## Hoare Partition Scheme

Hoare uses two indices that start at the ends of the array being partitioned, then move toward each other until they detect an inversion: a pair of elements, one greater than the pivot, one smaller, in the wrong order relative to each other. The inverted elements are then swapped. When the indices meet, the algorithm stops and returns the final index.

Hoare’s scheme is more efficient than Lomuto’s partition scheme because it does three times fewer swaps on average, and it creates efficient partitions even when all values are equal. But like Lomuto’s partition scheme, Hoare partitioning also causes Quicksort to degrade to O(n2) when the input array is already sorted; it also doesn’t produce a stable sort.

Note that in this scheme, the pivot’s final location is not necessarily at the index that was returned, and the next two segments that the main algorithm recurs on are `[low…pivot]` and `[pivot+1…high]` as opposed to `[low…pivot-1]` and `[pivot+1…high]` as in Lomuto’s scheme.

> [Practice this algorithm](https://techiedelight.com/?problem=SortArray)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

#define N 15

// Partition using Hoare's Partitioning scheme
int partition(int a[], int low, int high)
{
    int pivot = a[low];
    int i = low - 1;
    int j = high + 1;
    while (1)
    {
        do {
            i++;
        } while (a[i] < pivot);

        do {
            j--;
        } while (a[j] > pivot);

        if (i >= j) {
            return j;
        }

        swap(a[i], a[j]);
    }
}

// Quicksort routine
void quicksort(int a[], int low, int high)
{
    // base condition
    if (low >= high) {
        return;
    }

    // rearrange elements across pivot
    int pivot = partition(a, low, high);

    // recur on subarray containing elements that are less than the pivot
    quicksort(a, low, pivot);

    // recur on subarray containing elements that are more than the pivot
    quicksort(a, pivot + 1, high);
}

int main()
{
    int arr[N];
    srand(time(NULL));

    // generate random input of integers
    for (int i = 0; i < N; i++) {
        arr[i] = (rand() % 100) - 50;
    }

    quicksort(arr, 0, N - 1);

    for (int i = 0; i < N; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    public static void swap (int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Partition using Hoare's Partitioning scheme
    public static int partition(int[] a, int low, int high)
    {
        int pivot = a[low];
        int i = low - 1;
        int j = high + 1;

        while (true)
        {
            do {
                i++;
            } while (a[i] < pivot);

            do {
                j--;
            } while (a[j] > pivot);

            if (i >= j) {
                return j;
            }

            swap(a, i, j);
        }
    }

    // Quicksort routine
    public static void quicksort(int[] a, int low, int high)
    {
        // base condition
        if (low >= high) {
            return;
        }

        // rearrange elements across pivot
        int pivot = partition(a, low, high);

        // recur on subarray containing elements less than the pivot
        quicksort(a, low, pivot);

        // recur on subarray containing elements more than the pivot
        quicksort(a, pivot + 1, high);
    }

    public static void main(String[] args)
    {
        int[] a = { 9, -3, 5, 2, 6, 8, -6, 1, 3 };

        quicksort(a, 0, a.length - 1);

        // print the sorted array
        System.out.println(Arrays.toString(a));
    }
}
```

##

```python3
def swap(A, i, j):

    temp = A[i]
    A[i] = A[j]
    A[j] = temp

# Partition using Hoare's Partitioning scheme
def partition(a, low, high):

    pivot = a[low]
    (i, j) = (low - 1, high + 1)

    while True:

        while True:
            i = i + 1
            if a[i] >= pivot:
                break

        while True:
            j = j - 1
            if a[j] <= pivot:
                break

        if i >= j:
            return j

        swap(a, i, j)

# Quicksort routine
def quicksort(a, low, high):

    # base condition
    if low >= high:
        return

    # rearrange elements across pivot
    pivot = partition(a, low, high)

    # recur on sublist containing elements less than the pivot
    quicksort(a, low, pivot)

    # recur on sublist containing elements more than the pivot
    quicksort(a, pivot + 1, high)

if __name__ == '__main__':

    a = [9, -3, 5, 2, 6, 8, -6, 1, 3]

    quicksort(a, 0, len(a) - 1)

    # print the sorted list
    print(a)
```

**References:** <https://en.wikipedia.org/wiki/Quicksort>

Also See:

> [How to Boost QuickSort Performance?](https://www.techiedelight.com/boost-quicksort-performance/ "How to Boost QuickSort Performance?")

> [Quicksort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/quicksort/ "Quicksort Algorithm – C++, Java, and Python Implementation")

> [Hybrid QuickSort Algorithm](https://www.techiedelight.com/hybrid-quicksort/ "Hybrid QuickSort Algorithm")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.23/5. Vote count: 66

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
