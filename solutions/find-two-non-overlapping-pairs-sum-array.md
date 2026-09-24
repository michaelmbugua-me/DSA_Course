# Find two non-overlapping pairs having the same sum in an array

> Source: https://www.techiedelight.com/find-two-non-overlapping-pairs-sum-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an unsorted integer array, find two non-overlapping pairs in it having the same sum.

For example,

**Input:** { 3, 4, 7, 3, 4 } **Output:** (4, 3) and (3, 4) **Input:** { 3, 4, 7, 4 } **Output:** No non-overlapping pairs is present in the array The pairs (3, 4) and (3, 4) are overlapping as the index of 3 is the same in both pairs.

> 

The idea is to consider every pair of elements in the array one by one and insert it into a map. For each pair, check if their sum exists on the map or not. If we have encountered the sum before, and elements involved in previous occurrence `(m, n)` don’t overlap with the current pair `(i, j)`, print both the pairs and return.

Following is the C++, Java, and Python implementation of the program:

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

typedef pair<int, int> Pair;

// Function to find two non-overlapping pairs with the same sum in an array
void findPairs(int nums[], int n)
{
    // create an empty map
    // key —> sum of a pair of elements in the array
    // value —> vector storing an index of every pair having that sum
    unordered_map<int, vector<Pair>> map;

    // consider every pair (nums[i], nums[j]), where `j > i`
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            // calculate the sum of the current pair
            int sum = nums[i] + nums[j];

            // if the sum is already present on the map
            if (map.find(sum) != map.end())
            {
                // check every pair for the desired sum
                for (auto pair: map.find(sum)->second)
                {
                    int m = pair.first, n = pair.second;

                    // if pairs don't overlap, print and return them
                    if ((m != i && m != j) && (n != i && n != j))
                    {
                        cout << "First Pair (" << nums[i] << ", " << nums[j] << ")\n";
                        cout << "Second Pair (" << nums[m] << ", " << nums[n] << ")\n";
                        return;
                    }
                }
            }

            // insert the current pair into the map
            map[sum].push_back({i, j});
        }
    }

    cout << "No non-overlapping pairs present";
}

int main()
{
    int nums[] = { 3, 4, 7, 3, 4 };
    int n = sizeof(nums) / sizeof(nums[0]);

    findPairs(nums, n);

    return 0;
}
```

**Output:** First Pair (4, 3) Second Pair (3, 4)

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
    // Function to find two non-overlapping pairs with the same sum in an array
    public static void findPairs(int[] nums)
    {
        // create an empty map
        // key —> sum of a pair of elements in the array
        // value —> list storing an index of every pair having that sum
        Map<Integer, List<Pair>> map = new HashMap<>();

        // consider every pair (nums[i], nums[j]), where `j > i`
        for (int i = 0; i < nums.length - 1; i++)
        {
            for (int j = i + 1; j < nums.length; j++)
            {
                // calculate the sum of the current pair
                int sum = nums[i] + nums[j];

                // if the sum is already present on the map
                if (map.containsKey(sum))
                {
                    // check every pair for the desired sum
                    for (Pair pair: map.get(sum))
                    {
                        int m = pair.x;
                        int n = pair.y;

                        // if pairs don't overlap, print and return them
                        if ((m != i && m != j) && (n != i && n != j))
                        {
                            System.out.printf("First Pair (%d, %d)\n", nums[i], nums[j]);
                            System.out.printf("Second Pair (%d, %d)\n", nums[m], nums[n]);

                            return;
                        }
                    }
                }

                // insert the current pair into the map
                map.putIfAbsent(sum, new ArrayList<>());
                map.get(sum).add(new Pair(i, j));
            }
        }

        System.out.println("No non-overlapping pairs present");
    }

    public static void main(String[] args)
    {
        int[] nums = { 3, 4, 7, 3, 4 };

        findPairs(nums);
    }
}
```

##

```python3
# Function to find two non-overlapping pairs with the same sum in a list
def findPairs(nums):

    # create an empty dictionary
    # key —> sum of a pair of elements in the list
    # value —> list storing an index of every pair having that sum
    d = {}

    # consider every pair (nums[i], nums[j]), where `j > i`
    for i in range(len(nums) - 1):
        for j in range(i + 1, len(nums)):
            # calculate the sum of the current pair
            total = nums[i] + nums[j]

            # if the sum is already present on the dictionary
            if total in d:
                # check every pair for the desired sum
                for m, n in d[total]:

                    # if pairs don't overlap, print and return them
                    if (m != i and m != j) and (n != i and n != j):
                        print('First Pair', (nums[i], nums[j]))
                        print('Second Pair', (nums[m], nums[n]))
                        return

            # insert the current pair into the dictionary
            d.setdefault(total, []).append((i, j))

    print('No non-overlapping pairs present')

if __name__ == '__main__':

    nums = [3, 4, 7, 3, 4]
    findPairs(nums)
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 147

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
