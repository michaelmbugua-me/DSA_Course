# Find subarrays with a given sum in an array

> Source: https://www.techiedelight.com/find-subarrays-given-sum-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find subarrays with a given sum in it.

For example,

**Input:** nums[] = { 3, 4, -7, 1, 3, 3, 1, -4 } target = 7 **Output:** Subarrays with the given sum are { 3, 4 } { 3, 4, -7, 1, 3, 3 } { 1, 3, 3 } { 3, 3, 1 }

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

## 1\. Brute-Force Solution

A simple solution is to consider all subarrays and calculate the sum of their elements. If the sum of the subarray is equal to the given sum, print it. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to print subarray `nums[i, j]`
void print(int nums[], int i, int j)
{
    printf("[%d…%d] —— { ", i, j);
    for (int k = i; k <= j; k++) {
        printf("%d ", nums[k]);
    }
    printf("}\n");
}

// Function to find subarrays with the given sum in an array
void findSubarrays(int nums[], int n, int target)
{
    for (int i = 0; i < n; i++)
    {
        int sum_so_far = 0;

        // consider all subarrays starting from `i` and ending at `j`
        for (int j = i; j < n; j++)
        {
            // sum of elements so far
            sum_so_far += nums[j];

            // if the sum so far is equal to the given sum
            if (sum_so_far == target) {
                print(nums, i, j);
            }
        }
    }
}

int main()
{
    int nums[] = { 3, 4, -7, 1, 3, 3, 1, -4 };
    int target = 7;

    int n = sizeof(nums)/sizeof(nums[0]);
    findSubarrays(nums, n, target);

    return 0;
}
```

**Output:** [0…1] —— { 3 4 } [0…5] —— { 3 4 -7 1 3 3 } [3…5] —— { 1 3 3 } [4…6] —— { 3 3 1 }

##

```java
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class Main
{
    // Utility function to print subarray `nums[i, j]`
    public static void print(int[] nums, int i, int j)
    {
        System.out.println(IntStream.range(i, j + 1)
                                    .mapToObj(k -> nums[k])
                                    .collect(Collectors.toList()));
    }

    // Function to find subarrays with the given sum in an array
    public static void findSubarrays(int[] nums, int target)
    {
        for (int i = 0; i < nums.length; i++)
        {
            int sum_so_far = 0;

            // consider all subarrays starting from `i` and ending at `j`
            for (int j = i; j < nums.length; j++)
            {
                // sum of elements so far
                sum_so_far += nums[j];

                // if the sum so far is equal to the given sum
                if (sum_so_far == target) {
                    print(nums, i, j);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int[] nums = { 3, 4, -7, 1, 3, 3, 1, -4 };
        int target = 7;

        findSubarrays(nums, target);
    }
}
```

##

```python3
# Function to find sublists with the given sum in a list
def findSublists(nums, target):

    for i in range(len(nums)):

        sum_so_far = 0

        # consider all sublists starting from `i` and ending at `j`
        for j in range(i, len(nums)):

            # target of elements so far
            sum_so_far += nums[j]

            # if the sum so far is equal to the given sum
            if sum_so_far == target:

                # print sublist `nums[i, j]`
                print(nums[i:j+1])

if __name__ == '__main__':

    nums = [3, 4, -7, 1, 3, 3, 1, -4]
    target = 7

    findSublists(nums, target)
```

This approach takes O(n3) time as the subarray sum is calculated in O(1) time for each of `n2` subarrays of an array of size `n`, and it takes O(n) time to print a subarray.

## 2\. Hashing

We can also use [hashing](https://techiedelight.com/hashing-in-data-structure/) to find subarrays with the given sum in an array by using a map of lists or a [multimap](https://techiedelight.com/implement-multimap-java/) for storing the end index of all subarrays having a given sum. The idea is to traverse the given array and maintain the sum of elements seen so far. At any index, `i`, let `k` be the difference between the sum of elements seen so far and the given sum. If key `k` is present on the map, at least one subarray has the given sum ending at the current index `i`, and we print all such subarrays.

Following is the implementation of the above algorithm in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <iterator>
using namespace std;

// Function to print all subarrays with the given sum ending at a given index
void printSubarray(int nums[], int index, vector<int> &input)
{
    for (int j: input)
    {
        cout << "[" << (j + 1) << "…" << index << "] —— { ";
        copy(nums + j + 1, nums + index + 1,
                ostream_iterator<int>(cout, " "));
        cout << "}\n";
    }
}

// Function to find subarrays with the given sum in an array
void findSubarrays(int nums[], int n, int target)
{
    // create an empty map of vectors for storing the end index of all
    // subarrays with the sum of elements so far
    unordered_map<int, vector<int>> map;

    // To handle the case when the subarray with the given sum starts
    // from the 0th index
    map[0].push_back(-1);

    int sum_so_far = 0;

    // traverse the given array
    for (int index = 0; index < n; index++)
    {
        // sum of elements so far
        sum_so_far += nums[index];

        // check if there exists at least one subarray with the given sum
        auto itr = map.find(sum_so_far - target);
        if (itr != map.end())
        {
            // print all subarrays with the given sum
            printSubarray(nums, index, map[itr->first]);
        }

        // insert (target so far, current index) pair into the map of vectors
        map[sum_so_far].push_back(index);
    }
}

int main()
{
    int nums[] = { 3, 4, -7, 1, 3, 3, 1, -4 };
    int target = 7;

    int n = sizeof(nums)/sizeof(nums[0]);
    findSubarrays(nums, n, target);

    return 0;
}
```

**Output:** [0…1] —— { 3 4 } [0…5] —— { 3 4 -7 1 3 3 } [3…5] —— { 1 3 3 } [4…6] —— { 3 3 1 }

##

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class Main
{
    // Utility function to insert <key, value> pair into the multimap
    private static<K, V> void insert(Map<K, List<V>> hashMap, K key, V value)
    {
        // if the key is seen for the first time, initialize the list
        hashMap.putIfAbsent(key, new ArrayList<>());
        hashMap.get(key).add(value);
    }

    // Utility function to print subarray `nums[i, j]`
    public static void printSubarray(int[] nums, int i, int j)
    {
        System.out.println(IntStream.range(i, j + 1)
                                    .mapToObj(k -> nums[k])
                                    .collect(Collectors.toList()));
    }

    // Function to find subarrays with the given sum in an array
    public static void printAllSubarrays(int[] nums, int target)
    {
        // create a map for storing the end index of all subarrays with
        // the sum of elements so far
        Map<Integer, List<Integer>> hashMap = new HashMap<>();

        // To handle the case when the subarray with the given sum starts
        // from the 0th index
        insert(hashMap, 0, -1);

        int sum_so_far = 0;

        // traverse the given array
        for (int index = 0; index < nums.length; index++)
        {
            // sum of elements so far
            sum_so_far += nums[index];

            // check if there exists at least one subarray with the given sum
            if (hashMap.containsKey(sum_so_far - target))
            {
                List<Integer> list = hashMap.get(sum_so_far - target);
                for (Integer value: list) {
                    printSubarray(nums, value + 1, index);
                }
            }

            // insert (target so far, current index) pair into the map
            insert(hashMap, sum_so_far, index);
        }
    }

    public static void main (String[] args)
    {
        int[] nums = { 3, 4, -7, 1, 3, 3, 1, -4 };
        int target = 7;

        printAllSubarrays(nums, target);
    }
}
```

##

```python3
# Function to find sublists with the given sum in a list
def printallSublists(nums, target):

    # create a dictionary for storing the end index of all sublists with
    # the sum of elements so far
    d = {}

    # To handle the case when the sublist with the given sum starts
    # from the 0th index
    d.setdefault(0, []).append(-1)

    sum_so_far = 0

    # traverse the given list
    for index in range(len(nums)):

        # target of elements so far
        sum_so_far += nums[index]

        # check if there exists at least one sublist with the given sum
        if (sum_so_far - target) in d:
            print(*[nums[value+1: index+1] for value in d.get(sum_so_far-target)], end=' ')

        # insert (target so far, current index) pair into the dictionary
        d.setdefault(sum_so_far, []).append(index)

if __name__ == '__main__':

    nums = [3, 4, -7, 1, 3, 3, 1, -4]
    target = 7

    printallSublists(nums, target)
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the input.
