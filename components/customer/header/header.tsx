import { Popover } from "@headlessui/react";
import { OutlinedInput, Paper } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import cartApi from "../../../api/cartApi";
import useSWR from "swr";

import React, { useEffect, useState } from "react";
import CustomButtons from "../../commons/CustomButton";

import stickHeader from "../../../public/json/stickHeader.json";
import Link from "next/link";
import { useSelector } from "react-redux";
import { APP_PATH } from "../../../shared/enum/enum";

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

  const { data, mutate } = useSWR({ page: 1, pageSize: 10 }, cartApi.getCart, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  //@ts-ignore
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    mutate();
  }, [cart]);

  const { classes } = props;

  const router = useRouter();

  return (
    <Popover
      className={classNames("w-full bg-white h-20 z-30 sticky px-5", {
        // "bg-red-600": welcome,
        // relative: router.pathname === "/seller/registerInfo",
        "top-0": stickHeader.some(
          (item: string) => `/${item}` === router.pathname
        ),
      })}
    >
      <div className=" mx-auto w-full py-3 px-5 h-full sm:px-6">
        <div className="flex border-gray-100 h-full ">
          <div
            className={classNames("w-1/6 flex justify-end items-center pr-16")}
          >
            <Link href={"/"}>
              <Image
                src={"/LogoRed.svg"}
                className="cursor-pointer"
                width={50}
                height={50 / logoRatio}
                layout="fixed"
                onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                  setLogoRatio(naturalWidth / naturalHeight)
                }
              />
            </Link>
          </div>
          <div className="w-full xl:w-2/4 lg:w-1/3 flex justify-start items-center">
            <div className="h-4/5 w-5/6 mx-auto flex items-center">
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
            <div className="flex items-center justify-start w-full my-auto text-lg">
              {data?.totalElements !== 0 ? (
                <Link href={"/cart"}>
                  <div
                    className={classNames(
                      "w-1/4 md:flex relative items-center gap-1 mt-3 px-3 cursor-pointer hover:opacity-75"
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
                    <div className="absolute top-0 left-7 rounded-full text-middle text-center bg-red-500 text-white w-3 h-3">
                      {data?.totalElements}
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className={classNames(
                    "w-1/4 md:flex relative items-center gap-1 mt-3 px-3"
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
                  <div className="absolute top-0 left-7 rounded-full text-middle text-center bg-red-500 text-white w-3 h-3">
                    {data?.totalElements}
                  </div>
                </div>
              )}
              <div
                className={classNames(
                  "w-1/4 md:flex items-center gap-1 mt-3 px-3 relative group"
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
                <span className="whitespace-nowrap font-normal account ">
                  User123
                </span>
                <div className="hidden absolute w-full top-0 pt-8 h-fit group-hover:block">
                  <div className="bg-white border-2 rounded-md flex flex-col text-base">
                    <div className="py-1.5 pl-2 hover:bg-slate-100 cursor-pointer border-b-2 border-slate-200">
                      Tài khoản
                    </div>
                    <Link href={APP_PATH.CUSTOMER.PURCHASE}>
                      <div className="py-1.5 pl-2 hover:bg-slate-100 cursor-pointer border-b-2 border-slate-200">
                        Đơn mua
                      </div>
                    </Link>
                    <div className="py-1.5 pl-2 hover:bg-slate-100 cursor-pointer">
                      Đăng xuất
                    </div>
                  </div>
                </div>
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
