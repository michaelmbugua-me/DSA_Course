# Find all substrings of a string that are a permutation of another string

> Source: https://www.techiedelight.com/find-substrings-string-permutation-given-string/

[String](https://www.techiedelight.com/Category/String/)

Find all substrings of a string that contains all characters of another string. In other words, find all substrings of the first string that are anagrams of the second string.

Please note that the problem specifically targets [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

`The first string is 'XYYZXZYZXXYZ' The second string is 'XYZ' Anagram 'YZX' present at index 2 Anagram 'XZY' present at index 4 Anagram 'YZX' present at index 6 Anagram 'XYZ' present at index 9 `

> 

The idea is to maintain a [sliding window](https://techiedelight.com/sliding-window-problems/) of size `m`, where `m` is the length of the second string. At any point, the sliding window would contain a substring of the first string of size `m`. At each iteration of the loop, remove the leftmost element from the sliding window and add the next character of the first string to it, so it points to the next substring of the first string.

At each point the window changes, compare the window’s characters with that of the second string. If all characters in the current window match that of the second string, we have found an anagram. After all substrings of the first string are considered, i.e., the window reaches the first string’s last character, the process terminates.

Following is the C++ and Java implementation based on the above idea:

```cpp
#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

// Function to find all substrings of string 'X' that are
// permutations of string 'Y'
void findAllAnagrams(string X, string Y)
{
    // `m` and `n` store the length of the string 'Y' and 'X', respectively
    int m, n;

    // invalid input
    if ((m = Y.length()) > (n = X.length())) {
        return;
    }

    // maintains the count of characters in the current window
    unordered_multiset<char> window;

    // maintains the count of characters in the second string
    unordered_multiset<char> set;

    // insert all characters of string 'Y' into a set
    for (int i = 0; i < m; i++) {
        set.insert(Y[i]);
    }

    // Note that `std::unordered_multiset` or `std::multiset` can maintain
    // duplicate elements unlike `std::unordered_set` or `std::set`

    // maintain a sliding window of size `m` with adjacent characters
    // of string 'X'
    for (int i = 0; i < n; i++)
    {
        // add first `m` characters of string 'X' to the current window
        if (i < m) {
            window.insert(X[i]);
        }
        else {
            // If all characters in the current window match that of the
            // string 'Y', we found an anagram
            if (window == set)
            {
                cout << "Anagram " << X.substr(i - m, m) <<
                        " present at index " << i - m << endl;
            }

            // consider the next substring of 'X' by removing the leftmost element of
            // the sliding window and add the next character of string 'X' to it

            // delete only "one" occurrence of the leftmost element of
            // the current window
            auto itr = window.find(X[i - m]);
            if (itr != window.end()) {
                window.erase(itr);
            }

            // insert the next character of the string 'X' into the current window
            window.insert(X[i]);
        }
    }

    // if the last `m` characters of string 'X' matches that of string 'Y',
    // we found an anagram
    if (window == set)
    {
        cout << "Anagram " << X.substr(n - m, m) <<
                " present at index " << n - m << endl;
    }
}

int main()
{
    string X = "XYYZXZYZXXYZ";
    string Y = "XYZ";

    findAllAnagrams(X, Y);

    return 0;
}
```

##

```java
import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;

class Main
{
    // Function to find all substrings of string 'X' that are
    // permutations of string 'Y'
    public static void findAllAnagrams(String X, String Y)
    {
        // `m` and `n` store the length of the string 'Y' and 'X', respectively
        int m, n;

        // invalid input
        if ((m = Y.length()) > (n = X.length())) {
            return;
        }

        // maintains the count of characters in the current window
        Multiset<Character> window = HashMultiset.create();

        // maintains the count of characters in the second string
        Multiset<Character> set = HashMultiset.create();

        // insert all characters of string 'Y' into a set
        for (int i = 0; i < m; i++) {
            set.add(Y.charAt(i));
        }

        // Note that Guava's `HashMultiset` can maintain duplicate
        // elements, unlike `java.util.HashSet`

        // maintain a sliding window of size `m` with adjacent characters
        // of string 'X'
        for (int i = 0; i < n; i++)
        {
            // add first `m` characters of string 'X' to the current window
            if (i < m) {
                window.add(X.charAt(i));
            }
            else {
                // If all characters in the current window match that of the
                // string 'Y', we found an anagram
                if (window.containsAll(set))
                {
                    System.out.println("Anagram " + X.substring(i - m, i) +
                                " present at index " + (i - m));
                }

                // consider the next substring of 'X' by removing the leftmost
                // element of the sliding window and add the next character
                // of string 'X' to it

                // delete only "one" occurrence of the leftmost element of the
                // current window
                if (window.contains(X.charAt(i - m))) {
                    window.remove(X.charAt(i - m));
                }

                // insert the next character of the string 'X' into the current window
                window.add(X.charAt(i));
            }
        }

        // if the last `m` characters of string 'X' matches that of string 'Y',
        // we found an anagram
        if (window.containsAll(set))
        {
            System.out.println("Anagram " + X.substring(n - m, n) +
                                " present at index " + (n - m));
        }
    }

    public static void main(String[] args)
    {
        String X = "XYYZXZYZXXYZ";
        String Y = "XYZ";

        findAllAnagrams(X, Y);
    }
}
```

**Output:** Anagram YZX present at index 2 Anagram XZY present at index 4 Anagram YZX present at index 6 Anagram XYZ present at index 9

The time complexity of this solution would be O((n – m) × m) as there are `n-m` substrings of size `m`, and it takes O(m) time and O(m) space to check if they are anagrams or not. Here, `n` and `m` are lengths of the first and second strings, respectively.

We can also solve this problem using [std::is_permutation](https://en.cppreference.com/w/cpp/algorithm/is_permutation) in C++, which determines if a sequence is a permutation of another sequence.

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to find all substrings of string 'X' that are
// permutations of string 'Y'
void findAllAnagrams(string X, string Y)
{
    // `m` and `n` store the length of the string 'Y' and 'X', respectively
    int m, n;

    // invalid input
    if ((m = Y.length()) > (n = X.length())) {
        return;
    }

    for (int i = 0; i <= n - m; i++)
    {
        // if a substring `X[i…i+m]` is a permutation of 'Y'
        if (is_permutation(X.begin() + i, X.begin() + i + m, Y.begin()))
        {
            cout << "Anagram " << X.substr(i, m) <<
                    " present at index " << i << endl;
        }
    }
}

int main()
{
    string X = "XYYZXZYZXXYZ";
    string Y = "XYZ";

    findAllAnagrams(X, Y);

    return 0;
}
```

**Output:** Anagram YZX present at index 2 Anagram XZY present at index 4 Anagram YZX present at index 6 Anagram XYZ present at index 9
