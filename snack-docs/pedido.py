class Pedido:
    def __init__(self):
        self.produtos = []
        self.valor_pago = 0
        self.status = 'pedindo'
        self.avaliacao = 0
        self.forma_pagamento = 'dinheiro'

    def adicionar_produto(self, produto):
        self.produtos.append(produto)
    
    def calcular_total(self):
        total = 0
        for produto in self.produtos:
            total += produto.preco
        return total

    def conformar_entrega(self):
        self.status = 'entrega'
    
    def selecionar_forma_pagamento(self, pagamento):
        self.forma_pagamento = pagamento

    def avaliar(self, avaliacao):
        self.avaliacao = avaliacao