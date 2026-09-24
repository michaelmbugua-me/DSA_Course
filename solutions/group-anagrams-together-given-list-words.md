# Group anagrams together from a list of words

> Source: https://www.techiedelight.com/group-anagrams-together-given-list-words/

Given a list of words, efficiently group all anagrams.

The two strings, `X` and `Y`, are anagrams if by rearranging `X's` letters, we can get `Y` using all the original letters of `X` exactly once. For example, all these pairs are anagrams as lhs can be rearranged to rhs and vice-versa.

actors = costar altered = related auctioned = education aspired = despair mastering = streaming recurd = secured

The problem requires the anagrams to be grouped together. For example,

**Input:** [CARS, REPAID, DUES, NOSE, SIGNED, LANE, PAIRED, ARCS, GRAB, USED, ONES, BRAG, SUED, LEAN, SCAR, DESIGN] **Output:** GRAB BRAG CARS ARCS SCAR REPAID PAIRED LANE LEAN SIGNED DESIGN DUES USED SUED NOSE ONES

> 

The idea is to sort each word on the list and construct a map where the map’s key is each sorted word, and the map’s value is a list of indices in the array where it is present. After creating the map, traverse the map and get indices for each sorted key. The anagrams are present in the actual list at those indices.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <set>
#include <algorithm>
using namespace std;

// Function to group anagrams from a given list of words
set<set<string>> groupAnagrams(vector<string> const &words)
{
    // a set to store anagrams
    set<set<string>> anagrams;

    // construct a vector from the given words with each word sorted
    vector<string> list(words);
    for (string &s: list) {        // don't forget to put `&`
        sort(s.begin(), s.end());
    }

    // construct a map where the key is each sorted word,
    // and value is a list of indices where it is present
    unordered_map<string, vector<int>> map;
    for (int i = 0; i < words.size(); i++) {
        map[list[i]].push_back(i);
    }

    // traverse the map and read indices for each sorted key.
    // The anagrams are present in the actual list at those indices
    for (auto itr: map)
    {
        set<string> anagram;
        for (int index: itr.second) {
            anagram.insert(words[index]);
        }
        if (anagram.size() > 1) {
            anagrams.insert(anagram);
        }
    }

    return anagrams;
}

int main()
{
    // vector of words
    vector<string> words =
    {
        "CARS", "REPAID", "DUES", "NOSE", "SIGNED", "LANE", "PAIRED", "ARCS",
        "GRAB", "USED", "ONES", "BRAG", "SUED", "LEAN", "SCAR", "DESIGN"
    };

    // get set containing all the anagrams grouped together
    set<set<string>> anagrams = groupAnagrams(words);

    // print the result
    for (set<string> anagram: anagrams) {
        for (string s: anagram) {
            cout << s << ' ';
        }
        cout << endl;
    }

    return 0;
}
```

**Output:** ARCS CARS SCAR BRAG GRAB DESIGN SIGNED DUES SUED USED LANE LEAN NOSE ONES PAIRED REPAID

##

```java
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class Main
{
    // Function to group anagrams from a given list of words
    public static Set<Set<String>> groupAnagrams(List<String> words)
    {
        // a set to store anagrams
        Set<Set<String>> anagrams = new HashSet<>();

        // base case
        if (words == null) {
            return anagrams;
        }

        // sort each word on the list
        List<String> list = words.stream()
                .map(s -> Stream.of(s.split("")).sorted()
                        .collect(Collectors.joining()))
                .collect(Collectors.toList());

        // construct a map where the key is each sorted word,
        // and value is a list of indices where it is present
        Map<String, List<Integer>> map = new HashMap<>();
        for (int i = 0; i < list.size(); i++)
        {
            map.putIfAbsent(list.get(i), new ArrayList<>());
            map.get(list.get(i)).add(i);
        }

        // traverse the map and read indices for each sorted key.
        // The anagrams are present in the actual list at those indices
        for (var entry: map.entrySet())
        {
            Set<String> collection = entry.getValue().stream()
                    .map(i -> words.get(i))
                    .collect(Collectors.toSet());
            if (collection.size() > 1) {
                anagrams.add(collection);
            }
        }

        return anagrams;
    }

    public static void main(String[] args)
    {
        // list of words
        List<String> words = Arrays.asList("CARS", "REPAID", "DUES", "NOSE", "SIGNED",
                "LANE", "PAIRED", "ARCS", "GRAB", "USED", "ONES", "BRAG",
                "SUED", "LEAN", "SCAR", "DESIGN");

        Set<Set<String>> anagrams = groupAnagrams(words);
        for (Set<String> anagram: anagrams) {
            System.out.println(anagram);
        }
    }
}
```

##

```python3
# Function to group anagrams from a given list of words
def groupAnagrams(words):
    # a list to store anagrams
    anagrams = []

    # base case
    if not words:
        return anagrams

    # sort each word on the list
    nums = [''.join(sorted(word)) for word in words]

    # construct a dictionary where the key is each sorted word,
    # and value is a list of indices where it is present
    d = {}
    for i, e in enumerate(nums):
        d.setdefault(e, []).append(i)

    # traverse the dictionary and read indices for each sorted key.
    # The anagrams are present in the actual list at those indices
    for index in d.values():
        collection = tuple(words[i] for i in index)
        if len(collection) > 1:
            anagrams.append(collection)

    return anagrams

if __name__ == '__main__':
    # a list of words
    words = ['CARS', 'REPAID', 'DUES', 'NOSE', 'SIGNED', 'LANE', 'PAIRED', 'ARCS',
             'GRAB', 'USED', 'ONES', 'BRAG', 'SUED', 'LEAN', 'SCAR', 'DESIGN']

    anagrams = groupAnagrams(words)
    for anagram in anagrams:
        print(anagram)
```

We can also use [multimap](https://techiedelight.com/google-guava-multimap-class-java/) to solve this problem, as demonstrated below:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <set>
#include <algorithm>
using namespace std;

// Function to group anagrams from a given list of words
set<set<string>> groupAnagrams(vector<string> const &words)
{
    // a set to store anagrams
    set<set<string>> anagrams;

    // construct a vector from the given words with each word sorted
    vector<string> list(words);
    for (string &s: list) {        // don't forget to put `&`
        sort(s.begin(), s.end());
    }

    // construct an `unordered_multimap` where the key is each sorted word,
    // and value is a list of indices where it is present
    unordered_multimap<string, int> map;
    for (int i = 0; i < words.size(); i++) {
        map.insert(make_pair(list[i], i));
    }

    // iterate through the multimap and read indices for each sorted key.
    // The anagrams are present in the actual list at those indices
    auto itr = map.begin();
    while (itr != map.end())
    {
        set<string> anagram;
        for (auto curr = itr; itr != map.end() && itr->first == curr->first; itr++) {
            anagram.insert(words[itr->second]);
        }
        if (anagram.size() > 1) {
            anagrams.insert(anagram);
        }
    }

    return anagrams;
}

int main()
{
    // vector of words
    vector<string> words =
    {
        "CARS", "REPAID", "DUES", "NOSE", "SIGNED", "LANE", "PAIRED", "ARCS",
        "GRAB", "USED", "ONES", "BRAG", "SUED", "LEAN", "SCAR", "DESIGN"
    };

    // get set containing all the anagrams grouped together
    set<set<string>> anagrams = groupAnagrams(words);

    // print the result
    for (set<string> anagram: anagrams) {
        for (string s: anagram) {
            cout << s << ' ';
        }
        cout << endl;
    }

    return 0;
}
```

**Output:** ARCS CARS SCAR BRAG GRAB DESIGN SIGNED DUES SUED USED LANE LEAN NOSE ONES PAIRED REPAID

The time complexity of the above solutions is O(N × M × log(M)), where `N` is the total number of words and `M` is the size of the longest word in the list.
