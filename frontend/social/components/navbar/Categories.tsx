"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import CategoryBox from "./CategoryBox";
import { categories } from "@/utils/categories";
import { Category } from "@/types/searchCategory";

const Categories = () => {
    const [isActive, setIsActive] = useState(false);
    const params = useSearchParams();

    const category = params?.get("category");

    return (
        <div
            className={`${
                isActive ? "shadow-md shadow-[rgba(0,0,0,.045)]" : ""
            } transition-all duration-150 flex justify-center p-2`}
        >
            <Swiper
                slidesPerView="auto"
                pagination={{ clickable: true }}
                className="main-container lg:!px-3 !px-2 flex justify-center"
            >
                {categories.map((item: Category) => (
                    <SwiperSlide className="max-w-fit" key={item.label}>
                        <CategoryBox
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Categories;
