import { initializeApollo } from "../lib/apolloClient";
import { MENU_QUERY } from "../lib/apolloQueries";

export default function Menu({ menuData }) {
  const { menu_links } = menuData.data.allMenus.edges[0].node;
  return (
    <section>
      {menu_links.map((link) => {
        return (
          <div key={link.link._meta.uid}>
            <p>{link.label[0].text}</p>
            <p>/{link.link._meta.uid}</p>
          </div>
        );
      })}
    </section>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const menuData = await apolloClient.query({
    query: MENU_QUERY,
    variables: { uid: "main-menu" },
  });

  return {
    props: {
      menuData,
    },
    revalidate: 1,
  };
}
