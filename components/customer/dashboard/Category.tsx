import classNames from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import ICategory from "../../../shared/models/ICategory";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

interface CategoryProps {
  categories: ICategory[];
}

const Category: React.FC<CategoryProps> = (props) => {
  const [activePage, setActivePage] = useState<number>(0);

  const cate: any[] = [...props.categories];

  while (cate.length % 4 !== 0) {
    cate.push({});
  }

  const handleRightClick = () => {
    setActivePage(activePage + 1);
  };
  const handleLeftClick = () => {
    setActivePage(activePage - 1);
  };

  return (
    <div className="w-full flex h-fit px-5">
      <div className="w-1/3 mr-5 mt-3">
        <Image
          src={"https://i.imgur.com/nOb8AVy.png"}
          width={400}
          height={400}
        />
      </div>
      <div className="w-2/3">
        <div className="text-2xl font-medium py-3">Danh mục</div>
        <div className="flex relative" style={{ height: "350px" }}>
          <div
            className={classNames("absolute -left-4 z-50 cursor-pointer", {
              hidden: activePage === 0,
            })}
            style={{ top: "9.5rem" }}
            onClick={handleLeftClick}
          >
            <ArrowLeftRoundedIcon
              fontSize="small"
              className="border-2 border-gray-300 text-gray-300 rounded-full hover:border-gray-700 hover:text-gray-700"
            />
          </div>
          <div
            className={classNames("absolute -right-4 z-50 cursor-pointer", {
              hidden: activePage === Math.round(cate.length / 8) - 1,
            })}
            style={{ top: "9.5rem" }}
            onClick={handleRightClick}
          >
            <ArrowRightRoundedIcon
              fontSize="small"
              className="border-2 border-gray-300 text-gray-300 rounded-full hover:border-gray-700 hover:text-gray-700"
            />
          </div>
          <ul className="flex flex-wrap justify-between overflow-hidden">
            {cate.map((item, key) => {
              return (
                <li
                  className={classNames(
                    "w-40 h-155 py-4 px-3 relative mb-5 rounded-lg group",
                    {
                      "bg-white": Object.keys(item).length === 0,
                      "bg-gray-200 cursor-pointer":
                        Object.keys(item).length !== 0,
                      hidden:
                        key < activePage * 8 && key >= (activePage - 1) * 8,
                    }
                  )}
                  style={{ flexBasis: "23.5%" }}
                  key={key}
                >
                  <div
                    className={classNames(
                      "absolute right-3 bottom-1 group-hover:scale-110 ease-in-out duration-300",
                      {
                        // hidden: Object.keys(item).length === 0,
                      }
                    )}
                    style={{ maxWidth: "90px" }}
                  >
                    {item.imageUrl && (
                      <Image src={item.imageUrl} width={300} height={300} />
                    )}
                  </div>
                  <p className="font-medium text-base relative whitespace-nowrap group-hover:text-red-500">
                    {item.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
