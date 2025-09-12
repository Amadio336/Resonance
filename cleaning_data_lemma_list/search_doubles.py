import json 
import os


try:
    with open("dict_cleaned/complete_dict.json", "r") as file:
        data = json.load(file)


    # how many items are in the json file
    print("lemmi nel file json", len(data))
    counter = {}

    # create a dict -> every key is the lemma, the value is set to 0
    for element in data:
        counter[element["lemma"]] = 0




    # create a list with all the lemmas
    total_lemmas = []
    for element in data:
        total_lemmas.append(element["lemma"])


    # for every lemma in counter, the f takes it and compare it with all the elements of the list. if they correspond, add 1
    for lemma in counter.keys():
            for i in range(len(total_lemmas)):
                if lemma == total_lemmas[i]:
                    counter[lemma]+=1  


    only_repetition_list = []

    # remove lemmas in counter that are <2 occurences
    for key, value in counter.items():
        if counter[key] > 1:
            only_repetition_list.append(key)
            
    print(f"elementi ripetuti: {len(only_repetition_list)}")
    print(only_repetition_list)
        
    
except FileNotFoundError as error:
    print(f"file non trovato: {error}")