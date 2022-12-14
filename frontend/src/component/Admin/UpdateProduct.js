import React, {Fragment, useEffect, useState} from 'react';
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails} from "../../Actions/productAction";
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-ui/core";
import {UPDATE_PRODUCT_RESET} from "../../Constants/productConstant";
import {useParams} from "react-router-dom";
import {getCategories} from "../../Actions/categoryAction"



const UpdateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const { error, product } = useSelector((state) => state.productDetails);

    const { loading, error: updateError, isUpdated} = useSelector((state) => state.delete_update);

    const { categories } = useSelector(state => state.categories);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  

    const productId = id;

   const updateProductSubmitHandle = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      window.alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      window.alert("C???p nh???t s???n ph???m th??nh c??ng!");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    
    dispatch(getCategories())
  }, [dispatch,error,navigate,isUpdated,productId,product,updateError]);


  return (
    <Fragment>
      <Title title="C???p nh???t s???n ph???m" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form className="createProductForm" encType="multipart/form-data" onSubmit={updateProductSubmitHandle}>
            <h1>Ch???nh s???a s???n ph???m</h1>
            <div>
              <input type="text" placeholder="T??n s???n ph???m" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <input type="number" placeholder="Gi??" required onChange={(e) => setPrice(e.target.value)} value={price} />
            </div>
            <div>
              <textarea placeholder="M?? t??? s???n ph???m" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="1"></textarea>
            </div>

            <div>
              <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option>Ch???n danh m???c s???n ph???m</option>
                {categories && categories.map(c => (
									<option key={c.category} >
										{c.category}
									</option>))}
              </select>
            </div>

            <div>
              <input type="number" placeholder="S??? l?????ng" required onChange={(e) => setStock(e.target.value)} value={stock}/>
            </div>

            <div id="createProductFormFile">
              <input type="file" name="avatar" accept="image/*" onChange={updateProductImagesChange} multiple />
            </div>

            <div id="createProductFormImage">
              {oldImages && oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={`/uploads/${images}`} alt="Product Preview" />
              ))}
            </div>
            <Button id="createProductBtn" type="submit" disabled={loading ? true : false}> C???p nh???t</Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct
