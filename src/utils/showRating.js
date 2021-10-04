export default function  showRatings (rating){
    var result = [];
    //convert to number
    rating = Number(rating);
    if (rating) {
        // rating int
        if (rating === parseInt(rating)) {
            for (var i = 0; i < rating; i++) {
                result.push(<i className="fas fa-star" key={i}></i>)
            }
            for (i = 0; i < 5 - rating; i++) {
                result.push(<i className="far fa-star" key={i + 5}></i>)
            }
            // rating float
        } else {
            for (i = 1; i < rating; i++) {
                result.push(<i className="fas fa-star" key={i}></i>)
            }
            result.push(<i className="fas fa-star-half-alt" key={10}></i>)
            for (i = 0; i < 4 - rating; i++) {
                result.push(<i className="far fa-star" key={i + 5}></i>)
            }
        }
    }
    return result;
}