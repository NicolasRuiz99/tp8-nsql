from pymongo import MongoClient
from bson.objectid import ObjectId
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
    for x in db.restaurants.find({}):
        x["id"] = str(x["_id"])
        del x ["_id"]
        res.append (x)
    return res

def agregar_restaurante (item):
    db = inicializar_db ()
    db.restaurants.insert_one(item)

def modificar_restaurante (item):
    db = inicializar_db ()
    db.restaurants.update_one({"_id":ObjectId(item["id"])},{"$set":item})

def eliminar_restaurante (id):
    db = inicializar_db()
    res = db.restaurants.delete_one({"_id":ObjectId(id)})

def cargar_datos ():
    db = inicializar_db ()
    with open('restaurants.json') as f:
        file_data = json.load(f)
    db.restaurants.drop()
    db.restaurants.insert_many(file_data)

        