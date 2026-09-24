# Find the minimum and maximum element in an array using minimum comparisons

> Source: https://www.techiedelight.com/find-minimum-maximum-element-array-using-minimum-comparisons/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find out the minimum and maximum element present using minimum comparisons.

For example,

**Input:** nums[] = [5, 7, 2, 4, 9, 6] **Output:** The minimum array element is 2 The maximum array element is 9

> 

A naive solution is to compare each array element for minimum and maximum elements by considering a single item at a time. The time complexity of this solution would be linear. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Naive solution to find the minimum and maximum number in an array
void findMinAndMax(vector<int> const &nums, int &min, int &max)
{
    // initialize minimum and maximum element with the first element
    max = nums[0], min = nums[0];

    // do for each array element
    for (int i = 1; i < nums.size(); i++)
    {
        // if the current element is greater than the maximum found so far
        if (nums[i] > max) {
            max = nums[i];
        }

        // if the current element is smaller than the minimum found so far
        else if (nums[i] < min) {
            min = nums[i];
        }
    }
}

int main()
{
    vector<int> nums = { 5, 7, 2, 4, 9, 6 };

    // to store minimum and maximum element, respectively
    int min, max;

    findMinAndMax(nums, min, max);

    cout << "The minimum array element is " << min << endl;
    cout << "The maximum array element is " << max << endl;

    return 0;
}
```

##

```java
class Main
{
    // Naive solution to find the minimum and maximum number in an array
    public static void findMinAndMax(int[] nums)
    {
        // initialize minimum and maximum element with the first element
        int max = nums[0];
        int min = nums[0];

        // do for each array element
        for (int i = 1; i < nums.length; i++)
        {
            // if the current element is greater than the maximum found so far
            if (nums[i] > max) {
                max = nums[i];
            }

            // if the current element is smaller than the minimum found so far
            else if (nums[i] < min) {
                min = nums[i];
            }
        }

        System.out.println("The minimum array element is " + min);
        System.out.println("The maximum array element is " + max);
    }

    public static void main(String[] args)
    {
        int[] nums = { 5, 7, 2, 4, 9, 6 };

        // find the minimum and maximum element, respectively
        findMinAndMax(nums);
    }
}
```

##

```python3
# Naive solution to find the minimum and maximum number in a list
def findMinAndMax(nums):

    # initialize minimum and maximum element with the first element
    max = min = nums[0]

    # do for each element in the list
    for i in range(1, len(nums)):

        # if the current element is greater than the maximum found so far
        if nums[i] > max:
            max = nums[i]

        # if the current element is smaller than the minimum found so far
        elif nums[i] < min:
            min = nums[i]

    print('The minimum element in the list is', min)
    print('The maximum element in the list is', max)

if __name__ == '__main__':

    nums = [5, 7, 2, 4, 9, 6]

    # find the minimum and maximum element, respectively
    findMinAndMax(nums)
```

**Output:** The minimum array element is 2 The maximum array element is 9

Performance:

The above solution does `2×(n-1)` comparisons in the best case and `3×(n-1)` comparisons in the worst case. The worst case happens when all array elements are equal or are sorted in descending order. The best case happens when the input is sorted in ascending order. (Note that we have also considered `n-1` comparisons done by for-loop).

Can we do better?

We can improve comparisons done by the above solution by considering elements in pairs. One particular case we need to handle separately when the array has an odd number of items. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <climits>
#include <vector>
using namespace std;

// Optimized solution to find the minimum and maximum number in an array
void findMinAndMax(vector<int> const &nums, int &min, int &max)
{
    // initialize minimum element by INFINITY and the maximum element by -INFINITY
    max = INT_MIN, min = INT_MAX;

    int n = nums.size();

    // if the array has an odd number of elements, ignore the last
    // element and consider it later
    bool odd = n & 1;
    if (odd) {
        n--;    // comparison
    }

    // compare elements in pairs, i.e., nums[i] and nums[i+1]
    for (int i = 0; i < n; i = i + 2)
    {
        int maximum, minimum;

        // find the maximum and minimum among nums[i] and nums[i+1]

        if (nums[i] > nums[i + 1]) {  // 1st comparison
            minimum = nums[i + 1],
            maximum = nums[i];
        }
        else {
            minimum = nums[i],
            maximum = nums[i + 1];
        }

        // update max
        if (maximum > max) {        // 2nd comparison
            max = maximum;
        }

        // update min
        if (minimum < min) {        // 3rd comparison
            min = minimum;
        }
    }

    // handle the last element if the array has an odd number of elements

    if (odd)                        // comparison
    {
        if (nums[n] > max) {         // extra comparison for an odd element
            max = nums[n];
        }

        if (nums[n] < min) {         // extra comparison for an odd element
            min = nums[n];
        }
    }
}

int main()
{
    vector<int> nums = { 4, 7, 5, 1, 3 };

    // to store minimum and maximum element, respectively
    int min, max;

    findMinAndMax(nums, min, max);

    cout << "The minimum array element is " << min << endl;
    cout << "The maximum array element is " << max << endl;

    return 0;
}
```

##

```java
class Main
{
    // Optimized solution to find the minimum and maximum number in an array
    public static void findMinAndMax(int[] nums)
    {
        // initialize minimum element by INFINITY and the maximum element by -INFINITY
        int max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;

        int n = nums.length;

        // if the array has an odd number of elements, ignore the last
        // element and consider it later
        boolean odd = (n & 1) == 1;
        if (odd) { n--; }

        // compare elements in pairs, i.e., nums[i] and nums[i+1]
        for (int i = 0; i < n; i = i + 2)
        {
            int maximum, minimum;

            // find the maximum and minimum among nums[i] and nums[i+1]

            if (nums[i] > nums[i + 1]) {      // 1st comparison
                minimum = nums[i + 1];
                maximum = nums[i];
            }
            else {
                minimum = nums[i];
                maximum = nums[i + 1];
            }

            // update max
            if (maximum > max) {        // 2nd comparison
                max = maximum;
            }

            // update min
            if (minimum < min) {        // 3rd comparison
                min = minimum;
            }
        }

        // handle the last element if the array has an odd number of elements
        if (odd)
        {
            if (nums[n] > max) {
                max = nums[n];
            }

            if (nums[n] < min) {
                min = nums[n];
            }
        }

        System.out.println("The minimum array element is " + min);
        System.out.println("The maximum array element is " + max);
    }

    public static void main(String[] args)
    {
        int[] nums = { 4, 7, 5, 1, 3 };

        findMinAndMax(nums);
    }
}
```

##

```python3
import sys

# Optimized solution to find the minimum and maximum number in a list
def findMinAndMax(nums):

    n = len(nums)

    # initialize minimum element by INFINITY and the maximum element by -INFINITY
    max = -sys.maxsize
    min = sys.maxsize

    # if the list has an odd number of elements, ignore the last
    # element and consider it later
    if n & 1:
        n = n - 1

    # compare elements in pairs, i.e., nums[i] and nums[i+1]
    for i in range(0, n, 2):

        # find maximum and minimum among nums[i] and nums[i+1]

        if nums[i] > nums[i + 1]:     # 1st comparison
            minimum = nums[i + 1]
            maximum = nums[i]
        else:
            minimum = nums[i]
            maximum = nums[i + 1]

        # update max
        if maximum > max:       # 2nd comparison
            max = maximum

        # update min
        if minimum < min:       # 3rd comparison
            min = minimum

    # handle the last element if the list has an odd number of elements
    if len(nums) & 1:
        if nums[n] > max: max = nums[n]
        if nums[n] < min: min = nums[n]

    print('The minimum element in the list is', min)
    print('The maximum element in the list is', max)

if __name__ == '__main__':

    nums = [4, 7, 5, 1, 3]
    findMinAndMax(nums)
```

**Output:** The minimum array element is 1 The maximum array element is 7

Performance:

If the array has an even number of elements `n`, then the above solution does `n/2 + 3n/2 + 2` comparisons in both best and worst-case. (Note that we have also considered `n/2` comparisons done by for-loop).

If the array has an odd number of elements `n`, then the above solution does `(n-1)/2 + 3(n-1)/2 + 4` comparisons in both best and worst-case. (We have also considered `(n-1)/2` comparisons done by for-loop).
