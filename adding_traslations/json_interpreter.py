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


for element_to_modify in data_to_modify:
    print(element_to_modify["SubVoce"])


for element_to_modify in data_to_modify:
    for element_dict in dict:
        if element_to_modify["SubVoce"] == element_dict["SubVoce"]:
            element_to_modify["tras"] = element_dict["tras"]

with open("final_data.json", "a", encoding="utf-8") as final_file:
    json.dump(data_to_modify, final_file, ensure_ascii=False, indent=2)