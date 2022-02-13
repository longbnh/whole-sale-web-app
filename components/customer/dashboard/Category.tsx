import classNames from "classnames";
import Image from "next/image";
import React from "react";
import ICategory from "../../../shared/models/ICategory";

interface CategoryProps {
  categories: ICategory[];
}

const Category: React.FC<CategoryProps> = (props) => {
  const cate: any[] = [...props.categories];

  while (cate.length % 4 !== 0) {
    cate.push({});
  }

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
          <ul className="flex flex-wrap justify-between overflow-hidden">
            {cate.map((item, key) => {
              return (
                <li
                  className={classNames(
                    "w-40 py-4 px-3 relative mb-5 rounded-lg group",
                    {
                      "bg-white": Object.keys(item).length === 0,
                      "bg-gray-200 cursor-pointer":
                        Object.keys(item).length !== 0,
                    }
                  )}
                  style={{ flexBasis: "23.5%" }}
                  key={key}
                >
                  <div
                    className={classNames(
                      "absolute right-3 bottom-1 group-hover:scale-110 ease-in-out duration-300",
                      {
                        hidden: Object.keys(item).length === 0,
                      }
                    )}
                    style={{ maxWidth: "90px" }}
                  >
                    <Image
                      src={"https://i.imgur.com/nOb8AVy.png"}
                      width={300}
                      height={300}
                    />
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
