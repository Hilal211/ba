import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BusinessRequests } from "./BusinessRequests";
import { Product } from "./Product";
import { Store } from "./Store";

@Entity("brand", { schema: "aplo" })
export class Brand {
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
    comment: "0:Not Archived, 1:Archived\t",
    default: () => "'0'",
  })
  archived: number;

  @OneToMany(
    () => BusinessRequests,
    (businessRequests) => businessRequests.brand
  )
  businessRequests: BusinessRequests[];

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @OneToMany(() => Store, (store) => store.brand)
  stores: Store[];
}
