# Find all interleaving of given strings

> Source: https://www.techiedelight.com/find-interleavings-of-given-strings/

[String](https://www.techiedelight.com/Category/String/)

Find all interleavings of given strings that can be formed from all the characters of the first and second string where the order of characters is preserved.

For example, interleavings of string `ABC` and `ACB` are:

ACBABC, AABCBC, ACABCB, ABCACB, AACBBC, ABACCB, ACABBC, ABACBC, AACBCB, AABCCB

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to append the first or last character of `X` and `Y` in the result one by one, and recur for the remaining substring.

**Input:** X[1…m], Y[1…n] fun(X, m, Y, n) = fun(X, m-1, Y, n) + X[m] fun(X, m, Y, n-1) + Y[n] fun(X, 0, Y, n) = Y[n] // `X` is empty fun(X, m, Y, 0) = X[m] // `Y` is empty

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// Function to find all interleaving of string `X` and `Y`
void findInterleavings(string result, string X, string Y, auto &interleavings)
{
    // insert `result` into the set if the end of both strings is reached
    if (!X.length() && !Y.length())
    {
        interleavings.insert(result);
        return;
    }

    // if the string `X` is not empty, append its first character in the
    // result and recur for the remaining substring

    if (X.length()) {
        findInterleavings(result + X[0], X.substr(1), Y, interleavings);
    }

    // if the string `Y` is not empty, append its first character in the
    // result and recur for the remaining substring

    if (Y.length()) {
        findInterleavings(result + Y[0], X, Y.substr(1), interleavings);
    }
}

unordered_set<string> findInterleavings(string X, string Y)
{
    // use set to handle duplicates
    unordered_set<string> interleavings;

    if (!X.length() && !Y.length()) {
        return interleavings;
    }

    findInterleavings("", X, Y, interleavings);
    return interleavings;
}

int main()
{
    string X = "ABC";
    string Y = "ACB";

    unordered_set<string> interleavings = findInterleavings(X, Y);
    for (string s: interleavings) {
        cout << s << endl;
    }

    return 0;
}
```

**Output:** ACBABC AABCBC ACABCB ABCACB AACBBC ABACCB ACABBC ABACBC AACBCB AABCCB

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    // Function to find all interleaving of string `X` and `Y`
    public static void findInterleavings(String curr, String X, String Y,
                                         Set<String> interleavings)
    {
        // insert `curr` into the set if the end of both strings is reached
        if (X.length() == 0 && Y.length() == 0)
        {
            interleavings.add(curr);
            return;
        }

        // if the string `X` is not empty, append its first character in the
        // result and recur for the remaining substring

        if (X.length() > 0) {
            findInterleavings(curr + X.charAt(0), X.substring(1), Y, interleavings);
        }

        // if the string `Y` is not empty, append its first character in the
        // result and recur for the remaining substring

        if (Y.length() > 0) {
            findInterleavings(curr + Y.charAt(0), X, Y.substring(1), interleavings);
        }
    }

    public static Set<String> findInterleavings(String X, String Y)
    {
        // use set to handle duplicates
        Set<String> interleavings = new HashSet<>();

        if (X.length() == 0 && Y.length() == 0) {
            return interleavings;
        }

        findInterleavings("", X, Y, interleavings);
        return interleavings;
    }

    public static void main(String[] args)
    {
        String X = "ABC";
        String Y = "ACB";

        // use set to handle duplicates
        Set<String> interleavings = findInterleavings(X, Y);
        System.out.println(interleavings);
    }
}
```

##

```python3
# Function to find all interleaving of string `X` and `Y`
def findInterleavings(X, Y, interleavings, curr=''):
    # insert `curr` into the set if the end of both strings is reached
    if not X and not Y:
        interleavings.add(curr)
        return

    # if the string `X` is not empty, append its first character in the
    # result and recur for the remaining substring

    if X:
        findInterleavings(X[1:], Y, interleavings, curr + X[0])

    # if the string `Y` is not empty, append its first character in the
    # result and recur for the remaining substring

    if Y:
        findInterleavings(X, Y[1:], interleavings, curr + Y[0])

    return interleavings

def findAllInterleavings(X, Y):

    # use set to handle duplicates
    interleavings = set()

    if not X and not Y:
        return interleavings

    findInterleavings(X, Y, interleavings)
    return interleavings

if __name__ == '__main__':

    X = 'ABC'
    Y = 'ACB'

    interleavings = findAllInterleavings(X, Y)
    print(interleavings)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Check if a string is interleaving of two other given strings](https://www.techiedelight.com/check-string-interleaving-two-given-strings/ "Check if a string is interleaving of two other given strings")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.53/5. Vote count: 197

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
