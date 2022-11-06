import { useLoaderData, json, LoaderFunction, MetaFunction } from "remix";
import { catalogueClient } from "../../clients";
import {
  ProductDocument,
  ProductQuery,
} from "../../crystallize/queries/product.generated";
import { normalizeDocumentNode } from "../../crystallize/utils/normalizeDocumentNode";
import { Product } from "../../components/product";
import { componentContent } from "../../crystallize/utils/componentContent";
import { HttpCacheHeaderTagger } from "~/http-cache-header-tagger";
import React from "react";

export let loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  // for the preview mode, if the query parameter preview=true is present, ask for the draft version
  const preview = url.searchParams.get("preview");
  const version = preview ? "draft" : "published";
  const path = "/shop/" + params.product;
  const data = await catalogueClient.request<ProductQuery>(
    normalizeDocumentNode(ProductDocument),
    { path, version }
  );

  return json(
    { ...data, path },
    HttpCacheHeaderTagger("30s", "1w", ["product", "product-" + params.product])
  );
};

export let meta: MetaFunction = ({ data }) => {
  let { product } = data;
  let description = componentContent(
    product?.summary?.content,
    "RichTextContent"
  )?.plainText[0];
  let image = product?.defaultVariant?.firstImage.url;

  return {
    title: `${product?.name} | Тентин`,
    description: `${description}`,
    "og:description": `${description}`,
    "og:image": `${image}`,
  };
};

export function headers() {
  return HttpCacheHeaderTagger("1m", "1w", ["product", "product-index"])
    .headers;
}

export default function Index() {
  let data = useLoaderData();

  return (
    <div>
      <Product product={data.product} />
    </div>
  );
}