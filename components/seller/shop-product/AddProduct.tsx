import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {
    Button,
    CircularProgress,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CustomAutoComplete from "../../commons/CustomAutoComplete";
import productApi from "../../../api/productApi";
import {CustomAlertDialog} from "../../commons/CustomAlertDialog";
import ICategory from "../../../shared/models/ICategory";
import IBrand from "../../../shared/models/IBrand";
import IOrigin from "../../../shared/models/IOrigin";
import {APP_PATH, BRAND_VALUE, ORIGIN_VALUE, POPUP_CREATE_PRODUCT} from "../../../shared/enum/enum";
import {IProduct as IProductRequest} from "../../../shared/models/modifyApi/IProduct";
import {IProduct} from "../../../shared/models/IProduct";
import imageApi from "../../../api/imageApi";
import {useRouter} from "next/router";

interface IListCategory {
    categories: ICategory[];
    brands: IBrand[];
    origins: IOrigin[];
}

const AddProduct: React.FC<IListCategory> = (props) => {
    const Input = styled("input")({
        display: "none",
    });

    const [pictures, setPictures] = useState<File[]>([]);
    const [categoryOne, setCategoryOne] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(-1);
    const [price, setPrice] = useState<number>(-1);
    const [choice, setChoice] = useState<ICategory>();
    const [brandId, setBrandId] = useState<number>(-1);
    const [originId, setOriginId] = useState<number>(-1);
    const [name, setName] = useState<string>("");
    const [des, setDes] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [notiContent, setNotiContent] = useState<string>("");
    const [product, setProduct] = useState<IProduct>();
    const router = useRouter();

    const handleClose = async () => {
        await router.push(`${APP_PATH.SELLER.PRODUCT}/${product?.id}`);
        setOpen(false);
    };

    const onChangePicture = (e: any) => {
        let updatePictures = [...pictures] as File[];
        let newPictures = [...e.target.files] as File[];
        updatePictures = [...updatePictures, ...newPictures];
        if (updatePictures.length <= 5) setPictures(updatePictures);
    };

    const onRemovePicture = (removeIndex: number) => {
        let updatePictures = [...pictures] as [];
        updatePictures = [
            ...(updatePictures.filter(
                (picture, index) => index !== removeIndex
            ) as []),
        ];
        setPictures(updatePictures);
    };

    const handleCategoryOne = (e: any) => {
        let categoryItem = e.target.value;
        let item = props.categories.filter((cate) => cate.name === categoryItem);
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
    const handleOrigin = (e: any, val: IOrigin) => {
        setOriginId(val.id);
    };

    const handlePrice = (e: any) => {
        setPrice(e.target.value);
    }

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    }
    const handleDesChange = (e: any) => {
        setDes(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //Handle submit here
        setLoading(true);

        try {
            console.log(pictures)
            const response = await imageApi.uploadImage(pictures);
            const imgArr: string[] = response.data;
            let product: IProductRequest = {
                name: name,
                description: des,
                originalPrice: price,
                originId: originId,
                brandId: brandId,
                categoryId: categoryId,
                productImages: imgArr,
            }
            let productResponse = await productApi.createProduct(product, 1);
            setProduct(productResponse.data);
            setNotiContent(POPUP_CREATE_PRODUCT.Success);
        } catch (error) {
            setNotiContent(POPUP_CREATE_PRODUCT.Failed);
        } finally {
            setLoading(false);
            setOpen(true);
        }
    };

    return (
        <div
            className="w-full relative flex bg-gray-100 ml-56 h-full"
            // style={{ height: "calc(100vh - 50px)" }}
        >
            <div className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl">
                <div className="text-xl font-semibold p-4 ml-5">Thêm sản phẩm</div>
                <CustomAlertDialog title={POPUP_CREATE_PRODUCT.Title}
                                   content={notiContent}
                                   btName={POPUP_CREATE_PRODUCT.Ok}
                                   open={open}
                                   handleClickClose={handleClose}/>
                <form onSubmit={handleSubmit}>
                    <div className="flex align-center gap-5 justify-start p-4 mt-5 ml-5">
                        {Array.from(pictures).map((picture, index) => {
                            return (
                                <div key={index} className="w-32 h-32 relative">
                                    <img
                                        alt="product"
                                        src={URL.createObjectURL(picture)}
                                        className="w-32 h-32"
                                    />
                                    <IconButton
                                        className="absolute top-0 right-0 p-0 bg-gray-600"
                                        onClick={() => onRemovePicture(index)}
                                    >
                                        <CloseIcon className="text-white"/>
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
                            {pictures.length < 5 && <Button
                                className="border-2 border-dashed h-32 w-32 text-red-600"
                                component="span"
                            >
                                Thêm ảnh
                            </Button>}
                        </label>
                    </div>
                    <div className="w-8/12 p-4 mt-5 ml-5">
                        <TextField
                            required
                            id="name"
                            label="Tên sản phẩm"
                            className="w-full mb-5"
                            size="small"
                            onChange={handleNameChange}
                        />
                        <TextField
                            required
                            id="name"
                            label="Giá gốc"
                            className="w-full mb-5"
                            inputMode="numeric"
                            size="small"
                            autoComplete="off"
                            onKeyPress={event => {
                                const regex = /\d/
                                if (!regex.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            onPaste={event => {
                                const regex = /\d/
                                if (!regex.test(event.clipboardData.getData(""))) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={handlePrice}
                            type="text"
                            InputProps={{inputProps: {min: 0, step: 500}}}
                        />
                        <Box sx={{minWidth: 120}}>
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
                                    defaultValue={""}
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
                        <Box sx={{minWidth: 120}}>
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
                            onChange={handleDesChange}
                        />
                        <CustomAutoComplete
                            options={props.brands}
                            title="Thương hiệu"
                            displayValue={BRAND_VALUE.Name}
                            onChange={handleBrand}
                        />
                        <div className="mb-5"/>
                        <CustomAutoComplete
                            options={props.origins}
                            title="Xuất xứ"
                            displayValue={ORIGIN_VALUE.Name}
                            onChange={handleOrigin}
                        />
                        <div className="mb-5"/>
                        <div className="flex justify-end">
                            <label htmlFor="submit-button">
                                <Input id="submit-button" type="submit"/>
                                <Button variant="outlined"
                                        className="text-white w-32 h-15 bg-red-600 hover:bg-red-500 border-black"
                                        component="span"
                                        disabled={loading}>
                                    {
                                        loading
                                            ? <CircularProgress size={30} className="text-white"/>
                                            : <span className="text-xl">Thêm</span>
                                    }
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
