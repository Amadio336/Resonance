import json 
import os 



complete_dict = []

try:
    files = os.listdir(os.getcwd())
    for file in files:
        if file.endswith(".json"):
            print(f"apro il file {file}")
            
            with open(file, "r", encoding="utf-8") as json_file:
                data = json.load(json_file)
                complete_dict.extend(data)
    
    print(len(complete_dict))
    
    with open("complete_dict.json", "a", encoding="utf-8") as complete_dict_file:
        json.dump(complete_dict, complete_dict_file, ensure_ascii=False, indent=2)
except Exception as e:
    print(e)