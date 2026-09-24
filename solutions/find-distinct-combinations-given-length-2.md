# Find all distinct combinations of a given length – II

> Source: https://www.techiedelight.com/find-distinct-combinations-given-length-2/

Given an integer array, find all distinct combinations of a given length `k`.

For example,

**Input:** {2, 3, 4}, k = 2 **Output:** {2, 3}, {2, 4}, {3, 4} **Input:** {1, 2, 1}, k = 2 **Output:** {1, 2}, {1, 1}, {2, 1}

The program should print all the distinct combinations, while preserving the relative order of elements as they appear in the array.

> 

**Previous Approach:**

> [Find all distinct combinations of a given length – I](https://techiedelight.com/find-distinct-combinations-of-given-length/)

The problem is very similar to the [0/1 knapsack problem](https://techiedelight.com/0-1-knapsack-problem/), where for each element in a given array, we have two cases:

  1. Consider that element.
  2. Don’t consider that element.

The following C++ solution generates all combinations using the above logic by traversing the array from left to right. If the tuple of the given size is found, print it. To avoid printing permutations, construct each tuple in the same order as array elements. To print only distinct tuples (when input contains repeated elements), [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and exclude all adjacent duplicates along with the current item in case 2.

```cpp
#include <iostream>
#include <set>
#include <vector>
#include <experimental/iterator>
using namespace std;

// Function to print all distinct combinations of length `k`
void findCombinations(vector<int> const &arr, int i, int k,
                set<vector<int>> &subarrays, vector<int> &out)
{
    // do nothing for empty input
    if (arr.size() == 0) {
        return;
    }

    // base case: combination size is `k`
    if (k == 0) {
        subarrays.insert(out);
        return;
    }

    // return if no more elements are left
    if (i == arr.size()) {
        return;
    }

    // include the current element in the current combination and recur
    out.push_back(arr[i]);
    findCombinations(arr, i + 1, k - 1, subarrays, out);

    // exclude the current element from the current combination
    out.pop_back();        // backtrack

    // exclude the current element from the current combination and recur
    findCombinations(arr, i + 1, k, subarrays, out);
}

template <typename T>
void printVector(vector<T> const &input)
{
    cout << "[";
    copy(begin(input),
            end(input),
            experimental::make_ostream_joiner(cout, ", "));
    cout << "]\n";
}

int main()
{
    vector<int> arr = { 1, 2, 3 };
    int k = 2;

    // set to store all combinations
    set<vector<int>> subarrays;

    // vector to store a combination
    vector<int> out;

    // process elements from left to right
    findCombinations(arr, 0, k, subarrays, out);

    // print subarrays
    for (auto const &vec: subarrays) {
        printVector(vec);
    }

    return 0;
}
```

**Output:** [1, 2] [1, 3] [2, 3]

##

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Main
{
    // Function to print all distinct combinations of length `k`
    public static void findCombinations(int[] A, int i, int k,
                                        Set<List<Integer>> subarrays, List<Integer> out)
    {
        // do nothing for empty input
        if (A.length == 0) {
            return;
        }

        // base case: combination size is `k`
        if (k == 0) {
            subarrays.add(new ArrayList<>(out));
            return;
        }

        // return if no more elements are left
        if (i == A.length) {
            return;
        }

        // include the current element in the current combination and recur
        out.add(A[i]);
        findCombinations(A, i + 1, k - 1, subarrays, out);

        // exclude the current element from the current combination
        out.remove(out.size() - 1);

        // exclude the current element from the current combination and recur
        findCombinations(A, i + 1, k, subarrays, out);
    }

    public static Set<List<Integer>> findCombinations(int[] A, int k)
    {
        Set<List<Integer>> subarrays = new HashSet<>();
        findCombinations(A, 0, k, subarrays, new ArrayList<>());
        return subarrays;
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 3 };
        int k = 2;

        // process elements from left to right
        System.out.println(findCombinations(A, k));
    }
}
```

##

```python3
# Function to print all distinct combinations of length `k`
def findCombinations(A, k, subarrays, out=(), i=0):

    # do nothing for empty input
    if len(A) == 0:
        return

    # base case: combination size is `k`
    if k == 0:
        subarrays.add(out)
        return

    # return if no more elements are left
    if i == len(A):
        return

    # include the current element in the current combination and recur
    findCombinations(A, k - 1, subarrays, out + (A[i],), i + 1)

    # exclude the current element from the current combination and recur
    findCombinations(A, k, subarrays, out, i + 1)

if __name__ == '__main__':

    A = [1, 2, 3]
    k = 2

    # process elements from left to right
    subarrays = set()
    findCombinations(A, k, subarrays)
    print(subarrays)
```

We can also process the array elements from right to left. The following C++ program demonstrates it:

```cpp
#include <iostream>
#include <set>
#include <vector>
#include <experimental/iterator>
using namespace std;

// Function to print all distinct combinations of length `k`
void findCombinations(vector<int> const &arr, int i, int k,
                set<vector<int>> &subarrays, vector<int> &out)
{
    // do nothing for empty input
    if (arr.size() == 0) {
        return;
    }

    // base case: combination size is `k`
    if (k == 0) {
        subarrays.insert(out);
        return;
    }

    // return if no more elements are left
    if (i < 0) {
        return;
    }

    // include the current element in the current combination and recur
    out.push_back(arr[i]);
    findCombinations(arr, i - 1, k - 1, subarrays, out);

    // exclude the current element from the current combination
    out.pop_back();        // backtrack

    // exclude the current element from the current combination and recur
    findCombinations(arr, i - 1, k, subarrays, out);
}

template <typename T>
void printVector(vector<T> const &input)
{
    cout << "[";
    copy(begin(input),
            end(input),
            experimental::make_ostream_joiner(cout, ", "));
    cout << "]\n";
}

int main()
{
    vector<int> arr = { 1, 2, 3 };
    int k = 2;

    // set to store all combinations
    set<vector<int>> subarrays;

    // vector to store a combination
    vector<int> out;

    // process elements from left to right
    findCombinations(arr, arr.size() - 1, k, subarrays, out);

    // print subarrays
    for (auto const &vec: subarrays) {
        printVector(vec);
    }

    return 0;
}
```

**Output:** [2, 1] [3, 1] [3, 2]

##

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Main
{
    // Function to print all distinct combinations of length `k`
    public static void findCombinations(int[] A, int i, int k,
                                        Set<List<Integer>> subarrays, List<Integer> out)
    {
        // do nothing for empty input
        if (A.length == 0) {
            return;
        }

        // base case: combination size is `k`
        if (k == 0) {
            subarrays.add(new ArrayList<>(out));
            return;
        }

        // return if no more elements are left
        if (i < 0) {
            return;
        }

        // include the current element in the current combination and recur
        out.add(A[i]);
        findCombinations(A, i - 1, k - 1, subarrays, out);

        // exclude the current element from the current combination
        out.remove(out.size() - 1);

        // exclude the current element from the current combination and recur
        findCombinations(A, i - 1, k, subarrays, out);
    }

    public static Set<List<Integer>> findCombinations(int[] A, int k)
    {
        Set<List<Integer>> subarrays = new HashSet<>();
        findCombinations(A, A.length - 1, k, subarrays, new ArrayList<>());
        return subarrays;
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 2, 3 };
        int k = 2;

        // process elements from right to left
        System.out.println(findCombinations(A, k));
    }
}
```

##

```python3
# Function to print all distinct combinations of length `k`
def findCombinations(A, i, k, subarrays, out=()):

    # do nothing for empty input
    if len(A) == 0:
        return

    # base case: combination size is `k`
    if k == 0:
        subarrays.add(out)
        return

    # return if no more elements are left
    if i < 0:
        return

    # include the current element in the current combination and recur
    findCombinations(A, i - 1, k - 1, subarrays, (A[i],) + out)

    # exclude the current element from the current combination and recur
    findCombinations(A, i - 1, k, subarrays, out)

if __name__ == '__main__':

    A = [1, 2, 3]
    k = 2

    # process elements from right to left
    subarrays = set()
    findCombinations(A, len(A) - 1, k, subarrays)
    print(subarrays)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
