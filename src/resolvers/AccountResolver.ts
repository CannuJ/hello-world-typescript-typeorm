import { Resolver, Mutation, Arg } from "type-graphql";
import { getRepository } from "typeorm";
import { Account, AccountSchema } from "../entity/Account";

@Resolver()
export class AccountResolver {
    @Mutation(() => Boolean)
    async createAccount(@Arg("accId") accId: number, @Arg("accBalance") accBalance: number) {
        const accountRepository = getRepository<Account>(AccountSchema)
        const account = accountRepository.create()
        account.id = accId;
        account.balance = accBalance;
        await accountRepository.save(account)
        console.log("Saved a new account.")
    }
}