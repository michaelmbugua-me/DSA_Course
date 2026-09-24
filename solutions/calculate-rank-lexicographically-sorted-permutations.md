# Lexicographic rank of a string

> Source: https://www.techiedelight.com/calculate-rank-lexicographically-sorted-permutations/

[String](https://www.techiedelight.com/Category/String/)

Given a string containing all distinct characters, calculate its rank among all its lexicographically sorted permutations.

For example, consider the following lexicographically sorted permutations:

Input : CBA Output: 6 Explanation: The rank of string DCBA in the lexicographically sorted permutations [ABC, ACB, BAC, BCA, CAB, CBA] is 6.

> 

A simple solution is to use [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) that generates the next greater lexicographic permutation of a string. The idea is to [sort the string](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and repeatedly calculate the lexicographic next permutation until the current permutation becomes equal to the given string.

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to find the lexicographic rank of a string using
// `std::next_permutation`
int findLexicographicRank(string key)
{
    string str = key;
    int rank = 1;        // rank starts from 1

    // sort the string in ascending order
    sort(str.begin(), str.end());

    while (1)
    {
        // if the current permutation is equal to the key, return its rank
        if (key == str) {
            return rank;
        }

        // find next lexicographically ordered permutation
        if (!next_permutation(str.begin(), str.end())) {
            break;
        }
        rank++;
    }
}

int main()
{
    string key = "DCBA";

    cout << "The lexicographic rank of " << key << " is "
         << findLexicographicRank(key);

    return 0;
}
```

**Output:** The lexicographic rank of DCBA is 24

The time complexity of the above solution is O(n.n!), where `n` is the length of the input string and doesn’t require any extra space.

Note that we can also use [std::prev_permutation](https://techiedelight.com/std_prev_permutation-overview-implementation/) replacing `std::next_permutation` that generates the next smaller lexicographic permutation of a string. The implementation can be seen [here](https://techiedelight.com/compiler/?run=hLfraB).

We can improve worst-case time complexity to O(n2) by finding the total number of characters ranked before the current character in the string. Let `c[i]` denotes count of smaller characters than `str[i]` to the right of index `i`. Then for the string of length `n`, there will be

  * `c[0]×(n-1)!` permutations ranked above the string’s first character.
  * `c[1]×(n-2)!` permutations ranked above the second character in the string.
  * `c[2]×(n-3)!` permutations ranked above the third character in the string, and so on…

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Iterative function to calculate factorial of a number
unsigned long factorial(int n)
{
    unsigned long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact = fact * i;
    }
    return fact;
}

// Function to find the lexicographic rank of a string
unsigned long findLexicographicRank(string str)
{
    // rank starts from 1
    unsigned long rank = 1;

    for (int i = 0; i < str.length() - 1; i++)
    {
        // count all smaller characters than `str[i]` to the right of `i`
        int count = 0;
        for (int j = i + 1; j < str.length(); j++)
        {
            if (str[i] > str[j]) {
                count++;
            }
        }

        // add the current count to the rank
        rank += count * factorial(str.length() - 1 - i);
    }

    return rank;
}

int main()
{
    string str = "DCBA";

    cout << "The lexicographic rank of " << str << " is "
         << findLexicographicRank(str);

    return 0;
}
```

**Output:** The lexicographic rank of DCBA is 24

##

```java
class Main
{
    // Iterative function to calculate factorial of a number
    public static long factorial(int n)
    {
        long fact = 1;
        for (int i = 1; i <= n; i++) {
            fact = fact * i;
        }
        return fact;
    }

    // Function to find the lexicographic rank of a string
    public static long findLexicographicRank(String str)
    {
        // base case
        if (str == null) {
            return 0;
        }

        // rank starts from 1
        long rank = 1;

        for (int i = 0; i < str.length() - 1; i++)
        {
            // count all smaller characters than `str[i]` to the right of `i`
            int count = 0;
            for (int j = i + 1; j < str.length(); j++)
            {
                if (str.charAt(i) > str.charAt(j)) {
                    count++;
                }
            }

            // add the current count to the rank
            rank += count * factorial(str.length() - 1 - i);
        }

        return rank;
    }

    public static void main(String[] args)
    {
        String str = "DCBA";

        System.out.println("The lexicographic rank of " + str + " is "
                + findLexicographicRank(str));
    }
}
```

##

```python3
# Iterative function to calculate factorial of a number
def factorial(n):
    fact = 1
    for i in range(1, n + 1):
        fact = fact * i
    return fact

# Function to find the lexicographic rank of a string
def findLexicographicRank(s):
    # rank starts from 1
    rank = 1

    for i in range(len(s) - 1):
        # count all smaller characters than `s[i]` to the right of `i`
        count = 0
        for j in range(i + 1, len(s)):
            if s[i] > s[j]:
                count += 1

        # add the current count to the rank
        rank += count * factorial(len(s) - 1 - i)

    return rank

if __name__ == '__main__':

    s = 'DCBA'
    print(f'The lexicographic rank of {s} is {findLexicographicRank(s)}')
```

The time complexity of the above solution is O(n2), where `n` is the length of the input string and doesn’t require any extra space.
