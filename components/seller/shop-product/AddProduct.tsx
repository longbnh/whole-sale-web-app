import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CustomAutoComplete from "../../utils/CustomAutoComplete";
import IBrand from "../../models/IBrand";
import { BRAND_VALUE } from "../../enum";
import ICategory from "../../models/ICategory";

interface IListCategory {
  categories: ICategory[];
  brands: IBrand[];
}

const AddProduct: React.FC<IListCategory> = (props) => {
  const Input = styled("input")({
    display: "none",
  });

  const [pictures, setPictures] = useState([]);
  const [categoryOne, setCategoryOne] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [choice, setChoice] = useState<ICategory>();
  const [brandId, setBrandId] = useState<number>(-1);

  const onChangePicture = (e: any) => {
    let updatePictures = [...pictures] as [];
    let newPictures = [...e.target.files] as [];
    updatePictures = [...updatePictures, ...newPictures];
    console.log(updatePictures);
    if (updatePictures.length <= 5) setPictures(updatePictures);
  };

  const onRemovePicture = (removeIndex: number) => {
    let updatePictures = [...pictures] as [];
    updatePictures = [
      ...(updatePictures.filter(
        (picture, index) => index !== removeIndex
      ) as []),
    ];
    console.log(updatePictures);
    setPictures(updatePictures);
  };

  const handleCategoryOne = (e: any) => {
    let categoryItem = e.target.value;
    let item = props.categories.filter((cate) => cate.name === categoryItem);
    console.log(...item);
    setChoice(item[0]);
    setCategoryOne(categoryItem);
    setCategoryId(-1);
  };

  const handleCategoryTwo = (e: any) => {
    let index = e.target.value;
    setCategoryId(index);
  };

  const handleBrand = (e: any, val: IBrand) => {
    setBrandId(val.id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //Handle submit here
    console.log("Submitted");
  };

  return (
    <div
      className="w-full relative flex bg-gray-100 ml-56"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <div className="bg-white mt-5 mx-auto w-4/5 h-full overflow-y-auto overflow-x-hidden">
        <div className="text-xl font-semibold p-4 ml-5">Thêm sản phẩm</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row align-center gap-5 justify-start p-4 mt-5 ml-5">
            {Array.from(pictures).map((picture, index) => {
              return (
                <div key={index} className="w-32 h-32 relative">
                  <img
                    alt="product"
                    src={URL.createObjectURL(picture)}
                    className="w-32 h-32"
                  />
                  <IconButton
                    className="absolute top-0 right-0 p-0 bg-black"
                    onClick={() => onRemovePicture(index)}
                  >
                    <CloseIcon className="text-white" />
                  </IconButton>
                </div>
              );
            })}
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                multiple
                type="file"
                onChange={onChangePicture}
              />
              <Button
                className="border-2 border-dashed h-32 w-32 text-red-600"
                component="span"
              >
                Thêm ảnh
              </Button>
            </label>
          </div>
          <div className="w-8/12 p-4 mt-5 ml-5">
            <TextField
              required
              id="name"
              label="Tên sản phẩm"
              className="w-full mb-5"
              size="small"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Ngành hàng
                </InputLabel>
                <Select
                  required
                  className="mb-5"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryOne}
                  label="Ngành hàng"
                  onChange={handleCategoryOne}
                >
                  {props.categories.map((cate) => {
                    return (
                      <MenuItem key={cate.name} value={cate.name}>
                        {cate.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Danh mục
                </InputLabel>
                <Select
                  required
                  className="mb-5"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={choice?.subCategories.filter(
                    (value) => value.id === categoryId
                  )}
                  disabled={categoryOne === ""}
                  label="Danh mục"
                  onChange={handleCategoryTwo}
                >
                  {choice?.subCategories.map((categoryTwo) => {
                    return (
                      <MenuItem key={categoryTwo.id} value={categoryTwo.id}>
                        {categoryTwo.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <TextField
              id="description"
              label="Mô tả sản phẩm"
              className="w-full mb-5"
              multiline
              rows={4}
              size="small"
            />
            <CustomAutoComplete
              options={props.brands}
              title="Thương hiệu"
              displayValue={BRAND_VALUE.Name}
              onChange={handleBrand}
            />
            <div className="flex justify-end">
              <label htmlFor="submit-button">
                <Input id="submit-button" type="submit" />
                <Button className="text-red-600" component="span">
                  Thêm
                </Button>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
