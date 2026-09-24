# Find all n-digit binary numbers without any consecutive 1’s

> Source: https://www.techiedelight.com/find-n-digit-binary-strings-without-consecutive-1s/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a positive integer `n`, count all n–digit binary numbers without any consecutive `1's`.

For example, for `n = 5`, the binary numbers that satisfy the given constraints are: `[00000, 00001, 00010, 00100, 00101, 01000, 01001, 01010, 10000, 10001, 10010, 10100, 10101]`.

> 

A simple solution would be to generate all n–digit integers and print only those integers that satisfy the given constraints. The complexity of this solution would be exponential.

A better solution is to generate only those n–digit integers that satisfy the given constraints. The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We append `0` and `1` to the partially formed number and recur with one less digit at each point in the recursion. Here, the trick is to append `1` and recur only if the last digit of the partially formed number is `0`. That way, we will never have any consecutive `1's` in the output string.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to count all n–digit binary numbers without any consecutive 1's
int countStrings(int n, int last_digit)
{
    // base case
    if (n == 0) {
        return 0;
    }

    // if only one digit is left
    if (n == 1)
    {
        if (last_digit) {   // if the last digit is 1
            return 1;
        }
        else {              // otherwise, if the last digit is 0
            return 2;
        }
    }

    // if the last digit is 0, we can have both 0 and 1 at the current position
    if (last_digit == 0) {
        return countStrings(n - 1, 0) + countStrings(n - 1, 1);
    }
    // if the last digit is 1, we can have only 0 at the current position
    else {
        return countStrings(n - 1, 0);
    }
}

int main()
{
    // total number of digits
    int n = 5;

    cout << "The total number of " << n << "–digit binary numbers without any "
        "consecutive 1's are " << countStrings(n, 0);

    return 0;
}
```

**Output:** The total number of 5–digit binary numbers without any consecutive 1’s is 13

##

```java
class Main
{
    // count all n–digit binary numbers without any consecutive 1's
    public static int countStrings(int n, int lastDigit)
    {
        // base case
        if (n == 0) {
            return 0;
        }

        // if only one digit is left
        if (n == 1) {
            return (lastDigit == 1) ? 1: 2;
        }

        // if the last digit is 0, we can have both 0 and 1 at the current position
        if (lastDigit == 0) {
            return countStrings(n - 1, 0) + countStrings(n - 1, 1);
        }
        // if the last digit is 1, we can have only 0 at the current position
        else {
            return countStrings(n - 1, 0);
        }
    }

    public static void main(String[] args)
    {
        // total number of digits
        int n = 5;

        System.out.println("The total number of " + n + "–digit binary numbers " +
                "without any consecutive 1's are " + countStrings(n, 0));
    }
}
```

##

```python3
# count all n–digit binary numbers without any consecutive 1's
def countStrings(n, lastDigit=0):

    # base case
    if n == 0:
        return 0

    # if only one digit is left
    if n == 1:
        return 1 if (lastDigit == 1) else 2

    # if the last digit is 0, we can have both 0 and 1 at the current position
    if lastDigit == 0:
        return countStrings(n - 1, 0) + countStrings(n - 1, 1)

    # if the last digit is 1, we can have only 0 at the current position
    else:
        return countStrings(n - 1, 0)

if __name__ == '__main__':

    # total number of digits
    n = 5

    print(f'The total number of {n}–digit binary numbers without any consecutive 1\'s'
        f' is {countStrings(n)}')
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are getting computed repeatedly. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly.

The algorithm can be implemented as follows in C++, Java, and Python, where we solve smaller subproblems first, then solve larger subproblems from them.

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to count all n–digit binary numbers without any consecutive 1's
int countStrings(int n)
{
    int T[n+1][2];

    T[0][0] = 0, T[0][1] = 0;        // no digit is left
    T[1][0] = 2, T[1][1] = 1;        // if only one digit is left

    for (int i = 2; i <= n; i++)
    {
        // if the last digit is 0, we can have both 0 and 1 at the current position
        T[i][0] = T[i-1][0] + T[i-1][1];

        // if the last digit is 1, we can have only 0 at the current position
        T[i][1] = T[i-1][0];
    }

    return T[n][0];

}

int main()
{
    // total number of digits
    int n = 5;

    cout << "The total number of " << n << "–digit binary numbers without any "
        "consecutive 1's are " << countStrings(n);

    return 0;
}
```

**Output:** The total number of 5–digit binary numbers without any consecutive 1’s is 13

##

```java
class Main
{
    // Function to count all n–digit binary numbers without any consecutive 1's
    public static int countStrings(int n)
    {
        int[][] T = new int[n+1][2];

        // if only one digit is left
        T[1][0] = 2;
        T[1][1] = 1;

        for (int i = 2; i <= n; i++)
        {
            // if the last digit is 0, we can have both 0 and 1 at the current position
            T[i][0] = T[i-1][0] + T[i-1][1];

            // if the last digit is 1, we can have only 0 at the current position
            T[i][1] = T[i-1][0];
        }

        return T[n][0];
    }

    public static void main(String[] args)
    {
        // total number of digits
        int n = 5;

        System.out.print("The total number of " + n + "–digit binary numbers " +
                "without any consecutive 1's are " + countStrings(n));
    }
}
```

##

```python3
# Function to count all n–digit binary numbers without any consecutive 1's
def countStrings(n):

    T = [[0 for x in range(2)] for y in range(n + 1)]

    # if only one digit is left
    T[1][0] = 2
    T[1][1] = 1

    for i in range(2, n + 1):

        # if the last digit is 0, we can have both 0 and 1 at the current position
        T[i][0] = T[i-1][0] + T[i-1][1]

        # if the last digit is 1, we can have only 0 at the current position
        T[i][1] = T[i-1][0]

    return T[n][0]

if __name__ == '__main__':

    # total number of digits
    n = 5

    print(f'The total number of {n}–digit binary numbers without any consecutive 1\'s'
        f' is {countStrings(n)}')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the total number of digits.

How to print all binary numbers?

The following recursive code in C++, Java, and Python prints all binary numbers as well:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to print all n–digit binary numbers without any consecutive 1's
void countStrings(int n, string out, int last_digit)
{
    // if the number becomes n–digit, print it
    if (n == 0)
    {
        cout << out << endl;
        return;
    }

    // append 0 to the result and recur with one less digit
    countStrings(n - 1, out + "0", 0);

    // append 1 to the result and recur with one less digit
    // only if the last digit is 0
    if (last_digit == 0) {
        countStrings(n - 1, out + "1", 1);
    }
}

int main()
{
    // total number of digits
    int n = 5;

    string out = "";
    countStrings(n, out, 0);

    return 0;
}
```

**Output:** 00000 00001 00010 00100 00101 01000 01001 01010 10000 10001 10010 10100 10101
