# Print all triplets in an array with a sum less than or equal to a given number

> Source: https://www.techiedelight.com/print-triplets-array-sum-less-equal-given-number/

Given an unsorted integer array, print all triplets in it with sum less than or equal to a given number.

For example,

**Input:** nums = [ 2, 7, 4, 9, 5, 1, 3 ] sum = 10 **Output:** Triplets are (1, 2, 3) (1, 2, 4) (1, 2, 5) (1, 2, 7) (1, 3, 4) (1, 3, 5) (1, 4, 5) (2, 3, 4) (2, 3, 5)

> 

The idea is to [sort the given array in ascending order](https://techiedelight.com/sort-array-ascending-order-cpp/) and for each element `nums[i]` in the array, check if triplets can be formed by `nums[i]` and [pairs from subarray [i+1…n)](https://techiedelight.com/find-pair-with-given-sum-array/). This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to print all distinct triplets in an array with a sum
// less than or equal to a given number
void printAllTriplets(int nums[], int n, int sum)
{
    // sort the array in ascending order
    sort(nums, nums + n);

    // check if triplet is formed by `nums[i]` and a pair from
    // subarray `nums[i+1…n)`
    for (int i = 0; i <= n - 3; i++)
    {
        // maintain two indexes pointing to endpoints of the
        // subarray `nums[i+1…n)`
        int low = i + 1, high = n - 1;

        // do if `low` is less than `high`
        while (low < high)
        {
            // decrement `high` if the total is more than the remaining sum
            if (nums[i] + nums[low] + nums[high] > sum) {
                high--;
            }

            else {
                // if the total is less than or equal to the remaining sum,
                // print all triplets
                for (int x = low + 1; x <= high; x++) {
                    cout << "(" << nums[i] << ", " << nums[low] << ", " << nums[x] << ")";
                }

                low++;    // increment low
            }
        }
    }
}

int main()
{
    int nums[] = { 2, 7, 4, 9, 5, 1, 3 };
    int sum = 10;

    int n = sizeof(nums) / sizeof(nums[0]);

    printAllTriplets(nums, n, sum);

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Function to print all distinct triplets in the array with a sum
    // less than or equal to a given number
    public static void printAllTriplets(int[] nums, int sum)
    {
        // sort the array in ascending order
        Arrays.sort(nums);

        // check if triplet is formed by `nums[i]` and a pair from
        // subarray `nums[i+1…n)`
        for (int i = 0; i <= nums.length - 3; i++)
        {
            // maintain two indexes pointing to endpoints of the
            // subarray `nums[i+1…n)`
            int low = i + 1, high = nums.length - 1;

            // loop if `low` is less than `high`
            while (low < high)
            {
                // decrement `high` if the total is more than the remaining sum
                if (nums[i] + nums[low] + nums[high] > sum) {
                    high--;
                }
                else {
                    // if the total is less than or equal to the remaining sum,
                    // print all triplets
                    for (int x = low + 1; x <= high; x++)
                    {
                        System.out.println("(" + nums[i] + ", " + nums[low] + ", "
                                        + nums[x] + ")");
                    }

                    low++;        // increment low
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 7, 4, 9, 5, 1, 3 };
        int sum = 10;

        printAllTriplets(nums, sum);
    }
}
```

##

```python3
# Function to print all distinct triplets in the list with a sum
# less than or equal to a given number
def printAllTriplets(nums, total):

    # sort the list in ascending order
    nums.sort()

    # check if triplet is formed by `nums[i]` and a pair from
    # sublist `nums[i+1…n)`
    for i in range(len(nums) - 2):
        # maintain two indexes pointing to endpoints of the
        # sublist `nums[i+1…n)`
        low = i + 1
        high = len(nums) - 1

        # loop if `low` is less than `high`
        while low < high:
            # decrement `high` if the total is more than the remaining sum
            if nums[i] + nums[low] + nums[high] > total:
                high = high - 1
            else:
                # if the total is less than or equal to the remaining sum,
                # print all triplets
                for x in range(low + 1, high + 1):
                    print((nums[i], nums[low], nums[x]))

                low = low + 1        # increment low

if __name__ == '__main__':

    nums = [2, 7, 4, 9, 5, 1, 3]
    total = 10

    printAllTriplets(nums, total)
```

**Output:** (1, 2, 3) (1, 2, 4) (1, 2, 5) (1, 2, 7) (1, 3, 4) (1, 3, 5) (1, 4, 5) (2, 3, 4) (2, 3, 5)

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

We can also solve this problem using [backtracking](https://techiedelight.com/backtracking-interview-questions/), as shown below. Thanks to Tamara Vasylenko for suggesting this alternative approach.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to print all distinct triplets in an array with a sum
// less than or equal to a given number
void generateAllTriplets(vector<int> &input, int sum, int begin,
    vector<int> &comb, vector<vector<int>> &result)
{
    if (comb.size() == 3)
    {
        result.push_back(comb);
        return;
    }

    for (int i = begin; i < input.size() && input[i] <= sum; i++)
    {
        comb.push_back(input[i]);
        generateAllTriplets(input, sum - input[i], i + 1, comb, result);
        comb.pop_back();        // backtrack
    }
}

// Wrapper over `generateAllTriplets()` function
void printAllTriplets(vector<int> &input, int sum)
{
    // sort the input
    sort(input.begin(), input.end());
    vector<int> comb;

    // find all distinct triplets
    vector<vector<int>> result;
    generateAllTriplets(input, sum, 0, comb, result);

    // print all triplets
    for (vector<int> v: result) {
        cout << "(" << v[0] << ", " << v[1] << ", " << v[2] << ")\n";
    }
}

int main()
{
    int sum = 10;
    vector<int> input = { 2, 7, 4, 9, 5, 1, 3 };    // 1 2 3 4 5 7 9

    printAllTriplets(input, sum);

    return 0;
}
```

**Output:** (1, 2, 3) (1, 2, 4) (1, 2, 5) (1, 2, 7) (1, 3, 4) (1, 3, 5) (1, 4, 5) (2, 3, 4) (2, 3, 5)

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class Main
{
    // Function to print all distinct triplets in the array with a sum
    // less than or equal to a given number
    public static void generateAllTriplets(List<Integer> input, int sum, int begin,
                                    List<Integer> comb, List<List<Integer>> result)
    {
        if (comb.size() == 3)
        {
            result.add(new ArrayList<>(comb));
            return;
        }

        for (int i = begin; i < input.size() && input.get(i) <= sum; i++)
        {
            comb.add(input.get(i));
            generateAllTriplets(input, sum - input.get(i), i + 1, comb, result);
            comb.remove(comb.size() - 1);        // backtrack
        }
    }

    // Wrapper over `generateAllTriplets()` function
    public static void printAllTriplets(List<Integer> input, int sum)
    {
        // sort the input
        Collections.sort(input);
        List<Integer> comb = new ArrayList<>();

        // find all distinct triplets
        List<List<Integer>> result = new ArrayList<>();
        generateAllTriplets(input, sum, 0, comb, result);

        // print all triplets
        System.out.println(result);
    }

    public static void main(String[] args)
    {
        List<Integer> input = Arrays.asList(2, 7, 4, 9, 5, 1, 3);    // 1 2 3 4 5 7 9
        int sum = 10;

        printAllTriplets(input, sum);
    }
}
```

##

```python3
# Function to print all distinct triplets in the list with a sum
# less than or equal to a given number
def generateAllTriplets(input, total, triplets, comb=[], begin=0):
    if len(comb) == 3:
        triplets.append(comb.copy())
        return

    i = begin
    while i < len(input) and input[i] <= total:
        comb.append(input[i])
        generateAllTriplets(input, total - input[i], triplets, comb, i + 1)
        comb.pop()        # backtrack
        i = i + 1

# Wrapper over `generateAllTriplets()` function
def printAllTriplets(input, total):

    # sort the input
    input.sort()

    # find all distinct triplets
    triplets = []
    generateAllTriplets(input, total, triplets)

    print(triplets)

if __name__ == '__main__':

    input = [2, 7, 4, 9, 5, 1, 3]  # 1 2 3 4 5 7 9
    total = 10

    printAllTriplets(input, total)
```
