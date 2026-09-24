# Print all combinations of phrases formed by picking words from each of the given lists

> Source: https://www.techiedelight.com/combinations-phrases-formed-picking-words-lists/

[String](https://www.techiedelight.com/Category/String/)

Given `n` lists of words, print all combinations of phrases that can be formed by picking one word from each list.

For example,

**Input:** list 1 —> [John, Emma] list 2 —> [Plays, Hates, Watches] list 3 —> [Cricket, Soccer, Chess] **Output:** John Plays Cricket John Plays Soccer John Plays Chess John Hates Cricket John Hates Soccer John Hates Chess John Watches Cricket John Watches Soccer John Watches Chess Emma Plays Cricket Emma Plays Soccer Emma Plays Chess Emma Hates Cricket Emma Hates Soccer Emma Hates Chess Emma Watches Cricket Emma Watches Soccer Emma Watches Chess

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). At each point in the recursion, consider each word in the current list, append the word to output one by one, and recur for the next list. Finally, when no list is left to recur (i.e., all lists are considered), print the output phase.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Function to print all combinations of phrases that can be formed
// by words from each of the given lists
void printAllCombinations(vector<vector<string>> const &lists, string result, int n)
{
    // base case
    if (lists.size() == 0) {
        return;
    }

    // if we have traversed each list
    if (n == lists.size())
    {
        // print phrase after removing trailing space
        cout << result.substr(1) << endl;
        return;
    }

    // get the size of the current list
    int m = lists[n].size();

    // do for each word in the current list
    for (int i = 0; i < m; i++)
    {
        // append current word to output
        string out = result + " " + lists[n].at(i);

        // recur for the next list
        printAllCombinations(lists, out, n + 1);
    }
}

int main()
{
    vector<vector<string>> lists =
    {
        { "John", "Emma" },
        { "Plays", "Hates", "Watches" },
        { "Cricket", "Soccer", "Chess" }
    };

    printAllCombinations(lists, "", 0);

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.List;

class Main
{
    // Function to print all combinations of phrases that can be formed
    // by words from each of the given lists
    public static void printAllCombinations(List<List<String>> lists, String result, int n)
    {
        // base case
        if (lists == null || lists.size() == 0) {
            return;
        }

        // if we have traversed each list
        if (n == lists.size())
        {
            // print phrase after removing trailing space
            System.out.println(result.substring(1));
            return;
        }

        // get the size of the current list
        int m = lists.get(n).size();

        // do for each word in the current list
        for (int i = 0; i < m; i++)
        {
            // append current word to output
            String out = result + " " + lists.get(n).get(i);

            // recur for the next list
            printAllCombinations(lists, out, n + 1);
        }
    }

    public static void main(String[] args)
    {
        List<List<String>> lists = Arrays.asList(
                Arrays.asList("John", "Emma"),
                Arrays.asList( "Plays", "Hates", "Watches" ),
                Arrays.asList( "Cricket", "Soccer", "Chess" )
        );

        printAllCombinations(lists, "", 0);
    }
}
```

##

```python3
# Function to print all combinations of phrases that can be formed
# by words from each of the given lists
def printAllCombinations(lists, result='', n=0):

    # base case
    if not lists:
        return

    # if we have traversed each list
    if n == len(lists):
        # print phrase after removing trailing space
        print(result[1:])
        return

    # do for each word in the current list
    for word in lists[n]:
        out = result + " " + word  # append current word to output
        printAllCombinations(lists, out, n + 1)  # recur for the next list

if __name__ == '__main__':

    lists = [
        ["John", "Emma"],
        ["Plays", "Hates", "Watches"],
        ["Cricket", "Soccer", "Chess"]
    ]

    printAllCombinations(lists)
```

**Output:** John Plays Cricket John Plays Soccer John Plays Chess John Hates Cricket John Hates Soccer John Hates Chess John Watches Cricket John Watches Soccer John Watches Chess Emma Plays Cricket Emma Plays Soccer Emma Plays Chess Emma Hates Cricket Emma Hates Soccer Emma Hates Chess Emma Watches Cricket Emma Watches Soccer Emma Watches Chess

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.58/5. Vote count: 289

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
