import AllCategories from "../AllCategories/AllCategories";
import Banner from "./Banner/Banner";
import FlashSale from "./FlashSale/FlashSale";
import Header from "./Header/Header";

const Home = () => {
  return (
    <div>
      <Header></Header>
     <div className="mt-16">
     <Banner></Banner>
     </div>
      <FlashSale></FlashSale>
      <AllCategories></AllCategories>
    </div>
  );
};

export default Home;
