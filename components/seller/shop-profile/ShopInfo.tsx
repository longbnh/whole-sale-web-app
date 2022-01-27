import React, { useState } from "react";
import AvatarPicker from "../../utils/AvatarPicker";
import {
  Button,
  Checkbox,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  List,
  Paper,
  Modal,
  Divider,
} from "@mui/material";
import CustomButtons from "../../utils/CustomButton";

const ShopInfo = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string[]>([]);
  return (
    <div
      className="w-full relative flex bg-gray-100 ml-56"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <div className="bg-white mt-5 mx-auto w-4/5 h-5/6 overflow-y-auto overflow-x-hidden">
        <div className="text-xl font-semibold p-4 ml-5">Thông tin cửa hàng</div>
        <div className="w-5/6 pt-10 mx-auto flex">
          <div className="w-1/3">
            {/* avata */}
            <AvatarPicker width={100} height={100} />
            {/* <div className="pt-4">asd</div> */}
          </div>
          <div className="w-2/3">
            <TextField
              required
              id="name"
              label="Tên cửa hàng"
              className="w-full pb-9"
              size="small"
            />
            <TextField
              required
              id="address"
              label="Cài đặt địa chỉ"
              className="w-full pb-9"
              size="small"
            />
            <TextField
              id="description"
              label="Giới thiệu cửa hàng"
              className="w-full pb-9"
              multiline
              rows={4}
              size="small"
            />
            <TextField
              id="category"
              label="Ngành hàng"
              className="w-full pb-9"
              size="small"
              disabled
              required
              onClick={() => setOpen(!open)}
              value={category.toString()}
            />
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <TransferList setCategory={setCategory} handleClose={setOpen} />
            </Modal>
            <div className="flex justify-end">
              <CustomButtons content="Lưu" size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function not(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

interface TransferList {
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransferList: React.FC<TransferList> = (props) => {
  const [checked, setChecked] = React.useState<readonly string[]>([]);
  const [left, setLeft] = React.useState<readonly string[]>([
    "Điện tử",
    "Trang điểm",
    "Dưỡng tóc",
    "Đồ gia dụng",
    "Thời trang",
  ]);
  const [right, setRight] = React.useState<readonly string[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (items: readonly string[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <div className="p-3">Các ngành hàng</div>
      <Divider />
      <List dense component="div" role="list">
        {items.map((value: string) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const handleSubmit = () => {
    props.setCategory([...right]);
    props.handleClose(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-white shadow-sm w-1/2 h-3/5"
      >
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
      <Button
        sx={{ my: 0.5 }}
        variant="outlined"
        className="absolute bottom-1/4 right-1/3 -translate-x-1/2 -translate-y-1/2"
        size="small"
        onClick={handleSubmit}
        color={"success"}
        aria-label="move selected left"
      >
        Chọn
      </Button>
    </>
  );
};

export default ShopInfo;
