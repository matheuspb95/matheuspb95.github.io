from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy

from models import Usuario

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://novousuario:Password-1234@localhost/mydb'
db = SQLAlchemy(app)

@app.route('/')
def home():
    usuarios = Usuario.query.all()
    output = []
    for usuario in usuarios:
        usu = {
            'id': usuario.id,            
            'senha': usuario.senha,
            'nome': usuario.nome,
            'email': usuario.email,
            'instituicao': usuario.instituicao,
            'telefone': usuario.telefone,
        }
        output.append(usu)
    return (jsonify(output))

@app.route('/user', methods=['POST'])
def register():
    data = request.get_json()
    new_user = Usuario(
        id=data['id'],
        senha=data['senha'],
        nome=data['nome'],
        email=data['email'],
        instituicao=data['instituicao'],
        telefone=data['telefone']
    )
    try:
        db.session.add(new_user)
        db.session.commit()
    except:
        return make_response('Error on db access', 500)
    
    return make_response('User registered')

@app.route('/login', methods=['GET'])
def login():
    auth = request.authorization
    if(auth is None):
        return make_response('No auth header found', 401)

    if(auth.username is None or auth.password is None):
        return make_response('Username or password not found', 401)
    
    user = Usuario.query.filter_by(email = auth.username).first()
    
    if(user is None):
        return make_response('User not found', 401)

    if(not user.senha == auth.password):
        return make_response('Wrong password', 401)

    return make_response(jsonify(user.to_json()))




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)