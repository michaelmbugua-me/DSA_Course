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

Following is a TypeScript implementation of union–find that uses a [hash table](https://techiedelight.com/hashing-in-data-structure/) to implement a disjoint set:

```ts
// A class to represent a disjoint set
class DisjointSet {
    parent: Map<number, number> = new Map();

    // perform MakeSet operation
    makeSet(universe: number[]): void {
        // create `n` disjoint sets (one for each item)
        for (const i of universe) {
            this.parent.set(i, i);
        }
    }

    // Find the root of the set in which element `k` belongs
    Find(k: number): number {
        // if `k` is root
        if (this.parent.get(k) === k) {
            return k;
        }
        // recur for the parent until we find the root
        return this.Find(this.parent.get(k) as number);
    }

    // Perform Union of two subsets
    Union(a: number, b: number): void {
        // find the root of the sets in which elements
        // `x` and `y` belongs
        const x = this.Find(a);
        const y = this.Find(b);

        this.parent.set(x, y);
    }
}

function printSets(universe: number[], ds: DisjointSet): void {
    console.log(universe.map((i) => ds.Find(i)));
}

// Disjoint–Set data structure (Union–Find algorithm)

// universe of items
const universe = [1, 2, 3, 4, 5];

// initialize disjoint set
const ds = new DisjointSet();

// create a singleton set for each element of the universe
ds.makeSet(universe);
printSets(universe, ds);

ds.Union(4, 3); // 4 and 3 are in the same set
printSets(universe, ds);

ds.Union(2, 1); // 1 and 2 are in the same set
printSets(universe, ds);

ds.Union(1, 3); // 1, 2, 3, 4 are in the same set
printSets(universe, ds);
```

**Output:** 1 2 3 4 5 1 2 3 3 5 1 1 3 3 5 3 3 3 3 5

The above approach is no better than the [linked list](https://techiedelight.com/introduction-linked-lists/) approach because the tree it creates can be highly unbalanced; however, we can enhance it in two ways.

1\. The first way, called _union by rank_ , is to always attach the smaller tree to the root of the larger tree. Since it is the depth of the tree that affects the running time, the tree with a smaller depth gets added under the root of the deeper tree, which only increases the depth of the depths were equal. Single element trees are defined to have a rank of zero, and whenever two trees of the same rank `r` are united, the result has the rank of `r+1`. The worst-case running-time improves to O(log(n)) for the _Union_ or _Find_ operation.

2\. The second improvement, called _path compression_ , is a way of flattening the tree’s structure whenever _Find_ is used on it. The idea is that each node visited heading to a root node may as well be attached directly to the root node; they all share the same representative. To effect this, as _Find_ recursively traverses up the tree, it changes each node’s parent reference to point to the root that is found. The resulting tree is much flatter, speeding up future operations not only on these elements but on those referencing them, directly or indirectly.

Pseudocode for the improved `_MakeSet_` and `_Union_`:

**function** _MakeSet_(x) x.parent = x x.rank = 0 **function** _Union_(x, y) xRoot = _Find_(x) yRoot = _Find_(y) if xRoot == yRoot return // `x` and `y` are not already in the same set. Merge them. if xRoot.rank < yRoot.rank xRoot.parent = yRoot else if xRoot.rank > yRoot.rank yRoot.parent = xRoot else yRoot.parent = xRoot xRoot.rank = xRoot.rank + 1

These two techniques complement each other, and running time per operation is effectively a small constant. The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a disjoint set
class DisjointSet {
    parent: Map<number, number> = new Map();

    // stores the depth of trees
    rank: Map<number, number> = new Map();

    // perform MakeSet operation
    makeSet(universe: number[]): void {
        // create `n` disjoint sets (one for each item)
        for (const i of universe) {
            this.parent.set(i, i);
            this.rank.set(i, 0);
        }
    }

    // Find the root of the set in which element `k` belongs
    Find(k: number): number {
        // if `k` is not the root
        if (this.parent.get(k) !== k) {
            // path compression
            this.parent.set(k, this.Find(this.parent.get(k) as number));
        }
        return this.parent.get(k) as number;
    }

    // Perform Union of two subsets
    Union(a: number, b: number): void {
        // find the root of the sets in which elements `x` and `y` belongs
        const x = this.Find(a);
        const y = this.Find(b);

        // if `x` and `y` are present in the same set
        if (x === y) {
            return;
        }

        // Always attach a smaller depth tree under the root of the deeper tree.
        if (this.rank.get(x) as number > this.rank.get(y) as number) {
            this.parent.set(y, x);
        }
        else if (this.rank.get(x) as number < this.rank.get(y) as number) {
            this.parent.set(x, y);
        }
        else {
            this.parent.set(x, y);
            this.rank.set(y, (this.rank.get(y) as number) + 1);
        }
    }
}

function printSets(universe: number[], ds: DisjointSet): void {
    console.log(universe.map((i) => ds.Find(i)));
}

// Disjoint–Set data structure (Union–Find algorithm)

// universe of items
const universe = [1, 2, 3, 4, 5];

// initialize `DisjointSet` class
const ds = new DisjointSet();

// create a singleton set for each element of the universe
ds.makeSet(universe);
printSets(universe, ds);

ds.Union(4, 3); // 4 and 3 are in the same set
printSets(universe, ds);

ds.Union(2, 1); // 1 and 2 are in the same set
printSets(universe, ds);

ds.Union(1, 3); // 1, 2, 3, 4 are in the same set
printSets(universe, ds);
```

**Applications of Union–Find Algorithm:**

1\. Implementing [Kruskal’s Algorithm](https://techiedelight.com/kruskals-algorithm-for-finding-minimum-spanning-tree/) to find the minimum spanning tree of a graph.

2\. [Detecting cycle in an undirected graph](https://techiedelight.com/check-undirected-graph-contains-cycle-not/)

**References:**

1\. <https://en.wikipedia.org/wiki/Disjoint-set_data_structure>

2\. [Practical Programming Algorithm: Disjoint Sets – YouTube](https://www.youtube.com/watch?v=UBY4sF86KEY)
