// ISO/IEC 16390:2016 (Information technology - Automatic identification and data capture techniques - Bar code symbology - Interleaved 2 of 5)
const itfEncode: number[] = [
	0b00110,
	0b10001,
	0b01001,
	0b11000,
	0b00101,
	0b10100,
	0b01100,
	0b00011,
	0b10010,
	0b01010
];

// if -1, then error
const itfDecode: number[] = [-1,-1,7,-1,4,0,-1,-1,2,9,-1,6,-1,-1,-1,-1,1,8,-1,5,-1,-1,-1,3];

const nwEncodeBin: string[] = ['n','N','w','W'];

function nwDecodeBin(char: string): number{
	
	switch(char.charCodeAt(0)){
		case 'n'.charCodeAt(0):
			return 0; 
		case 'N'.charCodeAt(0):
			return 1; 
		case 'w'.charCodeAt(0):
			return 2; 
		case 'W'.charCodeAt(0):
			return 3; 
		
		default:
			return -1;
	}
}

// w is wide bar
// n is narrow bar
// uppercase is wide space
// lowercase is narrow space
// W - wide bar  , wide space
// N - narrow bar, wide space
// w - wide bar  , narrow space
// n - narrow bar, narrow space
export function nwEncode(input: number[]): string | undefined{
	if(input.length % 2 != 0) return;
	let res: string[] = [];

	for(let i = 0; i < (input.length / 2); i++){
		let enc = [itfEncode[input[i*2]], itfEncode[input[i*2+1]]];
		
		res.push(nwEncodeBin[ ((enc[0] & (1<<4)) << 1 | (enc[1] & (1<<4))) >> 4 ]);
		res.push(nwEncodeBin[ ((enc[0] & (1<<3)) << 1 | (enc[1] & (1<<3))) >> 3 ]);
		res.push(nwEncodeBin[ ((enc[0] & (1<<2)) << 1 | (enc[1] & (1<<2))) >> 2 ]);
		res.push(nwEncodeBin[ ((enc[0] & (1<<1)) << 1 | (enc[1] & (1<<1))) >> 1 ]);
		res.push(nwEncodeBin[ ((enc[0] & (1<<0)) << 1 | (enc[1] & (1<<0))) >> 0 ]);
	}

	return res.join("");
}

export function nwDecode(input: string): number[] | undefined{
	if(input.length % 5 != 0) return;

	let res: number[] = [];
	for(let i = 0; i < (input.length / 5); i++){

		let dec = [0,0];
		
		for (let j = 0; j < 5; j++) {
			let char = nwDecodeBin(input.at(i*5+j)!);
			
			dec[0] <<= 1;
			dec[0] |= ((char & 0b10) >> 1);
			dec[1] <<= 1;
			dec[1] |= ((char & 0b01) >> 0);
		}
		
		res.push(itfDecode[dec[0]-1]);
		res.push(itfDecode[dec[1]-1]);
	}

	return res;
}