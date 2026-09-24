# Print all subarrays with 0 sum

> Source: https://www.techiedelight.com/find-sub-array-with-0-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, print all subarrays with zero-sum.

For example,

**Input:** { 4, 2, -3, -1, 0, 4 } Subarrays with zero-sum are { -3, -1, 0, 4 } { 0 } **Input:** { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 } Subarrays with zero-sum are { 3, 4, -7 } { 4, -7, 3 } { -7, 3, 1, 3 } { 3, 1, -4 } { 3, 1, 3, 1, -4, -2, -2 } { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 }

Note that the problem deals with [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous, i.e., whose elements occupy consecutive positions in the array.

> 

## Approach 1: Using Brute-Force

A naive solution is to consider all subarrays and find their sum. If the subarray sum is equal to 0, print it. The time complexity of the naive solution is O(n3) as there are `n2` subarrays in an array of size `n`, and it takes O(n) time to find the sum of its elements. We can optimize the method to run in O(n2) time by calculating the subarray sum in constant time.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to print all subarrays with a zero-sum
// in a given array
void printAllSubarrays(int nums[], int n)
{
    // consider all subarrays starting from `i`
    for (int i = 0; i < n; i++)
    {
        int sum = 0;

        // consider all subarrays ending at `j`
        for (int j = i; j < n; j++)
        {
            // sum of elements so far
            sum += nums[j];

            // if the sum is seen before, we have found a subarray
            // with zero-sum
            if (sum == 0) {
                cout << "Subarray [" << i << "…" << j << "]\n";
            }
        }
    }
}

int main()
{
    int nums[] = { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 };
    int n = sizeof(nums)/sizeof(nums[0]);

    printAllSubarrays(nums, n);

    return 0;
}
```

**Output:** Subarray [0…2] Subarray [0…9] Subarray [1…3] Subarray [2…5] Subarray [3…9] Subarray [5…7]

##

```java
class Main
{
    // Function to print all subarrays with a zero-sum
    // in a given array
    public static void printAllSubarrays(int[] nums)
    {
        // consider all subarrays starting from `i`
        for (int i = 0; i < nums.length; i++)
        {
            int sum = 0;

            // consider all subarrays ending at `j`
            for (int j = i; j < nums.length; j++)
            {
                // sum of elements so far
                sum += nums[j];

                // if the sum is seen before, we have found a subarray with zero-sum
                if (sum == 0) {
                    System.out.println("Subarray [" + i + "…" + j + "]");
                }
            }
        }
    }

    public static void main (String[] args)
    {
        int[] nums = { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 };

        printAllSubarrays(nums);
    }
}
```

##

```python3
# Function to print all sublists with a zero-sum present in a given list
def printAllSublists(nums):

    # consider all sublists starting from `i`
    for i in range(len(nums)):
        total = 0
        # consider all sublists ending at `j`
        for j in range(i, len(nums)):
            # sum of elements so far
            total += nums[j]
            # if the sum is seen before, we have found a sublist with zero-sum
            if total == 0:
                print('Sublist', (i, j))

if __name__ == '__main__':

    nums = [3, 4, -7, 3, 1, 3, 1, -4, -2, -2]
    printAllSublists(nums)
```

## Approach 2: Using multimap to print all subarrays

We can use [multimap](https://techiedelight.com/implement-multimap-java/) to print all subarrays with a zero-sum present in the given array. The idea is to create an empty multimap to store all subarrays’ ending index having a given sum. Traverse the array and maintain the sum of elements seen so far. If the sum is seen before, at least one subarray has zero-sum, which ends at the current index. Finally, print all such subarrays.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to print all subarrays with a zero-sum in a given array
void printAllSubarrays(int nums[], int n)
{
    // create an empty multimap to store the ending index of all
    // subarrays having the same sum
    unordered_multimap<int, int> map;

    // insert (0, -1) pair into the map to handle the case when
    // subarray with zero-sum starts from index 0
    map.insert(pair<int, int>(0, -1));

    int sum = 0;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // sum of elements so far
        sum += nums[i];

        // if the sum is seen before, there exists at least one
        // subarray with zero-sum
        if (map.find(sum) != map.end())
        {
            auto it = map.find(sum);

            // find all subarrays with the same sum
            while (it != map.end() && it->first == sum)
            {
                cout << "Subarray [" << it->second + 1 << "…" << i << "]\n";
                it++;
            }
        }

        // insert (sum so far, current index) pair into multimap
        map.insert(pair<int, int>(sum, i));
    }
}

int main()
{
    int nums[] = { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 };
    int n = sizeof(nums)/sizeof(nums[0]);

    printAllSubarrays(nums, n);

    return 0;
}
```

**Output:** Subarray [0…2] Subarray [1…3] Subarray [2…5] Subarray [5…7] Subarray [3…9] Subarray [0…9]

##

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Main
{
    // Utility function to insert <key, value> into the multimap
    private static<K, V> void insert(Map<K, List<V>> hashMap, K key, V value)
    {
        // if the key is seen for the first time, initialize the list
        hashMap.putIfAbsent(key, new ArrayList<>());
        hashMap.get(key).add(value);
    }

    // Function to print all subarrays with a zero-sum in a given array
    public static void printAllSubarrays(int[] nums)
    {
        // create an empty multimap to store the ending index of all
        // subarrays having the same sum
        Map<Integer, List<Integer>> hashMap = new HashMap<>();

        // insert (0, -1) pair into the map to handle the case when
        // subarray with zero-sum starts from index 0
        insert(hashMap, 0, -1);

        int sum = 0;

        // traverse the given array
        for (int i = 0; i < nums.length; i++)
        {
            // sum of elements so far
            sum += nums[i];

            // if the sum is seen before, there exists at least one
            // subarray with zero-sum
            if (hashMap.containsKey(sum))
            {
                List<Integer> list = hashMap.get(sum);

                // find all subarrays with the same sum
                for (Integer value: list)
                {
                    System.out.println("Subarray [" + (value + 1) + "…" +
                                            i + "]");
                }
            }

            // insert (sum so far, current index) pair into the multimap
            insert(hashMap, sum, i);
        }
    }

    public static void main (String[] args)
    {
        int[] nums = { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 };

        printAllSubarrays(nums);
    }
}
```

##

```python3
# Utility function to insert <key, value> into the dictionary
def insert(d, key, value):

    # if the key is seen for the first time, initialize the list
    d.setdefault(key, []).append(value)

# Function to print all sublists with a zero-sum present in a given list
def printallSublists(nums):

    # create an empty dictionary to store the ending index of all
    # sublists having the same sum
    d = {}

    # insert (0, -1) pair into the dictionary to handle the case when
    # sublist with zero-sum starts from index 0
    insert(d, 0, -1)

    total = 0

    # traverse the given list
    for i in range(len(nums)):

        # sum of elements so far
        total += nums[i]

        # if the sum is seen before, there exists at least one
        # sublist with zero-sum
        if total in d:

            list = d.get(total)

            # find all sublists with the same sum
            for value in list:
                print('Sublist is', (value + 1, i))

        # insert (sum so far, current index) pair into the dictionary
        insert(d, total, i)

if __name__ == '__main__':

    nums = [3, 4, -7, 3, 1, 3, 1, -4, -2, -2]

    printallSublists(nums)
```

**Exercise:** [Extend the solution for a non-zero sum of the subarray](https://techiedelight.com/find-subarrays-given-sum-array/)

**Related Post:**

> [Check if a subarray with 0 sum exists or not](https://techiedelight.com/check-subarray-with-0-sum-exists-not/)
