import os
import sys
from flask import request,jsonify
from modulos.app import app,mongo
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))

os.environ.update({'ROOT_PATH':ROOT_PATH})
os.environ.update({'ENV':'desarrollo'})
os.environ.update({'PUERTO':'4000'})
sys.path.append(os.path.join(ROOT_PATH,'modulos'))

@app.route('/usuarios/listar-usuarios',methods=['GET'])
def listar_usuarios():
    data = mongo.db.usuarios.find({})
    listado_documentos = list(data)

    if data == None:
        data = []
    else:
        for element in listado_documentos:
            element['_id'] = str(element['_id'])

    return jsonify({"transaccion":True,"data":listado_documentos})

@app.route('/usuarios/crear-usuarios',methods=['POST'])
@cross_origin()
def crear_usuario():
    data = request.get_json()
    guardar = mongo.db.usuarios.insert_one(data)
    return jsonify({"transaccion":True,"mensaje":"los datos se almacenaron exitosamente"})

@app.route('/usuarios/actualizar-usuario',methods=['PUT'])
@cross_origin()
def actualizar_usuario():
    data = request.get_json()

    result = mongo.db.usuarios.update_one({'_id': ObjectId(data['_id'])}, {'$set':{
        '_id':ObjectId(data['_id']),
        'name':data['name'],
        'surname':data['surname'],
        'profesion':data['profesion']
        }}, upsert=False)
    return jsonify({"transaccion":True,"mensaje":"los datos se actualizaron exitosamente"})


@app.route('/usuarios/borrado-usuario/<id>',methods=['DELETE'])
@cross_origin()
def borrar_usuario(id):
    result = mongo.db.usuarios.delete_one({'_id': ObjectId(id)})
    return jsonify({"transaccion":True,"mensaje":"los datos se borraron exitosamente"})


from modulos.app import app

if __name__ == '__main__':
    app.config['DEBUG'] = os.environ.get('ENV') == 'desarrollo'
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.run(port=int(os.environ.get("PUERTO")))
