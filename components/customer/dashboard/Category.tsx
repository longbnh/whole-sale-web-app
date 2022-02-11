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
      <div className="w-1/3 mr-5">
        <Image
          src={"https://i.imgur.com/nOb8AVy.png"}
          width={400}
          height={400}
        />
      </div>
      <div className="w-2/3">
        <div className="text-xl font-medium py-3">Danh mục</div>
        <div className="flex relative" style={{ height: "350px" }}>
          <ul className="flex flex-wrap justify-between overflow-hidden">
            {cate.map((item, key) => {
              return (
                <li
                  className={classNames(
                    "w-40 py-4 px-3 relative mb-5 rounded-lg",
                    {
                      "bg-white": Object.keys(item).length === 0,
                      "bg-gray-200 cursor-pointer":
                        Object.keys(item).length !== 0,
                    }
                  )}
                  style={{ flexBasis: "23.5%" }}
                  key={key}
                >
                  {item.name}
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
