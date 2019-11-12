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

    def to_json(self):
        return dict(
            nome=self.nome,
            id=self.id,
            email=self.email,
            senha=self.senha,
            instituicao=self.instituicao,
            telefone=self.telefone,
        )