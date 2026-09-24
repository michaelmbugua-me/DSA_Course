# Find all symmetric pairs in an array of pairs

> Source: https://www.techiedelight.com/find-symmetric-pairs-array-pairs/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of pairs of integers, find all symmetric pairs, i.e., pairs that mirror each other. For instance, pairs `(x, y)` and `(y, x)` are mirrors of each other.

For example,

**Input:** {3, 4}, {1, 2}, {5, 2}, {7, 10}, {4, 3}, {2, 5} **Output:** {4, 3} | {3, 4} {2, 5} | {5, 2}

> 

A naive solution would be to consider every pair and check if they are a mirror of each other or not. The time complexity of this solution is O(n2), where `n` is the size of the input.

We can solve this problem in linear time using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to consider every pair and insert the pair into a set. We also construct the mirror pair for every pair, and if the mirror pair is seen before (i.e., the mirror pair found in the set), print both pairs.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// Data structure to store a pair (or use `std::pair`)
struct Pair {
    int x, y;
};

// Function to find all pairs that are a mirror of each other.
// Here, we are creating a template that deduces the array size
// from its declared type
template<typename T, size_t n>
void findPairs(T const(& pair)[n])
{
    // create an empty set of strings
    unordered_set<string> set;

    // do for each pair
    for (int i = 0; i < n; i++)
    {
        // construct a pair `(x, y)` from `pair[i]`
        string p = "{" + to_string(pair[i].x) + ", " +
                        to_string(pair[i].y) + "}";

        // insert the current pair into the set
        set.insert(p);

        // construct a mirror pair `(y, x)` of `pair[i]`
        string reverse_pair = "{" + to_string(pair[i].y) + ", " +
                                    to_string(pair[i].x) + "}";

        // if the mirror pair is seen before, print the pairs
        if (set.find(reverse_pair) != set.end()) {
            cout << p << " | " << reverse_pair << endl;
        }
    }
}

int main()
{
    Pair pair[] = { {3, 4}, {1, 2}, {5, 2}, {7, 10}, {4, 3}, {2, 5} };
    findPairs(pair);

    return 0;
}
```

**Output:** {4, 3} | {3, 4} {2, 5} | {5, 2}

##

```java
import java.util.HashSet;
import java.util.Set;

// A Pair class
class Pair
{
    public int x, y;

    Pair(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}

class Main
{
    // Function to find all pairs that are a mirror of each other
    public static void findPairs(Pair[] pairs)
    {
        // create an empty set of strings
        Set<String> set = new HashSet<>();

        // do for each pair
        for (Pair curr_pair: pairs)
        {
            // construct a pair `(x, y)` from `curr_pair`
            String p = "{" + curr_pair.x + ", " + curr_pair.y + "}";

            // insert the current pair into the set
            set.add(p);

            // construct mirror pair `(y, x)` of `curr_pair`
            String rev_pair = "{" + curr_pair.y + ", " + curr_pair.x + "}";

            // if the mirror pair is seen before, print the pairs
            if (set.contains(rev_pair)) {
                System.out.println(p + " | " + rev_pair);
            }
        }
    }

    public static void main(String[] args)
    {
        Pair[] pairs =
        {
            new Pair(3, 4), new Pair(1, 2), new Pair(5, 2),
            new Pair(7, 10), new Pair(4, 3), new Pair(2, 5)
        };

        findPairs(pairs);
    }
}
```

##

```python3
# Function to find all pairs that are a mirror of each other
def findPairs(pairs):

    # create an empty set of strings
    s = set()

    # do for each pair
    for (x, y) in pairs:

        # insert the current pair `(x, y)` into the set
        s.add((x, y))

        # if mirror pair `(y, x)` is seen before, print the pairs
        if (y, x) in s:
            print((x, y), "|", (y, x))

if __name__ == '__main__':

    pairs = [(3, 4), (1, 2), (5, 2), (7, 10), (4, 3), (2, 5)]
    findPairs(pairs)
```

The time complexity of the above solution is O(n) and requires O(n) extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
