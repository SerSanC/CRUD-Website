from flask import Flask
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import datetime

class JSONEncoder(json.JSONEncoder):
    def default(self,object):
        if isinstance(object,ObjectId):
            return str(object)
        if isinstance(object,datetime.datetime):
            return str(object)
        return json.JSONEncoder.default(self,object)

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://Flask:Flask123@clustercrud.t9bxp.mongodb.net/FlaskCRUD?retryWrites=true&w=majority'
app.json_encoder = json.JSONEncoder
mongo = PyMongo(app)

from modulos.app.controladores import *