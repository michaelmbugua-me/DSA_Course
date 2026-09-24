# Find all possible combinations of words formed from the mobile keypad

> Source: https://www.techiedelight.com/find-possible-combinations-words-formed-from-mobile-keypad/

[String](https://www.techiedelight.com/Category/String/)

Given a sequence of numbers between 2 and 9, print all possible combinations of words formed from the mobile keypad which has english alphabets associated with each key.

**Input:** [2, 3, 4] **Output:** ADG BDG CDG AEG BEG CEG AFG BFG CFG ADH BDH CDH AEH BEH CEH AFH BFH CFH ADI BDI CDI AEI BEI CEI AFI BFI CFI

> 

## Recursive Implementation

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to consider every input digit one by one, replace the digit with each character in the mobile keypad, and recur for the next digit. When all the digits are processed, print the result.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

// Top-down recursive function to find all possible combinations by
// replacing key's digits with characters of the corresponding list
void findCombinations(auto &keypad, auto const &keys, auto &combinations,
                string result, int index)
{
    // if we have processed every digit of the key, print the result
    if (index == -1)
    {
        combinations.insert(result);
        return;
    }

    // stores the current digit
    int digit = keys[index];

    // get the list corresponding to the current digit and
    // one by one, replace the digit with each character in the
    // corresponding list and recur for the next digit
    for (char c: keypad[digit]) {
        findCombinations(keypad, keys, combinations, c + result, index - 1);
    }
}

unordered_set<string> findAllCombinations(auto const &keypad, auto const &keys)
{
    // create a set to store all combinations
    unordered_set<string> combinations;

    // invalid input - return empty set
    if (keypad.size() == 0 || keys.size() == 0) {
        return combinations;
    }

    // find and return all combinations
    int n = keys.size();
    findCombinations(keypad, keys, combinations, "", n - 1);
    return combinations;
}

int main()
{
    // mobile keypad
    vector<vector<char>> keypad =
    {
        {}, {},        // 0 and 1 digit doesn't have any characters associated
        { 'A', 'B', 'C' },
        { 'D', 'E', 'F' },
        { 'G', 'H', 'I' },
        { 'J', 'K', 'L' },
        { 'M', 'N', 'O' },
        { 'P', 'Q', 'R', 'S'},
        { 'T', 'U', 'V' },
        { 'W', 'X', 'Y', 'Z'}
    };

    // input number in the form of an array (number cannot start from 0 or 1)
    vector<int> keys = { 2, 3, 4 };

    // find all combinations
    unordered_set<string> combinations = findAllCombinations(keypad, keys);
    for (string s: combinations) {
        cout << s << ' ';
    }

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Main
{
    // Top-down recursive function to find all possible combinations of words formed
    // from the mobile keypad
    public static void findCombinations(List<List<Character>> keypad, int[] keys,
                            Set<String> combinations, String result, int index)
    {
        // if we have processed every digit of the key, print the result
        if (index == -1) {
            combinations.add(result);
            return;
        }

        // stores the current digit
        int digit = keys[index];

        // one by one, replace the digit with each character in the corresponding
        // list and recur for the next digit
        for (char c : keypad.get(digit)) {
            findCombinations(keypad, keys, combinations, c + result, index - 1);
        }
    }

    public static Set<String> combinations(List<List<Character>> keypad, int[] keys) {

        // HashSet to store all combinations
        Set<String> combinations = new HashSet<>();

        // invalid input - return empty set
        if (keypad == null || keypad.size() == 0 || keys == null || keys.length == 0) {
            return combinations;
        }

        // find and return all combinations
        findCombinations(keypad, keys, combinations, "", keys.length - 1);
        return combinations;
    }

    public static void main(String[] args)
    {
        // mobile keypad
        List<List<Character>> keypad = Arrays.asList(
                // 0 and 1 digit doesn't have any characters associated
                Arrays.asList(),
                Arrays.asList(),
                Arrays.asList('A', 'B', 'C'),
                Arrays.asList('D', 'E', 'F'),
                Arrays.asList('G', 'H', 'I'),
                Arrays.asList('J', 'K', 'L'),
                Arrays.asList('M', 'N', 'O'),
                Arrays.asList('P', 'Q', 'R', 'S'),
                Arrays.asList('T', 'U', 'V'),
                Arrays.asList('W', 'X', 'Y', 'Z')
        );

        // input number in the form of an array (number cannot start from 0 or 1)
        int[] keys = {2, 3, 4};

        // find all combinations
        System.out.println(combinations(keypad, keys));
    }
}
```

##

```python3
# Top-down recursive function to find all possible combinations of words formed
# from the mobile keypad
def findCombinations(keypad, keys, combinations, index, result=''):
    # if we have processed every digit of the key, print the result
    if index == -1:
        combinations.add(result)
        return

    # stores the current digit
    digit = keys[index]

    # get the size of the list corresponding to the current digit
    length = len(keypad[digit])

    # one by one, replace the digit with each character in the corresponding
    # list and recur for the next digit
    for i in range(length):
        findCombinations(keypad, keys, combinations, index - 1, keypad[digit][i] + result)

def findAllCombinations(keypad, keys):

    # invalid input - return empty set
    if not keypad or not keys:
        return set()

    # set to store all combinations
    combinations = set()

    # find and return all combinations
    findCombinations(keypad, keys, combinations, len(keys) - 1)
    return combinations

if __name__ == '__main__':

    # mobile keypad
    keypad = {
        # 0 and 1 digit don't have any characters associated
        2: ['A', 'B', 'C'],
        3: ['D', 'E', 'F'],
        4: ['G', 'H', 'I'],
        5: ['J', 'K', 'L'],
        6: ['M', 'N', 'O'],
        7: ['P', 'Q', 'R', 'S'],
        8: ['T', 'U', 'V'],
        9: ['W', 'X', 'Y', 'Z']
    }

    # input number in the form of a list (number cannot start from 0 or 1)
    keys = [2, 3, 4]

    # find all combinations
    combinations = findAllCombinations(keypad, keys)
    print(combinations)
```

**Output:** ADG BDG CDG AEG BEG CEG AFG BFG CFG ADH BDH CDH AEH BEH CEH AFH BFH CFH ADI BDI CDI AEI BEI CEI AFI BFI CFI

## Iterative Implementation

We can also solve this problem iteratively using a list. The idea remains the same, but instead of recursing, we push the partial-word into a list. For each character associated with a current digit in the keypad, we append each word’s character in the output list and push the result into a list. So at the end of each iteration, the list contains all possible combinations of words until the current digit. We repeat this process until all digits are processed.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Top-down recursive function to find all possible combinations by
// replacing key's digits with characters of the corresponding list
void findCombinations(auto const &keypad, auto const &keys)
{
    // list to store combinations of all possible words
    vector<string> list;

    // push all characters associated with the first digit into the output list
    for (char c: keypad[keys[0]]) {
        list.push_back(string(1, c));
    }

    // start from the second digit
    for (int i = 1; i < keys.size(); i++)
    {
        // create a temporary vector
        vector<string> vec;

        // for each character associated with the current digit in the keypad,
        for (char c: keypad[keys[i]])
        {
            // append each word's current character in the output list
            // and push into a temporary vector
            for (string str: list) {
                vec.push_back(str + c);
            }
        }

        // vector `vec` now contains all possible combinations of words
        // until the current digit

        // replace contents of output list with that of the temporary vector
        list = vec;
    }

    // print output list containing all combinations of words possible
    for (string str: list) {
        cout << str << " ";
    }
}

int main()
{
    // mobile keypad
    vector<vector<char>> keypad =
    {
        {}, {},        // 0 and 1 digit doesn't have any characters associated
        { 'A', 'B', 'C' },
        { 'D', 'E', 'F' },
        { 'G', 'H', 'I' },
        { 'J', 'K', 'L' },
        { 'M', 'N', 'O' },
        { 'P', 'Q', 'R', 'S'},
        { 'T', 'U', 'V' },
        { 'W', 'X', 'Y', 'Z'}
    };

    // input number in the form of an array (number cannot start from 0 or 1)
    vector<int> keys = { 2, 3, 4 };

    // find all combinations
    findCombinations(keypad, keys);

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Main
{
    // Iterative function to find all possible combinations of words
    // formed from the mobile keypad
    public static Set<String> findCombinations(List<List<Character>> keypad, int[] keys)
    {
        // HashSet to store combinations of all possible words
        Set<String> combinations = new HashSet<>();

        // invalid input - return empty set
        if (keypad == null || keypad.size() == 0 || keys == null || keys.length == 0) {
            return combinations;
        }

        // push all characters associated with the first digit into the output list
        for (char ch : keypad.get(keys[0])) {
            combinations.add(String.valueOf(ch));
        }

        // start from the second digit
        for (int i = 1; i < keys.length; i++) {
            // create a temporary list and clear the contents of the output list
            Set<String> prevList = new HashSet<>(combinations);
            combinations.clear();

            // for each character associated with the current digit in the keypad,
            for (Character ch : keypad.get(keys[i])) {
                // append each word's current character in the output list
                for (String s : prevList) {
                    combinations.add(s + ch);
                }
            }

            // list now contains all possible combinations of words
            // until the current digit
        }

        // return output list containing all combinations of words possible
        return combinations;
    }

    public static void main(String[] args)
    {
        // mobile keypad
        List<List<Character>> keypad = Arrays.asList(
                // 0 and 1 digit doesn't have any characters associated
                Arrays.asList(),
                Arrays.asList(),
                Arrays.asList('A', 'B', 'C'),
                Arrays.asList('D', 'E', 'F'),
                Arrays.asList('G', 'H', 'I'),
                Arrays.asList('J', 'K', 'L'),
                Arrays.asList('M', 'N', 'O'),
                Arrays.asList('P', 'Q', 'R', 'S'),
                Arrays.asList('T', 'U', 'V'),
                Arrays.asList('W', 'X', 'Y', 'Z')
        );

        // input number in the form of an array (number cannot start from 0 or 1)
        int[] keys = {2, 3, 4};

        // find all combinations
        Set<String> combinations = findCombinations(keypad, keys);
        System.out.println(combinations);
    }
}
```

##

```python3
# Iterative function to find all possible combinations of words
# formed from the mobile keypad
def findAllCombinations(keypad, keys):

    # invalid input - return empty set
    if not keypad or not keys:
        return set()

    # maintain a list to store combinations of all possible words
    # push all characters associated with the first digit into the output list
    combinations = {str(ch) for ch in keypad[keys[0]]}

    # start from the second digit
    for i in range(1, len(keys)):
        # create a temporary list and clear the contents of the output list
        prevList = combinations.copy()

        # for each character associated with the current digit in the keypad,
        # append each word's current character in the output list
        combinations = {s + ch for ch in keypad[keys[i]] for s in prevList}

    # list now contains all possible combinations of words
    # until the current digit

    # print output list containing all combinations of words possible
    return combinations

if __name__ == '__main__':

    # mobile keypad
    keypad = {
        # 0 and 1 digit don't have any characters associated
        2: ['A', 'B', 'C'],
        3: ['D', 'E', 'F'],
        4: ['G', 'H', 'I'],
        5: ['J', 'K', 'L'],
        6: ['M', 'N', 'O'],
        7: ['P', 'Q', 'R', 'S'],
        8: ['T', 'U', 'V'],
        9: ['W', 'X', 'Y', 'Z']
    }

    # input number in the form of a list (number cannot start from 0 or 1)
    keys = [2, 3, 4]

    # find all combinations
    combinations = findAllCombinations(keypad, keys)
    print(combinations)
```

**Output:** [ADG, BDG, CDG, AEG, BEG, CEG, AFG, BFG, CFG, ADH, BDH, CDH, AEH, BEH, CEH, AFH, BFH, CFH, ADI, BDI, CDI, AEI, BEI, CEI, AFI, BFI, CFI]

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
