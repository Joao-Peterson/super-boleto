import { format } from "util";
import { idBancos } from "./bancos";
import { mod10, mod11 } from "./checkSum";
import dayjs, { Dayjs } from "dayjs"
import { boleto, idMoeda } from "./boleto";

export enum sicrediCobranca{
	registrada = 1,	
	naoRegistrada = 3,	
}

export enum sicrediCarteira{
	padrao = 1,	
}

export class boletoSicredi extends boleto{
	tipoCobranca: number[];
	carteira: number[];
	nossoNumero: number[];
	agencia: number[];
	posto: number[];
	conta: number[];
	
	constructor(
		banco: idBancos,
		vencimento: Date,
		valor: number,
		tipoCobranca: sicrediCobranca,
		carteira: sicrediCarteira,
		nossoNumero: number,
		agencia: number,
		posto: number,
		conta: number,
		moeda: idMoeda = 9,
	){
		super(
			banco,
			moeda,
			vencimento,
			valor	
		);

		this.tipoCobranca	= this.num2Array(Number(tipoCobranca), 1);
		this.carteira    	= this.num2Array(Number(carteira), 1);
		this.nossoNumero 	= this.num2Array(Number(nossoNumero), 9);
		this.agencia     	= this.num2Array(Number(agencia), 4);
		this.posto       	= this.num2Array(Number(posto), 2);
		this.conta       	= this.num2Array(Number(conta), 5);
	}

	protected campoLivre(): number[]{
		let campo: number[] = [];

		campo = campo
			.concat(this.tipoCobranca)
			.concat(this.carteira)
			.concat(this.nossoNumero)
			.concat(this.agencia)
			.concat(this.posto)
			.concat(this.conta)
			.concat([1, 0]);

		let dv = mod11(campo);
		campo.push(dv);

		return campo;
	}
};
