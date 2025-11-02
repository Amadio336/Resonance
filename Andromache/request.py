import requests
import json 


def gestici_dati(element, c_word):
    
    lemma = {}
    lemma["word"] = c_word
    
    print(len(element["RDF"]["Annotation"]["Body"]))
    
    #lemma["SubVoce"] = element["RDF"]["Annotation"]["Body"][0]["rest"]["entry"]["dict"]["hdwd"]["$"]
    
    return lemma
    
    
    
    



txt_to_analyze = "δοκῶ"

try:
    words = []
    for word in txt_to_analyze.split():
        url = f"http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word={word}"
        response = requests.get(url)
        
       
        
        if response.status_code == 201:
            dati = response.json()
            
            
            word = gestici_dati(dati, word)
            words.append(word)
            
            
            
        else: print("errore generico")
    
    print(words)
        
    
except requests.exceptions.RequestException as e:
    print(e)
except Exception as e: 
    print(e)
