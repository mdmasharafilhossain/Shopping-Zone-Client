import { Link } from "react-router-dom";


const AllCategoriesCard = ({categorie}) => {
    const {image,category,title,} = categorie || {}

    return (
        <div className="mt-10 mb-20 mr-5">
            <Link to={`/${category}`}>
            <div className="border-[1px]  hover:border-[1px] hover:shadow-xl hover:border-gray-200 card card-compact h-60  ">
                <figure><img className="w-60 h-40" src={image} alt="" /></figure>
                <div className="card-body">
                    <h2 className="text-lg font-medium text-center">{title}</h2>
                </div>
            </div>
        </Link>
        </div>
    );
};

export default AllCategoriesCard;