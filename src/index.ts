// src/index.ts

import "reflect-metadata";
import { createConnection, getRepository, Repository } from "typeorm";
import { Account, AccountEntity } from "./entity/Account";

async function insertAccount(repository, accId: number, accBalance: number) {

  console.log("Inserting a new account into the database...");
  // insert a new account into the database
  const accountDTO = {
    id: accId,
    balance: accBalance
  };
  const newAccount = await repository.save(accountDTO)
  console.log("Saved a new account.")
}

async function printBalance(repository, id: number) {
  console.log("Printing balances from account " + id + ".");
  const account = await repository.findOne(id);
  console.log(account);
}

async function transferFunds(repository, amount: number, from: number, to: number) {
  console.log('Transferring ${amount} from account ${from} to account ${to}.')

  let accountFrom = await repository.findOne(from);
  accountFrom.balance = accountFrom.balance - amount;
  await repository.save(accountFrom);

  let accountTo = await repository.findOne(to);
  accountTo.balance = accountTo.balance - amount;
  await repository.save(accountTo);

  console.log("Transfer complete.");
}

createConnection()
  .then(async (connection) => {

  // request data
  const accountRepository = getRepository<Account>(AccountEntity);

    await insertAccount(accountRepository, 1, 1000);
    await printBalance(accountRepository, 1);

    await insertAccount(accountRepository, 2, 250);
    await printBalance(accountRepository, 2);

    await transferFunds(accountRepository, 500, 1, 2);
    await printBalance(accountRepository, 1);
    await printBalance(accountRepository, 2);
  })
  .catch((error) => console.log(error));
