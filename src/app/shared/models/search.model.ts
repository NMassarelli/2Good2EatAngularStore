import { ProductTypeEnum } from "../enum/product-type.enum";

export type ProductSearchModel = {
    IfDeleted: boolean;
    IfVisible : boolean;
    ProductTypes : ProductTypeEnum[];
}