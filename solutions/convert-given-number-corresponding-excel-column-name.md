# Convert a number into a corresponding excel column name

> Source: https://www.techiedelight.com/convert-given-number-corresponding-excel-column-name/

[String](https://www.techiedelight.com/Category/String/)

Given a positive number, convert the number to the corresponding Excel column name.

For example, the following image shows numbers corresponding to Excel columns:

> 

The main trick in this problem lies in handling the boundary cases, such as the number `26` corresponds to column `Z`, and the number `27` corresponds to column `AA`. Similarly, the number `1014` corresponds to column `ALZ`, and the number `1015` corresponds to column `AMA`.

Following is the C++, Java, and Python program that handles all these cases beautifully:

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

// Function to convert a given number to an Excel column
string getColumnName(int n)
{
    // initialize output string as empty
    string result = "";

    while (n > 0)
    {
        // find the index of the next letter and concatenate the letter
        // to the solution

        // here index 0 corresponds to 'A', and 25 corresponds to 'Z'
        int index = (n - 1) % 26;
        result = char(index + 'A') + result;
        n = (n - 1) / 26;
    }

    return result;
}

int main()
{
    // seed for random input
    srand(time(NULL));

    // generate column names for 10 random numbers between 1–1000
    for (int i = 1; i <= 10; i++)
    {
        int r = rand() % 1000 + 1;
        cout << r << " — " << getColumnName(r) << endl;
    }

    return 0;
}
```

##

```java
import java.util.Random;

class Main
{
    // Function to convert a given number to an Excel column
    public static String getColumnName(int n)
    {
        // initialize output string as empty
        StringBuilder result = new StringBuilder();

        while (n > 0)
        {
            // find the index of the next letter and concatenate the letter
            // to the solution

            // here index 0 corresponds to 'A', and 25 corresponds to 'Z'
            int index = (n - 1) % 26;
            result.append((char)(index + 'A'));
            n = (n - 1) / 26;
        }

        return result.reverse().toString();
    }

    public static void main(String[] args)
    {
        // generate column names for 10 random numbers between 1–1000
        for (int i = 1; i <= 10; i++)
        {
            int r = new Random().nextInt(1000) + 1;
            System.out.println(r + " — " + getColumnName(r));
        }
    }
}
```

##

```python3
from random import randint

# Function to convert a given number to an Excel column
def getColumnName(n):

    # initialize output string as empty
    result = ''

    while n > 0:

        # find the index of the next letter and concatenate the letter
        # to the solution

        # here index 0 corresponds to 'A', and 25 corresponds to 'Z'
        index = (n - 1) % 26
        result += chr(index + ord('A'))
        n = (n - 1) // 26

    return result[::-1]

if __name__ == '__main__':

    # generate column names for 10 random numbers between 1–1000
    for i in range(1, 11):
        r = randint(1, 1000)
        print(r, '—', getColumnName(r))
```

**Output (will vary):** 585 — VM 873 — AGO 269 — JI 849 — AFQ 288 — KB 962 — AJZ 549 — UC 572 — UZ 485 — RQ 704 — AAB

**Also See:**

> [Convert column name in Excel to the corresponding number](https://techiedelight.com/convert-excel-column-name-to-corresponding-number/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
