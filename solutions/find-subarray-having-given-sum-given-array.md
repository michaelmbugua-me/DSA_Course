# Find a subarray having the given sum in an integer array

> Source: https://www.techiedelight.com/find-subarray-having-given-sum-given-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find a subarray having a given sum in it.

For example,

**Input:** nums[] = {2, 6, 0, 9, 7, 3, 1, 4, 1, 10}, target = 15 **Output:** {6, 0, 9} **Input:** nums[] = {0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10}, target = 15 **Output:** {1, -4, 7, 6, 1, 4} or {4, 1, 10} **Input:** nums[] = {0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10}, target = -3 **Output:** {1, -4} or {-7, 1, -4, 7}

> 

## 1\. Using Sliding Window

We can solve this problem by using a [sliding window](https://techiedelight.com/sliding-window-problems/). The idea is to maintain a window that starts from the current element, and the sum of its elements is more than or equal to the given sum. If the current window’s sum becomes less than the given sum, then the window is unstable, and we keep on adding elements to the current window from its right till the window becomes stable again. Print the window if its sum is equal to the given sum at any point. Note this approach will only work with an array of **positive integers**.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <stdio.h>

// Function to print subarray having a given sum using
// sliding window technique
void findSubarray(int nums[], int n, int target)
{
    // maintains the sum of the current window
    int windowSum = 0;

    // maintain a window [low, high-1]
    int low = 0, high = 0;

    // consider every subarray starting from the `low` index
    for (low = 0; low < n; low++)
    {
        // if the current window's sum is less than the given sum,
        // then add elements to the current window from the right
        while (windowSum < target && high < n)
        {
            windowSum += nums[high];
            high++;
        }

        // if the current window's sum is equal to the given sum
        if (windowSum == target)
        {
            printf("Subarray found [%d–%d]\n", low, high - 1);
            return;
        }

        // At this point, the current window's sum is more than the given sum.
        // Remove the current element (leftmost element) from the window
        windowSum -= nums[low];
    }
}

int main(void)
{
    // an array of positive integers
    int nums[] = { 2, 6, 0, 9, 7, 3, 1, 4, 1, 10 };
    int target = 15;

    int n = sizeof(nums)/sizeof(nums[0]);

    findSubarray(nums, n, target);

    return 0;
}
```

**Output:** Subarray found [1–3]

##

```java
class Main
{
    // Function to print subarray having a given sum using
    // sliding window technique
    public static void findSubarray(int[] nums, int target)
    {
        // maintains the sum of the current window
        int windowSum = 0;

        // maintain a window [low, high-1]
        int high = 0;

        // consider every subarray starting from the `low` index
        for (int low = 0; low < nums.length; low++)
        {
            // if the current window's sum is less than the given sum,
            // then add elements to the current window from the right
            while (windowSum < target && high < nums.length)
            {
                windowSum += nums[high];
                high++;
            }

            // if the current window's sum is equal to the given sum
            if (windowSum == target)
            {
                System.out.printf("Subarray found [%d–%d]", low, high - 1);
                return;
            }

            // At this point, the current window's sum is more than the given sum.
            // Remove the current element (leftmost element) from the window
            windowSum -= nums[low];
        }
    }

    public static void main(String[] args)
    {
        // an array of positive integers
        int[] nums = { 2, 6, 0, 9, 7, 3, 1, 4, 1, 10 };
        int target = 15;

        findSubarray(nums, target);
    }
}
```

##

```python3
# Function to print sublist having a given sum using
# sliding window technique
def findSublist(nums, target):

    # maintains the sum of the current window
    windowSum = 0

    # maintain a window [low, high-1]
    (low, high) = (0, 0)

    # consider every sublist starting from `low` index
    for low in range(len(nums)):

        # if the current window's sum is less than the given sum,
        # then add elements to the current window from the right
        while windowSum < target and high < len(nums):
            windowSum += nums[high]
            high = high + 1

        # if the current window's sum is equal to the given sum
        if windowSum == target:
            print('Sublist found', (low, high - 1))
            return

        # At this point, the current window's sum is more than the given sum.
        # Remove the current element (leftmost element) from the window
        windowSum -= nums[low]

if __name__ == '__main__':

    # a list of positive integers
    nums = [2, 6, 0, 9, 7, 3, 1, 4, 1, 10]
    target = 15

    findSublist(nums, target)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

## 2\. Using Hashing

The above solution will fail for negative numbers. We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to check if a subarray with the given sum exists in the array or not. The idea is to traverse the given array and maintain the sum of elements seen so far. If the difference between the current sum and the given sum is seen before (i.e., the difference exists in the set), return true as there is at least one subarray with the given sum that ends at the current index; otherwise, insert the sum into the set.

Following is the implementation of the above algorithm in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// Function to check if subarray with the given sum exists in
// the array or not
bool findSubarray(int nums[], int n, int target)
{
    // create an empty set
    unordered_set<int> set;

    // insert number 0 into the set to handle the case when a
    // subarray with the given sum starts from index 0
    set.insert(0);

    // keep track of the sum of elements so far
    int sum_so_far = 0;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // update `sum_so_far`
        sum_so_far += nums[i];

        // if `sum_so_far - target` is seen before, we have found
        // the subarray with sum equal to `target`
        if (set.find(sum_so_far - target) != set.end()) {
            return true;
        }

        // otherwise, add the sum of elements so far in the set
        set.insert(sum_so_far);
    }

    // we reach here when no subarray exists
    return false;
}

int main()
{
    // an integer array
    int nums[] = { 0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10 };
    int target = -3;

    int n = sizeof(nums)/sizeof(nums[0]);

    if (findSubarray(nums, n, target)) {
        cout << "Subarray with the given sum exists";
    }
    else {
        cout << "Subarray with the given sum does not exist";
    }

    return 0;
}
```

**Output:** Subarray with the given sum exists

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    // Function to check if subarray with the given sum exists in
    // the array or not
    public static boolean findSubarray(int[] nums, int target)
    {
        // create an empty set
        Set<Integer> set = new HashSet<>();

        // insert number 0 into the set to handle the case when a
        // subarray with the given sum starts from index 0
        set.add(0);

        // keep track of the sum of elements so far
        int sum_so_far = 0;

        // traverse the given array
        for (int i: nums)
        {
            // update `sum_so_far`
            sum_so_far += i;

            // if `sum_so_far - target` is seen before, we have found
            // the subarray with sum equal to `target`
            if (set.contains(sum_so_far - target)) {
                return true;
            }

            // otherwise, add the sum of elements so far in the set
            set.add(sum_so_far);
        }

        // we reach here when no subarray exists
        return false;
    }

    public static void main(String[] args)
    {
        // an integer array
        int[] nums = { 0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10 };
        int target = -3;

        if (findSubarray(nums, target)) {
            System.out.println("Subarray with the given sum exists");
        }
        else {
            System.out.println("Subarray with the given sum does not exist");
        }
    }
}
```

##

```python3
# Function to check if a sublist with the given sum exists in the list or not
def findSublist(nums, target):

    # create an empty set
    s = set()

    # insert number 0 into the set to handle the case when a
    # sublist with the given sum starts from index 0
    s.add(0)

    # keep track of the sum of elements so far
    sum_so_far = 0

    # traverse the given list
    for i in nums:

        # update sum_so_far
        sum_so_far += i

        # if `sum_so_far - target` is seen before, we have found
        # the sublist with sum equal to `target`
        if (sum_so_far - target) in s:
            return True

        # otherwise, add the sum of elements so far in the set
        s.add(sum_so_far)

    # we reach here when no sublist exists
    return False

if __name__ == '__main__':

    # a list of integers
    nums = [0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10]
    target = -3

    if findSublist(nums, target):
        print('Sublist with the given sum exists')

    else:
        print('Sublist with the given sum does not exist')
```

We can also print the subarray using hashing. The idea is to use a map instead of a set that stores the ending index of the subarray and its sum.

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to print subarray having a given sum using hashing
void findSubarray(int nums[], int n, int target)
{
    // create an empty map
    unordered_map<int, int> map;

    // insert (0, -1) pair into the set to handle the case when a
    // subarray with the given sum starts from index 0
    map.insert(pair<int, int>(0, -1));

    // keep track of the sum of elements so far
    int sum_so_far = 0;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // update `sum_so_far`
        sum_so_far += nums[i];

        // if `sum_so_far - target` is seen before, we have found
        // the subarray with sum equal to `target`
        if (map.find(sum_so_far - target) != map.end())
        {
            cout << "Subarray found [" << map[sum_so_far - target] + 1 <<
                    "–" << i << "]" << endl;
            return;
        }

        // insert (current sum, current index) pair into the map
        map.insert(pair<int, int>(sum_so_far, i));
    }
}

int main()
{
    // an integer array
    int nums[] = { 0, 5, -7, 1, -4, 7, 6, 1, 4, 1, 10 };
    int target = 15;

    int n = sizeof(nums)/sizeof(nums[0]);

    findSubarray(nums, n, target);

    return 0;
}
```

**Output:** Subarray found [3–8]
