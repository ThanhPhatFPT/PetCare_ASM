import React, { useState, useEffect } from "react";
import ProductDetailService from "../../service/ProductDetailService";
import ProductService from "../../service/ProductService";

const ProductDetailManager = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ productId: "", quantity: 0, price: 0 });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Trạng thái cho thông báo lỗi

  useEffect(() => {
    loadProductDetails();
    loadProducts();
  }, []);

  const loadProductDetails = async () => {
    setLoading(true);
    try {
      const response = await ProductDetailService.getAllProductDetails();
      setProductDetails(response);
    } catch (error) {
      console.error("Error loading product details", error);
      setErrorMessage("Không thể tải thông tin chi tiết sản phẩm."); // Cập nhật thông báo lỗi
    }
    setLoading(false);
  };

  const loadProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products", error);
      setErrorMessage("Không thể tải danh sách sản phẩm."); // Cập nhật thông báo lỗi
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset thông báo lỗi
    try {
      if (editMode) {
        await ProductDetailService.updateProductDetail(editId, {
          products: { productId: formData.productId },
          quantity: formData.quantity,
          price: formData.price,
        });
        setEditMode(false);
      } else {
        await ProductDetailService.saveProductDetail({
          products: { productId: formData.productId },
          quantity: formData.quantity,
          price: formData.price,
        });
      }
      setFormData({ productId: "", quantity: 0, price: 0 });
      loadProductDetails();
    } catch (error) {
      console.error("Error saving product detail", error);
      setErrorMessage("Có lỗi khi lưu thông tin chi tiết sản phẩm."); // Cập nhật thông báo lỗi
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thông tin chi tiết sản phẩm này không?")) {
      try {
        await ProductDetailService.deleteProductDetail(id);
        loadProductDetails();
      } catch (error) {
        console.error("Error deleting product detail", error);
        setErrorMessage("Có lỗi khi xóa thông tin chi tiết sản phẩm."); // Cập nhật thông báo lỗi
      }
    }
  };

  const handleEdit = (detail) => {
    setFormData({
      productId: detail.products.productId,
      quantity: detail.quantity,
      price: detail.price,
    });
    setEditId(detail.productDetailId);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setFormData({ productId: "", quantity: 0, price: 0 });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Detail Manager</h1>
      
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border rounded"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div className="space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (editMode ? "Updating..." : "Saving...") : editMode ? "Update Product Detail" : "Save Product Detail"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productDetails.map((detail) => {
            const product = products.find(p => p.productId === detail.products.productId); // Tìm sản phẩm tương ứng
            return (
              <tr key={detail.productDetailId}>
                <td className="py-2 px-4 border-b">{product ? product.productName : "Unknown Product"}</td>
                <td className="py-2 px-4 border-b">{detail.quantity}</td>
                <td className="py-2 px-4 border-b">{detail.price}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(detail)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(detail.productDetailId)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailManager;
