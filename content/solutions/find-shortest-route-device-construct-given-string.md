# Find the shortest route in a device to construct a given string

> Source: https://www.techiedelight.com/find-shortest-route-device-construct-given-string/

Given a device having left, right, top, and bottom buttons and an OK button to enter a text from a virtual keypad having alphabets from `A–Y` arranged in a `5 × 5` grid, as shown below. Find the shortest route in the device to construct a given string if we start from the top-left position in the keypad.

For example,

**Keypad:** A B C D E F G H I J K L M N O P Q R S T U V W X Y **Device:** T L M R B where, T — Move up B — Move down L — Move left R — Move right M — Press OK

The shortest route to construct string `TECHIE` with the device’s help is `BBBRRRRMTTTMLLMBMRMTRM`.

The idea is to consider all characters of the specified string, and for each character, print out the shortest route to the next character from it. For finding the shortest route, compare the coordinates of the current character with the coordinates of the next character in the matrix. Based on the difference between the x–coordinate and y–coordinate of the current and next character, move left, right, top, or bottom.

Following is the implementation in TypeScript based on the above idea:

```ts
// Find the shortest route in a device to construct the given string
function printPath(s: string): void {

    // start from the top-left corner with coordinates, i.e., (0, 0) cell
    let x = 0, y = 0;

    for (const c of s) {

        // find coordinates of the next character
        const X = Math.floor((c.charCodeAt(0) - 'A'.charCodeAt(0)) / 5);
        const Y = (c.charCodeAt(0) - 'A'.charCodeAt(0)) % 5;

        // if the next character is above the current character
        while (x > X) {
            process.stdout.write('T');
            x = x - 1;      // Go up
        }

        // if the next character is below the current character
        while (x < X) {
            process.stdout.write('B');
            x = x + 1;      // Go down
        }

        // if the next character is to the left of the current character
        while (y > Y) {
            process.stdout.write('L');
            y = y - 1;      // Go left
        }

        // if the next character is to the right of the current character
        while (y < Y) {
            process.stdout.write('R');
            y = y + 1;      // Go right
        }

        // next character is found
        process.stdout.write('M');
    }
}

const s = 'TECHIE';
printPath(s);
```

**Output:** BBBRRRRMTTTMLLMBMRMTRM

The time complexity of the above solution is O(n.c), where `n` is the input string’s length and `c` is a constant less than equal to 10. The auxiliary space required by the program is O(1).

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 49

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
