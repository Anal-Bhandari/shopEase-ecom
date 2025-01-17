import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

//To get the cart data from localStorage
//To update the cart value and also to get the data always ready from localStorage

getCartProductFromLS();

//To add the data into localStorage

export const addToCart = (event, id, stock)=>{
    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    let quantity = currentProdElem.querySelector(".productQuantity").innerText;
    let price = currentProdElem.querySelector(".productPrice").innerText;

    // console.log(quantity,price);

    price = price.replace("₹", "");

    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);

    if(existingProd && quantity>1){
        quantity = Number(existingProd.quantity) + Number(quantity);
        price = Number(price*quantity);
        let updatedCart = { id, quantity, price};

        updatedCart = arrLocalStorageProduct.map((curProd) => {
            return curProd.id === id ? updatedCart : curProd;
        });
        console.log(updatedCart);

        localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

        //Show toast when product added to the cart
        showToast("add", id);
    }

    if(existingProd){
        return false;
    }

    price =Number(price * quantity);
    quantity = Number(quantity);

    arrLocalStorageProduct.push({ id, quantity, price});
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    //Upadate the cart button value
    updateCartValue(arrLocalStorageProduct);

    //Show toast when product added to the cart
    showToast("add", id);
};