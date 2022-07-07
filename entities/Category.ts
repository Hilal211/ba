import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { ProfileCategory } from "./ProfileCategory";

@Index("parent_id", ["parentId"], {})
@Entity("category", { schema: "aplo" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("int", { name: "parent_id", nullable: true, unsigned: true })
  parentId: number | null;

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

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(
    () => ProfileCategory,
    (profileCategory) => profileCategory.category
  )
  profileCategories: ProfileCategory[];
}
