# Find a pair with the given sum in an array

> Source: https://www.techiedelight.com/find-pair-with-given-sum-array/

Given an unsorted integer array, find a pair with the given sum in it.

For example,

**Input:** nums = [8, 7, 2, 5, 3, 1] target = 10 **Output:** Pair found (8, 2) or Pair found (7, 3) **Input:** nums = [5, 2, 6, 8, 1, 9] target = 12 **Output:** Pair not found

> 

There are several methods to solve this problem using brute-force, sorting, and hashing. These are discussed below:

## 1\. Using Brute-Force

A naive solution is to consider every pair in the given array and return if the desired sum is found. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Naive method to find a pair in an array with a given sum
void findPair(int nums[], int n, int target)
{
    // consider each element except the last
    for (int i = 0; i < n - 1; i++)
    {
        // start from the i'th element until the last element
        for (int j = i + 1; j < n; j++)
        {
            // if the desired sum is found, print it
            if (nums[i] + nums[j] == target)
            {
                printf("Pair found (%d, %d)\n", nums[i], nums[j]);
                return;
            }
        }
    }

    // we reach here if the pair is not found
    printf("Pair not found");
}

int main(void)
{
    int nums[] = { 8, 7, 2, 5, 3, 1 };
    int target = 10;

    int n = sizeof(nums)/sizeof(nums[0]);

    findPair(nums, n, target);

    return 0;
}
```

**Output:** Pair found (8, 2)

##

```java
class Main
{
    // Naive method to find a pair in an array with a given sum
    public static void findPair(int[] nums, int target)
    {
        // consider each element except the last
        for (int i = 0; i < nums.length - 1; i++)
        {
            // start from the i'th element until the last element
            for (int j = i + 1; j < nums.length; j++)
            {
                // if the desired sum is found, print it
                if (nums[i] + nums[j] == target)
                {
                    System.out.printf("Pair found (%d, %d)", nums[i], nums[j]);
                    return;
                }
            }
        }

        // we reach here if the pair is not found
        System.out.println("Pair not found");
    }

    public static void main (String[] args)
    {
        int[] nums = { 8, 7, 2, 5, 3, 1 };
        int target = 10;

        findPair(nums, target);
    }
}
```

##

```python3
# Naive method to find a pair in a list with the given sum
def findPair(nums, target):

    # consider each element except the last
    for i in range(len(nums) - 1):

        # start from the i'th element until the last element
        for j in range(i + 1, len(nums)):

            # if the desired sum is found, print it
            if nums[i] + nums[j] == target:
                print('Pair found', (nums[i], nums[j]))
                return

    # No pair with the given sum exists in the list
    print('Pair not found')

if __name__ == '__main__':

    nums = [8, 7, 2, 5, 3, 1]
    target = 10

    findPair(nums, target)
```

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

## 2\. Using Sorting

The idea is to [sort the given array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and maintain search space by maintaining two indices (`low` and `high`) that initially points to two endpoints of the array. Then reduce the search space `nums[low…high]` at each iteration of the loop by comparing the sum of elements present at indices `low` and `high` with the desired sum. Increment `low` if the sum is less than the expected sum; otherwise, decrement `high` if the sum is more than the desired sum. If the pair is found, return it.

Following is the C++, Java, and Python implementation based on the idea:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find a pair in an array with a given sum using sorting
void findPair(int nums[], int n, int target)
{
    // sort the array in ascending order
    sort(nums, nums + n);

    // maintain two indices pointing to endpoints of the array
    int low = 0;
    int high = n - 1;

    // reduce the search space `nums[low…high]` at each iteration of the loop

    // loop till the search space is exhausted
    while (low < high)
    {
        // sum found
        if (nums[low] + nums[high] == target)
        {
            cout << "Pair found (" << nums[low] << ", " << nums[high] << ")\n";
            return;
        }

        // increment `low` index if the total is less than the desired sum;
        // decrement `high` index if the total is more than the desired sum
        (nums[low] + nums[high] < target)? low++: high--;
    }

    // we reach here if the pair is not found
    cout << "Pair not found";
}

int main()
{
    int nums[] = { 8, 7, 2, 5, 3, 1 };
    int target = 10;

    int n = sizeof(nums)/sizeof(nums[0]);

    findPair(nums, n, target);

    return 0;
}
```

**Output:** Pair found (2, 8)

##

```java
import java.util.Arrays;

class Main
{
    // Function to find a pair in an array with a given sum using sorting
    public static void findPair(int[] nums, int target)
    {
        // sort the array in ascending order
        Arrays.sort(nums);

        // maintain two indices pointing to endpoints of the array
        int low = 0;
        int high = nums.length - 1;

        // reduce the search space `nums[low…high]` at each iteration of the loop

        // loop till the search space is exhausted
        while (low < high)
        {
            // sum found
            if (nums[low] + nums[high] == target)
            {
                System.out.printf("Pair found (%d, %d)", nums[low], nums[high]);
                return;
            }

            // increment `low` index if the total is less than the desired sum;
            // decrement `high` index if the total is more than the desired sum
            if (nums[low] + nums[high] < target) {
                low++;
            }
            else {
                high--;
            }
        }

        // we reach here if the pair is not found
        System.out.println("Pair not found");
    }

    public static void main (String[] args)
    {
        int[] nums = { 8, 7, 2, 5, 3, 1 };
        int target = 10;

        findPair(nums, target);
    }
}
```

##

```python3
# Function to find a pair in an array with a given sum using sorting
def findPair(nums, target):

    # sort the list in ascending order
    nums.sort()

    # maintain two indices pointing to endpoints of the list
    (low, high) = (0, len(nums) - 1)

    # reduce the search space `nums[low…high]` at each iteration of the loop

    # loop till the search space is exhausted
    while low < high:

        if nums[low] + nums[high] == target:        # target found
            print('Pair found', (nums[low], nums[high]))
            return

        # increment `low` index if the total is less than the desired sum;
        # decrement `high` index if the total is more than the desired sum
        if nums[low] + nums[high] < target:
            low = low + 1
        else:
            high = high - 1

    # No pair with the given sum exists
    print('Pair not found')

if __name__ == '__main__':

    nums = [8, 7, 2, 5, 3, 1]
    target = 10

    findPair(nums, target)
```

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space.

## 3\. Using Hashing

We can use a [hash table](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in linear time. The idea is to insert each array element `nums[i]` into a map. We also check if difference `(nums[i], target - nums[i])` already exists in the map or not. If the difference is seen before, print the pair and return. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to find a pair in an array with a given sum using hashing
void findPair(int nums[], int n, int target)
{
    // create an empty map
    unordered_map<int, int> map;

    // do for each element
    for (int i = 0; i < n; i++)
    {
        // check if pair (nums[i], target - nums[i]) exists

        // if the difference is seen before, print the pair
        if (map.find(target - nums[i]) != map.end())
        {
            cout << "Pair found (" << nums[map[target - nums[i]]] << ", "
                 << nums[i] << ")\n";
            return;
        }

        // store index of the current element in the map
        map[nums[i]] = i;
    }

    // we reach here if the pair is not found
    cout << "Pair not found";
}

int main()
{
    int nums[] = { 8, 7, 2, 5, 3, 1 };
    int target = 10;

    int n = sizeof(nums)/sizeof(nums[0]);

    findPair(nums, n, target);

    return 0;
}
```

**Output:** Pair found (8, 2)
