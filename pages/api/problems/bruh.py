
from ast import literal_eval
inputslist = []
outputs = []
results = []
testcases = ["[6], 6", "[12], 18","[600], 3102"]
for i in testcases:
  print(i)
  i = i.split(',')
  inputslist.append(literal_eval(i[0]))
  outputs.append(int(i[1]))

def Harshad(n):
    x = 0
    count = 0
    while count != n:
        x += 1
        sumOfDigits = 0
        temp = x
        while temp != 0: 
            remainder = int(temp % 10)
            temp -= remainder
            sumOfDigits += remainder
            temp = int(temp/10)
        if (x/sumOfDigits) == float(x//sumOfDigits): 
            count += 1
    return(x)
    
for i in range(len(testcases)):
  results.append(Harshad(*inputslist[i]))
    
print(results)
print(outputs)
if results == outputs:
  print(True)
else:
  print(False)
