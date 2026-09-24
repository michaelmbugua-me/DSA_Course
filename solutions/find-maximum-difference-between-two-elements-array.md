# Find the maximum difference between two array elements that satisfies the given constraints

> Source: https://www.techiedelight.com/find-maximum-difference-between-two-elements-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the maximum difference between two elements in it such that the smaller element appears before the larger element.

For example,

**Input:** { 2, 7, 9, 5, 1, 3, 5 } **Output:** The maximum difference is 7. The pair is (2, 9)

> 

A naive solution is to consider every pair present in the array and keep track of the maximum difference found so far. Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <limits.h>

// Utility function to find a maximum of two numbers
int max(int x, int y) {
    return (x > y) ? x : y;
}

// Naive function to find the maximum difference between two elements in
// an array such that the smaller element appears before the larger element
int getMaxDiff(int arr[], int n)
{
    int diff = INT_MIN;

    if (n == 0) {
        return diff;
    }

    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[j] > arr[i]) {
                diff = max(diff, arr[j] - arr[i]);
            }
        }
    }

    return diff;
}

int main()
{
    int arr[] = { 2, 7, 9, 5, 1, 3, 5 };
    int n = sizeof(arr) / sizeof(arr[0]);

    int result = getMaxDiff(arr, n);
    if (result != INT_MIN) {
        printf("The maximum difference is %d", result);
    }

    return 0;
}
```

**Output:** The maximum difference is 7

##

```java
class Main
{
    // Naive function to find the maximum difference between two elements in
    // an array such that the smaller element appears before the larger element
    public static int getMaxDiff(int[] A)
    {
        int diff = Integer.MIN_VALUE;

        int n = A.length;
        if (n == 0) {
            return diff;
        }

        for (int i = 0; i < n - 1; i++)
        {
            for (int j = i + 1; j < n; j++) {
                if (A[j] > A[i]) {
                    diff = Integer.max(diff, A[j] - A[i]);
                }
            }
        }

        return diff;
    }

    public static void main(String[] args)
    {
        int[] A = { 2, 7, 9, 5, 1, 3, 5 };

        int diff = getMaxDiff(A);
        if (diff != Integer.MIN_VALUE) {
            System.out.print("The maximum difference is " + diff);
        }
    }
}
```

##

```python3
import sys

# Naive function to find the maximum difference between two elements in
# a list such that the smaller element appears before the larger element
def getMaxDiff(A):

    diff = -sys.maxsize

    n = len(A)
    if n == 0:
        return diff

    for i in range(n - 1):
        for j in range(i + 1, n):
            if A[j] > A[i]:
                diff = max(diff, A[j] - A[i])

    return diff

if __name__ == '__main__':

    A = [2, 7, 9, 5, 1, 3, 5]

    diff = getMaxDiff(A)
    if diff != -sys.maxsize:
        print("The maximum difference is", diff)
```

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

We can solve this problem in linear time. The idea is to traverse the array from the right and keep track of the maximum difference found so far. If the current element is less than the maximum element found so far and their difference is more than the maximum difference found so far, update the maximum difference with the current difference.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

// Utility function to find a maximum of two numbers
int max(int x, int y) {
    return (x > y) ? x : y;
}

// Function to calculate the maximum difference between two elements in an
// array such that the smaller element appears before the larger element
int getMaxDiff(int arr[], int n)
{
    int diff = INT_MIN;
    if (n == 0) {
        return diff;
    }

    int max_so_far = arr[n-1];

    // traverse the array from the right and keep track of the maximum element
    for (int i = n - 2; i >= 0; i--)
    {
        // update `max_so_far` if the current element is greater than the
        // maximum element
        if (arr[i] >= max_so_far) {
            max_so_far = arr[i];
        }
        // if the current element is less than the maximum element,
        // then update the difference if required
        else {
            diff = max (diff, max_so_far - arr[i]);
        }
    }

    // return difference
    return diff;
}

int main()
{
    int arr[] = { 2, 7, 9, 5, 1, 3, 5 };
    int n = sizeof(arr) / sizeof(arr[0]);

    int result = getMaxDiff(arr, n);
    if (result != INT_MIN) {
        printf("The maximum difference is %d", result);
    }

    return 0;
}
```

**Output:** The maximum difference is 7

##

```java
class Main
{
    // Function to calculate the maximum difference between two elements in an
    // array such that a smaller element appears before a larger element
    public static int getMaxDiff(int[] A)
    {
        int diff = Integer.MIN_VALUE;
        int n = A.length;

        if (n == 0) {
            return diff;
        }
        int max_so_far = A[n-1];

        // traverse the array from the right and keep track of the maximum element
        for (int i = n - 2; i >= 0; i--)
        {
            // update `max_so_far` if the current element is greater than the
            // maximum element
            if (A[i] >= max_so_far) {
                max_so_far = A[i];
            }
            // if the current element is less than the maximum element,
            // then update the difference if required
            else {
                diff = Integer.max(diff, max_so_far - A[i]);
            }
        }

        // return difference
        return diff;
    }

    public static void main(String[] args)
    {
        int[] A = { 2, 7, 9, 5, 1, 3, 5 };

        int diff = getMaxDiff(A);
        if (diff != Integer.MIN_VALUE) {
            System.out.print("The maximum difference is " + diff);
        }
    }
}
```

##

```python3
import sys

# Function to calculate the maximum difference between two elements in a
# list such that a smaller element appears before a larger element
def getMaxDiff(A):

    diff = -sys.maxsize
    n = len(A)
    if n == 0:
        return diff

    max_so_far = A[n - 1]

    # traverse the list from the right and keep track of the maximum element
    for i in reversed(range(n - 1)):

        # update `max_so_far` if the current element is greater than the
        # maximum element
        if A[i] >= max_so_far:
            max_so_far = A[i]

        # if the current element is less than the maximum element,
        # then update the difference if required
        else:
            diff = max(diff, max_so_far - A[i])

    # return difference
    return diff

if __name__ == '__main__':

    A = [2, 7, 9, 5, 1, 3, 5]
    diff = getMaxDiff(A)
    if diff != -sys.maxsize:
        print("The maximum difference is", diff)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space. The primary application of this problem is calculating the maximum profit by buying and selling a share at most once.

**Exercise:** Extend the second solution to print pair having maximum difference.
