# Find the count of distinct elements in every subarray of size `k`

> Source: https://www.techiedelight.com/count-distinct-elements-every-sub-array-size-k-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array and an integer `k`, find the count of distinct elements in every subarray of size `k`.

For example,

**Input:** arr[] = { 2, 1, 2, 3, 2, 1, 4, 5 }; k = 5; **Output:** The count of distinct elements in subarray { 2, 1, 2, 3, 2 } is 3 The count of distinct elements in subarray { 1, 2, 3, 2, 1 } is 3 The count of distinct elements in subarray { 2, 3, 2, 1, 4 } is 4 The count of distinct elements in subarray { 3, 2, 1, 4, 5 } is 5

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

A naive solution is to consider every subarray in the given array and count all distinct elements in it using two nested loops, as demonstrated below in C, Java, and Python. The time complexity of this approach is O(n.k2), where `n` is the size of the input and `k` is the size of the subarray.

```c
#include <stdio.h>

// Function to find the count of distinct elements in every subarray
// of size `k` in an array
void findDistinctCount(int arr[], int n, int k)
{
    // consider every subarray of size `k`
    for (int x = 0; x <= n - k; x++)
    {
        // maintains a counter for distinct elements in the current subarray
        int distinct = 0;

        // current subarray is formed by subarray `arr[x, x+k)`
        for (int i = x; i < x + k; i++)
        {
            // increase distinct count for `arr[i]` in current subarray
            distinct++;

            // check if `arr[i]` is present in subarray `arr[x, i-1]` or not
            for (int j = x; j < i; j++)
            {
                // if duplicate element found in the current subarray
                if (arr[i] == arr[j])
                {
                    // unmark element `arr[i]` as distinct – decrease count
                    distinct--;
                    break;
                }
            }
        }

        printf("The count of distinct elements in subarray [%d, %d] "
                "is %d\n", x, x + k - 1, distinct);
    }
}

int main(void)
{
    int arr[] = { 2, 1, 2, 3, 2, 1, 4, 5 };
    int k = 5;

    int n = sizeof(arr) / sizeof(arr[0]);
    findDistinctCount(arr, n, k);

    return 0;
}
```

##

```java
class Main
{
    // Function to find the count of distinct elements in every subarray
    // of size `k` in the array
    public static void findDistinctCount(int[] arr, int k)
    {
        // consider every subarray of size `k`
        for (int x = 0; x <= arr.length - k; x++)
        {
            // maintains a counter for distinct elements in the current subarray
            int distinct = 0;

            // current subarray is formed by subarray `arr[x, x+k)`
            for (int i = x; i < x + k; i++)
            {
                // increase distinct count for `arr[i]` in current subarray
                distinct++;

                // check if `arr[i]` is present in subarray `arr[x, i-1]` or not
                for (int j = x; j < i; j++)
                {
                    // if duplicate element found in the current subarray
                    if (arr[i] == arr[j])
                    {
                        // unmark element `arr[i]` as distinct – decrease count
                        distinct--;
                        break;
                    }
                }
            }

            System.out.printf("The count of distinct elements in subarray [%d, %d]"
                                + " is %d\n", x, x + k - 1, distinct);
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 2, 1, 2, 3, 2, 1, 4, 5 };
        int k = 5;

        findDistinctCount(arr, k);
    }
}
```

##

```python3
# Function to find the count of distinct elements in every sublist
# of size `k` in a list
def findDistinctCount(A, k):

    # consider every sublist of size `k`
    for x in range(len(A) - k + 1):

        # maintains a counter for distinct elements in the current sublist
        distinct = 0

        # current sublist is formed by sublist `A[x, x+k)`
        for i in range(x, x + k):

            # increase distinct count for `A[i]` in current sublist
            distinct = distinct + 1

            # check if `A[i]` is present in sublist `A[x, i-1]` or not
            for j in range(x, i):

                # If duplicate element found in the current sublist
                if A[i] == A[j]:
                    # unmark element `A[i]` as distinct – decrease count
                    distinct = distinct - 1
                    break

        print("The count of distinct elements in sublist",
            f"[{x}, {x + k - 1}] is {distinct}")

if __name__ == '__main__':

    A = [2, 1, 2, 3, 2, 1, 4, 5]
    k = 5

    findDistinctCount(A, k)
```

**Output:** The count of distinct elements in subarray [0, 4] is 3 The count of distinct elements in subarray [1, 5] is 3 The count of distinct elements in subarray [2, 6] is 4 The count of distinct elements in subarray [3, 7] is 5

We know that a set doesn’t store duplicate elements. We can take advantage of this fact and insert all elements of the current subarray into a set. Then the set’s size would be the distinct element count. This reduces the time complexity to O(n.k) but uses O(k) extra space.

The algorithm can be implemented as follows in C++, Java, and Python. We can even extend the solution to print the contents of the set, as shown [here](https://techiedelight.com/compiler/?run=SPLrtr).

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

// Function to find all distinct elements present in each subarray
// of size `k` in an array
void findDistinctCount(vector<int> const &input, int k)
{
    // loop through the vector
    for (int i = 0; i < input.size() - (k - 1); i++)
    {
        unordered_set<int> distinct(input.begin() + i, input.begin() + i + k);

        cout << "The count of distinct elements in subarray [" << i << ", "
             << (i + k - 1) << "] is " << distinct.size() << endl;
    }
}

int main()
{
    vector<int> input = { 2, 1, 2, 3, 2, 1, 4, 5 };
    int k = 5;

    findDistinctCount(input, k);

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Main
{
    // Function to find all distinct elements present in each subarray
    // of size `k` in the array
    public static void findDistinctCount(List<Integer> input, int k)
    {
        // loop through the list
        for (int i = 0; i < input.size() - (k - 1); i++)
        {
            Set<Integer> distinct = new HashSet<>();
            distinct.addAll(input.subList(i, i + k));

            System.out.println("The count of distinct elements in "
                + "subarray [" + i + ", " + (i + k - 1) + "] is "
                + distinct.size());
        }
    }

    public static void main(String[] args)
    {
        List<Integer> input = Arrays.asList( 2, 1, 2, 3, 2, 1, 4, 5 );
        int k = 5;

        findDistinctCount(input, k);
    }
}
```

##

```python3
# Function to find all distinct elements present in each sublist
# of size `k` in a list
def findDistinctCount(A, k):

    # loop through the list
    for i in range(len(A) - (k - 1)):
        distinct = set(A[i:i+k])
        print(f"The count of distinct elements in sublist [{i}, {(i + k - 1)}] is",
            len(distinct))

if __name__ == '__main__':

    input = [2, 1, 2, 3, 2, 1, 4, 5]
    k = 5

    findDistinctCount(input, k)
```

**Output:** The count of distinct elements in subarray [0, 4] is 3 The count of distinct elements in subarray [1, 5] is 3 The count of distinct elements in subarray [2, 6] is 4 The count of distinct elements in subarray [3, 7] is 5

We can further reduce the time complexity to O(n) by using the [sliding window](https://techiedelight.com/sliding-window-problems/) technique. The idea is to store the frequency of elements in the current window in a map and keep track of the distinct elements count in the current window (of size `k`). The code can be optimized to derive the count of elements in any window using the count of elements in the previous window by inserting the new element to the previous window from its right and removing an element from its left.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
using namespace std;

// Function to find the count of distinct elements in every subarray
// of size `k` in an array
void findDistinctCount(vector<int> const &input, int k)
{
    // map to store the frequency of elements in the current window of size `k`
    unordered_map<int, int> freq;

    // maintains the count of distinct elements in every subarray of size `k`
    int distinct = 0;

    // loop through the array
    for (int i = 0; i < input.size(); i++)
    {
        // ignore the first `k` elements
        if (i >= k)
        {
            // remove the first element from the subarray by reducing its
            // frequency in the map
            freq[input[i - k]]--;

            // reduce the distinct count if we are left with 0
            if (freq[input[i - k]] == 0) {
                distinct--;
            }
        }

        // add the current element to the subarray by incrementing its
        // count in the map
        freq[input[i]]++;

        // increment distinct count by 1 if element occurs for the first
        // time in the current window
        if (freq[input[i]] == 1) {
            distinct++;
        }

        // print count of distinct elements in the current subarray
        if (i >= k - 1)
        {
            cout << "The count of distinct elements in subarray [" <<
                (i - k + 1) << ", " << i << "]" << " is " << distinct << endl;
        }
    }
}

int main()
{
    vector<int> input = { 1, 1, 2, 1, 3 };
    int k = 3;

    findDistinctCount(input, k);

    return 0;
}
```
