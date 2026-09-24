# Find all words that follow the same order of characters as given pattern

> Source: https://www.techiedelight.com/find-words-that-follows-given-pattern/

[String](https://www.techiedelight.com/Category/String/)

Given a list of words and a pattern, find all words in the list that follows the same order of characters as that of the pattern.

For example,

**Input:** list = [leet, abcd, loot, geek, cool, for, peer, dear, seed, meet, noon, otto, mess, loss] pattern = moon _(pattern is 4 digits with distinct character at first and last index, and same character at 1st and 2nd index)_ **Output:** [leet, loot, geek, cool, peer, seed, meet] **Input:** list = [leet, abcd, loot, geek, cool, for, peer, dear, seed, meet, noon, otto, mess, loss] pattern = pqrs _(pattern is 4 digits and has all distinct characters)_ **Output:** [abcd, dear]

> 

We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem. The idea is to use a map and associate each distinct character of the given word with the corresponding character in the pattern and store it. For each character in both word and the pattern, if the character is seen before, it should only be mapped to the corresponding character in the pattern. Note that we also have to associate each character in the given pattern with the corresponding character in the given word and follow the same process.

Let’s understand this by taking an example. Consider the word `'moon'` and the pattern `'noon'`. We will process each character in both word and pattern. Let’s check for mapping from the given word to the given pattern.

(m, n) —> As m is seen for the first time, map m to n. (o, o) —> As o is seen for the first time, map o to o. (o, o) —> As o is seen before, and it is already mapped to o, which is the same as current character in pattern o. (n, n) —> As n is seen for the first time, map n to n.

So, mapping from the given word to the given pattern is good. Now let’s check mapping from the pattern to the word.

(n, m) —> As n is seen for the first time, map n to m. (o, o) —> As o is seen for the first time, map o to o. (o, o) —> As o is seen before, and it is already mapped to o, which is the same as current character in pattern o. (n, n) —> As n is seen before, and it is already mapped to m, which is different from the current character in pattern n.

So, mapping from the given pattern to the given word fails, and we can say that the pattern doesn’t match the word. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
using namespace std;

// Function to print all words that follows the same order of
// characters as the given pattern
void patternMatch(vector<string> const &words, string pattern)
{
    // invalid input
    int n = words.size();
    if (n == 0) {
        return;
    }

    // `len` stores the length of the pattern
    int len = pattern.length();

    // check each word in the input list
    for (string word: words)
    {
        // `map1` stores the mapping from word to the pattern
        // `map2` stores the mapping from pattern to word
        unordered_map<char, char> map1, map2;

        // proceed only when the length of the pattern and word is the same
        if (word.length() == len)
        {
            int i;

            // process each character in both word and pattern
            for (i = 0; i < len; i++)
            {
                // `w` stores the current character of the current word
                char w = word[i];

                // `p` stores the current character of the pattern
                char p = pattern[i];

                /* Check mapping from the current word to the given pattern */

                // if `w` is seen for the first time, store its mapping
                // to `p` in `map1`
                if (map1.find(w) == map1.end()) {
                    map1[w] = p;
                }

                // if `w` is seen before, its mapped character should be `p`
                else if (map1[w] != p) {
                    break;
                }

                /* Check mapping from the given pattern to the current word */

                // if `p` is seen for the first time, store its mapping to
                // `w` in `map2`
                if (map2.find(p) == map2.end()) {
                    map2[p] = w;
                }

                // if `p` is seen before, its mapped character should be `w`
                else if (map2[p] != w) {
                    break;
                }
            }

            // if the current word matches the pattern, print it
            if (i == len) {
                cout << word << " ";
            }
        }
    }
}

int main()
{
    // list of words
    vector<string> list =
    {
        "leet", "abcd", "loot", "geek", "cool", "for", "peer",
        "dear", "seed", "meet", "noon", "otto", "mess", "loss"
    };

    // given pattern
    string pattern = "moon";

    patternMatch(list, pattern);

    return 0;
}
```

**Output:** leet loot geek cool peer seed meet

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Main
{
    // Function to print all words that follows the same order of
    // characters as the given pattern
    public static void patternMatch(List<String> words, String pattern)
    {
        // invalid input
        if (words == null || pattern == null) {
            return;
        }

        // `len` stores the length of the pattern
        int len = pattern.length();

        // check each word in the input list
        for (String word: words)
        {
            // `map1` stores the mapping from word to the pattern
            Map<Character, Character> map1 = new HashMap<>();

            // `map2` stores the mapping from pattern to word
            Map<Character, Character> map2 = new HashMap<>();

            // proceed only when the length of the pattern and word is the same
            if (word.length() == len)
            {
                int i;

                // process each character in both word and pattern
                for (i = 0; i < len; i++)
                {
                    // `w` stores the current character of the current word
                    char w = word.charAt(i);

                    // `p` stores the current character of the pattern
                    char p = pattern.charAt(i);

                    /* Check mapping from the current word to the given pattern */

                    // if `w` is seen for the first time, store its mapping to `p`
                    // in `map1`
                    var prev = map1.putIfAbsent(w, p);

                    // if `w` is seen before, its mapped character should be `p`
                    if (prev != null && map1.get(w) != p) {
                        break;
                    }

                    /* Check mapping from the given pattern to the current word */

                    // if `p` is seen for the first time, store its mapping to `w`
                    // in `map2`
                    prev = map2.putIfAbsent(p, w);

                    // if `p` is seen before, its mapped character should be `w`
                    if (prev != null && map2.get(p) != w) {
                        break;
                    }
                }

                // if the current word matches the pattern, print it
                if (i == len) {
                    System.out.println(word);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        // list of words
        List<String> words = Arrays.asList("leet", "abcd", "loot", "geek",
                "cool", "for", "peer", "dear", "seed",
                "meet", "noon", "otto", "mess", "loss");

        // given pattern
        String pattern = "moon";

        patternMatch(words, pattern);
    }
}
```

##

```python3
# Function to print all words that follows the same order of
# characters as the given pattern
def patternMatch(words, pattern):

    # invalid input
    if not words or not pattern:
        return

    # check each word in the input list
    for word in words:

        # dict1 the stores mapping from word to pattern
        dict1 = {}

        # dict2 the stores mapping from pattern to word
        dict2 = {}

        # proceed only when the length of the pattern and word is the same
        if len(word) == len(pattern):

            # process each character in both word and pattern
            i = 0
            while i < len(pattern):
                # `w` stores the current character of the current word
                w = word[i]

                # `p` stores the current character of the pattern
                p = pattern[i]

                ''' check mapping from the current word to the given pattern '''

                # if `w` is seen for the first time, store its mapping to `p`
                # in `dict1`
                if w not in dict1:
                    dict1[w] = p
                else:
                    # if `w` is seen before, its mapped character should be `p`
                    if dict1[w] != p:
                        break

                ''' check mapping from the given pattern to the current word '''

                # if `p` is seen for the first time, store its mapping to `w`
                # in `dict2`
                if p not in dict2:
                    dict2[p] = w
                else:
                    # if `p` is seen before, its mapped character should be `w`
                    if dict2[p] != w:
                        break

                i = i + 1

            # if the current word matches the pattern, print it
            if i == len(pattern):
                print(word, end=' ')

if __name__ == '__main__':

    # a list of words
    words = ['leet', 'abcd', 'loot', 'geek', 'cool', 'for', 'peer', 'dear', 'seed',
            'meet', 'noon', 'otto', 'mess', 'loss']

    # given pattern
    pattern = 'moon'

    patternMatch(words, pattern)
```

The time complexity of the above solution is O(n.m), where `n` is the total number of words and `m` is the pattern’s length.

Also See:

> [Determine whether a string matches with a given pattern](https://www.techiedelight.com/determine-pattern-matches-string-not/ "Determine whether a string matches with a given pattern")

> [Determine whether characters of a string follow a specific order](https://www.techiedelight.com/determine-string-follows-specified-order/ "Determine whether characters of a string follow a specific order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
