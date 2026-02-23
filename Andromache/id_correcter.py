import json

try:
    json_to_r = []
    
    with open("test.json", "r", encoding="utf-8") as file:
        content = json.load(file)
        
        counter = 239
        for el in content:
            el["id"] = counter
            counter+=1
            json_to_r.append(el)
        
    with open("new_file.json", "w", encoding="utf-8") as file:   
        json.dump(json_to_r, file, ensure_ascii=False)
            
        
        
        

except FileNotFoundError as e: print(e)
except FileExistsError as e: print(e)
except Exception as e: print(e)