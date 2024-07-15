import { ProductTypeEnum } from "../enum/product-type.enum";

export type ProductSearchModel = {
    showDeleted: boolean;
    showInvisible : boolean;
    productTypes : ProductTypeEnum[];
}
