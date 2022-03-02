import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import campaignApi from "../../../../api/campaignApi";
import { ICampaign } from "../../../../shared/models/ICampaign";
import { IOrderSeller } from "../../../../shared/models/IOrder";
import { IPagination } from "../../../../shared/models/IPagination";
import BuyerInfo from "./BuyerInfo";
import OrderItem from "./OrderItem";

interface OrderProps {
  data: ICampaign;
}

const Order: React.FC<OrderProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [pageCampaign, setPageCampaign] = useState<IPagination<IOrderSeller>>();
  const [customer, setCustomer] = useState<IOrderSeller>();

  const getOrderSeller = async () => {
    const res = await campaignApi.getOrderByCampaign(props.data.id, {
      page: 1,
      pageSize: 10,
    });
    setPageCampaign(res.data);
  };

  useEffect(() => {
    getOrderSeller();
  }, [page]);

  return (
    <div className="mx-4 min-h-screen ">
      <div className="bg-white mx-4 mt-5 p-5 min-h-screen border rounded-xl">
        <div className="mb-3">Trạng thái</div>
        <Divider />
        <div className="flex relative h-fit">
          <div className="w-70% min-h-screen border-r-2 mr-3">
            {pageCampaign && pageCampaign.totalElements! > 0 ? (
              pageCampaign.content.map((item, key) => {
                return (
                  <OrderItem key={key} data={item} setCustomer={setCustomer} />
                );
              })
            ) : (
              // <>{pageCampaign.content.at(0)?.orderNumber}</>
              <>Không có dữ liệu</>
            )}
          </div>
          <div className="w-30% relative flex">
            <BuyerInfo customer={customer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
