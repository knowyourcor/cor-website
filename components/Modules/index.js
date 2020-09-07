// export { default as Accordion } from "./Accordion";
// export { default as Carousel } from "./Carousel";
// export { default as Content } from "./Content";
// export { default as HomepageHero } from "./HomepageHero";
// export { default as Image } from "./Image";
// export { default as Profile } from "./Profile";
// export { default as Quote } from "./Quote";
// export { default as Shop } from "./Shop";
// export { default as Tabs } from "./Tabs";

import Accordion from "./Accordion";
import Carousel from "./Carousel";
import Content from "./Content";
import HomepageHero from "./HomepageHero";
import Image from "./Image";
import Profile from "./Profile";
import Quote from "./Quote";
import Shop from "./Shop";
import Tabs from "./Tabs";

const Modules = ({ data }) => {
  return (
    <>
      {(() => {
        return data.map((module) => {
          switch (module.type) {
            case "accordion":
              return <Accordion key={module.id} {...module} />;
              break;
            case "carousel":
              return <Carousel key={module.id} {...module} />;
              break;
            case "content":
              return <Content key={module.id} {...module} />;
              break;
            case "homepageHero":
              return <HomepageHero key={module.id} {...module} />;
              break;
            case "image":
              return <Image key={module.id} {...module} />;
              break;
            case "profile":
              return <Profile key={module.id} {...module} />;
              break;
            case "quote":
              return <Quote key={module.id} {...module} />;
              break;
            case "shop":
              return <Shop key={module.id} {...module} />;
              break;
            case "tabs":
              return <Tabs key={module.id} {...module} />;
              break;
          }
        });
      })()}
    </>
  );
};

export default Modules;
