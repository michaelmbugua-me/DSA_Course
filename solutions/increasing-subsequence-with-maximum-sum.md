# Maximum Sum Increasing Subsequence Problem

> Source: https://www.techiedelight.com/increasing-subsequence-with-maximum-sum/

Find a subsequence of a given sequence such that the subsequence sum is as high as possible and the subsequence’s elements are sorted in ascending order. This subsequence is not necessarily contiguous or unique.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example, consider subsequence `{0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11}`. The maximum sum increasing subsequence is `{8, 12, 14}` which has sum 34.

> 

The Maximum Sum Increasing Subsequence (MSIS) problem is a standard variation of the [Longest Increasing Subsequence (LIS)](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/) problem. The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For each item, there are two possibilities:

  1. Include the current item in MSIS if it is greater than the previous element in MSIS and recur for the remaining items.
  2. Exclude the current item from MSIS and recur for the remaining items.

Finally, return the maximum sum we get by including or excluding the current item. The base case of the recursion would be when no items are left. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Function to find the maximum sum of an increasing subsequence
int MSIS(vector<int> const &nums, int i, int prev, int sum)
{
    // base case: nothing is remaining
    if (i == nums.size()) {
        return sum;
    }

    // case 1: exclude the current element and process the
    // remaining elements
    int excl = MSIS(nums, i + 1, prev, sum);

    // case 2: include the current element if it is greater
    // than the previous element
    int incl = sum;
    if (nums[i] > prev) {
        incl = MSIS(nums, i + 1, nums[i], sum + nums[i]);
    }

    // return the maximum of the above two choices
    return max(incl, excl);
}

int main()
{
    vector<int> nums = { 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11 };

    cout << "The maximum sum of increasing subsequence is " <<
            MSIS(nums, 0, INT_MIN, 0);

    return 0;
}
```

**Output:** The maximum sum of the increasing subsequence is 34

##

```java
class Main
{
    // Function to find the maximum sum of an increasing subsequence
    public static int MSIS(int[] nums, int i, int prev, int sum)
    {
        // base case: nothing is remaining
        if (i == nums.length) {
            return sum;
        }

        // case 1: exclude the current element and process the
        // remaining elements
        int excl = MSIS(nums, i + 1, prev, sum);

        // case 2: include the current element if it is greater
        // than the previous element
        int incl = sum;
        if (nums[i] > prev) {
            incl = MSIS(nums, i + 1, nums[i], sum + nums[i]);
        }

        // return the maximum of the above two choices
        return Integer.max(incl, excl);
    }

    public static void main(String[] args)
    {
        int[] nums = { 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11 };

        System.out.println("The maximum sum of the increasing subsequence is " +
                        MSIS(nums, 0, Integer.MIN_VALUE, 0));
    }
}
```

##

```python3
import sys

# Function to find the maximum sum of increasing subsequence
def MSIS(nums, i=0, prev=-sys.maxsize, total=0):

    # base case: nothing is remaining
    if i == len(nums):
        return total

    # case 1: exclude the current element and process the
    # remaining elements
    excl = MSIS(nums, i + 1, prev, total)

    # case 2: include the current element if it is greater
    # than the previous element
    incl = total
    if nums[i] > prev:
        incl = MSIS(nums, i + 1, nums[i], total + nums[i])

    # return the maximum of the above two choices
    return max(incl, excl)

if __name__ == '__main__':

    nums = [8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11]
    print('The maximum sum of the increasing subsequence is', MSIS(nums))
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed.

We know that problems with optimal substructure and overlapping subproblems can be solved using [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/), in which subproblem solutions are _memo_ ized rather than repeatedly computed. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `sum[i]`, for each `0 <= i < n`, which stores the maximum sum of an increasing subsequence of subarray `nums[0…i]` that ends with `nums[i]`. To calculate the `sum[i]`, consider MSIS of all smaller values of `i` (say `j`) already computed and pick maximum `sum[j]`, where `nums[j]` is less than the current element `nums[i]` and add current element `nums[i]` to it. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

// Iterative function to find the maximum sum of an increasing subsequence
int MSIS(vector<int> const &nums)
{
    // base case
    if (nums.size() == 0) {
        return 0;
    }

    // array to store subproblem solutions. `sum[i]` stores the maximum
    // sum of the increasing subsequence that ends with `nums[i]`
    vector<int> sum(nums.size());

    // base case
    sum[0] = nums[0];

    // start from the second array element
    for (int i = 1; i < nums.size(); i++)
    {
        // do for each element in subarray `nums[0…i-1]`
        for (int j = 0; j < i; j++)
        {
            // find increasing subsequence with the maximum sum that ends with
            // `nums[j]`, where `nums[j]` is less than the current element `nums[i]`

            if (sum[i] < sum[j] && nums[i] > nums[j]) {
                sum[i] = sum[j];
            }
        }

        // include `nums[i]` in MSIS
        sum[i] += nums[i];
    }

    // find increasing subsequence with the maximum sum
    int msis = INT_MIN;
    for (int x: sum) {
        msis = max(msis, x);
    }

    return msis;
}

int main()
{
    vector<int> nums = { 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11 };

    cout << "The maximum sum of increasing subsequence is " << MSIS(nums);

    return 0;
}
```

**Output:** The maximum sum of the increasing subsequence is 34

##

```java
import java.util.Arrays;

class Main
{
    // Iterative function to find the maximum sum of an increasing subsequence
    public static int MSIS(int[] nums)
    {
        // base case
        if (nums.length == 0) {
            return 0;
        }

        // array to store subproblem solutions. `sum[i]` stores the maximum
        // sum of the increasing subsequence that ends with `nums[i]`
        int[] sum = new int[nums.length];

        // base case
        sum[0] = nums[0];

        // start from the second array element
        for (int i = 1; i < nums.length; i++)
        {
            // do for each element in subarray `nums[0…i-1]`
            for (int j = 0; j < i; j++)
            {
                // find increasing subsequence with max sum that ends with `nums[j]`,
                // where `nums[j]` is less than the current element `nums[i]`

                if (sum[i] < sum[j] && nums[i] > nums[j]) {
                    sum[i] = sum[j];
                }
            }

            // include `nums[i]` in MSIS
            sum[i] += nums[i];
        }

        // find increasing subsequence with the maximum sum
        return Arrays.stream(sum).max().getAsInt();
    }

    public static void main(String[] args)
    {
        int[] nums = { 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11 };

        System.out.println("The maximum sum of the increasing subsequence is " +
                        MSIS(nums));
    }
}
```

##

```python3
# Iterative function to find the maximum sum of an increasing subsequence
def MSIS(nums):

    # base case
    if len(nums) == 0:
        return 0

    # list to store subproblem solutions. `sum[i]` stores the maximum
    # sum of the increasing subsequence that ends with `nums[i]`
    total = [0] * len(nums)

    # base case
    total[0] = nums[0]

    # start from the second element in the list
    for i in range(1, len(nums)):

        # do for each element in sublist `nums[0…i-1]`
        for j in range(i):

            # find increasing subsequence with the maximum sum that ends with
            # `nums[j]`, where `nums[j]` is less than the current element `nums[i]`
            if total[i] < total[j] and nums[i] > nums[j]:
                total[i] = total[j]

        # include `nums[i]` in MSIS
        total[i] += nums[i]

    # find increasing subsequence with the maximum sum
    return max(total)

if __name__ == '__main__':

    nums = [8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11]

    print('The maximum sum of the increasing subsequence is', MSIS(nums))
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the given sequence.

How to print MSIS?

The above-discussed methods only print the sum of MSIS but do not actually print MSIS itself. To print the MSIS, we actually have to store the maximum sum increasing subsequence in the lookup table along with storing the maximum sum.

For example, consider `nums = [ 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11 ]`. The maximum sum increasing subsequence `MSIS[i]` of subarray `nums[0…i]` that ends with `nums[i]` are:

MSIS[0] — 8 MSIS[1] — 4 MSIS[2] — 8 12 MSIS[3] — 2 MSIS[4] — 8 10 MSIS[5] — 4 6 **MSIS[6] — 8 12 14** MSIS[7] — 1 MSIS[8] — 4 6 9 MSIS[9] — 4 5 MSIS[10] — 8 12 13 MSIS[11] — 2 3 MSIS[12] — 4 6 9 11

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Iterative function to print increasing subsequence with the maximum sum
void printMSIS(vector<int> const &nums)
{
    int n = nums.size();

    // base case
    if (n == 0) {
        return;
    }

    // `MSIS[i]` stores the increasing subsequence having the maximum sum
    // that ends with `nums[i]`
    vector<int> MSIS[n];
    MSIS[0].push_back(nums[0]);

    // `sum[i]` stores the maximum sum of the increasing subsequence
    // that ends with `nums[i]`
    vector<int> sum(n);
    sum[0] = nums[0];

    // start from the second array element
    for (int i = 1; i < n; i++)
    {
        // do for each element in subarray `nums[0…i-1]`
        for (int j = 0; j < i; j++)
        {
            // find increasing subsequence with the maximum sum that ends with
            // `nums[j]`, where `nums[j]` is less than the current element `nums[i]`

            if (sum[i] < sum[j] && nums[i] > nums[j])
            {
                MSIS[i] = MSIS[j];      // update increasing subsequence
                sum[i] = sum[j];        // update maximum sum
            }
        }

        // include the current element in increasing subsequence
        MSIS[i].push_back(nums[i]);

        // add the current element to the maximum sum
        sum[i] += nums[i];
    }

    // uncomment the following code to print contents of `MSIS`
    /* for (int i = 0; i < n; i++)
    {
        cout << "MSIS[" << i << "] — ";
        for (int j: MSIS[i]) {
            cout << j << " ";
        }
        cout << endl;
    } */

    // `j` will contain the index of MSIS
    int j = 0;
    for (int i = 1; i < n; i++)
    {
        if (sum[i] > sum[j]) {
            j = i;
        }
    }

    // print MSIS
    for (int i: MSIS[j]) {
        cout << i << " ";
    }
}

int main()
{
    vector<int> nums = { 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11 };

    printMSIS(nums);

    return 0;
}
```

**Output:** 8 12 14
