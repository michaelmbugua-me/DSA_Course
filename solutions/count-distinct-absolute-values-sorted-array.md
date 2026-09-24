# Count distinct absolute values in a sorted array

> Source: https://www.techiedelight.com/count-distinct-absolute-values-sorted-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of sorted integers that may contain several duplicate elements, count the total number of distinct absolute values in it.

For example,

**Input:** { -1, -1, 0, 1, 1, 1 } **Output:** The total number of distinct absolute values is 2 (0 and 1) **Input:** { -2, -1, 0, 1, 2, 3 } **Output:** The total number of distinct absolute values is 4 (0, 1, 2 and 3) **Input:** { -1, -1, -1, -1 } **Output:** The total number of distinct absolute values is 1 (only 1)

> 

We can easily solve this problem by inserting the absolute value of each array element into a set. We know that a set doesn’t permit duplicates, and hence its size would be the desired count. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
#include <vector>
#include <cstdlib>
using namespace std;

// Returns the total number of distinct absolute values in a given input
int findDistinctCount(vector<int> &input)
{
    unordered_set<int> set;
    for (int const &i: input) {
        set.insert(abs(i));
    }

    return set.size();
}

int main()
{
    vector<int> input = { -1, -1, 0, 1, 1, 1 };

    cout << "The total number of distinct absolute values is "
         << findDistinctCount(input);

    return 0;
}
```

**Output:** The total number of distinct absolute values is 2

##

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Main
{
    // Returns the total number of distinct absolute values in a given input
    public static int findDistinctCount(List<Integer> input)
    {
        Set<Integer> set = new HashSet<>();
        for (int i: input) {
            set.add(Math.abs(i));
        }

        return set.size();
    }

    public static void main(String[] args)
    {
        List<Integer> input = Arrays.asList(-1, -1, 0, 1, 1, 1);

        System.out.println("The total number of distinct absolute values is "
                                + findDistinctCount(input));
    }
}
```

##

```python3
# Returns the total number of distinct absolute values in a given input
def findDistinctCount(input):

    s = set([abs(i) for i in input])
    return len(s)

if __name__ == '__main__':

    input = [-1, -1, 0, 1, 1, 1]

    print('The total number of distinct absolute values is', findDistinctCount(input))
```

The time complexity of the above solution is O(n), where `n` is the size of the input. It doesn’t take advantage of the fact that the input is already sorted and requires O(n) extra space. We can use the [sliding window](https://techiedelight.com/sliding-window-problems/) approach to easily solve this problem in O(1) extra space.

The idea is to initialize the distinct count as the total number of elements present in the input. The program checks for a pair with zero-sum with the help of two index variables (initially pointing to two corners of the array). If the pair with zero-sum is found (or duplicates are encountered), decrement the count of distinct elements. Finally, return the updated count.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

// Returns the total number of distinct absolute values in a given input
int findDistinctCount(vector<int> const &input)
{
    // initialize the distinct count as input size
    int distinct_count = input.size();

    // points to the left and right boundary of the current window;
    // i.e., the current window is formed by `A[left, right]`
    int left = 0;
    int right = input.size() - 1;

    // loop until the left index of the current window is less than the right index
    while (left < right)
    {
        // remove any duplicate elements from the left and right of the current
        // window and decrease the distinct count for each duplicate found
        while (left < right && input[left] == input[left + 1])
        {
            distinct_count--;
            left++;
        }
        while (right > left && input[right] == input[right - 1])
        {
            distinct_count--;
            right--;
        }

        // if only one element is left, break the loop
        if (left == right) {
            break;
        }

        int sum = input[left] + input[right];

        // decrease the distinct count if the zero-sum pair is encountered
        if (sum == 0)
        {
            distinct_count--;
            left++;
            right--;
        }
        // if the sum is negative, incrementing the left index might still lead
        // to a zero-sum pair
        else if (sum < 0) {
            left++;
        }
        // if the sum is positive, decrementing the right index might still lead
        // to a zero-sum pair
        else {
            right--;
        }
    }

    return distinct_count;
}

int main()
{
    vector<int> input = { -1, -1, 0, 1, 1, 1 };

    cout << "The total number of distinct absolute values is "
         << findDistinctCount(input);

    return 0;
}
```

**Output:** The total number of distinct absolute values is 2

##

```java
class Main
{
    // Returns the total number of distinct absolute values in a given input
    public static int findDistinctCount(int[] A)
    {
        // initialize the distinct count as input size
        int distinct_count = A.length;

        // points to the left and right boundary of the current window,
        // i.e., the current window is formed by `A[left, right]`
        int left = 0;
        int right = A.length - 1;

        // loop until the left index of the current window is
        // less than the right index
        while (left < right)
        {
            // remove any duplicate elements from the left and right
            // of the current window and decrease the distinct count
            // for each duplicate found
            while (left < right && A[left] == A[left+1])
            {
                distinct_count--;
                left++;
            }
            while (right > left && A[right] == A[right-1])
            {
                distinct_count--;
                right--;
            }

            // if only one element is left, break the loop
            if (left == right) {
                break;
            }

            int sum = A[left] + A[right];

            // decrease the distinct count if the zero-sum pair is encountered
            if (sum == 0)
            {
                distinct_count--;
                left++;
                right--;
            }
            // if the sum is negative, incrementing the left index might still lead
            // to a zero-sum pair
            else if (sum < 0) {
                left++;
            }
            // if the sum is positive, decrementing the right index might still lead
            // to a zero-sum pair
            else {
                right--;
            }
        }

        return distinct_count;
    }

    public static void main(String[] args)
    {
        int[] input = { -1, -1, 0, 1, 1, 1 };

        System.out.println("The total number of distinct absolute values is "
                                + findDistinctCount(input));
    }
}
```

##

```python3
# Returns the total number of distinct absolute values in a given input
def findDistinctCount(A):

    # initialize the distinct count as input size
    distinct_count = len(A)

    # points to the left and right boundary of the current window,
    # i.e., the current window is formed by `A[left, right]`
    left = 0
    right = len(A) - 1

    # loop until the left index of the current window is less than the right index
    while left < right:

        # remove any duplicate elements from the left and right of the current
        # window and decrease the distinct count for each duplicate found
        while left < right and A[left] == A[left + 1]:
            distinct_count = distinct_count - 1
            left = left + 1

        while right > left and A[right] == A[right - 1]:
            distinct_count = distinct_count - 1
            right = right - 1

        # if only one element is left, break the loop
        if left == right:
            break

        total = A[left] + A[right]

        # decrease the distinct count if the zero-sum pair is encountered
        if total == 0:
            distinct_count = distinct_count - 1
            left = left + 1
            right = right - 1

        # if the sum is negative, incrementing the left index might still lead
        # to a zero-sum pair
        elif total < 0:
            left = left + 1
        # if the sum is positive, decrementing the right index might still lead
        # to a zero-sum pair
        else:
            right = right - 1

    return distinct_count

if __name__ == '__main__':

    input = [-1, -1, 0, 1, 1, 1]
    print('The total number of distinct absolute values is', findDistinctCount(input))
```

**Author:** Aditya Goel
