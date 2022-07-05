import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfileCategory } from "./ProfileCategory";

@Entity("category", { schema: "aplo" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("int", { name: "parent_id", unsigned: true })
  parentId: number;

  @Column("datetime", { name: "created_date" })
  createdDate: Date;

  @Column("datetime", { name: "updated_date" })
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
    () => ProfileCategory,
    (profileCategory) => profileCategory.category
  )
  profileCategories: ProfileCategory[];
}
