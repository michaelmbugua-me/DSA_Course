# Find duplicates within a range `k` in an array

> Source: https://www.techiedelight.com/find-duplicates-within-given-range-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array and a positive number `k`, check whether the array contains any duplicate elements within the range `k`. If `k` is more than the array’s size, the solution should check for duplicates in the complete array.

For example,

**Input:** nums[] = { 5, 6, 8, 2, 4, 6, 9 } k = 4 **Output:** Duplicates found (element 6 repeats at distance 4 which is <= k) **Input:** nums[] = { 5, 6, 8, 2, 4, 6, 9 } k = 2 **Output:** No duplicates were found (element 6 repeats at distance 4 which is > k) **Input:** nums[] = { 1, 2, 3, 2, 1 } k = 7 **Output:** Duplicates found (element 1 and 2 repeats at distance 4 and 2, respectively which are both <= k)

> 

A naive solution would be to consider every subarray of size `k` and check for duplicates in it. The time complexity of this solution is O(n.k2) since there can be `n` subarrays of size `k`, and each subarray might take O(k2) time for checking duplicates.

The problem can be efficiently solved using [hashing](https://techiedelight.com/hashing-in-data-structure/) in O(n) time and O(n) extra space. The idea is to traverse the array and store each element and its index in a map, i.e., `(element, index)` as `(key, value)` pairs in a map. If any element is already found present on the map, check if that element repeats within the range of `k` using its previous occurrence information from the map.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

bool hasDuplicate(vector<int> &input, int k)
{
    // stores (element, index) pairs as (key, value) pairs
    unordered_map<int, int> map;

    // traverse the vector
    for (int i = 0; i < input.size(); i++)
    {
        // if the current element already exists in the map
        if (map.find(input[i]) != map.end())
        {
            // return true if the current element repeats within range of `k`
            if (i - map[input[i]] <= k) {
                return true;
            }
        }

        // store elements along with their indices
        map[input[i]] = i;
    }

    // we reach here when no element repeats within range `k`
    return false;
}

int main()
{
    vector<int> input = { 5, 6, 8, 2, 4, 6, 9 };
    int k = 4;

    if (hasDuplicate(input, k)) {
        cout << "Duplicates found";
    }
    else {
        cout << "No duplicates were found";
    }

    return 0;
}
```

**Output:** Duplicates found

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    public static boolean hasDuplicate(int[] nums, int k)
    {
        // stores (element, index) pairs as (key, value) pairs
        Map<Integer, Integer> map = new HashMap<>();

        // traverse the array
        for (int i = 0; i < nums.length; i++)
        {
            // if the current element already exists in the map
            if (map.containsKey(nums[i]))
            {
                // return true if the current element repeats within range of `k`
                if (i - map.get(nums[i]) <= k) {
                    return true;
                }
            }

            // store elements along with their indices
            map.put(nums[i], i);
        }

        // we reach here when no element repeats within range `k`
        return false;
    }

    public static void main(String[] args)
    {
        int[] nums = { 5, 6, 8, 2, 4, 6, 9 };
        int k = 4;

        if (hasDuplicate(nums, k)) {
            System.out.println("Duplicates found");
        }
        else {
            System.out.println("No duplicates were found");
        }
    }
}
```

##

```python3
def hasDuplicate(nums, k):

    # stores (element, index) pairs as (key, value) pairs
    d = {}

    # traverse the list
    for i, e in enumerate(nums):

        # if the current element already exists in the dictionary
        if e in d:

            # return true if the current element repeats within range of `k`
            if i - d.get(e) <= k:
                return True

        # store elements along with their indices
        d[e] = i

    # we reach here when no element repeats within range `k`
    return False

if __name__ == '__main__':

    nums = [5, 6, 8, 2, 4, 6, 9]
    k = 4

    if hasDuplicate(nums, k):
        print('Duplicates found')
    else:
        print('No duplicates were found')
```

We can also use a [sliding window](https://techiedelight.com/sliding-window-problems/) to solve the above problem. The idea is to process every window of size `k` and store its elements in a set. If any element repeats in the window, we can say that it repeats within the range of k.

Initially, our window will contain the first `k` elements of the input. Then for each item of the remaining input, add it to the current window. While adding the `i'th` item of the input to the current window, remove the `(i-k)'th` element from it. This ensures the efficiency of the solution and keeps the window balance at any point.

Following is the C++, Java, and Python implementation based on the above idea:

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

// Returns true if element `x` is present in a given set
bool contains(unordered_set<int> const &set, int x) {
    return set.find(x) != set.end();
}

bool hasDuplicate(vector<int> &input, int k)
{
    // create an empty set to store elements within range `k`
    unordered_set<int> window;

    // traverse the vector
    for (int i = 0; i < input.size(); i++)
    {
        // if the current element already exists in the window,
        // then it repeats within range of `k`
        if (contains(window, input[i])) {
            return true;
        }

        // add the current element to the window
        window.insert(input[i]);

        // remove the element at k'th range from the current element
        if (i >= k) {
            window.erase(input[i - k]);
        }
    }

    // we reach here when no element repeats within range `k`
    return false;
}

int main()
{
    vector<int> input = { 5, 6, 8, 2, 4, 6, 9 };
    int k = 4;

    if (hasDuplicate(input, k)) {
        cout << "Duplicates found";
    }
    else {
        cout << "No duplicates were found";
    }

    return 0;
}
```

**Output:** Duplicates found

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    public static boolean hasDuplicate(int[] nums, int k)
    {
        // create an empty set to store elements within range `k`
        Set<Integer> window = new HashSet<>();

        // traverse the array
        for (int i = 0; i < nums.length; i++)
        {
            // if the current element already exists in the window,
            // then it repeats within range of `k`
            if (window.contains(nums[i])) {
                return true;
            }

            // add the current element to the window
            window.add(nums[i]);

            // remove the element at k'th range from the current element
            if (i >= k) {
                window.remove(nums[i - k]);
            }
        }

        // we reach here when no element repeats within range `k`
        return false;
    }

    public static void main(String[] args)
    {
        int[] nums = { 5, 6, 8, 2, 4, 6, 9 };
        int k = 4;

        if (hasDuplicate(nums, k)) {
            System.out.println("Duplicates found");
        }
        else {
            System.out.println("No duplicates were found");
        }
    }
}
```

##

```python3
def hasDuplicate(nums, k):

    # create an empty set to store elements within range `k`
    window = set()

    # traverse the list
    for i in range(len(nums)):

        # if the current element already exists in the window,
        # then it repeats within range of `k`
        if nums[i] in window:
            return True

        # add the current element to the window
        window.add(nums[i])

        # remove the element at k'th range from the current element
        if i >= k:
            window.remove(nums[i - k])

    # we reach here when no element repeats within range `k`
    return False

if __name__ == '__main__':

    nums = [5, 6, 8, 2, 4, 6, 9]
    k = 4

    if hasDuplicate(nums, k):
        print('Duplicates found')
    else:
        print('No duplicates were found')
```

The time complexity of the above solution is O(n) and requires O(k) extra space.
