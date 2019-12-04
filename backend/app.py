from flask import Flask, jsonify, make_response, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_cors import CORS
import jwt
import time
from itsdangerous import URLSafeSerializer,URLSafeTimedSerializer

from models import Usuario, Produto

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://novousuario:Password-1234@localhost/mydb'
app.config['SECURITY_PASSWORD_SALT'] = 'my_precious_two'
app.config.from_pyfile('config.cfg')
db = SQLAlchemy(app)
mail = Mail(app)
CORS(app)

@app.route('/usuarios', methods=['GET'])
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
            'confirmado': usuario.confirmado,
        }
        output.append(usu)
    return (jsonify(output))

@app.route('/usuario', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    new_user = Usuario(
        id=int(time.time()),
        senha=data['senha'],
        nome=data['nome'],
        email=data['email'],
        instituicao=data['instituicao'],
        telefone=data['telefone'],
        confirmado=False
    )
    token_user = jwt.encode({'user_id':new_user.id}, 'snack')
    body = 'Recebemos sua solicitação de cadastro. Para confirmar acesse o link: '
    msg = Message('[SNACK] Confirme seu cadastro!', sender='matheuspb95@gmail.com', recipients=[new_user.email])
    link = url_for('confirm_email',token=token_user, _external=True)
    print(link)
    msg.body = body + '\n {}'.format(link)

    try:
        db.session.add(new_user)
        db.session.commit()
    except:
        return make_response('Erro em acesso ao banco de dados', 500)
    
    return make_response('Usuario registrado')

@app.route('/login', methods=['GET'])
def login():
    auth = request.authorization
    if(auth is None):
        return make_response('Autenticacao nao encontrada', 401)

    if(auth.username is None or auth.password is None):
        return make_response('Usuario e senha nao informado', 401)
    
    user = Usuario.query.filter_by(email = auth.username).first()
    
    if(user is None):
        return make_response('Usuario nao encontrado', 401)

    if (not user.confirmado):
        return make_response('Usuario nao confirmado', 401)

    if(not user.senha == auth.password):
        return make_response('Senha errada', 401)

    return make_response(jsonify(user.to_json()))

@app.route('/confirm_email/<token>')
def confirm_email(token):
    decode = jwt.decode(token, 'snack')
    print("decode: ", decode)
    user = Usuario.query.get(decode['user_id'])

    if(user is None):
        return make_response('Usuario nao encontrado', 401)
    
    user.confirmado = True
    db.session.commit()
    return make_response('Email confirmado')

@app.route('/produtos', methods=['GET'])
def produtos():
    produtos = Produto.query.all()
    output = []
    for produto in produtos:
        prod = {
            'id': produto.id,
            'descricao': produto.descricao,
            'foto': produto.foto,
            'titulo': produto.titulo,
            'preco': produto.preco,
        }
        output.append(prod)
    return (jsonify(output))

@app.route('/produto', methods=['POST'])
def register_produto():
    data = request.get_json()
    new_prod = Produto(
        id=data['id'],
        descricao=data['descricao'],
        foto=data['foto'],
        titulo=data['titulo'],
        preco=data['preco']
    )
    try:
        db.session.add(new_prod)
        db.session.commit()
    except:
        return make_response('Erro em acesso ao banco de dados', 500)
    
    return make_response('Produto registrado')

@app.route('/pedidos', methods=['GET'])
def pedidos():
    pedidos = Pedido.query.all()
    output = []
    for pedido in pedidos:
        ped = {
            'id': pedido.id,
            'usuario_id': pedido.snack_usuario_id,
        }
        output.append(ped)
    return (jsonify(output))

@app.route('/pedido', methods=['POST'])
def register_pedido():
    data = request.get_json()
    new_ped = Produto(
        id=data['id'],
        snack_usuario_id=data['usuario_id']
    )
    try:
        db.session.add(new_ped)
        db.session.commit()
    except:
        return make_response('Erro em acesso ao banco de dados', 500)
    
    return make_response('Pedido registrado')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)