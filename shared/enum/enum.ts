export enum BRAND_VALUE {
    Name = "name",
    Id = "id",
}

export enum ORIGIN_VALUE {
    Name = "countryName",
    Id = "id",
}

export enum SHOP_API {
    Shop = "/shops",
    Category = "/categories",
    Product = "/products",
    Brand = "/brands",
    Origin = "/origins"
}

export enum POPUP_CREATE_PRODUCT {
    Title = "Thông báo",
    Ok = "Ok",
    Cancel = "Hủy",
    Success = "Bạn đã tạo sản phẩm thành công"
}

export enum URL_LINK {
    SHOP_PRODUCT = "shopProduct",
    SHOP_LIST_PRODUCT = "shopListProduct",
    SHOP_INFO = "shopInfo",
}

export enum SORT_TYPE {
    ID_ASC = "id_asc",
    ID_DESC = "id_des",
    NAME_ASC = "name_asc",
    NAME_DESC = "name_desc",
    PRICE_ASC = "originalPrice_asc",
    PRICE_DESC = "originalPrice_desc",
    DESCRIPTION_ASC = "description_asc",
    DESCRIPTION_DESC = "description_desc",
    STATUS_ASC = "status_asc",
    STATUS_DESC = "status_desc",
}
