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
  Order = "/orders",
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
  Template = "/importTemplate",
  PromotionPlan = "/promotions",
}

export namespace GOONG_PATH {
  export enum PLACE {
    AUTOCOMPLETE = "/Place/AutoComplete",
    DETAIL = "/Place/Detail",
  }

  export enum GEOCODING {
    FORWARD = "/geocode",
  }
}

export enum ADDRESS {
  CITIES = "/cities",
  DISTRICT = "/districts",
  WARD = "/wards",
}

export enum POPUP_PRODUCT {
  Title = "Thông báo",
  Ok = "Ok",
  Cancel = "Hủy",
  Success = "Bạn đã tạo sản phẩm thành công",
  Failed = "Đã có lỗi xảy ra",
  Edit_Success = "Bạn đã cập nhật sản phẩm thành công",
}

export enum URL_LINK {
  SHOP_PRODUCT = "shopProduct",
  SHOP_LIST_PRODUCT = "shopListProduct",
  SHOP_INFO = "shopInfo",
  SHOP_CAMPAIGN = "shopCampaign",
}

export enum LOCAL_STORAGE {
  CART_ITEM = "cartItem",
  ADDRESS = "address",
}

export namespace APP_PATH {
  export enum CUSTOMER {
    CAMPAIGN = "/campaign",
    CART = "/cart",
    CHECKOUT_2 = "/checkout-step2",
    CHECKOUT_3 = "/checkout-step3",
    INDEX = "/",
    PURCHASE = "/purchase",
  }

  export enum SELLER {
    INDEX = "/seller/",
    CAMPAIGN = "/seller/campaign",
    ADD_LIST_PRODUCT = "/seller/addListProduct",
    REGISTER_INFO = "/seller/registerInfo",
    SHOP_CAMPAIGN = "/seller/shopCampaign",
    SHOP_INFO = "/seller/shopInfo",
    SHOP_LIST_PRODUCT = "/seller/shopListProduct",
    SHOP_PRODUCT = "/seller/shopProduct",
    WELCOME = "/seller/welcome",
    PRODUCT = "/seller/product",
    PRODUCT_EDIT = "/seller/product/edit",
    CAMPAIGN_ADD = "/seller/campaign/add",
    CAMPAIGN_EDIT = "/seller/campaign/edit",
  }
}

export namespace PAGE_REQUEST {
  export namespace STATUS {
    export namespace CAMPAIGN {
      export enum CAMPAIGN_QUERY {
        ACTIVE = 0,
        HIDDEN = 1,
        COMPLETE = 2,
        NO_SEARCH = 3,
      }
      export enum CAMPAIGN_DISPLAY {
        ACTIVE = 0,
        HIDDEN = 1,
        COMPLETE = 3,
      }
    }
    export namespace PRODUCT {
      export enum PRODUCT_QUERY {
        GET_ALL_ACTIVE_AND_SALE = 0,
        GET_ALL_ACTIVE_ONLY = 1,
        GET_ALL_SALE_ONLY = 2,
      }
      export enum PRODUCT_DISPLAY {
        ACTIVE = 0,
        DELETED = 1,
        ON_SALE = 2,
      }
    }
  }
  export namespace ORDER {
    export enum ORDER_QUERY {
      ASC = 0,
      DESC = 1,
    }
  }
  export namespace SORT {
    export enum PRODUCT {
      NO_SEARCH = 0,
      BY_ID = 1,
      BY_NAME = 2,
      BY_CREATE_DATE = 3,
    }

    export enum CAMPAIGN {
      DEFAULT = 0,
      NAME = 1,
      REVENUE = 2,
      END_DATE = 3,
    }
  }
}
