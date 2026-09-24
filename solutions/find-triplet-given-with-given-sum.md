# Find a triplet with the given sum in an array

> Source: https://www.techiedelight.com/find-triplet-given-with-given-sum/

Given an unsorted integer array, find a triplet with a given sum in it.

For example,

**Input:** nums = [ 2, 7, 4, 0, 9, 5, 1, 3 ] target = 6 **Output:** Triplet exists. The triplets with the given sum 6 are {0, 1, 5}, {0, 2, 4}, {1, 2, 3}

> 

The problem is a standard variation of the [3SUM problem](https://techiedelight.com/?problem=3Sum), where instead of looking for numbers whose sum is 0, we look for numbers whose sum is any constant `C`.

## 1\. Naive Recursive Approach

The idea is similar to the [0–1 Knapsack problem](https://techiedelight.com/0-1-knapsack-problem/) and uses [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We either consider the current item or exclude it and recur for the remaining elements for each item. Return true if we get the desired sum by including or excluding the current item. Following is the implementation in C++, Java, and Python based on the idea:

```cpp
#include <iostream>
using namespace std;

// Naive recursive function to check if triplet exists in an array
// with the given sum
bool isTripletExist(int nums[], int n, int target, int count)
{
    // if triplet has the desired sum, return true
    if (count == 3 && target == 0) {
        return true;
    }

    // return false if the sum is not possible with the current configuration
    if (count == 3 || n == 0 || target < 0) {
        return false;
    }

    // recur with including and excluding the current element
    return isTripletExist(nums, n - 1, target - nums[n - 1], count + 1) ||
            isTripletExist(nums, n - 1, target, count);
}

int main()
{
    int nums[] = { 2, 7, 4, 0, 9, 5, 1, 3 };
    int target = 6;

    int n = sizeof(nums) / sizeof(nums[0]);

    isTripletExist(nums, n, target, 0) ? cout << "Triplet exists":
                                cout << "Triplet doesn't exist";

    return 0;
}
```

**Output:** Triplet exists

##

```java
class Main
{
    // Naive recursive function to check if triplet exists in an array
    // with the given sum
    public static boolean isTripletExist(int[] nums, int n, int target, int count)
    {
        // if triplet has the desired sum, return true
        if (count == 3 && target == 0) {
            return true;
        }

        // return false if the sum is not possible with the current configuration
        if (count == 3 || n == 0 || target < 0) {
            return false;
        }

        // recur with including and excluding the current element
        return isTripletExist(nums, n - 1, target - nums[n - 1], count + 1) ||
                        isTripletExist(nums, n - 1, target, count);
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 7, 4, 0, 9, 5, 1, 3 };
        int target = 6;

        if (isTripletExist(nums, nums.length, target, 0)) {
            System.out.println("Triplet exists");
        }
        else {
            System.out.println("Triplet doesn't exist");
        }
    }
}
```

##

```python3
# Naive recursive function to check if triplet exists in a list
# with the given sum
def isTripletExist(nums, n, target, count):

    # if triplet has the desired sum, return true
    if count == 3 and target == 0:
        return True

    # return false if the sum is not possible with the current configuration
    if count == 3 or n == 0 or target < 0:
        return False

    # recur with including and excluding the current element
    return isTripletExist(nums, n - 1, target - nums[n - 1], count + 1) or\
        isTripletExist(nums, n - 1, target, count)

if __name__ == '__main__':

    nums = [2, 7, 4, 0, 9, 5, 1, 3]
    target = 6

    if isTripletExist(nums, len(nums), target, 0):
        print('Triplet exists')
    else:
        print('Triplet doesn\'t exist')
```

We can also use three nested loops and consider every triplet in the given array to check if the desired sum is found.

## 2\. Using Hashing

The idea is to insert each array element into a [hash table](https://techiedelight.com/hashing-in-data-structure/). Then consider all pairs present in the array and check if the remaining sum exists in the map or not. If the remaining sum is seen before and triplet doesn’t overlap with each other, i.e., `(i, j, i)` or `(i, j, j)`, print the triplet and return. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
#include <unordered_map>
using namespace std;

// Function to check if triplet exists in an array with the given sum
bool isTripletExist(int nums[], int n, int target)
{
    // create an empty map
    unordered_map<int, int> map;

    // insert (element, index) pair into the map for each array element
    for (int i = 0; i < n; i++) {
        map[nums[i]] = i;
    }

    // consider each element except the last element
    for (int i = 0; i < n - 1; i++)
    {
        // start from the i'th element until the last element
        for (int j = i + 1; j < n; j++)
        {
            // remaining sum
            int val = target - (nums[i] + nums[j]);

            // if the remaining sum is found, we have found a triplet
            if (map.find(val) != map.end())
            {
                // if the triplet doesn't overlap, return true
                if (map[val] != i && map[val] != j) {
                    return true;
                }
            }
        }
    }

    // return false if triplet doesn't exist
    return false;
}

int main()
{
    int nums[] = { 2, 7, 4, 0, 9, 5, 1, 3 };
    int target = 6;

    int n = sizeof(nums) / sizeof(nums[0]);

    isTripletExist(nums, n, target) ? cout << "Triplet exists":
                                cout << "Triplet Don't Exist";

    return 0;
}
```

**Output:** Triplet exists

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to check if triplet exists in an array with the given sum
    public static boolean isTripletExist(int[] nums, int target)
    {
        // create an empty map
        Map<Integer, Integer> map = new HashMap<>();

        // insert (element, index) pair into the map for each array element
        for (int i = 0; i < nums.length; i++) {
            map.put(nums[i], i);
        }

        // consider each element except the last element
        for (int i = 0; i < nums.length - 1; i++)
        {
            // start from the i'th element until the last element
            for (int j = i + 1; j < nums.length; j++)
            {
                // remaining sum
                int val = target - (nums[i] + nums[j]);

                // if the remaining sum is found, we have found a triplet
                if (map.containsKey(val))
                {
                    // if the triplet doesn't overlap, return true
                    if (map.get(val) != i && map.get(val) != j) {
                        return true;
                    }
                }
            }
        }

        // return false if triplet doesn't exist
        return false;
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 7, 4, 0, 9, 5, 1, 3 };
        int target = 6;

        if (isTripletExist(nums, target)) {
            System.out.println("Triplet exists");
        }
        else {
            System.out.println("Triplet doesn't exist");
        }
    }
}
```

##

```python3
# Function to check if triplet exists in a list with the given sum
def isTripletExist(nums, target):

    # create an empty dictionary
    d = {}

    # insert (element, index) pair into the dictionary for each input element
    for i, e in enumerate(nums):
        d[e] = i

    # consider each element except the last element
    for i in range(len(nums) - 1):

        # start from the i'th element until the last element
        for j in range(i + 1, len(nums)):
            # remaining sum
            val = target - (nums[i] + nums[j])

            # if the remaining sum is found, we have found a triplet
            if val in d:
                # if the triplet doesn't overlap, return true
                if d[val] != i and d[val] != j:
                    return True

    # return false if triplet doesn't exist
    return False

if __name__ == '__main__':

    nums = [2, 7, 4, 0, 9, 5, 1, 3]
    target = 6

    if isTripletExist(nums, target):
        print('Triplet exists')
    else:
        print('Triplet doesn\'t exist')
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the input.

## 3\. Printing distinct triplets

The idea is to [sort the given array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order, and for each element `nums[i]` in the array, check if the triplet is formed by nums[i] and [a pair from subarray nums[i+1…n)](https://techiedelight.com/find-pair-with-given-sum-array/). This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to print all distinct triplet in an array with the given sum
void printAllTriplets(int nums[], int n, int target)
{
    // sort the array in ascending order
    sort(nums, nums + n);

    // check if triplet is formed by nums[i] and a pair from
    // subarray nums[i+1…n)
    for (int i = 0; i <= n - 3; i++)
    {
        // remaining sum
        int k = target - nums[i];

        // maintain two indices pointing to endpoints of the
        // subarray nums[i+1…n)
        int low = i + 1, high = n - 1;

        // loop if `low` is less than `high`
        while (low < high)
        {
            // increment `low` index if the total is less than the remaining sum
            if (nums[low] + nums[high] < k) {
                low++;
            }

            // decrement `high` index if the total is more than the remaining sum
            else if (nums[low] + nums[high] > k) {
                high--;
            }

            // triplet with the given sum is found
            else {
                // print the triplet
                cout << "(" << nums[i] << " " << nums[low] << " " <<
                        nums[high] << ")\n";

                // increment `low` index and decrement `high` index
                low++, high--;
            }
        }
    }
}

int main()
{
    int nums[] = { 2, 7, 4, 0, 9, 5, 1, 3 };
    int target = 6;

    int n = sizeof(nums) / sizeof(nums[0]);

    printAllTriplets(nums, n, target);

    return 0;
}
```

**Output:** (0 1 5) (0 2 4) (1 2 3)
