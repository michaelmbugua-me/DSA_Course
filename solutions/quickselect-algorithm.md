# Quickselect Algorithm

> Source: https://www.techiedelight.com/quickselect-algorithm/

[Array](https://www.techiedelight.com/Category/Array/)

Quickselect is a selection algorithm to find the `k'th` smallest element in an unordered list. It is closely related to the [Quicksort sorting algorithm](https://techiedelight.com/quicksort/). Like Quicksort, it is efficient traditionally and offers good average-case performance, but has a poor worst-case performance.

For example,

**Input:** [7, 4, 6, 3, 9, 1] k = 2 **Output:** k’th smallest array element is 3 **Input:** [7, 4, 6, 3, 9, 1] k = 1 **Output:** k’th smallest array element is 1

> 

Quickselect uses the same overall approach as Quicksort, choosing one element as a pivot and partitioning the data in two based on the pivot, accordingly as less than or greater than the pivot. However, instead of recursing into both sides as in Quicksort, quickselect only recurs into one side with its searching element. Since the pivot is in its final sorted position, all those preceding it in unsorted order, and all those following it in an unsorted order. This reduces the average-case complexity from O(n.log(n)) to O(n) with a worst-case of O(n2), where `n` is the size of the input.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

#define SWAP(x, y) { int temp = x; x = y; y = temp; }
#define N (sizeof(nums)/sizeof(nums[0]))

// Partition using Lomuto partition scheme
int partition(int a[], int left, int right, int pIndex)
{
    // pick `pIndex` as a pivot from the array
    int pivot = a[pIndex];

    // Move pivot to end
    SWAP(a[pIndex], a[right]);

    // elements less than the pivot will be pushed to the left of `pIndex`;
    // elements more than the pivot will be pushed to the right of `pIndex`;
    // equal elements can go either way
    pIndex = left;

    // each time we find an element less than or equal to the pivot, `pIndex`
    // is incremented, and that element would be placed before the pivot.
    for (int i = left; i < right; i++)
    {
        if (a[i] <= pivot)
        {
            SWAP(a[i], a[pIndex]);
            pIndex++;
        }
    }

    // move pivot to its final place
    SWAP(a[pIndex], a[right]);

    // return `pIndex` (index of the pivot element)
    return pIndex;
}

// Returns the k'th smallest element in the list within `left…right`
// (i.e., left <= k <= right). The search space within the array is
// changing for each round – but the list is still the same size.
// Thus, `k` does not need to be updated with each round.
int quickselect(int nums[], int left, int right, int k)
{
    // If the array contains only one element, return that element
    if (left == right) {
        return nums[left];
    }

    // select `pIndex` between left and right
    int pIndex = left + rand() % (right - left + 1);

    pIndex = partition(nums, left, right, pIndex);

    // The pivot is in its final sorted position
    if (k == pIndex) {
        return nums[k];
    }

    // if `k` is less than the pivot index
    else if (k < pIndex) {
        return quickselect(nums, left, pIndex - 1, k);
    }

    // if `k` is more than the pivot index
    else {
        return quickselect(nums, pIndex + 1, right, k);
    }
}

int main()
{
    int nums[] = { 7, 4, 6, 3, 9, 1 };
    int k = 2;

    printf("k'th smallest element is %d", quickselect(nums, 0, N - 1, k - 1));

    return 0;
}
```

**Output:** k’th smallest element is 3

##

```java
import java.util.Random;

class Main
{
    public static int rand(int min, int max)
    {
        if (min > max || (max - min + 1 > Integer.MAX_VALUE)) {
            throw new IllegalArgumentException("Invalid range");
        }
        return new Random().nextInt(max - min + 1) + min;
    }

    public static void swap(int[] nums, int i, int j)
    {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    // Partition using Lomuto partition scheme
    public static int partition(int[] nums, int left, int right, int pIndex)
    {
        // pick `pIndex` as a pivot from the array
        int pivot = nums[pIndex];

        // Move pivot to end
        swap(nums, pIndex, right);

        // elements less than the pivot will be pushed to the left of `pIndex`;
        // elements more than the pivot will be pushed to the right of `pIndex`;
        // equal elements can go either way
        pIndex = left;

        // each time we find an element less than or equal to the pivot, `pIndex`
        // is incremented, and that element would be placed before the pivot.
        for (int i = left; i < right; i++)
        {
            if (nums[i] <= pivot)
            {
                swap(nums, i, pIndex);
                pIndex++;
            }
        }

        // move pivot to its final place
        swap(nums, pIndex, right);

        // return `pIndex` (index of the pivot element)
        return pIndex;
    }

    // Returns the k'th smallest element in the list within `left…right`
    // (i.e., left <= k <= right). The search space within the array is
    // changing for each round – but the list is still the same size.
    // Thus, `k` does not need to be updated with each round.
    public static int quickSelect(int[] nums, int left, int right, int k)
    {
        // If the array contains only one element, return that element
        if (left == right) {
            return nums[left];
        }

        // select a `pIndex` between left and right
        int pIndex = rand(left, right);

        pIndex = partition(nums, left, right, pIndex);

        // The pivot is in its final sorted position
        if (k == pIndex) {
            return nums[k];
        }

        // if `k` is less than the pivot index
        else if (k < pIndex) {
            return quickSelect(nums, left, pIndex - 1, k);
        }

        // if `k` is more than the pivot index
        else {
            return quickSelect(nums, pIndex + 1, right, k);
        }
    }

    public static void main(String[] args)
    {
        int[] nums = { 7, 4, 6, 3, 9, 1 };
        int k = 2;

        System.out.print("k'th smallest element is " +
                quickSelect(nums, 0, nums.length - 1, k - 1));
    }
}
```

##

```python3
from random import randint

def swap(nums, i, j):
    temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp

# Partition using Lomuto partition scheme
def partition(nums, left, right, pIndex):

    # Pick `pIndex` as a pivot from the list
    pivot = nums[pIndex]

    # Move pivot to end
    swap(nums, pIndex, right)

    # elements less than the pivot will be pushed to the left of `pIndex`;
    # elements more than the pivot will be pushed to the right of `pIndex`;
    # equal elements can go either way
    pIndex = left

    # each time we find an element less than or equal to the pivot, `pIndex`
    # is incremented, and that element would be placed before the pivot.
    for i in range(left, right):
        if nums[i] <= pivot:
            swap(nums, i, pIndex)
            pIndex = pIndex + 1

    # Move pivot to its place
    swap(nums, pIndex, right)

    # return `pIndex` (index of the pivot element)
    return pIndex

# Returns the k'th smallest element in a list within `left…right`
# (i.e., left <= k <= right). The search space within the list is
# changing for each round – but the list is still the same size.
# Thus, `k` does not need to be updated with each round.
def quickSelect(nums, left, right, k):

    # If the list contains only one element, return that element
    if left == right:
        return nums[left]

    # select `pIndex` between left and right
    pIndex = randint(left, right)

    pIndex = partition(nums, left, right, pIndex)

    # The pivot is in its sorted position
    if k == pIndex:
        return nums[k]

    # if `k` is less than the pivot index
    elif k < pIndex:
        return quickSelect(nums, left, pIndex - 1, k)

    # if `k` is more than the pivot index
    else:
        return quickSelect(nums, pIndex + 1, right, k)

if __name__ == '__main__':

    nums = [7, 4, 6, 3, 9, 1]
    k = 2

    print('k\'th smallest element is', quickSelect(nums, 0, len(nums) - 1, k - 1))
```

It is worth noticing the resemblance to the Quicksort algorithm. This simple procedure has expected linear performance and, like Quicksort, has excellent performance traditionally, and beyond selecting the `k'th` element, it also partially sorts the data. It is also an [in-place algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), requiring only constant memory overhead if tail-call optimization is available, or we can eliminate the tail recursion with a loop.

```
// Returns the k'th smallest element in the list within `left…right` (inclusive)
int quickselect(int nums[], int left, int right, int k)
{
    while (1)
    {
        // If the array contains only one element, return that element
        if (left == right) {
            return nums[left];
        }

        // select `pIndex` between left and right
        int pIndex = left + rand() % (right - left + 1);

        pIndex = partition(nums, left, right, pIndex);

        // The pivot is in its final sorted position
        if (k == pIndex) {
            return nums[k];
        }

        // if `k` is less than the pivot index
        else if (k < pIndex) {
            right = pIndex - 1;
        }

        // if `k` is more than the pivot index
        else {
            left = pIndex + 1;
        }
    }
}
```

Time complexity:

Like Quicksort, the quickselect has good average performance but is sensitive to the chosen pivot. With good pivots, meaning ones that consistently decrease the search set by a given fraction, the search set decreases exponentially. By induction (or summing the geometric series), one sees that performance is linear, as each step is linear. The overall time is constant (depending on how quickly the search set reduces). However, if bad pivots are consistently chosen, such as decreasing by only a single element each time, then worst-case performance is quadratic: O(n2). For example, this occurs in searching for the maximum element of a set, using the first element as the pivot, and having sorted data.

Using `std::nth_element`:

Quickselect and its variants are the selection algorithms most often used in efficient real-world implementations. Quickselect is already provided in the C++ standard library as [std::nth_element(first, nth, last)](https://cplusplus.com/reference/algorithm/nth_element/) which rearranges the elements in range `[first, last)` so that the item at the `n'th` position is the element that would be in that position in a sorted sequence.

It is typically implemented using a version of quickselect called [Introselect](https://en.wikipedia.org/wiki/Introselect). Introselect is a hybrid of quickselect and [median of medians](https://en.wikipedia.org/wiki/Median_of_medians). If quickselect takes too long (bad pivot selection), then it falls back to the slower but guaranteed linear time algorithm, thus capping its worst-case runtime before it becomes worse than linear.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> a = { 7, 4, 6, 3, 9, 1 };
    const size_t k = 2;

    nth_element(a.begin(), a.begin() + k, a.end());
    cout << "k'th smallest element is " << a[k];

    return 0;
}
```

**Output:** k’th smallest element is 3

**References:** <https://en.wikipedia.org/wiki/Quickselect>
