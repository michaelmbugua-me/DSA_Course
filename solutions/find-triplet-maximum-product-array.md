# Find a triplet having the maximum product in an array

> Source: https://www.techiedelight.com/find-triplet-maximum-product-array/

Given an integer array, find a triplet having the maximum product.

For example,

**Input:** { -4, 1, -8, 9, 6 } **Output:** The triplet having the maximum product is (-4, -8, 9) **Input:** { 1, 7, 2, -2, 5 } **Output:** The triplet having the maximum product is (7, 2, 5)

> 

A naive solution would be to consider every triplet present in the array and compute the product of its elements. Finally, after processing all triplets, print the triplet having the maximum product. The time complexity of this solution would be O(n3), where `n` is the size of the input.

A better approach involves sorting the array. Then the triplet having the maximum product can be one of the two:

  1. The last three elements of the sorted array.
  2. First two elements and the last element of the sorted array (as the multiplication of two negative numbers results in a positive number).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Find a triplet having the maximum product in a given array
int findTriplet(vector<int> A)        // no-ref, no-const
{
    // sort the given array in a natural order
    sort(A.begin(), A.end());
    int n = A.size();

    // invalid input
    if (n <= 2) {
        printf("No triplet exists. The array has less than 3 elements.");
    }

    // consider a maximum of the last three elements or
    // the first two elements and last element
    if (A[n-1] * A[n-2] * A[n-3] > A[0] * A[1] * A[n-1])
    {
        cout << "Triplet is (" << A[n-1] << ", " << A[n-2] << ", " <<
                            A[n-3] << ")";
    }
    else {
        cout << "Triplet is (" << A[0] << ", " << A[1] << ", " <<
                            A[n-1] << ")";
    }
}

int main()
{
    vector<int> A = { -4, 1, -8, 9, 6 };

    findTriplet(A);

    return 0;
}
```

**Output:** Triplet is (-8, -4, 9)

##

```java
import java.util.Arrays;

class Main
{
    // Find a triplet having the maximum product in a given array
    public static void findTriplet(int[] A)
    {
        // sort the given array in a natural order
        Arrays.sort(A);
        int n = A.length;

        // invalid input
        if (n <= 2) {
            System.out.print("No triplet exists. The array has less than 3 elements.");
        }

        // consider a maximum of the last three elements or
        // the first two elements and last element
        if (A[n-1] * A[n-2] * A[n-3] > A[0] * A[1] * A[n-1]) {
            System.out.printf("Triplet is (%d, %d, %d)", A[n-1], A[n-2], A[n-3]);
        }
        else {
            System.out.printf("Triplet is (%d, %d, %d)", A[0], A[1], A[n-1]);
        }
    }

    public static void main(String[] args)
    {
        int[] A = { -4, 1, -8, 9, 6 };
        findTriplet(A);
    }
}
```

##

```python3
# Find a triplet having the maximum product in a given list
def findTriplet(A):

    # sort the given list in a natural order
    A.sort()

    n = len(A)

    # invalid input
    if n <= 2:
        print("No triplet exists. The array has less than 3 elements.")

    # consider a maximum of the last three elements or
    # the first two elements and last element
    if A[n - 1] * A[n - 2] * A[n - 3] > A[0] * A[1] * A[n - 1]:
        print("Triplet is", (A[n - 1], A[n - 2], A[n - 3]))
    else:
        print("Triplet is", (A[0], A[1], A[n - 1]))

if __name__ == '__main__':

    A = [-4, 1, -8, 9, 6]
    findTriplet(A)
```

The time complexity of the above solution is O(n.log(n)), which is better than the brute-force approach but is still costly for large input. The solution also modifies the input array, which might not be permitted.

Can we do better?

If we carefully analyze the above solution, we can see that it only uses the last three and the initial two sorted array elements. We can avoid that by finding the largest, second largest, third largest element, and the smallest, second smallest array element in linear time, as demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

int maximum(int x, int y) {
    return (x > y) ? x : y;
}

// Find a triplet having the maximum product in an array
void printTriplet(int A[], int n)
{
    // invalid input
    if (n <= 2) {
        printf("No triplet exists. The array has less than 3 elements.");
    }

    // 1. Find the index of the largest, second largest, and third largest
    // array element
    int max_index1 = 0, max_index2 = -1, max_index3 = -1;
    for (int i = 1; i < n; i++)
    {
        // if the current element is less than the largest element found so far
        if (A[i] > A[max_index1])
        {
            max_index3 = max_index2;
            max_index2 = max_index1;
            max_index1 = i;
        }
        // if the current element is less than the second largest element
        // found so far
        else if (max_index2 == -1 || A[i] > A[max_index2])
        {
            max_index3 = max_index2;
            max_index2 = i;
        }
        // if the current element is less than the third largest element
        // found so far
        else if (max_index3 == -1 || A[i] > A[max_index3]) {
            max_index3 = i;
        }
    }

    // 2. Find the index of the smallest and second smallest array element
    int min_index1 = 0, min_index2 = -1;
    for (int i = 1; i < n; i++)
    {
        // if the current element is more than the smallest element found so far
        if (A[i] < A[min_index1])
        {
            min_index2 = min_index1;
            min_index1 = i;
        }
        // if the current element is more than the second smallest element
        // found so far
        else if (min_index2 == -1 || A[i] < A[min_index2]) {
            min_index2 = i;
        }
    }

    if (A[max_index1] * A[max_index2] * A[max_index3] >
            A[min_index1] * A[min_index2] * A[max_index1]) {
        printf("Triplet is (%d, %d, %d)", A[max_index1], A[max_index2],
                                        A[max_index3]);
    }
    else {
        printf("Triplet is (%d, %d, %d)", A[min_index1], A[min_index2],
                                        A[max_index1]);
    }
}

int main(void)
{
    int A[] = { -4, 1, -8, 9, 6 };
    int n = sizeof(A) / sizeof(A[0]);

    printTriplet(A, n);

    return 0;
}
```

**Output:** Triplet is (-8, -4, 9)

##

```java
class Main
{
    // Find a triplet having the maximum product in an array
    public static void printTriplet(int[] A)
    {
        int n = A.length;

        // invalid input
        if (n <= 2) {
            System.out.print("No triplet exists. The array has less than 3 elements.");
        }

        // 1. Find the index of the largest, second largest, and third largest
        // array element
        int max_index1 = 0, max_index2 = -1, max_index3 = -1;
        for (int i = 1; i < n; i++)
        {
            // if the current element is less than the largest element found so far
            if (A[i] > A[max_index1])
            {
                max_index3 = max_index2;
                max_index2 = max_index1;
                max_index1 = i;
            }

            // if the current element is less than the second largest element
            // found so far
            else if (max_index2 == -1 || A[i] > A[max_index2])
            {
                max_index3 = max_index2;
                max_index2 = i;
            }

            // if the current element is less than the third largest element
            // found so far
            else if (max_index3 == -1 || A[i] > A[max_index3]) {
                max_index3 = i;
            }
        }

        // 2. Find the index of the smallest and second smallest array element
        int min_index1 = 0, min_index2 = -1;
        for (int i = 1; i < n; i++)
        {
            // if the current element is more than the smallest element found so far
            if (A[i] < A[min_index1])
            {
                min_index2 = min_index1;
                min_index1 = i;
            }
            // if the current element is more than the second smallest element
            // found so far
            else if (min_index2 == -1 || A[i] < A[min_index2]) {
                min_index2 = i;
            }
        }

        if (A[max_index1] * A[max_index2] * A[max_index3] >
                A[min_index1] * A[min_index2] * A[max_index1]) {
            System.out.print("Triplet is (" + A[max_index1] + ", " + A[max_index2]
                                + ", " + A[max_index3] + ")");
        }
        else {
            System.out.print("Triplet is (" + A[min_index1] + ", " + A[min_index2]
                                + ", " + A[max_index1] + ")");
        }
    }

    public static void main(String[] args)
    {
        int[] A = { -4, 1, -8, 9, 6 };
        printTriplet(A);
    }
}
```

##

```python3
# Find a triplet having the maximum product in a list
def printTriplet(A):

    n = len(A)

    if n <= 2:        # invalid input
        print("No triplet exists. The array has less than 3 elements.")

    # 1. Find the index of the largest, second largest, and third largest
    # element in the list
    max_index1 = 0
    max_index2 = -1
    max_index3 = -1

    for i in range(1, n):
        # if the current element is less than the largest element found so far
        if A[i] > A[max_index1]:
            max_index3 = max_index2
            max_index2 = max_index1
            max_index1 = i

        # if the current element is less than the second largest element
        # found so far
        elif max_index2 == -1 or A[i] > A[max_index2]:
            max_index3 = max_index2
            max_index2 = i

        # if the current element is less than the third largest element
        # found so far
        elif max_index3 == -1 or A[i] > A[max_index3]:
            max_index3 = i

    # 2. Find the index of the smallest and second smallest element in the list
    min_index1 = 0
    min_index2 = -1
    for i in range(1, n):

        # if the current element is more than the smallest element found so far
        if A[i] < A[min_index1]:
            min_index2 = min_index1
            min_index1 = i

        # if the current element is more than the second smallest element
        # found so far
        elif min_index2 == -1 or A[i] < A[min_index2]:
            min_index2 = i

    if A[max_index1] * A[max_index2] * A[max_index3] > \
            A[min_index1] * A[min_index2] *    A[max_index1]:
        print("Triplet is", (A[max_index1], A[max_index2], A[max_index3]))
    else:
        print("Triplet is", (A[min_index1], A[min_index2], A[max_index1]))

if __name__ == '__main__':

    A = [-4, 1, -8, 9, 6]
    printTriplet(A)
```
