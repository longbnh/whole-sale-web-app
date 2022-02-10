import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import ActiveLink from "../../commons/ActiveLink";

const Sidebar = () => {
  const route = useRouter();
  const activeKey = route.pathname;

  return (
    <div
      className="px-2 flex fixed justify-between bg-white flex-col z-20 overflow-x-hidden overflow-y-hidden"
      style={{ height: "calc(100% - 50px)", width: "220px" }}
    >
      <div className="block">
        <div className="flex flex-col pt-5">
          <div className="flex pb-1.5">
            <Image src={"/ShopIcon.svg"} width={22} height={22} />
            <h4 className="ml-2 text-lg font-medium justify-end pt-1">
              Quản lí cửa hàng
            </h4>
          </div>
          <div className="flex flex-col mx-5 pl-5">
            <ActiveLink
              href={"shopInfo"}
              activeKey={activeKey}
              content="Hồ sơ"
            />
            <ActiveLink activeKey={activeKey} content="Báo cáo của tôi" />
          </div>
        </div>

        <div className="flex flex-col pt-5">
          <div className="flex pb-1.5">
            <Image src={"/ProductIcon.svg"} width={22} height={22} />
            <h4 className="ml-2 text-lg font-medium justify-end pt-1">
              Quản lí sản phẩm
            </h4>
          </div>
          <div className="flex flex-col mx-5 pl-5">
            <ActiveLink activeKey={activeKey} content="Sản phẩm của tôi" />
            <ActiveLink
              href={"shopProduct"}
              activeKey={activeKey}
              content="Thêm 1 sản phẩm"
            />
            <ActiveLink
              href={"addListProduct"}
              activeKey={activeKey}
              content="Thêm loạt sản phẩm"
            />
            <ActiveLink activeKey={activeKey} content="Hướng dẫn" />
          </div>
        </div>

        <div className="flex flex-col pt-5">
          <div className="flex pb-1.5">
            <Image src={"/Price.svg"} width={22} height={22} />
            <h4 className="ml-2 text-lg font-medium justify-end pt-1">
              Quản lí mua chung
            </h4>
          </div>
          <div className="flex flex-col mx-5 pl-5">
            <ActiveLink activeKey={activeKey} content="Đơn hàng" />
            <ActiveLink activeKey={activeKey} content="Doanh thu" />
          </div>
        </div>
      </div>
      {/* <div className="pb-10">
        <input type="text" />
      </div> */}
    </div>
  );
};

export default Sidebar;
