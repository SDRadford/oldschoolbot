import getOSItem from '../src/lib/util/getOSItem';
import { parseStringBank } from '../src/lib/util/parseStringBank';

const psb = parseStringBank;
const get = getOSItem;
test('parseStringBank', async () => {
	const quantities = [
		['5k', 5000],
		['1.5k', 1500],
		['1m', 1_000_000],
		['20', 20],
		['0', 0],
		['', 0]
	];

	for (const [input, output] of quantities) {
		expect(psb(`${input} twisted bow`)).toEqual([{ qty: output, item: get('Twisted bow') }]);
	}

	const output = psb(` 1 twisted bow, coal,  5k egg,  1b trout `);
	const expected = [
		{ qty: 1, item: get('Twisted bow') },
		{
			qty: 0,
			item: get('Coal')
		},
		{
			qty: 5000,
			item: get('Egg')
		},
		{
			qty: 1_000_000_000,
			item: get('Trout')
		}
	];
	expect(expected).toEqual(expect.arrayContaining(output));
	expect(output.length).toEqual(expected.length);
	for (let i = 0; i < output.length; i++) {
		let res = output[i];
		let exp = expected[i];
		expect(res.qty).toEqual(exp.qty);
		expect(res.item).toEqual(exp.item);
	}

	expect(psb('')).toEqual([]);
	expect(psb(' ')).toEqual([]);
	expect(psb(', ')).toEqual([]);
	expect(psb(',, , , , ,, , , , ,')).toEqual([]);
	expect(psb('twisted bow, twisted bow, 1000 twisted bow, 5k twisted bow')).toEqual([
		{ qty: 0, item: get('Twisted bow') }
	]);

	expect(psb('1k twisted bow, twisted bow, 1000 twisted bow, 5k twisted bow')).toEqual([
		{ qty: 1000, item: get('Twisted bow') }
	]);
	expect(psb('5 tarromin')).toEqual([{ qty: 5, item: get('Tarromin') }]);
	expect(psb('3rd age platebody, 5 3rd age platelegs')).toEqual([
		{ qty: 0, item: get('3rd age platebody') },
		{ qty: 5, item: get('3rd age platelegs') }
	]);
	expect(psb('Bronze arrow, Iron arrow, Steel arrow, Rune arrow')).toEqual([
		{ qty: 0, item: get('Bronze arrow') },
		{ qty: 0, item: get('Iron arrow') },
		{ qty: 0, item: get('Steel arrow') },
		{ qty: 0, item: get('Rune arrow') }
	]);
	expect(psb('Steel platelegs, Adamant platelegs, Black platelegs')).toEqual([
		{ qty: 0, item: get('Steel platelegs') },
		{ qty: 0, item: get('Adamant platelegs') },
		{ qty: 0, item: get('Black platelegs') }
	]);
});
