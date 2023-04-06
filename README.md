# super-boleto

Biblioteca para lidar com boletos

# TOC
- [super-boleto](#super-boleto)
- [TOC](#toc)
- [Boleto](#boleto)
- [Bancos](#bancos)
	- [Sicredi](#sicredi)
- [Código de barras](#código-de-barras)
	- [Codificação](#codificação)
	- [Narrow wide encoding](#narrow-wide-encoding)

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

# Código de barras

Linha digitavél codificada com Interleaved 2 of 5 (ITF)

![](https://www.keyence.com.br/Images/ss_barcode_lecture_itf_ph01_1491121.gif)

Onde codifica se como na ordem: 3, 8, 5, 2. Primeiro dígito é codificado em barras, o segundo em espaços, e assim por diante, sendo cada par de dígitos barra/espaço entrelaçados.

## Codificação

As barras/espaços são wide (largas) ou narrow (curtas), sendo wide binário 1 e narrow binário 0. Portanto número 3 seria 0b11000, assim tem se a codificação dos dígitos:

| Dígito | Binário |
|--------|---------|
| 0 	 | 0b00110 |
| 1 	 | 0b10001 |
| 2 	 | 0b01001 |
| 3 	 | 0b11000 |
| 4 	 | 0b00101 |
| 5 	 | 0b10100 |
| 6 	 | 0b01100 |
| 7 	 | 0b00011 |
| 8 	 | 0b10010 |
| 9 	 | 0b01010 |

## Narrow wide encoding

Pode ser codificado em uma string, onde um par de espaços e barras viram 5 caracterés:

* w é wide bar
* n é narrow bar
* maiusculo é wide space
* minisculo é narrow space

| Char | Description | |
| - | - | - |
| W | wide bar   | wide space
| N | narrow bar | wide space
| w | wide bar   | narrow space
| n | narrow bar | narrow space