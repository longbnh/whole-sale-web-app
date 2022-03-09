import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {
    Backdrop,
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
import {isString} from "../../../commons/CustomAutoComplete";
import productApi from "../../../../api/productApi";
import {CustomAlertDialog} from "../../../commons/CustomAlertDialog";
import ICategory from "../../../../shared/models/ICategory";
import IBrand from "../../../../shared/models/IBrand";
import IOrigin from "../../../../shared/models/IOrigin";
import {APP_PATH, BRAND_VALUE, ORIGIN_VALUE, PAGE_REQUEST, POPUP_CREATE_PRODUCT} from "../../../../shared/enum/enum";
import {IProduct as IProductRequest} from "../../../../shared/models/modifyApi/IProduct";
import {useRouter} from "next/router";
import {IImage} from "../../../../shared/models/IImage";
import Autocomplete from "@mui/material/Autocomplete";
import imageApi from "../../../../api/imageApi";
import {matchProductStatusDisplayType} from "../../../../utils/PageRequestUtils";
import PRODUCT_DISPLAY = PAGE_REQUEST.STATUS.PRODUCT.PRODUCT_DISPLAY;

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
    const [notiContent, setNotiContent] = useState<string>("");
    const [productRequest, setProductRequest] = useState<IProductRequest>();
    const [categoryOne, setCategoryOne] = useState<string>("");
    const [choice, setChoice] = useState<ICategory>();
    const router = useRouter();
    const {id} = router.query;

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        try {
            if (id) {
                productApi.getProduct(parseInt(id as string))
                    .then(res => {
                        if (matchProductStatusDisplayType(res.data.status, PRODUCT_DISPLAY.ON_SALE)) {
                            router.push(`${APP_PATH.SELLER.SHOP_LIST_PRODUCT}`)
                        }
                        setProductRequest({
                            originalPrice: res.data.originalPrice,
                            description: res.data.description,
                            brandId: res.data.brand.id,
                            originId: 1,
                            name: res.data.name,
                            categoryId: res.data.category.id,
                            newImages: [],
                            removeImages: [],
                        });
                        setOldPictures(res.data.productImages);

                        let defaultCateOne = props.categories
                            .find(cate => cate.subCategories
                                .find((subCate) => subCate.id === res.data.category.id))
                        setCategoryOne(defaultCateOne!.name)
                        setChoice(defaultCateOne);
                    })

                    .catch(err => {
                        console.log(err)
                    })
            }
        } catch (err) {
            console.log(err);
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
        console.log(categoryItem)
        let item = props.categories.filter((cate) => cate.name === categoryItem);
        setCategoryOne(categoryItem);
        setChoice(item[0]);
    };

    const handleCategoryTwo = (e: any) => {
        let id = e.target.value;
        setProductRequest(prevState => ({...prevState, categoryId: id}))
    }

    const handleBrand = (value: any) => {
        const brand: IBrand = value;
        setProductRequest(prevState => ({...prevState, brandId: brand.id}))
    }

    const handleOrigin = (value: any) => {
        const origin: IOrigin = value;
        setProductRequest(prevState => ({...prevState, originId: origin.id}))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await imageApi.uploadImage(newPictures);
            let newImages = response.data;
            let product: IProductRequest = {
                ...productRequest,
                newImages: newImages,
                removeImages: removedPictures,
            }
            await productApi.updateProduct(product, parseInt(id as string))
            setNotiContent(POPUP_CREATE_PRODUCT.Success);
            console.log(product);
        }
        catch (error) {
            setNotiContent(POPUP_CREATE_PRODUCT.Failed);
        }
        finally {
            setLoading(false);
            setOpen(true);
        }
    };

    function getCategoryTwo() {
        if (choice && productRequest) {
            const cateTwo = choice.subCategories.find(
                (value) => value.id === productRequest.categoryId
            )?.id;
            if (cateTwo !== undefined) {
                return cateTwo;
            }
            else {
                return choice.subCategories[0].id
            }
        }
        return null;
    }

    return (
        <div
            className="w-full relative flex bg-gray-100 ml-56 h-full"
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!productRequest}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl">
                <div className="text-xl font-semibold p-4 ml-5">Cập nhật sản phẩm</div>
                <CustomAlertDialog title={POPUP_CREATE_PRODUCT.Title}
                                   content={notiContent}
                                   btName={POPUP_CREATE_PRODUCT.Ok}
                                   open={open}
                                   handleClickClose={handleClose}/>
                {productRequest && choice && <form onSubmit={handleSubmit}>
                    <div className="flex align-center gap-5 justify-start p-4 mt-5 ml-5">
                        {Array.from(newPictures).map((picture, index) => {
                            return (
                                <div key={index} className="w-32 h-32 relative">
                                    <img
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
                                    <img
                                        alt="product"
                                        src={picture.url}
                                        className="w-32 h-32"
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
                    <div className="w-8/12 p-4 mt-5 ml-5">
                        <TextField
                            // required
                            id="name"
                            value={productRequest?.name}
                            label="Tên sản phẩm"
                            className="w-full mb-5"
                            size="small"
                            InputLabelProps={{shrink: (productRequest?.name !== undefined ? productRequest.name.length > 0 : false)}}
                            onChange={e => setProductRequest(prevState => ({
                                ...prevState,
                                name: e.target.value as string
                            }))}
                        />
                        <TextField
                            // required
                            id="name"
                            label="Giá gốc"
                            className="w-full mb-5"
                            value={productRequest?.originalPrice}
                            inputMode="numeric"
                            size="small"
                            autoComplete="off"
                            InputLabelProps={{shrink: (productRequest?.originalPrice !== undefined ? productRequest.originalPrice >= 0 : false)}}
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
                                let price = e.target.value.length > 0 ? parseInt(e.target.value) : 0;
                                setProductRequest(prevState => ({...prevState, originalPrice: price}))
                            }}
                            type="text"
                            InputProps={{inputProps: {min: 0, step: 500}}}
                        />
                        <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" required>
                                    Ngành hàng
                                </InputLabel>
                                <Select
                                    // required
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
                                    value={getCategoryTwo()}
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
                            value={productRequest?.description}
                            // value={props.categories.find(cate => cate.subCategories.find((subCate) => subCate.id === productRequest?.categoryId))?.name}
                            InputLabelProps={{shrink: (productRequest?.description !== undefined ? productRequest.description.length > 0 : false)}}
                            onChange={e => setProductRequest(prevState => ({
                                ...prevState,
                                description: e.target.value
                            }))}
                        />
                        <Autocomplete
                            disableClearable
                            autoComplete
                            autoHighlight
                            value={props.brands.find(brand => brand.id === productRequest?.brandId)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Thương hiệu"}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                            onChange={(e, value) => handleBrand(value)}
                            options={props.brands}
                            getOptionLabel={(option: any) =>
                                isString(option[BRAND_VALUE.Name]) ? option[BRAND_VALUE.Name] : ""
                            }
                        />
                        <div className="mb-5"/>
                        <Autocomplete
                            disableClearable
                            autoComplete
                            autoHighlight
                            defaultValue={props.origins.find(origin => origin.id === productRequest?.originId)}
                            value={props.origins.find(origin => origin.id === productRequest?.originId)}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        label={"Xuất xứ"}
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
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
                            <label htmlFor="submit-button">
                                <Input id="submit-button" type="submit"/>
                                <Button variant="outlined"
                                        className="text-white w-32 h-16 bg-red-600 hover:bg-red-500"
                                        component="span"
                                        disabled={loading}>
                                    {
                                        loading
                                            ? <CircularProgress className="text-white"/>
                                            : <span className="text-xl">Thay đổi</span>
                                    }
                                </Button>
                            </label>
                        </div>
                    </div>
                </form>}
            </div>
        </div>
    );
};
export default UpdateProduct;
