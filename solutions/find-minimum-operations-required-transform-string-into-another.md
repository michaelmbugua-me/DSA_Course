# Find minimum operations required to transform a string into another string

> Source: https://www.techiedelight.com/find-minimum-operations-required-transform-string-into-another/

Given two strings, determine if the first string can be transformed into the second string. The only operation allowed is moving a character from the first string to the front. If the string can be transformed, find the minimum number of operations required for the transformation.

For example, the minimum number of operations required to convert the string `ADCB` to string `ABCD` is `3`.

ADCB —> CADB (Move ‘C’ to the front) CADB —> BCAD (Move ‘B’ to the front) BCAD —> ABCD (Move ‘A’ to the front)

> 

1\. To determine if a string can be transformed into another string, check whether both strings have the same set of characters. If both strings have a different set of characters, they can’t be transformed.

2\. To find the minimum number of operations required to convert the first string to the second string, the idea is to simultaneously traverse both strings from the end. If the last characters of both strings match, move to the next pair of characters. If the last character of both strings doesn’t match, find the index of the matching character in the first string. The difference between both indices represents the number of characters in the first string that has to be moved before the current character of the first string.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
#include <string>
using namespace std;

// Function to find the minimum number of operations required to transform a given
// string into another string
int getMinimumOperations(string first, string second)
{
    // to keep track of the minimum number of operations required
    int count = 0;

    // `i` and `j` keep track of the current characters' index in the
    // first and second strings, respectively

    // start from the end of the first and second string
    for (int i = first.length() - 1, j = i; i >= 0; i--, j--)
    {
        // if the current character of both strings doesn't match,
        // search for `second[j]` in substring `first[0, i-1]` and
        // increment the count for every move

        while (i >= 0 && first[i] != second[j])
        {
            i--;
            count++;
        }
    }

    // return the minimum operations required
    return count;
}

// Function to determine if the first string can be transformed into
// the second string
bool isTransformable(string first, string second)
{
    // if the length of both strings differs
    if (first.length() != second.length()) {
        return false;
    }

    // construct a multiset out of characters in the first and second string
    // (A multiset is used since it allows duplicates)

    unordered_multiset<char> chars1(first.begin(), first.end());
    unordered_multiset<char> chars2(second.begin(), second.end());

    // return true if both strings have the same set of characters
    return (chars1 == chars2);
}

int main()
{
    string first = "ADCB";
    string second = "ABCD";

    if (isTransformable(first, second))
    {
        cout << "The minimum operations required to convert the string "
             << first << " to string " << second << " are "
             << getMinimumOperations(first, second);
    }
    else {
        cout << "The string cannot be transformed";
    }

    return 0;
}
```

**Output:** The minimum operations required to convert the string ADCB to string ABCD are 3

##

```java
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

class Main
{
    // Function to find the minimum number of operations required to transform a given
    // string into another string
    public static int getMinimumOperations(String first, String second)
    {
        // to keep track of the minimum number of operations required
        int count = 0;

        // `i` and `j` keep track of the current characters' index in the
        // first and second strings, respectively

        // start from the end of the first and second string
        for (int i = first.length() - 1, j = i; i >= 0; i--, j--)
        {
            // if the current character of both strings doesn't match,
            // search for `second[j]` in substring `first[0, i-1]` and
            // increment the count for every move
            while (i >= 0 && first.charAt(i) != second.charAt(j))
            {
                i--;
                count++;
            }
        }

        // return the minimum operations required
        return count;
    }

    // Function to determine if the first string can be transformed into
    // the second string
    public static boolean isTransformable(char[] first, char[] second)
    {
        // base case
        if (first == null || second == null) {
            return false;
        }

        // if the length of both strings differs
        if (first.length != second.length) {
            return false;
        }

        // return true if both strings have the same set of characters
        return getFrequencyMap(first).equals(getFrequencyMap(second));
    }

    // Utility function to create a frequency map
    public static Map<Character, Long> getFrequencyMap(char[] chars)
    {
        return new String(chars).chars().mapToObj(ch -> (char) ch)
                .collect(Collectors.groupingBy(Function.identity(),
                    Collectors.counting()));
    }

    public static void main(String[] args)
    {
        String first = "ADCB";
        String second = "ABCD";

        if (isTransformable(first.toCharArray(), second.toCharArray()))
        {
            System.out.println("The minimum operations required to convert the string "
                    + first + " to string " + second + " are "
                    + getMinimumOperations(first, second));
        }
        else {
            System.out.println("The string cannot be transformed");
        }
    }
}
```

##

```python3
import collections

# Function to find the minimum number of operations required to transform a given
# into another string
def getMinimumOperations(first, second):
    # to keep track of the minimum number of operations required
    count = 0

    # `i` and `j` keep track of the current characters' index in the
    # first and second strings, respectively

    # start from the end of the first and second string
    i = len(first) - 1
    j = i

    while i >= 0:
        # if the current character of both strings doesn't match,
        # search for `second[j]` in substring `first[0,i-1]` and
        # increment the count for every move
        while i >= 0 and first[i] != second[j]:
            i = i - 1
            count = count + 1

        i = i - 1
        j = j - 1

    # return the minimum operations required
    return count

# Function to determine if the first string can be transformed into
# the second string
def isTransformable(first, second):
    # if the length of both strings differs
    if len(first) != len(second):
        return False

    # return true if both strings have the same set of characters
    return collections.Counter(first) == collections.Counter(second)

if __name__ == '__main__':

    first = 'ADCB'
    second = 'ABCD'

    if isTransformable(list(first), list(second)):
        print('The minimum operations required to convert the String', first,
              'to string', second, 'are', getMinimumOperations(first, second))
    else:
        print('The string cannot be transformed')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input string.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 114

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
