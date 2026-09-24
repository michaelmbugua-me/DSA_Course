# Find the largest subarray having an equal number of 0’s and 1’s

> Source: https://www.techiedelight.com/find-maximum-length-sub-array-equal-number-0s-1s/

[Array](https://www.techiedelight.com/Category/Array/)

Given a binary array containing 0’s and 1’s, find the largest subarray with equal numbers of 0’s and 1’s.

For example,

**Input:** { 0, 0, 1, 0, 1, 0, 0 } **Output:** Largest subarray is { 0, 1, 0, 1 } or { 1, 0, 1, 0 }

> 

The problem differs from the problem of finding the largest subsequence with equal numbers of 0’s and 1’s. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

A naive solution would be to consider all subarrays and, for each subarray, count the total number of 0’s and 1’s present. If the subarray contains an equal number of 0’s and 1’s, update the largest subarray if required. The time complexity of the naive solution is O(n3) as there are `n2` subarrays in an array of size `n`, and it takes O(n) time to find count 0’s and 1’s. We can optimize the method to run in O(n2) time by calculating the count of 0’s and 1’s in constant time.

We can use the map to solve this problem in linear time. The idea is to replace 0 with -1 and find out the largest subarray with a sum of 0. To find the largest subarray with a sum of 0, create an empty map that stores the first subarray’s ending index having a given sum. Then traverse the given array and maintain the sum of elements seen so far.

  * If the sum is seen for the first time, insert the sum with its index into the map.
  * If the sum is seen before, there exists a subarray with a sum of 0, which ends at the current index, and update the largest subarray if the current subarray has more length.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to find the largest subarray having an equal number
// of 0's and 1's
void findLargestSubarray(int nums[], int n)
{
    // create an empty map to store the ending index of the first subarray
    // having some sum
    unordered_map<int, int> map;

    // insert (0, -1) pair into the set to handle the case when a
    // subarray with zero-sum starts from index 0
    map[0] = -1;

    // `len` stores the maximum length of subarray with zero-sum
    int len = 0;

    // stores ending index of the largest subarray having zero-sum
    int ending_index = -1;

    int sum = 0;

    // Traverse through the given array
    for (int i = 0; i < n; i++)
    {
        // sum of elements so far (replace 0 with -1)
        sum += (nums[i] == 0)? -1 : 1;

        // if the sum is seen before
        if (map.find(sum) != map.end())
        {
            // update length and ending index of largest subarray having zero-sum
            if (len < i - map[sum])
            {
                len = i - map[sum];
                ending_index = i;
            }
        }
        // if the sum is seen for the first time, insert the sum with its
        // index into the map
        else {
            map[sum] = i;
        }
    }

    // print the subarray if present
    if (ending_index != -1) {
        cout << "[" << ending_index - len + 1 << ", " << ending_index << "]";
    }
    else {
        cout << "No subarray exists";
    }
}

int main()
{
    int nums[] = { 0, 0, 1, 0, 1, 0, 0 };
    int n = sizeof(nums) / sizeof(nums[0]);

    findLargestSubarray(nums, n);

    return 0;
}
```

**Output:** [1, 4]

##

```java
import java.util.Map;
import java.util.HashMap;

class Main
{
    // Function to find the largest subarray having an equal number
    // of 0's and 1's
    public static void findLargestSubarray(int[] nums)
    {
        // create an empty `HashMap` to store the ending index of the first
        // subarray having some sum
        Map<Integer, Integer> map = new HashMap<>();

        // insert (0, -1) pair into the set to handle the case when a
        // subarray with zero-sum starts from index 0
        map.put(0, -1);

        // `len` stores the maximum length of subarray with zero-sum
        int len = 0;

        // stores ending index of the largest subarray having zero-sum
        int ending_index = -1;

        int sum = 0;

        // Traverse through the given array
        for (int i = 0; i < nums.length; i++)
        {
            // sum of elements so far (replace 0 with -1)
            sum += (nums[i] == 0)? -1: 1;

            // if the sum is seen before
            if (map.containsKey(sum))
            {
                // update length and ending index of largest subarray having zero-sum
                if (len < i - map.get(sum))
                {
                    len = i - map.get(sum);
                    ending_index = i;
                }
            }
            // if the sum is seen for the first time, insert the sum with its
            // index into the map
            else {
                map.put(sum, i);
            }
        }

        // print the subarray if present
        if (ending_index != -1)
        {
            System.out.println("[" + (ending_index - len + 1) + ", " +
                                    ending_index + "]");
        }
        else {
            System.out.println("No subarray exists");
        }
    }

    public static void main (String[] args)
    {
        int[] nums = { 0, 0, 1, 0, 1, 0, 0 };

        findLargestSubarray(nums);
    }
}
```

##

```python3
# Function to find the largest sublist having an equal number of 0's and 1's
def findLargestSublist(nums):

    # create an empty dictionary to store the ending index of the first
    # sublist having some sum
    d = {}

    # insert (0, -1) pair into the set to handle the case when a
    # sublist with zero-sum starts from index 0
    d[0] = -1

    # `length` stores the maximum length of sublist with zero-sum
    length = 0

    # stores ending index of the largest sublist having zero-sum
    ending_index = -1

    total = 0

    # Traverse through the given list
    for i in range(len(nums)):

        # sum of elements so far (replace 0 with -1)
        total += -1 if (nums[i] == 0) else 1

        # if the sum is seen before
        if total in d:

            # update length and ending index of largest sublist having zero-sum
            if length < i - d.get(total):
                length = i - d.get(total)
                ending_index = i

        # if the sum is seen for the first time, insert the sum with its
        # index into the dictionary
        else:
            d[total] = i

    # print the sublist if present
    if ending_index != -1:
        print((ending_index - length + 1, ending_index))
    else:
        print('No sublist exists')

if __name__ == '__main__':

    nums = [0, 0, 1, 0, 1, 0, 0]
    findLargestSublist(nums)
```

The time complexity of the above solution O(n) and requires O(n) extra space, where `n` is the size of the input.

Also See:

> [Find maximum length subarray having a given sum](https://www.techiedelight.com/find-maximum-length-sub-array-having-given-sum/ "Find maximum length subarray having a given sum")

> [Print continuous subarray with maximum sum](https://www.techiedelight.com/print-continuous-subarray-with-maximum-sum/ "Print continuous subarray with maximum sum")

> [Maximum Sum Circular Subarray](https://www.techiedelight.com/maximum-sum-circular-subarray/ "Maximum Sum Circular Subarray")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 213

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
