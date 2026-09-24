# Find all distinct combinations of a given length – I

> Source: https://www.techiedelight.com/find-distinct-combinations-of-given-length/

Given an integer array, find all distinct combinations of a given length `k`.

For example,

**Input:** {2, 3, 4}, k = 2 **Output:** {2, 3}, {2, 4}, {3, 4} **Input:** {1, 2, 1}, k = 2 **Output:** {1, 2}, {1, 1}, {2, 1}

The program should print all the distinct combinations, while preserving the relative order of elements as they appear in the array.

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to add each element to the output and recur for the remaining items with one less element. To avoid printing permutations, construct each tuple in the same order as array elements. Then if the combination of the given size is found, print it.

The following solution in C++, Java, and Python generates all tuples using the above logic by traversing the array from left to right. To print only distinct combinations for inputs containing repeated elements, [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and exclude all adjacent duplicate elements from it.

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
    // invalid input
    if (arr.size() == 0 || k > arr.size()) {
        return;
    }

    // base case: combination size is `k`
    if (k == 0) {
        subarrays.insert(out);
        return;
    }

    // start from the next index till the last index
    for (int j = i; j < arr.size(); j++)
    {
        // add current element `arr[j]` to the solution and recur for next index
        // `j+1` with one less element `k-1`
        out.push_back(arr[j]);
        findCombinations(arr, j + 1, k - 1, subarrays, out);
        out.pop_back();        // backtrack
    }
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
                                        Set<List<Integer>> subarrays,
                                        List<Integer> out)
    {
        // invalid input
        if (A.length == 0 || k > A.length) {
            return;
        }

        // base case: combination size is `k`
        if (k == 0) {
            subarrays.add(new ArrayList<>(out));
            return;
        }

        // start from the next index till the last index
        for (int j = i; j < A.length; j++)
        {
            // add current element `A[j]` to the solution and recur for next index
            // `j+1` with one less element `k-1`
            out.add(A[j]);
            findCombinations(A, j + 1, k - 1, subarrays, out);
            out.remove(out.size() - 1);        // backtrack
        }
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

    # invalid input
    if len(A) == 0 or k > len(A):
        return

    # base case: combination size is `k`
    if k == 0:
        subarrays.add(out)
        return

    # start from the next index till the last index
    for j in range(i, len(A)):
        # add current element `A[j]` to the solution and recur for next index
        # `j+1` with one less element `k-1`
        findCombinations(A, k - 1, subarrays, out + (A[j],), j + 1)

if __name__ == '__main__':

    A = [1, 2, 3]
    k = 2

    subarrays = set()

    # process elements from left to right
    findCombinations(A, k, subarrays)
    print(subarrays)
```

We can also process the array elements from right to left. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <set>
#include <list>
#include <vector>
#include <experimental/iterator>
using namespace std;

// Function to print all distinct combinations of length `k`
void findCombinations(vector<int> const &arr, int n, int k,
                set<list<int>> &subarrays, list<int> &out)
{
    // invalid input
    if (arr.size() == 0 || k > n) {
        return;
    }

    // base case: combination size is `k`
    if (k == 0) {
        subarrays.insert(out);
        return;
    }

    // start from the next index till the first index
    for (int i = n - 1; i >= 0; i--)
    {
        // add current element `arr[i]` to the output and recur for next index
        // `i-1` with one less element `k-1`
        out.push_front(arr[i]);
        findCombinations(arr, i, k - 1, subarrays, out);
        out.pop_front();        // backtrack
    }
}

template <typename T>
void printList(list<T> const &input)
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
    set<list<int>> subarrays;

    // list to store a combination
    list<int> out;

    // process elements from right to left
    findCombinations(arr, arr.size(), k, subarrays, out);

    // print subarrays
    for (auto const &l: subarrays) {
        printList(l);
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
    public static void findCombinations(int[] A, int n, int k,
                                        Set<List<Integer>> subarrays,
                                        List<Integer> out)
    {
        // invalid input
        if (A.length == 0 || k > n) {
            return;
        }

        // base case: combination size is `k`
        if (k == 0) {
            subarrays.add(new ArrayList<>(out));
            return;
        }

        // start from the next index till the first index
        for (int i = n - 1; i >= 0; i--)
        {
            // add current element `A[i]` to the output and recur for next index
            // `i-1` with one less element `k-1`
            out.add(0, A[i]);
            findCombinations(A, i, k - 1, subarrays, out);
            out.remove(0);        // backtrack
        }
    }

    public static Set<List<Integer>> findCombinations(int[] A, int k)
    {
        Set<List<Integer>> subarrays = new HashSet<>();
        findCombinations(A, A.length, k, subarrays, new ArrayList<>());
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
def findCombinations(A, n, k, subarrays, out=()):

    # invalid input
    if len(A) == 0 or k > n:
        return

    # base case: combination size is `k`
    if k == 0:
        subarrays.add(out)
        return

    # start from the next index till the first index
    for i in reversed(range(n)):
        # add current element `A[i]` to the output and recur for next index
        # `i-1` with one less element `k-1`
        findCombinations(A, i, k - 1, subarrays, (A[i],) + out)

def getDistinctCombinations(A, k):
    subarrays = set()
    findCombinations(A, len(A), k, subarrays)
    return subarrays

if __name__ == '__main__':

    A = [1, 2, 3]
    k = 2

    # process elements from right to left
    subarrays = getDistinctCombinations(A, k)
    print(subarrays)
```

The time complexity of both above-discussed methods is exponential and requires additional space for the recursion (call stack).
