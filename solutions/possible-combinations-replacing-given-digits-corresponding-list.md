# Find all possible combinations by replacing given digits with characters of the corresponding list

> Source: https://www.techiedelight.com/possible-combinations-replacing-given-digits-corresponding-list/

Given `n` lists of characters and a number whose digits lie between 1 and `n`, print all possible combinations by replacing its digits with the characters of the corresponding list. If any digit of the number gets repeated, it should be replaced by the same character considered in its previous occurrence.

For example,

**Input:** list[1] —> { ‘A’, ‘B’, ‘C’, ‘D’ } list[2] —> { ‘E’, ‘F’, ‘G’, ‘H’, ‘I’, ‘J’, ‘K’ } list[3] —> { ‘L’, ‘M’, ‘N’, ‘O’, ‘P’, ‘Q’ } list[4] —> { ‘R’, ‘S’, ‘T’ } list[5] —> { ‘U’, ‘V’, ‘W’, ‘X’, ‘Y’, ‘Z’ } key = 131 **Output:** ALA AMA ANA AOA APA AQA BLB BMB BNB BOB BPB BQB CLC CMC CNC COC CPC CQC DLD DMD DND DOD DPD DQD

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to consider every digit of the given key one by one, and for every digit, there are two possibilities:

  * If the digit is seen for the first time, replace it with each character in the corresponding list and recur for the next digit.
  * If the digit is seen before, replace it with the same character used in the previous occurrence.

To store the mapping of digits to characters of the list, use a map. If every digit of the key is processed, print the modified key. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
using namespace std;

// Top-down recursive function to find all possible combinations by
// replacing the key's digits with the corresponding characters in a list
void findCombinations(auto const &list, auto const &keys, auto &combinations,
            string result, int index, auto map)
{
    // print the result if every digit of the key is processed
    if (index == -1) {
        combinations.insert(result);
        return;
    }

    // stores the current digit
    int digit = keys[index];

    // get the size of the list corresponding to the current digit
    int len = list[digit].size();

    // if the digit is seen for the first time
    if (map.find(digit) == map.end())
    {
        // one by one, replace it with each character in the corresponding
        // list and recur for the next digit
        for (int i = 0; i < len; i++)
        {
            // store character that maps to the current digit in a map
            map[digit] = list[digit][i];

            // recur for the next digit
            findCombinations(list, keys, combinations, list[digit][i] + result,
                        index - 1, map);
        }
        return;
    }

    // if the digit is seen before, replace it with the same character
    // used in the previous occurrence
    findCombinations(list, keys, combinations, map[digit] + result, index - 1, map);
}

unordered_set<string> findCombinations(auto const &lists, auto const &keys)
{
    // create a set to store all combinations
    unordered_set<string> combinations;

    // invalid input
    if (lists.size() == 0 || keys.size() == 0) {
        return combinations;
    }

    // create an empty map to store the mapping of digits
    unordered_map<int, char> map;

    // find all combinations
    int n = keys.size();
    findCombinations(lists, keys, combinations, "", n - 1, map);

    return combinations;
}

int main()
{
    // `N` lists of characters
    vector<vector<char>> lists =
    {
        { 'A', 'B', 'C', 'D'},
        { 'E', 'F', 'G', 'H', 'I', 'J', 'K' },
        { 'L', 'M', 'N', 'O', 'P', 'Q' },
        { 'R', 'S', 'T'},
        { 'U', 'V', 'W', 'X', 'Y', 'Z' }
    };

    // input number in the form of an array
    vector<int> keys = {0, 2, 0};

    // find all combinations
    unordered_set<string> combinations = findCombinations(lists, keys);

    // print all combinations
    for (string combination: combinations) {
        cout << combination << ' ';
    }

    return 0;
}
```

##

```java
import java.util.*;

class Main
{
    // Top-down recursive function to find all possible combinations by
    // replacing the key's digits with the corresponding characters in a list
    public static void findCombinations(List<List<Character>> lists,
                                int[] keys, Set<String> combinations, String result,
                                int index, Map<Integer, Character> map)
    {
        // print the result if every digit of the key is processed
        if (index == -1) {
            combinations.add(result);
            return;
        }

        // stores the current digit
        int digit = keys[index];

        // get the size of the list corresponding to the current digit
        int len = lists.get(digit).size();

        // if the digit is seen for the first time
        if (!map.containsKey(digit))
        {
            // one by one, replace it with each character in the
            // corresponding list and recur for the next digit
            for (int i = 0; i < len; i++)
            {
                // store character that maps to the current digit in a map
                map.put(digit, lists.get(digit).get(i));

                // recur for the next digit
                findCombinations(lists, keys, combinations, lists.get(digit).get(i) +
                            result, index - 1, map);

                // backtrack
                map.remove(digit);
            }

            return;
        }

        // if the digit is seen before, replace it with the same character
        // used in the previous occurrence
        findCombinations(lists, keys, combinations, map.get(digit) + result,
                    index - 1, map);
    }

    public static Set<String> findCombinations(List<List<Character>> lists, int[] keys)
    {
        // HashSet to store all combinations
        Set<String> combinations = new HashSet<>();

        // invalid input
        if (lists == null || lists.size() == 0 || keys == null || keys.length == 0) {
            return combinations;
        }

        // create an empty map to store the mapping of digits
        Map<Integer, Character> map = new HashMap<>();

        // find all combinations
        findCombinations(lists, keys, combinations, "", keys.length - 1, map);

        return combinations;
    }

    public static void main(String[] args)
    {
        // `N` lists of characters
        List<List<Character>> list = Arrays.asList(
                Arrays.asList( 'A', 'B', 'C', 'D' ),
                Arrays.asList( 'E', 'F', 'G', 'H', 'I', 'J', 'K' ),
                Arrays.asList( 'L', 'M', 'N', 'O', 'P', 'Q' ),
                Arrays.asList( 'R', 'S', 'T' ),
                Arrays.asList( 'U', 'V', 'W', 'X', 'Y', 'Z' )
        );

        // input number in the form of an array
        int[] keys = {0, 2, 0};

        // find and print all combinations
        System.out.println(findCombinations(list, keys));
    }
}
```

##

```python3
# Top-down recursive function to find all possible combinations by
# replacing the key's digits with the corresponding characters in a list
def findCombinations(lists, keys, combinations, index, d, result=''):
    # print the result if every digit of the key is processed
    if index == -1:
        combinations.add(result)
        return

    # map stores the mapping of digits

    # stores the current digit
    digit = keys[index]

    # if the digit is seen for the first time
    if digit not in d:

        # get the size of the list corresponding to the current digit
        n = len(lists[digit])

        # one by one, replace it with each character in the corresponding
        # list and recur for the next digit
        for i in range(n):
            # store character that maps to the current digit in a dictionary
            d[digit] = lists[digit][i]

            # recur for the next digit
            findCombinations(lists, keys, combinations, index - 1,
                        d, str(lists[digit][i]) + result)

            # backtrack
            d.pop(digit)

        return

    # if the digit is seen before, replace it with the same character
    # used in the previous occurrence.
    findCombinations(lists, keys, combinations, index - 1, d, f'{d[digit]}{result}')

def findAllCombinations(lists, keys):

    # invalid input
    if not lists or not keys:
        return set()

    # set to store all combinations
    combinations = set()

    # find and return all combinations
    d = {}
    findCombinations(lists, keys, combinations, len(keys) - 1, d)
    return combinations

if __name__ == '__main__':

    # `N` lists of characters
    lists = [
        ['A', 'B', 'C', 'D'],
        ['E', 'F', 'G', 'H', 'I', 'J', 'K'],
        ['L', 'M', 'N', 'O', 'P', 'Q'],
        ['R', 'S', 'T'],
        ['U', 'V', 'W', 'X', 'Y', 'Z']
    ]

    # input number in the form of a list
    keys = [0, 2, 0]

    # find and print all combinations
    print(findAllCombinations(lists, keys))
```

**Output:** BOB DMD BNB AMA BPB BLB DND AOA DPD CQC BMB ANA ALA DOD DQD AQA BQB CLC CMC CNC COC DLD APA CPC

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find all possible combinations of words formed from the mobile keypad](https://www.techiedelight.com/find-possible-combinations-words-formed-from-mobile-keypad/ "Find all possible combinations of words formed from the mobile keypad")

> [Combinations of words formed by replacing given numbers with corresponding alphabets](https://www.techiedelight.com/combinations-of-words-formed-replacing-given-numbers-corresponding-english-alphabet/ "Combinations of words formed by replacing given numbers with corresponding alphabets")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.94/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
