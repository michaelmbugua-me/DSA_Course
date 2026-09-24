# Generate the power set of a given set

> Source: https://www.techiedelight.com/generate-power-set-given-set/

Given a set `S`, generate all subsets of it, i.e., find the power set of set `S`. A power set of any set `S` is the set of all subsets of `S`, including the empty set and `S` itself.

For example, if `S` is the set `{_x_ , _y_ , _z_}`, then the subsets of `S` are:

  * {} (also known as the empty set or the null set).
  * {_x_}
  * {_y_}
  * {_z_}
  * {_x_ , _y_}
  * {_x_ , _z_}
  * {_y_ , _z_}
  * {_x_ , _y_ , _z_}

Hence, the power set of `S` is `{{}, {_x_}, {_y_}, {_z_}, {_x_ , _y_}, {_x_ , _z_}, {_y_ , _z_}, {_x_ , _y_ , _z_}}`.

> 

## Approach 1: (Using Recursion)

The problem is very similar to the [0/1 knapsack problem](https://techiedelight.com/0-1-knapsack-problem/), where for each element in set `S`, we have two choices:

  1. Consider that element.
  2. Don’t consider that element.

All combinations of subsets can be generated as follows in C++, Java, and Python, using the above logic:

```cpp
#include <iostream>
#include <vector>
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

// Function to generate power set of a given set `S`
void printPowerSet(vector<int> const &S, vector<int> &set, int n)
{
    // if we have considered all elements
    if (n == 0)
    {
        printSet(set);
        return;
    }

    // consider the n'th element
    set.push_back(S[n - 1]);
    printPowerSet(S, set, n - 1);

    set.pop_back();                    // backtrack

    // or don't consider the n'th element
    printPowerSet(S, set, n - 1);
}

// Wrapper over `printPowerSet()` function
void findPowerSet(vector<int> const &S)        // no-ref, no-const
{
    // create an empty vector to store elements of a subset
    vector<int> set;
    printPowerSet(S, set, S.size());
}

int main()
{
    vector<int> S = { 1, 2, 3 };

    findPowerSet(S);

    return 0;
}
```

**Output:** [3, 2, 1] [3, 2] [3, 1] [3] [2, 1] [2] [1] []

##

```java
import java.util.ArrayDeque;
import java.util.Deque;

class Main
{
    // Function to generate power set of a given set `S`
    public static void findPowerSet(int[] S, Deque<Integer> set, int n)
    {
        // if we have considered all elements
        if (n == 0)
        {
            System.out.println(set);
            return;
        }

        // consider the n'th element
        set.addLast(S[n - 1]);
        findPowerSet(S, set, n - 1);

        set.removeLast();                    // backtrack

        // or don't consider the n'th element
        findPowerSet(S, set, n - 1);
    }

    public static void main(String[] args)
    {
        int[] S = { 1, 2, 3 };

        Deque<Integer> set = new ArrayDeque<>();
        findPowerSet(S, set, S.length);
    }
}
```

##

```python3
from collections import deque

# Function to generate a power set of given set `S`
def findPowerSet(S, s, n):

    # if we have considered all elements
    if n == 0:
        print(s)
        return

    # consider the n'th element
    s.append(S[n - 1])
    findPowerSet(S, s, n - 1)

    s.pop()                    # backtrack

    # or don't consider the n'th element
    findPowerSet(S, s, n - 1)

if __name__ == '__main__':

    S = [1, 2, 3]

    s = []
    findPowerSet(S, s, len(S))
```

## Approach 2

For a given set `S`, the power set can be found by generating all binary numbers between `0` and `2n-1`, where `n` is the size of the set.

For example, for the set `S {_x_ , _y_ , _z_}`, generate binary numbers from `0` to `23-1` and for each number generated, the corresponding set can be found by considering set bits in the number.

  * 0 = 000 = {}
  * 1 = 001 = {_z_}
  * 2 = 010 = {_y_}
  * 3 = 011 = {_y_ , _z_}
  * 4 = 100 = {_x_}
  * 5 = 101 = {_x_ , _z_}
  * 6 = 110 = {_x_ , _y_}
  * 7 = 111 = {_x_ , _y_ , _z_}

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
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

void findPowerSet(vector<int> const &S)
{
    // `N` stores the total number of subsets
    int N = pow(2, S.size());

    // generate each subset one by one
    for (int i = 0; i < N; i++)
    {
        vector<int> input;
        // check every bit of `i`
        for (int j = 0; j < S.size(); j++)
        {
            // if j'th bit of `i` is set, print `S[j]`
            if (i & (1 << j)) {
                input.push_back(S[j]);
            }
        }
        printSet(input);
    }
}

int main()
{
    vector<int> S = { 1, 2, 3 };

    findPowerSet(S);

    return 0;
}
```

**Output:** [] [1] [2] [1, 2] [3] [1, 3] [2, 3] [1, 2, 3]

##

```java
import java.util.ArrayList;
import java.util.List;

class Main
{
    public static void findPowerSet(int[] S)
    {
        // `N` stores the total number of subsets
        int N = (int) Math.pow(2, S.length);

        // generate each subset one by one
        for (int i = 0; i < N; i++)
        {
            List<Integer> set = new ArrayList<>();

            // check every bit of `i`
            for (int j = 0; j < S.length; j++)
            {
                // if j'th bit of `i` is set, print `S[j]`
                if ((i & (1 << j)) != 0) {
                    set.add(S[j]);
                }
            }
            System.out.println(set);
        }
    }

    public static void main(String[] args)
    {
        int[] S = { 1, 2, 3 };
        findPowerSet(S);
    }
}
```

##

```python3
def findPowerSet(S):

    # `N` stores the total number of subsets
    N = int(pow(2, len(S)))
    s = list()

    # generate each subset one by one
    for i in range(N):
        # check every bit of `i`
        for j in range(len(S)):
            # if j'th bit of `i` is set, print `S[j]`
            if i & (1 << j):
                s.append(S[j])

        print(s)
        s.clear()

if __name__ == '__main__':

    S = [1, 2, 3]
    findPowerSet(S)
```

The time complexity of both above-discussed methods is O(n.2n), where `n` is the size of the given set.

**References:** <https://en.wikipedia.org/wiki/Power_set>
