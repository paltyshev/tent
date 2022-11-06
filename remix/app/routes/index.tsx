import { useLoaderData, json, LoaderFunction, MetaFunction } from "remix";
import { catalogueClient } from "../clients";
import {
  FrontpageDocument,
  FrontpageQuery,
} from "../crystallize/queries/frontpage.generated";
import { normalizeDocumentNode } from "../crystallize/utils/normalizeDocumentNode";
import Grid from "@crystallize/grid-renderer/react";
import { GridItem } from "../components/grid-item";
import { Products } from "../components/products";
import { componentContent } from "../crystallize/utils/componentContent";
import { HttpCacheHeaderTagger } from "~/http-cache-header-tagger";

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  // for the preview mode, if the query parameter preview=true is present, ask for the draft version
  const preview = url.searchParams.get("preview");
  const version = preview ? "draft" : "published";
  const path = "/frontpage";
  const data = await catalogueClient.request<FrontpageQuery>(
    normalizeDocumentNode(FrontpageDocument),
    { path, version }
  );

  return json(
    { ...data, path },
    HttpCacheHeaderTagger("30s", "1w", ["frontpage"])
  );
};

export let meta: MetaFunction = ({ data }) => {
  let {
    catalogue: { meta },
  } = data;
  let metaData = componentContent(meta.content, "ContentChunkContent")
    .chunks[0];

  return {
    title: `${componentContent(metaData[0].content, "SingleLineContent").text}`,
    description: `${
      componentContent(metaData[1].content, "RichTextContent").plainText[0]
    }`,
    "og:image": `${
      componentContent(metaData[2].content, "ImageContent")?.images[0]?.url
    }`,
  };
};

export function headers() {
  return HttpCacheHeaderTagger("1m", "1w", ["index"]).headers;
}

export default function Index() {
  let { catalogue, donuts } = useLoaderData();
  let { grid } = catalogue;

  const children = ({ cells }) => {
    return cells.map((cell, index) => (
      <div
        style={{
          gridColumn: `span ${cell.layout.colspan}`,
          gridRow: `span ${cell.layout.rowspan}`,
        }}
        id="grid-item"
        key={"cell" + index}
      >
        <GridItem cell={cell} />
      </div>
    ));
  };

  return (
    <div>
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
        <div className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-none text-text">
          Детские игровые палатки
        </div>
        <p className="mt-5 sm:mt-10 lg:w-10/12 text-text font-normal text-center text-md">
          Шатры, игровые замки, домики для принцессы, манежи с доставкой по России
        </p>
      </div>
      <Grid model={grid.content.grids[0]} className="gap-3 sm:gap-5">
        {children}
      </Grid>
      <Products donuts={donuts} />
    </div>
  );
}