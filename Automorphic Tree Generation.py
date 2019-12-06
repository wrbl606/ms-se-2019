#n - levels, p - vertices
def nodesOnLvl(n, p):
    return p**n


def totalNodes(n, p):
    sum=0
    for i in range(0, n):
        sum+=nodesOnLvl(i, p)
        # print("(p={})^(i={})={}".format(p, i, p**i))
        # print(sum)
    return (sum)



# print(nodesOnLvl(3,4))
# print(totalNodes(3, 4))

def generateTree(n, p):
    arr=[]
    tree=[]
    if (n<1 or p<1):
        print("złe dane")
        return None
    if (n==1):
        return [1]
    #print("Total Nodes: {}".format(totalNodes(n,p)))
    #initialization of all the nodes in the tree
    for i in range(totalNodes(n,p), 0, -1):
        arr.append(i)

    '''print("p%nodesOnLvl({}, {}) : {}".format(n, p, p%nodesOnLvl(n, p)))
    print("NodesOnLvl {}: {}".format(n, nodesOnLvl(n-1, p)))
    print("Array of all notches!: ")
    print(arr)
    print("NodesOnLvl {}: {}".format(4, nodesOnLvl(3, p)))'''
    
    #listki i ich rodzice
    #THIS IS NICE
    temp=[]
    for i in range(0,nodesOnLvl(n-1,p)):
        temp.append(arr.pop())
        if ((i+1)%p==0 and i!=0):
            #tree.append(temp)
            #tree.append(arr.pop(0))
            tree.append([arr.pop(), temp])
            temp=[]
    

    '''print("Tree length: "+ str(len(tree)))
    print("tree for now: ", tree)
    print("arr length at this moment: ", len(arr), "\n", arr)'''
    

    #generowanie wyższych gałęzi - not bad, ale refactor się przyda. Pomyślę czy da się listki i gałęzie załatwić za jednym zamachem. Wygląda nieskomplikowanie, ale teraz nie mam do tego głowy.
    l=n-2
    for j in range (l, 0, -1):
        #print("j= ", j)
        
        #print("temp:",temp)
        temp2=[]
        for i in range(0,nodesOnLvl(j,p)):
            #print("nodes on lvl: ",nodesOnLvl(j,p))
            temp2.append(tree[i])
            #print("i= ",i,"temp length: ",len(temp))
            if ((i+1)%p==0 and i!=0):
                temp.append([arr.pop(), temp2])

                temp2=[]
            #tree.append(arr.pop(0))
                #print(i)

        #print("TEMP",temp)
        if(nodesOnLvl(j,p) !=0):
            tree=temp
        #print("TREE",tree)
        temp=[]
    #print("temp:",temp)



    #loop goes 16 times in 4x4 example
    #for i in range(0, len(tree), 2):
     #       temp.append(tree[i])
      #      temp.append(tree[i+1])




    return tree



#3 lvls, 4 vertices for each node
# tree =  generateTree(4,2)
# print('\n\n', tree, len(tree))

tree =  generateTree(2,4)
print('\n\n', tree, len(tree))
#
# tree2= generateTree(3,15)
# print('\n\n', tree2, len(tree))

# tree3=generateTree(10,5)
# print('\n\n', tree3, len(tree))
# ^ raczej próba wydajności niż faktyczne sprawdzenie



#x, y = [], []


