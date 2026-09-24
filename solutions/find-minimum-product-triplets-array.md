# Find minimum product among all combinations of triplets in an array

> Source: https://www.techiedelight.com/find-minimum-product-triplets-array/

Given an integer array, find the minimum product among all combinations of triplets in the array.

For example,

**Input:** { 4, -1, 3, 5, 9 } **Output:** The minimum product is -45 (-1, 5, 9) **Input:** { 1, 4, 10, -2, 4 } **Output:** The minimum product is -80 (10, 4, -2) **Input:** { 3, 4, 1, 2, 5 } **Output:** The minimum product is 6 (3, 1, 2)

> 

A naive solution would be to consider every combination of triplets present in the array and calculate their product. The idea is to maintain the maximum product found so far in a variable and update it if the product of the current triplet is greater. The implementation can be seen [here](https://techiedelight.com/compiler/?run=pTN62Q) and runs in O(n3) time, where `n` is the size of the input.

## 1\. Using Sorting

A better approach, that takes O(n.log(n)) time, is to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and return the minimum among its first three elements and the product of the first element with its last two items. This logic works as the multiplication of two negative numbers results in a positive number. The multiplication of a large positive number with a negative number results in a large negative number.

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

// Find the minimum product among all combinations of triplets in an array
int findMinTripletProduct(vector<int> A)        // no-ref, no-const
{
    // sort the given array in a natural order
    sort(A.begin(), A.end());
    int n = A.size();

    if (n <= 2) {
        return INT_MAX;
    }

    // consider the minimum among the product of the first three elements and
    // the product of the first element with the last two
    return min(A[n-1] * A[n-2] * A[0], A[0] * A[1] * A[2]);
}

int main()
{
    vector<int> A = { 4, -1, 3, 5, 9 };

    int min = findMinTripletProduct(A);

    if (min == INT_MAX) {
        cout << "No triplet exists since the vector has less than 3 elements";
    }
    else {
        cout << "The minimum product is " << min;
    }

    return 0;
}
```

**Output:** The minimum product is -45

##

```java
import java.util.Arrays;

class Main
{
    // Find the minimum product among all combinations of triplets in an array
    public static int findMinTripletProduct(int[] A)
    {
        int n = A.length;
        if (n <= 2) {
            return Integer.MAX_VALUE;
        }

        // sort the given array in a natural order
        Arrays.sort(A);

        // consider the minimum among the product of the first three elements and
        // the product of the first element with the last two
        return Integer.min(A[n-1] * A[n-2] * A[0], A[0] * A[1] * A[2]);
    }

    public static void main(String[] args)
    {
        int[] A = { 4, -1, 3, 5, 9 };

        int min = findMinTripletProduct(A);

        if (min == Integer.MAX_VALUE) {
            System.out.print("No triplet exists since the list has less than " +
                    "3 elements");
        }
        else {
            System.out.print("The minimum product is " + min);
        }
    }
}
```

##

```python3
import sys

# Find the minimum product among all combinations of triplets in a list
def findMinTripletProduct(A):

    n = len(A)
    if n <= 2:
        return sys.maxsize

    # sort the given list in a natural order
    A.sort()

    # consider the minimum among the product of the first three elements and
    # the product of the first element with the last two
    return min(A[n-1] * A[n-2] * A[0], A[0] * A[1] * A[2])

if __name__ == '__main__':

    A = [4, -1, 3, 5, 9]

    min = findMinTripletProduct(A)

    if min == sys.maxsize:
        print("No triplet exists since the list has less than 3 elements")
    else:
        print("The minimum product is", min)
```

## 2\. Linear time solution

The following approach runs in O(n) time but takes O(n) extra space. The idea is to take the help of four auxiliary arrays, `left_min[]`, `left_max[]`, `right_min[]`, and `right_max[]` of the same size as the input array, where:

  * `left_min[i]` contains the minimum element to the left of `A[i]`.
  * `left_max[i]` contains the maximum element to the left of `A[i]`.
  * `right_min[i]` contains the minimum element to the right of `A[i]`.
  * `right_max[i]` contains the maximum element to the right of `A[i]`.

After the arrays’ construction, we can get minimum and maximum elements on the left or right side for any array index in constant time. So, consider every array element as the middle element of the triplet, except the first and last element, and find the minimum by considering all possible combinations. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

int max(int x, int y) {
    return (x > y) ? x : y;
}

int min(int x, int y) {
    return (x < y) ? x : y;
}

int minimum(int a, int b, int c, int d) {
    return min(min(a, b), min(a, d));
}

// Find the minimum product among all combinations of triplets in an array
int findMinTripletProduct(int A[], int n)
{
    // Take four auxiliary arrays of size `n`
    int left_max[n], right_max[n], left_min[n], right_min[n];

    // `left_min[i]` contains the minimum element to the left of `A[i]`
    // `left_max[i]` contains the maximum element to the left of `A[i]`
    // `right_min[i]` contains the minimum element to the right of `A[i]`
    // `right_max[i]` contains the maximum element to the right of `A[i]`

    // fill `left_min[]` and `left_max[]`
    int min_so_far = INT_MAX, max_so_far = INT_MIN;
    for (int i = 0; i < n; i++)
    {
        left_min[i] = min_so_far;
        left_max[i] = max_so_far;

        min_so_far = min(min_so_far, A[i]);
        max_so_far = max(max_so_far, A[i]);
    }

    // fill `left_min[]` and `left_max[]`
    min_so_far = INT_MAX, max_so_far = INT_MIN;
    for (int i = n - 1; i >= 0; i--)
    {
        right_min[i] = min_so_far;
        right_max[i] = max_so_far;

        min_so_far = min(min_so_far, A[i]);
        max_so_far = max(max_so_far, A[i]);
    }

    // consider each array element (except first and last) as the triplet's
    // middle element and find the minimum by considering all combinations
    int result = INT_MAX;
    for (int i = 1; i <= n - 2; i++)
    {
        result = min(result, minimum(A[i] * left_min[i] * right_min[i],
                                    A[i] * left_min[i] * right_max[i],
                                    A[i] * left_max[i] * right_min[i],
                                    A[i] * left_max[i] * right_max[i]
                                ));
    }

    return result;
}

int main()
{
    int A[] = { 4, -1, 3, 5, 9 };
    int n = sizeof(A) / sizeof(A[0]);

    int min = findMinTripletProduct(A, n);

    if (min == INT_MAX) {
        printf("No triplet exists since the array has less than 3 elements");
    }
    else {
        printf("The minimum product is %d", min);
    }

    return 0;
}
```

**Output:** The minimum product is -45

##

```java
class Main
{
    public static int min(int a, int b, int c, int d) {
        return Integer.min(Integer.min(a, b), Integer.min(a, d));
    }

    // Find the minimum product among all combinations of triplets
    // in the array
    public static int findMinTripletProduct(int[] A)
    {
        // get array size
        int n = A.length;

        // Take four auxiliary arrays of size `n`
        int[] left_max = new int[n];
        int[] right_max = new int[n];
        int[] left_min = new int[n];
        int[] right_min = new int[n];

        // `left_min[i]` contains the minimum element to the left of `A[i]`
        // `left_max[i]` contains the maximum element to the left of `A[i]`
        // `right_min[i]` contains the minimum element to the right of `A[i]`
        // `right_max[i]` contains the maximum element to the right of `A[i]`

        // fill `left_min[]` and `left_max[]`
        int min_so_far = Integer.MAX_VALUE, max_so_far = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++)
        {
            left_min[i] = min_so_far;
            left_max[i] = max_so_far;

            min_so_far = Integer.min(min_so_far, A[i]);
            max_so_far = Integer.max(max_so_far, A[i]);
        }

        // fill `left_min[]` and `left_max[]`
        min_so_far = Integer.MAX_VALUE;
        max_so_far = Integer.MIN_VALUE;

        for (int i = n - 1; i >= 0; i--)
        {
            right_min[i] = min_so_far;
            right_max[i] = max_so_far;

            min_so_far = Integer.min(min_so_far, A[i]);
            max_so_far = Integer.max(max_so_far, A[i]);
        }

        // consider each array element (except first and last) as the triplet's
        // middle element and find the minimum by considering all combinations
        int result = Integer.MAX_VALUE;
        for (int i = 1; i <= n - 2; i++)
        {
            int _min = min(A[i] * left_min[i] * right_min[i],
                    A[i] * left_min[i] * right_max[i],
                    A[i] * left_max[i] * right_min[i],
                    A[i] * left_max[i] * right_max[i]);
            result = Integer.min(result, _min);
        }

        return result;
    }

    public static void main(String[] args)
    {
        int[] A = { 4, -1, 3, 5, 9 };

        int min = findMinTripletProduct(A);

        if (min == Integer.MAX_VALUE)
        {
            System.out.print("No triplet exists since the array has less " +
                    "than 3 elements");
        }
        else {
            System.out.print("The minimum product is " + min);
        }
    }
}
```

##

```python3
import sys

# Find the minimum product among all combinations of triplets in a list
def findMinTripletProduct(A):

    # get list size
    n = len(A)

    # Take four auxiliary spaces of size `n`

    # `left_max[i]` contains the maximum element to the left of `A[i]`
    left_max = [None] * n

    # `right_max[i]` contains the maximum element to the right of `A[i]`
    right_max = [None] * n

    # `left_min[i]` contains the minimum element to the left of `A[i]`
    left_min = [None] * n

    # `right_min[i]` contains the minimum element to the right of `A[i]`
    right_min = [None] * n

    # fill `left_min` and `left_max`
    min_so_far = sys.maxsize
    max_so_far = -sys.maxsize

    for i in range(n):
        left_min[i] = min_so_far
        left_max[i] = max_so_far

        min_so_far = min(min_so_far, A[i])
        max_so_far = max(max_so_far, A[i])

    # fill `left_min` and `left_max`
    min_so_far = sys.maxsize
    max_so_far = -sys.maxsize

    for i in reversed(range(n)):
        right_min[i] = min_so_far
        right_max[i] = max_so_far

        min_so_far = min(min_so_far, A[i])
        max_so_far = max(max_so_far, A[i])

    # consider each array element (except first and last) as the triplet's
    # middle element and find the minimum by considering all combinations
    result = sys.maxsize
    for i in range(1, n - 1):
        result = min(result, min(A[i] * left_min[i] * right_min[i],
                                A[i] * left_min[i] * right_max[i],
                                A[i] * left_max[i] * right_min[i],
                                A[i] * left_max[i] * right_max[i]))

    return result

if __name__ == '__main__':

    A = [4, -1, 3, 5, 9]

    min = findMinTripletProduct(A)

    if min == sys.maxsize:
        print("No triplet exists since the list has less than 3 elements")
    else:
        print("The minimum product is", min)
```

## 3\. Linear time and constant space solution

We have seen that the sorting solution only uses the first three and last two array elements but sorts the whole array, which modifies the input array and is also costly for large inputs. This can be avoided by finding the smallest, the second smallest, and the third smallest element, along with the largest and the second largest array element in linear time. Then like the sorting solution, return the minimum among the product of the smallest, second smallest, third smallest elements in the array and product of the smallest, largest, second largest elements in the array.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <limits.h>

int minimum(int x, int y) {
    return (x < y) ? x : y;
}

// Find the minimum product among all combinations of triplets in an array
int findMinTripletProduct(int A[], int n)
{
    // explicitly handle the wrong input
    if (n <= 2) {
        return INT_MAX;
    }

    // 1. Find the smallest, second smallest, and third smallest element
    // in the array
    int min1 = A[0], min2 = INT_MAX, min3 = INT_MAX;
    for (int i = 1; i < n; i++)
    {
        // if the current element is less than the smallest element found so far
        if (A[i] < min1)
        {
            min3 = min2;
            min2 = min1;
            min1 = A[i];
        }
        // if the current element is less than the second smallest element
        else if (A[i] < min2)
        {
            min3 = min2;
            min2 = A[i];
        }
        // if the current element is less than the third smallest element
        else if (A[i] < min3) {
            min3 = A[i];
        }
    }

    // 2. Find the largest and second largest array element
    int max1 = A[0], max2 = INT_MIN;
    for (int i = 1; i < n; i++)
    {
        // if the current element is more than the largest element found so far
        if (A[i] > max1)
        {
            max2 = max1;
            max1 = A[i];
        }
        // if the current element is more than the second largest element
        else if (A[i] > max2) {
            max2 = A[i];
        }
    }

    return minimum(min1 * min2 * min3, max1 * max2 * min1);
}

int main()
{
    int A[] = { 4, -1, 3, 5, 9 };
    int n = sizeof(A) / sizeof(A[0]);

    int min = findMinTripletProduct(A, n);

    if (min == INT_MAX) {
        printf("No triplet exists since the array has less than 3 elements");
    }
    else {
        printf("The minimum product is %d", min);
    }

    return 0;
}
```

**Output:** The minimum product is -45
