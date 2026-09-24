# Find the odd occurring element in an array in logarithmic time

> Source: https://www.techiedelight.com/find-odd-occurring-element-logn-time/

Given an integer array where every element appears an even number of times, except one element which appears an odd number of times. If the identical elements appear in pairs in the array and there cannot be more than two consecutive occurrences of an element, find the odd occurring element in logarithmic time and constant space.

For instance, both these arrays are invalid – `{1, 2, 1}` and `{1, 1, 2, 2, 2, 3, 3}`. The first one doesn’t have identical elements appear in pairs, and the second one contains three consecutive instances of an element. On the other hand, the array `{2, 2, 3, 3, 2, 2, 4, 4, 3, 1, 1}` is valid, and the odd occurring element present in it is 3.

> 

A naive solution is to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and count each element’s occurrence by traversing the sorted array. We return the element with the odd count. The time complexity of this solution is O(n.log(n)), where `n` is the size of the input.

The above approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find an odd occurring element in a given array
int findOddOccuring(vector<int> nums)
{
    // sort the array
    sort(nums.begin(), nums.end());

    // traverse the array from the beginning
    int i = 0;
    while (i < nums.size())
    {
        // store the current element
        int curr = nums[i];

        // find the count of the current element
        int count = 0;
        while (i < nums.size() && nums[i] == curr)
        {
            count++;
            i++;
        }

        // if the count of the current element is odd, return it
        if (count & 1) {
            return curr;
        }
    }

    // invalid input
    return -1;
}

int main()
{
    vector<int> nums = { 2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1 };

    cout << "The odd occurring element is " << findOddOccuring(nums);

    return 0;
}
```

**Output:** The odd occurring element is 3

##

```java
import java.util.Arrays;

class Main
{
    // Function to find an odd occurring element in a given array
    public static int findOddOccuring(int[] nums)
    {
        // sort the array
        Arrays.sort(nums);

        // traverse the array from the beginning
        int i = 0;
        while (i < nums.length)
        {
            // store the current element
            int curr = nums[i];

            // find the count of the current element
            int count = 0;
            while (i < nums.length && nums[i] == curr)
            {
                count++;
                i++;
            }

            // if the count of the current element is odd, return it
            if (count % 2 == 1) {
                return curr;
            }
        }

        // invalid input
        return -1;
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1 };
        System.out.println("The odd occurring element is " + findOddOccuring(nums));
    }
}
```

##

```python3
# Function to find an odd occurring element in a given list
def findOddOccuring(nums):

    # sort the list
    nums.sort()

    # traverse the list from the beginning
    i = 0
    while i < len(nums):

        # store the current element
        curr = nums[i]

        # find the count of the current element
        count = 0
        while i < len(nums) and nums[i] == curr:
            count = count + 1
            i = i + 1

        # if the count of the current element is odd, return it
        if count % 2 == 1:
            return curr

    # invalid input
    return -1

if __name__ == '__main__':

    nums = [2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1]
    print('The odd occurring element is', findOddOccuring(nums))
```

We can solve this problem in linear time [using the XOR operator](https://techiedelight.com/find-odd-occurring-element-array-single-traversal/). The idea is to take XOR of all array elements. The even occurring elements will cancel each other, and only the odd occurring elements are left. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Function to find an odd occurring element in a given array
int findOddOccuring(int nums[], int n)
{
    int xor = 0;
    for (int i = 0; i < n; i++) {
        xor = xor ^ nums[i];
    }

    return xor;
}

int main(void)
{
    int nums[] = { 2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The odd occurring element is %d ", findOddOccuring(nums, n));

    return 0;
}
```

**Output:** The odd occurring element is 3

##

```java
class Main
{
    // Function to find an odd occurring element in a given array
    public static int findOddOccuring(int[] nums)
    {
        int xor = 0;
        for (int i: nums) {
            xor = xor ^ i;
        }

        return xor;
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1 };

        System.out.println("The odd occurring element is " + findOddOccuring(nums));
    }
}
```

##

```python3
# Function to find an odd occurring element in a given list
def findOddOccuring(nums):

    xor = 0
    for i in nums:
        xor = xor ^ i

    return xor

if __name__ == '__main__':

    nums = [2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1]

    print('The odd occurring element is', findOddOccuring(nums))
```

We can even solve this problem in O(log(n)) time.

As per problem constraints, identical elements appear in pairs in the array, and there cannot be more than two consecutive occurrences of any element. So, there must be a single occurrence of the odd element somewhere in the array. We can find this odd occurrence using the [binary search algorithm](https://techiedelight.com/binary-search/).

Consider the following array with their positions:

```
nums[] = { 2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1 }
pos[] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 }
```

If we carefully observe, each pair of the element before the odd occurring element has the first occurrence at an even index and the second occurrence at an odd index. And, each pair of the element after the odd occurrence has the first occurrence at the odd index and the second occurrence at the even index.

We can use the above observation to determine which side of the mid-index the odd occurring element lies. Now, two cases arise:

  1. The mid-index is odd: If the element before the mid-index is the same as the middle element, the odd element lies on the right side; otherwise, it lies on the left side.
  2. The mid-index is even: If the element next to the mid-index is the same as the middle element, the odd element lies on the right side; otherwise, it lies on the left side.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Recursive function to find an odd occurring element in an array
// using binary search. This function assumes the input is valid.
int findOddOccuring(int nums[], int low, int high)
{
    // base case
    if (low == high) {
        return low;
    }

    // find the middle index
    int mid = (low + high) / 2;

    // if `mid` is odd
    if (mid & 1)
    {
        // if the element before `mid` is the same as the middle element, the odd
        // element lies on the right side; otherwise, it lies on the left side
        if (nums[mid] == nums[mid - 1]) {
            return findOddOccuring(nums, mid + 1, high);
        }
        else {
            return findOddOccuring(nums, low, mid - 1);
        }
    }

    // `mid` is even
    else {
        // if the element next to `mid` is the same as the middle element, the odd
        // element lies on the right side; otherwise, it lies on the left side
        if (nums[mid] == nums[mid + 1]) {
            return findOddOccuring(nums, mid + 2, high);
        }
        else {
            return findOddOccuring(nums, low, mid);
        }
    }
}

int main(void)
{
    int nums[] = { 2, 2, 1, 1, 3, 3, 2, 2, 4, 4, 3, 1, 1 };
    int n = sizeof(nums) / sizeof(nums[0]);

    int index = findOddOccuring(nums, 0, n - 1);
    printf("The odd occurring element is %d ", nums[index]);

    return 0;
}
```

**Output:** The odd occurring element is 3
