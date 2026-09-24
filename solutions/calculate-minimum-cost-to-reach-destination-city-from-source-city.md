# Calculate the minimum cost to reach the destination city from the source city

> Source: https://www.techiedelight.com/calculate-minimum-cost-to-reach-destination-city-from-source-city/

Given an `N × N` matrix of non-negative integers, where each cell of the matrix `(i, j)` indicates the direct flight cost from the city `i` to city `j`. Find the minimum cost to reach the destination city `N-1` from the source city 0.

For example,

**Input:** The cost matrix for 4 cities: [ 0 20 30 100 ] [ 20 0 15 75 ] [ 30 15 0 50 ] [ 100 75 50 0 ] **Output:** The minimum cost is 80. The minimum cost path is: city 0 —> city 2 (cost = 30) city 2 —> city 3 (cost = 50) **Input:** The cost matrix for 5 cities: [ 0 25 20 10 105 ] [ 20 0 15 80 80 ] [ 30 15 0 70 90 ] [ 10 10 50 0 100 ] [ 40 50 5 10 0 ] **Output:** The minimum cost is 100. The minimum cost path is: city 0 —> city 3 (cost = 10) city 3 —> city 1 (cost = 10) city 1 —> city 4 (cost = 80)

> 

The idea is to recur for all cities reachable from the source city and consider their minimum cost. The recurrence relation `T(0)` can be written as:

T(n) = minimum { T(i) + cost[i][n] } for all cities i between source city 0 and destination city n

i.e., the minimum cost `C(0, n)` to reach city `n` from city 0 is

C(0, n) = minimum(cost[0][n], C(0, 1) + cost[1][n], C(0, 2) + cost[2][n], … C(0, n-1) + cost[n-1][n] )

The time complexity of this solution would be exponential since we might end up computing the same subproblem repeatedly. We can use [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) to optimize the code since this problem exhibits both properties of dynamic programming, i.e., [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) and [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure).

The idea is to construct an auxiliary array `lookup[]` for storing the subproblem solutions where each element `lookup[i]` of the lookup table stores the minimum cost to reach city `i` from city 0.

The algorithm can be implemented as follows in C++, Java, and Python, where `lookup[]` is filled in a bottom-up fashion:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

// DP function to calculate the minimum cost to reach the destination city `n`
// from the source city 0
int findMinCost(vector<vector<int>> const &cost)
{
    // base case
    if (cost.size() == 0) {
        return 0;
    }

    // `N × N` matrix
    int N = cost.size();

    // `lookup[i]` stores the minimum cost to reach city `i` from city 0
    int lookup[N];

    // Initialize `lookup[]` with the direct ticket price from the source city
    for (int i = 0; i < N; i++) {
        lookup[i] = cost[0][i];
    }

    // repeat loop till `lookup[]` is filled with all minimum values
    bool is_filled = false;
    while (!is_filled)
    {
        is_filled = true;

        // fill `lookup[]` in a bottom-up manner
        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (lookup[i] > lookup[j] + cost[j][i])
                {
                    lookup[i] = lookup[j] + cost[j][i];
                    is_filled = false;        // mark lookup[] as NOT filled
                }
            }
        }
    }

    // return the minimum cost to reach city `N-1` from city 0
    return lookup[N-1];

}

int main()
{
    vector<vector<int>> cost =
    {
        { 0, 25, 20, 10, 105 },
        { 20, 0, 15, 80, 80 },
        { 30, 15, 0, 70, 90 },
        { 10, 10, 50, 0, 100 },
        { 40, 50, 5, 10, 0 }
    };

    cout << "The minimum cost is " << findMinCost(cost) << endl;

    return 0;
}
```

**Output:** The minimum cost is 100

##

```java
class Main
{
    // DP function to calculate the minimum cost to reach the destination city `n`
    // from the source city 0
    public static int findMinCost(int[][] cost)
    {
        // base case
        if (cost == null || cost.length == 0) {
            return 0;
        }

        // `N × N` matrix
        int N = cost.length;

        // `lookup[i]` stores the minimum cost to reach city `i` from city 0
        int[] lookup = new int[N];

        // Initialize `lookup[]` with the direct ticket price from the source city
        for (int i = 0; i < N; i++) {
            lookup[i] = cost[0][i];
        }

        // repeat loop till `lookup[]` is filled with all minimum values
        boolean isFilled = false;
        while (!isFilled)
        {
            isFilled = true;
            // fill `lookup[]` in a bottom-up manner
            for (int i = 0; i < N; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    if (lookup[i] > lookup[j] + cost[j][i])
                    {
                        lookup[i] = lookup[j] + cost[j][i];
                        isFilled = false;
                    }
                }
            }
        }

        // return the minimum cost to reach city `N-1` from city 0
        return lookup[N - 1];
    }

    public static void main(String[] args)
    {
        int[][] cost =
        {
            { 0, 25, 20, 10, 105 },
            { 20, 0, 15, 80, 80 },
            { 30, 15, 0, 70, 90 },
            { 10, 10, 50, 0, 100 },
            { 40, 50, 5, 10, 0 }
        };

        System.out.print("The minimum cost is " + findMinCost(cost));
    }
}
```

##

```python3
# DP function to calculate the minimum cost to reach the destination city `n`
# from the source city 0
def findMinCost(cost):

    # base case
    if not cost or not len(cost):
        return 0

    # `N × N` matrix
    N = len(cost)

    # `lookup[i]` stores the minimum cost to reach city `i` from city 0
    lookup = [None] * N

    # Initialize `lookup[]` with the direct ticket price from the source city
    for i in range(N):
        lookup[i] = cost[0][i]

    # repeat loop till `lookup[]` is filled with all minimum values
    isFilled = False
    while not isFilled:
        isFilled = True

        # fill `lookup[]` in a bottom-up manner
        for i in range(N):
            for j in range(N):
                if lookup[i] > lookup[j] + cost[j][i]:
                    lookup[i] = lookup[j] + cost[j][i]
                    isFilled = False

    # return the minimum cost to reach city `N-1` from city 0
    return lookup[N - 1]

if __name__ == '__main__':

    cost = [
        [0, 25, 20, 10, 105],
        [20, 0, 15, 80, 80],
        [30, 15, 0, 70, 90],
        [10, 10, 50, 0, 100],
        [40, 50, 5, 10, 0]
    ]

    print('The minimum cost is', findMinCost(cost))
```

The time complexity of the proposed solution is O(N3) for an `N × N` matrix. The auxiliary space required by the program is O(N).

Also See:

> [Find minimum jumps required to reach the destination](https://www.techiedelight.com/find-minimum-jumps-required-reach-destination/ "Find minimum jumps required to reach the destination")

> [Find minimum cost to reach the last cell of a matrix from its first cell](https://www.techiedelight.com/find-minimum-cost-reach-last-cell-matrix-first-cell/ "Find minimum cost to reach the last cell of a matrix from its first cell")

> [Count the number of paths in a matrix with a given cost to reach the destination cell](https://www.techiedelight.com/counting-paths-on-grid-to-reach-destination-cell/ "Count the number of paths in a matrix with a given cost to reach the destination cell")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 193

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
