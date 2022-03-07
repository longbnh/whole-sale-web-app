import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import IBrand from "../../../shared/models/IBrand";
import ICategory from "../../../shared/models/ICategory";
import IOrigin from "../../../shared/models/IOrigin";
import ExcelReader from "../../../utils/ExcelReader";
import IExcelData from "../../../shared/models/IExcelData";
import DataGridProduct from "./DataGridProduct";
import CustomButtons from "../../commons/CustomButton";
import ISubmitProduct from "../../../shared/models/ISubmitProduct";
import productApi from "../../../api/productApi";
import { useRouter } from "next/router";
import { APP_PATH } from "../../../shared/enum/enum";

const Input = styled("input")({
  display: "none",
});

interface ContentProps {
  categories: ICategory[];
  brands: IBrand[];
  origins: IOrigin[];
}

const Content: React.FC<ContentProps> = (props) => {
  const [data, setData] = useState<IExcelData[]>([]);
  const [formData, setFormData] = useState<ISubmitProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const route = useRouter();

  const handleUpload = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    ExcelReader(file, setData);
  };

  const handleDownload = async () => {
    const url = await productApi.downloadFileImport();
    if (typeof window !== "undefined") {
      window.location.href = url.data;
    }
  };

  const handleSubmit = async () => {
    const response = await productApi.createListProduct(formData, 1);
    if (response.status === 200) {
      route.push(APP_PATH.SELLER.SHOP_LIST_PRODUCT);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      let formData: ISubmitProduct[] = [];
      data.map((item) => {
        formData.push({
          id: item.id,
          name: item.name,
          description: item.des,
          brandId: props.brands.filter((brand) => brand.name === item.brand)[0]
            .id,
          categoryId: props.categories
            .filter((cate) => cate.name === item.category)[0]
            .subCategories.filter(
              (subcate) => subcate.name === item.subcategory
            )[0].id,
          originId: props.origins.filter(
            (origin) => origin.countryName === item.origin
          )[0].id,
          originalPrice: item.price,
        });
      });
      setFormData(formData);
    } else {
      setFormData([]);
    }
  }, [data]);

  return (
    <div
      className="w-full relative flex bg-gray-100 ml-56"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <div
        className="bg-white mt-5 mx-auto w-4/5 overflow-y-hidden overflow-x-hidden"
        style={{ height: "92%" }}
      >
        <div className="text-xl font-semibold p-4 ml-5">
          Thêm danh sách sản phẩm
        </div>
        <div className="flex justify-end w-11/12 mx-auto pb-4">
          <Button
            className="mr-6"
            variant="contained"
            component="span"
            color="warning"
            startIcon={<FileDownloadOutlinedIcon />}
            size="small"
            onClick={handleDownload}
          >
            File mẫu
          </Button>
          <label htmlFor="contained-button-file">
            <Input
              accept=".xlsx, .xls, .csv, .xlsm"
              id="contained-button-file"
              type="file"
              onChange={handleUpload}
            />

            <Button
              variant="contained"
              component="span"
              color="success"
              startIcon={<FileUploadOutlinedIcon />}
              size="small"
            >
              File của bạn
            </Button>
          </label>
        </div>
        <div style={{ height: "calc(100% - 50px)" }}>
          <DataGridProduct
            data={data}
            formData={formData}
            loading={loading}
            setLoading={setLoading}
            setFormData={setFormData}
            categories={props.categories}
            brands={props.brands}
            origins={props.origins}
          />
          <div className="flex justify-end m-8">
            <CustomButtons content="Tạo" size="small" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
