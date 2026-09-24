# Trapping Rain Water Problem

> Source: https://www.techiedelight.com/trapping-rain-water-within-given-set-bars/

[Array](https://www.techiedelight.com/Category/Array/)

Trapping rainwater problem: Find the maximum amount of water that can be trapped within a given set of bars where each bar’s width is 1 unit.

For example,

Input: An array containing height of bars `{7, 0, 4, 2, 5, 0, 6, 4, 0, 5}`

The maximum amount of water that can be trapped is 25, as shown below (blue).

> 

The idea is to calculate the maximum height bar on the left and right of every bar. The amount of water stored on top of each bar is equal to the minimum among the leading’ bar to the left and right minus the current bar’s height. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <limits.h>

int max(int x, int y) {
    return (x > y) ? x : y;
}

int min(int x, int y) {
    return (x < y) ? x : y;
}

// Function to find the amount of water that can be trapped within
// a given set of bars in linear time and extra space
int trap(int bars[], int n)
{
    // base case
    if (n <= 2) {
        return 0;
    }

    int water = 0;

    // `left[i]` stores the maximum height of a bar to the left
    // of the current bar
    int left[n-1];
    left[0] = INT_MIN;

    // process bars from left to right
    for (int i = 1; i < n - 1; i++) {
        left[i] = max(left[i-1], bars[i-1]);
    }

    /*
    int right[n];
    right[n - 1] = INT_MIN;
    for (int i = n - 2; i >= 0; i--) {
        right[i] = max(right[i+1], bars[i+1]);
    }

    for (int i = 1; i < n - 1; i++)
    {
        if (min(left[i], right[i]) > bars[i]) {
            water += min(left[i], right[i]) - bars[i];
        }
    }
    */

    // `right` stores the maximum height of a bar to the right
    // of the current bar
    int right = INT_MIN;

    // process bars from right to left
    for (int i = n - 2; i >= 1; i--)
    {
        right = max(right, bars[i+1]);

        // check if it is possible to store water in the current bar
        if (min(left[i], right) > bars[i]) {
            water += min(left[i], right) - bars[i];
        }
    }

    return water;
}

int main(void)
{
    int heights[] = { 7, 0, 4, 2, 5, 0, 6, 4, 0, 5 };
    int n = sizeof(heights) / sizeof(heights[0]);

    printf("The maximum amount of water that can be trapped is %d",
            trap(heights, n));

    return 0;
}
```

**Output:** The maximum amount of water that can be trapped is 25

##

```java
class Main
{
    // Function to find the amount of water that can be trapped within
    // a given set of bars in linear time and extra space
    public static int trap(int[] bars)
    {
        int n = bars.length;

        // base case
        if (n <= 2) {
            return 0;
        }

        int water = 0;

        // `left[i]` stores the maximum height of a bar to the left
        // of the current bar
        int[] left = new int[n-1];
        left[0] = Integer.MIN_VALUE;

        // process bars from left to right
        for (int i = 1; i < n - 1; i++) {
            left[i] = Integer.max(left[i - 1], bars[i - 1]);
        }

        /*
        int[] right = new int[n];
        right[n - 1] = Integer.MIN_VALUE;
        for (int i = n - 2; i >= 0; i--) {
            right[i] = Integer.max(right[i + 1], bars[i + 1]);
        }

        for (int i = 1; i < n - 1; i++)
        {
            if (Integer.min(left[i], right[i]) > bars[i]) {
                water += Integer.min(left[i], right[i]) - bars[i];
            }
        }
        */

        // `right` stores the maximum height of a bar to the right
        // of the current bar
        int right = Integer.MIN_VALUE;

        // process bars from right to left
        for (int i = n - 2; i >= 1; i--)
        {
            right = Integer.max(right, bars[i + 1]);

            // check if it is possible to store water in the current bar
            if (Integer.min(left[i], right) > bars[i]) {
                water += Integer.min(left[i], right) - bars[i];
            }
        }

        return water;
    }

    public static void main(String[] args)
    {
        int[] heights = { 7, 0, 4, 2, 5, 0, 6, 4, 0, 5 };

        System.out.print("The maximum amount of water that can be trapped is " +
                                trap(heights));
    }
}
```

##

```python3
import sys

# Function to find the amount of water that can be trapped within
# a given set of bars in linear time and extra space
def trap(bars):

    n = len(bars)
    if n <= 2:
        return 0

    water = 0

    # `left[i]` stores the maximum height of a bar to the left
    # of the current bar
    left = [None] * (n - 1)
    left[0] = -sys.maxsize

    # process bars from left to right
    for i in range(1, n - 1):
        left[i] = max(left[i - 1], bars[i - 1])

    # `right` stores the maximum height of a bar to the right
    # of the current bar
    right = -sys.maxsize

    # process bars from right to left
    for i in reversed(range(1, n - 1)):
        right = max(right, bars[i + 1])

        # check if it is possible to store water in the current bar
        if min(left[i], right) > bars[i]:
            water += min(left[i], right) - bars[i]

    return water

if __name__ == '__main__':

    heights = [7, 0, 4, 2, 5, 0, 6, 4, 0, 5]
    print("The maximum amount of water that can be trapped is", trap(heights))
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the total number of given bars.

## Constant space solution

The O(1) space solution can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

int max(int x, int y) {
    return (x > y) ? x : y;
}

// Function to find the amount of water that can be trapped within
// a given set of bars in linear time and constant space
int trap(int heights[], int n)
{
    // maintain two pointers left and right, pointing to the leftmost and
    // rightmost index of the input array
    int left = 0, right = n - 1, water = 0;

    int maxLeft = heights[left];
    int maxRight = heights[right];

    while (left < right)
    {
        if (heights[left] <= heights[right])
        {
            left++;
            maxLeft = max(maxLeft, heights[left]);
            water += (maxLeft - heights[left]);
        }
        else {
            right--;
            maxRight = max(maxRight, heights[right]);
            water += (maxRight - heights[right]);
        }
    }

    return water;
}

int main(void)
{
    int heights[] = { 7, 0, 4, 2, 5, 0, 6, 4, 0, 5 };
    int n = sizeof(heights) / sizeof(heights[0]);

    printf("The maximum amount of water that can be trapped is %d",
            trap(heights, n));

    return 0;
}
```

**Output:** The maximum amount of water that can be trapped is 25

##

```java
class Main
{
    // Function to find the amount of water that can be trapped within
    // a given set of bars in linear time and constant space
    public static int trap(int[] heights)
    {
        // maintain two pointers left and right, pointing to the leftmost and
        // rightmost index of the input array
        int left = 0, right = heights.length - 1, water = 0;

        int maxLeft = heights[left];
        int maxRight = heights[right];

        while (left < right)
        {
            if (heights[left] <= heights[right])
            {
                left++;
                maxLeft = Integer.max(maxLeft, heights[left]);
                water += (maxLeft - heights[left]);
            }
            else {
                right--;
                maxRight = Integer.max(maxRight, heights[right]);
                water += (maxRight - heights[right]);
            }
        }

        return water;
    }

    public static void main(String[] args)
    {
        int[] heights = { 7, 0, 4, 2, 5, 0, 6, 4, 0, 5 };

        System.out.print("The maximum amount of water that can be trapped is " +
                                trap(heights));
    }
}
```

##

```python3
# Function to find the amount of water that can be trapped within
# a given set of bars in linear time and constant space
def trap(heights):

    # maintain two pointers left and right, pointing to the leftmost and
    # rightmost index of the input list
    (left, right) = (0, len(heights) - 1)
    water = 0

    maxLeft = heights[left]
    maxRight = heights[right]

    while left < right:
        if heights[left] <= heights[right]:
            left = left + 1
            maxLeft = max(maxLeft, heights[left])
            water += (maxLeft - heights[left])
        else:
            right = right - 1
            maxRight = max(maxRight, heights[right])
            water += (maxRight - heights[right])

    return water

if __name__ == '__main__':

    heights = [7, 0, 4, 2, 5, 0, 6, 4, 0, 5]
    print("The maximum amount of water that can be trapped is", trap(heights))
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.
