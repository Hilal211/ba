export interface CategoryDto {
    id: number;
    name: string;
    parentId: number;
    createdDate: Date;
    updatedDate: Date;
    archived: number;
}