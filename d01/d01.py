def getCals(pack):
    return sum(list(map(int, pack.split('\n'))))
    

dir = "/local/home/felix/AdventofCode/aoc2022"
with open(dir+"/d01/input.txt", "r") as file:
    input = file.read().strip()

packs = input.split('\n\n')
cals = list(map(getCals, packs))
cals.sort(reverse=True)
print(cals[0:3])
print(sum(cals[1:3]))
