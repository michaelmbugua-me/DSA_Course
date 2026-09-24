# Longest Bitonic Subsequence

> Source: https://www.techiedelight.com/longest-bitonic-subsequence/

The longest bitonic subsequence problem is to find a subsequence of a given sequence in which the subsequence’s elements are first sorted in increasing order, then in decreasing order, and the subsequence is as long as possible.

For example, the longest bitonic subsequence of a sequence `[4, 2, 5, 9, 7, 6, 10, 3, 1]` is `[4, 5, 9, 7, 6, 3, 1]`.

For sequences sorted in increasing or decreasing order, the output is the same as the input sequence, i.e.,

[1, 2, 3, 4, 5] ——> [1, 2, 3, 4, 5] [5, 4, 3, 2, 1] ——> [5, 4, 3, 2, 1]

The problem differs from the problem of finding the [longest bitonic subarray](https://techiedelight.com/find-longest-bitonic-subarray-array/). Unlike subarrays, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original array.

> 

The idea is to maintain two arrays, `I[]` and `D[]`:

  * `I[i]` store the length of the [longest increasing subsequence](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/), ending at `nums[i]`.
  * `D[i]` stores the length of the [longest decreasing subsequence](https://techiedelight.com/longest-decreasing-subsequence), starting from `nums[i]`.

Finally, the length of longest bitonic subsequence is maximum among all `I[i] + D[i] - 1`. For example, consider the sequence `[4, 2, 5, 9, 7, 6, 10, 3, 1]`. The contents of the LIS and LDS array are:

| I[i] | D[i] | (i = 0) | 1 | 3 | (i = 1) | 1 | 2 | (i = 2) | 2 | 3 |**(i = 3) | 3 | 5 |** (i = 4) | 3 | 4 | (i = 5) | 3 | 3 | (i = 6) | 4 | 3 | (i = 7) | 2 | 3 | (i = 8) | 1 | 1 |

The longest bitonic subsequence length is 7 `[4, 5, 9, 7, 6, 3, 1]`. The longest bitonic subsequence is formed by `I[3] + D[3] - 1`.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the longest bitonic subsequence in an array
int calculateLBS(vector<int> const &nums)
{
    int n = nums.size();

    // base case
    if (n == 0) {
        return 0;
    }

    // `I[i]` store the length of the longest increasing subsequence,
    // ending at `nums[i]`
    vector<int> I(n);

    // `D[i]` stores the length of the longest decreasing subsequence,
    // starting with `nums[i]`
    vector<int> D(n);

    I[0] = 1;
    for (int i = 1; i < n; i++)
    {
        for (int j = 0; j < i; j++)
        {
            if (nums[j] < nums[i] && I[j] > I[i]) {
                I[i] = I[j];
            }
        }
        I[i]++;
    }

    D[n - 1] = 1;
    for (int i = n - 2; i >= 0; i--)
    {
        for (int j = n - 1; j > i; j--)
        {
            if (nums[j] < nums[i] && D[j] > D[i]) {
                D[i] = D[j];
            }
        }
        D[i]++;
    }

    // consider each element as a peak and calculate LBS
    int lbs = 1;
    for (int i = 0; i < n; i++) {
        lbs = max(lbs, I[i] + D[i] - 1);
    }

    return lbs;
}

int main()
{
    vector<int> nums = { 4, 2, 5, 9, 7, 6, 10, 3, 1 };

    cout << "The length of the longest bitonic subsequence is " <<
            calculateLBS(nums);

    return 0;
}
```

**Output:** The length of the longest bitonic subsequence is 7

##

```java
class Main
{
    // Function to find the longest bitonic subsequence in an array
    public static int calculateLBS(int[] nums)
    {
        int n = nums.length;

        // base case
        if (n == 0) {
            return 0;
        }

        // `I[i]` store the length of the longest increasing subsequence,
        // ending at `nums[i]`
        int[] I = new int[n];

        // `D[i]` stores the length of the longest decreasing subsequence,
        // starting with `nums[i]`
        int[] D = new int[n];

        I[0] = 1;
        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (nums[j] < nums[i] && I[j] > I[i]) {
                    I[i] = I[j];
                }
            }
            I[i]++;
        }

        D[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--)
        {
            for (int j = n - 1; j > i; j--)
            {
                if (nums[j] < nums[i] && D[j] > D[i]) {
                    D[i] = D[j];
                }
            }
            D[i]++;
        }

        // consider each element as a peak and calculate LBS
        int lbs = 1;
        for (int i = 0; i < n; i++) {
            lbs = Integer.max(lbs, I[i] + D[i] - 1);
        }

        return lbs;
    }

    public static void main(String[] args)
    {
        int[] nums = { 4, 2, 5, 9, 7, 6, 10, 3, 1 };

        System.out.print("The length of the longest bitonic subsequence is " +
                calculateLBS(nums));
    }
}
```

##

```python3
# Function to find the longest bitonic subsequence in a list
def calculateLBS(nums):

    n = len(nums)

    # base case
    if n == 0:
        return 0

    # `I[i]` store the length of the longest increasing subsequence,
    # ending at `nums[i]`
    I = [0] * n

    # `D[i]` stores the length of the longest decreasing subsequence,
    # starting with `nums[i]`
    D = [0] * n

    I[0] = 1
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i] and I[j] > I[i]:
                I[i] = I[j]
        I[i] = I[i] + 1

    D[n - 1] = 1
    for i in reversed(range(n - 1)):
        for j in reversed(range(i + 1, n)):
            if nums[j] < nums[i] and D[j] > D[i]:
                D[i] = D[j]
        D[i] = D[i] + 1

    # consider each element as a peak and calculate LBS
    lbs = 1
    for i in range(n):
        lbs = max(lbs, I[i] + D[i] - 1)

    return lbs

if __name__ == '__main__':

    nums = [4, 2, 5, 9, 7, 6, 10, 3, 1]
    print('The length of the longest bitonic subsequence is', calculateLBS(nums))
```

How to print LBS?

The idea remains the same, except instead of storing the length of the LIS and LDS, we store LIS and LDS itself. For example, consider the sequence `[4, 2, 5, 9, 7, 6, 10, 3, 1]`. The contents of the LIS and LDS list are:

| I[i] | D[i] (i = 0) | 4 | 4 3 1 (i = 1) | 2 | 2 1 (i = 2) | 4 5 | 5 3 1**(i = 3) | 4 5 9 | 9 7 6 3 1** (i = 4) | 4 5 7 | 7 6 3 1 (i = 5) | 4 5 6 | 6 3 1 (i = 6) | 4 5 9 10 | 10 3 1 (i = 7) | 2 3 | 3 1 (i = 8) | 1 | 1

The longest bitonic subsequence is `[4, 5, 9, 7, 6, 3, 1]` and is formed by `I[3] + D[3]`. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

// Function to find the longest bitonic subsequence in an array
void LBS(vector<int> const &nums)
{
    int n = nums.size();

    // base case
    if (n == 0) {
        return;
    }

    // `I[i]` store the longest increasing subsequence, ending at `nums[i]`
    list<int> I[n];
    I[0].push_back(nums[0]);

    for (int i = 1; i < n; i++)
    {
        for (int j = 0; j < i; j++)
        {
            if (I[i].size() < I[j].size() && nums[i] > nums[j]) {
                I[i] = I[j];
            }
        }
        I[i].push_back(nums[i]);
    }

    // `D[i]` stores the longest decreasing subsequence, starting from `nums[i]`
    list<int> D[n];
    D[n - 1].push_front(nums[n - 1]);

    for (int i = n - 2; i >= 0; i--)
    {
        for (int j = n - 1; j > i; j--)
        {
            if (D[i].size() < D[j].size() && nums[i] > nums[j]) {
                D[i] = D[j];
            }
        }
        D[i].push_front(nums[i]);
    }

    // uncomment the following code to print contents of vector LIS and LDS
    /* for (int i = 0; i < n; i++)
    {
        cout << "LIS[" << i << "] — ";
        for (int j: I[i]) {
            cout << j << " ";
        }

        cout << "\t\tLDS[" << i << "] — ";
        for (int j: D[i]) {
            cout << j << " ";
        }
        cout << endl;
    } */

    // find the peak element index
    int peak = 0;
    for (int i = 1; i < n; i++)
    {
        if ((I[i].size() + D[i].size()) > (I[peak].size() + D[peak].size())) {
            peak = i;
        }
    }

    cout << "The longest bitonic subsequence is ";

    // print longest increasing subsequence ending at peak element
    for (int i: I[peak]) {
        cout << i << " ";
    }

    // pop the front element of LDS as it points to the same element as the rear of LIS
    D[peak].pop_front();

    // print longest decreasing subsequence starting from the peak element
    for (int i: D[peak]) {
        cout << i << " ";
    }
}

int main()
{
    vector<int> nums = { 4, 2, 5, 9, 7, 6, 10, 3, 1 };

    LBS(nums);

    return 0;
}
```

**Output:** The longest bitonic subsequence is 4 5 9 7 6 3 1

##

```java
import java.util.ArrayList;
import java.util.List;

class Main
{
    // Function to find the longest bitonic subsequence in an array
    public static void LBS(int[] nums)
    {
        int n = nums.length;

        // base case
        if (n == 0) {
            return;
        }

        // `I[i]` stores the longest increasing subsequence, ending at `nums[i]`
        List<List<Integer>> I = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            I.add(new ArrayList<>());
        }

        I.get(0).add(nums[0]);

        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (I.get(i).size() < I.get(j).size() && nums[i] > nums[j]) {
                    I.set(i, new ArrayList<>(I.get(j)));
                }
            }
            I.get(i).add(nums[i]);
        }

        // `D[i]` stores the longest decreasing subsequence, starting from `nums[i]`
        List<List<Integer>> D = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            D.add(new ArrayList<>());
        }
        D.get(n - 1).add(0, nums[n - 1]);

        for (int i = n - 2; i >= 0; i--)
        {
            for (int j = n - 1; j > i; j--)
            {
                if (D.get(i).size() < D.get(j).size() && nums[i] > nums[j]) {
                    D.set(i, new ArrayList<>(D.get(j)));
                }
            }
            D.get(i).add(0, nums[i]);
        }

        // find the peak element index
        int peak = 0;
        for (int i = 1; i < n; i++)
        {
            if ((I.get(i).size() + D.get(i).size()) >
                    (I.get(peak).size() + D.get(peak).size())) {
                peak = i;
            }
        }

        System.out.print("The longest bitonic subsequence is ");

        // print longest increasing subsequence ending at peak element
        System.out.print(I.get(peak));

        // pop the front element of LDS as it points to the same element as the
        // rear of LIS
        D.get(peak).remove(0);

        // print longest decreasing subsequence starting from the peak element
        System.out.println(D.get(peak));
    }

    public static void main(String[] args)
    {
        int[] nums = { 4, 2, 5, 9, 7, 6, 10, 3, 1 };
        LBS(nums);
    }
}
```

##

```python3
# Function to find the longest bitonic subsequence in a list
def LBS(nums):

    n = len(nums)

    # base case
    if n == 0:
        return

    # `I[i]` store the longest increasing subsequence, ending at `nums[i]`
    I = [[] for _ in range(n)]
    I[0].append(nums[0])

    for i in range(1, n):
        for j in range(i):
            if len(I[i]) < len(I[j]) and nums[i] > nums[j]:
                I[i] = I[j].copy()
        I[i].append(nums[i])

    # `D[i]` stores the longest decreasing subsequence, starting from `nums[i]`
    D = [[] for _ in range(n)]
    D[n - 1].insert(0, nums[n - 1])

    for i in reversed(range(n - 1)):
        for j in reversed(range(i + 1, n)):
            if len(D[i]) < len(D[j]) and nums[i] > nums[j]:
                D[i] = D[j].copy()
        D[i].insert(0, nums[i])

    # find the peak element index
    peak = 0
    for i in range(1, n):
        if len(I[i]) + len(D[i]) > len(I[peak]) + len(D[peak]):
            peak = i

    print('The longest bitonic subsequence is ', end='')

    # print longest increasing subsequence ending at peak element
    print(I[peak], end='')

    # pop the front element of LDS as it points to the same element as the rear of LIS
    D[peak].pop(0)

    # print longest decreasing subsequence starting from the peak element
    print(D[peak])

if __name__ == '__main__':

    nums = [4, 2, 5, 9, 7, 6, 10, 3, 1]
    LBS(nums)
```

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the size of the given sequence.
