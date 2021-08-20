import { EntityRepository, Repository, EntityManager } from "typeorm";
import { Account, AccountSchema } from "../entity/Account";

@EntityRepository()
export class UserRepository extends Repository<Account> {

    // if we needed to add in custom methods

}