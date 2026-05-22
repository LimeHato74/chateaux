export class FinanceEngine {
  constructor() {}

  calculate(budget, syllabusNode) {
    // Basic logic to simulate JASSO / Tobitate and On-Campus jobs
    const baseCost = syllabusNode.baseCost; // Yearly
    const currency = syllabusNode.currency;

    // Simulate Tobitate / JASSO (approx 1500 USD equivalent per month)
    const monthlyScholarship = 1500; 

    // Simulate On-campus job (20 hours * $15 = $300/week = $1200/month)
    const monthlyJob = 1200;

    const monthlyCost = Math.round(baseCost / 12) + 1000; // Tuition + Living (approx 1000)

    const netImpact = (monthlyScholarship + monthlyJob) - monthlyCost;

    return {
      monthlyCost,
      monthlyScholarship,
      monthlyJob,
      netImpact,
      currency
    };
  }
}
