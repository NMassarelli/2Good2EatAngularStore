import { ProductTypeEnum } from "../enum/product-type.enum";

export type ProductSearchModel = {
    showOutOfStock: boolean;
    showDeleted: boolean;
    showInvisible: boolean;
    productTypes: ProductTypeEnum[];
}
