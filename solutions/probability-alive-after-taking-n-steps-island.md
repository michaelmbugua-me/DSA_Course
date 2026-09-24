# Find the probability that a person is alive after taking `n` steps on an island

> Source: https://www.techiedelight.com/probability-alive-after-taking-n-steps-island/

An island is in the form of a square matrix, and a person is standing inside the matrix. The person can move one step in any direction (right, left, top, down) in the matrix. Calculate the probability that the person is alive after walking `n` steps on the island, provided that the person dies on stepping outside the matrix.

For example,

**Input:** 2 × 2 matrix The starting coordinates is (0, 0) The total number of steps is 1 **Output:** The alive probability is 0.5 **Input:** 3 × 3 matrix The starting coordinates is (1, 1) The total number of steps is 1 **Output:** The alive probability is 1 **Input:** 3 × 3 matrix The starting coordinates is (0, 0) The total number of steps is 3 **Output:** The alive probability is 0.25

> 

The following solution assumes all steps carry equal probability, i.e., `1/4` or `0.25`. It can easily be modified to handle unequal probabilities.

We can easily solve this problem with the help of [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/). For given position `(x, y)` and remaining steps `n`, the main problem can easily be divided into subproblems:

Prob(x, y, n) = (Prob(x – 1, y, n – 1) + Prob(x + 1, y, n – 1) + Prob(x, y – 1, n – 1) + Prob(x, y + 1, n – 1)) / 4

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <map>
#include <string>
using namespace std;

// Find the probability that a person is alive after he walks `n` steps
// from location (x, y) on an `N × N` island
double aliveProbability(int N, int x, int y, int n, map<string, double> &dp)
{
    // base case
    if (n == 0) {
        return 1.0;
    }

    // calculate unique map key from current coordinates (x, y) of person
    // and number of steps(n) left
    string key = to_string(x) + "|" + to_string(y) + "|" + to_string(n);

    // if the subproblem is seen for the first time
    if (dp.find(key) == dp.end())
    {
        double p = 0.0;

        // move one step up
        if (x > 0) {
            p += 0.25 * aliveProbability(N, x - 1, y, n - 1, dp);
        }

        // move one step down
        if (x < N - 1) {
            p += 0.25 * aliveProbability(N, x + 1, y, n - 1, dp);
        }

        // move one step left
        if (y > 0) {
            p += 0.25 * aliveProbability(N, x, y - 1, n - 1, dp);
        }

        // move one step right
        if (y < N - 1) {
            p += 0.25 * aliveProbability(N, x, y + 1, n - 1, dp);
        }

        dp[key] = p;
    }

    return dp[key];
}

int main()
{
    int N = 3;          // `N × N` island
    int n = 3;          // total number of steps to be taken
    int x = 0, y = 0;   // starting coordinates

    // map to store solution to already computed subproblems
    map<string, double> dp;

    // calculate alive probability
    cout << "The alive probability is " << aliveProbability(N, x, y, n, dp);

    return 0;
}
```

**Output:** The alive probability is 0.25

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Find the probability that a person is alive after he walks `n` steps
    // from location (x, y) on an `N × N` island
    public static double aliveProbability(int N, int x, int y, int n, Map<String, Double> dp)
    {
        // base case
        if (n == 0) {
            return 1.0;
        }

        // calculate unique map key from current coordinates(x, y)
        // of person and number of steps(n) left
        String key = x + "|" + y + "|" + n;

        // if the subproblem is seen for the first time
        if (!dp.containsKey(key))
        {
            double p = 0.0;

            // move one step up
            if (x > 0) {
                p += 0.25 * aliveProbability(N, x - 1, y, n - 1, dp);
            }

            // move one step down
            if (x < N - 1) {
                p += 0.25 * aliveProbability(N, x + 1, y, n - 1, dp);
            }

            // move one step left
            if (y > 0) {
                p += 0.25 * aliveProbability(N, x, y - 1, n - 1, dp);
            }

            // move one step right
            if (y < N - 1) {
                p += 0.25 * aliveProbability(N, x, y + 1, n - 1, dp);
            }

            dp.put(key, p);
        }

        return dp.get(key);
    }

    public static void main(String[] args)
    {
        int N = 3;          // `N × N` island
        int n = 3;          // total number of steps to be taken
        int x = 0, y = 0;   // starting coordinates

        // map to store solution to already computed subproblems
        Map<String, Double> dp = new HashMap<>();

        // calculate the alive probability
        System.out.println("The alive probability is "
                + aliveProbability(N, x, y, n, dp));
    }
}
```

##

```python3
# Find the probability that a person is alive after he walks `n` steps
# from location (x, y) on an `N × N` island
def aliveProbability(N, x, y, n, dp):

    # base case
    if n == 0:
        return 1.0

    # calculate unique key from current coordinates (x, y) of person
    # and number of steps(n) left
    key = (x, y, n)

    # if the subproblem is seen for the first time
    if key not in dp:

        p = 0.0

        # move one step up
        if x > 0:
            p += 0.25 * aliveProbability(N, x - 1, y, n - 1, dp)

        # move one step down
        if x < N - 1:
            p += 0.25 * aliveProbability(N, x + 1, y, n - 1, dp)

        # move one step left
        if y > 0:
            p += 0.25 * aliveProbability(N, x, y - 1, n - 1, dp)

        # move one step right
        if y < N - 1:
            p += 0.25 * aliveProbability(N, x, y + 1, n - 1, dp)

        dp[key] = p

    return dp[key]

if __name__ == '__main__':

    N = 3           # `N × N` island
    n = 3           # total number of steps to be taken
    x = y = 0       # starting coordinates

    # dictionary to store solution to already computed subproblems
    dp = {}

    # calculate alive probability
    print("The alive probability is", aliveProbability(N, x, y, n, dp))
```

The time complexity of the proposed solution is O(N2) for an `N × N` matrix. The auxiliary space required by the program is O(N2).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 216

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Top-down](https://www.techiedelight.com/Tags/Memoization/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
