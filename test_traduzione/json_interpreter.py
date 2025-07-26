import json 

dict = None
data_to_modify = None

try:
    with open("dict.json", "r") as file:
        dict = json.load(file)

    with open("data_to_modify.json", "r") as file2:
        data_to_modify = json.load(file2)
except Exception as e:
    print(e)
finally:
    pass

""" print(dict)
print(data_to_modify) """

for element_to_modify in data_to_modify:
    for element_dict in dict:
        if element_to_modify["SubVoce"] == element_dict["SubVoce"]:
            element_to_modify["tras"] = element_dict["tras"]
   
   
print(data_to_modify)