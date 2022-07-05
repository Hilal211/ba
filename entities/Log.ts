import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log", { schema: "aplo" })
export class Log {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "login_id" })
  loginId: number;

  @Column("varchar", { name: "file", length: 150 })
  file: string;

  @Column("text", { name: "extra" })
  extra: string;

  @Column("varchar", { name: "error", length: 500 })
  error: string;

  @Column("datetime", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;
}
