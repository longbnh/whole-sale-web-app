import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {
    Backdrop,
    Button,
    CircularProgress,
    FormControl, FormHelperText,
    IconButton, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CustomAutoComplete, {isString} from "../../../commons/CustomAutoComplete";
import productApi from "../../../../api/productApi";
import {CustomAlertDialog} from "../../../commons/CustomAlertDialog";
import ICategory, {ISubCategory} from "../../../../shared/models/ICategory";
import IBrand from "../../../../shared/models/IBrand";
import IOrigin from "../../../../shared/models/IOrigin";
import {APP_PATH, BRAND_VALUE, ORIGIN_VALUE, PAGE_REQUEST, POPUP_PRODUCT} from "../../../../shared/enum/enum";
import {IProduct as IProductRequest} from "../../../../shared/models/modifyApi/IProduct";
import {useRouter} from "next/router";
import {IImage} from "../../../../shared/models/IImage";
import Autocomplete from "@mui/material/Autocomplete";
import imageApi from "../../../../api/imageApi";
import {matchProductStatusDisplayType} from "../../../../utils/PageRequestUtils";
import PRODUCT_DISPLAY = PAGE_REQUEST.STATUS.PRODUCT.PRODUCT_DISPLAY;
import Image from 'next/image'
import {IErrorResponse} from "../../../../shared/models/IErrorResponse";
import NumberFormat from "../../../../utils/NumberFormat";

interface IListCategory {
    categories: ICategory[];
    brands: IBrand[];
    origins: IOrigin[];
}

const UpdateProduct: React.FC<IListCategory> = (props) => {
    const Input = styled("input")({
        display: "none",
    });

    const [oldPictures, setOldPictures] = useState<IImage[]>([]);
    const [newPictures, setNewPictures] = useState<File[]>([]);
    const [removedPictures, setRemovedPictures] = useState<number[]>([])

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [notiContent, setNotiContent] = useState<string>('');
    const [productRequest, setProductRequest] = useState<IProductRequest>();
    const [categoryOne, setCategoryOne] = useState<string>('');
    const [categoryTwo, setCategoryTwo] = useState<ISubCategory | ''>('');
    const [brand, setBrand] = useState<IBrand | undefined>(undefined);
    const [origin, setOrigin] = useState<IOrigin | undefined>(undefined);
    const [choice, setChoice] = useState<ICategory>();
    const [error, setError] = useState<IErrorResponse>({status: false});
    const router = useRouter();
    const {id} = router.query;

    const handleClose = async() => {
        if (notiContent === POPUP_PRODUCT.Edit_Success) {
            await router.push(`${APP_PATH.SELLER.PRODUCT}/${id}`);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (id) {
            productApi.getProduct(parseInt(id as string))
                .then(res => {
                    if (matchProductStatusDisplayType(res.data.status, PRODUCT_DISPLAY.ON_SALE)) {
                        router.push(`${APP_PATH.SELLER.SHOP_LIST_PRODUCT}`)
                    }
                    setProductRequest({
                        originalPrice: res.data.originalPrice,
                        description: res.data.description,
                        name: res.data.name,
                        newImages: [],
                        removeImages: [],
                    });
                    let defaultCateOne = props.categories
                        .find(cate => cate.subCategories
                            .find((subCate) => subCate.id === res.data.category.id))
                    setCategoryOne(defaultCateOne!.name)
                    setChoice(defaultCateOne);
                    setCategoryTwo(res.data.category)
                    setOrigin(res.data.origin);
                    setBrand(res.data.brand);
                    setOldPictures(res.data.productImages);

                })

                .catch(err => {
                    console.log(err)
                })
        }
    }, [id, props]);

    const onChangePicture = (e: any) => {
        let updatePictures = [...newPictures] as File[];
        let newPics = [...e.target.files] as File[];
        updatePictures = [...updatePictures, ...newPics];
        if (updatePictures.length + oldPictures.length <= 5) setNewPictures(updatePictures);
    };

    const onRemoveNewPicture = (removeIndex: number) => {
        let updatePictures = [...newPictures] as [];
        updatePictures = [
            ...(updatePictures.filter(
                (picture, index) => index !== removeIndex
            ) as []),
        ];
        setNewPictures(updatePictures);
    };

    const onRemoveOldPicture = (removeIndex: number) => {
        let updatePictures = [...oldPictures] as [];
        updatePictures = [
            ...(updatePictures.filter(
                (picture, index) => index !== removeIndex
            ) as []),
        ];
        const removedPictureId = oldPictures
            .filter((picture, index) => index === removeIndex)
            .map(picture => picture.id)[0];
        setRemovedPictures(removedPictures => [...removedPictures, removedPictureId])
        setOldPictures(updatePictures);
    };

    const handleCategoryOne = (e: any) => {
        let categoryItem = e.target.value;
        let item = props.categories.find((cate) => cate.name === categoryItem);
        setCategoryOne(categoryItem);
        setChoice(item);
        setCategoryTwo('');
    };

    const handleCategoryTwo = (e: any) => {
        let selectedCateTwoId = parseInt(e.target.value);
        let selectedCateTwo = choice?.subCategories.find(
            (value) => value.id === selectedCateTwoId
        )

        if (selectedCateTwo !== undefined) {
            setCategoryTwo(selectedCateTwo);
        } else {
            setCategoryTwo('');
        }
    }

    const handleBrand = (value: any) => {
        setBrand(value);
    }

    const handleOrigin = (value: any) => {
        setOrigin(value)
    }

    function handleError(): boolean {
        //Name error
        if (productRequest?.name === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "name",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        if (productRequest?.originalPrice === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "price",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }
        else {
            if (productRequest?.originalPrice === 0) {
                setError(prevState => ({
                    ...prevState,
                    status: true,
                    errorLabel: "price",
                    errorContent: "Giá gốc phải lớn hơn 0"
                }))
                return false;
            }
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

        if (categoryTwo === '') {
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

        if (brand === undefined || brand === null) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "brand",
                errorContent: "Trường này bị trống"
            }))
            return false;
        }

        if (origin === undefined || origin === null) {
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
            let response = await imageApi.uploadImage(newPictures);
            let newImages = response.data;
            let product: IProductRequest = {
                ...productRequest,
                newImages: newImages,
                removeImages: removedPictures,
                brandId: brand?.id,
                originId: origin?.id,
                categoryId: (categoryTwo as ISubCategory).id,
            }
            await productApi.updateProduct(product, parseInt(id as string))
            setNotiContent(POPUP_PRODUCT.Edit_Success);
        }
        catch (error) {
            setNotiContent(POPUP_PRODUCT.Failed);
        }
        finally {
            setLoading(false);
            setOpen(true);
        }
    };

    if (!productRequest) {
        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }

    return (
        <div
            className="w-full relative flex bg-gray-100 ml-56 h-full"
        >
            <div className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl">
                <div className="text-xl font-semibold p-4 ml-5">Cập nhật sản phẩm</div>
                <CustomAlertDialog title={POPUP_PRODUCT.Title}
                                   content={notiContent}
                                   btName={POPUP_PRODUCT.Ok}
                                   open={open}
                                   handleClickClose={handleClose}/>
                 <div>
                    <div className="flex align-center gap-5 justify-start p-4 mt-5 ml-5">
                        {Array.from(newPictures).map((picture, index) => {
                            return (
                                <div key={index} className="w-32 h-32 relative">
                                    <Image
                                        alt="product"
                                        src={URL.createObjectURL(picture)}
                                        className="w-32 h-32"
                                    />
                                    <IconButton
                                        className="absolute top-0 right-0 p-0 bg-gray-600"
                                        onClick={() => onRemoveNewPicture(index)}
                                    >
                                        <CloseIcon className="text-white"/>
                                    </IconButton>
                                </div>
                            );
                        })}
                        {Array.from(oldPictures).map((picture, index) => {
                            return (
                                <div key={index} className="w-32 h-32 relative">
                                    <Image
                                        alt="product"
                                        src={picture.url}
                                        width={200}
                                        height={200}
                                    />
                                    <IconButton
                                        className="absolute top-0 right-0 p-0 bg-gray-600"
                                        onClick={() => onRemoveOldPicture(index)}
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
                            {oldPictures.length + newPictures.length < 5 && <Button
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
                            value={productRequest?.name}
                            label="Tên sản phẩm"
                            error={error.errorLabel === "name"}
                            helperText={error.errorLabel === "name" ? error.errorContent : ""}
                            className="w-full"
                            size="small"
                            inputProps={{maxLength: 100}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {productRequest?.name !== undefined ? productRequest.name.length : 0 } / 100
                                </InputAdornment>,
                            }}
                            onChange={e => {
                                let newValue = e.target.value;
                                if (newValue !== "") {
                                    setProductRequest(prevState => ({
                                        ...prevState,
                                        name: e.target.value as string
                                    }))
                                }
                                else {
                                    setProductRequest(prevState => ({
                                        ...prevState,
                                        name: undefined
                                    }))
                                }
                            }}
                        />
                        <TextField
                            id="name"
                            label="Giá gốc"
                            className="w-full"
                            value={(productRequest?.originalPrice !== undefined
                                && NumberFormat(productRequest.originalPrice)) || ''}
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
                            onChange={e => {
                                let newValue = e.target.value;
                                if (newValue !== "") {
                                    setProductRequest(prevState =>
                                        ({...prevState, originalPrice: parseInt(newValue.replace(/,/g, ''))}))
                                } else {
                                    setProductRequest(prevState =>
                                        ({...prevState, originalPrice: undefined}))
                                }
                            }}
                            type="text"
                            InputProps={{inputProps: {maxLength: 14},
                                endAdornment: <InputAdornment position="end">
                                    đ (Dưới {NumberFormat(100000000000)}đ)
                                </InputAdornment>,}}
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
                                        <MenuItem key={cate.priority} value={cate.name}>
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
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryTwo && categoryTwo.id}
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
                            rows={4}
                            size="small"
                            value={productRequest?.description}
                            inputProps={{maxLength: 5000}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {productRequest?.description !== undefined ? productRequest.description.length : 0 } / 5000
                                </InputAdornment>,
                            }}
                            onChange={e => setProductRequest(prevState => ({
                                ...prevState,
                                description: e.target.value
                            }))}
                        />
                        <Autocomplete
                            autoComplete
                            autoHighlight
                            value={brand ?? null}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Thương hiệu"}
                                    error={error.errorLabel === "brand"}
                                    helperText={error.errorLabel === "brand" ? error.errorContent : ""}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'text',
                                    }}
                                />
                            )}
                            onChange={(e, value) => handleBrand(value)}
                            options={props.brands}
                            getOptionLabel={(option: any) =>
                                isString(option[BRAND_VALUE.Name]) ? option[BRAND_VALUE.Name] : ""
                            }
                        />
                        <Autocomplete
                            autoComplete
                            autoHighlight
                            value={origin ?? null}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        label={"Xuất xứ"}
                                        error={error.errorLabel === "origin"}
                                        helperText={error.errorLabel === "origin" ? error.errorContent : ""}
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'text',
                                        }}
                                    />
                                )
                            }}
                            onChange={(e, value) => handleOrigin(value)}
                            options={props.origins}
                            getOptionLabel={(option: any) =>
                                isString(option[ORIGIN_VALUE.Name]) ? option[ORIGIN_VALUE.Name] : ""
                            }
                        />
                        <div className="mb-5"/>
                        <div className="flex justify-end gap-5">
                            <Button variant="outlined"
                                    className="text-black w-32 h-16 bg-gray-400 hover:bg-gray-500"
                                    component="span"
                                    onClick={() => router.push(`${APP_PATH.SELLER.PRODUCT}/${id}`)}
                                    disabled={loading}>
                                {
                                    <span className="text-xl">Hủy</span>
                                }
                            </Button>
                            <Button variant="outlined"
                                    className="text-white w-32 h-16 bg-red-600 hover:bg-red-500"
                                    component="span"
                                    onClick={handleSubmit}
                                    disabled={loading}>
                                {
                                    loading
                                        ? <CircularProgress size={30} className="text-white"/>
                                        : <span className="text-xl">Thay đổi</span>
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpdateProduct;
