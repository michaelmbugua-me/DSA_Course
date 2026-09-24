# Find an index of the maximum occurring element with equal probability

> Source: https://www.techiedelight.com/find-index-maximum-occurring-element-equal-probability/

[Array](https://www.techiedelight.com/Category/Array/)

Given a non-empty integer array, find the index of the maximum occurring element with an equal probability.

For example, consider the input: `{4, 3, 6, 8, 4, 6, 2, 4, 5, 9, 7, 4}`. The maximum occurring element, 4, occurs at index 0, 4, 7, and 11. The solution should return any one of these indices with an equal probability. If there are two maximum occurring elements in the array, the solution should consider the first occurring maximum element.

> 

The problem looks complicated at first look but has a straightforward solution. Following is the algorithm:

  1. Store the count of each element of the input in a map.
  2. Traverse the map and find the first maximum occurring element.
  3. Generate a random number `k` between 1 and the count of the maximum occurring element.
  4. Traverse the input and return the index of the `k'th` occurrence of the maximum occurring element.

Following is the C++, Java, and Python implementation of the algorithm:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
#include <ctime>
#include <cstdlib>
#include <unistd.h>        // for `sleep()`
using namespace std;

// Return the index of the maximum occurring element with equal probability
int findIndex(vector<int> const &nums)
{
    // store count of each input element in an `unordered_map`
    unordered_map<int, int> count;
    for (int i: nums) {
        count[i]++;
    }

    // traverse the array and find the first maximum occurring element
    int max_occurring = nums[0];
    for (int i: nums)
    {
        if (count[max_occurring] < count[i]) {
            max_occurring = i;
        }
    }

    // initialize the srand with a distinctive value and generate a random
    // number `k` between 1 and count of the maximum occurring element
    srand(time(nullptr));
    int k = (rand() % count[max_occurring]) + 1;

    // traverse the input vector and return the index of the k'th occurrence
    // of the maximum occurring element
    int index = 0;
    while (k && index < nums.size())
    {
        if (nums[index] == max_occurring) {
            k--;
        }

        index++;
    }

    return index - 1;
}

int main()
{
    vector<int> nums = { 4, 3, 6, 8, 4, 6, 2, 4, 5, 9, 7, 4 };

    for (int i = 0; i < 5; i++)
    {
        sleep(1);
        cout << "The index of the maximum occurring element is "
             << findIndex(nums) << endl;
    }

    return 0;
}
```

##

```java
import java.util.*;

class Main
{
    public static int rand(int min, int max)
    {
        if (min > max || (max - min + 1 > Integer.MAX_VALUE)) {
            throw new IllegalArgumentException("Invalid range");
        }
        return new Random().nextInt(max - min + 1) + min;
    }

    // Return the index of the maximum occurring element with equal probability
    public static int findIndex(int[] nums)
    {
        // store count of each list element in a `HashMap`
        Map<Integer, Integer> count = new HashMap<>();
        for (int i: nums) {
            count.put(i, count.getOrDefault(i, 0) + 1);
        }

        // traverse the array and find the first maximum occurring element
        int max_occurring = nums[0];
        for (int i: nums)
        {
            if (count.get(max_occurring) < count.get(i)) {
                max_occurring = i;
            }
        }

        // generate a random number `k` between 1 and count of the
        // maximum occurring element
        int k = rand(1, count.get(max_occurring));

        // traverse the input list and return the index of the k'th
        // occurrence of the maximum occurring element
        int index = 0;
        while (k != 0 && index < nums.length)
        {
            if (nums[index] == max_occurring) {
                k--;
            }
            index++;
        }

        return index - 1;
    }

    public static void main(String[] args)
    {
        int[] nums = {4, 3, 6, 8, 4, 6, 2, 4, 5, 9, 7, 4};

        for (int i = 0; i < 5; i++)
        {
            System.out.println("The index of the maximum occurring element is "
                    + findIndex(nums));
        }
    }
}
```

##

```python3
from random import randint

# Return the index of the maximum occurring element with equal probability
def findIndex(nums):

    # store count of each list element in a dictionary
    count = {}
    for i in nums:
        count[i] = count.get(i, 0) + 1

    # traverse the array and find the first maximum occurring element
    max_occurring = nums[0]
    for i in nums:
        if count[max_occurring] < count[i]:
            max_occurring = i

    # generate a random number `k` between 1 and count of the maximum occurring element
    k = randint(1, count[max_occurring])

    # traverse the input list and return the index of the k'th occurrence
    # of the maximum occurring element
    index = 0
    while k and index < len(nums):
        if nums[index] == max_occurring:
            k = k - 1
        index = index + 1

    return index - 1

if __name__ == '__main__':

    nums = [4, 3, 6, 8, 4, 6, 2, 4, 5, 9, 7, 4]

    for i in range(5):
        print('The index of the maximum occurring element is', findIndex(nums))
```

**Output (will vary):** The index of the maximum occurring element is 11 The index of the maximum occurring element is 4 The index of the maximum occurring element is 11 The index of the maximum occurring element is 0 The index of the maximum occurring element is 7

The time complexity of the proposed solution is O(n), where `n` is the input size and requires O(n) extra space for the map.

Also See:

> [Find the odd occurring element in an array in logarithmic time](https://www.techiedelight.com/find-odd-occurring-element-logn-time/ "Find the odd occurring element in an array in logarithmic time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 237

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
