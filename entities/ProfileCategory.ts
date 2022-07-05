import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";

@Index("FK_category", ["categoryId"], {})
@Entity("profile_category", { schema: "aplo" })
export class ProfileCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("int", { name: "category_id", nullable: true, unsigned: true })
  categoryId: number | null;

  @Column("int", { name: "brand_id", nullable: true })
  brandId: number | null;

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
  })
  archived: number;

  @ManyToOne(() => Category, (category) => category.profileCategories, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;
}
