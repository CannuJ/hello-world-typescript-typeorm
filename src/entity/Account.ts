// src/entity/Account.ts

import { EntitySchema } from "typeorm";
export interface Account {
  id: number;
  balance: number;
}

export const AccountEntity = new EntitySchema<Account>({
    name: "Account",
    columns: {
        id: {
            type: Number,
            primary: true
            // generated: true
        },
        balance: {
            type: Number
        }
    }
})
