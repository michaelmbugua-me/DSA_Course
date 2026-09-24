# Isomorphic Strings

> Source: https://www.techiedelight.com/isomorphic-strings/

[String](https://www.techiedelight.com/Category/String/)

Given two strings, determine whether they are isomorphic. Two strings, `X` and `Y`, are called isomorphic if all occurrences of each character in `X` can be replaced with another character to get `Y` and vice-versa.

For example, consider strings `ACAB` and `XCXY`. They are isomorphic as we can map `'A' —> 'X'`, `'B' —> 'Y'` and `'C' —> 'C'`.

Note that mapping from a character to itself is allowed, but the same character may not replace two characters.

> 

A naive solution would be to check if every character in the first string is mapped to the same character in the second string for all its occurrences. But even then, two characters in the first string might still be mapped to the same character in the second string. So, we have to repeat the process for the second string as well, i.e., check if every character in the second string is mapped to the same character in the first string for all its occurrences.

The time complexity of this solution is O(n2), where `n` is the length of each string. We can improve time complexity to linear by using O(n) space.

The idea is to use [hashing](https://techiedelight.com/hashing-in-data-structure/). The following solution uses a map to store a mapping from characters of string `X` to string `Y` and a set to store already mapped characters of string `Y`; the rest of the code is pretty much straightforward:

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <unordered_set>
using namespace std;

// Find if strings 'X' and 'Y' are Isomorphic or not
bool isIsomorphic(string X, string Y)
{
    // if 'X' and 'Y' have different lengths, they cannot be isomorphic
    if (X.length() != Y.length()) {
        return false;
    }

    // use a map to store a mapping from characters of string 'X' to string 'Y'
    unordered_map<char, char> map;

    // use set to store a pool of already mapped characters
    unordered_set<char> set;

    for (int i = 0; i < X.length(); i++)
    {
        char x = X[i], y = Y[i];

        // if 'x' is seen before
        if (map.find(x) != map.end())
        {
            // return false if the first occurrence of `x` is mapped to a
            // different character
            if (map[x] != y) {
                return false;
            }
        }

        // if 'x' is seen for the first time (i.e., it isn't mapped yet)
        else {
            // return false if 'y' is already mapped to some other char in 'X'
            if (set.find(y) != set.end()) {
                return false;
            }

            // map 'y' to 'x' and mark it as mapped
            map[x] = y;
            set.insert(y);
        }
    }

    return true;
}

int main()
{
    string X = "ACAB";
    string Y = "XCXY";

    if (isIsomorphic(X, Y)) {
        cout << X << " and " << Y << " are Isomorphic";
    }
    else {
        cout << X << " and " << Y << " are not Isomorphic";
    }

    return 0;
}
```

**Output:** ACAB and XCXY are Isomorphic

##

```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Main
{
    // Find if strings 'X' and 'Y' are Isomorphic or not
    public static boolean isIsomorphic(String X, String Y)
    {
        // base case
        if (X == null || Y == null) {
            return false;
        }

        // if 'X' and 'Y' have different lengths, they cannot be isomorphic
        if (X.length() != Y.length()) {
            return false;
        }

        // use a map to store a mapping from characters of string 'X' to string 'Y'
        Map<Character, Character> map = new HashMap<>();

        // use set to store a pool of already mapped characters
        Set<Character> set = new HashSet<>();

        for (int i = 0; i < X.length(); i++)
        {
            char x = X.charAt(i), y = Y.charAt(i);

            // if 'x' is seen before
            if (map.containsKey(x))
            {
                // return false if the first occurrence of `x` is mapped to a
                // different character
                if (map.get(x) != y) {
                    return false;
                }
            }

            // if 'x' is seen for the first time (i.e., it isn't mapped yet)
            else {
                // return false if 'y' is already mapped to some other char in 'X'
                if (set.contains(y)) {
                    return false;
                }

                // map 'y' to 'x' and mark it as mapped
                map.put(x, y);
                set.add(y);
            }
        }

        return true;
    }

    public static void main(String[] args)
    {
        String X = "ACAB";
        String Y = "XCXY";

        if (isIsomorphic(X, Y)) {
            System.out.println(X + " and " + Y + " are Isomorphic");
        }
        else {
            System.out.println(X + " and " + Y + " are not Isomorphic");
        }
    }
}
```

##

```python3
# Find if strings 'X' and 'Y' are Isomorphic or not
def isIsomorphic(X, Y):

    # if 'X' and 'Y' have different lengths, they cannot be isomorphic
    if len(X) != len(Y):
        return False

    # use a dictionary to store a mapping from characters of string 'X' to string 'Y'
    d = {}

    # use set to store a pool of already mapped characters
    s = set()

    for i in range(len(X)):
        x = X[i]
        y = Y[i]

        # if 'x' is seen before
        if x in d:
            # return false if the first occurrence of `x` is mapped to a
            # different character
            if d[x] != y:
                return False

        # if 'x' is seen for the first time (i.e., it isn't mapped yet)
        else:
            # return false if 'y' is already mapped to some other char in 'X'
            if y in s:
                return False

            # map 'y' to 'x' and mark it as mapped
            d[x] = y
            s.add(y)

    return True

if __name__ == '__main__':

    X = 'ACAB'
    Y = 'XCXY'

    if isIsomorphic(X, Y):
        print(f'{X} and {Y} are Isomorphic')
    else:
        print(f'{X} and {Y} are not Isomorphic')
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 195

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
