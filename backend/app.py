from flask import Flask
from flask import jsonify, request, redirect, url_for,send_file
import json
from connectiondb import cargar_datos,listar_restaurantes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def listall_restaurants():
    try:
        return jsonify (listar_restaurantes())
    except (Exception) as err:
        return str(err), 500

@app.route('/cargar_db', methods=['GET'])
@app.before_first_request
def cargar_db():
    try:
        cargar_datos ()
        return "OK"
    except (Exception) as err:
        return str(err), 500

if __name__ == '__main__':
    app.run(host='backend', port='5000', debug=True)