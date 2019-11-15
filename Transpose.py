def transpose(permutation):
    transposition = []
    length = len(permutation)
    for i in range(length - 1, 0, -1):
        transposition.append([permutation[0], permutation[i]])
    return transposition

tab = [1,3,4,5]
tab1 = [1,4,6,8,21]
tab2 = [1,3,342,6,273,854,34,66,74,2,3]

a = transpose(tab)
print(a)

a1 = transpose(tab1)
print(a1)

a2 = transpose(tab2)
print(a2)