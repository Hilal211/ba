import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BusinessRequests } from "./BusinessRequests";
import { Store } from "./Store";

@Entity("activity", { schema: "aplo" })
export class Activity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("datetime", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @Column("datetime", {
    name: "updated_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedDate: Date;

  @Column("int", { name: "updated_by", unsigned: true })
  updatedBy: number;

  @Column("smallint", {
    name: "archived",
    comment: "0:Not Archived, 1:Archived",
    default: () => "'0'",
  })
  archived: number;

  @OneToMany(
    () => BusinessRequests,
    (businessRequests) => businessRequests.activity
  )
  businessRequests: BusinessRequests[];

  @OneToMany(() => Store, (store) => store.activity)
  stores: Store[];
}
