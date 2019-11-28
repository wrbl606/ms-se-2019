# Tree generation and swapping operation

## 1. _swap_ function
  takes three arguments: the tree in which we want to conduct the swapping operation, the first node (as list of arguments, which are this node's coordinates) and the second node (just like the first one) (You always swap just two branches, swapping of more elements can always be divided into combination of swapping just two elements at the time)
  
    1. if the nodes are the same  - don't change the tree. Just return it. Skip the rest of the function.
    2. if both nodes passed as arguments have *different* parents:
        1. print "Different parents! Cannot swap." to screen
        2. return tree
        3. skip rest of the function
        
       (now comes the tricky part - recursion)
    3. if the first coordinate is the same for both nodes
        swap(tree[first_node[first coordinate]], first_node[enter the "first node's tree" at first coordinate], second_node[enter the "second node's tree" at first coordinate])
    else:
        1. a = first_node[second_to_last_coordinate] 
        2. b = second_node[second_to_last_coordinate]
        3. tree[a], tree[b] = tree[b], tree[a] (this is an actual swap of the nodes)
        4. return tree, end function

## 2. How many nodes are on _n_-th level
function nodes_on_level(n ^ number_of_vertices_from_every_node):
    return (number_of_vertices_from_every_node)^n


def totalNodes(n, p):
    sum = 0
    for i in range(0, n):
        sum += nodesOnLvl(i, p)
    return (sum)


def generateTree(n, p):
    arr = []
    tree = []
    if (n < 1 or p < 1):
        print("złe dane")
        return None
    if (n == 1):
        return [1]
    for i in range(totalNodes(n, p), 0, -1):
        arr.append(i)

    # listki i ich rodzice
    temp = []
    for i in range(0, nodesOnLvl(n-1, p)):
        temp.append(arr.pop())
        if ((i+1) % p == 0 and i != 0):
            tree.append([arr.pop(), temp])
            temp = []

    # generowanie wyższych gałęzi - not bad, ale refactor się przyda. Pomyślę czy da się listki i gałęzie załatwić za jednym zamachem. Wygląda nieskomplikowanie, ale teraz nie mam do tego głowy.
    l = n-2
    for j in range(l, 0, -1):
        temp2 = []
        for i in range(0, nodesOnLvl(j, p)):
            temp2.append(tree[i])
            if ((i+1) % p == 0 and i != 0):
                temp.append([arr.pop(), temp2])
                temp2 = []
        if(nodesOnLvl(j, p) != 0):
            tree = temp
        temp = []

    return tree[0]

# TEST TEST TEST TEST TEST TEST TEST


a = [1, 0]
b = [1, 2]

drzewo = [13, [[4, [1, 2, 3]], [8, [5, 6, 7]], [12, [9, 10, 11]]]]
swap(drzewo, a, b)
expected = [13, [[12, [9, 10, 11]], [8, [5, 6, 7]], [4, [1, 2, 3]]]]
print(drzewo == expected)


t1 = generateTree(6, 5)
c1 = t1[1][4][1][3]
c2 = t1[1][4][1][0]

a = [1, 4, 1, 3]
b = [1, 4, 1, 0]
swap(t1, a, b)

print(t1[1][4][1][3] == c2 and t1[1][4][1][0] == c1)

t1 = generateTree(2, 2)
print(t1)
swap(t1, [1, 0], [1, 1])
print(t1 == [3, [2, 1]])
## 2. Counting how many nodes will be on _n_-th level
function nodes_on_lvl(n, number_of_vertices_on_every_node):
    return number_of_vertices_on_every_node**n

def totalNodes(n, p):
    sum = 0
    for i in range(0, n):
        sum += nodesOnLvl(i, p)
    return (sum)


def generateTree(n, p):
    arr = []
    tree = []
    if (n < 1 or p < 1):
        print("złe dane")
        return None
    if (n == 1):
        return [1]
    for i in range(totalNodes(n, p), 0, -1):
        arr.append(i)

    # listki i ich rodzice
    temp = []
    for i in range(0, nodesOnLvl(n-1, p)):
        temp.append(arr.pop())
        if ((i+1) % p == 0 and i != 0):
            tree.append([arr.pop(), temp])
            temp = []

    # generowanie wyższych gałęzi - not bad, ale refactor się przyda. Pomyślę czy da się listki i gałęzie załatwić za jednym zamachem. Wygląda nieskomplikowanie, ale teraz nie mam do tego głowy.
    l = n-2
    for j in range(l, 0, -1):
        temp2 = []
        for i in range(0, nodesOnLvl(j, p)):
            temp2.append(tree[i])
            if ((i+1) % p == 0 and i != 0):
                temp.append([arr.pop(), temp2])
                temp2 = []
        if(nodesOnLvl(j, p) != 0):
            tree = temp
        temp = []

    return tree[0]

# TEST TEST TEST TEST TEST TEST TEST


a = [1, 0]
b = [1, 2]

drzewo = [13, [[4, [1, 2, 3]], [8, [5, 6, 7]], [12, [9, 10, 11]]]]
swap(drzewo, a, b)
expected = [13, [[12, [9, 10, 11]], [8, [5, 6, 7]], [4, [1, 2, 3]]]]
print(drzewo == expected)


t1 = generateTree(6, 5)
c1 = t1[1][4][1][3]
c2 = t1[1][4][1][0]

a = [1, 4, 1, 3]
b = [1, 4, 1, 0]
swap(t1, a, b)

print(t1[1][4][1][3] == c2 and t1[1][4][1][0] == c1)

t1 = generateTree(2, 2)
print(t1)
swap(t1, [1, 0], [1, 1])
print(t1 == [3, [2, 1]])
