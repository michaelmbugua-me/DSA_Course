# Find maximum length subarray having a given sum

> Source: https://www.techiedelight.com/find-maximum-length-sub-array-having-given-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the maximum length subarray having a given sum.

For example, consider the following array:

nums[] = { 5, 6, -5, 5, 3, 5, 3, -2, 0 } target = 8 Subarrays with sum 8 are { -5, 5, 3, 5 } { 3, 5 } { 5, 3 } The longest subarray is { -5, 5, 3, 5 } having length 4

> 

The problem differs from the problem of finding the maximum length subsequence with given sum. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

A naive solution is to consider all subarrays and find their sum. If the subarray sum is equal to the given sum, update the maximum length subarray. The time complexity of the naive solution is O(n3) as there are `n2` subarrays in an array of size `n`, and it takes O(n) time to find the sum of its elements. We can optimize the method to run in O(n2) time by calculating the subarray sum in constant time.

Following is the implementation in C, Java, and Python based on the above idea:

```c
#include <stdio.h>

// Naive function to find the maximum length subarray with sum `S` present
// in a given array
void findMaxLenSubarray(int nums[], int n, int S)
{
    // `len` stores the maximum length of subarray with sum `S`
    int len = 0;

    // stores ending index of the maximum length subarray having sum `S`
    int ending_index = -1;

    // consider all subarrays starting from `i`
    for (int i = 0; i < n; i++)
    {
        int target = 0;

        // consider all subarrays ending at `j`
        for (int j = i; j < n; j++)
        {
            // sum of elements in the current subarray
            target += nums[j];

            // if we have found a subarray with sum `S`
            if (target == S)
            {
                // update length and ending index of max length subarray
                if (len < j - i + 1)
                {
                    len = j - i + 1;
                    ending_index = j;
                }
            }
        }
    }

    // print the subarray
    printf("[%d, %d]", ending_index - len + 1, ending_index);
}

int main(void)
{
    int nums[] = { 5, 6, -5, 5, 3, 5, 3, -2, 0 };
    int target = 8;

    int n = sizeof(nums)/sizeof(nums[0]);

    findMaxLenSubarray(nums, n, target);

    return 0;
}
```

**Output:** [2, 5]

##

```java
class Main
{
    // Naive function to find the maximum length subarray with sum `S` present
    // in a given array
    public static void findMaxLenSubarray(int[] nums, int S)
    {
        // `len` stores the maximum length of subarray with sum `S`
        int len = 0;

        // stores ending index of the maximum length subarray having sum `S`
        int ending_index = -1;

        // consider all subarrays starting from `i`
        for (int i = 0; i < nums.length; i++)
        {
            int target = 0;

            // consider all subarrays ending at `j`
            for (int j = i; j < nums.length; j++)
            {
                // sum of elements in the current subarray
                target += nums[j];

                // if we have found a subarray with sum `S`
                if (target == S)
                {
                    // update length and ending index of maximum length subarray
                    if (len < j - i + 1)
                    {
                        len = j - i + 1;
                        ending_index = j;
                    }
                }
            }
        }

        // print the subarray
        System.out.println("[" + (ending_index - len + 1)
                            + ", " + ending_index + "]");
    }

    public static void main (String[] args)
    {
        int[] nums = { 5, 6, -5, 5, 3, 5, 3, -2, 0 };
        int target = 8;

        findMaxLenSubarray(nums, target);
    }
}
```

##

```python3
# Naive function to find the maximum length sublist with sum `S` present
# in a given list
def findMaxLenSublist(nums, S):

    # `length` stores the maximum length of sublist with sum `S`
    length = 0

    # stores ending index of the maximum length sublist having sum `S`
    ending_index = -1

    # consider all sublists starting from i
    for i in range(len(nums)):

        target = 0

        # consider all sublists ending at `j`
        for j in range(i, len(nums)):

            # target of elements in the current sublist
            target += nums[j]

            # if we have found a sublist with sum `S`
            if target == S:
                # update length and ending index of maximum length sublist
                if length < j - i + 1:
                    length = j - i + 1
                    ending_index = j

    # print the sublist
    print((ending_index - length + 1, ending_index))

if __name__ == '__main__':

    nums = [5, 6, -5, 5, 3, 5, 3, -2, 0]
    target = 8

    findMaxLenSublist(nums, target)
```

We can use a map to solve this problem in linear time. The idea is to create an empty map to store the first subarray’s ending index, having a given sum. We traverse the given array and maintain the sum of elements seen so far.

  * If the `target` is seen for the first time, insert the sum with its index into the map.
  * If `target-S` is seen before, there is a subarray with the given sum that ends at the current index, and we update the maximum length subarray having sum `S` if the current subarray has more length.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to find the maximum length subarray with sum `S` present
// in a given array
void findMaxLenSubarray(int nums[], int n, int S)
{
    // create an empty map to store the ending index of the first subarray
    // having some sum
    unordered_map<int, int> map;

    // insert (0, -1) pair into the set to handle the case when a
    // subarray with sum `S` starts from index 0
    map[0] = -1;

    int target = 0;

    // `len` stores the maximum length of subarray with sum `S`
    int len = 0;

    // stores ending index of the maximum length subarray having sum `S`
    int ending_index = -1;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // sum of elements so far
        target += nums[i];

        // if the sum is seen for the first time, insert the sum with its
        // into the map
        if (map.find(target) == map.end()) {
            map[target] = i;
        }

        // update length and ending index of the maximum length subarray
        // having sum `S`
        if (map.find(target - S) != map.end() && len < i - map[target - S])
        {
            len = i - map[target - S];
            ending_index = i;
        }
    }

    // print the subarray
    cout << "[" << (ending_index - len + 1) << "," << ending_index << "]";
}

int main()
{
    int nums[] = { 5, 6, -5, 5, 3, 5, 3, -2, 0 };
    int target = 8;

    int n = sizeof(nums) / sizeof(nums[0]);

    findMaxLenSubarray(nums, n, target);

    return 0;
}
```

**Output:** [2, 5]

##

```java
import java.util.Map;
import java.util.HashMap;

class Main
{
    // Find the maximum length subarray with sum `S` present in a given array
    public static void findMaxLenSubarray(int[] nums, int S)
    {
        // create an empty HashMap to store the ending index of the first
        // subarray having some sum
        Map<Integer, Integer> map = new HashMap<>();

        // insert (0, -1) pair into the set to handle the case when a
        // subarray with sum `S` starts from index 0
        map.put(0, -1);

        int target = 0;

        // `len` stores the maximum length of subarray with sum `S`
        int len = 0;

        // stores ending index of the maximum length subarray having sum `S`
        int ending_index = -1;

        // traverse the given array
        for (int i = 0; i < nums.length; i++)
        {
            // sum of elements so far
            target += nums[i];

            // if the sum is seen for the first time, insert the sum with its
            // into the map
            map.putIfAbsent(target, i);

            // update length and ending index of the maximum length subarray
            // having sum `S`
            if (map.containsKey(target - S) && len < i - map.get(target - S))
            {
                len = i - map.get(target - S);
                ending_index = i;
            }
        }

        // print the subarray
        System.out.println("[" + (ending_index - len + 1) + ", " + ending_index + "]");
    }

    public static void main (String[] args)
    {
        int[] nums = { 5, 6, -5, 5, 3, 5, 3, -2, 0 };
        int target = 8;

        findMaxLenSubarray(nums, target);
    }
}
```

##

```python3
# Find maximum length sublist with sum `S` present in a given list
def findMaxLenSublist(nums, S):

    # create an empty dictionary to store the ending index of the first
    # sublist having some sum
    d = {}

    # insert (0, -1) pair into the set to handle the case when a
    # sublist with sum `S` starts from index 0
    d[0] = -1

    target = 0

    # `length` stores the maximum length of sublist with sum `S`
    length = 0

    # stores ending index of the maximum length sublist having sum `S`
    ending_index = -1

    # traverse the given list
    for i in range(len(nums)):

        # target of elements so far
        target += nums[i]

        # if the sum is seen for the first time, insert the sum with its
        # into the dictionary
        if target not in d:
            d[target] = i

        # update length and ending index of the maximum length sublist
        # having sum `S`
        if target - S in d and length < i - d[target - S]:
            length = i - d[target - S]
            ending_index = i

    # print the sublist
    print((ending_index - length + 1, ending_index))

if __name__ == '__main__':

    nums = [5, 6, -5, 5, 3, 5, 3, -2, 0]
    target = 8

    findMaxLenSublist(nums, target)
```

The time complexity of the above solution O(n) and requires O(n) extra space, where `n` is the size of the input.
