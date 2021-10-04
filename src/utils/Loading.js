import LoadingProduct from "../components/ProductItem/LoadingProduct";

export default function Loading(col){
    var result = null;
    result = <LoadingProduct
        col={col}
    />
    return result;
}
