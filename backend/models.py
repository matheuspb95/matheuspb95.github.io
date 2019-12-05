from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'snack_usuario'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200))
    email = db.Column(db.String(200))
    senha = db.Column(db.String(200))
    instituicao = db.Column(db.String(200))
    telefone = db.Column(db.String(200))
    confirmado = db.Column(db.Boolean,nullable=False, default=False)

    def to_json(self):
        return dict(
            nome=self.nome,
            id=self.id,
            email=self.email,
            senha=self.senha,
            instituicao=self.instituicao,
            telefone=self.telefone,
        )

class Produto(db.Model):
    __tablename__ = 'snack_produto'
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(200))
    titulo = db.Column(db.String(200))
    foto = db.Column(db.String(200))
    preco = db.Column(db.Float())
    qtd = db.Column(db.Integer())
    vendedor = db.Column(db.Integer,db.ForeignKey('snack_usuario.id'))
    

    def to_json(self):
        return dict(
            descricao=self.descricao,
            id=self.id,
            titulo=self.titulo,
            foto=self.foto,
            preco=self.preco
        )

class Pedido(db.Model):
    __tablename__ = 'snack_pedido'
    id = db.Column(db.Integer, primary_key=True)
    snack_usuario_id=db.Column(db.Integer,db.ForeignKey('snack_usuario.id'))
    
    def to_json(self):
        return dict(
            snack_usuario_id=self.snack_usuario_id,
            id=self.id,
        )