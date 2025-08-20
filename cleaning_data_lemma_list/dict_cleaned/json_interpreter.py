import json 
import os 

os.getcwd()


data_to_modify = None  

with open("data_to_modify.json", "r", encoding="utf") as file_to_modify:
    data_to_modify = json.load(file_to_modify)
    

dicts_files = os.listdir(os.chdir("dicts/"))

for file in dicts_files:
    if file.endswith(".json"):
        with open(file, "r", encoding="utf-8") as dict_file_json:
            dict_file = json.load(dict_file_json)
            
            for dict_lemma in dict_file:
                for element in data_to_modify:
                    if dict_lemma["lemma"] == element["SubVoce"]:
                        element["tras"] = dict_lemma["tras"]
            
        


with open("final_version_andromache.json", "a", encoding="utf-8") as final_version_andromache:
    json.dump(data_to_modify, final_version_andromache, ensure_ascii=False, indent=2)