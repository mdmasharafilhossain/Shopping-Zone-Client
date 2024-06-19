import { Link } from "react-router-dom";


const AllCategoriesCard = ({categorie}) => {
    const {image,category,title,} = categorie || {}

    return (
        <div>
            <Link to={`/${category}`}>
            <div className="border-[1px]  hover:border-[1px] hover:shadow-xl hover:border-gray-200 card card-compact  ">
                <figure><img src={image} alt="" /></figure>
                <div className="card-body">
                    <h2 className="text-lg font-medium">{title}</h2>
                </div>
            </div>
        </Link>
        </div>
    );
};

export default AllCategoriesCard;