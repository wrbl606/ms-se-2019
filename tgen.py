def nodesOnLvl(n, p):
    if (p < 1):
        return 0
    return p**(n-1)


def totalNodes(n, p):
    sum = 0
    for i in range(1, n+1):
        sum += nodesOnLvl(i, p)
    return (sum)


def tgen(n, p):
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

    return tree


# lvls, vertices

print(tgen(4, 4))
