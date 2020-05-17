from pymongo import MongoClient
import json

def inicializar_db ():
    try:
        client = MongoClient(host='db',port=27017)
        mydb = client["db"]
        return mydb
    except (Exception) as err:
        return err

def listar_restaurantes ():
    res = []
    db = inicializar_db ()
    for x in db.restaurants.find({}).limit(1000):
        x["_id"] = str(x["_id"])
        res.append (x)
    return res

def cargar_datos ():
    db = inicializar_db ()
    with open('restaurants.json') as f:
        file_data = json.load(f)
    db.restaurants.drop()
    db.restaurants.insert_many(file_data)

        