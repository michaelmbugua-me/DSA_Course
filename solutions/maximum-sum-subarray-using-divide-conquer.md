# Maximum Subarray Sum using Divide and Conquer

> Source: https://www.techiedelight.com/maximum-sum-subarray-using-divide-conquer/

Given an integer array, find the maximum sum among all subarrays possible.

The problem differs from the problem of finding the maximum subsequence sum. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

For example,

**Input:** nums[] = [2, -4, **1, 9, -6, 7** , -3] **Output:** The maximum sum of the subarray is 11 (Marked in **Green**)

> 

A naive solution is to consider every possible subarray, find the sum, and take the maximum. The problem with this approach is that its worst-case time complexity is O(n2), where `n` is the size of the input.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <limits.h>

// A naive solution to finding maximum subarray sum using divide-and-conquer
int maximum_sum(int nums[], int n)
{
    int max_sum = INT_MIN;
    int sum = 0;

    // do for each subarray starting with `i`
    for (int i = 0; i < n; i++)
    {
        // calculate the sum of subarray `nums[i…j]`

        sum = 0;    // reset sum

        // do for each subarray ending at `j`
        for (int j = i; j < n; j++)
        {
            sum += nums[j];

            // if the current subarray sum is greater than the maximum
            // sum calculated so far, update the maximum sum
            if (sum > max_sum) {
                max_sum = sum;
            }
        }
    }

    return max_sum;
}

int main(void)
{
    int arr[] = { 2, -4, 1, 9, -6, 7, -3 };
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("The maximum sum of the subarray is %d", maximum_sum(arr, n));

    return 0;
}
```

**Output:** The maximum sum of the subarray is 11

##

```java
class Main
{
    // A naive solution to finding maximum subarray sum using
    // divide-and-conquer
    public static int findMaximumSum(int[] nums)
    {
        int maxSum = Integer.MIN_VALUE;
        int sum = 0;

        // do for each subarray starting with `i`
        for (int i = 0; i < nums.length; i++)
        {
            // calculate the sum of subarray `nums[i…j]`

            sum = 0;    // reset sum

            // do for each subarray ending at `j`
            for (int j = i; j < nums.length; j++)
            {
                sum += nums[j];

                // if the current subarray sum is greater than the maximum
                // sum calculated so far, update the maximum sum
                if (sum > maxSum) {
                    maxSum = sum;
                }
            }
        }

        return maxSum;
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, -4, 1, 9, -6, 7, -3 };
        System.out.println("The maximum sum of the subarray is " + findMaximumSum(nums));
    }
}
```

##

```python3
import sys

# Naive solution to find maximum sublist sum using divide-and-conquer
def findMaximumSum(nums):

    maxSum = -sys.maxsize

    # do for each sublist starting with `i`
    for i in range(len(nums)):

        # calculate the sum of sublist `nums[i…j]`

        total = 0        # reset sum

        # do for each sublist ending at `j`
        for j in range(i, len(nums)):
            total += nums[j]

            # if the current sublist sum is greater than the maximum sum
            # calculated so far, update the maximum sum
            if total > maxSum:
                maxSum = total

    return maxSum

if __name__ == '__main__':

    nums = [2, -4, 1, 9, -6, 7, -3]
    print('The Maximum sum of the sublist is', findMaximumSum(nums))
```

How can we perform better?

The idea is to use [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) technique to find the maximum subarray sum. The algorithm works as follows:

  * Divide the array into two equal subarrays.
  * Recursively calculate the maximum subarray sum for the left subarray,
  * Recursively calculate the maximum subarray sum for the right subarray,
  * Find the maximum subarray sum that crosses the middle element.
  * Return the maximum of the above three sums.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

// Utility function to find the maximum of two numbers
int max(int x, int y) {
    return (x > y) ? x : y;
}

// Function to find the maximum subarray sum using divide-and-conquer
int maximum_sum(int nums[], int low, int high)
{
    // If the array contains 0 or 1 element
    if (high <= low) {
        return nums[low];
    }

    // Find the middle array element
    int mid = (low + high) / 2;

    // Find maximum subarray sum for the left subarray,
    // including the middle element
    int left_max = INT_MIN;
    int sum = 0;
    for (int i = mid; i >= low; i--)
    {
        sum += nums[i];
        if (sum > left_max) {
            left_max = sum;
        }
    }

    // Find maximum subarray sum for the right subarray,
    // excluding the middle element
    int right_max = INT_MIN;
    sum = 0;    // reset sum to 0
    for (int i = mid + 1; i <= high; i++)
    {
        sum += nums[i];
        if (sum > right_max) {
            right_max = sum;
        }
    }

    // Recursively find the maximum subarray sum for the left
    // and right subarray, and take maximum
    int max_left_right = max(maximum_sum(nums, low, mid),
                            maximum_sum(nums, mid + 1, high));

    // return the maximum of the three
    return max(max_left_right, left_max + right_max);
}

int main(void)
{
    int arr[] = { 2, -4, 1, 9, -6, 7, -3 };
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("The maximum sum of the subarray is %d",
            maximum_sum(arr, 0, n - 1));

    return 0;
}
```

**Output:** The maximum sum of the subarray is 11

##

```java
class Main
{
    // Function to find the maximum subarray sum using divide-and-conquer
    public static int findMaximumSum(int[] nums, int left, int right)
    {
        // If the array contains 0 or 1 element
        if (right == left) {
            return nums[left];
        }

        // Find the middle array element
        int mid = (left + right) / 2;

        // Find maximum subarray sum for the left subarray,
        // including the middle element
        int leftMax = Integer.MIN_VALUE;
        int sum = 0;
        for (int i = mid; i >= left; i--)
        {
            sum += nums[i];
            if (sum > leftMax) {
                leftMax = sum;
            }
        }

        // Find maximum subarray sum for the right subarray,
        // excluding the middle element
        int rightMax = Integer.MIN_VALUE;
        sum = 0;    // reset sum to 0
        for (int i = mid + 1; i <= right; i++)
        {
            sum += nums[i];
            if (sum > rightMax) {
                rightMax = sum;
            }
        }

        // Recursively find the maximum subarray sum for the left
        // and right subarray, and take maximum
        int maxLeftRight = Integer.max(findMaximumSum(nums, left, mid),
                                    findMaximumSum(nums, mid + 1, right));

        // return the maximum of the three
        return Integer.max(maxLeftRight, leftMax + rightMax);
    }

    // Wrapper over findMaximumSum() function
    public static int findMaximumSum(int[] nums)
    {
        // base case
        if (nums == null || nums.length == 0) {
            return 0;
        }

        return findMaximumSum(nums, 0, nums.length - 1);
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, -4, 1, 9, -6, 7, -3 };

        System.out.println("The maximum sum of the subarray is " +
                findMaximumSum(nums));
    }
}
```

##

```python3
import sys

# Function to find the maximum sublist sum using divide-and-conquer
def findMaximumSum(nums, left=None, right=None):

    # base case
    if not nums:
        return 0

    if left is None and right is None:
        left, right = 0, len(nums) - 1

    # If the list contains 0 or 1 element
    if right == left:
        return nums[left]

    # Find the middle element in the list
    mid = (left + right) // 2

    # Find maximum sublist sum for the left sublist,
    # including the middle element
    leftMax = -sys.maxsize
    total = 0
    for i in range(mid, left - 1, -1):
        total += nums[i]
        if total > leftMax:
            leftMax = total

    # Find maximum sublist sum for the right sublist,
    # excluding the middle element
    rightMax = -sys.maxsize
    total = 0        # reset sum to 0

    for i in range(mid + 1, right + 1):
        total += nums[i]
        if total > rightMax:
            rightMax = total

    # Recursively find the maximum sublist sum for the left
    # and right sublist, and take maximum
    maxLeftRight = max(findMaximumSum(nums, left, mid),
                    findMaximumSum(nums, mid + 1, right))

    # return the maximum of the three
    return max(maxLeftRight, leftMax + rightMax)

if __name__ == '__main__':

    nums = [2, -4, 1, 9, -6, 7, -3]
    print('The Maximum sum of the sublist is', findMaximumSum(nums))
```

The time complexity of the above divide-and-conquer solution is O(n.log(n)) as for the given array of size `n`, we make two recursive calls on input size `n/2` and finding the maximum subarray crosses midpoint takes O(n) time in the worst case. Therefore,

T(n) = 2T(n/2) + O(n) = O(n.log(n))

We can also solve this problem in O(n) time using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/).
