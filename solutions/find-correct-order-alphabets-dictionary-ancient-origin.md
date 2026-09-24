# Find correct order of alphabets in a given dictionary of ancient origin

> Source: https://www.techiedelight.com/find-correct-order-alphabets-dictionary-ancient-origin/

Given a dictionary of ancient origin where the words are arranged alphabetically, find the correct order of alphabets in the ancient language.

For example,

**Input:** Ancient dictionary { ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß } **Output:** The correct order of alphabets in the ancient language is {¥ € ‰ ð ± ß}. Since the input is small, more than one ordering is possible. Another such ordering is {¥ € ð ± ß ‰}. **Input:** Ancient dictionary { ÿ€±š, €€€ß, €€‰ð, ðß, ±ß¥š } **Output:** The correct order of alphabets in the ancient language is {ÿ € ‰ ð ±}. The alphabets {š, ß, ¥} are not included in the order as they are not properly defined.

If we carefully analyze the problem, we can see that it is a variation of [Topological sorting](https://techiedelight.com/topological-sorting-dag/) of a DAG. A topological sorting of a directed acyclic graph is a linear ordering of its vertices such that for every directed edge `(u —> v)` from vertex `u` to vertex `v`, `u` comes before `v` in the ordering.

For example, consider the dictionary `{ ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß }` of ancient words. For each of the edges `(x —> y)` shown below, `x` should appear before `y` in the final ordering.

¥ ——> € € ——> ð, ‰ ± ——> ß ð ——> ±

If we perform topological sorting on the above graph, we get the correct order of alphabets in the ancient language: `{¥ € ‰ ð ± ß}` or `{¥ € ð ± ß ‰}`.

The idea is to iterate through the complete dictionary and compare adjacent words for a character mismatch. If a mismatch between adjacent words is seen, insert such a pair into a graph. The resultant graph is a DAG since all words in the dictionary are arranged alphabetically. Since the graph has no directed cycles, perform topological sorting on it, resulting in the correct order of alphabets in the ancient language.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
using namespace std;

// Define the maximum number of alphabets in the ancient dictionary
#define N 100

// A class to represent a graph object
class Graph
{
public:
    // a vector of vectors to represent an adjacency list
    vector<unordered_set<int>> adjList;

    // Graph Constructor
    Graph()
    {
        // resize the vector to hold `N` elements of type `unordered_set<int>`
        adjList.resize(N);
    }
};

// Perform DFS on the graph and set the departure time of all vertices of the graph
void DFS(Graph const &graph, int v, vector<bool>
    &discovered, vector<int> &departure, int &time)
{
    // mark the current node as discovered
    discovered[v] = true;

    // set the arrival time of vertex `v`
    time++;

    // do for every edge `v —> u`
    for (int u: graph.adjList[v])
    {
        // if `u` is not yet discovered
        if (!discovered[u]) {
            DFS(graph, u, discovered, departure, time);
        }
    }

    // ready to backtrack
    // set departure time of vertex `v`
    departure[time] = v;
    time++;
}

// Utility function to performs topological sort on a given DAG
void doTopologicalSort(Graph const &graph, unordered_map<int, string> &map)
{
    // `departure[]` stores the vertex number using departure time as an index
    vector<int> departure(2*N, -1);

    /* If we had done it the other way around, i.e., fill the array
       with departure time using vertex number as an index, we would
       need to sort it later */

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(N);
    int time = 0;

    // perform DFS on all undiscovered connected vertices
    for (int i = 0; i < N; i++)
    {
        if (!discovered[i] && graph.adjList[i].size() != 0) {
            DFS(graph, i, discovered, departure, time);
        }
    }

    cout << "The correct order of alphabets in the ancient language is ";

    // Print the vertices in order of their decreasing
    // departure time in DFS, i.e., in topological order
    for (int i = 2*N - 1; i >= 0; i--)
    {
        if (departure[i] != -1) {
            cout << map[departure[i]] << " ";
        }
    }
}

// Utility function to print adjacency list representation of a graph
void printGraph(Graph const &graph, unordered_map<int, string> &map)
{
    for (int i = 0; i < N; i++)
    {
        // ignore vertices with no outgoing edges
        if (graph.adjList[i].size() != 0)
        {
            // print current vertex
            cout << map[i] << " ——> ";

            // print all neighboring vertices of a vertex `i`
            for (int v: graph.adjList[i]) {
                cout << map[v] << " ";
            }

            cout << endl;
        }
    }
    cout << endl;
}

// Utility function to construct an inverse map from the original map to do
// the reverse lookup in constant time
template<typename K, typename V>
unordered_map<V, K> inverse_map(unordered_map<K, V> &map)
{
    unordered_map<V, K> inv;
    for_each(map.begin(), map.end(),
                [&inv] (const pair<K, V> &p) {
                    inv.insert(make_pair(p.second, p.first));
                });
    return inv;
}

// Function to find the correct order of alphabets in a given dictionary of
// ancient origin. This function assumes that the input is correct.
void findAlphabetsOrder(vector<vector<string>> &dict)
{
    // create an `unordered_map` to map each non-ASCII character present in the
    // given dictionary with a unique integer
    unordered_map<string, int> map;

    int k = 0;

    // do for each word
    for (auto word: dict)
    {
        // do for each non-ASCII character of the word
        for (string s: word)
        {
            // if the current character is not present on the map, insert it
            if (map.find(s) == map.end()) {
                map[s] = k++;
            }
        }
    }

    // create a graph containing `N` nodes
    Graph graph;

    // iterate through the complete dictionary and compare adjacent words
    // for character mismatch
    for (int i = 1; i < dict.size(); i++)
    {
        // previous word in the dictionary
        auto prev = dict[i-1];

        // current word in the dictionary
        auto curr = dict[i];

        // iterate through both `prev` and `curr` simultaneously and find the
        // first mismatching character
        for (int j = 0; j < prev.size() && j < curr.size(); j++)
        {
            // mismatch found
            if (prev[j] != curr[j])
            {
                // add an edge from the current character of `prev` to the
                // current character of `curr` in the graph
                graph.adjList[map[prev[j]]].insert(map[curr[j]]);
                break;
            }
        }
    }

    // create a reverse map
    unordered_map<int, string> reverse = inverse_map(map);

    // printGraph(graph, reverse);

    // perform a topological sort on the above graph
    doTopologicalSort(graph, reverse);
}

int main()
{
    // an ancient dictionary containing words ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß
    // individual characters of each word are stored as a string since
    // they are non-ASCII
    vector<vector<string>> dict
                            {
                                {"¥", "€", "±"},
                                {"€", "±", "€"},
                                {"€", "±", "‰", "ð"},
                                {"ð", "ß"},
                                {"±", "±", "ð"},
                                {"±", "ß", "ß"}
                            };

    findAlphabetsOrder(dict);

    return 0;
}
```

**Output:** The correct order of alphabets in the ancient language is ¥ € ‰ ð ± ß

##

```java
import java.util.*;

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    List<List<Integer>> adjList = null;

    // Constructor
    Graph(int N)
    {
        adjList = new ArrayList<>(N);

        for (int i = 0; i < N; i++) {
            adjList.add(i, new ArrayList<>());
        }
    }
}

class Main
{
    // Define the maximum number of alphabets in the ancient dictionary
    private static final int N = 100;

    // Perform DFS on the graph and set the departure time of all vertices of the graph
    public static int DFS(Graph graph, int v, boolean[] discovered,
                        int[] departure, int time)
    {
        // mark the current node as discovered
        discovered[v] = true;

        // set the arrival time of vertex `v`
        time = time + 1;

        // do for every edge `v —> u`
        for (int u: graph.adjList.get(v))
        {
            // if `u` is not yet discovered
            if (!discovered[u]) {
                time = DFS(graph, u, discovered, departure, time);
            }
        }

        // ready to backtrack

        // set departure time of vertex `v`
        departure[time] = v;
        time = time + 1;
        return time;
    }

    // Utility function to performs topological sort on a given DAG
    public static void doTopologicalSort(Graph graph, Map<Integer, String> map)
    {
        // `departure[]` stores the vertex number using departure time as an index
        int[] departure = new int[2*N];
        Arrays.fill(departure, -1);

        /* If we had done it the other way around, i.e., fill the array
           with departure time using vertex number as an index, we would
           need to sort it later */

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[N];
        int time = 0;

        // perform DFS on all undiscovered connected vertices
        for (int i = 0; i < N; i++)
        {
            if (!discovered[i] && graph.adjList.get(i).size() != 0) {
                time = DFS(graph, i, discovered, departure, time);
            }
        }

        System.out.print("The correct order of alphabets in ancient language are: ");

        // Print the vertices in order of their decreasing
        // departure time in DFS, i.e., in topological order

        for (int i = 2*N - 1; i >= 0; i--)
        {
            if (departure[i] != -1) {
                System.out.print(map.get(departure[i]) + " ");
            }
        }
    }

    // Utility function to print adjacency list representation of a graph
    public static void printGraph(Graph graph, Map<Integer, String> map)
    {
        for (int i = 0; i < N; i++)
        {
            // ignore vertices with no outgoing edges
            if (graph.adjList.get(i).size() != 0)
            {
                // print current vertex
                System.out.print(map.get(i) + " —> ");

                // print all neighboring vertices of a vertex `i`
                for (int v: graph.adjList.get(i)) {
                    System.out.print(map.get(v) + " ");
                }

                System.out.println();
            }
        }
        System.out.println();
    }

    // Utility function to construct an inverse map from the original map to do
    // the reverse lookup in constant time
    public static<V, K> Map inverse_map(Map<K, V> map)
    {
        Map<V, K> inverse = new HashMap<>();
        for (Map.Entry<K, V> entry: map.entrySet()) {
            inverse.put(entry.getValue(), entry.getKey());
        }

        return inverse;
    }

    // Function to find the correct order of alphabets in a given dictionary of
    // ancient origin. This function assumes that the input is correct.
    public static void findAlphabetsOrder(List<List<String>> dict)
    {
        // create a `HashMap` to map each non-ASCII character present in the
        // given dictionary with a unique integer

        Map<String, Integer> map = new HashMap<>();

        int k = 0;

        // do for each word
        for (List<String> word: dict)
        {
            // do for each non-ASCII character of the word
            for (String s: word)
            {
                // if the current character is not present on the map, insert it
                map.putIfAbsent(s, k++);
            }
        }

        // create a graph containing `N` nodes
        Graph graph = new Graph(N);

        // iterate through the complete dictionary and compare adjacent words
        // for character mismatch

        for (int i = 1; i < dict.size(); i++)
        {
            // previous word in the dictionary
            List<String> prev = dict.get(i - 1);

            // current word in the dictionary
            List<String> curr = dict.get(i);

            // iterate through both `prev` and `curr` simultaneously and
            // find the first mismatching character

            for (int j = 0; j < prev.size() && j < curr.size(); j++)
            {
                // mismatch found
                if (prev.get(j) != curr.get(j))
                {
                    // add an edge from the current character of `prev` to the
                    // current character of `curr` in the graph

                    graph.adjList.get(map.get(prev.get(j)))
                            .add(map.get(curr.get(j)));
                    break;
                }
            }
        }

        // create a reverse map
        Map<Integer, String> reverse = inverse_map(map);
        printGraph(graph, reverse);

        // perform a topological sort on the above graph
        doTopologicalSort(graph, reverse);
    }

    public static void main(String[] args)
    {
        // an ancient dictionary containing words ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß
        // individual characters of each word are stored as a string since
        // they are non-ASCII

        List<List<String>> dict = Arrays.asList(
                Arrays.asList("¥", "€", "±"),
                Arrays.asList("€", "±", "€"),
                Arrays.asList("€", "±", "‰", "ð"),
                Arrays.asList("ð", "ß"),
                Arrays.asList("±", "±", "ð"),
                Arrays.asList("±", "ß", "ß"));

        findAlphabetsOrder(dict);
    }
}
```

##

```python3
# A class to represent a graph object
class Graph:
    # Constructor
    def __init__(self, N):
        self.adj = [[] for _ in range(N)]

# Perform DFS on the graph and set the departure time of all vertices of the graph
def DFS(graph, v, discovered, departure, time):

    # mark the current node as discovered
    discovered[v] = True

    # set the arrival time of vertex `v`
    time = time + 1

    # do for every edge `v —> u`
    for u in graph.adj[v]:
        # if `u` is not yet discovered
        if not discovered[u]:
            time = DFS(graph, u, discovered, departure, time)

    # ready to backtrack
    # set departure time of vertex `v`
    departure[time] = v
    return time + 1

# Utility function to performs topological sort on a given DAG
def doTopologicalSort(graph, d):

    # `departure[]` stores the vertex number using departure time as an index
    departure = [-1] * (2 * N)

    ''' If we had done it the other way around, i.e., fill the array
        with departure time using vertex number as an index, we would
        need to sort it later '''

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * N
    time = 0

    # perform DFS on all undiscovered connected vertices
    for i in range(N):
        if not discovered[i] and len(graph.adj[i]):
            time = DFS(graph, i, discovered, departure, time)

    print('\nThe correct order of alphabets in the ancient language is', end=' ')

    # Print the vertices in order of their decreasing
    # departure time in DFS, i.e., in topological order
    for i in reversed(range(2*N)):
        if departure[i] != -1:
            print(d[departure[i]], end=' ')

# Utility function to print adjacency list representation of a graph
def printGraph(graph, d):

    for i in range(N):
        # ignore vertices with no outgoing edges
        if graph.adj[i]:
            # print current vertex and all neighboring vertices of a vertex `i`
            print(d[i], '—>', [d[v] for v in graph.adj[i]])

# Function to find the correct order of alphabets in a given dictionary of
# ancient origin. This function assumes that the input is correct.
def findAlphabetsOrder(dictionary):

    # create a dictionary to map each non-ASCII character present in the
    # given dictionary with a unique integer
    d = {}

    k = 0

    # do for each word
    for word in dictionary:
        # do for each non-ASCII character of the word
        for s in word:
            # if the current character is not present in the dictionary, insert it
            d.setdefault(s, k)
            k = k + 1

    # create a graph containing `N` nodes
    graph = Graph(N)

    # iterate through the complete dictionary and compare adjacent words
    # for character mismatch
    for i in range(1, len(dictionary)):

        # previous word in the dictionary
        prev = dictionary[i - 1]

        # current word in the dictionary
        curr = dictionary[i]

        # iterate through both `prev` and `curr` simultaneously and find the
        # first mismatching character
        j = 0
        while j < len(prev) and j < len(curr):

            # mismatch found
            if prev[j] is not curr[j]:

                # add an edge from the current character of `prev` to the
                # current character of `curr` in the graph
                graph.adj[d[prev[j]]].append(d[curr[j]])
                break

            j = j + 1

    # create a reverse dict
    reverse = dict((v, k) for k, v in d.items())

    printGraph(graph, reverse)

    # perform a topological sort on the above graph
    doTopologicalSort(graph, reverse)

if __name__ == '__main__':

    # define the maximum number of alphabets in the ancient dictionary
    N = 100

    # an ancient dictionary containing words ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß
    # individual characters of each word are stored as a string since they
    # are non-ASCII
    dictionary = [
        ["¥", "€", "±"],
        ["€", "±", "€"],
        ["€", "±", "‰", "ð"],
        ["ð", "ß"],
        ["±", "±", "ð"],
        ["±", "ß", "ß"]
    ]

    findAlphabetsOrder(dictionary)
```

The time complexity of the above solution is O(N.M), where `N` is the dictionary size and `M` is the maximum length of a word in the dictionary.

Also See:

> [Topological Sort Algorithm for DAG](https://www.techiedelight.com/topological-sorting-dag/ "Topological Sort Algorithm for DAG")

> [Arrival and departure time of vertices in DFS](https://www.techiedelight.com/arrival-departure-time-vertices-dfs/ "Arrival and departure time of vertices in DFS")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 62

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
