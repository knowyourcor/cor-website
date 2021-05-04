import Accordion from "./Accordion";
import BodyText from "./BodyText";
import Carousel from "./Carousel";
import Text from "./Text";
import Image from "./Image";
import TextImage from "./TextImage";
import CarouselHero from "./CarouselHero";
import FullWidthImage from "./FullWidthImage";
import Profiles from "./Profiles";
import Quote from "./Quote";
import Shop from "./Shop";
import ShopAccordion from "./ShopAccordion";
import ShopTextImage from "./ShopTextImage";
import Tabs from "./Tabs";
import TextAccordion from "./TextAccordion";
import TextDescriptionImage from "./TextDescriptionImage"
import DualGrid from "./DualGrid"
import TextCarousel from "./TextCarousel"
import Checklist from "./Checklist"
import QuadCarousel from "./QuadCarousel"
import ShopTextBackgroundImage from "./ShopTextBackgroundImage"
import ShopChecklist from "./ShopChecklist"
import ShopDataProgress from "./ShopDataProgress"
import Product from "./Product"
import TextDownloader from "./TextDownloader"

const moduleDefs = {
  ["accordion"]: Accordion,
  ["body_text"]: BodyText,
  ["body_image"]: Image,
  ["carousel"]: Carousel,
  ["hero_carousel"]: CarouselHero,
  ["full_width_image"]: FullWidthImage,
  ["profiles"]: Profiles,
  ["quote"]: Quote,
  ["shop"]: Shop,
  ["shop_accordion"]: ShopAccordion,
  ["shop_text_image"]: ShopTextImage,
  ["tabs"]: Tabs,
  ["text"]: Text,
  ["text_image"]: TextImage,
  ["text_accordion"]: TextAccordion,
  ["text_description_image"]: TextDescriptionImage,
  ["dual_grid"]: DualGrid,
  ["text___carousel"]: TextCarousel,
  ["checklist"]: Checklist,
  ["quadcarousel"]: QuadCarousel,
  ["text___background_image"]: ShopTextBackgroundImage,
  ["shop_checklist"]: ShopChecklist,
  ["dualdatagrid"]: ShopDataProgress,
  ["product"]: Product,
  ["text___downloader"]: TextDownloader
};

const Modules = ({ pageData }) => {
  // console.log("pageData: ", pageData);
  return (
    <>
      {(() => {
        return pageData.body.map((module, index) => {
          const Module = moduleDefs[module?.type];
          return (
            Module && <Module key={`${index}_${module.type}`} {...module} />
          );
        });
      })()}
    </>
  );
};

export default Modules;
