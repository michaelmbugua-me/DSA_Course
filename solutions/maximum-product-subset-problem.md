# Maximum Product Subset Problem

> Source: https://www.techiedelight.com/maximum-product-subset-problem/

Given an integer array, find the maximum product of its elements among all its subsets.

For example,

**Input:** nums[] = { -6, 4, -5, 8, -10, 0, 8 } **Output:** The maximum product of a subset is 15360 The subset with the maximum product of its elements is { -6, 4, 8, -10, 8 } **Input:** nums[] = { 4, -8, 0, 8 } **Output:** The maximum product of a subset is 32 The subset with the maximum product of its elements is { 4, 8 }

> 

## 1\. Brute-Force Solution

A naive solution is to [consider every subset](https://techiedelight.com/generate-power-set-given-set/) and find the product of their elements. Finally, return the maximum product found among all subsets. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Function to generate the product of all elements in a given set
// and update maximum product found so far
void findMaxProduct(vector<int> const &set, int &maximum)
{
    int product = 1;

    for (int j: set) {
        product = product * j;
    }

    // if the set is not empty, then update the product
    if (set.size()) {
        maximum = max (maximum, product);
    }
}

// Function to generate a power set of a given set `S`
void findPowerSet(vector<int> const &S, vector<int> &set, int n, int &maximum)
{
    // if we have considered all elements, we have generated a subset
    if (n == 0)
    {
        // compute its product of elements and update the maximum product
        // found so far
        findMaxProduct(set, maximum);
        return;
    }

    // consider the n'th element
    set.push_back(S[n - 1]);
    findPowerSet(S, set, n - 1, maximum);

    set.pop_back();            // backtrack

    // or don't consider the n'th element
    findPowerSet(S, set, n - 1, maximum);
}

int main()
{
    vector<int> S = { -6, 4, -5, 8, -10, 0, 8 };
    int n = S.size();

    vector<int> set;
    int maximum = INT_MIN;

    findPowerSet(S, set, n, maximum);

    printf("The maximum product of a subset is %d", maximum);

    return 0;
}
```

**Output:** The maximum product of a subset is 15360

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Main
{
    // Function to generate the product of all elements in a given
    // set and update maximum product found so far
    public static int findMaxProduct(List<Integer> set, int maximum)
    {
        int product = 1;

        for (int j: set) {
            product = product * j;
        }

        // if the set is not empty, then update the product
        if (set.size() != 0) {
            maximum = Integer.max(maximum, product);
        }

        return maximum;
    }

    // Function to generate a power set of a given set `S`
    public static int findPowerSet(List<Integer> S, List<Integer> set,
                                int n, int maximum)
    {
        // if we have considered all elements, we have generated a subset
        if (n == 0)
        {
            // compute its product of elements and update the maximum
            // product found so far
            return findMaxProduct(set, maximum);
        }

        // consider the n'th element
        set.add(S.get(n - 1));
        maximum = findPowerSet(S, set, n - 1, maximum);

        set.remove(set.size() - 1);            // backtrack

        // or don't consider the n'th element
        return findPowerSet(S, set, n - 1, maximum);
    }

    public static void main(String[] args)
    {
        List<Integer> S = Arrays.asList(-6, 4, -5, 8, -10, 0, 8);
        int n = S.size();

        List<Integer> set = new ArrayList<>();
        int maximum = findPowerSet(S, set, n, Integer.MIN_VALUE);

        System.out.println("The maximum product of a subset is " + maximum);
    }
}
```

##

```python3
import sys

# Function to generate the product of all elements in a given set
# and update maximum product found so far
def findMaxProduct(set, maximum):

    product = 1

    for j in set:
        product = product * j

    # if the set is not empty, then update the product
    if set:
        maximum = max(maximum, product)

    return maximum

# Function to generate a power set of a given set `S`
def findPowerSet(S, s, n, maximum):

    # if we have considered all elements, we have generated a subset
    if n == 0:
        # compute its product of elements and update the maximum product found so far
        return findMaxProduct(s, maximum)

    # consider the n'th element
    s.append(S[n - 1])
    maximum = findPowerSet(S, s, n - 1, maximum)

    s.pop(len(s) - 1)            # backtrack

    # or don't consider the n'th element
    return findPowerSet(S, s, n - 1, maximum)

if __name__ == '__main__':

    S = [-6, 4, -5, 8, -10, 0, 8]
    n = len(S)

    s = []
    maximum = findPowerSet(S, s, n, -sys.maxsize)

    print('The maximum product of a subset is', maximum)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

## 2\. Linear-time Solution

We can solve this problem in linear time by finding a negative element with a minimum absolute value in the set. We also count the total number of negative elements present in the set. If the count of negative elements is odd, exclude that negative element (having minimum absolute value) from the subset; otherwise, consider it (since the multiplication of two negative numbers will give a positive number as output). We need to handle one more special case because 0 will never be part of the subset if at least one positive element or two negative elements are present in the subset. Rest all elements will form part of the subset.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int min (int x, int y) {
    return (x < y) ? x : y;
}

// Function to return the maximum product of a subset of a given array
int findMaxProduct(int nums[], int n)
{
    // base case
    if (n == 0) {
        return 0;
    }

    // if the array contains only one element
    if (n == 1) {
        return nums[0];
    }

    int product = 1;        // to store the maximum product subset

    // stores the negative element having a minimum absolute value in the set
    int abs_min_so_far = INT_MAX;

    int negative = 0;       // maintain the count of -ve elements in the set
    int positive = 0;       // maintain the count of +ve elements in the set

    int contains_zero = 0;

    // traverse the given array
    for (int i = 0; i < n; i++)
    {
        // if the current element is negative
        if (nums[i] < 0)
        {
            negative++;
            abs_min_so_far = min(abs_min_so_far, abs(nums[i]));
        }
        // if the current element is positive
        else if (nums[i] > 0) {
            positive++;
        }

        // if the current element is zero
        if (nums[i] == 0) {
            contains_zero = 1;
        }
        else {
            product = product * nums[i];
        }
    }

    // if an odd number of negative elements are present, exclude the negative
    // element having a minimum absolute value from the subset
    if (negative & 1) {
        product = product / -abs_min_so_far;
    }

    // special case – set contains one negative element and one or more 0's
    if (negative == 1 && !positive && contains_zero) {
        product = 0;
    }

    // special case – set contains all 0's
    if (!negative && !positive && contains_zero) {
        product = 0;
    }

    // return maximum product
    return product;
}

int main()
{
    int nums[] = { -6, 4, -5, 8, -10, 0, 8 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The maximum product of a subset is %d", findMaxProduct(nums, n));

    return 0;
}
```

**Output:** The maximum product of a subset is 15360

##

```java
class Main
{
    // Function to return the maximum product of a subset of a given array
    public static int findMaxProduct(int[] nums, int n)
    {
        // base case
        if (n == 0) {
            return 0;
        }

        // if the array contains only one element
        if (n == 1) {
            return nums[0];
        }

        int product = 1;    // to store the maximum product subset

        // stores the negative element having a minimum absolute value
        // in the set
        int abs_min_so_far = Integer.MAX_VALUE;

        // maintain the count of negative elements in the set
        int negative = 0;

        // maintain the count of positive elements in the set
        int positive = 0;

        boolean contains_zero = false;

        // traverse the given array
        for (int i = 0; i < n; i++)
        {
            // if the current element is negative
            if (nums[i] < 0)
            {
                negative++;
                abs_min_so_far = Integer.min(abs_min_so_far, Math.abs(nums[i]));
            }
            // if the current element is positive
            else if (nums[i] > 0) {
                positive++;
            }

            // if the current element is zero
            if (nums[i] == 0) {
                contains_zero = true;
            }
            else {
                product = product * nums[i];
            }
        }

        // if an odd number of negative elements are present, exclude the
        // negative element having a minimum absolute value from the subset
        if ((negative & 1) != 0) {
            product = product / -abs_min_so_far;
        }

        // special case – set contains one negative element and
        // one or more zeros
        if (negative == 1 && positive == 0 && contains_zero) {
            product = 0;
        }

        // special case – set contains all zeros
        if (negative == 0 && positive == 0 && contains_zero) {
            product = 0;
        }

        // return maximum product
        return product;
    }

    public static void main(String[] args)
    {
        int[] nums = { -6, 4, -5, 8, -10, 0, 8 };

        System.out.println("The maximum product of a subset is "
                        + findMaxProduct(nums, nums.length));
    }
}
```

##

```python3
import sys

# Function to return the maximum product of a subset of a given list
def findMaxProduct(nums, n):

    # base case
    if n == 0:
        return 0

    # if the list contains only one element
    if n == 1:
        return nums[0]

    product = 1         # to store the maximum product subset

    # stores the negative element having a minimum absolute value in the set
    abs_min_so_far = sys.maxsize

    negative = 0        # maintain the count of negative elements in the set
    positive = 0        # maintain the count of positive elements in the set

    contains_zero = False

    # traverse the given list
    for i in range(n):

        # if the current element is negative
        if nums[i] < 0:
            negative = negative + 1
            abs_min_so_far = min(abs_min_so_far, abs(nums[i]))

        # if the current element is positive
        elif nums[i] > 0:
            positive = positive + 1

        # if the current element is zero
        if nums[i] == 0:
            contains_zero = True
        else:
            product = product * nums[i]

    # if an odd number of negative elements are present, exclude the negative
    # element having a minimum absolute value from the subset
    if negative & 1:
        product = product   // -abs_min_so_far

    # special case – set contains one negative element and one or more zeros
    if negative == 1 and positive == 0 and contains_zero:
        product = 0

    # special case – set contains all zeros
    if negative == 0 and positive == 0 and contains_zero:
        product = 0

    # return the maximum product
    return product

if __name__ == '__main__':

    nums = [-6, 4, -5, 8, -10, 0, 8]
    print('The maximum product of a subset is', findMaxProduct(nums, len(nums)))
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.
