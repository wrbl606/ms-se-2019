def swap(tree, list1, list2):
    if (list1[:-1] != list2[:-1]):
        print("Different parents! Cannot swap.")
        return
    if list1[0] == list2[0]:
        swap(tree[list1[0]], list1[1:], list2[1:])
    else:
        a, b = list1[-1], list2[-1]
        tree[a], tree[b] = tree[b], tree[a]
        return tree


def nodesOnLvl(n, p):
    return p**n


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
# print(t1[1][1])
