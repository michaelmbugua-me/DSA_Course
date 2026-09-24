# Check if strings can be derived from each other by circularly rotating them

> Source: https://www.techiedelight.com/check-strings-can-derived-circularly-rotating/

[String](https://www.techiedelight.com/Category/String/)

Check if a given string can be derived from another string by circularly rotating it. The rotation can be in a clockwise or anti-clockwise rotation.

For example,

**Input:** X = ABCD Y = DABC **Output:** Yes Y can be derived from X by right-rotating it by 1 unit

> 

For two given strings `X` and `Y`, a simple solution would be to check if the string `Y` is a substring of the string `XX` or not. If yes, they can be derived from each other. For example, consider string `X = ABCD` and `Y = DABC`.

`XX = ABCD + ABCD = ABCDABCD`

The string `Y` is clearly a substring of the string `ABC**DABC** D`.

The implementation can be seen [here](https://techiedelight.com/compiler/?run=xyQqwD). This solution seems efficient, but uses O(n) extra space.

How to do this using `O(1)` space?

The idea is to [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) rotate the string `X` and check if it becomes equal to the string `Y` or not. We have to consider every possible rotation of a string `X` (i.e., rotation by 1 unit, 2 unit… till `n-1` unit, where `n` is the length of the string `X`). Note that clockwise or anti-clockwise rotation doesn’t matter.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to check if `X` can be derived from `Y` by rotating it
bool check(string X, string Y)
{
    // if string lengths are different, they can't be
    // derived from each other
    if (X.length() != Y.length()) {
        return false;
    }

    // Invariant: At the i'th iteration of this loop,
    // the string `X` will be rotated by `i` units
    for (int i = 0; i < X.length(); i++)
    {
        // in-place left rotates string `X` by 1 unit
        rotate(X.begin(), X.begin() + 1, X.end());

        // for right rotation, we can use reverse iterators.
        // i.e., rotate(X.rbegin(), X.rbegin() + 1, X.rend());

        // return true if `X` becomes equal to `Y`
        if (!X.compare(Y)) {
            return true;
        }
    }

    // return false if no rotation is matched
    return false;
}

int main()
{
    string X = "ABCD";
    string Y = "DABC";

    if (check(X, Y)) {
        cout << "Given strings can be derived from each other";
    }
    else {
        cout << "Given strings cannot be derived from each other";
    }

    return 0;
}
```

**Output:** Given strings can be derived from each other

##

```java
class Main
{
    // Function to check if `X` can be derived from `Y` by rotating it
    public static boolean check(String X, String Y)
    {
        // base case
        if (X == null || Y == null) {
            return false;
        }

        // if string lengths are different, they can't be
        // derived from each other
        if (X.length() != Y.length()) {
            return false;
        }

        // Invariant: At the i'th iteration of this loop,
        // the string `X` will be rotated by `i` units
        for (int i = 0; i < X.length(); i++)
        {
            // left rotate string `X` by 1 unit
            X = X.substring(1) + X.charAt(0);

            // return true if `X` becomes equal to `Y`
            if (X.compareTo(Y) == 0) {
                return true;
            }
        }

        // return false if no rotation is matched
        return false;
    }

    public static void main(String[] args)
    {
        String X = "ABCD";
        String Y = "DABC";

        if (check(X, Y)) {
            System.out.println("Given strings can be derived from each other");
        }
        else {
            System.out.println("Given strings cannot be derived from each other");
        }
    }
}
```

##

```python3
# Function to check if `X` can be derived from `Y` by rotating it
def check(X, Y):

    # if string lengths are different, they can't be
    # derived from each other
    if len(X) != len(Y):
        return False

    # Invariant: At the i'th iteration of this loop,
    # the string `X` will be rotated by `i` units
    for i in range(len(X)):

        # left rotate string `X` by 1 unit
        X = X[1:] + X[0]

        # return true if `X` becomes equal to `Y`
        if X == Y:
            return True

    # return false if no rotation is matched
    return False

if __name__ == '__main__':

    X = 'ABCD'
    Y = 'DABC'

    if check(X, Y):
        print('Given strings can be derived from each other')
    else:
        print('Given strings cannot be derived from each other')
```

The time complexity of the above solution is O(n2), where `n` is the length of the input strings, and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 188

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
