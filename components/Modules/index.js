import Accordion from "./Accordion";
import BodyText from "./BodyText";
import Carousel from "./Carousel";
import Text from "./Text";
import Image from "./Image";
import TextImage from "./TextImage";
import CarouselHero from "./CarouselHero";
import FullWidthImage from "./FullWidthImage";
import Quote from "./Quote";
import Newsletter from "./Newsletter";
import Shop from "./Shop";
import ShopAccordion from "./ShopAccordion";
import ShopTextImage from "./ShopTextImage";
import Tabs from "./Tabs";
import TextAccordion from "./TextAccordion";
import TextDescriptionImage from "./TextDescriptionImage";
import DualGrid from "./DualGrid";
import Team from "./Team";
import Checklist from "./Checklist";
import QuadCarousel from "./QuadCarousel";
import ShopTextBackgroundImage from "./ShopTextBackgroundImage";
import ShopChecklist from "./ShopChecklist";
import ShopDataProgress from "./ShopDataProgress";
import Product from "./Product";
import TextDownloader from "./TextDownloader";
import BlogBodyText from "./BlogBodyText";
import BlogFullWidthImage from "./BlogFullWidthImage";
import BlogQuote from "./BlogQuote";
import BlogVideo from "./BlogVideo";
import BlogInlineImage from "./BlogInlineImage";

const moduleDefs = {
  ["accordion"]: Accordion,
  ["body_text"]: BodyText,
  ["body_image"]: Image,
  ["carousel"]: Carousel,
  ["hero_carousel"]: CarouselHero,
  ["full_width_image"]: FullWidthImage,
  ["quote"]: Quote,
  ["newsletter"]: Newsletter,
  ["shop"]: Shop,
  ["shop_accordion"]: ShopAccordion,
  ["shop_text_image"]: ShopTextImage,
  ["tabs"]: Tabs,
  ["text"]: Text,
  ["text_image"]: TextImage,
  ["text_accordion"]: TextAccordion,
  ["text_description_image"]: TextDescriptionImage,
  ["dual_grid"]: DualGrid,
  ["team"]: Team,
  ["checklist"]: Checklist,
  ["quadcarousel"]: QuadCarousel,
  ["text___background_image"]: ShopTextBackgroundImage,
  ["shop_checklist"]: ShopChecklist,
  ["dualdatagrid"]: ShopDataProgress,
  ["product"]: Product,
  ["text___downloader"]: TextDownloader,
  ["blog_text"]: BlogBodyText,
  ["blog_full_width_image"]: BlogFullWidthImage,
  ["blog_quote"]: BlogQuote,
  ["video"]: BlogVideo,
  ["inline_image"]: BlogInlineImage,
};

const Modules = ({ pageData }) => {
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
