# Shuffle an array according to the given order of elements

> Source: https://www.techiedelight.com/shuffle-array-according-to-given-order/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of distinct integers, shuffle it according to the given order of elements.

For example,

**Input:** nums[] = { 1, 2, 3, 4, 5 } pos[] = { 3, 2, 4, 1, 0 } **Output:** nums[] = { 5, 4, 2, 1, 3 } i.e., if pos[i] = j, then update nums[j] = nums[i] for every index i. In other words, update nums[pos[i]] = nums[i] for every index i.

> 

A simple solution is to create an auxiliary array of size `n`, and for each element in the input array, set the corresponding values in it. After filling the auxiliary array, we copy it back to the given array. This solution can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to shuffle an array according to the given order of elements
void shuffle(int nums[], int pos[], int n)
{
    // create an auxiliary array of size `n`
    int aux[n];

    // fill the auxiliary array with the correct order of elements
    for (int i = 0; i < n; i++) {
        aux[pos[i]] = nums[i];
    }

    // copy the auxiliary array back to the given array
    for (int i = 0; i < n; i++) {
        nums[i] = aux[i];
    }
}

int main(void)
{
    // input array
    int nums[] = { 1, 2, 3, 4, 5 };

    // position array
    int pos[] = { 3, 2, 4, 1, 0 };

    int n = sizeof(nums) / sizeof(nums[0]);

    shuffle(nums, pos, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", nums[i]);
    }

    return 0;
}
```

**Output:** 5 4 2 1 3

##

```java
import java.util.Arrays;

class Main
{
    // Function to shuffle an array according to the given order of elements
    public static void shuffle(int[] nums, int[] pos)
    {
        // create an auxiliary array of size `n`
        int[] aux = new int[nums.length];

        // fill the auxiliary array with the correct order of elements
        for (int i = 0; i < nums.length; i++) {
            aux[pos[i]] = nums[i];
        }

        // copy the auxiliary array back to the given array
        for (int i = 0; i < nums.length; i++) {
            nums[i] = aux[i];
        }
    }

    public static void main(String[] args)
    {
        // input array
        int[] nums = { 1, 2, 3, 4, 5 };

        // position array
        int[] pos = { 3, 2, 4, 1, 0 };

        shuffle(nums, pos);

        System.out.println(Arrays.toString(nums));
    }
}
```

##

```python3
# Function to shuffle a list according to the given order of elements
def shuffle(nums, pos):

    # create an auxiliary space of size `n`
    aux = [None] * len(nums)

    # fill the auxiliary space with the correct order of elements
    for i, e in enumerate(pos):
        aux[e] = nums[i]

    # copy the auxiliary space back to the given list
    for i in range(len(nums)):
        nums[i] = aux[i]

if __name__ == '__main__':

    # input list
    nums = [1, 2, 3, 4, 5]

    # position list
    pos = [3, 2, 4, 1, 0]

    shuffle(nums, pos)
    print(nums)
```

We can also use a map replacing the auxiliary array, as demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Function to shuffle an array according to the given order of elements
void shuffle(auto &nums, auto &pos)
{
    // create an empty unordered map
    unordered_map<int, int> map;

    // fill the map with the required mappings
    for (int i = 0; i < nums.size(); i++) {
        map[pos[i]] = nums[i];
    }

    // iterate through the map and replace the array elements
    for (auto &p: map) {
        nums[p.first] = p.second;
    }
}

int main()
{
    vector<int> nums = { 1, 2, 3, 4, 5 };    // input array
    vector<int> pos = { 3, 2, 4, 1, 0 };    // position array

    shuffle(nums, pos);

    for (int i: nums) {
        cout << i << " ";
    }

    return 0;
}
```

**Output:** 5 4 2 1 3

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to shuffle an array according to the given order of elements
    public static void shuffle(int[] nums, int[] pos)
    {
        // create an empty unordered map
        Map<Integer, Integer> map = new HashMap<>();

        // fill the map with the required mappings
        for (int i = 0; i < nums.length; i++) {
            map.put(pos[i], nums[i]);
        }

        // iterate through the map and replace the array elements
        for (var entry: map.entrySet()) {
            nums[entry.getKey()] = entry.getValue();
        }
    }

    public static void main(String[] args)
    {
        int[] nums = { 1, 2, 3, 4, 5 };        // input array
        int[] pos = { 3, 2, 4, 1, 0 };        // position array

        shuffle(nums, pos);
        System.out.println(Arrays.toString(nums));
    }
}
```

##

```python3
# Function to shuffle a list according to the given order of elements
def shuffle(nums, pos):

    # create an empty dictionary
    d = {}

    # fill the dictionary with the required mappings
    for i, e in enumerate(pos):
        d[e] = nums[i]

    # iterate through the dictionary and replace the list elements
    for key, value in d.items():
        nums[key] = value

if __name__ == '__main__':

    nums = [1, 2, 3, 4, 5]     # input list
    pos = [3, 2, 4, 1, 0]   # position list

    shuffle(nums, pos)
    print(nums)
```

The time complexity of both above-discussed methods is O(n). However, both solution requires extra space. The algorithm can be implemented with O(1) extra space, as shown below:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to shuffle an array according to the given order of elements
void shuffle(auto &nums, auto &pos)
{
    // traverse the array from left to right
    for (int i = 0; i < nums.size(); i++)
    {
        // loop till the current set is swapped
        while (pos[i] != i)
        {
            // update `nums[]` and `pos[]` with the correct order of elements
            swap(nums[pos[i]], nums[i]);
            swap(pos[pos[i]], pos[i]);
        }
    }
}

int main()
{
    vector<int> nums = { 1, 2, 3, 4, 5 };    // input array
    vector<int> pos = { 3, 2, 4, 1, 0 };    // position array

    shuffle(nums, pos);

    for (int i: nums) {
        cout << i << " ";
    }

    return 0;
}
```

**Output:** 5 4 2 1 3
