# Introduction to Dynamic Programming

> Source: https://www.techiedelight.com/introduction-dynamic-programming/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Dynamic programming is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions using a memory-based data structure (array, map, etc.). Each subproblem solution is indexed in some way, typically based on its input parameters’ values, to facilitate its lookup. So, the next time the same subproblem occurs, instead of recomputing its solution, one looks up the previously computed solution, thereby saving computation time. This technique of storing solutions to subproblems instead of recomputing them is called memoization.

Here’s a brilliant explanation to [explain the concept behind dynamic programming to a kid](https://www.quora.com/How-should-I-explain-dynamic-programming-to-a-4-year-old/answer/Jonathan-Paulson).

`*writes down "1+1+1+1+1+1+1+1 =" on a sheet of paper* "What's that equal to?" *counting* "Eight!" *writes down another "1+" on the left* "What about that?" *quickly* "Nine!" "How'd you know it was nine so fast?" "You just added one more." "So you didn't need to recount because you remembered there were eight! Dynamic Programming is just a fancy way to say 'remembering stuff to save time later'"`

There are two key attributes that a problem must have for dynamic programming to be applicable: [optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure) and [overlapping subproblems](https://en.wikipedia.org/wiki/Overlapping_subproblems).

## 1\. Optimal substructure

Dynamic programming simplifies a complicated problem by breaking it down into simpler subproblems in a recursive manner. A problem that can be solved optimally by breaking it into subproblems and then recursively finding the optimal solutions to the subproblems is said to have an optimal substructure. In other words, the solution to a given optimization problem can be obtained by the combination of optimal solutions to its subproblems.

For example, the shortest path `p` from a vertex `u` to a vertex `v` in a given [graph](https://techiedelight.com/terminology-and-representations-of-graphs/) exhibits optimal substructure: take any intermediate vertex `w` on this shortest path `p`. If `p` is truly the shortest path, then it can be split into subpaths `p1` from `u` to `w` and `p2` from `w` to `v` such that these, in turn, are indeed the shortest paths between the corresponding vertices.

## 2\. Overlapping subproblems

A problem is said to have overlapping subproblems if the problem can be broken down into subproblems and each subproblem is repeated several times, or a recursive algorithm for the problem solves the same subproblem repeatedly rather than always generating new subproblems.

For example, the problem of computing the Fibonacci sequence exhibits overlapping subproblems. The problem of computing the `n'th` Fibonacci number `F(n)` can be broken down into the subproblems of computing `F(n-1)` and `F(n-2)`, and then adding the two. The subproblem of computing `F(n-1)` can itself be broken down into a subproblem that involves computing `F(n-2)`. Therefore, the computation of `F(n-2)` is reused, and the Fibonacci sequence thus exhibits overlapping subproblems. Dynamic programming takes account of this fact and solves each subproblem only once. This can be achieved in either of two ways:

  1. **Top-down approach (Memoization):** This is the direct fall-out of the recursive formulation of any problem. If the solution to any problem can be formulated recursively using the solution to its subproblems, and if its subproblems overlap, one can easily memoize or store the solutions to the subproblems in a table. Whenever we attempt to solve a new subproblem, first check the table to see if it is already solved. If the subproblem is already solved, use its solution directly; otherwise, solve the subproblem and add its solution to the table.
  2. **Bottom-up approach (Tabulation):** Once we formulate the solution to a problem recursively as in terms of its subproblems, we can try reformulating the problem in a bottom-up fashion: try solving the subproblems first and use their solutions to build-on and arrive at solutions to bigger subproblems. This is also usually done in a tabular form by iteratively generating solutions to bigger and bigger subproblems by using the solutions to small subproblems. For example, if we already know the values of `F(i-1)` and `F(i-2)`, we can directly calculate the value of `F(i)`.

If a problem can be solved by combining optimal solutions to non-overlapping subproblems, the strategy is called [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) instead. This is why [merge sort](https://techiedelight.com/merge-sort/) and [Quicksort](https://techiedelight.com/quicksort/) are not classified as dynamic programming problems.

Let’s consider a naive implementation of a function finding the `n'th` member of the Fibonacci sequence:

```
// Function to find n'th Fibonacci number
int fib(int n)
{
    if (n <= 1) {
        return n;
    }

    return fib(n - 1) + fib(n - 2);
}
```

Notice that if we call, say, `fib(5)`, we produce a call tree that calls the function on the same value many times:

In particular, `fib(3)` was calculated twice, and `fib(2)` was calculated three times from scratch. In larger examples, many more subproblems are recalculated, leading to an exponential-time algorithm.

Now, suppose we have a simple map object, `lookup`, which maps each value of `fib` that has already been calculated to its result, and we modify our function to use it and update it. The resulting function runs in O(n) time instead of exponential time (but requires O(n) space):

Following is the dynamic programming implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to find n'th Fibonacci number
int fib(int n, auto &lookup)
{
    if (n <= 1) {
        return n;
    }

    // if the subproblem is seen for the first time
    if (lookup.find(n) == lookup.end()) {
        lookup[n] = fib(n - 1, lookup) + fib(n - 2, lookup);
    }

    return lookup[n];
}

int main()
{
    unordered_map<int, int> lookup;

    cout << fib(8, lookup);

    return 0;
}
```

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find the n'th Fibonacci number
    public static int fib(int n, Map<Integer, Integer> lookup)
    {
        if (n <= 1) {
            return n;
        }

        // if the subproblem is seen for the first time
        if (!lookup.containsKey(n))
        {
            int val = fib(n - 1, lookup) + fib(n - 2, lookup);
            lookup.put(n, val);
        }

        return lookup.get(n);
    }

    public static void main(String[] args)
    {
        int n = 8;
        Map<Integer, Integer> lookup = new HashMap<>();

        System.out.println(fib(n, lookup));
    }
}
```

##

```python3
# Function to find the n'th Fibonacci number
def fib(n, lookup):

    if n <= 1:
        return n

    # if the subproblem is seen for the first time
    if n not in lookup:
        val = fib(n - 1, lookup) + fib(n - 2, lookup)
        lookup[n] = val

    return lookup[n]

if __name__ == '__main__':

    n = 8
    lookup = {}

    print(fib(n, lookup))
```

Note that we can also use an array instead of a map. Check implementation [here](https://techiedelight.com/compiler/?run=cNebNT).

As already discussed, this technique of saving values that have already been calculated is called memoization; this is the top-down approach since we first break the problem into subproblems and then calculate and store values.

In the bottom-up approach, we calculate the smaller values of `fib` first, then build larger values from them. This method also uses O(n) time since it contains a loop that repeats `n-1` times, but it only takes constant O(1) space, in contrast to the top-down approach, which requires O(n) space to store the map.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to find n'th Fibonacci number
int fib(int n)
{
    if (n <= 1) {
        return n;
    }

    int previousFib = 0, currentFib = 1;
    for (int i = 0; i < n - 1; i++)
    {
        int newFib = previousFib + currentFib;
        previousFib = currentFib;
        currentFib = newFib;
    }

    return currentFib;
}

int main()
{
    cout << fib(8);
    return 0;
}
```

**Output:** 21

##

```java
class Main
{
    // Function to find n'th Fibonacci number
    public static int fib(int n)
    {
        if (n <= 1) {
            return n;
        }

        int previousFib = 0, currentFib = 1;
        for (int i = 0; i < n - 1; i++)
        {
            int newFib = previousFib + currentFib;
            previousFib = currentFib;
            currentFib = newFib;
        }

        return currentFib;
    }

    public static void main(String[] args) {
        System.out.print(fib(8));
    }
}
```

##

```python3
# Function to find n'th Fibonacci number
def fib(n):

    if n <= 1:
        return n

    previousFib = 0
    currentFib = 1

    for i in range(n - 1):
        newFib = previousFib + currentFib
        previousFib = currentFib
        currentFib = newFib

    return currentFib

if __name__ == '__main__':

    print(fib(8))
```

In both examples, we only calculate `fib(2)` once and then use it to calculate both `fib(4)` and `fib(3)`, instead of computing it every time either of them is evaluated.

**Source:** <https://en.wikipedia.org/wiki/Dynamic_programming>

**Also See:**

> [Dynamic Programming – Interview Questions and Practice Problems](https://techiedelight.com/dynamic-programming-interview-questions/)
