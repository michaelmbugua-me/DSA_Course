# Determine the index of an element that satisfies given constraints in an array

> Source: https://www.techiedelight.com/determine-index-element-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, determine the index of an element before which all elements are smaller and after which all are greater.

For example,

**Input:** nums[] = {4, 2, 3, 5, 1, **6** , 9, 7} **Output:** Index 5 All elements before index 5 are smaller, and all elements after index 5 are greater.

> 

A naive solution would be to traverse the array and find an index with all smaller elements to its left and all greater elements to its right. The time complexity of this solution is O(n2) for an input containing `n` elements since, for each array element, we end up traversing the whole array again.

We can easily solve this problem in linear time using some extra space. The idea is to create two auxiliary arrays where each index of the first array stores the maximum element to the left, and that of the second array stores the minimum element to the right. We find an index whose value is greater than the maximum value to its left but smaller than the minimum value to its right after filling up both arrays.

```c
#include <stdio.h>
#include <limits.h>

int max(int x, int y) { return (x > y) ? x : y; }
int min(int x, int y) { return (x < y) ? x : y; }

// Determine the index of an element in an array before which all elements
// are smaller and after which all are greater
int findIndex(int nums[], int n)
{
    // base case
    if (n <= 2) {
        return -1;
    }

    // `left[i]` stores the maximum element in subarray `nums[0…i-1]`
    int left[n];

    // initialize `left[0]` to the minimum value
    left[0] = INT_MIN;

    // traverse the array from left to right and fill `left[]`
    for (int i = 1; i < n; i++) {
        left[i] = max(left[i - 1], nums[i - 1]);
    }

    // `right[i]` stores the minimum element in subarray `nums[i+1, n-1]`
    int right[n];

    // initialize `right[0]` to the maximum value
    right[n-1] = INT_MAX;

    // traverse the array from right to left and fill `right[]`
    for (int i = n - 2; i >= 0; i--) {
        right[i] = min(right[i + 1], nums[i + 1]);
    }

    // traverse the array and return the desired index
    for (int i = 1; i < n-1; i++)
    {
        // index found
        if (left[i] < nums[i] && nums[i] < right[i]) {
            return i;
        }
    }

    // return negative index if the input is invalid
    return -1;
}

int main(void)
{
    int nums[] = { 4, 2, 3, 5, 1, 6, 9, 7 };
    int n = sizeof nums / sizeof nums[0];

    int index = findIndex(nums, n);

    if (index >= 0 && index < n) {
        printf("The required index is %d", index);
    }
    else {
        printf("Invalid Input");
    }

    return 0;
}
```

**Output:** The required index is 5

##

```java
class Main
{
    // Determine the index of an array element before which all elements
    // are smaller and after which all are greater
    public static int findIndex(int[] nums)
    {
        // get the length of the array
        int n = nums.length;

        // base case
        if (n <= 2) {
            return -1;
        }

        // `left[i]` stores the maximum element in subarray `nums[0…i-1]`
        int[] left = new int[n];

        // initialize `left[0]` to the minimum value
        left[0] = Integer.MIN_VALUE;

        // traverse the array from left to right and fill `left[]`
        for (int i = 1; i < n; i++) {
            left[i] = Math.max(left[i - 1], nums[i - 1]);
        }

        // `right[i]` stores the minimum element in subarray `nums[i+1, n-1]`
        int[] right = new int[n];

        // initialize `right[0]` to the maximum value
        right[n-1] = Integer.MAX_VALUE;

        // traverse the array from right to left and fill `right[]`
        for (int i = n - 2; i >= 0; i--) {
            right[i] = Math.min(right[i + 1], nums[i + 1]);
        }

        // traverse the array and return the desired index
        for (int i = 1; i < n-1; i++)
        {
            // index found
            if (left[i] < nums[i] && nums[i] < right[i]) {
                return i;
            }
        }

        // return negative index if the input is invalid
        return -1;
    }

    public static void main(String[] args)
    {
        int[] nums = { 4, 2, 3, 5, 1, 6, 9, 7 };

        int index = findIndex(nums);

        if (index >= 0 && index < nums.length) {
            System.out.println("The required index is " + index);
        }
        else {
            System.out.println("Invalid Input");
        }
    }
}
```

##

```python3
import sys

# Determine the index of an element in a list before which all elements
# are smaller and after which all are greater
def findIndex(nums):

    # get the length of the list
    n = len(nums)

    # base case
    if n <= 2:
        return -1

    # `left[i]` stores the maximum element in sublist `nums[0…i-1]`
    left = [None] * n

    # initialize `left[0]` to the minimum value
    left[0] = -sys.maxsize

    # traverse the list from left to right and fill left
    for i in range(1, n):
        left[i] = max(left[i - 1], nums[i - 1])

    # `right[i]` stores the minimum element in sublist `nums[i+1, n-1]`
    right = [None] * n

    # initialize `right[0]` to the maximum value
    right[n-1] = sys.maxsize

    # traverse the list from right to left and fill right
    for i in reversed(range(n - 1)):
        right[i] = min(right[i + 1], nums[i + 1])

    # traverse the list and return the desired index
    for i in range(1, n-1):
        # index found
        if left[i] < nums[i] < right[i]:
            return i

    # return negative index if the input is invalid
    return -1

if __name__ == '__main__':

    nums = [4, 2, 3, 5, 1, 6, 9, 7]

    index = findIndex(nums)
    if 0 <= index < len(nums):
        print('The required index is', index)
    else:
        print('Invalid Input')
```

The above solution performs three traversals of the input array and uses two auxiliary arrays. We can optimize the code to solve this problem with just two traversals of the array and one auxiliary array.

The idea is to keep track of the minimum element found so far while traversing the array from right to left and then use it to find the required index. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

int max(int x, int y) { return (x > y) ? x : y; }

// Determine the index of an element in an array before which all elements
// are smaller and after which all are greater
int findIndex(int nums[], int n)
{
    // base case
    if (n <= 2) {
        return -1;
    }

    // `left[i]` stores the max element in subarray `nums[0…i-1]`
    int left[n];

    // initialize `left[0]` to minimum value
    left[0] = INT_MIN;

    // traverse the array from left to right and fill `left[]`
    for (int i = 1; i < n; i++) {
        left[i] = max(left[i - 1], nums[i - 1]);
    }

    // stores minimum element found so far to the right
    int min_so_far = nums[n-1];

    // return negative index if the input is invalid
    int index = -1;

    // traverse the array from right to left
    for (int i = n - 2; i > 0; i--)
    {
        // the desired index is found
        if (left[i] < nums[i] && nums[i] < min_so_far) {
            index = i;
        }

        // update the minimum element so far if required
        if (min_so_far > nums[i]) {
            min_so_far = nums[i];
        }
    }

    return index;
}

int main(void)
{
    int nums[] = { 4, 2, 3, 5, 1, 6, 9, 7 };
    int n = sizeof nums / sizeof nums[0];

    int index = findIndex(nums, n);

    if (index >= 0 && index < n) {
        printf("The required index is %d", index);
    }
    else {
        printf("Invalid Input");
    }

    return 0;
}
```

**Output:** The required index is 5

##

```java
class Main
{
    // Determine the index of an array element before which all elements
    // are smaller and after which all are greater
    public static int findIndex(int[] nums)
    {
        // base case
        if (nums.length <= 2) {
            return -1;
        }

        // `left[i]` stores the max element in subarray `nums[0…i-1]`
        int[] left = new int[nums.length];

        // initialize `left[0]` to minimum value
        left[0] = Integer.MIN_VALUE;

        // traverse the array from left to right and fill `left[]`
        for (int i = 1; i < nums.length; i++) {
            left[i] = Math.max(left[i - 1], nums[i - 1]);
        }

        // stores minimum element found so far to the right
        int min_so_far = nums[nums.length-1];

        // return negative index if the input is invalid
        int index = -1;

        // traverse the array from right to left
        for (int i = nums.length - 2; i > 0; i--)
        {
            // the desired index is found
            if (left[i] < nums[i] && nums[i] < min_so_far) {
                index = i;
            }

            // update the minimum element so far if required
            if (min_so_far > nums[i]) {
                min_so_far = nums[i];
            }
        }

        return index;
    }

    public static void main(String[] args)
    {
        int[] nums = { 4, 2, 3, 5, 1, 6, 9, 7 };

        int index = findIndex(nums);

        if (index >= 0 && index < nums.length) {
            System.out.println("The required index is " + index);
        }
        else {
            System.out.println("Invalid Input");
        }
    }
}
```

##

```python3
import sys

# Determine the index of an element in the list before which all elements
# are smaller and after which all are greater
def findIndex(nums):

    # base case
    if len(nums) <= 2:
        return -1

    # `left[i]` stores the max element in sublist `nums[0…i-1]`
    left = [None] * len(nums)

    # initialize `left[0]` to minimum value
    left[0] = -sys.maxsize

    # traverse the list from left to right and fill left
    for i in range(1, len(nums)):
        left[i] = max(left[i - 1], nums[i - 1])

    # stores minimum element found so far to the right
    min_so_far = nums[-1]

    # return negative index if the input is invalid
    index = -1

    # traverse the list from right to left
    for i in reversed(range(1, len(nums) - 1)):

        # the desired index is found
        if left[i] < nums[i] < min_so_far:
            index = i

        # update the minimum element so far if required
        if min_so_far > nums[i]:
            min_so_far = nums[i]

    return index

if __name__ == '__main__':

    nums = [4, 2, 3, 5, 1, 6, 9, 7]

    index = findIndex(nums)

    if 0 <= index < len(nums):
        print('The required index is', index)
    else:
        print('Invalid Input')
```
