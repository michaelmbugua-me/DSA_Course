# Find first `k` non-repeating characters in a string in a single traversal

> Source: https://www.techiedelight.com/first-k-non-repeating-characters-string/

Given a string, find first `k` non-repeating characters in it by doing only a single traversal of it.

For example, if the string is `ABCDBAGHCHFAC` and `k = 3`, output would be `'D', 'G', 'F'`.

> 

A simple solution would be to store each character’s count in a map or an array by traversing it once. Then traverse the string once more to find the first `k` characters having their count as `1`. The time complexity of this solution is O(n) and requires O(n) extra space, where `n` is the length of the input string. The problem with this solution is that we are traversing the string twice, violating the program constraints.

We can solve this problem in a single traversal of the string. The idea is to use a map to store each distinct character count and the index of its first or last occurrence in the string. Then traverse the map and push the index of all characters having count `1` into the [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). Finally, pop the top `k` keys from the min-heap, and that will be our first `k` non-repeating characters in the string.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
#include <queue>
using namespace std;

// Function to find first `k` non-repeating character in
// the string by doing only a single traversal
void findFirstKNonRepeating(string str, int k)
{
    // map to store character count and the index of its
    // last occurrence in the string
    unordered_map<char, pair<int, int>> map;

    for (int i = 0; i < str.length(); i++)
    {
        map[str[i]].first++;
        map[str[i]].second = i;
    }

    // create an empty min-heap
    priority_queue<int, vector<int>, greater<int>> pq;

    // traverse the map and push the index of all characters
    // having the count of 1 into the min-heap
    for (auto it: map)
    {
        int count = it.second.first;
        int index = it.second.second;

        if (count == 1) {
            pq.push(index);
        }
    }

    // pop the top `k` keys from the min-heap
    while (k-- && !pq.empty())
    {
        // extract the minimum node from the min-heap
        int min_index = pq.top();
        pq.pop();

        cout << str[min_index] << " ";
    }
}

int main()
{
    string str = "ABCDBAGHCHFAC";
    int k = 3;

    findFirstKNonRepeating(str, k);

    return 0;
}
```

**Output:** D G F

##

```java
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Pair
{
    private int count;
    private int index;

    Pair(int count, int index)
    {
        this.count = count;
        this.index = index;
    }

    Pair() {}

    public int getCount() {
        return count;
    }

    public int getIndex() {
        return index;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}

class Main
{
    // Function to find first `k` non-repeating character in
    // the string by doing only a single traversal
    public static void findFirstKNonRepeating(String str, int k)
    {
        // map to store character count and the index of its
        // last occurrence in the string
        Map<Character, Pair> map = new HashMap<>();

        for (int i = 0; i < str.length(); i++)
        {
            Pair pair = map.getOrDefault(str.charAt(i), new Pair());
            pair.setCount(pair.getCount() + 1);
            pair.setIndex(i);

            map.put(str.charAt(i), pair);
        }

        // create an empty min-heap
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        // traverse the map and push the index of all characters
        // having the count of 1 into the min-heap
        for (var value: map.values())
        {
            int count = value.getCount();
            int index = value.getIndex();

            if (count == 1) {
                pq.add(index);
            }
        }

        // pop the top `k` keys from the min-heap
        while (k-- > 0 && !pq.isEmpty())
        {
            // extract the minimum node from the min-heap
            System.out.print(str.charAt(pq.poll()) + " ");
        }
    }

    public static void main (String[] args)
    {
        String str = "ABCDBAGHCHFAC";
        int k = 3;

        findFirstKNonRepeating(str, k);
    }
}
```

##

```python3
from heapq import heappop, heappush

class Pair:
    def __init__(self, count=0, index=0):
        self.count = count
        self.index = index

    # Override the `__lt__()` function to make `Pair` class work with min-heap
    def __lt__(self, other):
        return self.count < other.count

# Function to find first `k` non-repeating character in
# the string by doing only a single traversal
def first_k_non_repeating(s, k):

    # dictionary to store character count and the index of its
    # last occurrence in the string
    d = {}

    for i in range(len(s)):
        pair = d.setdefault(s[i], Pair())
        pair.count = pair.count + 1
        pair.index = i

    # create an empty min-heap
    pq = []

    # traverse the dictionary and push the index of all characters
    # having the count of 1 into the min-heap
    for pair in d.values():
        if pair.count == 1:
            heappush(pq, pair.index)

    # pop the top `k` keys from the min-heap
    while k > 0 and pq:
        # extract the minimum node from the min-heap
        print(s[heappop(pq)], end=' ')
        k = k - 1

if __name__ == '__main__':

    s = 'ABCDBAGHCHFAC'
    k = 3

    first_k_non_repeating(s, k)
```

In the above solution, we are doing a complete traversal of the string and the map. The solution inserts all the map characters (all having a count of `1`) into the min-heap. So, the heap size becomes O(n) in the worst case. So, the time complexity of the following solution is O(n + k.log(n)) and requires O(n) auxiliary space.

We can reduce the heap size to O(k) in the worst case. The idea is to push only the first `k` characters into the [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap), and then for all subsequent elements in the map, if the current element is less than the root of the heap, replace the root with it. After we have processed every key of the map, the heap will contain the first `k` non-repeating characters. _(Note that by character, we mean index of it)_

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
#include <queue>
using namespace std;

// Function to find first `k` non-repeating character in
// the string by doing only a single traversal
void findFirstKNonRepeating(string str, int k)
{
    // map to store character count and the index of its
    // last occurrence in the string
    unordered_map<char, pair<int, int>> map;
    int n = str.length();

    for (int i = 0; i < n; i++)
    {
        map[str[i]].first++;
        map[str[i]].second = i;
    }

    // create an empty max-heap (max size will be `k`)
    priority_queue<int, vector<int>> pq;

    // traverse the map and process index of all characters
    // having a count of 1
    for (auto it: map)
    {
        int count = it.second.first;
        int index = it.second.second;

        if (count == 1)
        {
            // if the heap has less than `k` keys,
            // push the current character's index
            if (--k >= 0) {
                pq.push(index);
            }
            // otherwise, if the index of the current element is less than the
            // root of the heap, replace the root with the current element
            else if (index < pq.top())
            {
                pq.pop();
                pq.push(index);
            }
        }
    }

    // Now the heap contains an index of first `k` non-repeating characters

    // pop all keys from the max-heap
    while (!pq.empty())
    {
        // extract the maximum node from the max-heap
        int max_index = pq.top();
        pq.pop();

        cout << str[max_index] << " ";
    }
}

int main()
{
    string str = "ABCDBAGHCHFAC";
    int k = 3;

    findFirstKNonRepeating(str, k);

    return 0;
}
```

**Output:** F G D

##

```java
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Pair
{
    private int count;
    private int index;

    Pair(int count, int index)
    {
        this.count = count;
        this.index = index;
    }

    public int getCount() {
        return count;
    }

    public int getIndex() {
        return index;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}

class Main
{
    // Function to find first `k` non-repeating character in
    // the string by doing only a single traversal
    public static void findFirstKNonRepeating(String str, int k)
    {
        // map to store character count and the index of its
        // last occurrence in the string
        Map<Character, Pair> map = new HashMap<>();

        for (int i = 0; i < str.length(); i++)
        {
            if (!map.containsKey(str.charAt(i))) {
                map.put(str.charAt(i), new Pair(1, i));
            }
            else {
                Pair pair = map.get(str.charAt(i));
                pair.setCount(pair.getCount() + 1);
                pair.setIndex(i);
            }
        }

        // create an empty max-heap (max size will be `k`)
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());

        // traverse the map and process index of all characters
        // having a count of 1
        for (Pair value: map.values())
        {
            int count = value.getCount();
            int index = value.getIndex();

            if (count == 1)
            {
                // if the heap has less than `k` keys,
                // push the current character's index
                if (--k >= 0) {
                    pq.add(index);
                }
                // otherwise, if the index of the current element is less than the root
                // of the heap, replace the root with the current element
                else if (index < pq.peek())
                {
                    pq.poll();
                    pq.add(index);
                }
            }
        }

        // Now the heap contains an index of count `k` non-repeating characters

        // pop all keys from the max-heap
        while (!pq.isEmpty())
        {
            // extract the maximum node from the max-heap
            System.out.print(str.charAt(pq.poll()) + " ");
        }
    }

    public static void main (String[] args)
    {
        String str = "ABCDBAGHCHFAC";
        int k = 3;

        findFirstKNonRepeating(str, k);
    }
}
```

##

```python3
from heapq import heappop, heappush

class Pair:
    def __init__(self, count=0, index=0):
        self.count = count
        self.index = index

    # Override the `__lt__()` function to make `Pair` class work with max-heap
    def __lt__(self, other):
        return self.count > other.count

# Function to find first `k` non-repeating character in
# the string by doing only a single traversal
def first_k_non_repeating(s, k):

    # dictionary to store character count and the index of its
    # last occurrence in the string
    d = {}

    for i in range(len(s)):
        pair = d.setdefault(s[i], Pair())
        pair.count = pair.count + 1
        pair.index = i

    # create an empty max-heap (max size will be `k`)
    pq = []

    # traverse the dictionary and process index of all characters
    # having a count of 1
    for pair in d.values():
        if pair.count == 1:
            # if the heap has less than `k` keys,
            # push the current character's index
            k = k - 1
            if k >= 0:
                heappush(pq, pair.index)

            # otherwise, if the index of the current element is less than the root
            # of the heap, replace the root with the current element
            elif pair.index < pq[0]:
                heappop(pq)
                heappush(pq, pair.index)

    # Now the heap contains an index of count `k` non-repeating characters

    # pop all keys from the max-heap
    while pq:
        # extract the maximum node from the max-heap
        print(s[heappop(pq)], end=' ')

if __name__ == '__main__':

    s = 'ABCDBAGHCHFAC'
    k = 3

    first_k_non_repeating(s, k)
```

The time complexity of the above solution is O(n + k.log(k)) and requires O(k) extra space, where `n` is the length of the input string.
