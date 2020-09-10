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

const Modules = ({ pageData }) => {
  // console.log("pageData: ", pageData);
  return (
    <>
      {(() => {
        return pageData.body.map((module, index) => {
          switch (module.type) {
            case "accordion":
              return <Accordion key={`${index}_${module.type}`} {...module} />;
              break;
            case "body_text":
              return <Text key={`${index}_${module.type}`} {...module} />;
              break;
            case "body_image":
              return <Image key={`${index}_${module.type}`} {...module} />;
              break;
            case "carousel":
              return <Carousel key={`${index}_${module.type}`} {...module} />;
              break;
            case "hero_carousel":
              return (
                <CarouselHero key={`${index}_${module.type}`} {...module} />
              );
              break;
            case "full_width_image":
              return (
                <FullWidthImage key={`${index}_${module.type}`} {...module} />
              );
              break;
            case "profiles":
              return <Profiles key={`${index}_${module.type}`} {...module} />;
              break;
            case "quote":
              return <Quote key={`${index}_${module.type}`} {...module} />;
              break;
            case "shop":
              return <Shop key={`${index}_${module.type}`} {...module} />;
              break;
            case "tabs":
              return <Tabs key={`${index}_${module.type}`} {...module} />;
              break;
            case "text_image":
              return <TextImage key={`${index}_${module.type}`} {...module} />;
              break;
          }
        });
      })()}
    </>
  );
};

export default Modules;
