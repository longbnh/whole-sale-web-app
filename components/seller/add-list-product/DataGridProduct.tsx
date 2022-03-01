import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IExcelData from "../../../shared/models/IExcelData";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ICategory from "../../../shared/models/ICategory";
import IBrand from "../../../shared/models/IBrand";
import IOrigin from "../../../shared/models/IOrigin";
import CustomAutoComplete from "../../commons/CustomAutoComplete";
import { BRAND_VALUE } from "../../../shared/enum/enum";
import ISubmitProduct from "../../../shared/models/ISubmitProduct";

interface DataGridProduct {
  data: IExcelData[];
  formData: ISubmitProduct[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<ISubmitProduct[]>>;
  categories: ICategory[];
  brands: IBrand[];
  origins: IOrigin[];
}

const EnhancedTableToolbar = (props: {
  handleDelete: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Danh sách của bạn
      </Typography>
      <Tooltip title="Delete" onClick={props.handleDelete}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const DataGridProduct: React.FC<DataGridProduct> = (props) => {
  const [dataGrid, setDataGrid] = useState<IExcelData[]>([]);
  const [indexRow, setIndexRow] = useState<any[]>([]);

  const handleDelete = () => {
    console.log(indexRow);
  };

  useEffect(() => {
    if (props.data.length > 0) {
      setDataGrid(props.data);
      props.setLoading(false);
    }
  }, [props.data]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 180,
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: "category",
      headerName: "Ngành hàng",
      width: 190,
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: "subcategory",
      headerName: "Danh mục",
      width: 150,
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: "origin",
      headerName: "Xuất xứ",
      width: 120,
      editable: true,
      hideSortIcons: true,
      disableColumnMenu: true,
    },
    {
      field: "brand",
      headerName: "Thương hiệu",
      width: 140,
      editable: true,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (param) => {
        return param.value;
        // <CustomAutoComplete
        //   options={props.brands}
        //   title={""}
        //   displayValue={BRAND_VALUE.Name}
        //   onChange={() => {}}
        // />
      },
    },
    {
      field: "price",
      headerName: "Giá x1000đ",
      description: "x1000 đ",
      width: 140,
      type: "number",
      editable: true,
      disableColumnMenu: true,
      hideSortIcons: true,
      renderCell: (params) => {
        return (params.value / 1000).toLocaleString("en-us");
      },
    },
    {
      field: "des",
      headerName: "Mô tả",
      width: 400,
      editable: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            {params.value}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: "calc(100% - 130px )", width: "100%" }}>
      <DataGrid
        rows={dataGrid}
        columns={columns}
        loading={props.loading}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(selectionModel) => {
          setIndexRow([...selectionModel]);
        }}
        onCellEditCommit={(param) => {
          let changeData: ISubmitProduct | undefined = props.formData.find(
            (submitProduct) => {
              return submitProduct.id === param.id;
            }
          );
          //@ts-ignore
          changeData[param.field] = param.value;

          let temp: ISubmitProduct[] = [...props.formData];
          temp = temp.filter((item) => {
            return item.id !== param.id;
          });

          props.setFormData([...temp, changeData as ISubmitProduct]);
        }}
        components={{
          Toolbar: EnhancedTableToolbar,
        }}
        componentsProps={{
          toolbar: { handleDelete: handleDelete },
        }}
      />
    </div>
  );
};

export default DataGridProduct;
