# Determine whether two strings are anagram or not

> Source: https://www.techiedelight.com/determine-if-two-strings-are-anagram-or-not/

[String](https://www.techiedelight.com/Category/String/)

Given two strings, determine whether they are anagrams.

Any word that exactly reproduces the letters in another order is an anagram. In other words, `X` and `Y` are anagrams if by rearranging the letters of `X`, we can get `Y` using all the original letters of `X` exactly once.

For example, all these pairs are anagrams as lhs can be rearranged to rhs and vice-versa:

silent = listen incest = insect

> 

A simple solution would be to sort given strings. If the strings become equal after sorting, they are anagrams. The time complexity of this solution is O(n.log(n)), where `n` is the length of the input string.

We can also solve this problem in O(n) time. The idea is to maintain the frequency of each character of the first string in a map or a count array. Then for each character of the second string, decrement its frequency and return false if the frequency becomes negative or the character is not present on the map.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

// Function to check if `X` and `Y` are anagrams or not
bool isAnagram(string X, string Y)
{
    // if X's length is not the same as Y's, they can't be an anagram
    if (X.length() != Y.length()) {
        return false;
    }

    // create an empty map
    unordered_map<int, int> freq;

    // maintain a count of each character of `X` on the map
    for (char x: X) {
        freq[x]++;
    }

    // do for each character `y` of `Y`
    for (char y: Y)
    {
        // if `y` is not found in the map, i.e., either `y` is not present
        // in string `X` or has more occurrences in string `Y`
        if (freq.find(y) == freq.end()) {
            return false;
        }

        // decrease the frequency of `y` on the map
        freq[y]--;

        // if its frequency becomes 0, erase it from the map
        if (!freq[y]) {
            freq.erase(y);
        }
    }

    // return true if the map becomes empty
    return !freq.size();
}

int main()
{
    string X = "tommarvoloriddle";        // Tom Marvolo Riddle
    string Y = "iamlordvoldemort";        // I am Lord Voldemort

    if (isAnagram(X, Y)) {
        cout << "Anagram";
    }
    else {
        cout << "Not an Anagram";
    }

    return 0;
}
```

**Output:** Anagram

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to check if `X` and `Y` are anagrams or not
    public static boolean isAnagram(String X, String Y)
    {
        // base case
        if (X == null || Y == null) {
            return false;
        }

        // if X's length is not the same as Y's, they can't be an anagram
        if (X.length() != Y.length()) {
            return false;
        }

        // create an empty map
        Map<Character, Integer> freq = new HashMap<>();

        // maintain a count of each character of `X` on the map
        for (char c: X.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }

        // do for each character `y` of `Y`
        for (char c: Y.toCharArray())
        {
            // if `y` is not found in the map, i.e., either `y` is not present
            // in string `X` or has more occurrences in string `Y`
            if (!freq.containsKey(c)) {
                return false;
            }

            // decrease the frequency of `y` on the map
            freq.put(c, freq.get(c) - 1);

            // if its frequency becomes 0, erase it from the map
            if (freq.get(c) == 0) {
                freq.remove(c);
            }
        }

        // return true if the map becomes empty
        return freq.isEmpty();
    }

    public static void main(String[] args)
    {
        String X = "tommarvoloriddle";        // Tom Marvolo Riddle
        String Y = "iamlordvoldemort";        // I am Lord Voldemort

        if (isAnagram(X, Y)) {
            System.out.print("Anagram");
        }
        else {
            System.out.print("Not an Anagram");
        }
    }
}
```

##

```python3
# Function to check if `X` and `Y` are anagrams or not
def isAnagram(X, Y):

    # if X's length is not the same as Y's, they can't be an anagram
    if len(X) != len(Y):
        return False

    # create an empty dictionary
    freq = {}

    # maintain the count of each character of `X` in the dictionary
    for i in range(len(X)):
        freq[X[i]] = freq.get(X[i], 0) + 1

    # do for each character `y` of `Y`
    for i in range(len(Y)):

        # if `y` is found not in the dictionary, i.e., either `y` is not present
        # in string `X` or has more occurrences in string `Y`
        if not Y[i] in freq:
            return False

        # decrease the frequency of `y` on the dictionary
        freq[Y[i]] = freq[Y[i]] - 1

        # if its frequency becomes 0, erase it from the dictionary
        if freq[Y[i]] == 0:
            del freq[Y[i]]

    # return true if the dictionary becomes empty
    return not freq

if __name__ == '__main__':

    X = 'tommarvoloriddle'    # Tom Marvolo Riddle
    Y = 'iamlordvoldemort'    # I am Lord Voldemort

    if isAnagram(X, Y):
        print('Anagram')
    else:
        print('Not an Anagram')
```

The time complexity of the above solution is O(n) assuming constant-time operations for a hash table. The auxiliary space required by the program is O(c), where `c` is the alphabet size.

## Approach 3

Another simple solution is to create two maps and store the frequency of each character of the first and second string in them. Then we can check if both maps are equal or not. If both are found to be equal, then both strings are anagrams.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

// Function to check if `X` and `Y` are anagrams or not
bool isAnagram(string X, string Y)
{
    // if X's length is not the same as Y's, they can't be an anagram
    if (X.length() != Y.length()) {
        return false;
    }

    // create an empty map
    unordered_map<int, int> freqX;

    // maintain a count of each character of `X` on the map
    for (char x: X) {
        freqX[x]++;
    }

    // create a second map
    unordered_map<int, int> freqY;

    // maintain a count of each character of `Y` on the map
    for (char y: Y) {
        freqY[y]++;
    }

    // return true if both maps have the same content
    return freqX == freqY;
}

int main()
{
    string X = "tommarvoloriddle";        // Tom Marvolo Riddle
    string Y = "iamlordvoldemort";        // I am Lord Voldemort

    if (isAnagram(X, Y)) {
        cout << "Anagram";
    }
    else {
        cout << "Not an Anagram";
    }

    return 0;
}
```

**Output:** Anagram

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to check if `X` and `Y` are anagrams or not
    public static boolean isAnagram(String X, String Y)
    {
        // if X's length is not the same as Y's, they can't be an anagram
        if (X.length() != Y.length()) {
            return false;
        }

        // create an empty map
        Map<Character, Integer> freqX = new HashMap<>();

        // maintain a count of each character of `X` on the map
        for (char c: X.toCharArray()) {
            freqX.put(c, freqX.getOrDefault(c, 0) + 1);
        }

        // create a second map
        Map<Character, Integer> freqY = new HashMap<>();

        // maintain a count of each character of `Y` on the map
        for (char c: Y.toCharArray()) {
            freqY.put(c, freqY.getOrDefault(c, 0) + 1);
        }

        // return true if both maps have the same content
        return freqX.equals(freqY);
    }

    public static void main(String[] args)
    {
        String X = "tommarvoloriddle";        // Tom Marvolo Riddle
        String Y = "iamlordvoldemort";        // I am Lord Voldemort

        if (isAnagram(X, Y)) {
            System.out.print("Anagram");
        }
        else {
            System.out.print("Not an Anagram");
        }
    }
}
```

##

```python3
# Function to check if `X` and `Y` are anagrams or not
def isAnagram(X, Y):

    # if X's length is not the same as Y's, they can't be an anagram
    if len(X) != len(Y):
        return False

    # create an empty dictionary
    freqX = {}

    # maintain the count of each character of `X` on the dictionary
    for i in range(len(X)):
        freqX[X[i]] = freqX.get(X[i], 0) + 1

    # create a second dictionary
    freqY = {}

    # maintain a count of each character of `Y` on the dictionary
    for i in range(len(Y)):
        freqY[Y[i]] = freqY.get(Y[i], 0) + 1

    # return true if both dictionaries have the same content
    return freqX == freqY

if __name__ == '__main__':

    X = 'tommarvoloriddle'    # Tom Marvolo Riddle
    Y = 'iamlordvoldemort'    # I am Lord Voldemort

    if isAnagram(X, Y):
        print('Anagram')
    else:
        print('Not an Anagram')
```

The time complexity of the above solution is O(n) assuming constant-time operations for a hash table. The auxiliary space required by the program is O(c), where `c` is the alphabet size.
