"use strict";

/*
 * Complete the 'smallestNegativeBalance' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts 2D_STRING_ARRAY debts as parameter.
 */

const changeBalance = (persons) => (person, amount, modifier) => {
  const currentBalance = persons.get(person) || 0;
  const newBalance = modifier(currentBalance, amount);

  persons.set(person, newBalance);

  return newBalance;
};

const lend = (currentBalance, amount) => currentBalance + amount;

const borrow = (currentBalance, amount) => currentBalance - amount;

const changeNegativeBalance = (negativeBalances) => (person, newBalance) =>
  newBalance >= 0
    ? negativeBalances.delete(person)
    : negativeBalances.add(person);

function smallestNegativeBalance(debts) {
  const persons = new Map();
  const negativeBalances = new Set();

  const balanceChanger = changeBalance(persons);
  const negativeBalanceChanger = changeNegativeBalance(negativeBalances);

  for (const [borrower, lender, amount] of debts) {
    const amountNumber = Number(amount);

    const newBorrowerBalance = balanceChanger(borrower, amountNumber, borrow);
    const newLenderBalance = balanceChanger(lender, amountNumber, lend);

    negativeBalanceChanger(borrower, newBorrowerBalance);
    negativeBalanceChanger(lender, newLenderBalance);
  }

  if (!negativeBalances.size) return ["Nobody has a negative balance"];

  return Array.from(negativeBalances.keys())
    .reduce((acc, person) => {
      const [smallestBalancePerson] = acc;
      const smallestBalance = persons.get(smallestBalancePerson);
      const currentBalance = persons.get(person);

      if (currentBalance < smallestBalance || !smallestBalance) {
        return [person];
      } else if (currentBalance === smallestBalance) {
        acc.push(person);
      }

      return acc;
    }, [])
    .sort((current, next) => {
      if (current > next) return 1;
      if (current < next) return -1;

      return 0;
    });
}
