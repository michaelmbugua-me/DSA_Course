# Find the peak element in an array

> Source: https://www.techiedelight.com/find-peak-element-array/

Given an integer array, find the peak element in it. A peak element is an element that is greater than its neighbors. There might be multiple peak elements in an array, and the solution should report any peak element.

An element `A[i]` of an array `A` is a peak element if it’s not smaller than its neighbor(s).

A[i-1] <= A[i] >= A[i+1] for 0 < i < n-1 A[i-1] <= A[i] if i = n – 1 A[i] >= A[i+1] if i = 0

For example,

**Input :** [8, 9, 10, 2, 5, 6] **Output:** The peak element is 10 (or 6) **Input :** [8, 9, 10, 12, 15] **Output:** The peak element is 15 **Input :** [10, 8, 6, 5, 3, 2] **Output:** The peak element is 10

> 

A naive solution would be to test all elements for peak by running a linear search on the array and return the greater element than its neighbors. Two special cases needs to be handled. If the array is sorted in descending order, its peak element is the first element. If the array is sorted in ascending order, the peak element is the last. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input.

We can easily solve this problem in O(log(n)) time by using an idea similar to the [binary search algorithm](https://techiedelight.com/binary-search/). The idea is to calculate the mid-index, and if the middle element is greater than both of its neighbors, return the element as it is a peak. If the right neighbor of mid-index is greater than the middle element, recursively find the peak on the array’s right side. If the left neighbor of mid-index is greater than the middle element, recursively find the peak in the array’s left side.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// Recursive function to find the peak element in an array
int findPeakElement(int nums[], int low, int high, int n)
{
    // find the middle element. To avoid overflow, use mid = low + (high - low) / 2
    int mid = (low + high) / 2;

    // check if the middle element is greater than its neighbors
    if ((mid == 0 || nums[mid - 1] <= nums[mid]) &&
            (mid == n - 1 || nums[mid + 1] <= nums[mid])) {
        return mid;
    }

    // If the left neighbor of `mid` is greater than the middle element,
    // find the peak recursively in the left subarray
    if (mid - 1 >= 0 && nums[mid - 1] > nums[mid]) {
        return findPeakElement(nums, low, mid - 1, n);
    }

    // If the right neighbor of `mid` is greater than the middle element,
    // find the peak recursively in the right subarray
    return findPeakElement(nums, mid + 1, high, n);
}

int findPeak(int nums[], int n)
{
    // base case
    if (n == 0) {
        exit(-1);
    }

    int index = findPeakElement(nums, 0, n - 1, n);
    return nums[index];
}

int main(void)
{
    int nums[] = { 8, 9, 10, 2, 5, 6 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The peak element is %d", findPeak(nums, n));

    return 0;
}
```

**Output:** The peak element is 10

##

```java
class Main
{
    // Recursive function to find the peak element in an array
    public static int findPeakElement(int[] nums, int left, int right)
    {
        // find the middle element. To avoid overflow, use mid = low + (high - low) / 2
        int mid = (left + right) / 2;

        // check if the middle element is greater than its neighbors
        if ((mid == 0 || nums[mid - 1] <= nums[mid]) &&
                (mid == nums.length - 1 || nums[mid + 1] <= nums[mid])) {
            return mid;
        }

        // If the left neighbor of `mid` is greater than the middle element,
        // find the peak recursively in the left subarray
        if (mid - 1 >= 0 && nums[mid - 1] > nums[mid]) {
            return findPeakElement(nums, left, mid - 1);
        }

        // If the right neighbor of `mid` is greater than the middle element,
        // find the peak recursively in the right subarray
        return findPeakElement(nums, mid + 1, right);
    }

    public static int findPeakElement(int[] nums)
    {
        // base case
        if (nums == null || nums.length == 0) {
            System.exit(-1);
        }

        int index = findPeakElement(nums, 0, nums.length - 1);
        return nums[index];
    }

    public static void main(String[] args)
    {
        int[] nums = { 8, 9, 10, 2, 5, 6 };
        System.out.println("The peak element is " + findPeakElement(nums));
    }
}
```

##

```python3
# Recursive function to find the peak element in a list
def findPeak(nums, left=None, right=None):

    # Initialize left and right
    if left is None and right is None:
        left, right = 0, len(nums) - 1

    # find the middle element. To avoid overflow, use mid = left + (right - left) / 2
    mid = (left + right) // 2

    # check if the middle element is greater than its neighbors
    if ((mid == 0 or nums[mid - 1] <= nums[mid]) and
            (mid == len(nums) - 1 or nums[mid + 1] <= nums[mid])):
        return mid

    # If the left neighbor of `mid` is greater than the middle element,
    # find the peak recursively in the left sublist
    if mid - 1 >= 0 and nums[mid - 1] > nums[mid]:
        return findPeak(nums, left, mid - 1)

    # If the right neighbor of `mid` is greater than the middle element,
    # find the peak recursively in the right sublist
    return findPeak(nums, mid + 1, right)

def findPeakElement(nums) -> int:

    # base case
    if not nums:
        exit(-1)

    index = findPeak(nums)
    return nums[index]

if __name__ == '__main__':

    nums = [8, 9, 10, 2, 5, 6]
    print('The peak element is', findPeakElement(nums))
```

The time complexity of the above solution is O(log(n)), and the auxiliary space used by the program is O(log(n)).

STL’s implementation using [std::adjacent_find](https://en.cppreference.com/w/cpp/algorithm/adjacent_find):

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find a peak in an array
int findPeakElement(vector<int> const &nums)
{
    if (nums.size() == 0) {
        exit(-1);
    }

    auto peak = adjacent_find(nums.begin(), nums.end(), greater<int>());
    if (peak == nums.end())
    {
        // to handle the case when the array is sorted in ascending order,
        // reposition to the last element
        --peak;
    }
    return *peak;
}

int main()
{
    vector<int> nums = { 6, 8, 9, 14, 10, 12 };

    cout << "The peak element is " << findPeakElement(nums);

    return 0;
}
```

**Output:** The peak element is 14

**References:** <https://stackoverflow.com/questions/16933543/peak-element-in-an-array-in-c>
