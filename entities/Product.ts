import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand";

@Index("FK_brand_03", ["brandId"], {})
@Entity("product", { schema: "aplo" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("varchar", { name: "tag", length: 100 })
  tag: string;

  @Column("int", { name: "brand_id", nullable: true, unsigned: true })
  brandId: number | null;

  @Column("varchar", { name: "upid", length: 20 })
  upid: string;

  @Column("varchar", { name: "barcode", length: 20 })
  barcode: string;

  @Column("varchar", { name: "featured_image", length: 100 })
  featuredImage: string;

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

  @Column("int", { name: "updated_by" })
  updatedBy: number;

  @Column("smallint", {
    name: "status",
    comment: "0:Not Active, 1:Active, 2:Requested",
  })
  status: number;

  @Column("smallint", {
    name: "archived",
    comment: "0:Not Archived, 1:Archived",
  })
  archived: number;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;
}
