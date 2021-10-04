 // format price VND
 export default function formatPrice(price){
    price = Number(price)
    return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}
