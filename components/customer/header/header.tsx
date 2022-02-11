import { Popover } from "@headlessui/react";
import { OutlinedInput, Paper } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useState } from "react";
import CustomButtons from "../../commons/CustomButton";

const styles = () => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#d32f2f",
    },
    "&:hover $notchedOutline": {
      borderWidth: "#d32f2f",
    },
    "&$focused $notchedOutline": {
      borderColor: "#d32f2f",
    },
  },
  focused: {},
  notchedOutline: {},
});

interface HeaderProps {
  // welcome: boolean;
}

const Header = (props: HeaderProps & WithStyles<typeof styles>) => {
  const [userIconRatio, setUserIconRatio] = useState(16 / 9);
  const [cartIcon, setCartIcon] = useState(16 / 9);
  const [logoRatio, setLogoRatio] = useState(16 / 9);
  const [logoutRatio, setLogoutRatio] = useState(16 / 9);

  const { classes } = props;

  const router = useRouter();
  return (
    <Popover
      className={classNames("w-full h-20 z-30 fixed px-5", {
        // "bg-red-600": welcome,
        // relative: router.pathname === "/seller/registerInfo",
      })}
    >
      <div className=" mx-auto w-full py-3 px-5 h-full sm:px-6">
        <div className="flex border-gray-100 h-full ">
          <div className={classNames("w-1/6 flex justify-start items-center ")}>
            <Image
              src={"/LogoRed.svg"}
              width={50}
              height={50 / logoRatio}
              layout="fixed"
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setLogoRatio(naturalWidth / naturalHeight)
              }
            />
          </div>
          <div className="w-full xl:w-2/4 lg:w-1/3 flex justify-start items-center">
            <div className="h-4/5 w-full flex items-center">
              <Paper
                component="form"
                sx={{
                  boxShadow: "none",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <OutlinedInput
                  sx={{
                    ml: 1,
                    flex: 1,
                    borderColor: "red",
                    height: "82%",
                    borderRadius: 0,
                  }}
                  classes={classes}
                  placeholder="Tìm kiếm sản phẩm"
                  inputProps={{ "aria-label": "Tìm kiếm sản phẩm" }}
                />
                <CustomButtons
                  content="Tìm kiếm "
                  borderRadius={0}
                  boxShadow={false}
                />
              </Paper>
            </div>
          </div>

          <div className="md:flex w-1/6 items-center justify-end md:flex-1 xl:w-1/4 lg:w-1/3">
            <div className="flex items-center justify-end w-full my-auto text-lg">
              <div
                className={classNames(
                  "w-1/4 md:flex items-center gap-1 mt-3 px-3 "
                )}
              >
                <Image
                  width={30}
                  height={30 / cartIcon}
                  src="/Shopping Cart.svg"
                  layout="fixed"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setCartIcon(naturalWidth / naturalHeight)
                  }
                />
                <span className="whitespace-nowrap font-normal my-auto">
                  Giỏ hàng
                </span>
              </div>
              <div
                className={classNames(
                  "w-1/4 md:flex items-center gap-1 mt-3 px-3"
                )}
              >
                <Image
                  width={27}
                  height={27 / userIconRatio}
                  src="/User.svg"
                  layout="fixed"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setUserIconRatio(naturalWidth / naturalHeight)
                  }
                />
                <span className="whitespace-nowrap font-normal account">
                  User123
                </span>
              </div>
              <div
                className={classNames(
                  "w-1/4 md:flex items-center gap-1 mt-3 px-3"
                )}
              >
                <Image
                  width={30}
                  height={30 / logoutRatio}
                  src="/Logout.svg"
                  layout="fixed"
                  onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setLogoutRatio(naturalWidth / naturalHeight)
                  }
                />
                <span className="whitespace-nowrap font-normal account">
                  Đăng xuất
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default withStyles(styles)(Header);
