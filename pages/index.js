import Head from "../components/Head";
import { getLayout } from "../components/Layout/PageLayout";
import Modules from "../components/Modules";
import TextMultiVideo from "../components/Modules/TextMultiVideo";

import { getHomepageData, getMenuData } from "../lib/api";

export default function Homepage({ pageData }) {
  const v1 = {
    "video": {
      "provider_name": "Vimeo",
      "provider_url": "https://vimeo.com/",
      "type": "video",
      "version": "1.0",
      "title": "COR Medical Director discusses the importance of COR in today’s world.",
      "author_name": "COR",
      "author_url": "https://vimeo.com/user124339659",
      "is_plus": "0",
      "account_type": "pro",
      "html": "<iframe src=\"https://player.vimeo.com/video/688760288?h=1819fbeb3f&amp;app_id=122963\" width=\"640\" height=\"360\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"COR Medical Director discusses the importance of COR in today&amp;rsquo;s world.\"></iframe>",
      "width": 640,
      "height": 360,
      "duration": 119,
      "description": "",
      "thumbnail_url": "https://i.vimeocdn.com/video/1394963523-c840af3ed4a0ed0098a0315adc8b99bb17011a945207f839acdc75f85a745f53-d_640",
      "thumbnail_width": 640,
      "thumbnail_height": 360,
      "thumbnail_url_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1394963523-c840af3ed4a0ed0098a0315adc8b99bb17011a945207f839acdc75f85a745f53-d_640&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png",
      "upload_date": "2022-03-16 05:13:52",
      "video_id": 688760288,
      "uri": "/videos/688760288:1819fbeb3f",
      "embed_url": "https://vimeo.com/688760288/1819fbeb3f"
    }};

  const v2 = {
    "video": {
      "provider_name": "Vimeo",
      "provider_url": "https://vimeo.com/",
      "type": "video",
      "version": "1.0",
      "title": "COR CEO on why COR is so important.",
      "author_name": "COR",
      "author_url": "https://vimeo.com/user124339659",
      "is_plus": "0",
      "account_type": "pro",
      "html": "<iframe src=\"https://player.vimeo.com/video/688760150?h=b05c1a276b&amp;app_id=122963\" width=\"640\" height=\"360\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" allowfullscreen title=\"COR CEO on why COR is so important.\"></iframe>",
      "width": 640,
      "height": 360,
      "duration": 49,
      "description": "",
      "thumbnail_url": "https://i.vimeocdn.com/video/1394963440-38d0742f4d4e54fb07b89ebb201d41d4e9c1578f0e748c80d6e043261e961e3f-d_640",
      "thumbnail_width": 640,
      "thumbnail_height": 360,
      "thumbnail_url_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1394963440-38d0742f4d4e54fb07b89ebb201d41d4e9c1578f0e748c80d6e043261e961e3f-d_640&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png",
      "upload_date": "2022-03-16 05:13:24",
      "video_id": 688760150,
      "uri": "/videos/688760150:b05c1a276b",
      "embed_url": "https://vimeo.com/688760150/b05c1a276b"
    }};

  const t = [
    {
      "type": "heading3",
      "text": "Videos about COR",
      "spans": [

      ]
    }
  ];


  return (
    <>
      <Head
        title={pageData?.meta_title}
        description={pageData?.meta_description}
        image={pageData?.meta_image?.url}
      />
      <Modules pageData={pageData} />
      <TextMultiVideo primary={{"text": t}} fields={[v1, v2]}/>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getHomepageData(previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      pageData,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  };
}

Homepage.getLayout = getLayout;
