# Find the first non-repeating character in a string by doing only one traversal of it

> Source: https://www.techiedelight.com/find-first-non-repeating-character-string-one-traversal/

[String](https://www.techiedelight.com/Category/String/)

Given a string, find the first non-repeating character in it by doing only a single traversal of it.

For example,

**Input:** string is ABCDBAGHC **Output:** The first non-repeating character in the string is D

> 

A simple solution would be to store each character’s count in a map or an array by traversing it once. Then traverse the string once more to find the first character having its count as 1. The time complexity of this solution is O(n) and requires O(n) extra space, where `n` is the length of the input string. The problem with this solution is that the string is traversed twice, violating the program constraints.

We can solve this problem in a single traversal of the string. The idea is to use a map to store each distinct character count and the index of its first or last occurrence in the string. Then, traverse the map and find a character with a minimum index of the string.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to find the first non-repeating character in
// the string by doing only a single traversal of it
int findNonRepeatingChar(string str)
{
    // map to store character count and the index of its
    // last occurrence in the string
    unordered_map<char, pair<int, int>> map;

    for (int i = 0; i < str.length(); i++)
    {
        map[str[i]].first++;
        map[str[i]].second = i;
    }

    // stores index of the first non-repeating character
    int min_index = -1;

    // traverse the map and find a character with count 1 and
    // a minimum index of the string
    for (auto it: map)
    {
        int count = it.second.first;
        int firstIndex = it.second.second;

        if (count == 1 && (min_index == -1 || firstIndex < min_index)) {
            min_index = firstIndex;
        }
    }

    return min_index;
}

int main()
{
    string str = "ABCDBAGHC";

    int index = findNonRepeatingChar(str);
    if (index != -1) {
        cout << "The first non-repeating character in the string is " << str[index];
    } else {
        cout << "The string has no non-repeating character";
    }

    return 0;
}
```

**Output:** The first non-repeating character in the string is D

##

```java
import java.util.HashMap;
import java.util.Map;

// A Pair class
class Pair<U, V>
{
    public U first;     // first field of a pair
    public V second;    // second field of a pair

    // Constructs a new Pair with specified values
    private Pair(U first, V second)
    {
        this.first = first;
        this.second = second;
    }

    // Factory method for creating a Typed Pair immutable instance
    public static <U, V> Pair <U, V> of(U a, V b)
    {
        // calls private constructor
        return new Pair<>(a, b);
    }
}

class Main
{
    // Function to find the first non-repeating character in
    // the string by doing only a single traversal of it
    public static int findNonRepeatingChar(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return -1;
        }

        // map to store character count and the index of its
        // last occurrence in the string
        Map<Character, Pair<Integer, Integer>> map = new HashMap<>();

        for (int i = 0; i < str.length(); i++)
        {
            map.putIfAbsent(str.charAt(i), Pair.of(0, 0));
            map.get(str.charAt(i)).first++;
            map.get(str.charAt(i)).second = i;
        }

        // stores index of the first non-repeating character
        int min_index = -1;

        // traverse the map and find a character with count 1 and
        // a minimum index of the string
        for (var value: map.values())
        {
            int count = value.first;
            int firstIndex = value.second;

            if (count == 1 && (min_index == -1 || firstIndex < min_index)) {
                min_index = firstIndex;
            }
        }

        return min_index;
    }

    public static void main(String[] args)
    {
        String str = "ABCDBAGHC";

        int index = findNonRepeatingChar(str);
        if (index != -1)
        {
            System.out.println("The first non-repeating character in the string is "
                    + str.charAt(index));
        } else {
            System.out.println("The string has no non-repeating character");
        }
    }
}
```

##

```python3
# Function to find the first non-repeating character in
# the string by doing only a single traversal of it
def findNonRepeatingChar(s):

    # base case
    if not s:
        return -1

    # dictionary to store character count and the index of its
    # last occurrence in the string
    d = {}

    for index, char in enumerate(s):
        frequency, prevIndex = d.get(char, (0, index))
        d[char] = (frequency + 1, index)

    # stores index of the first non-repeating character
    min_index = -1

    # Traverse the dictionary and find a character with count 1 and
    # a minimum index of the string
    for key, values in d.items():
        count, firstIndex = values
        if count == 1 and (min_index == -1 or firstIndex < min_index):
            min_index = firstIndex

    return min_index

if __name__ == '__main__':

    s = 'ABCDBAGHC'

    index = findNonRepeatingChar(s)
    if index != -1:
        print('The first non-repeating character in the string is', s[index])
    else:
        print('The string has no non-repeating character')
```

The time complexity of this solution is O(n) since we are doing a single traversal of the input string of length `n` and a single traversal of the map. Since the map’s size is equal to the alphabet size (a constant) in the worst-case, we can ignore it.

Also See:

> [Find first `k` non-repeating characters in a string in a single traversal](https://www.techiedelight.com/first-k-non-repeating-characters-string/ "Find first `k` non-repeating characters in a string in a single traversal")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 171

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
