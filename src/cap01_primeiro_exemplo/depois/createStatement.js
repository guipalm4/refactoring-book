class PerformanceCalculator {

    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }

    get amount() {
        throw new Error("Subclass responsibility");
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay);
        case "comedy":
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`Unknown type: ${aPlay.type}`);
    }
}

function createStatementData(invoice, plays) {
    const statementData = [];
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalAmount(statementData) {
        return statementData.performances.reduce((total, aPerformance) =>
            total + aPerformance.amount, 0)
    }

    function totalVolumeCredits(statementData) {
        return statementData.performances.reduce((total, performance) =>
            total + performance.volumeCredits, 0)
    }
}

export {createStatementData}
