# Generate all permutations of a string in Java – Recursive and Iterative

> Source: https://www.techiedelight.com/generate-permutations-string-java-recursive-iterative/

Write a Java program to generate all permutations of a string.

For example, the string `ABC` has 6 permutations, i.e., `ABC, ACB, BAC, BCA, CBA, CAB`.

> 

## 1\. Recursive Approach

Since the string is immutable in Java, the idea is to [convert the string into a character array](https://techiedelight.com/convert-string-to-character-array-java/). Then we can [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) generate all permutations of the given string using [backtracking](https://techiedelight.com/backtracking-interview-questions/) by swapping each of the remaining characters in the string with its first character and then generating all the permutations of the remaining characters using a recursive call.

Below is the recursion tree for printing all permutations of the string “ABC”, followed by the Java implementation.

```
class Main
{
    // Utility function to swap two characters in a character array
    private static void swap(char[] chars, int i, int j)
    {
        char temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
    }

    // Recursive function to generate all permutations of a string
    private static void permutations(char[] chars, int currentIndex)
    {
        if (currentIndex == chars.length - 1) {
            System.out.println(String.valueOf(chars));
        }

        for (int i = currentIndex; i < chars.length; i++)
        {
            swap(chars, currentIndex, i);
            permutations(chars, currentIndex + 1);
            swap(chars, currentIndex, i);
        }
    }

    public static void findPermutations(String str) {

        // base case
        if (str == null || str.length() == 0) {
            return;
        }

        permutations(str.toCharArray(), 0);
    }

    // generate all permutations of a string in Java
    public static void main(String[] args)
    {
        String str = "ABC";
        findPermutations(str);
    }
}
```

**Output:** ABC ACB BAC BCA CBA CAB

Here’s another Java implementation that doesn’t convert the string into a character array.

```
class Main
{
    // Recursive function to generate all permutations of a string
    private static void permutations(String candidate, String remaining)
    {
        // base case
        if (remaining == null) {
            return;
        }

        if (remaining.length() == 0) {
            System.out.println(candidate);
        }

        for (int i = 0; i < remaining.length(); i++)
        {
            String newCandidate = candidate + remaining.charAt(i);

            String newRemaining = remaining.substring(0, i) +
                    remaining.substring(i + 1);

            permutations(newCandidate, newRemaining);
        }
    }

    // Find Permutations of a string in Java
    public static void main(String[] args)
    {
        String str = "ABC";
        permutations("", str);
    }
}
```

**Output:** ABC ACB BAC BCA CAB CBA

## 2\. Iterative Approach: Using Collection

The following implementation uses `ArrayList` to store the partially generated permutations and then use it to generate the final permutations in further iterations.

```
import java.util.ArrayList;
import java.util.List;

class Main
{
    // Iterative function to generate all permutations of a string in Java
    // using Collections
    public static void findPermutations(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return;
        }

        // create an empty ArrayList to store (partial) permutations
        List<String> partial = new ArrayList<>();

        // initialize the list with the first character of the string
        partial.add(String.valueOf(str.charAt(0)));

        // do for every character of the specified string
        for (int i = 1; i < str.length(); i++)
        {
            // consider previously constructed partial permutation one by one

            // (iterate backward to avoid ConcurrentModificationException)
            for (int j = partial.size() - 1; j >= 0 ; j--)
            {
                // remove current partial permutation from the ArrayList
                String s = partial.remove(j);

                // Insert the next character of the specified string at all
                // possible positions of current partial permutation. Then
                // insert each of these newly constructed strings in the list

                for (int k = 0; k <= s.length(); k++)
                {
                    // Advice: use StringBuilder for concatenation
                    partial.add(s.substring(0, k) + str.charAt(i) + s.substring(k));
                }
            }
        }

        System.out.println(partial);
    }

    // Iterative program to generate all permutations of a string in Java
    public static void main(String[] args)
    {
        String str = "ABC";
        findPermutations(str);
    }
}
```

**Output:** [CAB, ACB, ABC, CBA, BCA, BAC]

**Author:** Lucas Daniel

**Also see:**

> [Find all lexicographic permutations of a string](https://techiedelight.com/find-lexicographic-permutations-string/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.48/5. Vote count: 165

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
