# Java Implementation of Trie Data Structure

> Source: https://www.techiedelight.com/implement-trie-data-structure-java/

[Trie](https://www.techiedelight.com/Category/Trees/Trie/)

Trie is a tree-based data structure used for efficient re _trie_ val of a key in a huge word set. In this post, we will implement the Trie data structure in Java.

In the [previous post](https://techiedelight.com/trie-implementation-insert-search-delete/), we discussed a Trie data structure in detail and covered its C implementation. In this post, the Trie data structure’s Java implementation is discussed, which is way cleaner than the C implementation.

Following is the Java implementation of the Trie data structure, which supports insertion and search operations. The implementation currently supports only lowercase English characters `(a – z)`, but we can easily extend the solution to support any set of characters.

```
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// A class to store a Trie node
class Trie
{
    // Define the alphabet size (26 characters for `a – z`)
    private static final int CHAR_SIZE = 26;

    private boolean isLeaf;
    private List<Trie> children = null;

    // Constructor
    Trie()
    {
        isLeaf = false;
        children = new ArrayList<>(Collections.nCopies(CHAR_SIZE, null));
    }

    // Iterative function to insert a string into a Trie
    public void insert(String key)
    {
        System.out.println("Inserting \"" + key + "\"");

        // start from the root node
        Trie curr = this;

        // do for each character of the key
        for (char c: key.toCharArray())
        {
            // create a new Trie node if the path does not exist
            if (curr.children.get(c - 'a') == null) {
                curr.children.set(c - 'a', new Trie());
            }

            // go to the next node
            curr = curr.children.get(c - 'a');
        }

        // mark the current node as a leaf
        curr.isLeaf = true;
    }

    // Iterative function to search a key in a Trie. It returns true
    // if the key is found in the Trie; otherwise, it returns false
    public boolean search(String key)
    {
        System.out.print("Searching \"" + key + "\" : ");

        Trie curr = this;

        // do for each character of the key
        for (char c: key.toCharArray())
        {
            // go to the next node
            curr = curr.children.get(c - 'a');

            // if the string is invalid (reached end of a path in the Trie)
            if (curr == null) {
                return false;
            }
        }

        // return true if the current node is a leaf node and the
        // end of the string is reached
        return curr.isLeaf;
    }
}

class Main
{
    public static void main (String[] args)
    {
        // construct a new Trie node
        Trie head = new Trie();

        head.insert("techie");
        head.insert("techi");
        head.insert("tech");

        System.out.println(head.search("tech"));            // true
        System.out.println(head.search("techi"));           // true
        System.out.println(head.search("techie"));          // true
        System.out.println(head.search("techiedelight"));   // false

        head.insert("techiedelight");

        System.out.println(head.search("tech"));            // true
        System.out.println(head.search("techi"));           // true
        System.out.println(head.search("techie"));          // true
        System.out.println(head.search("techiedelight"));   // true
    }
}
```

The space complexity of a Trie data structure is O(N × M × C), where `N` is the total number of strings, `M` is the maximum length of the string, and `C` is the alphabet’s size.

The storage problem can be alleviated if we only allocate memory for alphabets in use and don’t waste space storing null pointers. Following is a memory-efficient implementation of Trie data structure in Java, which uses `HashMap` to store a node’s children:

```
import java.util.HashMap;
import java.util.Map;

// A class to store a Trie node
class Trie
{
    private boolean isLeaf;
    private Map<Character, Trie> children;

    // Constructor
    Trie()
    {
        isLeaf = false;
        children = new HashMap<>();
    }

    // Iterative function to insert a string into a Trie
    public void insert(String key)
    {
        System.out.println("Inserting \"" + key + "\"");

        // start from the root node
        Trie curr = this;

        // do for each character of the key
        for (char c: key.toCharArray())
        {
            // create a new node if the path doesn't exist
            curr.children.putIfAbsent(c, new Trie());

            // go to the next node
            curr = curr.children.get(c);
        }

        // mark the current node as a leaf
        curr.isLeaf = true;
    }

    // Iterative function to search a key in a Trie. It returns true
    // if the key is found in the Trie; otherwise, it returns false
    public boolean search(String key)
    {
        System.out.print("Searching \"" + key + "\" : ");

        Trie curr = this;

        // do for each character of the key
        for (char c: key.toCharArray())
        {
            // go to the next node
            curr = curr.children.get(c);

            // if the string is invalid (reached end of a path in the Trie)
            if (curr == null) {
                return false;
            }
        }

        // return true if the current node is a leaf node and the
        // end of the string is reached
        return curr.isLeaf;
    }
}

class Main
{
    public static void main (String[] args)
    {
        // construct a new Trie node
        Trie head = new Trie();

        head.insert("techie");
        head.insert("techi");
        head.insert("tech");

        System.out.println(head.search("tech"));            // true
        System.out.println(head.search("techi"));           // true
        System.out.println(head.search("techie"));          // true
        System.out.println(head.search("techiedelight"));   // false

        head.insert("techiedelight");

        System.out.println(head.search("tech"));            // true
        System.out.println(head.search("techi"));           // true
        System.out.println(head.search("techie"));          // true
        System.out.println(head.search("techiedelight"));   // true
    }
}
```

**Also see:**

> [C++ Implementation of Trie Data Structure](https://techiedelight.com/cpp-implementation-trie-data-structure/)

> [Trie Data Structure – Python Implementation](https://techiedelight.com/trie-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 69

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Trie](https://www.techiedelight.com/Tags/Trie/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
