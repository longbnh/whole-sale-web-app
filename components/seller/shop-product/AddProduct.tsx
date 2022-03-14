import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {
    Button,
    CircularProgress,
    FormControl, FormHelperText,
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
import ICategory, {ISubCategory} from "../../../shared/models/ICategory";
import IBrand from "../../../shared/models/IBrand";
import IOrigin from "../../../shared/models/IOrigin";
import {APP_PATH, BRAND_VALUE, ORIGIN_VALUE, POPUP_CREATE_PRODUCT} from "../../../shared/enum/enum";
import {IProduct as IProductRequest} from "../../../shared/models/modifyApi/IProduct";
import {IProduct} from "../../../shared/models/IProduct";
import imageApi from "../../../api/imageApi";
import {useRouter} from "next/router";
import Image from 'next/image'
import {IErrorResponse} from "../../../shared/models/IErrorResponse";

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
    const [categoryOne, setCategoryOne] = useState<string | undefined>(undefined);
    const [categoryTwo, setCategoryTwo] = useState<ISubCategory | undefined>(undefined);
    const [price, setPrice] = useState<number | undefined>();
    const [choice, setChoice] = useState<ICategory>();
    const [brand, setBrand] = useState<IBrand | undefined>(undefined);
    const [origin, setOrigin] = useState<IOrigin | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [des, setDes] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [notiContent, setNotiContent] = useState<string>("");
    const [product, setProduct] = useState<IProduct>();
    const [error, setError] = useState<IErrorResponse>({status: false});
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
        setCategoryTwo(undefined);
    };

    const handleCategoryTwo = (e: any) => {
        let selectedCateTwoId = parseInt(e.target.value);
        let selectedCateTwo = choice?.subCategories.find(
            (value) => value.id === selectedCateTwoId
        )

        if (selectedCateTwo !== undefined) {
            setCategoryTwo(selectedCateTwo);
        } else {
            setCategoryTwo(undefined);
        }
    };

    const handleBrand = (e: any, val: IBrand) => {
        let selectedBrand = props.brands.find((brand) => brand.id === val.id)
        setBrand(selectedBrand);
    };
    const handleOrigin = (e: any, val: IOrigin) => {
        let selectedOrigin = props.origins.find((origin) => origin.id === val.id)
        setOrigin(selectedOrigin);
    };

    const handlePrice = (e: any) => {
        let newValue = e.target.value;
        if (newValue !== "") {
            setPrice(parseInt(newValue.replace(/,/g, '')))
        } else {
            setPrice(undefined)
        }
    }

    const handleNameChange = (e: any) => {
        let newValue = e.target.value;
        if (newValue !== "") {
            setName(newValue)
        } else {
            setName(undefined)
        }
    }
    const handleDesChange = (e: any) => {
        setDes(e.target.value);
    }

    function handleError(): boolean {
        console.log('CALLED')
        //Name error
        if (name === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "name",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        if (price === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "price",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        if (categoryOne === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "categoryOne",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        if (categoryTwo === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "categoryTwo",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        //NOT CATCH DES
        // if (des === undefined) {
        //     setError(prevState => ({
        //         ...prevState,
        //         status: true,
        //         errorLabel: "des",
        //         errorContent: "Trường này bị trống"
        //     }))
        //     return false;
        // }

        if (brand === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "brand",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        if (origin === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "origin",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        setError({status: false})
        return true;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!handleError()) {
            return;
        }

        setLoading(true);
        try {
            const response = await imageApi.uploadImage(pictures);
            const imgArr: string[] = response.data;
            let product: IProductRequest = {
                name: name,
                description: des,
                originalPrice: price,
                originId: origin?.id,
                brandId: brand?.id,
                categoryId: categoryTwo?.id,
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
        >
            <div className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl">
                <div className="text-xl font-semibold p-4 ml-5">Thêm sản phẩm</div>
                <CustomAlertDialog title={POPUP_CREATE_PRODUCT.Title}
                                   content={notiContent}
                                   btName={POPUP_CREATE_PRODUCT.Ok}
                                   open={open}
                                   handleClickClose={handleClose}/>
                <div className="flex align-center gap-5 justify-start p-4 mt-5 ml-5">
                    {Array.from(pictures).map((picture, index) => {
                        return (
                            <div key={index} className="w-32 h-32 relative">
                                <Image
                                    alt="product"
                                    src={URL.createObjectURL(picture)}
                                    width={200}
                                    height={200}
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
                <div className="flex flex-col gap-y-5 w-8/12 p-4 mt-5 ml-5">
                    <TextField
                        id="name"
                        label="Tên sản phẩm"
                        error={error.errorLabel === "name"}
                        helperText={error.errorLabel === "name" ? error.errorContent : ""}
                        className="w-full"
                        size="small"
                        onChange={handleNameChange}
                    />
                    <TextField
                        id="name"
                        label="Giá gốc"
                        className="w-full"
                        error={error.errorLabel === "price"}
                        helperText={error.errorLabel === "price" ? error.errorContent : ""}
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
                        value={price}
                        onChange={handlePrice}
                        type="text"
                        InputProps={{inputProps: {min: 0, step: 500}}}
                    />
                    <FormControl fullWidth error={error.errorLabel === "categoryOne"}>
                        <InputLabel id="demo-simple-select-label">
                            Ngành hàng
                        </InputLabel>
                        <Select
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
                        {error.errorLabel === "categoryOne"
                        && <FormHelperText>{error.errorContent}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth error={error.errorLabel === "categoryTwo"}>
                        <InputLabel id="demo-simple-select-label">
                            Danh mục
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryTwo?.name}
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
                        {error.errorLabel === "categoryTwo"
                        && <FormHelperText>{error.errorContent}</FormHelperText>}
                    </FormControl>
                    <TextField
                        id="description"
                        label="Mô tả sản phẩm"
                        className="w-full"
                        multiline
                        value={des}
                        rows={4}
                        size="small"
                        onChange={handleDesChange}
                    />
                    <CustomAutoComplete
                        options={props.brands}
                        title="Thương hiệu"
                        error={error.errorLabel === "brand"}
                        errorContent={error.errorLabel === "brand" ? error.errorContent : ""}
                        displayValue={BRAND_VALUE.Name}
                        value={brand?.name}
                        onChange={handleBrand}
                    />
                    <CustomAutoComplete
                        options={props.origins}
                        title="Xuất xứ"
                        error={error.errorLabel === "origin"}
                        errorContent={error.errorLabel === "origin" ? error.errorContent : ""}
                        displayValue={ORIGIN_VALUE.Name}
                        value={origin?.countryName}
                        onChange={handleOrigin}
                    />
                    <div className="flex justify-end">
                        <Button variant="outlined"
                                className="text-white w-32 h-15 bg-red-600 hover:bg-red-500 border-black"
                                component="span"
                                onClick={handleSubmit}
                                disabled={loading}>
                            {
                                loading
                                    ? <CircularProgress size={30} className="text-white"/>
                                    : <span className="text-xl">Thêm</span>
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddProduct;
