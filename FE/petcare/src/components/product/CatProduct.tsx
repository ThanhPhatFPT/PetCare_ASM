import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ProductService from "../../service/ProductService"; // Adjust the import path as necessary
import { Link } from "react-router-dom";

export default function CatProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        // Adjust the mapping based on the data structure returned by your API
        const formattedProducts = response.data.map((product) => ({
          id: product.productId,
          name: product.productName,
          price: `${product.productQuantity}đ`, // Assuming you want to show the quantity as price
          image: product.image,
          rating: product.rating || 0, // Set a default rating if not available
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = React.useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const prev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <span className="block mx-32 text-3xl py-4 font-semibold">
        Sản phẩm cho mèo
      </span>
      <div className="mx-32 mb-10 gap-5 relative">
        <Slider ref={sliderRef} {...settings}>
          {products.map((product) => (
            <Link to={`/productdetail/${product.id}`} key={product.id}>
              <ProductItem
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
              />
            </Link>
          ))}
        </Slider>
        <button
          onClick={prev}
          className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 hover:text-[#00b7c0]">
          <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "30px" }} />
        </button>
        <button
          onClick={next}
          className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 hover:text-[#00b7c0]">
          <ArrowForwardIosOutlinedIcon sx={{ fontSize: "30px" }} />
        </button>
      </div>
    </>
  );
}
