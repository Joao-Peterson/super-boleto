export function mod11(input: number[]): number{
	let mul = 2;
	let acc = 0;
	
	for(let i = input.length-1; i >= 0; i--){
		acc += input[i] * mul;
		mul = (mul >= 9 ? 2 : mul + 1);
	}
	
	return (acc * 10) % 11 % 10;
}
	
export function mod10(input: number[]): number{
	let acc = 0;
	let mul = 2;
	for(let i = input.length-1; i >=0; i--){
		let res = input[i] * mul;
		acc += (res > 9 ? 1 + res % 10 : res);
		mul = (mul == 2 ? 1 : 2);
	}

	let res = acc % 10;
	return (res != 0 ? 10 - res : 0);
}