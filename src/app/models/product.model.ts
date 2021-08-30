import { PromotionsModel } from './promotions.model';

export class ProductModel {
    Id: string; //
    storeId: string;
    categoryId: string;
    category: string;
    categoryFilters: Array<any>;
    customCategory: boolean;
    priceModifiedHour: number;
    Description: string; //
    Name: string; //
    recommended: boolean;
    Price: number;
    priceWithDiscountField: number;
    priceWithDiscount: number;
    priceWithDiscountTa: number;
    priceTa: number;
    stock: number;
    soldCount: number;
    rating: number;
    Thumbnail: string;
    softId: string;
    images: Array<any>;
    promotions: PromotionsModel;
    isActive: boolean;
    options: Array<any>;
    pendingAproval: boolean;
    takeAwayListRecomended: boolean;
}
