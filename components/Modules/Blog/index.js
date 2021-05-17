import Text from "./Text";
import Image from "./Image";
import Video from "./Video";
import Quote from "./Quote";

const moduleDefs = {
  ["blog_text"]: Text,
  ["blog_image"]: Image,
  ["blog_video"]: Video,
  ["blog_quote"]: Quote,
};

const BlogModules = ({ postData }) => {
  return (
    <>
      {(() => {
        return postData.map((module, index) => {
          const Module = moduleDefs[module?.type];
          return (
            Module && <Module key={`${index}_${module.type}`} {...module} />
          );
        });
      })()}
    </>
  );
};

export default BlogModules;
