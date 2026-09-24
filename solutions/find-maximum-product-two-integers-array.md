# Find the maximum product of two integers in an array

> Source: https://www.techiedelight.com/find-maximum-product-two-integers-array/

Given an integer array, find the maximum product of two integers in it.

For example, consider array `{-10, -3, 5, 6, -2}`. The maximum product is the `(-10, -3)` or `(5, 6)` pair.

> 

A naive solution is to consider every pair of elements and calculate their product. Update the maximum product found so far if the product of the current pair is greater. Finally, print the elements involved in the maximum product. This is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

// A naive solution to finding the maximum product of two integers
// in an array
void findMaximumProduct(int arr[], int n)
{
    // base case
    if (n < 2) {
        return;
    }

    int max_product = INT_MIN;
    int max_i, max_j;

    // consider every pair of elements
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            // update the maximum product if required
            if (max_product < arr[i] * arr[j])
            {
                max_product = arr[i] * arr[j];
                max_i = i, max_j = j;
            }
        }
    }

    printf("Pair is (%d, %d)", arr[max_i], arr[max_j]);
}

int main()
{
    int arr[] = { -10, -3, 5, 6, -2 };
    int n = sizeof(arr) / sizeof(arr[0]);

    findMaximumProduct(arr, n);

    return 0;
}
```

**Output:** Pair is (-10, -3)

##

```java
class Main
{
    // A naive solution to finding the maximum product of two integers
    // in an array
    public static void findMaximumProduct(int[] A)
    {
        // base case
        if (A.length < 2) {
            return;
        }

        int max_product = Integer.MIN_VALUE;
        int max_i = -1, max_j = -1;

        // consider every pair of elements
        for (int i = 0; i < A.length - 1; i++)
        {
            for (int j = i + 1; j < A.length; j++)
            {
                // update the maximum product if required
                if (max_product < A[i] * A[j])
                {
                    max_product = A[i] * A[j];
                    max_i = i;
                    max_j = j;
                }
            }
        }

        System.out.print("Pair is (" + A[max_i] + ", " + A[max_j] + ")");
    }

    public static void main (String[] args)
    {
        int[] A = { -10, -3, 5, 6, -2 };

        findMaximumProduct(A);
    }
}
```

##

```python3
import sys

# A naive solution to finding the maximum product of two integers in a list
def findMaximumProduct(A):

    # base case
    if len(A) < 2:
        return

    max_product = -sys.maxsize
    max_i = max_j = -1

    # consider every pair of elements
    for i in range(len(A) - 1):
        for j in range(i + 1, len(A)):
            # update the maximum product if required
            if max_product < A[i] * A[j]:
                max_product = A[i] * A[j]
                (max_i, max_j) = (i, j)

    print("Pair is", (A[max_i], A[max_j]))

if __name__ == '__main__':

    A = [-10, -3, 5, 6, -2]
    findMaximumProduct(A)
```

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

The time complexity can be improved by sorting the array. Then the result is the maximum of the following:

  1. The product of maximum and second maximum integer in the array (i.e., the last two elements in a sorted array).
  2. The product of minimum and second minimum integers in the array (i.e., the first two elements in the sorted array).

Following is the implementation of the above algorithm in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

// Function to find the maximum product of two integers in an array
void findMaximumProduct(int arr[], int n)
{
    // base case
    if (n < 2) {
        return;
    }

    // sort array in ascending order
    qsort(arr, n, sizeof(int), compare);

    // choose the maximum of the following:
    // 1. Product of the first two elements or
    // 2. Product of the last two elements.

    if ((arr[0] * arr[1]) > (arr[n - 1] * arr[n - 2])) {
        printf("Pair is (%d, %d)", arr[0], arr[1]);
    }
    else {
        printf("Pair is (%d, %d)", arr[n - 1], arr[n - 2]);
    }
}

int main()
{
    int arr[] = { -10, -3, 5, 6, -20 };
    int n = sizeof(arr) / sizeof(arr[0]);

    findMaximumProduct(arr, n);

    return 0;
}
```

**Output:** Pair is (-20, -10)

##

```java
import java.util.Arrays;

class Main
{
    // A naive solution to finding the maximum product of two integers
    // in an array
    public static void findMaximumProduct(int[] A)
    {
        // `n` is the length of the array
        int n = A.length;

        // base case
        if (n < 2) {
            return;
        }

        // sort array in ascending order
        Arrays.sort(A);

        // choose the maximum of the following:
        // 1. Product of the first two elements or
        // 2. Product of the last two elements.

        if ((A[0] * A[1]) > (A[n - 1] * A[n - 2])) {
            System.out.print("Pair is (" + A[0] + ',' + A[1] + ')');
        }
        else {
            System.out.print("Pair is (" + A[n - 1] + ',' + A[n - 2] + ')');
        }
    }

    public static void main (String[] args)
    {
        int[] A = { -10, -3, 5, 6, -20 };

        findMaximumProduct(A);
    }
}
```

##

```python3
# A naive solution to finding the maximum product of two integers in a list
def findMaximumProduct(A):

    # `n` is the length of the list
    n = len(A)

    # base case
    if n < 2:
        return

    # sort list in ascending order
    A.sort()

    # choose the maximum of the following:
    # 1. Product of the first two elements or
    # 2. Product of the last two elements.

    if (A[0] * A[1]) > (A[n - 1] * A[n - 2]):
        print("Pair is", (A[0], A[1]))
    else:
        print("Pair is", (A[n - 1], A[n - 2]))

if __name__ == '__main__':

    A = [-10, -3, 5, 6, -20]
    findMaximumProduct(A)
```

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space.

We can solve this problem in linear time as we need the only maximum, second maximum, minimum, and second minimum elements to solve this problem. We can compute all these in only a single traversal of the array, which accounts for O(n) time complexity. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

// Function to find the maximum product of two integers in an array
void findMaximumProduct(int arr[], int n)
{
    // for storing the maximum and second maximum element in an array
    int max1 = arr[0], max2 = INT_MIN;

    // for storing the minimum and second minimum element in an array
    int min1 = arr[0], min2 = INT_MAX;

    for (int i = 1; i < n; i++)
    {
        // if the current element is more than the maximum element,
        // update the maximum and second maximum element
        if (arr[i] > max1)
        {
            max2 = max1;
            max1 = arr[i];
        }

        // if the current element is less than the maximum but greater than the
        // second maximum element, update the second maximum element
        else if (arr[i] > max2) {
            max2 = arr[i];
        }

        // if the current element is less than the minimum element,
        // update the minimum and the second minimum
        if (arr[i] < min1)
        {
            min2 = min1;
            min1 = arr[i];
        }

        // if the current element is more than the minimum but less than the
        // second minimum element, update the second minimum element
        else if (arr[i] < min2) {
            min2 = arr[i];
        }

        // otherwise, ignore the element
    }

    // choose the maximum of the following:
    // 1. Product of the maximum and second maximum element or
    // 2. Product of the minimum and second minimum element
    if (max1 * max2 > min1 * min2) {
        printf("Pair is (%d, %d)", max1, max2);
    }
    else {
        printf("Pair is (%d, %d)", min1, min2);
    }
}

int main()
{
    int arr[] = { -10, -3, 5, 6, -2 };
    int n = sizeof(arr) / sizeof(arr[0]);

    findMaximumProduct(arr, n);

    return 0;
}
```

**Output:** Pair is (-10, -3)
