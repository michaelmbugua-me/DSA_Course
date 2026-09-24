# 3–Partition Problem

> Source: https://www.techiedelight.com/3-partition-problem/

3-partition problem: Given a set `S` of positive integers, determine if it can be partitioned into three disjoint subsets that all have the same sum, and they cover `S`.

The 3–partition problem is a special case of the [Partition Problem](https://techiedelight.com/partition-problem/), which is related to the [Subset Sum Problem](https://techiedelight.com/subset-sum-problem/) (which itself is a special case of the [Knapsack Problem](https://techiedelight.com/0-1-knapsack-problem/)). The goal is to partition `S` into two subsets with an equal sum in the partition problem. In the 3–partition problem, the goal is to partition `S` into 3 subsets with an equal sum.

For example,

`S = { 7, 3, 2, 1, 5, 4, 8 }`

We can partition `S` into three partitions, each having a sum of 10.

`S1 = { 7, 3 }` `S2 = { 5, 4, 1 }` `S3 = { 8, 2 }`

Note that there can be multiple solutions to a single set.

> 

We can start by calculating the sum of all `St` in the set. If `St` is not divisible by 3, we can’t divide the array into three subsets with an equal sum. If `St` is divisible by 3, check if 3 subsets with the sum of elements equal to `St/3` exists or not. We can find this by considering each item in the given array one by one, and for each item, there are three possibilities:

  1. Include the current item in the first subset and recur for the remaining items with the remaining sum.
  2. Include the current item in the second subset and recur for the remaining items with the remaining sum.
  3. Include the current item in the third subset and recur for the remaining items with the remaining sum.

The base case of the recursion would be when no items are left. We return true when 3 subsets, each with zero-sum, are found. We can optimize our code by calling case 2 only if case 1 doesn’t result in a solution, and case 3 only if case 1 and 2 don’t result in any solution.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

// Helper function for solving 3 partition problem.
// It returns true if there exist three subsets with a given sum
bool subsetSum(vector<int> const &S, int n, int a, int b, int c)
{
    // return true if the subset is found
    if (a == 0 && b == 0 && c == 0) {
        return true;
    }

    // base case: no items left
    if (n < 0) {
        return false;
    }

    // Case 1. The current item becomes part of the first subset
    bool A = false;
    if (a - S[n] >= 0) {
        A = subsetSum(S, n - 1, a - S[n], b, c);
    }

    // Case 2. The current item becomes part of the second subset
    bool B = false;
    if (!A && (b - S[n] >= 0)) {
        B = subsetSum(S, n - 1, a, b - S[n], c);
    }

    // Case 3. The current item becomes part of the third subset
    bool C = false;
    if ((!A && !B) && (c - S[n] >= 0)) {
        C = subsetSum(S, n - 1, a, b, c - S[n]);
    }

    // return true if we get a solution
    return A || B || C;
}

// Function for solving the 3–partition problem. It returns true if the given
// set `S[0…n-1]` can be divided into three subsets with an equal sum.
bool partition(vector<int> const &S)
{
    // total number of items in `S`
    int n = S.size();

    // base case
    if (n < 3) {
        return false;
    }

    // get the sum of all elements in the set
    int sum = accumulate(S.begin(), S.end(), 0);

    // return true if the sum is divisible by 3 and the set `S` can
    // be divided into three subsets with an equal sum
    return !(sum % 3) && subsetSum(S, n - 1, sum/3, sum/3, sum/3);
}

int main()
{
    // Input: a set of integers
    vector<int> S = { 7, 3, 2, 1, 5, 4, 8 };

    if (partition(S)) {
        cout << "Set can be partitioned";
    }
    else {
        cout << "Set cannot be partitioned";
    }

    return 0;
}
```

**Output:** Set can be partitioned

##

```java
import java.util.Arrays;

class Main
{
    // Helper function for solving 3 partition problem.
    // It returns true if there exist three subsets with the given sum
    public static boolean subsetSum(int[] S, int n, int a, int b, int c)
    {
        // return true if the subset is found
        if (a == 0 && b == 0 && c == 0) {
            return true;
        }

        // base case: no items left
        if (n < 0) {
            return false;
        }

        // Case 1. The current item becomes part of the first subset
        boolean A = false;
        if (a - S[n] >= 0) {
            A = subsetSum(S, n - 1, a - S[n], b, c);
        }

        // Case 2. The current item becomes part of the second subset
        boolean B = false;
        if (!A && (b - S[n] >= 0)) {
            B = subsetSum(S, n - 1, a, b - S[n], c);
        }

        // Case 3. The current item becomes part of the third subset
        boolean C = false;
        if ((!A && !B) && (c - S[n] >= 0)) {
            C = subsetSum(S, n - 1, a, b, c - S[n]);
        }

        // return true if we get a solution
        return A || B || C;
    }

    // Function for solving the 3–partition problem. It returns true if the given
    // set `S[0…n-1]` can be divided into three subsets with an equal sum.
    public static boolean partition(int[] S)
    {
        if (S.length < 3) {
            return false;
        }

        // get the sum of all elements in the set
        int sum = Arrays.stream(S).sum();

        // return true if the sum is divisible by 3 and the set `S` can
        // be divided into three subsets with an equal sum
        return (sum % 3) == 0 && subsetSum(S, S.length - 1, sum/3, sum/3, sum/3);
    }

    public static void main(String[] args)
    {
        // Input: a set of integers
        int[] S = { 7, 3, 2, 1, 5, 4, 8 };

        if (partition(S)) {
            System.out.println("Set can be partitioned");
        }
        else {
            System.out.println("Set cannot be partitioned");
        }
    }
}
```

##

```python3
# Helper function for solving 3 partition problem.
# It returns true if there exist three subsets with the given sum
def subsetSum(S, n, a, b, c):

    # return true if the subset is found
    if a == 0 and b == 0 and c == 0:
        return True

    # base case: no items left
    if n < 0:
        return False

    # Case 1. The current item becomes part of the first subset
    A = False
    if a - S[n] >= 0:
        A = subsetSum(S, n - 1, a - S[n], b, c)

    # Case 2. The current item becomes part of the second subset
    B = False
    if not A and (b - S[n] >= 0):
        B = subsetSum(S, n - 1, a, b - S[n], c)

    # Case 3. The current item becomes part of the third subset
    C = False
    if (not A and not B) and (c - S[n] >= 0):
        C = subsetSum(S, n - 1, a, b, c - S[n])

    # return true if we get the solution
    return A or B or C

# Function for solving the 3–partition problem. It returns true if the given
# set `S[0…n-1]` can be divided into three subsets with an equal sum.
def partition(S):

    if len(S) < 3:
        return False

    # get the sum of all elements in the set
    total = sum(S)

    # return true if the sum is divisible by 3 and the set `S` can
    # be divided into three subsets with an equal sum
    return (sum(S) % 3) == 0 and subsetSum(S, len(S) - 1, total//3, total//3, total//3)

if __name__ == '__main__':

    # Input: a set of integers
    S = [7, 3, 2, 1, 5, 4, 8]

    if partition(S):
        print('Set can be partitioned')
    else:
        print('Set cannot be partitioned')
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and also exhibits an [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), i.e., the problem can be split into smaller subproblems, and the same subproblem will get computed again and again. We can easily prove this by drawing a recursion tree of the above code for a huge input.

[Dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) can solve this problem by saving subproblem solutions in memory rather than computing them again and again. The following implementation in C++, Java, and Python demonstrates the top-down approach:

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <unordered_map>
using namespace std;

// Helper function for solving 3 partition problem.
// It returns true if there exist three subsets with the given sum
bool subsetSum(vector<int> const &S, int n, int a, int b, int c, auto &lookup)
{
    // return true if the subset is found
    if (a == 0 && b == 0 && c == 0) {
        return true;
    }

    // base case: no items left
    if (n < 0) {
        return false;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(a) + "|" + to_string(b) + "|" + to_string(c) +
                "|" + to_string(n);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // Case 1. The current item becomes part of the first subset
        bool A = false;
        if (a - S[n] >= 0) {
            A = subsetSum(S, n - 1, a - S[n], b, c, lookup);
        }

        // Case 2. The current item becomes part of the second subset
        bool B = false;
        if (!A && (b - S[n] >= 0)) {
            B = subsetSum(S, n - 1, a, b - S[n], c, lookup);
        }

        // Case 3. The current item becomes part of the third subset
        bool C = false;
        if ((!A && !B) && (c - S[n] >= 0)) {
            C = subsetSum(S, n - 1, a, b, c - S[n], lookup);
        }

        // return true if we get a solution
        lookup[key] = A || B || C;
    }

    // return the subproblem solution from the map
    return lookup[key];
}

// Function for solving the 3–partition problem. It returns true if the given
// set `S[0…n-1]` can be divided into three subsets with an equal sum.
bool partition(vector<int> const &S)
{
    // total number of items in `S`
    int n = S.size();

    // base case
    if (n < 3) {
        return false;
    }

    // create a map to store solutions to a subproblem
    unordered_map<string, bool> lookup;

    // get the sum of all elements in the set
    int sum = accumulate(S.begin(), S.end(), 0);

    // return true if the sum is divisible by 3 and the set `S` can
    // be divided into three subsets with an equal sum
    return !(sum % 3) && subsetSum(S, n - 1, sum/3, sum/3, sum/3, lookup);
}

int main()
{
    // Input: a set of integers
    vector<int> S = { 7, 3, 2, 1, 5, 4, 8 };

    if (partition(S)) {
        cout << "Set can be partitioned";
    }
    else {
        cout << "Set cannot be partitioned";
    }

    return 0;
}
```

**Output:** Set can be partitioned

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Helper function for solving 3 partition problem.
    // It returns true if there exist three subsets with the given sum
    public static boolean subsetSum(int[] S, int n, int a, int b, int c,
                                    Map<String, Boolean> lookup)
    {
        // return true if the subset is found
        if (a == 0 && b == 0 && c == 0) {
            return true;
        }

        // base case: no items left
        if (n < 0) {
            return false;
        }

        // construct a unique map key from dynamic elements of the input
        String key = a + "|" + b + "|" + c + "|" + n;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // Case 1. The current item becomes part of the first subset
            boolean A = false;
            if (a - S[n] >= 0) {
                A = subsetSum(S, n - 1, a - S[n], b, c, lookup);
            }

            // Case 2. The current item becomes part of the second subset
            boolean B = false;
            if (!A && (b - S[n] >= 0)) {
                B = subsetSum(S, n - 1, a, b - S[n], c, lookup);
            }

            // Case 3. The current item becomes part of the third subset
            boolean C = false;
            if ((!A && !B) && (c - S[n] >= 0)) {
                C = subsetSum(S, n - 1, a, b, c - S[n], lookup);
            }

            // return true if we get a solution
            lookup.put(key, A || B || C);
        }

        // return the subproblem solution from the map
        return lookup.get(key);
    }

    // Function for solving the 3–partition problem. It returns true if the given
    // set `S` can be divided into three subsets with an equal sum
    public static boolean partition(int[] S)
    {
        if (S.length < 3) {
            return false;
        }

        // create a map to store solutions to a subproblem
        Map<String, Boolean> lookup = new HashMap<>();

        // get the sum of all elements in the set
        int sum = Arrays.stream(S).sum();

        // return true if the sum is divisible by 3 and the set `S` can
        // be divided into three subsets with an equal sum
        return (sum % 3) == 0 && subsetSum(S, S.length - 1, sum/3,
                        sum/3, sum/3, lookup);
    }

    public static void main(String[] args)
    {
        // Input: a set of integers
        int[] S = { 7, 3, 2, 1, 5, 4, 8 };

        if (partition(S)) {
            System.out.println("Set can be partitioned");
        }
        else {
            System.out.println("Set cannot be partitioned");
        }
    }
}
```

##

```python3
# Function for solving the 3–partition problem.
# It returns true if there exist three subsets with the given sum
def subsetSum(S, n, a, b, c, lookup):

    # return true if the subset is found
    if a == 0 and b == 0 and c == 0:
        return True

    # base case: no items left
    if n < 0:
        return False

    # construct a unique key from dynamic elements of the input
    key = (a, b, c, n)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # Case 1. The current item becomes part of the first subset
        A = False
        if a - S[n] >= 0:
            A = subsetSum(S, n - 1, a - S[n], b, c, lookup)

        # Case 2. The current item becomes part of the second subset
        B = False
        if not A and (b - S[n] >= 0):
            B = subsetSum(S, n - 1, a, b - S[n], c, lookup)

        # Case 3. The current item becomes part of the third subset
        C = False
        if (not A and not B) and (c - S[n] >= 0):
            C = subsetSum(S, n - 1, a, b, c - S[n], lookup)

        # return true if we get a solution
        lookup[key] = A or B or C

    # return the subproblem solution from the dictionary
    return lookup[key]

# Function for solving the 3–partition problem. It returns true if the given
# set `S` can be divided into three subsets with an equal sum
def partition(S):

    if len(S) < 3:
        return False

    # create a dictionary to store solutions to a subproblem
    lookup = {}

    # get the sum of all elements in the set
    total = sum(S)

    # return true if the sum is divisible by 3 and the set `S` can
    # be divided into three subsets with an equal sum
    return (total % 3) == 0 and \
        subsetSum(S, len(S) - 1, total//3, total//3, total//3, lookup)

if __name__ == '__main__':

    # Input: a set of integers
    S = [7, 3, 2, 1, 5, 4, 8]

    if partition(S):
        print('Set can be partitioned')
    else:
        print('Set cannot be partitioned')
```

The time complexity of the above top-up solution is O(n × sum3) and requires O(n × sum3) extra space, where `n` is the size of the input and `sum` is the sum of all elements in the input.

**Exercise:** Extend the solution to [k-partitions](https://techiedelight.com/k-partition-problem-print-all-subsets/) and [print all partitions](https://techiedelight.com/3-partition-problem-extended-print-all-partitions/).
