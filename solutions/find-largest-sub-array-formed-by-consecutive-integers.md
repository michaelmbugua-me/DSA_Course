# Find the largest subarray formed by consecutive integers

> Source: https://www.techiedelight.com/find-largest-sub-array-formed-by-consecutive-integers/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the largest subarray formed by consecutive integers. The subarray should contain all distinct values.

For example,

**Input:** { 2, 0, 2, 1, 4, 3, 1, 0 } **Output:** The largest subarray is { 0, 2, 1, 4, 3 }

> 

The problem differs from the problem of finding the [longest subsequence formed by consecutive integers](https://techiedelight.com/find-longest-subsequence-formed-by-consecutive-integers/). Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

The idea is to consider every subarray and keep track of the largest subarray found so far, formed by consecutive integers. For a subarray to contain consecutive integers,

  * The difference between the maximum and minimum element in it should be exactly equal to the subarray’s length minus one.
  * All elements in the array should be distinct (we can check this by inserting the elements in a set or using a visited array).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to check if subarray `A[i…j]` is formed by consecutive integers.
// Here, `min` and `max` denote the minimum and maximum element in the subarray.
bool isConsecutive(int A[], int i, int j, int min, int max)
{
    // for an array to contain consecutive integers, the difference
    // between the maximum and minimum element in it should be exactly `j-i`
    if (max - min != j - i) {
        return false;
    }

    // create a visited array (we can also use a set)
    vector<bool> visited(j - i + 1);

    // traverse the subarray and check if each element appears only once
    for (int k = i; k <= j; k++)
    {
        // if the element is seen before, return false
        if (visited[A[k] - min]) {
            return false;
        }

        // mark the element as seen
        visited[A[k] - min] = true;
    }

    // we reach here when all elements in the array are distinct
    return true;
}

// Find the largest subarray formed by consecutive integers
void findMaxSubarray(int A[], int n)
{
    int len = 1;
    int start = 0, end = 0;

    // consider each subarray formed by `A[i…j]`

    // `i` denotes the beginning of the subarray
    for (int i = 0; i < n - 1; i++)
    {
        // stores the minimum and maximum element in subarray `A[i…j]`
        int min_val = A[i], max_val = A[i];

        // `j` denotes the end of the subarray
        for (int j = i + 1; j < n; j++)
        {
            // update the minimum and maximum elements of the subarray
            min_val = min(min_val, A[j]);
            max_val = max(max_val, A[j]);

            // check if subarray `A[i…j]` is formed by consecutive integers
            if (isConsecutive(A, i, j, min_val, max_val))
            {
                if (len < max_val - min_val + 1)
                {
                    len = max_val - min_val + 1,
                    start = i, end = j;
                }
            }
        }
    }

    // print the maximum length subarray
    cout << "The largest subarray is [" << start << ", " << end << "]";
}

int main()
{
    int A[] = { 2, 0, 2, 1, 4, 3, 1, 0 };
    int n = sizeof(A) / sizeof(A[0]);

    findMaxSubarray(A, n);

    return 0;
}
```

**Output:** The largest subarray is [1, 5]

##

```java
import java.lang.Math;

class Main
{
    // Function to check if subarray `A[i…j]` is formed by consecutive integers.
    // Here, `min` and `max` denote the minimum and maximum element in the subarray.
    private static boolean isConsecutive(int[] A, int i, int j, int min, int max)
    {
        // for an array to contain consecutive integers, the difference
        // between the maximum and minimum element in it should be exactly `j-i`
        if (max - min != j - i) {
            return false;
        }

        // create a visited array (we can also use a set)
        boolean visited[] = new boolean[j - i + 1];

        // traverse the subarray and check if each element appears
        // only once
        for (int k = i; k <= j; k++)
        {
            // if the element is seen before, return false
            if (visited[A[k] - min]) {
                return false;
            }

            // mark the element as seen
            visited[A[k] - min] = true;
        }

        // we reach here when all elements in the array are distinct
        return true;
    }

    // Find the largest subarray formed by consecutive integers
    public static void findMaxSubarray(int[] A)
    {
        int len = 1;
        int start = 0, end = 0;

        // consider each subarray formed by `A[i…j]`

        // `i` denotes the beginning of the subarray
        for (int i = 0; i < A.length - 1; i++)
        {
            // stores the minimum and maximum element in subarray `A[i…j]`
            int min_val = A[i], max_val = A[i];

            // `j` denotes the end of the subarray
            for (int j = i + 1; j < A.length; j++)
            {
                // update the minimum and maximum elements of the subarray
                min_val = Math.min(min_val, A[j]);
                max_val = Math.max(max_val, A[j]);

                // check if `A[i…j]` is formed by consecutive integers
                if (isConsecutive(A, i, j, min_val, max_val))
                {
                    if (len < max_val - min_val + 1)
                    {
                        len = max_val - min_val + 1;
                        start = i;
                        end = j;
                    }
                }
            }
        }

        // print the maximum length subarray
        System.out.println("The largest subarray is [" + start + ", " + end + "]");
    }

    public static void main (String[] args)
    {
        int[] A = { 2, 0, 2, 1, 4, 3, 1, 0 };

        findMaxSubarray(A);
    }
}
```

##

```python3
# Function to check if subarray `A[i…j]` is formed by consecutive integers.
# Here, `min` and `max` denote the minimum and maximum element in the subarray.
def isConsecutive(A, i, j, min, max):

    # for a list to contain consecutive integers, the difference
    # between the maximum and minimum element in it should be exactly `j-i`
    if max - min != j - i:
        return False

    # create a visited list (we can also use a set)
    visited = [False] * (j - i + 1)

    # traverse the sublist and check if each element appears
    # only once
    for k in range(i, j + 1):

        # if the element is seen before, return false
        if visited[A[k] - min]:
            return False

        # mark the element as seen
        visited[A[k] - min] = True

    # we reach here when all elements in the list are distinct
    return True

# Find the largest sublist formed by consecutive integers
def findMaxSublist(A):

    length = 1
    start = end = 0

    # consider each sublist formed by `A[i…j]`

    # `i` denotes the beginning of the sublist
    for i in range(len(A) - 1):

        # stores the minimum and maximum element formed by `A[i…j]`
        min_val = A[i]
        max_val = A[i]

        # `j` denotes the end of the sublist
        for j in range(i + 1, len(A)):
            # update the minimum and maximum elements of the sublist
            min_val = min(min_val, A[j])
            max_val = max(max_val, A[j])

            # check if `A[i…j]`is formed by consecutive integers
            if isConsecutive(A, i, j, min_val, max_val):
                if length < max_val - min_val + 1:
                    length = max_val - min_val + 1
                    start = i
                    end = j

    # print the maximum length sublist
    print("The largest sublist is", (start, end))

if __name__ == '__main__':

    A = [2, 0, 2, 1, 4, 3, 1, 0]

    findMaxSublist(A)
```

The time complexity of the above solution O(n3) and requires O(n) extra space, where `n` is the size of the input.

**Exercise:** Extend the solution to consider duplicates in the subarray.

Also See:

> [Check if an array is formed by consecutive integers](https://www.techiedelight.com/check-array-formed-consecutive-integers/ "Check if an array is formed by consecutive integers")

> [Longest Consecutive Subsequence](https://www.techiedelight.com/find-longest-subsequence-formed-by-consecutive-integers/ "Longest Consecutive Subsequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.51/5. Vote count: 150

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
