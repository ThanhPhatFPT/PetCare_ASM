import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0); // Thêm state để lưu số lượng sản phẩm trong giỏ hàng

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    setSearchQuery("");
  };

  // Lấy số lượng sản phẩm trong giỏ hàng từ localStorage
  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCount = currentCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, []);

  return (
    <header className="bg-[#00B7C0] relative">
      <div className="flex items-center justify-between mx-32 py-2">
        <div>
          <ul className="flex items-center justify-between flex-row gap-4 font-medium">
            {/* Social Media Icons */}
            <li className="hover:text-white transition ease-out duration-200">
              <a href="">
                <FacebookOutlinedIcon sx={{ fontSize: 25 }} />
              </a>
            </li>
            <li className="hover:text-white transition ease-out duration-200">
              <a href="">
                <img src="/src/assets/instagram.png" className="h-6" alt="" />
              </a>
            </li>
            <li className="hover:text-white transition ease-out duration-200">
              <a href="">
                <img src="/src/assets/tiktok.png" className="h-7" alt="" />
              </a>
            </li>
            <li>
              <Link to="/login" className="mx-2 hover:text-white transition ease-out duration-200">
                Trang Chủ
              </Link>
            </li>
            <li>
              <a href="" className="mx-2 hover:text-white transition ease-out duration-200">
                Của Hàng
              </a>
            </li>
            <li>
              <a href="" className="mx-2 hover:text-white transition ease-out duration-200">
                Về Chúng Tôi
              </a>
            </li>
          </ul>
        </div>
        <div className="max-w-[150px]">
          <a href="">
            <img src="/src/assets/logo.png" alt="" />
          </a>
        </div>
        <div>
          <ul className="flex items-center justify-between flex-row gap-4 font-medium">
            {/* Other Links */}
            <li>
              <a href="" className="mx-2 hover:text-white transition ease-out duration-200">
                Liên Hệ
              </a>
            </li>
            <li>
              <a href="" className="mx-2 hover:text-white transition ease-out duration-200">
                Dịch Vụ
              </a>
            </li>
            <li>
              <button
                onClick={handleSearchToggle}
                className="mx-2 hover:text-white transition ease-out duration-200 flex items-center">
                {isSearchActive ? (
                  <CloseIcon sx={{ fontSize: 25 }} />
                ) : (
                  <SearchIcon sx={{ fontSize: 25 }} />
                )}
              </button>
            </li>
            <li className="hover:text-white transition ease-out duration-200">
              <a href="">
                <PersonIcon sx={{ fontSize: 25 }} />
              </a>
            </li>
            <li className="hover:text-white transition ease-out duration-200">
              <a href="">
                <FavoriteBorderIcon sx={{ fontSize: 25 }} />
              </a>
            </li>
            <li className="hover:text-white transition ease-out duration-200 relative">
              <Link to="/cart">
                <ShoppingCartOutlinedIcon sx={{ fontSize: 25 }} />
                {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isSearchActive && (
        <div className="absolute right-0 z-10 transform -translate-x-1/2 top-[60px] flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border border-black-300 bg-white rounded-l-md py-2 px-4 h-10"
          />
          <button className="border border-black-300 bg-[#f3d143] text-white font-medium rounded-r-md px-4 h-10 flex items-center justify-center hover:bg-gray-200 transition">
            <SearchOutlinedIcon />
          </button>
        </div>
      )}
    </header>
  );
}
