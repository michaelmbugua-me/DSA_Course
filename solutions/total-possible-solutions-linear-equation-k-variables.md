# Total possible solutions to a linear equation of `k` variables

> Source: https://www.techiedelight.com/total-possible-solutions-linear-equation-k-variables/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a linear equation of `k` variables, count the total number of possible solutions to it.

For example,

**Input:** coeff = {1, 3, 5, 7}, rhs = 8 **Output:** The total number of solutions is 6 Above input represents the equation a + 3b + 5c + 7d = 8. ( a = 1, b = 0, c = 0, d = 1 ) ( a = 0, b = 1, c = 1, d = 0 ) ( a = 2, b = 2, c = 0, d = 0 ) ( a = 3, b = 0, c = 1, d = 0 ) ( a = 5, b = 1, c = 0, d = 0 ) ( a = 8, b = 0, c = 0, d = 0 ) **Input:** coeff = {1, 2, 3}, rhs = 4 **Output:** The total number of solutions is 4 Above input represents the equation x + 2y + 3z = 4. ( x = 1, y = 0, z = 1 ) ( x = 0, y = 2, z = 0 ) ( x = 2, y = 1, z = 0 ) ( x = 4, y = 0, z = 0 )

> 

The problem is similar to finding the [total number of ways to get the denomination of coins](https://techiedelight.com/coin-change-problem-find-total-number-ways-get-denomination-coins/). Here, coefficients of an equation can be considered coins denominations, and the RHS of an equation can be considered the desired change. Let’s begin by recursively defining the problem:

count(coeff, k, rhs) = count(coeff, k, rhs-coeff[k]) + count(coeff, k-1, rhs);

That is, for each coefficient of a variable.

  * Include current coefficient `coeff[k]` in solution and recur with remaining value `rhs-coeff[k]`.
  * Exclude current coefficient `coeff[k]` from the solution and recur for remaining coefficients `k-1`.

Finally, return total ways by including or excluding the current coefficient. The recursion’s base case is when the solution is found (i.e., rhs becomes 0), or the solution doesn’t exist (when no coefficients are left, or rhs becomes negative).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Function to count the total number of possible solutions to a
// linear equation of `k` variables
int count(int coeff[], int k, int rhs)
{
    // if rhs become 0, return 1 (solution found)
    if (rhs == 0) {
        return 1;
    }

    // return 0 (solution does not exist) if rhs becomes negative or
    // no coefficient is left
    if (rhs < 0 || k < 0) {
        return 0;
    }

    // Case 1. Include current coefficient `coeff[k]` in solution and
    // recur with remaining value `rhs-coeff[k]`

    int include = count(coeff, k, rhs - coeff[k]);

    // Case 2. Exclude current coefficient `coeff[k]` from solution and
    // recur for remaining coefficients `k-1`

    int exclude = count(coeff, k - 1, rhs);

    // return total ways by including or excluding the current coefficient
    return include + exclude;
}

int main()
{
    // `k` coefficients of the given equation
    int coeff[] = { 1, 2, 3 };
    int k = sizeof(coeff) / sizeof(coeff[0]);

    int rhs = 4;

    cout << "The total number of solutions is " << count(coeff, k - 1, rhs);

    return 0;
}
```

**Output:** The total number of solutions is 4

##

```java
class Main
{
    // Function to count the total number of possible solutions to a
    // linear equation of `k` variables
    public static int count(int[] coeff, int k, int rhs)
    {
        // if rhs become 0, a solution is found
        if (rhs == 0) {
            return 1;
        }

        // return 0 if rhs becomes negative or no coefficient is left
        if (rhs < 0 || k < 0) {
            return 0;
        }

        // Case 1. Include current coefficient `coeff[k]` in solution and
        // recur with remaining value `rhs-coeff[k]`
        int include = count(coeff, k, rhs - coeff[k]);

        // Case 2. Exclude current coefficient `coeff[k]` from solution and
        // recur for remaining coefficients `k-1`
        int exclude = count(coeff, k - 1, rhs);

        // return total ways by including or excluding the current coefficient
        return include + exclude;
    }

    public static void main (String[] args)
    {
        // `k` coefficients of the given equation
        int[] coeff = { 1, 2, 3 };
        int k = coeff.length;

        int rhs = 4;

        System.out.println("The total number of solutions is " +
            count(coeff, k - 1, rhs));
    }
}
```

##

```python3
# Function to count the total number of possible solutions to a
# linear equation of `k` variables
def count(coeff, k, rhs):

    # if rhs become 0, a solution is found
    if rhs == 0:
        return 1

    # return 0 if rhs becomes negative or no coefficient is left
    if rhs < 0 or k < 0:
        return 0

    # Case 1. Include current coefficient `coeff[k]` in solution and
    # recur with remaining value `rhs-coeff[k]`
    include = count(coeff, k, rhs - coeff[k])

    # Case 2. Exclude current coefficient `coeff[k]` from solution and
    # recur for remaining coefficients `k-1`
    exclude = count(coeff, k - 1, rhs)

    # return total ways by including or excluding the current coefficient
    return include + exclude

if __name__ == '__main__':

    # `k` coefficients of the given equation
    coeff = [1, 2, 3]
    k = len(coeff)

    rhs = 4
    print('The total number of solutions is', count(coeff, k - 1, rhs))
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The above solution has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) as it can be broken down into smaller subproblems. It also clearly displays [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), and we might end up solving the same subproblem repeatedly. The repeated subproblems can be seen by drawing the recursion tree for higher values of the desired change.

The problems having optimal substructure and overlapping subproblem can be solved using dynamic programming in which subproblem solutions are _memo_ ized rather than computed repeatedly. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to count the total number of possible solutions to a
// linear equation of `k` variables
int count(int coeff[], int k, int rhs, auto &lookup)
{
    // if rhs become 0, return 1 (solution found)
    if (rhs == 0) {
        return 1;
    }

    // return 0 (solution does not exist) if rhs becomes negative or
    // no coefficient is left
    if (rhs < 0 || k < 0) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(k) + "|" + to_string(rhs);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map

    if (lookup.find(key) == lookup.end())
    {
        int include = count(coeff, k, rhs - coeff[k], lookup);  // case 1

        int exclude = count(coeff, k - 1, rhs, lookup);         // case 2

        // assign total ways by including or excluding the current coefficient
        lookup[key] = include + exclude;
    }

    // return solution to the current subproblem
    return lookup[key];
}

int main()
{
    // `k` coefficients of the given equation
    int coeff[] = { 1, 2, 3 };
    int k = sizeof(coeff) / sizeof(coeff[0]);

    int rhs = 4;

    // create a map to store solutions to a subproblem
    unordered_map<string, int> lookup;

    cout << "The total number of solutions is " << count(coeff, k - 1, rhs, lookup);

    return 0;
}
```

**Output:** The total number of solutions is 4

##

```java
import java.util.Map;
import java.util.HashMap;

class Main
{
    // Function to count the total number of possible solutions to a
    // linear equation of `k` variables
    public static int count(int[] coeff, int k, int rhs, Map<String, Integer> lookup)
    {
        // if rhs become 0, a solution is found
        if (rhs == 0) {
            return 1;
        }

        // return 0 if rhs becomes negative or no coefficient is left
        if (rhs < 0 || k < 0) {
            return 0;
        }

        // construct a unique map key from dynamic elements of the input
        String key = k + "|" + rhs;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (lookup.get(key) == null)
        {
            int include = count(coeff, k, rhs - coeff[k], lookup);  // Case 1

            int exclude = count(coeff, k - 1, rhs, lookup);         // Case 2

            // return total ways by including or excluding the current coefficient
            lookup.put(key, include + exclude);
        }

        // return solution to the current subproblem
        return lookup.get(key);
    }

    public static void main (String[] args)
    {
        // `k` coefficients of the given equation
        int[] coeff = { 1, 2, 3 };
        int k = coeff.length;

        int rhs = 4;

        // create a map to store solutions to a subproblem
        Map<String, Integer> lookup = new HashMap<>();

        System.out.println("The total number of solutions is " +
                count(coeff, k - 1, rhs, lookup));
    }
}
```

##

```python3
# Function to count the total number of possible solutions to a
# linear equation of `k` variables
def count(coeff, k, rhs, lookup):

    # if rhs become 0, a solution is found
    if rhs == 0:
        return 1

    # return 0 if rhs becomes negative or no coefficient is left
    if rhs < 0 or k < 0:
        return 0

    # construct a unique key from dynamic elements of the input
    key = (k, rhs)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        include = count(coeff, k, rhs - coeff[k], lookup)   # Case 1
        exclude = count(coeff, k - 1, rhs, lookup)          # Case 2

        # return total ways by including or excluding the current coefficient
        lookup[key] = include + exclude

    # return solution to the current subproblem
    return lookup[key]

if __name__ == '__main__':

    # `k` coefficients of the given equation
    coeff = [1, 2, 3]
    k = len(coeff)

    rhs = 4

    # create a dictionary to store solutions to a subproblem
    lookup = {}

    print('The total number of solutions is', count(coeff, k - 1, rhs, lookup))
```

The time complexity of the above solution is O(k × rhs), and the auxiliary space used by the program is O(k × rhs).

We can even write a bottom-up version of the above memoized solution. The following code shows how to implement this in C, Java, and Python:

```c
#include <stdio.h>

int count(int coeff[], int k, int rhs)
{
    int T[k + 1][rhs + 1];

    for (int i = 0; i <= k; i++)
    {
        for (int j = 0; j <= rhs; j++)
        {
            if (i == 0) {
                T[i][j] = 0;
            }
            else if (j == 0) {
                T[i][j] = 1;
            }
            else if (coeff[i - 1] > j) {
                T[i][j] = T[i - 1][j];
            }
            else {
                T[i][j] = T[i - 1][j] + T[i][j - coeff[i - 1]];
            }
        }
    }

    return T[k][rhs];
}

int main(void)
{
    int coeff[] = {1, 3, 5, 7};
    int rhs = 8;

    int k = sizeof(coeff) / sizeof(coeff[0]);

    printf("The total number of solutions is %d", count(coeff, k, rhs));

    return 0;
}
```

**Output:** The total number of solutions is 6
