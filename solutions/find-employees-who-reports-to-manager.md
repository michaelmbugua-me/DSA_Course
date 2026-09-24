# Find all employees who directly or indirectly reports to a manager

> Source: https://www.techiedelight.com/find-employees-who-reports-to-manager/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a map containing employee to manager mappings, find all employees under each manager who directly or indirectly reports him.

For example, consider the following employee-manager pairs:

A —> A B —> A C —> B D —> B E —> D F —> E

Here, `A` reports to himself, i.e., `A` is head of the company and is the manager of employee `B`. `B` is the manager of employees `C` and `D`, `D` is the manager of employee `E`, `E` is the manager of employee `F`, `C`, and `F` is not managers of any employee.

**Output:** A —> [B, D, C, E, F] B —> [D, C, E, F] C —> [] D —> [E, F] E —> [F] F —> []

> 

The idea is to construct a reverse map containing manager to employee mappings and recursively find all reporting employees (direct and indirect) in every manager’s hierarchy. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
#include <unordered_map>
using namespace std;

// Utility function to print a unordered_set
void printSet(char c, unordered_set<char> const &v)
{
    cout << c << " —> [";
    int n = v.size();
    for (auto i: v) {
        cout << i;
        if (--n) {
            cout << ", ";
        }
    }
    cout << "]\n";
}

// Recursive DP function to find all employees who directly or indirectly
// report to a given manager and store the result in `result`
unordered_set<char> findAllReportingEmployees(char manager,
                                    auto &managerToEmployeeMappings,
                                    auto &result)
{
    // if the subproblem is already seen before
    if (result.find(manager) != result.end())
    {
        // return the already computed mapping
        return result[manager];
    }

    // find all employees reporting directly to the current manager
    unordered_set<char> managerEmployees = managerToEmployeeMappings[manager];

    // find all employees reporting indirectly to the current manager
    for (char reportee: managerToEmployeeMappings[manager])
    {
        // find all employees reporting to the current employee
        unordered_set<char> employees = findAllReportingEmployees(reportee,
                                            managerToEmployeeMappings, result);

        // move those employees to the current manager
        for (char c: employees) {
            managerEmployees.insert(c);
        }
    }

    // save the result to avoid recomputation and return it
    result[manager] = managerEmployees;
    return managerEmployees;
}

// Find all employees who directly or indirectly reports to a manager
unordered_map<char, unordered_set<char>> findEmployees(auto &employeeToManagerMappings)
{
    // store manager to employee mappings in a new map.
    // `unordered_set<char>` is used since a manager can have several employees mapped
    unordered_map<char, unordered_set<char>> managerToEmployeeMappings;

    // fill the above map with the manager to employee mappings
    for (auto it: employeeToManagerMappings)
    {
        char employee = it.first;
        char manager = it.second;

        // don't map an employee with itself
        if (employee != manager) {
            managerToEmployeeMappings[manager].insert(employee);
        }
    }

    // construct an ordered map to store the result
    unordered_map<char, unordered_set<char>> result;

    // find all reporting employees (direct and indirect) for every manager
    // and store the result in a map
    for (auto p: employeeToManagerMappings) {
        findAllReportingEmployees(p.first, managerToEmployeeMappings, result);
    }

    return result;
}

int main()
{
    // construct a mapping from employee to manager
    unordered_map<char, char> employeeToManagerMappings = {
        {'A', 'A'}, {'B', 'A'}, {'C', 'B'}, {'D', 'B'}, {'E', 'D'}, {'F', 'E'}
    };

    auto result = findEmployees(employeeToManagerMappings);

    // print contents of the resulting map
    for (auto p: result) {
        printSet(p.first, p.second);
    }

    return 0;
}
```

**Output:** A —> [C, D, F, B, E] E —> [F] F —> [] D —> [F, E] C —> [] B —> [E, F, D, C]

##

```java
import java.util.*;

class Main
{
    // Recursive DP function to find all employees who directly or indirectly
    // report to a given manager and store the result in `result`
    private static Set<Character> findAllReportingEmployees(Character manager,
                            Map<Character, Set<Character>> managerToEmployeeMappings,
                            Map<Character, Set<Character>> result)
    {
        // if the subproblem is already seen before
        if (result.containsKey(manager))
        {
            // return the already computed mapping
            return result.get(manager);
        }

        // find all employees reporting directly to the current manager
        Set<Character> managerEmployees = managerToEmployeeMappings.get(manager);

        // find all employees reporting indirectly to the current manager
        for (char reportee: new ArrayList<>(managerEmployees))
        {
            // find all employees reporting to the current employee
            Set<Character> employees = findAllReportingEmployees(reportee,
                    managerToEmployeeMappings, result);

            // move those employees to the current manager
            if (employees != null) {
                managerEmployees.addAll(employees);
            }
        }

        // save the result to avoid recomputation and return it
        result.put(manager, managerEmployees);
        return managerEmployees;
    }

    // Find all employees who directly or indirectly reports to a manager
    public static Map<Character, Set<Character>> findEmployees(Map<Character, Character>
                                             employeeToManagerMappings)
    {
        // store manager to employee mappings in a new map.
        // `List<Character>` is used since a manager can have several employees mapped
        Map<Character, Set<Character>> managerToEmployeeMappings = new HashMap<>();

        // fill the above map with the manager to employee mappings
        for (var entry: employeeToManagerMappings.entrySet())
        {
            char employee = entry.getKey();
            char manager = entry.getValue();

            managerToEmployeeMappings.putIfAbsent(manager, new HashSet<>());
            managerToEmployeeMappings.putIfAbsent(employee, new HashSet<>());

            // don't map an employee with itself
            if (employee != manager) {
                managerToEmployeeMappings.get(manager).add(employee);
            }
        }

        // construct an ordered map to store the result
        Map<Character, Set<Character>> result = new HashMap<>();

        // find all reporting employees (direct and indirect) for every manager
        // and store the result in a map
        for (var entry: employeeToManagerMappings.entrySet()) {
            findAllReportingEmployees(entry.getKey(), managerToEmployeeMappings,
                    result);
        }

        return result;
    }

    public static void main(String[] args)
    {
        // construct a mapping from employee to manager
        Map<Character, Character> employeeToManagerMappings = new HashMap<>();

        employeeToManagerMappings.put('A', 'A');
        employeeToManagerMappings.put('B', 'A');
        employeeToManagerMappings.put('C', 'B');
        employeeToManagerMappings.put('D', 'B');
        employeeToManagerMappings.put('E', 'D');
        employeeToManagerMappings.put('F', 'E');

        Map<Character, Set<Character>> result = findEmployees(employeeToManagerMappings);

        // print contents of the resulting map
        for (var entry: result.entrySet()) {
            System.out.println(entry.getKey() + " —> " + entry.getValue());
        }
    }
}
```

##

```python3
# Recursive DP function to find all employees who directly or indirectly
# report to a given manager and store the result in `result`
def findAllReportingEmployees(manager, managerToEmployeeMappings, result):

    # if the subproblem is already seen before
    if manager in result:
        # return the already computed mapping
        return result.get(manager)

    # find all employees reporting directly to the current manager
    managerEmployees = managerToEmployeeMappings.get(manager)

    # find all employees reporting indirectly to the current manager
    for reportee in managerEmployees.copy():
        # find all employees reporting to the current employee
        employees = findAllReportingEmployees(reportee, managerToEmployeeMappings,
                                                result)

        # move those employees to the current manager
        if employees:
            managerEmployees.update(employees)

    # save the result to avoid recomputation and return it
    result[manager] = managerEmployees
    return managerEmployees

# Find all employees who directly or indirectly reports to a manager
def findEmployees(employeeToManagerMappings):

    # store manager to employee mappings in a new dictionary
    managerToEmployeeMappings = {}

    # fill the above dictionary with the manager to employee mappings
    for employee, manager in employeeToManagerMappings.items():
        managerToEmployeeMappings.setdefault(employee, set())
        # don't map an employee with itself
        if employee != manager:
            managerToEmployeeMappings.setdefault(manager, set()).add(employee)

    # construct an empty dictionary to store the result
    result = {}

    # find all reporting employees (direct and indirect) for every manager
    # and store the result in a dictionary
    for key in employeeToManagerMappings.keys():
        findAllReportingEmployees(key, managerToEmployeeMappings, result)

    return result

if __name__ == '__main__':

    # construct a mapping from employee to manager
    employeeToManagerMappings = {'A': 'A', 'B': 'A', 'C': 'B',
                                'D': 'B', 'E': 'D', 'F': 'E'}
    result = findEmployees(employeeToManagerMappings)

    # print contents of the resulting dictionary
    for key, value in result.items():
        print(key, '—>', value)
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 260

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
