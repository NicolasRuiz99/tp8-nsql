from flask import Flask
from flask import jsonify, request, redirect, url_for,send_file
import json
from connectiondb import inicializar_db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def herolistall():
    try:
        return "OK"
    except (Exception) as err:
        return str(err), 500

if __name__ == '__main__':
    app.run(host='backend', port='5000', debug=True)