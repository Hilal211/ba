import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Activity } from "./Activity";
import { Brand } from "./Brand";

@Index("FK_brand_02", ["brandId"], {})
@Index("FK_activity_02", ["activityId"], {})
@Entity("store", { schema: "aplo" })
export class Store {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("int", { name: "brand_id", nullable: true, unsigned: true })
  brandId: number | null;

  @Column("int", { name: "activity_id", nullable: true, unsigned: true })
  activityId: number | null;

  @Column("varchar", { name: "website", length: 150 })
  website: string;

  @Column("varchar", { name: "full_name", length: 150 })
  fullName: string;

  @Column("varchar", { name: "position", length: 100 })
  position: string;

  @Column("int", { name: "login_id", unsigned: true })
  loginId: number;

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
    name: "status",
    comment: "0:Not Active, 1:Active",
    default: () => "'1'",
  })
  status: number;

  @Column("smallint", {
    name: "archived",
    comment: "0:Not Archived, 1:Archived",
  })
  archived: number;

  @ManyToOne(() => Activity, (activity) => activity.stores, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "activity_id", referencedColumnName: "id" }])
  activity: Activity;

  @ManyToOne(() => Brand, (brand) => brand.stores, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;
}
