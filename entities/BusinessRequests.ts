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

@Index("FK_brand_01", ["brandId"], {})
@Index("FK_activity_01", ["activityId"], {})
@Entity("business_requests", { schema: "aplo" })
export class BusinessRequests {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "brand_id", nullable: true, unsigned: true })
  brandId: number | null;

  @Column("varchar", { name: "brand_name", length: 100 })
  brandName: string;

  @Column("int", { name: "activity_id", nullable: true, unsigned: true })
  activityId: number | null;

  @Column("varchar", { name: "activity_name", length: 150 })
  activityName: string;

  @Column("varchar", { name: "full_name", length: 150 })
  fullName: string;

  @Column("varchar", { name: "position", length: 100 })
  position: string;

  @Column("varchar", { name: "website", length: 100 })
  website: string;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 32 })
  password: string;

  @Column("datetime", {
    name: "created_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date;

  @ManyToOne(() => Activity, (activity) => activity.businessRequests, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "activity_id", referencedColumnName: "id" }])
  activity: Activity;

  @ManyToOne(() => Brand, (brand) => brand.businessRequests, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;
}
