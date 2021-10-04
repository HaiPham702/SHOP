import ProductItem from "../components/ProductItem/ProductItem";


export default function showProducts(products, col,numberProducts) {
    var tag = [];
    var result = null;
  
        for (var i = 0; i < numberProducts; i++) {
            tag.push(products[i])
        };
        result = tag.map((product, index) => {
            return <ProductItem
                key={index}
                product={product}
                col={col}
            />
        })

    return result;

}