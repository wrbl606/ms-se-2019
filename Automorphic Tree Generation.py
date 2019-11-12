from swap import swap
from swap2 import swap2

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

    return tree[0]


#lvls, vertices
t1 = generateTree(3, 5)
print('\n\n\n')
print(t1)
print('\n\n')


a = [1, 0]
b = [1, 2]

print(t1[1][0])
print(t1[1][2])

print(swap2(t1, a, b))
print(t1)
#t2 = generateTree(5, 3)
#print('\n', t2)

#swap2(t1, )
