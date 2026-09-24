# Print all distinct subsets of a given set

> Source: https://www.techiedelight.com/print-distinct-subsets-given-set/

Given a set `S`, generate all distinct subsets of it, i.e., find distinct power set of set `S`. A power set of any set `S` is the set of all subsets of `S`, including the empty set and `S` itself.

For example, if `S` is set `{_x_ , _y_ , _x_}`, then the subsets of `S` are:

  * {} (also known as the empty set or the null set).
  * {_x_}
  * {_y_}
  * {_x_}
  * {_x_ , _y_}
  * {_x_ , _x_}
  * {_y_ , _x_}
  * {_x_ , _y_ , _x_}

Therefore, distinct subsets in the power set of `S` are: `{{}, {_x_}, {_y_}, {_x_ , _y_}, {_x_ , _x_}, {_x_ , _y_ , _x_}}`.

> 

## Approach 1: Using Recursion

The problem is very similar to the [0/1 knapsack problem](https://techiedelight.com/0-1-knapsack-problem/), where for each element in set `S`, we have two options:

  1. Consider that element.
  2. Don’t consider that element.

The following solution generates all combinations of subsets using the above logic. To print only distinct subsets, initially [sort the subset](https://techiedelight.com/sort-array-ascending-order-cpp/) and exclude all adjacent duplicate elements from the subset along with the current element in case 2. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to print the elements of a vector
void printVector(vector<int> const &input)
{
    cout << "[";
    int n = input.size();
    for (int i: input) {
        cout << i;
        if (--n) {
            cout << ", ";
        }
    }
    cout << "]\n";
}

// Recursive function to print all distinct subsets of `S`.
// `S`   ——> input set
// `out` ——> vector to store subset
// `i`   ——> index of next element in set `S` to be processed
void printPowerSet(vector<int> &S, vector<int> &out, int i)
{
    // if all elements are processed, print the current subset
    if (i < 0)
    {
        printVector(out);
        return;
    }

    // include the current element in the current subset and recur
    out.push_back(S[i]);
    printPowerSet(S, out, i - 1);

    // backtrack: exclude the current element from the current subset
    out.pop_back();

    // remove adjacent duplicate elements
    while (S[i] == S[i-1]) {
        i--;
    }

    // exclude the current element from the current subset and recur
    printPowerSet(S, out, i - 1);
}

// Wrapper over `printPowerSet()` function
void findPowerSet(vector<int> S)        // no-ref, no-const
{
    // sort the set
    sort(S.begin(), S.end());

    // create an empty vector to store elements of a subset
    vector<int> out;
    printPowerSet(S, out, S.size() - 1);
}

int main()
{
    vector<int> S = { 1, 3, 1 };
    findPowerSet(S);

    return 0;
}
```

**Output:** [3, 1, 1] [3, 1] [3] [1, 1] [1] []

##

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Main
{
    // Recursive function to print all distinct subsets of `S`.
    // `S`   ——> input set
    // `out` ——> list to store subset
    // `i`   ——> index of next element in set `S` to be processed
    public static void printPowerSet(int[] S, Deque<Integer> out, int i)
    {
        // if all elements are processed, print the current subset
        if (i < 0)
        {
            System.out.println(out);
            return;
        }

        // include the current element in the current subset and recur
        out.addLast(S[i]);
        printPowerSet(S, out, i - 1);

        // backtrack: exclude the current element from the current subset
        out.pollLast();

        // remove adjacent duplicate elements
        while (i > 0 && S[i] == S[i - 1]) {
            i--;
        }

        // exclude the current element from the current subset and recur
        printPowerSet(S, out, i - 1);
    }

    // Wrapper over `printPowerSet()` function
    public static void findPowerSet(int[] S)
    {
        // sort the set
        Arrays.sort(S);

        // create an empty list to store elements of a subset
        Deque<Integer> out = new ArrayDeque<>();
        printPowerSet(S, out, S.length - 1);
    }

    public static void main(String[] args)
    {
        int[] S = { 1, 3, 1 };

        findPowerSet(S);
    }
}
```

##

```python3
from collections import deque

# Recursive function to print all distinct subsets of `S`.
# `S`   ——> input set
# `i`   ——> index of next element in set `S` to be processed
# `out` ——> list to store elements of a subset
def printPowerSet(S, i, out=deque()):

    # if all elements are processed, print the current subset
    if i < 0:
        print(list(out))
        return

    # include the current element in the current subset and recur
    out.append(S[i])
    printPowerSet(S, i - 1, out)

    # backtrack: exclude the current element from the current subset
    out.pop()

    # remove adjacent duplicate elements
    while i > 0 and S[i] == S[i - 1]:
        i = i - 1

    # exclude the current element from the current subset and recur
    printPowerSet(S, i - 1, out)

# Wrapper over `printPowerSet()` function
def findPowerSet(S):

    # sort the set
    S.sort()

    # print the power set
    printPowerSet(S, len(S) - 1)

if __name__ == '__main__':

    S = [1, 3, 1]

    findPowerSet(S)
```

The time complexity of the above solution is O(n.2n), where `n` is the size of the given set.

## Approach 2

For a given set `S`, the power set can be found by generating all binary numbers between 0 and `2n-1`, where `n` is the size of the set. For example, for set `S {_x_ , _y_ , _z_}`, generate binary numbers from 0 to `23-1` and for each number generated, the corresponding set can be found by considering set bits in the number.

  * 0 = 000 = {}
  * 1 = 001 = {_z_}
  * 2 = 010 = {_y_}
  * 3 = 011 = {_y_ , _z_}
  * 4 = 100 = {_x_}
  * 5 = 101 = {_x_ , _z_}
  * 6 = 110 = {_x_ , _y_}
  * 7 = 111 = {_x_ , _y_ , _z_}

To avoid printing duplicates subsets, initially sort the set. Also, insert each subset into the set. As the set maintains all distinct combinations, we will have unique subsets into the set. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <set>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// Function to print a given set
void printSet(vector<int> const &input)
{
    cout << "[";
    int n = input.size();
    for (int i: input) {
        cout << i;
        if (--n) {
            cout << ", ";
        }
    }
    cout << "]\n";
}

// Iterative function to find all distinct subsets of `S`
set<vector<int>> findPowerSet(vector<int> S)        // no-ref, no-const
{
    // `N` stores the total number of subsets
    int N = pow(2, S.size());

    // sort the set
    sort(S.begin(), S.end());

    set<vector<int>> powerset;

    // generate each subset one by one
    for (int i = 0; i < N; i++)
    {
        vector<int> set;

        // check every bit of `i`
        for (int j = 0; j < S.size(); j++)
        {
            // if j'th bit of `i` is set, append `S[j]` to the subset
            if (i & (1 << j)) {
                set.push_back(S[j]);
            }
        }

        // insert the subset into the powerset
        powerset.insert(set);
    }

    return powerset;
}

int main()
{
    vector<int> S = { 1, 2, 1 };

    // find powerset of set S
    set<vector<int>> powerset = findPowerSet(S);

    // print all subsets present in the powerset
    for (vector<int> subset: powerset) {
        printSet(subset);
    }

    return 0;
}
```

**Output:** [] [1] [1, 1] [1, 1, 2] [1, 2] [2]

##

```java
import java.util.*;

class Main
{
    // Iterative function to print all distinct subsets of `S`
    public static void findPowerSet(int[] S)
    {
        // `N` stores the total number of subsets
        int N = (int)Math.pow(2, S.length);
        Set<List<Integer>> set = new HashSet<>();

        // sort the set
        Arrays.sort(S);

        // generate each subset one by one
        for (int i = 0; i < N; i++)
        {
            List<Integer> subset = new ArrayList<>();

            // check every bit of `i`
            for (int j = 0; j < S.length; j++)
            {
                // if j'th bit of `i` is set, append `S[j]` to the subset
                if ((i & (1 << j)) != 0) {
                    subset.add(S[j]);
                }
            }

            // insert the subset into the set
            set.add(subset);
        }

        // print all subsets present in the set
        System.out.println(set);
    }

    public static void main(String[] args)
    {
        int[] S = { 1, 2, 1 };

        findPowerSet(S);
    }
}
```

##

```python3
# Iterative function to print all distinct subsets of `S`
def findPowerSet(S):

    # `N` stores the total number of subsets
    N = int(pow(2, len(S)))
    s = set()

    # sort the set
    S.sort()

    # generate each subset one by one
    for i in range(N):
        subset = []
        # check every bit of `i`
        for j in range(len(S)):
            # if j'th bit of `i` is set, append `S[j]` to the subset
            if i & (1 << j):
                subset.append(S[j])

        # insert the subset into the set
        s.add(tuple(subset))

    # print all subsets present in the set
    print(s)

if __name__ == '__main__':

    S = [1, 2, 1]
    findPowerSet(S)
```

The time complexity of the above solution is O(n.2n), where `n` is the size of the given set.
