import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

@Entity({ tableName: 'company' })
export class UserEntity extends BaseEntity {
  @Property({ fieldName: 'name', type: String, nullable: true })
  name: string;

  @Property({ fieldName: 'email', type: String, nullable: false })
  email: string;

  @Property({ fieldName: 'password', type: String, nullable: false })
  password: string
}
