# super-boleto

Biblioteca para lidar com boletos

# TOC
- [super-boleto](#super-boleto)
- [TOC](#toc)
- [Boleto](#boleto)
- [Bancos](#bancos)
	- [Sicredi](#sicredi)

# Boleto

![](https://blog.juno.com.br/_gatsby/image/ba4aeb6316cf6b654b097a77987987af/eb4102f90f68fcba7bf80a3befa59636/o-que-os-numeros-do-boleto-bancario-significam-1.jpg?u=https%3A%2F%2Fblog-cms.juno.com.br%2Fwp-content%2Fuploads%2F2021%2F12%2Fo-que-os-numeros-do-boleto-bancario-significam-1.jpg&a=w%3D1024%26h%3D472%26fm%3Djpg%26q%3D90&cd=2022-02-08T04%3A31%3A34)
Fonte: [https://blog.juno.com.br/o-que-os-numeros-boleto-bancario-significam/](https://blog.juno.com.br/o-que-os-numeros-boleto-bancario-significam/)

* Identificador banco: Lista de bancos em [src/bancos.ts](./src/bancos.ts).
* Identificador moda: 9 - Real, 0 - Outras.
* Identificador de campo: mod10 de capa campo que agreaga o campo livre.
* Código verificador geral: mod11 da concatenação em ordem de: 
	* Banco: `3 digítos`
	* Moeda: `1 digíto`
	* Vencimento: `4 digítos`
	* Valor: `10 digítos`
	* CampoLivre: `25 digítos`
* Fator de vencimento: número de dias desde 7 de outubro de 1997.
* Valor do cocumento: valor em reais, sem virgula ou ponto, duas casas decimais

# Bancos

## Sicredi

* Campo livre: `25 digítos`
	* Tipo Cobrança, registrada = 1, naoRegistrada = 3: `1 digíto`
	* Carteira, código da carteira de cobrança: `1 dígito`
	* Nosso número, livre escolha: `9 digítos`
	* Agencia: `4 digítos`
	* Posto: `2 digítos`
	* Conta, do beneficiário: `5 digítos`
	* Valor fixo, `10`: `2 digítos`
	* Digito verificador, mod11 dos dados anteriores: `1 digítos`