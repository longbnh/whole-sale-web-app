export enum BRAND_VALUE {
    Name = "name",
    Id = "id",
}

export enum ORIGIN_VALUE {
    Name = "countryName",
    Id = "id",
}

export enum CUSTOMER_API {
    Customer = "/customers",
    Cart = "/cart",
}

export enum SHOP_API {
    Shop = "/shops",
    Category = "/categories",
    Product = "/products",
    Brand = "/brands",
    Origin = "/origins",
    Campaign = "/campaigns",
    Order = "/orders",
    PaymentType = "/paymentTypes",
    Address = "/customers/addresses",
    Image = "/images",
}

export namespace GOONG_PATH {
    export enum PLACE {
        AUTOCOMPLETE = "/Place/AutoComplete",
        DETAIL = "/Place/Detail",
    }
    export enum GEOCODING {
        FORWARD = "/geocode"
    }
}

export enum ADDRESS {
    CITIES = '/cities',
    DISTRICT = '/districts',
    WARD = '/wards'
}

export enum POPUP_CREATE_PRODUCT {
    Title = "Thông báo",
    Ok = "Ok",
    Cancel = "Hủy",
    Success = "Bạn đã tạo sản phẩm thành công",
    Failed = "Đã có lỗi xảy ra",
}

export enum URL_LINK {
    SHOP_PRODUCT = "shopProduct",
    SHOP_LIST_PRODUCT = "shopListProduct",
    SHOP_INFO = "shopInfo",
    SHOP_CAMPAIGN = "shopCampaign",
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

export enum LOCAL_STORAGE {
    CART_ITEM = "cartItem",
    ADDRESS = "address",
}

export enum CAMPAIGN_SORT_TYPE {
    DEFAULT = 0,
    NAME = 1,
    REVENUE = 2,
    END_DATE = 3,
}

export enum CAMPAIGN_STATUS {
    ACTIVE = 0,
    HIDDEN = 1,
    COMPLETE = 2,
    NO_SEARCH = 3,
}

export enum CAMPAIGN_DISPLAY_STATUS {
    ACTIVE = 0,
    HIDDEN = 1,
    COMPLETE = 3,
}

export enum CAMPAIGN_SORT_DIRECTION {
    ASC = 0,
    DESC = 1,
}

export namespace APP_PATH {
    export enum CUSTOMER {
        CAMPAIGN = '/campaign',
        CART = '/cart',
        CHECKOUT_2 = '/checkout-step2',
        CHECKOUT_3 = "/checkout-step3",
        INDEX = '/',
    }

    export enum SELLER {
        INDEX = '/seller/',
        CAMPAIGN = '/seller/campaign',
        ADD_LIST_PRODUCT = '/seller/addListProduct',
        REGISTER_INFO = '/seller/registerInfo',
        SHOP_CAMPAIGN = '/seller/shopCampaign',
        SHOP_INFO = '/seller/shopInfo',
        SHOP_LIST_PRODUCT = '/seller/shopListProduct',
        SHOP_PRODUCT = '/seller/shopProduct',
        WELCOME = '/seller/welcome',
    }
}