import {expect} from 'chai';
import {htmlStatement, statement} from '../../src/cap01_primeiro_exemplo/depois/statement.js';
import {statement as antes} from '../../src/cap01_primeiro_exemplo/antes/statement.js';
import fs from "fs";

describe('statement', () => {
    const plays = JSON.parse(fs.readFileSync('./test/cap01_primeiro_exemplo/plays.json'));
    const invoices = JSON.parse(fs.readFileSync('./test/cap01_primeiro_exemplo/invoices.json'));

    it('should print a statement for multiple plays, single customer and multiple seats in plain text', () => {
        let expected = antes(invoices, plays);
        expect(statement(invoices, plays)).to.equal(expected);
    });

    it('should print a statement for multiple plays, single customer and multiple seats in html', () => {
        let result = `<h1>Statement for BigCo</h1>\n`;
        result += "<table>\n";
        result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n`;
        result += `  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n`;
        result += `  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n`;
        result += "</table>\n";
        result += `<p>Amount owed is <em>$1,730.00</em></p>\n`;
        result += `<p>You earned <em>47</em> credits</p>\n`;

        expect(htmlStatement(invoices, plays)).to.equal(result);
    });
});