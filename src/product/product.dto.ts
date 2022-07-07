export interface ProductDto {
    id: number;
    name: string;
    tag: string;
    brandId: number;
    categoryId: number;
    upid: number;
    barcode: string;
    featuredImage: string;
    createdDate: Date;
    updatedDate: Date;
    updatedBy: number;
    status: number;
    archived: number;
}