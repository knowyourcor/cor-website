import Accordion from "./Accordion";
import Carousel from "./Carousel";
import Text from "./Text";
import Image from "./Image";
import TextImage from "./TextImage";
import CarouselHero from "./CarouselHero";
import FullWidthImage from "./FullWidthImage";
import Profiles from "./Profiles";
import Quote from "./Quote";
import Shop from "./Shop";
import Tabs from "./Tabs";

const moduleDefs = {
  ["accordion"]: Accordion,
  ["body_text"]: Text,
  ["body_image"]: Image,
  ["carousel"]: Carousel,
  ["hero_carousel"]: CarouselHero,
  ["full_width_image"]: FullWidthImage,
  ["profiles"]: Profiles,
  ["quote"]: Quote,
  ["shop"]: Shop,
  ["tabs"]: Tabs,
  ["text_image"]: TextImage,
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
