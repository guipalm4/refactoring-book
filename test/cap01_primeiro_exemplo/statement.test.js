import {expect} from 'chai';
import {statement} from '../../src/cap01_primeiro_exemplo/depois/statement.js';
import {statement as antes} from '../../src/cap01_primeiro_exemplo/antes/statement.js';
import fs from "fs";

describe('statement', () => {
    const plays = JSON.parse(fs.readFileSync('./test/cap01_primeiro_exemplo/plays.json'));
    const invoices = JSON.parse(fs.readFileSync('./test/cap01_primeiro_exemplo/invoices.json'));

    it('should print a statement for multiple plays, single customer and multiple seats in plain text', () => {
        let expected = antes(invoices, plays);
        expect(statement(invoices, plays)).to.equal(expected);
    });
});