# Check if a subarray with 0 sum exists or not

> Source: https://www.techiedelight.com/check-subarray-with-0-sum-exists-not/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, check if it contains a subarray having zero-sum.

For example,

**Input:** { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 } **Output:** Subarray with zero-sum exists The subarrays with a sum of 0 are: { 3, 4, -7 } { 4, -7, 3 } { -7, 3, 1, 3 } { 3, 1, -4 } { 3, 1, 3, 1, -4, -2, -2 } { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 }

Note that the problem deals with [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous, i.e., whose elements occupy consecutive positions in the array.

> 

We can easily solve this problem in linear time by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to use a set to check if a subarray with zero-sum is present in the given array or not. Traverse the array and maintain the sum of elements seen so far. If the sum is seen before (i.e., the sum exists in the set), return true as there exists at least one subarray with zero-sum that ends at the current index; otherwise, insert the sum into the set.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// Function to check if subarray with zero-sum is present in a given array or not
bool hasZeroSumSubarray(int nums[], int n)
{
    // create an empty set to store the sum of elements of each
    // subarray `nums[0…i]`, where `0 <= i < n`
    unordered_set<int> set;

    // insert 0 into the set to handle the case when subarray with
    // zero-sum starts from index 0
    set.insert(0);

    int sum = 0;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // sum of elements so far
        sum += nums[i];

        // if the sum is seen before, we have found a subarray with zero-sum
        if (set.find(sum) != set.end()) {
            return true;
        }
        else {
            // insert sum so far into the set
            set.insert(sum);
        }
    }

    // we reach here when no subarray with zero-sum exists
    return false;
}

int main()
{
    int nums[] = { 4, 2, -3, -1, 0, 4 };
    int n = sizeof(nums)/sizeof(nums[0]);

    hasZeroSumSubarray(nums, n) ?
            cout << "Subarray exists":
            cout << "Subarray does not exist";

    return 0;
}
```

**Output:** Subarray exists

##

```java
import java.util.Set;
import java.util.HashSet;

class Main
{
    // Function to check if subarray with zero-sum is present in a given array or not
    public static Boolean hasZeroSumSubarray(int[] nums)
    {
        // create an empty set to store the sum of elements of each
        // subarray `nums[0…i]`, where `0 <= i < nums.length`
        Set<Integer> set = new HashSet<>();

        // insert 0 into the set to handle the case when subarray with
        // zero-sum starts from index 0
        set.add(0);

        int sum = 0;

        // traverse the given array
        for (int value: nums)
        {
            // sum of elements so far
            sum += value;

            // if the sum is seen before, we have found a subarray with zero-sum
            if (set.contains(sum)) {
                return true;
            }

            // insert sum so far into the set
            set.add(sum);
        }

        // we reach here when no subarray with zero-sum exists
        return false;
    }

    public static void main (String[] args)
    {
        int[] nums = { 4, -6, 3, -1, 4, 2, 7 };

        if (hasZeroSumSubarray(nums)) {
            System.out.println("Subarray exists");
        }
        else {
            System.out.println("Subarray does not exist");
        }
    }
}
```

##

```python3
# Function to check if a sublist with zero-sum is present in a given list or not
def hasZeroSumSublist(nums):

    # create an empty set to store the sum of elements of each
    # sublist `nums[0…i]`, where `0 <= i < len(nums)`
    s = set()

    # insert 0 into the set to handle the case when sublist with
    # zero-sum starts from index 0
    s.add(0)

    total = 0

    # traverse the given list
    for i in nums:

        # sum of elements so far
        total += i

        # if the sum is seen before, we have found a sublist with zero-sum
        if total in s:
            return True

        # insert sum so far into the set
        s.add(total)

    # we reach here when no sublist with zero-sum exists
    return False

if __name__ == '__main__':

    nums = [4, -6, 3, -1, 4, 2, 7]

    if hasZeroSumSublist(nums):
        print('Sublist exists')
    else:
        print('Sublist does not exist')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

**Also See:**

> [Print all subarrays with 0 sum](https://techiedelight.com/find-sub-array-with-0-sum/)

**Exercise:** Extend the solution for a non-zero sum of the subarray.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 338

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
