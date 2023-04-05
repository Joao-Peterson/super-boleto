import { idBancos } from "./bancos";
import { boletoSicredi, sicrediCarteira, sicrediCobranca } from "./boletoSicredi";

let bol = new boletoSicredi(
	idBancos.banco_cooperativo_sicredi_s_a,
	new Date(2023, 1, 15),
	79.00,
	sicrediCobranca.registrada,
	sicrediCarteira.padrao,
	222248778,
	217, 43, 2598
);

// let ref = "74891122222487860217643025981002192900000007900"
let ref = "74891122222487780217343025981044592620000007900"
let a = bol.linhaDigitavel(false);
let b = bol.linhaDigitavel(true);

console.log(`Result: ${ref === a ? "true" : "false"}`);
console.log(`Ref: ${ref}`);
console.log(`   : ${a}`);