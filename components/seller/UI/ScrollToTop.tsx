import {ArrowCircleUpIcon} from "@heroicons/react/solid";
import {IconButton} from "@mui/material";
import React, {ReactElement, useEffect, useState} from "react";

interface LayoutScrollableProps {
    children: ReactElement;
}

const ScrollToTop: React.FC<LayoutScrollableProps> = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="flex flex-col">
            {children}
            {isVisible && <IconButton
                onClick={scrollToTop}
                className="absolute bottom-0 right-1/2 text-red-500">
                <ArrowCircleUpIcon className="w-10 h-10"/>
            </IconButton>}
        </div>
    )
}
export const getScrollableLayout = (content: ReactElement) => (
    <ScrollToTop>{content}</ScrollToTop>
);

export default ScrollToTop;