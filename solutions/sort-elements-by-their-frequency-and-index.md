# Sort elements by their frequency and index

> Source: https://www.techiedelight.com/sort-elements-by-their-frequency-and-index/

Given an integer array, sort its element by their frequency and index. i.e., if two elements have different frequencies, then the one which has more frequency should come first; otherwise, the one which has less index should come first.

For example,

**Input :** [3, 3, 1, 1, 1, 8, 3, 6, 8, 7, 8] **Output:** [3, 3, 3, 1, 1, 1, 8, 8, 8, 6, 7]

> 

The idea is to write a custom comparison method to solve this problem. Let the two elements to be compared are `x` and `y`. Then

  1. If `x` and `y` have different frequencies, then the one with more frequency should be treated as smaller than the other.
  2. If `x` and `y` have the same frequencies, then the one with less index should be treated as smaller than the other.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <tuple>
#include <unordered_map>
#include <algorithm>
using namespace std;

// Custom comparator function
bool value_comparer(tuple<int, int, int> const& lhs,
    tuple<int, int, int> const& rhs)
{
    // If two elements have different frequencies, then
    // the one which has more frequency should come first
    if (get<1>(lhs) != get<1>(rhs)) {
        return get<1>(lhs) > get<1>(rhs);
    }
    // If two elements have the same frequencies, then the
    // one which has less index should come first
    else {
        return get<2>(lhs) < get<2>(rhs);
    }
}

// Custom sort by element's frequency and index
void sortByFrequencyAndIndex(int arr[], int n)
{
    if (n < 2) {
        return;
    }

    // key —> element, value —> (frequency, first_index)
    unordered_map<int, pair<int, int>> hm;

    // insert frequency of each array element into the map
    // and index of its first occurrence in the array
    for (int i = 0; i < n; i++)
    {
        // element seen before
        if (hm.find(arr[i]) != hm.end()) {
            hm[arr[i]].first++;
        }
        else {
            // element is seen for the first time
            hm[arr[i]] = make_pair(1, i);
        }
    }

    // create a vector of `tuple`
    vector<tuple<int, int, int>> tuples;

    // since a map cannot be sorted by its values, create
    // a tuple of all (element, frequency, first_index) pairs
    // and insert it into the vector
    for (auto it: hm)
    {
        pair<int, int> p = it.second;
        tuples.push_back(make_tuple(it.first, p.first, p.second));
    }

    // sort the tuples based on a custom comparator
    sort(tuples.begin(), tuples.end(), value_comparer);

    int a, b, c, k = 0;
    for (auto tup: tuples)
    {
        tie(a, b, c) = tup;
        for (int j = 0; j < b; j++) {
            arr[k++] = a;
        }
    }
}

int main()
{
    int a[] = { 3, 3, 1, 1, 1, 8, 3, 6, 8, 7, 8 };
    int n = sizeof(a) / sizeof(a[0]);

    sortByFrequencyAndIndex(a, n);

    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }

    return 0;
}
```

**Output:** 3 3 3 1 1 1 8 8 8 6 7

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

class Data implements Comparable<Data>
{
    int value, count, index;

    public Data(int value, int count, int index)
    {
        this.value = value;
        this.count = count;
        this.index = index;
    }

    public int compareTo(Data obj)
    {
        // If two elements have different frequencies, then
        // the one which has more frequency should come first
        if (this.count != obj.count) {
            return obj.count - this.count;
        }

        // If two elements have the same frequencies, then the
        // one which has less index should come first
        return this.index - obj.index;
    }
}

class Main
{
    // Custom sort by element's frequency and index
    public static void sortByFrequencyAndIndex(int[] arr)
    {
        if (arr == null || arr.length < 2) {
            return;
        }

        // insert frequency of each array element into the map
        // and index of its first occurrence in the array
        Map<Integer, Data> hm = new HashMap<>();
        for (int i = 0; i < arr.length; i++)
        {
            hm.putIfAbsent(arr[i], new Data(arr[i], 0, i));
            hm.get(arr[i]).count++;
        }

        // sort the values based on a custom comparator
        List<Data> values = hm.values().stream()
                .sorted()
                .collect(Collectors.toList());

        int k = 0;
        for (Data data: values)
        {
            for (int j = 0; j < data.count; j++) {
                arr[k++] = data.value;
            }
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 3, 3, 1, 1, 1, 8, 3, 6, 8, 7, 8 };

        sortByFrequencyAndIndex(arr);
        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
class Data:
    def __init__(self, value, index, count=0):
        self.value = value
        self.index = index
        self.count = count

# Custom sort by element's frequency and index
def sortByFrequencyAndIndex(arr):
    if arr is None or len(arr) < 2:
        return

    hm = {}

    # for each array element, insert into the dictionary
    # its frequency and index of its first occurrence in the array
    for i in range(len(arr)):
        hm.setdefault(arr[i], Data(arr[i], i)).count += 1

    # get the values
    values = [*hm.values()]

    '''
        Sort the values based on a custom comparator

        1. If two elements have different frequencies, then
        the one which has more frequency should come first.

        2. If two elements have the same frequencies, then the
        one which has less index should come first.
    '''

    values.sort(key=lambda x: (-x.count, x.index))

    k = 0
    for data in values:
        for j in range(data.count):
            arr[k] = data.value
            k += 1

if __name__ == '__main__':

    arr = [3, 3, 1, 1, 1, 8, 3, 6, 8, 7, 8]
    sortByFrequencyAndIndex(arr)
    print(arr)
```

The time complexity of the above solution is O(n + m.log(m)) and requires O(m) extra space, where `n` is the size of the input and `m` is the total number of distinct elements in the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 156

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
