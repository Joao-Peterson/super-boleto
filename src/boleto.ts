import { format } from "util";
import { idBancos } from "./bancos";
import { mod10, mod11 } from "./checkSum";
import dayjs, { Dayjs } from "dayjs"

// 9 - Real
// 0 - outras moedas
export type idMoeda = 9 | 0;

// boleto
export abstract class boleto{
	banco: number[];
	moeda: number[];
	vencimento: number[];
	valor: number[];
	
	protected abstract campoLivre(): number[];
	
	constructor(
		banco: idBancos,
		moeda: idMoeda,
		vencimento: Date,
		valor: number
	){
		this.banco = this.num2Array(Number(banco), 3);
		this.moeda = this.num2Array(Number(moeda), 1);
		
		let ref = dayjs(vencimento);
		let vencimentoDays = ref.diff(dayjs("1997-10-07"), "day");
		this.vencimento = this.num2Array(vencimentoDays, 4);

		this.valor = this.num2Array(valor * 100, 10);
	}

	protected num2Array(num: number, size: number): number[]{
		const digits = num.toString().split("");
		const padLength = Math.max(0, size - digits.length);
		const padded = Array(padLength).fill(0).concat(digits.map(d => parseInt(d)));
		return padded;
	}

	private dvGeral(campoLivre: number[]): number{
		let checksum: number[] = [];
		checksum = checksum
			.concat(this.banco)
			.concat(this.moeda)
			.concat(this.vencimento)
			.concat(this.valor)
			.concat(campoLivre);

		return mod11(checksum);
	}

	linhaDigitavel(fmt: boolean = true): string{
		let fields: number[][] = [];
		let linha: number[] = [];
		let campoLivre = this.campoLivre();
		if(campoLivre.length <= 0 || campoLivre.length > 25) throw new Error("Campo livre deve possuir exatos 25 caracteres");

		// campo 1
		fields.push(this.banco.concat(this.moeda).concat(campoLivre[0]));
		fields.push(campoLivre.slice(1, 5));
		// campo 2
		fields.push(campoLivre.slice(5, 10));
		fields.push(campoLivre.slice(10, 15));
		// campo 3
		fields.push(campoLivre.slice(15, 20));
		fields.push(campoLivre.slice(20, 25));
		
		for(let i = 0; i < 3; i++){													// verificador de cada campo
			let dv = mod10(fields[i*2].concat(fields[i*2+1]));
			linha = linha.concat(fields[i*2]).concat(fields[i*2+1]).concat(dv);
		}
		
		linha.push(this.dvGeral(campoLivre));										// digito verificador geral

		linha = linha.concat(this.vencimento).concat(this.valor);					// vencimento e valor

		if(fmt){
			let linhafmt = "";
			linhafmt += `${linha.slice(0,5).join("")}`;
			linhafmt += `.`;
			linhafmt += `${linha.slice(5,10).join("")}`;
			linhafmt += ` `;
			linhafmt += `${linha.slice(10,15).join("")}`;
			linhafmt += `.`;
			linhafmt += `${linha.slice(15,21).join("")}`;
			linhafmt += ` `;
			linhafmt += `${linha.slice(21,26).join("")}`;
			linhafmt += `.`;
			linhafmt += `${linha.slice(26,32).join("")}`;
			linhafmt += ` `;
			linhafmt += `${linha.slice(32,33).join("")}`;
			linhafmt += ` `;
			linhafmt += `${linha.slice(33).join("")}`;

			return linhafmt;
		}
		else{
			return linha.join("");
		}
	}
};
