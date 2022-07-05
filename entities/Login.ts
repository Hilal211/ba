import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("login", { schema: "aplo" })
export class Login {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 32 })
  password: string;

  @Column("smallint", { name: "type", comment: "1:user, 2:store" })
  type: number;

  @Column("varchar", { name: "verification_token", length: 100 })
  verificationToken: string;

  @Column("varchar", { name: "password_reset_token", length: 100 })
  passwordResetToken: string;

  @Column("datetime", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @Column("datetime", {
    name: "last_updated_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdatedDate: Date;

  @Column("smallint", {
    name: "archived",
    comment: "0:Not Archived, 1:Archived",
    default: () => "'0'",
  })
  archived: number;
}
