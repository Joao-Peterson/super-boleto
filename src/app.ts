import { idBancos } from "./bancos";
import { nwDecode, nwEncode } from "./barcodeItf";
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

let nw = nwEncode([2,3,7,9,1,9,2,2,0,0,0,0,0,1,0,1,6,6,6,3,9,9,5,0,9,0,2,5,7,0,0,3,3,6,8,9,0,0,7,5,5,5,7,0]);
console.log(`nwCompare: ${nw === "NWnnwnNnWwwNnNwnWnnWnnWWnnnWWnNnwwNNnwwNnWWnnNWwnnnWnWnwnWNnnwNWnNwNnwnnNWwNNwwnwWNnnwNnWnnnWWnNnNwwWnWnnnnNWw" ? "true" : "false"}`)
console.log(`nwString: ${nw}`);
console.log(`ref     : NWnnwnNnWwwNnNwnWnnWnnWWnnnWWnNnwwNNnwwNnWWnnNWwnnnWnWnwnWNnnwNWnNwNnwnnNWwNNwwnwWNnnwNnWnnnWWnNnNwwWnWnnnnNWw`);

let nwde = nwDecode(nw!)?.join("");
console.log(`nwDecodedCompare: ${nwde === "23791922000001016663995090257003368900755570" ? "true" : "false"}`)
console.log(`decoded : ${nwde ?? "null"}`);
console.log(`ref     : 23791922000001016663995090257003368900755570`);