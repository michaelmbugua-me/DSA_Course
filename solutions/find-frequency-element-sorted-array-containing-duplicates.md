# Find the frequency of each element in a sorted array containing duplicates

> Source: https://www.techiedelight.com/find-frequency-element-sorted-array-containing-duplicates/

Given a sorted array containing duplicates, efficiently find each element’s frequency without traversing the whole array.

For example,

**Input:** [2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9] Output: {2: 3, 4: 3, 5: 2, 6: 1, 8: 2, 9: 1} **Explanation:** 2 and 4 occurs thrice 5 and 8 occurs twice 6 and 9 occurs once

> 

A simple solution would be to run a linear search on the array and count the number of occurrences of each element and finally print them. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the input size, and we are scanning the whole array (violating problem constraints).

We can easily solve this problem in O(m.log(n)) time by taking advantage of the fact that the input is sorted and contains duplicates. Here `m` is the total number of distinct elements in the array, and `n` is the input size.

## 1\. Recursive Implementation

The idea is to split the array into two halves and with [recur](https://techiedelight.com/recursion-practice-problems-with-solutions/) for both halves. The base condition checks if the last element of the subarray is the same as its first element. If both are equal, then that implies that all subarray items are similar (since the array is sorted), and we update the element count by the total number of elements in the subarray (in constant time).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to find the frequency of each element in a sorted array
void findFrequency(int nums[], int n, unordered_map<int, int> &freq)
{
    // if every element in subarray nums[0…n-1] is equal,
    // then increment the element's count by `n`
    if (nums[0] == nums[n - 1])
    {
        freq[nums[0]] += n;
        return;
    }

    // divide the array into left and right subarray and recur
    findFrequency(nums, n/2, freq);
    findFrequency(nums + n/2, n - n/2, freq);
}

int main()
{
    int nums[] = { 2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9 };
    int n = sizeof(nums) / sizeof(int);

    // find the frequency of each array element and store it in a map
    unordered_map<int, int> freq;
    findFrequency(nums, n, freq);

    // print the frequency
    for (auto pair: freq) {
        cout << pair.first << " occurs " << pair.second << " times\n";
    }

    return 0;
}
```

**Output:** 9 occurs 1 times 8 occurs 2 times 2 occurs 3 times 4 occurs 3 times 5 occurs 2 times 6 occurs 1 times

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find the frequency of each element in a sorted array
    public static void findFrequency(int[] nums, int left, int right,
                                    Map<Integer, Integer> freq)
    {
        if (left > right) {
            return;
        }

        // if every element in subarray nums[left…right] is equal,
        // then increment the element's count by `n`
        if (nums[left] == nums[right])
        {
            Integer count = freq.get(nums[left]);
            if (count == null) {
                count = 0;
            }

            freq.put(nums[left], count + (right - left + 1));
            return;
        }

        int mid = (left + right)/2;

        // divide the array into left and right subarray and recur
        findFrequency(nums, left, mid, freq);
        findFrequency(nums, mid + 1, right, freq);
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9 };

        // find the frequency of each array element and store it in a map
        Map<Integer, Integer> freq = new HashMap<>();
        findFrequency(nums, 0, nums.length - 1, freq);

        System.out.println(freq);
    }
}
```

##

```python3
# Function to find the frequency of each element in a sorted list
def findFrequency(nums, left, right, freq):

    if left > right:
        return

    # if every element in sublist nums[left…right] is equal,
    # then increment the element's count by `n`
    if nums[left] == nums[right]:

        count = freq.get(nums[left])
        if count is None:
            count = 0

        freq[nums[left]] = count + (right - left + 1)
        return

    mid = (left + right) // 2

    # divide the list into left and right sublist and recur
    findFrequency(nums, left, mid, freq)
    findFrequency(nums, mid + 1, right, freq)

if __name__ == '__main__':

    nums = [2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9]

    # find the frequency of each element in the list and store it in a dictionary
    freq = {}
    findFrequency(nums, 0, len(nums) - 1, freq)
    print(freq)
```

## 2\. Iterative Implementation

Following is the iterative implementation of the algorithm in C++, Java, and Python. The implementation updates the frequency of each distinct array element one at a time and grow/shrink the collection dynamically to consider each item.

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Function to find the frequency of each element in a sorted array
unordered_map<int, int> findFrequency(vector<int> const &nums)
{
    // find the frequency of each array element and store it in a map
    unordered_map<int, int> freq;

    int n = nums.size();

    // search space is nums[low…high]
    int low = 0, high = n - 1, mid;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // if nums[low…high] consists of only one element, update its count
        if (nums[low] == nums[high])
        {
            freq[nums[low]] += high - low + 1;

            // now discard nums[low…high] and continue searching
            // in nums[high+1… n-1] for nums[low]
            low = high + 1;
            high = n - 1;
        }
        else {
            // reduce the search space
            high = (low + high) / 2;
        }
    }

    return freq;
}

int main()
{
    vector<int> nums = { 2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9 };

    unordered_map<int, int> freq = findFrequency(nums);

    for (auto pair: freq) {
        cout << pair.first << " occurs " << pair.second << " times\n";
    }

    return 0;
}
```

**Output:**

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find the frequency of each element in a sorted array
    public static Map<Integer, Integer> findFrequency(int[] nums)
    {
        // Map to store the frequency of each array element
        Map<Integer, Integer> freq = new HashMap<>();

        // search space is nums[left…right]
        int left = 0, right = nums.length - 1;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // if nums[left…right] consists of only one element, update its count
            if (nums[left] == nums[right])
            {
                freq.put(nums[left], freq.getOrDefault(nums[left], 0) +
                        (right - left + 1));

                // now discard nums[left…right] and continue searching in
                // nums[right+1… n-1] for nums[left]
                left = right + 1;
                right = nums.length - 1;
            }
            else {
                // reduce the search space
                right = (left + right) / 2;
            }
        }

        return freq;
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9};

        Map<Integer, Integer> freq = findFrequency(nums);
        System.out.println(freq);
    }
}
```

##

```python3
# Function to find the frequency of each element in a sorted list
def findFrequency(nums):

    # dictionary to store the frequency of each element in the list
    freq = {}

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # loop till the search space is exhausted
    while left <= right:

        # if nums[left…right] consists of only one element, update its count
        if nums[left] == nums[right]:
            freq[nums[left]] = freq.get(nums[left], 0) + (right - left + 1)

            # now discard nums[left…right] and continue searching in
            # nums[right+1… n-1] for nums[left]
            left = right + 1
            right = len(nums) - 1
        else:
            # reduce the search space
            right = (left + right) // 2

    return freq

if __name__ == '__main__':

    nums = [2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9]
    print(findFrequency(nums))
```

## 3\. STL’s Implementation

We can easily solve this problem by using STL as well. The idea is to find the index of the first and last occurrence of every distinct number in the array and update the difference between two indices in a map. In the following solution, we will use STL’s [std::upper_bound](https://cplusplus.com/reference/algorithm/upper_bound/) and [std::lower_bound](https://cplusplus.com/reference/algorithm/lower_bound/) to find the first and last occurrence of each element using [binary search algorithm](https://techiedelight.com/binary-search/).

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find the frequency of each element in a sorted array
unordered_map<int, int> findFrequency(vector<int> const &nums)
{
    // map to store the frequency of each array element
    unordered_map<int, int> freq;

    // do for every distinct array element
    auto it = nums.begin();
    while (it != nums.end())
    {
        int val = *it;

        // find the first occurrence
        auto low = lower_bound(nums.begin(), nums.end(), val);

        // find the last occurrence
        auto high = upper_bound(nums.begin(), nums.end(), val);

        // update the difference in the map
        freq[val] = high - low;

        // it is important to move to the next element in the vector
        // (not the immediate next)
        it = it + freq[val];
    }

    // return the map
    return freq;
}

int main()
{
    vector<int> nums { 2, 2, 2, 4, 4, 4, 5, 5, 6, 8, 8, 9 };

    unordered_map<int, int> freq = findFrequency(nums);

    for (auto pair: freq) {
        cout << pair.first << " occurs " << pair.second << " times\n";
    }

    return 0;
}
```

**Output:** 9 occurs 1 times 8 occurs 2 times 2 occurs 3 times 4 occurs 3 times 5 occurs 2 times 6 occurs 1 times
