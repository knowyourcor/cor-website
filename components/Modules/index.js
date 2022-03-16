import Accordion from "./Accordion";
import BodyText from "./BodyText";
import Carousel from "./Carousel";
import Text from "./Text";
import BodyImage from "./BodyImage";
import TextImage from "./TextImage";
import CarouselHero from "./CarouselHero";
import FullWidthImage from "./FullWidthImage";
import Newsletter from "./Newsletter";
import ShopAccordion from "./ShopAccordion";
import ShopAccordionVideo from "./ShopAccordionVideo";
import ShopTextImage from "./ShopTextImage";
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
import PdfViewer from "./PdfViewer";
import TextImageHero from "./TextImageHero";

const moduleDefs = {
  ["accordion"]: Accordion,
  ["body_text"]: BodyText,
  ["body_image"]: BodyImage,
  ["carousel"]: Carousel,
  ["checklist"]: Checklist,
  ["dualdatagrid"]: ShopDataProgress,
  ["dual_grid"]: DualGrid,
  ["full_width_image"]: FullWidthImage,
  ["hero_carousel"]: CarouselHero,
  ["newsletter"]: Newsletter,
  ["pdf_viewer"]: PdfViewer,
  ["product"]: Product,
  ["quadcarousel"]: QuadCarousel,
  ["shop_accordion"]: ShopAccordion,
  ["video_accordion"]: ShopAccordionVideo,
  ["shop_checklist"]: ShopChecklist,
  ["shop_text_image"]: ShopTextImage,
  ["team"]: Team,
  ["text"]: Text,
  ["text_accordion"]: TextAccordion,
  ["text___background_image"]: ShopTextBackgroundImage,
  ["text___downloader"]: TextDownloader,
  ["text_description_image"]: TextDescriptionImage,
  ["text_image"]: TextImage,
  ["text_image_hero"]: TextImageHero,
};

const Modules = ({ pageData }) => {
  return (
    <>
      {pageData &&
        pageData.body.map((module, index) => {
          const Module = moduleDefs[module?.type];
          return (
            Module && <Module key={`${index}_${module.type}`} {...module} />
          );
        })}
    </>
  );
};

export default Modules;
