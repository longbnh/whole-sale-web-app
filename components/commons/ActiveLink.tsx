import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface ActiveLinkProps {
  href?: string;
  content: string;
  activeKey?: string;
}

//active key để so sánh xem href có giống active key để hover chữ

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href = "a",
  content,
  activeKey = "",
}) => {
  return (
    <Link href={`/seller/${href}`} replace={true}>
      <div
        // onClick={() => router.replace(`${href}`)}
        className={classNames(
          "flex bg-white hover:text-red-400 text-base cursor-pointer my-1",
          {
            "text-gray-600": !activeKey.endsWith(href),
            "text-red-600": activeKey.endsWith(href),
          }
        )}
      >
        {content}
      </div>
    </Link>
  );
};

export default ActiveLink;
