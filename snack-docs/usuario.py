#usuario pode vender e comprar
from pedido import Pedido
class Usuario:
    def __init__(self, nome, senha):
        self.nome = nome
        self.senha = senha
        self.saldo = 0
        self.compras = []
    def login(self, nome, senha):
        if(nome == self.nome and senha == self.senha):
            print("Usuario logado")

    def editar_usuario(self, nome, senha):
        self.nome = nome
        self.senha = senha

    def deletar_usuario(self):
        print("Delete user")

    def novo_pedido(self):
        self.pedido = Pedido()

    def receber_pedido(self, pedido, status):
        pedido.status = status

    def adicionar_produto(self, produto):
        self.pedido.adicionar_produto(produto)
    
    def finalizar_compra(self, pedido):
        pedido.status = 'finalizado'

    def adicionar_saldo(self, valor):
        self.saldo += valor

    
         