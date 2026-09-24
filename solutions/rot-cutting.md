# Rod Cutting Problem

> Source: https://www.techiedelight.com/rot-cutting/

Given a rod of length `n` and a list of rod prices of length `i`, where `1 <= i <= n`, find the optimal way to cut the rod into smaller rods to maximize profit.

For example, consider the following rod lengths and values:

**Input:** length[] = [1, 2, 3, 4, 5, 6, 7, 8] price[] = [1, 5, 8, 9, 10, 17, 17, 20] Rod length: 4 **Best:** Cut the rod into two pieces of length 2 each to gain revenue of 5 + 5 = 10 **Cut Profit** 4 9 1, 3 (1 + 8) = 9 2, 2 (5 + 5) = 10 3, 1 (8 + 1) = 9 1, 1, 2 (1 + 1 + 5) = 7 1, 2, 1 (1 + 5 + 1) = 7 2, 1, 1 (5 + 1 + 1) = 7 1, 1, 1, 1 (1 + 1 + 1 + 1) = 4

> 

We are given an array `price[]`, where the rod of length `i` has a value `price[i-1]`. The idea is simple – one by one, partition the given rod of length `n` into two parts: `i` and `n-i`. Recur for the rod of length `n-i` but don’t divide the rod of length `i` any further. Finally, take the maximum of all values. This yields the following recursive relation:

rodcut(n) = max { price[i – 1] + rodCut(n – i) } where 1 <= i <= n

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <climits>
using namespace std;

// Function to find the best way to cut a rod of length `n`
// where the rod of length `i` has a cost `price[i-1]`
int rodCut(int price[], int n)
{
    // base case
    if (n == 0) {
        return 0;
    }

    int maxValue = INT_MIN;

    // one by one, partition the given rod of length `n` into two parts
    // of length (1, n-1), (2, n-2), (3, n-3), … ,(n-1, 1), (n, 0)
    // and take maximum
    for (int i = 1; i <= n; i++)
    {
        // rod of length `i` has a cost `price[i-1]`
        int cost = price[i - 1] + rodCut(price, n - i);

        if (cost > maxValue) {
            maxValue = cost;
        }
    }

    return maxValue;
}

int main()
{
    int price[] = { 1, 5, 8, 9, 10, 17, 17, 20 };

    // rod length
    int n = 4;

    cout << "Profit is " << rodCut(price, n);

    return 0;
}
```

**Output:** Profit is 10

##

```java
class Main
{
    // Function to find the best way to cut a rod of length `n`
    // where the rod of length `i` has a cost `price[i-1]`
    public static int rodCut(int[] price, int n)
    {
        // base case
        if (n == 0) {
            return 0;
        }

        int maxValue = Integer.MIN_VALUE;

        // one by one, partition the given rod of length `n` into two parts of
        // length (1, n-1), (2, n-2), (3, n-3), … ,(n-1, 1), (n, 0) and
        // take maximum
        for (int i = 1; i <= n; i++)
        {
            // rod of length `i` has a cost `price[i-1]`
            int cost = price[i - 1] + rodCut(price, n - i);

            if (cost > maxValue) {
                maxValue = cost;
            }
        }

        return maxValue;
    }

    public static void main(String[] args)
    {
        int price[] = { 1, 5, 8, 9, 10, 17, 17, 20 };

        // rod length
        int n = 4;

        System.out.println("Profit is " + rodCut(price, n));
    }
}
```

##

```python3
import sys

# Function to find the best way to cut a rod of length `n`
# where the rod of length `i` has a cost `price[i-1]`
def rodCut(price, n):

    # base case
    if n == 0:
        return 0

    maxValue = -sys.maxsize

    # one by one, partition the given rod of length `n` into two parts of length
    # (1, n-1), (2, n-2), (3, n-3), … ,(n-1, 1), (n, 0) and take maximum
    for i in range(1, n + 1):

        # rod of length `i` has a cost `price[i-1]`
        cost = price[i - 1] + rodCut(price, n - i)

        if cost > maxValue:
            maxValue = cost

    return maxValue

if __name__ == '__main__':

    price = [1, 5, 8, 9, 10, 17, 17, 20]

    # rod length
    n = 4

    print('Profit is', rodCut(price, n))
```

The time complexity of the above solution is O(nn) and occupies space in the call stack, where `n` is the rod length.

We have seen that the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. So, the problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). Let’s consider a recursion tree for the rod of length 4.

As we can see, the same subproblems (highlighted in the same color) are getting computed repeatedly. So, the problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, where subproblem solutions are _memo_ ized rather than computed and again.

We will solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `T[i]`, which stores maximum profit achieved from the rod of length `i` for each `1 <= i <= n`. It uses the value of smaller values `i` already computed.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find the best way to cut a rod of length `n`
// where the rod of length `i` has a cost `price[i-1]`
int rodCut(int price[], int n)
{
    // `T[i]` stores the maximum profit achieved from a rod of length `i`
    int T[n + 1];

    // initialize maximum profit to 0
    for (int i = 0; i <= n; i++) {
        T[i] = 0;
    }

    // consider a rod of length `i`
    for (int i = 1; i <= n; i++)
    {
        // divide the rod of length `i` into two rods of length `j`
        // and `i-j` each and take maximum
        for (int j = 1; j <= i; j++) {
            T[i] = max(T[i], price[j - 1] + T[i - j]);
        }
    }

    // `T[n]` stores the maximum profit achieved from a rod of length `n`
    return T[n];
}

int main()
{
    int price[] = { 1, 5, 8, 9, 10, 17, 17, 20 };

    // rod length
    int n = 4;

    cout << "Profit is " << rodCut(price, n);

    return 0;
}
```

**Output:** Profit is 10

##

```java
class Main
{
    // Function to find the best way to cut a rod of length `n`
    // where the rod of length `i` has a cost `price[i-1]`
    public static int rodCut(int[] price, int n)
    {
        // `T[i]` stores the maximum profit achieved from a rod of length `i`
        int[] T = new int[n + 1];

        // consider a rod of length `i`
        for (int i = 1; i <= n; i++)
        {
            // divide the rod of length `i` into two rods of length `j`
            // and `i-j` each and take maximum
            for (int j = 1; j <= i; j++) {
                T[i] = Integer.max(T[i], price[j - 1] + T[i - j]);
            }
        }

        // `T[n]` stores the maximum profit achieved from a rod of length `n`
        return T[n];
    }

    public static void main(String[] args)
    {
        int[] price = { 1, 5, 8, 9, 10, 17, 17, 20 };
        int n = 4;        // rod length

        System.out.print("Profit is " + rodCut(price, n));
    }
}
```

##

```python3
# Function to find the best way to cut a rod of length `n`
# where the rod of length `i` has a cost `price[i-1]`
def rodCut(price, n):

    # `T[i]` stores the maximum profit achieved from a rod of length `i`
    T = [0] * (n + 1)

    # consider a rod of length `i`
    for i in range(1, n + 1):
        # divide the rod of length `i` into two rods of length `j`
        # and `i-j` each and take maximum
        for j in range(1, i + 1):
            T[i] = max(T[i], price[j - 1] + T[i - j])

    # `T[n]` stores the maximum profit achieved from a rod of length `n`
    return T[n]

if __name__ == '__main__':

    price = [1, 5, 8, 9, 10, 17, 17, 20]
    n = 4        # rod length

    print('Profit is', rodCut(price, n))
```

The time complexity of the above bottom-up solution is O(n2) and requires O(n) extra space, where `n` is the rod length.

**References:** <https://sites.radford.edu/~nokie/classes/360/dp-rod-cutting.html>
