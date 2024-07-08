import { ProductTypeEnum } from "../enum/product-type.enum";

export type ProductSearchModel = {
    ifDeleted: boolean;
    ifVisible : boolean;
    productTypes : ProductTypeEnum[];
}