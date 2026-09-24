# Maximum Sum Subarray Problem (Kadane’s Algorithm)

> Source: https://www.techiedelight.com/maximum-subarray-problem-kadanes-algorithm/

Given an integer array, find a contiguous subarray within it that has the largest sum.

For example,

**Input:** {-2, 1, -3, 4, -1, 2, 1, -5, 4} **Output:** Subarray with the largest sum is {4, -1, 2, 1} with sum 6.

> 

The problem differs from the problem of finding the maximum sum subsequence. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

We can easily solve this problem in linear time using [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/). The idea is to maintain a maximum (positive-sum) subarray “ending” at each index of the given array. This subarray is either empty (in which case its sum is zero) or consists of one more element than the maximum subarray ending at the previous index.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find the maximum sum of a contiguous subarray
// in a given integer array
int kadane(vector<int> const &arr)
{
    // stores the maximum sum subarray found so far
    int max_so_far = 0;

    // stores the maximum sum of subarray ending at the current position
    int max_ending_here = 0;

    // traverse the given array
    for (int i = 0; i < arr.size(); i++)
    {
        // update the maximum sum of subarray "ending" at index 'i' (by adding the
        // current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + arr[i];

        // if the maximum sum is negative, set it to 0 (which represents
        // an empty subarray)
        max_ending_here = max(max_ending_here, 0);

        // update the result if the current subarray sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here);
    }

    return max_so_far;
}

int main()
{
    vector<int> arr = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };

    cout << "The maximum sum of a contiguous subarray is " << kadane(arr);

    return 0;
}
```

**Output:** The maximum sum of a contiguous subarray is 6

##

```java
class Main
{
    // Function to find the maximum sum of a contiguous subarray
    // in a given integer array
    public static int kadane(int[] arr)
    {
        // stores the maximum sum subarray found so far
        int maxSoFar = 0;

        // stores the maximum sum of subarray ending at the current position
        int maxEndingHere = 0;

        // traverse the given array
        for (int i: arr)
        {
            // update the maximum sum of subarray "ending" at index 'i' (by adding the
            // current element to maximum sum ending at previous index 'i-1')
            maxEndingHere = maxEndingHere + i;

            // if the maximum sum is negative, set it to 0 (which represents
            // an empty subarray)
            maxEndingHere = Integer.max(maxEndingHere, 0);

            // update the result if the current subarray sum is found to be greater
            maxSoFar = Integer.max(maxSoFar, maxEndingHere);
        }

        return maxSoFar;
    }

    public static void main(String[] args)
    {
        int[] arr = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };

        System.out.println("The sum of contiguous subarray with the " +
                            "largest sum is " + kadane(arr));
    }
}
```

##

```python3
# Function to find the maximum sum of a contiguous subarray
# in a given integer array
def kadane(arr):

    # stores the maximum sum sublist found so far
    max_so_far = 0

    # stores the maximum sum of sublist ending at the current position
    max_ending_here = 0

    # traverse the given list
    for i in arr:
        # update the maximum sum of sublist "ending" at index 'i' (by adding the
        # current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + i

        # if the maximum sum is negative, set it to 0 (which represents
        # an empty sublist)
        max_ending_here = max(max_ending_here, 0)

        # update the result if the current sublist sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

if __name__ == '__main__':

    arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

    print('The sum of contiguous sublist with the largest sum is',
        kadane(arr))
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

The above code doesn’t handle the case when all the array elements are negative. If the array contains all negative values, the answer is the maximum element. We can easily place this check before continuing to the algorithm. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find the maximum sum of a contiguous subarray
// in a given integer array
int kadane(vector<int> const &arr)
{
    // find the maximum element present in a given array
    int max_num = *max_element(arr.begin(), arr.end());

    // if the array contains all negative values, return the maximum element
    if (max_num < 0) {
        return max_num;
    }

    // stores the maximum sum subarray found so far
    int max_so_far = 0;

    // stores the maximum sum of subarray ending at the current position
    int max_ending_here = 0;

    // traverse the given array
    for (int i = 0; i < arr.size(); i++)
    {
        // update the maximum sum of subarray "ending" at index 'i' (by adding the
        // current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + arr[i];

        // if the maximum sum is negative, set it to 0 (which represents
        // an empty subarray)
        max_ending_here = max(max_ending_here, 0);

        // update the result if the current subarray sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here);
    }

    return max_so_far;
}

int main()
{
    vector<int> arr = { -8, -3, -6, -2, -5, -4 };

    cout << "The maximum sum of a contiguous subarray is " << kadane(arr);

    return 0;
}
```

**Output:** The maximum sum of a contiguous subarray is -2

##

```java
import java.util.Arrays;

class Main
{
    // Function to find the maximum sum of a contiguous subarray
    // in a given integer array
    public static int kadane(int[] arr)
    {
        // find the maximum element present in a given array
        int max = Arrays.stream(arr).max().getAsInt();

        // if the array contains all negative values, return the maximum element
        if (max < 0) {
            return max;
        }

        // stores the maximum sum subarray found so far
        int maxSoFar = 0;

        // stores the maximum sum of subarray ending at the current position
        int maxEndingHere = 0;

        // do for each element of the given array
        for (int i: arr)
        {
            // update the maximum sum of subarray "ending" at index 'i' (by adding the
            // current element to maximum sum ending at previous index 'i-1')
            maxEndingHere = maxEndingHere + i;

            // if the maximum sum is negative, set it to 0 (which represents
            // an empty subarray)
            maxEndingHere = Integer.max(maxEndingHere, 0);

            // update the result if the current subarray sum is found to be greater
            maxSoFar = Integer.max(maxSoFar, maxEndingHere);
        }

        return maxSoFar;
    }

    public static void main(String[] args)
    {
        int[] arr = { -8, -3, -6, -2, -5, -4 };

        System.out.println("The sum of contiguous subarray with the " +
                        "largest sum is " +    kadane(arr));
    }
}
```

##

```python3
# Function to find the maximum sum of a contiguous subarray
# in a given integer array
def kadane(arr):

    # find the maximum element present in a given list
    maximum = max(arr)

    # if the list contains all negative values, return the maximum element
    if maximum < 0:
        return maximum

    # stores the maximum sum sublist found so far
    max_so_far = 0

    # stores the maximum sum of sublist ending at the current position
    max_ending_here = 0

    # do for each element of a given list
    for i in arr:

        # update the maximum sum of sublist "ending" at index 'i' (by adding the
        # current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + i

        # if the maximum sum is negative, set it to 0 (which represents
        # an empty sublist)
        max_ending_here = max(max_ending_here, 0)

        # update the result if the current sublist sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

if __name__ == '__main__':

    arr = [-8, -3, -6, -2, -5, -4]
    print('The sum of contiguous sublist with the largest sum is', kadane(arr))
```

This approach requires two traversals of the input array. We can easily modify the main algorithm to handle negative integers as well. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Function to find the maximum sum of a contiguous subarray
// in a given integer array (handles negative numbers as well)
int kadaneNeg(vector<int> const &arr)
{
    // stores the maximum sum subarray found so far
    int max_so_far = INT_MIN;

    // stores the maximum sum of subarray ending at the current position
    int max_ending_here = 0;

    // traverse the given array
    for (int i = 1; i < arr.size(); i++)
    {
        // update the maximum sum of subarray "ending" at index 'i' (by adding the
        // current element to maximum sum ending at previous index 'i-1')
        max_ending_here = max_ending_here + arr[i];

        // maximum sum should be more than the current element
        max_ending_here = max(max_ending_here, arr[i]);

        // update the result if the current subarray sum is found to be greater
        max_so_far = max(max_so_far, max_ending_here);
    }

    return max_so_far;
}

int main()
{
    vector<int> arr = { -8, -3, -6, -2, -5, -4 };

    cout << "The maximum sum of a contiguous subarray is " << kadaneNeg(arr);

    return 0;
}
```

**Output:** The maximum sum of a contiguous subarray is -2
