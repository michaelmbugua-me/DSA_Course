# Find all permutations of a string in C++ (Using Backtracking and STL)

> Source: https://www.techiedelight.com/find-permutations-given-string/

This post will find all permutations of a string containing all distinct characters in C++.

For example, the string `ABC` has 6 permutations, i.e., `ABC, ACB, BAC, BCA, CBA, CAB`.

> 

## Approach 1: (Using Backtracking)

We can [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) find all permutations of the given string by using [backtracking](https://techiedelight.com/backtracking-interview-questions/). The idea is to swap each of the remaining characters in the string with its first character and then find all the permutations of the remaining characters using a recursive call. The base case of the recursion is when the string is left with only one unprocessed element. Following is the recursion tree for printing all permutations of the string `ABC`:

```
#include <iostream>
using namespace std;

// Function to find all permutations of a given string `str[i…n-1]`
// containing all distinct characters
void permutations(string str, int i, int n)
{
    // base condition
    if (i == n - 1)
    {
        cout << str << endl;
        return;
    }

    // process each character of the remaining string
    for (int j = i; j < n; j++)
    {
        // swap character at index `i` with the current character
        swap(str[i], str[j]);        // STL `swap()` used

        // recur for substring `str[i+1, n-1]`
        permutations(str, i + 1, n);

        // backtrack (restore the string to its original state)
        swap(str[i], str[j]);
    }
}

int main()
{
    string str = "ABC";

    permutations(str, 0, str.length());

    return 0;
}
```

**Output:** ABC ACB BAC BCA CBA CAB

## Approach 2: (Using STL)

We can use [std::rotate](https://cplusplus.com/reference/algorithm/rotate/) to in-place rotate a string in linear time and recursively permute on the rotated string. Following is the recursion tree for printing all permutations of the string `ABC`:

```
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find all permutations of a given string
// containing all distinct characters
void permutations(string str, int n, string result)
{
    // base condition (only one character is left in the string)
    if (n == 1)
    {
        cout << result + str << endl;
        return;
    }

    // process each character of the remaining string
    for (int i = 0; i < n; i++)
    {
        // push the current character into the output string and recur
        // for the remaining characters
        permutations(str.substr(1), n - 1, result + str[0]);

        // left-rotate the string by 1 unit for the next iteration
        // (use a reverse iterator to right-rotate the string)
        rotate(str.begin(), str.begin() + 1, str.end());
    }
}

int main()
{
    string str = "ABC";
    string result;        // empty string

    permutations(str, str.size(), result);

    return 0;
}
```

**Output:** ABC ACB BCA BAC CAB CBA

The time complexity of the above solutions is O(n.n!) as there are `n!` permutations for a string of length `n`, and each permutation takes O(n) time.

Note that the above solution doesn’t handle strings containing duplicate characters. We have discussed how to handle duplicate characters [here](https://techiedelight.com/find-lexicographically-next-permutations-string-sorted-ascending-order/).

**Also see:**

> [Iterative approach to finding permutations of a string – C++, Java, and Python](https://techiedelight.com/find-permutations-string-cpp-java-iterative/)

> [Find all lexicographic permutations of a string](https://techiedelight.com/find-lexicographic-permutations-string/)

> [Find all palindromic permutations of a string](https://techiedelight.com/find-palindromic-permutations-string/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
