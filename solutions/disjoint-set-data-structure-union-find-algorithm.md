# Disjoint–Set Data Structure (Union–Find Algorithm)

> Source: https://www.techiedelight.com/disjoint-set-data-structure-union-find-algorithm/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Explain the working of a disjoint–set data structure and efficiently implement it.

Problem: We have some number of items. We are allowed to merge any two items to consider them equal. At any point, we are allowed to ask whether two items are considered equal or not.

## What is a disjoint–set?

A disjoint–set is a data structure that keeps track of a set of elements partitioned into several disjoint (non-overlapping) subsets. In other words, a disjoint set is a group of sets where no item can be in more than one set. It is also called a union–find data structure as it supports union and find operation on subsets. Let’s begin by defining them:

Find: It determines in which subset a particular element is in and returns the representative of that particular set. An item from this set typically acts as a “representative” of the set.

Union: It merges two different subsets into a single subset, and the representative of one set becomes representative of another.

The disjoint–set also supports one other important operation called MakeSet, which creates a set containing only a given element in it.

## How does Union–Find work?

We can determine whether two elements are in the same subset by comparing the result of two _Find_ operations. If the two elements are in the same set, they have the same representation; otherwise, they belong to different sets. If the union is called on two elements, merge the two subsets to which the two elements belong.

## How to Implement Disjoint Sets?

Disjoint–set forests are data structures where each set is represented by a tree data in which each node holds a reference to its parent and the representative of each set is the root of that set’s tree.

  * _Find_ follows parent nodes until it reaches the root.
  * _Union_ combines two trees into one by attaching one tree’s root into the root of the other.

For example, consider five disjoint sets `S1`, `S2`, `S3`, `S4`, and `S5` represented by a tree, as shown below diagram. Each set initially contains only one element each, so their parent pointer points to itself or `NULL`.

`S1 = {1}, S2 ={2}, S3 = {3}, S4 ={4} and S5 = {5}`

The `_Find_` operation on element `i` will return representative of `Si`, where `1 <= i <= 5`, i.e., `_Find_(i) = i`.

If we do `_Union_ (S3, S4)`, `S3` and `S4` will be merged into one disjoint set, `S3`. Now,

`S1 = {1}, S2 ={2}, S3 = {3, 4} and S5 = {5}`.

`_Find_(4)` will return representative of set `S3`, i.e., `_Find_(4) = 3`

If we do `_Union_ (S1, S2)`, `S1` and `S2` will be merged into one disjoint set, `S1`. Now,

`S1 = {1, 2}, S3 = {3, 4} and S5 = {5}`.

`_Find_(2)` or `_Find_(1)` will return the representative of set `S1`, i.e., `_Find_(2) = _Find_(1) = 1`

If we do `_Union_ (S3, S1)`, `S3` and `S1` will be merged into one disjoint set, `S3`. Now,

`S3 = {1, 2, 3, 4} and S5 = {5}`.

One way of implementing these might be:

**function** _MakeSet_(x) x.parent = x **function** _Find_(x) if x.parent == x return x else return _Find_(x.parent) **function** _Union_(x, y) xRoot = _Find_(x) yRoot = _Find_(y) xRoot.parent = yRoot

Following is the C++, Java, and Python implementation of union–find that uses a [hash table](https://techiedelight.com/hashing-in-data-structure/) to implement a disjoint set:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// A class to represent a disjoint set
class DisjointSet
{
    unordered_map<int, int> parent;

public:

    // perform MakeSet operation
    void makeSet(vector<int> const &universe)
    {
        // create `n` disjoint sets (one for each item)
        for (int i: universe) {
            parent[i] = i;
        }
    }

    // Find the root of the set in which element `k` belongs
    int Find(int k)
    {
        // if `k` is root
        if (parent[k] == k) {
            return k;
        }

        // recur for the parent until we find the root
        return Find(parent[k]);
    }

    // Perform Union of two subsets
    void Union(int a, int b)
    {
        // find the root of the sets in which elements `x` and `y` belongs
        int x = Find(a);
        int y = Find(b);

        parent[x] = y;
    }
};

void printSets(vector<int> const &universe, DisjointSet &ds)
{
    for (int i: universe) {
        cout << ds.Find(i) << " ";
    }
    cout << endl;
}

// Disjoint–Set data structure (Union–Find algorithm)
int main()
{
    // universe of items
    vector<int> universe = { 1, 2, 3, 4, 5 };

    // initialize `DisjointSet` class
    DisjointSet ds;

    // create a singleton set for each element of the universe
    ds.makeSet(universe);
    printSets(universe, ds);

    ds.Union(4, 3);        // 4 and 3 are in the same set
    printSets(universe, ds);

    ds.Union(2, 1);        // 1 and 2 are in the same set
    printSets(universe, ds);

    ds.Union(1, 3);        // 1, 2, 3, 4 are in the same set
    printSets(universe, ds);

    return 0;
}
```

**Output:** 1 2 3 4 5 1 2 3 3 5 1 1 3 3 5 3 3 3 3 5

##

```java
import java.util.HashMap;
import java.util.Map;

// A class to represent a disjoint set
class DisjointSet
{
    private Map<Integer, Integer> parent = new HashMap<>();

    // perform MakeSet operation
    public void makeSet(int[] universe)
    {
        // create `n` disjoint sets (one for each item)
        for (int i: universe) {
            parent.put(i, i);
        }
    }

    // Find the root of the set in which element `k` belongs
    public int Find(int k)
    {
        // if `k` is root
        if (parent.get(k) == k) {
            return k;
        }

        // recur for the parent until we find the root
        return Find(parent.get(k));
    }

    // Perform Union of two subsets
    public void Union(int a, int b)
    {
        // find the root of the sets in which elements `x` and `y` belongs
        int x = Find(a);
        int y = Find(b);

        parent.put(x, y);
    }
}

class Main
{
    public static void printSets(int[] universe, DisjointSet ds)
    {
        for (int i: universe) {
            System.out.print(ds.Find(i) + " ");
        }

        System.out.println();
    }

    // Disjoint–Set data structure (Union–Find algorithm)
    public static void main(String[] args)
    {
        // universe of items
        int[] universe = { 1, 2, 3, 4, 5 };

        // initialize `DisjointSet` class
        DisjointSet ds = new DisjointSet();

        // create a singleton set for each element of the universe
        ds.makeSet(universe);
        printSets(universe, ds);

        ds.Union(4, 3);        // 4 and 3 are in the same set
        printSets(universe, ds);

        ds.Union(2, 1);        // 1 and 2 are in the same set
        printSets(universe, ds);

        ds.Union(1, 3);        // 1, 2, 3, 4 are in the same set
        printSets(universe, ds);
    }
}
```

##

```python3
# A class to represent a disjoint set
class DisjointSet:
    parent = {}

    # perform MakeSet operation
    def makeSet(self, universe):
        # create `n` disjoint sets (one for each item)
        for i in universe:
            self.parent[i] = i

    # Find the root of the set in which element `k` belongs
    def Find(self, k):
        # if `k` is root
        if self.parent[k] == k:
            return k
        # recur for the parent until we find the root
        return self.Find(self.parent[k])

    # Perform Union of two subsets
    def Union(self, a, b):
        # find the root of the sets in which elements
        # `x` and `y` belongs
        x = self.Find(a)
        y = self.Find(b)

        self.parent[x] = y

def printSets(universe, ds):
    print([ds.Find(i) for i in universe])

# Disjoint–Set data structure (Union–Find algorithm)
if __name__ == '__main__':

    # universe of items
    universe = [1, 2, 3, 4, 5]

    # initialize disjoint set
    ds = DisjointSet()

    # create a singleton set for each element of the universe
    ds.makeSet(universe)
    printSets(universe, ds)

    ds.Union(4, 3) # 4 and 3 are in the same set
    printSets(universe, ds)

    ds.Union(2, 1) # 1 and 2 are in the same set
    printSets(universe, ds)

    ds.Union(1, 3) # 1, 2, 3, 4 are in the same set
    printSets(universe, ds)
```

The above approach is no better than the [linked list](https://techiedelight.com/introduction-linked-lists/) approach because the tree it creates can be highly unbalanced; however, we can enhance it in two ways.

1\. The first way, called _union by rank_ , is to always attach the smaller tree to the root of the larger tree. Since it is the depth of the tree that affects the running time, the tree with a smaller depth gets added under the root of the deeper tree, which only increases the depth of the depths were equal. Single element trees are defined to have a rank of zero, and whenever two trees of the same rank `r` are united, the result has the rank of `r+1`. The worst-case running-time improves to O(log(n)) for the _Union_ or _Find_ operation.

2\. The second improvement, called _path compression_ , is a way of flattening the tree’s structure whenever _Find_ is used on it. The idea is that each node visited heading to a root node may as well be attached directly to the root node; they all share the same representative. To effect this, as _Find_ recursively traverses up the tree, it changes each node’s parent reference to point to the root that is found. The resulting tree is much flatter, speeding up future operations not only on these elements but on those referencing them, directly or indirectly.

Pseudocode for the improved `_MakeSet_` and `_Union_`:

**function** _MakeSet_(x) x.parent = x x.rank = 0 **function** _Union_(x, y) xRoot = _Find_(x) yRoot = _Find_(y) if xRoot == yRoot return // `x` and `y` are not already in the same set. Merge them. if xRoot.rank < yRoot.rank xRoot.parent = yRoot else if xRoot.rank > yRoot.rank yRoot.parent = xRoot else yRoot.parent = xRoot xRoot.rank = xRoot.rank + 1

These two techniques complement each other, and running time per operation is effectively a small constant. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// A class to represent a disjoint set
class DisjointSet
{
    unordered_map<int, int> parent;

    // stores the depth of trees
    unordered_map<int, int> rank;

public:
    // perform MakeSet operation
    void makeSet(vector<int> const &universe)
    {
        // create `n` disjoint sets (one for each item)
        for (int i: universe)
        {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    // Find the root of the set in which element `k` belongs
    int Find(int k)
    {
        // if `k` is not the root
        if (parent[k] != k)
        {
            // path compression
            parent[k] = Find(parent[k]);
        }

        return parent[k];
    }

    // Perform Union of two subsets
    void Union(int a, int b)
    {
        // find the root of the sets in which elements `x` and `y` belongs
        int x = Find(a);
        int y = Find(b);

        // if `x` and `y` are present in the same set
        if (x == y) {
            return;
        }

        // Always attach a smaller depth tree under the root of the deeper tree.
        if (rank[x] > rank[y]) {
            parent[y] = x;
        }
        else if (rank[x] < rank[y]) {
            parent[x] = y;
        }
        else {
            parent[x] = y;
            rank[y]++;
        }
    }
};

void printSets(vector<int> const &universe, DisjointSet &ds)
{
    for (int i: universe) {
        cout << ds.Find(i) << ' ';
    }
    cout << endl;
}

// Disjoint–Set data structure (Union–Find algorithm)
int main()
{
    // universe of items
    vector<int> universe = { 1, 2, 3, 4, 5 };

    // initialize `DisjointSet` class
    DisjointSet ds;

    // create a singleton set for each element of the universe
    ds.makeSet(universe);
    printSets(universe, ds);

    ds.Union(4, 3);        // 4 and 3 are in the same set
    printSets(universe, ds);

    ds.Union(2, 1);        // 1 and 2 are in the same set
    printSets(universe, ds);

    ds.Union(1, 3);        // 1, 2, 3, 4 are in the same set
    printSets(universe, ds);

    return 0;
}
```

**Output:** 1 2 3 4 5 1 2 3 3 5 1 1 3 3 5 3 3 3 3 5

##

```java
import java.util.HashMap;
import java.util.Map;

// A class to represent a disjoint set
class DisjointSet
{
    private Map<Integer, Integer> parent = new HashMap<>();

    // stores the depth of trees
    private Map<Integer, Integer> rank = new HashMap<>();

    // perform MakeSet operation
    public void makeSet(int[] universe)
    {
        // create `n` disjoint sets (one for each item)
        for (int i: universe)
        {
            parent.put(i, i);
            rank.put(i, 0);
        }
    }

    // Find the root of the set in which element `k` belongs
    public int Find(int k)
    {
        // if `k` is not the root
        if (parent.get(k) != k)
        {
            // path compression
            parent.put(k, Find(parent.get(k)));
        }

        return parent.get(k);
    }

    // Perform Union of two subsets
    public void Union(int a, int b)
    {
        // find the root of the sets in which elements `x` and `y` belongs
        int x = Find(a);
        int y = Find(b);

        // if `x` and `y` are present in the same set
        if (x == y) {
            return;
        }

        // Always attach a smaller depth tree under the root of the deeper tree.
        if (rank.get(x) > rank.get(y)) {
            parent.put(y, x);
        }
        else if (rank.get(x) < rank.get(y)) {
            parent.put(x, y);
        }
        else {
            parent.put(x, y);
            rank.put(y, rank.get(y) + 1);
        }
    }
}

class Main
{
    public static void printSets(int[] universe, DisjointSet ds)
    {
        for (int i: universe) {
            System.out.print(ds.Find(i) + " ");
        }
        System.out.println();
    }

    public static void main(String[] args)
    {
        // universe of items
        int[] universe = { 1, 2, 3, 4, 5 };

        // initialize `DisjointSet` class
        DisjointSet ds = new DisjointSet();

        // create a singleton set for each element of the universe
        ds.makeSet(universe);
        printSets(universe, ds);

        ds.Union(4, 3);        // 4 and 3 are in the same set
        printSets(universe, ds);

        ds.Union(2, 1);        // 1 and 2 are in the same set
        printSets(universe, ds);

        ds.Union(1, 3);        // 1, 2, 3, 4 are in the same set
        printSets(universe, ds);
    }
}
```

##

```python3
# A class to represent a disjoint set
class DisjointSet:
    parent = {}

    # stores the depth of trees
    rank = {}

    # perform MakeSet operation
    def makeSet(self, universe):
        # create `n` disjoint sets (one for each item)
        for i in universe:
            self.parent[i] = i
            self.rank[i] = 0

    # Find the root of the set in which element `k` belongs
    def Find(self, k):
        # if `k` is not the root
        if self.parent[k] != k:
            # path compression
            self.parent[k] = self.Find(self.parent[k])
        return self.parent[k]

    # Perform Union of two subsets
    def Union(self, a, b):
        # find the root of the sets in which elements `x` and `y` belongs
        x = self.Find(a)
        y = self.Find(b)

        # if `x` and `y` are present in the same set
        if x == y:
            return

        # Always attach a smaller depth tree under the root of the deeper tree.
        if self.rank[x] > self.rank[y]:
            self.parent[y] = x
        elif self.rank[x] < self.rank[y]:
            self.parent[x] = y
        else:
            self.parent[x] = y
            self.rank[y] = self.rank[y] + 1

def printSets(universe, ds):
    print([ds.Find(i) for i in universe])

if __name__ == '__main__':

    # universe of items
    universe = [1, 2, 3, 4, 5]

    # initialize `DisjointSet` class
    ds = DisjointSet()

    # create a singleton set for each element of the universe
    ds.makeSet(universe)
    printSets(universe, ds)

    ds.Union(4, 3)        # 4 and 3 are in the same set
    printSets(universe, ds)

    ds.Union(2, 1)        # 1 and 2 are in the same set
    printSets(universe, ds)

    ds.Union(1, 3)        # 1, 2, 3, 4 are in the same set
    printSets(universe, ds)
```

**Applications of Union–Find Algorithm:**

1\. Implementing [Kruskal’s Algorithm](https://techiedelight.com/kruskals-algorithm-for-finding-minimum-spanning-tree/) to find the minimum spanning tree of a graph.

2\. [Detecting cycle in an undirected graph](https://techiedelight.com/check-undirected-graph-contains-cycle-not/)

**References:**

1\. <https://en.wikipedia.org/wiki/Disjoint-set_data_structure>

2\. [Practical Programming Algorithm: Disjoint Sets – YouTube](https://www.youtube.com/watch?v=UBY4sF86KEY)
