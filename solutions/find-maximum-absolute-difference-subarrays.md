# Find the maximum absolute difference between the sum of two non-overlapping subarrays

> Source: https://www.techiedelight.com/find-maximum-absolute-difference-subarrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array, find the maximum absolute difference between the sum of elements of two non-overlapping subarrays in linear time.

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

**Input:** A[] = { -3, -2, 6, -3, 5, -9, 3, 4, -1, -8, 2 } **Output:** The maximum absolute difference is 19. The two subarrays are { 6, -3, 5 }, { -9, 3, 4, -1, -8 } whose sum of elements are 8 and -11, respectively. So, abs(8-(-11)) or abs(-11-8) = 19.

> 

The idea is to calculate the maximum and minimum sum of subarrays ending and starting at any index `i` in the array. Then for each index `i`, consider the maximum absolute value of the following:

  * Maximum subarray sum in subarray ending at index `i` – Minimum subarray sum in subarray starting at index `i+1`
  * Minimum subarray sum in subarray ending at index `i` – Maximum subarray sum in subarray starting at index `i+1`

If [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/) is used, the time complexity of this solution is O(n2), where `n` is the size of the input.

We can solve this problem in O(n) by using extra space. The idea is to create four auxiliary arrays, `left_min[i]`, `left_max[]`, `right_min[]`, `right_min[]`, such that:

  * `left_max[i]` stores the maximum sum of subarray in `A(0, i)`
  * `right_max[i]` stores the maximum sum of subarray in `A(i, n-1)`
  * `left_min[i]` stores the minimum sum of subarray in `A(0, i)`
  * `right_min[i]` stores the minimum sum of subarray in `A(i, n-1)`

To fill `left_max[]` and `right_max[]` arrays in linear time, we can use the standard [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/) for finding the maximum sum of a subarray.

To fill `left_min[]` and `right_min[]` arrays, we can still use Kadane’s algorithm by transforming the array so that each element’s sign is reversed. Then find the maximum sum of subarray for each index and invert its sign to get the minimum subarray sum.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
#include <climits>
using namespace std;

// `diff` ——> counter for loop from `i` to `j` in `A[]` (`diff` can be `+1` or `-1`)
// If the `diff` is 1, fill `aux[k]` with the maximum sum of subarray `A[0, k]`
// If the `diff` is -1, fill `aux[k]` with the maximum sum of subarray `A[k, n-1]`
// using Kadane’s algorithm

void findMaxSumSubarray(int A[], int aux[], int i, int j, int diff)
{
    int max_so_far = A[i];
    int max_ending_here = A[i];
    aux[i] = A[i];

    for (int k = i + diff; k != j; k += diff)
    {
        // update the maximum sum of subarray "ending" or "starting" at index `k`
        max_ending_here = max(A[k], max_ending_here + A[k]);

        // update the result if the current subarray sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here);
        aux[k] = max_so_far;
    }
}

void fillArrays(int A[], int left_max[], int right_max[],
                int left_min[], int right_min[], int n)
{
    findMaxSumSubarray(A, left_max, 0, n - 1, 1);
    findMaxSumSubarray(A, right_max, n - 1, 0, -1);

    // negate `A[]` for finding the minimum sum of subarrays using
    // the same logic for finding the maximum sum of subarrays
    transform(A, A + n, A, negate<int>());

    // `transform()` is equivalent to

    /* for (int i = 0; i < n; i++) {
        A[i] = -A[i];
    } */

    findMaxSumSubarray(A, left_min, 0, n - 1, 1);
    findMaxSumSubarray(A, right_min, n - 1, 0, -1);

    // negate `left_min[]` and `right_min[]` to get the minimum sum of subarrays
    transform(left_min, left_min + n, left_min, negate<int>());
    transform(right_min, right_min + n, right_min, negate<int>());

    // restore the sign of `A[]`
    transform(A, A + n, A, negate<int>());
}

// Find the maximum absolute difference between the sum of elements of
// two non-overlapping subarrays in a given array
int findMaxAbsDiff(int A[], int n)
{
    // base case
    if (n == 0) {
        return 0;
    }

    // base case
    if (n == 1) {
        return A[0];
    }

    // `left_max[i]` stores maximum sum of subarray in `A(0, i)`
    // `right_max[i]` stores maximum sum of subarray in `A(i, n-1)`
    // `left_min[i]` stores minimum sum of subarray in `A(0, i)`
    // `right_min[i]` stores minimum sum of subarray in `A(i, n-1)`

    int left_max[n], right_max[n], left_min[n], right_min[n];
    fillArrays(A, left_max, right_max, left_min, right_min, n);

    // stores the maximum absolute difference
    int max_abs_diff = INT_MIN;

    // do for each index `i` in the array
    for (int i = 0; i < n - 1; i++)
    {
        max_abs_diff = max(max_abs_diff, max(abs(left_max[i] - right_min[i+1]),
                                    abs(left_min[i] - right_max[i+1])));
    }

    return max_abs_diff;
}

int main()
{
    int A[] = { -3, -2, 6, -3, 5, -9, 3, 4, -1, -8, 2 };
    int n = sizeof(A) / sizeof(A[0]);

    cout << "The maximum absolute difference is " << findMaxAbsDiff(A, n);

    return 0;
}
```

**Output:** The maximum absolute difference is 19

##

```java
class Main
{
    // `diff` ——> counter for loop from `i` to `j` in `A[]` (`diff` can be `1` or `-1`)

    // If the `diff` is 1, fill `aux[k]` with the maximum sum of subarray `A[0, k]`
    // If the `diff` is -1, fill `aux[k]` with the maximum sum of subarray `A[k, n-1]`
    // using Kadane’s algorithm

    public static void findMaxSumSubarray(int[] A, int[] aux, int i, int j,
                                                            int diff)
    {
        int max_so_far = A[i];
        int max_ending_here = A[i];
        aux[i] = A[i];

        for (int k = i + diff; k != j; k += diff)
        {
            // update the maximum sum of subarray "ending" or "starting" at index `k`
            max_ending_here = Integer.max(A[k], max_ending_here + A[k]);

            // update the result if the current subarray sum is found to be greater
            max_so_far = Integer.max(max_so_far, max_ending_here);
            aux[k] = max_so_far;
        }
    }

    public static void fillArrays(int[] A, int[] left_max, int[] right_max,
                    int[] left_min, int[] right_min, int n)
    {
        findMaxSumSubarray(A, left_max, 0, n - 1, 1);
        findMaxSumSubarray(A, right_max, n - 1, 0, -1);

        // negate `A[]` for finding the minimum sum of subarrays using
        // the same logic for finding the maximum sum of subarrays
        for (int i = 0; i < n; i++) {
            A[i] = -A[i];
        }

        findMaxSumSubarray(A, left_min, 0, n - 1, 1);
        findMaxSumSubarray(A, right_min, n - 1, 0, -1);

        // negate `left_min[]` and `right_min[]` to get the minimum sum of subarrays
        for (int i = 0; i < n; i++) {
            left_min[i] = -left_min[i];
        }

        for (int i = 0; i < n; i++) {
            right_min[i] = -right_min[i];
        }

        // restore the sign of `A[]`
        for (int i = 0; i < n; i++) {
            A[i] = -A[i];
        }
    }

    // Find the maximum absolute difference between the sum of elements of
    // two non-overlapping subarrays in a given array
    public static int findMaxAbsDiff(int[] A)
    {
        int n = A.length;

        // base case
        if (n == 0) {
            return 0;
        }

        // base case
        if (n == 1) {
            return A[0];
        }

        // `left_max[i]` stores maximum sum of subarray in `A(0, i)`
        // `right_max[i]` stores maximum sum of subarray in `A(i, n-1)`
        // `left_min[i]` stores minimum sum of subarray in `A(0, i)`
        // `right_min[i]` stores minimum sum of subarray in `A(i, n-1)`

        int[] left_max = new int[n];
        int[] right_max = new int[n];
        int[] left_min = new int[n];
        int[] right_min = new int[n];

        fillArrays(A, left_max, right_max, left_min, right_min, n);

        // stores the maximum absolute difference
        int max_abs_diff = Integer.MIN_VALUE;

        // do for each index `i` in the array
        for (int i = 0; i < n - 1; i++)
        {
            int abs_diff = Integer.max(Math.abs(left_max[i] - right_min[i+1]),
                                    Math.abs(left_min[i] - right_max[i+1]));
            max_abs_diff = Integer.max(max_abs_diff, abs_diff);
        }

        return max_abs_diff;
    }

    public static void main(String[] args)
    {
        int[] A = { -3, -2, 6, -3, 5, -9, 3, 4, -1, -8, 2 };

        System.out.print("The maximum absolute difference is " + findMaxAbsDiff(A));
    }
}
```

##

```python3
import sys

# `diff` ——> counter for loop from `i` to `j` in `A[]` (`diff` can be `+1` or `-1`)
# Fill `aux[k]` with the maximum sum of sublist `A(0, k)` if the `diff` is 1, or
# maximum sum of sublist `A(k, n-1)` if the `diff` is -1 using Kadane’s algorithm
def findMaxSumSublist(A, aux, i, j, diff):

    max_so_far = max_ending_here = aux[i] = A[i]

    k = i + diff
    while k != j:
        # update the maximum sum of sublist "ending" or "starting" at index `k`
        max_ending_here = max(A[k], max_ending_here + A[k])

        # update the result if the current sublist sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here)
        aux[k] = max_so_far

        k = k + diff

def fillArrays(A, left_max, right_max, left_min, right_min, n):

    findMaxSumSublist(A, left_max, 0, n - 1, 1)
    findMaxSumSublist(A, right_max, n - 1, 0, -1)

    # negate `A` for finding the minimum sum of sublists using
    # the same logic for finding the maximum sum of sublists
    for i in range(n):
        A[i] = -A[i]

    findMaxSumSublist(A, left_min, 0, n - 1, 1)
    findMaxSumSublist(A, right_min, n - 1, 0, -1)

    # negate `left_min[]` and `right_min[]` to get the minimum sum of sublists
    for i in range(n):
        left_min[i] = -1 * left_min[i]

    for i in range(n):
        right_min[i] = -1 * right_min[i]

    # restore the sign of `A`
    for i in range(n):
        A[i] = -A[i]

# Find the maximum absolute difference between the sum of elements of
# two non-overlapping sublists in a given list
def findMaxAbsDiff(A):

    n = len(A)

    # base case
    if n == 0:
        return 0

    # base case
    if n == 1:
        return nums[0]

    # `left_max[i]` stores maximum sum of sublist in `A(0, i)`
    left_max = [-sys.maxsize] * n

    # `right_max[i]` stores maximum sum of sublist in `A(i, n-1)`
    right_max = [-sys.maxsize] * n

    # `left_min[i]` stores minimum sum of sublist in `A(0, i)`
    left_min = [sys.maxsize] * n

    # `right_min[i]` stores minimum sum of sublist in `A(i, n-1)`
    right_min = [sys.maxsize] * n

    fillArrays(A, left_max, right_max, left_min, right_min, n)

    # stores the maximum absolute difference
    max_abs_diff = -sys.maxsize

    # do for each index `i` in the list
    for i in range(n - 1):
        abs_diff = max(abs(left_max[i] - right_min[i + 1]),
                    abs(left_min[i] - right_max[i + 1]))
        max_abs_diff = max(max_abs_diff, abs_diff)

    return max_abs_diff

if __name__ == '__main__':

    A = [-3, -2, 6, -3, 5, -9, 3, 4, -1, -8, 2]

    print("The maximum absolute difference is", findMaxAbsDiff(A))
```

Also See:

> [Maximum Sum Circular Subarray](https://www.techiedelight.com/maximum-sum-circular-subarray/ "Maximum Sum Circular Subarray")

> [Find minimum product among all combinations of triplets in an array](https://www.techiedelight.com/find-minimum-product-triplets-array/ "Find minimum product among all combinations of triplets in an array")

> [Maximum Sum Subarray Problem (Kadane’s Algorithm)](https://www.techiedelight.com/maximum-subarray-problem-kadanes-algorithm/ "Maximum Sum Subarray Problem \(Kadane’s Algorithm\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 131

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
