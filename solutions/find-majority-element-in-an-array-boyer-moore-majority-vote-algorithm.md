# Find majority element (Boyer–Moore Majority Vote Algorithm)

> Source: https://www.techiedelight.com/find-majority-element-in-an-array-boyer-moore-majority-vote-algorithm/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array containing duplicates, return the majority element if present. A majority element appears more than `n/2` times, where `n` is the array size.

For example, the majority element is 2 in array `{2, 8, 7, 2, 2, 5, 2, 3, 1, 2, 2}`.

> 

## 1\. Brute-Force Solution

A naive solution is to count each element’s frequency in the first half of the array to check if it is the majority element. Following is the naive implementation:

```
int findMajorityElementNaive(int nums[], int n)
{
    // check whether `nums[i]` is a majority element or not
    for (int i = 0; n && i <= n/2; i++)
    {
        int count = 1;
        for (int j = i + 1; j < n; j++)
        {
            if (nums[j] == nums[i]) {
                count++;
            }
        }

        if (count > n/2) {
            return nums[i];
        }
    }

    return -1;
}
```

The time complexity of the above solution is O(n2), where `n` is the size of the input.

We can improve worst-case time complexity to O(n.log(n)) by [sorting the array](https://techiedelight.com/quicksort/) and then perform a [binary search](https://techiedelight.com/binary-search/) for each element’s first and last occurrence. If the difference between first and last occurrence is more than `n/2`, the The majority element is found.

## 2\. Linear-time Solution

We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in linear time. The idea is to store each element’s frequency in a map and return it if its frequency becomes more than `n/2`. If no such element is present, then the The majority element doesn’t exist in the array, and return `-1`.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Function to find the majority element present in a given array
int findMajorityElement(vector<int> const &nums)
{
    // create an empty map
    unordered_map<int, int> map;

    // get input size
    int n = nums.size();

    // 1. Store each element's frequency in a map
    for (int i = 0; i < n; i++) {
        map[nums[i]]++;
    }

    // 2. Return the element if its count is more than `n/2`
    for (auto pair: map)
    {
        if (pair.second > n/2) {
            return pair.first;
        }
    }

    // Note that we can merge steps 2 and 3 into one
    /* for (int i = 0; i < n; i++)
    {
        if (++map[nums[i]] > n/2) {
            return nums[i];
        }
    } */

    // return -1 if no majority element is present
    return -1;
}

int main()
{
    vector<int> input = { 2, 8, 7, 2, 2, 5, 2, 3, 1, 2, 2 };

    int result = findMajorityElement(input);
    if (result != -1) {
        cout << "The majority element is " << result;
    }
    else {
        cout << "The majority element doesn't exist";
    }

    return 0;
}
```

**Output:** The majority element is 2

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find the majority element present in a given array
    public static int findMajorityElement(int[] nums)
    {
        // create an empty `HashMap`
        Map<Integer, Integer> map = new HashMap<>();

        // store each element's frequency in a map
        for (int i: nums) {
            map.put(i, map.getOrDefault(i, 0) + 1);
        }

        // return the element if its count is more than `n/2`
        for (Map.Entry<Integer, Integer> entry: map.entrySet())
        {
            if (entry.getValue() > nums.length/2) {
                return entry.getKey();
            }
        }

        // no majority element is present
        return -1;
    }

    public static void main (String[] args)
    {
        // assumption: valid input (majority element is present)
        int[] nums = { 1, 8, 7, 4, 1, 2, 2, 2, 2, 2, 2 };

        int result = findMajorityElement(nums);
        if (result != -1) {
            System.out.println("The majority element is " + result);
        }
        else {
            System.out.println("The majority element doesn't exist");
        }
    }
}
```

##

```python3
# Function to find the majority element present in a given list
def findMajorityElement(nums):

    # create an empty `HashMap`
    d = {}

    # store each element's frequency in a dictionary
    for i in nums:
        d[i] = d.get(i, 0) + 1

    # return the element if its count is more than `n/2`
    for key, value in d.items():
        if value > len(nums) / 2:
            return key

    # no majority element is present
    return -1

if __name__ == '__main__':

    # assumption: valid input (majority element is present)
    nums = [1, 8, 7, 4, 1, 2, 2, 2, 2, 2, 2]

    result = findMajorityElement(nums)
    if result != -1:
        print('The majority element is', result)
    else:
        print('The majority element doesn\'t exist')
```

The time complexity of the above solution is O(n) and requires O(n) extra space.

## 3\. Boyer–Moore majority vote algorithm

We can find the majority element using linear time and constant space using the Boyer–Moore majority vote algorithm. The algorithm can be expressed in pseudocode as the following steps:

Initialize an element m and a counter i = 0 for each element x of the input sequence: if i = 0, then assign m = x and i = 1 else if m = x, then assign i = i + 1 else assign i = i – 1 return m

The algorithm processes each element of the sequence, one at a time. When processing an element `x`,

  1. If the counter is 0, set the current candidate to `x`, and set the counter to 1.
  2. If the counter is non-zero, increment or decrement it according to whether `x` is a current candidate.

At the end of this process, if the sequence has a majority, it will be the element stored by the algorithm. If there is no majority element, the algorithm will not detect that fact and may output the wrong element. In other words, the **Boyer–Moore majority vote algorithm produces correct results only when the majority element is present in the input.**

The algorithm can be implemented as follows in C, Java, and Python. It is recommended to modify the algorithm to verify if the returned element is, in fact, a majority element or not.

```c
#include <stdio.h>

// Function to find the majority element present in a given array
int findMajorityElement(int nums[], int n)
{
    // `m` stores the majority element (if present)
    int m;

    // initialize counter `i` with 0
    int i = 0;

    // do for each element `nums[j]` in the array
    for (int j = 0; j < n; j++)
    {
        // If counter `i` becomes 0, set the current candidate
        // to `nums[j]` and reset the counter to 1
        if (i == 0) {
            m = nums[j], i = 1;
        }

        // If the counter is non-zero, increment or decrement it
        // according to whether `nums[j]` is a current candidate
        else {
            (m == nums[j]) ? i++ : i--;
        }
    }

    return m;
}

int main(void)
{
    // assumption: valid input (majority element is present)
    int nums[] = { 1, 8, 7, 4, 1, 2, 2, 2, 2, 2, 2 };
    int n = sizeof(nums)/sizeof(nums[0]);

    printf("The majority element is %d", findMajorityElement(nums, n));

    return 0;
}
```

**Output:** The majority element is 2

##

```java
class Main
{
    // Function to find the majority element present in a given array
    public static int findMajorityElement(int[] nums)
    {
        // `m` stores the majority element (if present)
        int m = -1;

        // initialize counter `i` with 0
        int i = 0;

        // do for each element `nums[j]` in the array
        for (int j = 0; j < nums.length; j++)
        {
            // if counter `i` becomes 0
            if (i == 0)
            {
                // set the current candidate to `nums[j]`
                m = nums[j];

                // reset the counter to 1
                i = 1;
            }

            // otherwise, increment the counter if `nums[j]` is a current candidate
            else if (m == nums[j]) {
                i++;
            }
            // otherwise, decrement the counter if `nums[j]` is a current candidate
            else {
                i--;
            }
        }

        return m;
    }

    public static void main (String[] args)
    {
        // assumption: valid input (majority element is present)
        int[] nums = { 1, 8, 7, 4, 1, 2, 2, 2, 2, 2, 2 };

        System.out.println("The majority element is " + findMajorityElement(nums));
    }
}
```

##

```python3
# Function to find the majority element present in a given list
def findMajorityElement(nums):

    # `m` stores the majority element (if present)
    m = -1

    # initialize counter `i` with 0
    i = 0

    # do for each element `nums[j]` in the list
    for j in range(len(nums)):

        # if counter `i` becomes 0
        if i == 0:

            # set the current candidate to `nums[j]`
            m = nums[j]

            # reset the counter to 1
            i = 1

        # otherwise, increment the counter if `nums[j]` is a current candidate
        elif m == nums[j]:
            i = i + 1

        # otherwise, decrement the counter if `nums[j]` is a current candidate
        else:
            i = i - 1

    return m

if __name__ == '__main__':

    # assumption: valid input (majority element is present)
    nums = [1, 8, 7, 4, 1, 2, 2, 2, 2, 2, 2]

    print('The majority element is', findMajorityElement(nums))
```

**References:** [Boyer–Moore majority vote algorithm – Wikipedia](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)
