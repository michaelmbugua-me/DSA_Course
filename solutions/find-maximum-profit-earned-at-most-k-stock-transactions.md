# Find maximum profit earned from at most `k` stock transactions

> Source: https://www.techiedelight.com/find-maximum-profit-earned-at-most-k-stock-transactions/

Given a list containing future predictions of share prices, find the maximum profit earned by buying and selling shares at most `k` times with a constraint that a new transaction can only start after the previous transaction is complete, i.e., we can only hold at most one share at a time.

For example,

**Input:** Stock Price: {2, 4, 7, 5, 4, 3, 5} k = 2 **Output:** The maximum profit is 7 (sum of 5 and 2) Buy at a price 2 and sell at a price 7 Buy at a price 3 and sell at a price 5 **Input:** Stock Price: {1, 5, 2, 3, 7, 6, 4, 5} k = 3 **Output:** The maximum profit is 10 (sum of 4, 5 and 1) Buy at a price 1 and sell at a price 5 Buy at a price 2 and sell at a price 7 Buy at a price 4 and sell at a price 5 **Input:** Stock Price: {10, 6, 8, 4, 2} k = 2 **Output:** The maximum profit is 2 Buy at a price 6 and sell at a price 8 **Input:** Stock Price: {10, 8, 6, 5, 4, 2} k = 1 **Output:** The maximum profit is 0

> 

There are several variations to the above problem:

  1. If we are allowed to stock only once, then we can [find the maximum difference between two elements in the array](https://techiedelight.com/find-maximum-difference-between-two-elements-array/), where the smaller element appears before the larger element.
  2. If we are allowed to stock shares at most twice, we can follow the approach discussed [here](https://techiedelight.com/find-maximum-profit-earned-from-at most-two-stock-transactions/).
  3. If we are allowed to stock shares any number of times, we can follow the approach discussed [here](https://techiedelight.com/maximum-profit-earned-buying-and-selling-shares/).

Now we are only allowed to make at most `k` stock transactions. We can solve the problem by using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/). Let `T[t][i]` be the maximum profit using most `t` transactions till the `i'th` day. Then `T[i]` can be written as:

T[t][i] = max(T[t][i-1], max(price[i] – price[j] + T[t-1][j])) where j varies from 0 to i-1

The above relation states that `T[t][i]` would be a maximum of below:

  1. `T[t][i-1]`, which represents not doing any transaction on the `i'th` day.
  2. Maximum profit gained by selling on the `i'th` day. To sell shares on the `i'th` day, we need to purchase them on any previous day. If we buy shares on the `j'th` day and sell it on the `i'th` day, the maximum profit will be `price[i] - price[j] + T[t-1][j]`, where `j` varies from 0 to `i-1` and `T[t-1][j]` is the best with one less transaction till the `j'th` day.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Find maximum profit earned from at most `k` stock transactions.
// Input to the function is stock prices of `n` days and positive number `k`
int findMaxProfit(vector<int> const &price, int k)
{
    // get the number of days `n`
    int n = price.size();

    // base case
    if (n <= 1) {
        return 0;
    }

    // profit[i][j] stores the maximum profit gained by doing
    // at most `i` transactions till j'th day
    int profit[k+1][n];

    // fill profit[][] in a bottom-up fashion
    for (int i = 0; i <= k; i++)
    {
        for (int j = 0; j < n; j++)
        {
            // profit is 0 when:
            // i = 0, i.e., for 0th day
            // j = 0, i.e., no transaction is being performed

            if (i == 0 || j == 0) {
                profit[i][j] = 0;
            }
            else {
                int max_so_far = 0;
                for (int k = 0; k < j; k++)
                {
                    int curr_price = price[j] - price[k] + profit[i-1][k];
                    if (max_so_far < curr_price) {
                        max_so_far = curr_price;
                    }
                }

                profit[i][j] = max(profit[i][j-1], max_so_far);
            }
        }
    }

    return profit[k][n-1];
}

int main()
{
    vector<int> price = { 1, 5, 2, 3, 7, 6, 4, 5 };
    int k = 3;

    cout << "The maximum possible profit is " << findMaxProfit(price, k);

    return 0;
}
```

**Output:** The maximum possible profit is 10

##

```java
class Main
{
    // Find maximum profit earned from at most `k` stock transactions.
    // Input to the function is stock prices of `n` days and positive number `k`
    public static int findMaxProfit(int[] price, int k)
    {
        // get the number of days `n`
        int n = price.length;

        // base case
        if (n <= 1) {
            return 0;
        }

        // profit[i][j] stores the maximum profit gained by doing
        // at most `i` transactions till j'th day
        int[][] profit = new int[k + 1][n];

        // fill profit[][] in a bottom-up fashion
        for (int i = 0; i <= k; i++)
        {
            for (int j = 0; j < n; j++)
            {
                // profit is 0 when:
                // i = 0, i.e., for 0th day
                // j = 0, i.e., no transaction is being performed

                if (i == 0 || j == 0) {
                    profit[i][j] = 0;
                }
                else {
                    int max_so_far = 0;
                    for (int x = 0; x < j; x++)
                    {
                        int curr_price = price[j] - price[x] + profit[i-1][x];
                        if (max_so_far < curr_price) {
                            max_so_far = curr_price;
                        }
                    }

                    profit[i][j] = Math.max(profit[i][j-1], max_so_far);
                }
            }
        }

        return profit[k][n-1];
    }

    public static void main(String[] args)
    {
        int[] price = { 1, 5, 2, 3, 7, 6, 4, 5 };
        int k = 3;

        System.out.println("The maximum possible profit is " + findMaxProfit(price, k));
    }
}
```

##

```python3
# Find maximum profit earned from at most `k` stock transactions.
# Input to the function is stock prices of `n` days and positive number `k`
def findMaxProfit(price, k):

    # get the number of days `n`
    n = len(price)

    # base case
    if n <= 1:
        return 0

    # profit[i][j] stores the maximum profit gained by doing
    # at most `i` transactions till j'th day
    profit = [[0 for x in range(n)] for y in range(k + 1)]

    # fill profit[][] in a bottom-up fashion
    for i in range(k + 1):
        for j in range(n):
            # profit is 0 when
            # i = 0, i.e., for 0th day
            # j = 0, i.e., no transaction is being performed

            if i == 0 or j == 0:
                profit[i][j] = 0
            else:
                max_so_far = 0
                for x in range(j):
                    curr_price = price[j] - price[x] + profit[i-1][x]
                    if max_so_far < curr_price:
                        max_so_far = curr_price

                profit[i][j] = max(profit[i][j-1], max_so_far)

    return profit[k][n-1]

if __name__ == '__main__':

    price = [1, 5, 2, 3, 7, 6, 4, 5]
    k = 3

    print('The maximum possible profit is', findMaxProfit(price, k))
```

The time complexity of the above solution is O(n2k) and requires O(n.k) extra space, where `n` is the total number of given days and `k` is the maximum number of allowed stock transactions. We can easily optimize the code to run in O(n.k) time if we can calculate the maximum profit gained by selling shares on the `i'th` day in constant time.

## Optimized Solution

We have already seen that `T[i]` can be written as:

T[t][i] = max(T[t][i-1], max(price[i] – price[j] + T[t-1][j])) where j varies from 0 to i-1

If we carefully notice, `max(price[i] - price[j] + T[t-1][j])` can be rewritten as,

= price[i] + max(T[t-1][j] – price[j]), where j varies from 0 to i-1 = price[i] + max(prev_diff, T[t-1][i-1] – price[i-1]) where prev_diff is max(T[t-1][j] – price[j]) and j varies from 0 to i-2

Since we have already calculated `max(T[t-1][j] - price[j])` for every `j` within range `[0, i-2]`, we can easily calculate it for `j=i-1` in O(1) time. In other words, we don’t have to revisit range `[0, i-1]` to figure out the best day for buying stock. This can be determined in O(1) time using the following revised relation:

T[t][i] = max(T[t][i-1], price[i] + max(prev_diff, T[t-1][i-1] – price[i-1])) where prev_diff is max(T[t-1][j] – price[j]) and j varies from 0 to i-2

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

// Find maximum profit earned from at most `k` stock transactions.
// Input to the function is stock prices of `n` days and positive number `k`
int findMaxProfit(vector<int> const &price, int k)
{
    // get the number of days `n`
    int n = price.size();

    // base case
    if (n <= 1) {
        return 0;
    }

    // profit[i][j] stores the maximum profit gained by doing
    // at most `i` transactions till j'th day
    int profit[k+1][n+1];

    // fill profit[][] in a bottom-up fashion
    for (int i = 0; i <= k; i++)
    {
        // initialize `prev` diff to `-INFINITY`
        int prev_diff = INT_MIN;

        for (int j = 0; j < n; j++)
        {
            // profit is 0 when:
            // i = 0, i.e., for 0th day
            // j = 0, i.e., no transaction is being performed

            if (i == 0 || j == 0) {
                profit[i][j] = 0;
            }
            else {
                prev_diff = max(prev_diff, profit[i-1][j-1] - price[j-1]);
                profit[i][j] = max(profit[i][j-1], price[j] + prev_diff);
            }
        }
    }

    return profit[k][n - 1];
}

int main()
{
    vector<int> price = { 1, 5, 2, 3, 7, 6, 4, 5 };
    int k = 3;

    cout << "The maximum possible profit is " << findMaxProfit(price, k);

    return 0;
}
```

**Output:** The maximum possible profit is 10

##

```java
class Main
{
    // Find maximum profit earned from at most `k` stock transactions.
    // Input to the function is stock prices of `n` days and positive number `k`
    public static int findMaxProfit(int[] price, int k)
    {
        // get the number of days `n`
        int n = price.length;

        // base case
        if (n <= 1) {
            return 0;
        }

        // profit[i][j] stores the maximum profit gained by doing
        // at most `i` transactions till j'th day
        int[][] profit = new int[k+1][n+1];

        // fill profit[][] in a bottom-up fashion
        for (int i = 0; i <= k; i++)
        {
            // initialize `prev` diff to
            int prev_diff = Integer.MIN_VALUE;

            for (int j = 0; j < n; j++)
            {
                // profit is 0 when:
                // i = 0, i.e., for 0th day
                // j = 0, i.e., no transaction is being performed
                if (i == 0 || j == 0) {
                    profit[i][j] = 0;
                }
                else {
                    prev_diff = Math.max(prev_diff, profit[i-1][j-1] - price[j-1]);
                    profit[i][j] = Math.max(profit[i][j-1], price[j] + prev_diff);
                }
            }
        }

        return profit[k][n - 1];
    }

    public static void main(String[] args)
    {
        int[] price = {1, 5, 2, 3, 7, 6, 4, 5};
        int k = 3;

        System.out.println("The maximum possible profit is " + findMaxProfit(price, k));
    }
}
```

##

```python3
import sys

# Find maximum profit earned from at most `k` stock transactions.
# Input to the function is stock prices of `n` days and positive number `k`
def findMaxProfit(price, k):

    # get the number of days `n`
    n = len(price)

    # base case
    if n <= 1:
        return 0

    # profit[i][j] stores the maximum profit gained by doing
    # at most `i` transactions till j'th day
    profit = [[0 for x in range(n + 1)] for y in range(k + 1)]

    # fill profit[][] in a bottom-up fashion
    for i in range(k + 1):

        # initialize `prev` diff to `-INFINITY`
        prev_diff = -sys.maxsize

        for j in range(n):

            # profit is 0 when
            # i = 0, i.e., for 0th day
            # j = 0, i.e., no transaction is being performed
            if i == 0 or j == 0:
                profit[i][j] = 0
            else:
                prev_diff = max(prev_diff, profit[i-1][j-1] - price[j-1])
                profit[i][j] = max(profit[i][j-1], price[j] + prev_diff)

    return profit[k][n - 1]

if __name__ == '__main__':

    price = [1, 5, 2, 3, 7, 6, 4, 5]
    k = 3

    print('The maximum possible profit is', findMaxProfit(price, k))
```

The time complexity of the above solution is O(n.k) and requires O(n.k) extra space, where `n` is the total number of given days and `k` is the maximum number of allowed stock transactions. The space complexity can be further reduced to O(n) since we only need results from the last transaction.

**Author:** Aditya Goel
