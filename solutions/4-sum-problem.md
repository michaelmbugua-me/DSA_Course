# 4–Sum Problem | Quadruplets with a given sum

> Source: https://www.techiedelight.com/4-sum-problem/

4-sum problem: Given an unsorted integer array, check if it contains four elements tuple (quadruplets) having a given sum.

For example,

**Input:** nums = [ 2, 7, 4, 0, 9, 5, 1, 3 ] target = 20 **Output:** Quadruplet exists. Below are quadruplets with the given sum 20 (0, 4, 7, 9) (1, 3, 7, 9) (2, 4, 5, 9)

> 

## 1\. Naive Recursive Approach

The idea is similar to the [0–1 Knapsack problem](https://techiedelight.com/0-1-knapsack-problem/) and uses [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). For each item, either consider it or exclude it and recur for the remaining items. Return true if the desired sum is found by including or excluding the current item.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Naive recursive function to check if quadruplet exists in an array
// with the given sum
bool hasQuadruplet(int nums[], int n, int target, int count)
{
    // if the desired sum is reached with 4 elements, return true
    if (target == 0 && count == 4) {
        return true;
    }

    // return false if the sum is not possible with the current configuration
    if (count > 4 || n == 0) {
        return false;
    }

    // Recur with
    // 1. Including the current element
    // 2. Excluding the current element

    return hasQuadruplet(nums, n - 1, target - nums[n - 1], count + 1) ||
            hasQuadruplet(nums, n - 1, target, count);
}

int main()
{
    int nums[] = { 2, 7, 4, 0, 9, 5, 1, 3 };
    int target = 20;

    int n = sizeof(nums) / sizeof(nums[0]);

    hasQuadruplet(nums, n, target, 0) ? cout << "Quadruplet exists":
                                cout << "Quadruplet Doesn't Exist";

    return 0;
}
```

**Output:** Quadruplet exists

##

```java
class Main
{
    // Naive recursive function to check if quadruplet exists in an array
    // with the given sum
    public static boolean hasQuadruplet(int[] nums, int n, int target, int count)
    {
        // if the desired sum is reached with 4 elements, return true
        if (target == 0 && count == 4) {
            return true;
        }

        // return false if the sum is not possible with the current configuration
        if (count > 4 || n == 0) {
            return false;
        }

        // Recur with
        // 1. Including the current element
        // 2. Excluding the current element

        return hasQuadruplet(nums, n - 1, target - nums[n - 1], count + 1) ||
                        hasQuadruplet(nums, n - 1, target, count);
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 7, 4, 0, 9, 5, 1, 3 };
        int target = 20;

        if (hasQuadruplet(nums, nums.length, target, 0)) {
            System.out.println("Quadruplet exists");
        }
        else {
            System.out.println("Quadruplet Doesn't Exist");
        }
    }
}
```

##

```python3
# Naive recursive function to check if quadruplet exists in a list
# with the given sum
def hasQuadruplet(nums, n, target, count):

    # if the desired sum is reached with 4 elements, return true
    if target == 0 and count == 4:
        return True

    # return false if the sum is not possible with the current configuration
    if count > 4 or n == 0:
        return False

    # Recur with
    # 1. Including the current element
    # 2. Excluding the current element

    return hasQuadruplet(nums, n - 1, target - nums[n - 1], count + 1) or\
        hasQuadruplet(nums, n - 1, target, count)

if __name__ == '__main__':

    nums = [2, 7, 4, 0, 9, 5, 1, 3]
    target = 20

    if hasQuadruplet(nums, len(nums), target, 0):
        print('Quadruplet exists')
    else:
        print('Quadruplet doesn\'t exist')
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack). We can also use four nested loops and consider every quadruplet in the given array to check if the desired sum is found. This can reduce the time complexity to O(n4) for the input of `n` elements and doesn’t require any extra space.

## 2\. Efficient solution using Hashing

The idea is to consider every pair of elements in the array one by one and insert it into a [hash table](https://techiedelight.com/hashing-in-data-structure/). For each pair of elements `(i, j)`, calculate the remaining sum. If the remaining sum exists in the map and elements involved in the previous occurrence doesn’t overlap with the current pair, i.e., `(i, j, i, y)` or `(i, j, x, i)` or `(i, j, j, y)`, or `(i, j, x, j)`, print the quadruplet and return.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

typedef pair<int, int> Pair;

// Function to check if quadruplet exists in an array with the given sum
bool hasQuadruplet(int nums[], int n, int target)
{
    // create an empty map
    // key —> target of a pair in the array
    // value —> vector storing an index of every pair having that sum
    unordered_map<int, vector<Pair>> map;

    // consider each element except the last element
    for (int i = 0; i < n - 1; i++)
    {
        // start from the i'th element until the last element
        for (int j = i + 1; j < n; j++)
        {
            // calculate the remaining sum
            int val = target - (nums[i] + nums[j]);

            // if the remaining sum is found on the map,
            // we have found a quadruplet
            if (map.find(val) != map.end())
            {
                // check every pair having a sum equal to the remaining sum
                for (auto pair: map.find(val)->second)
                {
                    int x = pair.first;
                    int y = pair.second;

                    // if quadruplet doesn't overlap, print it and return true
                    if ((x != i && x != j) && (y != i && y != j))
                    {
                        cout << "Quadruplet Found ("
                            << nums[i] << ", " << nums[j] << ", " << nums[x]
                            << ", " << nums[y] << ")";
                        return true;
                    }
                }
            }

            // insert the current pair into the map
            map[nums[i] + nums[j]].push_back({i, j});
        }
    }

    // return false if quadruplet doesn't exist
    return false;
}

int main()
{
    int nums[] = { 2, 7, 4, 0, 9, 5, 1, 3 };
    int target = 20;

    int n = sizeof(nums) / sizeof(nums[0]);

    if (!hasQuadruplet(nums, n, target)) {
        cout << "Quadruplet Doesn't Exist";
    }

    return 0;
}
```

**Output:** Quadruplet Found (4, 0, 7, 9)

##

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Pair
{
    public int x, y;

    Pair(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}

class Main
{
    // Function to check if quadruplet exists in an array with the given sum
    public static boolean hasQuadruplet(int[] nums, int n, int target)
    {
        // create an empty map
        // key —> target of a pair in the array
        // value —> list storing an index of every pair having that sum
        Map<Integer, List<Pair>> map = new HashMap<>();

        // consider each element except the last element
        for (int i = 0; i < n - 1; i++)
        {
            // start from the i'th element until the last element
            for (int j = i + 1; j < n; j++)
            {
                // calculate the remaining sum
                int val = target - (nums[i] + nums[j]);

                // if the remaining sum is found on the map,
                // we have found a quadruplet
                if (map.containsKey(val))
                {
                    // check every pair having a sum equal to the remaining sum
                    for (Pair pair: map.get(val))
                    {
                        int x = pair.x;
                        int y = pair.y;

                        // if quadruplet doesn't overlap, print it and
                        // return true
                        if ((x != i && x != j) && (y != i && y != j))
                        {
                            System.out.println("Quadruplet Found ("
                                        + nums[i] + ", " + nums[j] + ", "
                                        + nums[x] + ", " + nums[y] + ")");
                            return true;
                        }
                    }
                }

                // insert the current pair into the map

                // null check (Java 8)
                map.putIfAbsent(nums[i] + nums[j], new ArrayList<>());
                map.get(nums[i] + nums[j]).add(new Pair(i, j));
            }
        }

        // return false if quadruplet doesn't exist
        return false;
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 7, 4, 0, 9, 5, 1, 3 };
        int target = 20;

        if (!hasQuadruplet(nums, nums.length, target)) {
            System.out.println("Quadruplet Doesn't Exist");
        }
    }
}
```

##

```python3
# Function to check if quadruplet exists in a list with the given sum
def hasQuadruplet(nums, target):

    # create an empty dictionary
    # key —> target of a pair in the list
    # value —> list storing an index of every pair having that sum
    d = {}

    # consider each element except the last element
    for i in range(len(nums) - 1):

        # start from the i'th element until the last element
        for j in range(i + 1, len(nums)):

            # calculate the remaining sum
            val = target - (nums[i] + nums[j])

            # if the remaining sum is found on the dictionary,
            # we have found a quadruplet
            if val in d:

                # check every pair having a sum equal to the remaining sum
                for pair in d[val]:
                    x, y = pair

                    # if quadruplet doesn't overlap, print it and return true
                    if (x != i and x != j) and (y != i and y != j):
                        print('Quadruplet Found', (nums[i], nums[j], nums[x], nums[y]))
                        return True

            # insert the current pair into the dictionary
            d.setdefault(nums[i] + nums[j], []).append((i, j))

    # return false if quadruplet doesn't exist
    return False

if __name__ == '__main__':

    nums = [2, 7, 4, 0, 9, 5, 1, 3]
    target = 20

    if not hasQuadruplet(nums, target):
        print('Quadruplet doesn\'t exist')
```

The time complexity of the above solution is O(n3) and requires O(n2) extra space, where `n` is the size of the input.

**Also See:**

> [Print all quadruplets with a given sum | 4 sum problem extended](https://techiedelight.com/print-all-quadruplets-with-given-sum-4-sum-problem-extended/)
