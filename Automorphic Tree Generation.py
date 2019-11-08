from swap import swap


# n - levels, p - vertices
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

    '''print("p%nodesOnLvl({}, {}) : {}".format(n, p, p%nodesOnLvl(n, p)))
    print("NodesOnLvl {}: {}".format(n, nodesOnLvl(n-1, p)))
    print("Array of all notches!: ")
    print(arr)
    print("NodesOnLvl {}: {}".format(4, nodesOnLvl(3, p)))'''

    # listki i ich rodzice
    temp = []
    for i in range(0, nodesOnLvl(n-1, p)):
        temp.append(arr.pop())
        if ((i+1) % p == 0 and i != 0):
            tree.append([arr.pop(), temp])
            temp = []

    '''print("Tree length: "+ str(len(tree)))
    print("tree for now: ", tree)
    print("arr length at this moment: ", len(arr), "\n", arr)'''

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

    return tree


def st(t):
    return ('{}'.format(t).replace(
        "[", '\t').replace("]", ''))


# lvls, vertices
tree = generateTree(4, 2)
print('\n\n{}'.format(tree))
print(st(tree))

tree[0][1][0], tree[0][1][1] = swap(tree[0][1][0], tree[0][1][1])
print(st(tree))


tree2 = generateTree(2, 4)
print('\n\n{}'.format(tree2))
print(st(tree2))
tree2[0][1][0], tree2[0][1][1] = swap(tree2[0][1][0], tree2[0][1][1])
print(st(tree2))

tree3 = generateTree(3, 15)
print('\n\n{}'.format(tree3))
print(st(tree3))

print("\n\n")
print(tree3[0][1])
tree3[0][1][3][1], tree3[0][1][4][1] = swap(
    tree3[0][1][3][1], tree3[0][1][4][1])
print("\n")
print(tree3[0][1])

'''
# generuje sie szybko, drukowanie zabiera duzo czasu
tree4 = generateTree(10, 5)
# print('\n\n{}'.format(tree3))
# print(st(tree4))


print('\n\n{}'.format(tree4).replace(", [", "\n").replace(
    "[", "\t").replace(']', ''), "\n\tlenght: ", len(tree4))
'''

# ^ raczej próba wydajności niż faktyczne sprawdzenie


# x, y = [], []
