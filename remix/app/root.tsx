import {
  Link,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import tailwindStyles from "./styles/tailwind.css";
import { BasketProvider } from "./components/basket";
import { locale } from "./config/locale";
import { BasketButton } from "./components/basket/basket-button";
import { BottomNavigation } from "./components/bottom-navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorComponent } from "./components/404";
import React from "react";

const queryClient = new QueryClient();

export const meta: MetaFunction = () => {
  return { title: "Dounut" };
};

export function links() {
  return [{ rel: "stylesheet", href: tailwindStyles }];
}

export const loader: LoaderFunction = () => {
  return {
    ENV: {
      SERVICE_API_URL: process.env.SERVICE_API_URL,
      TENANT_IDENTIFIER: process.env.CRYSTALLIZE_TENANT_IDENTIFIER,
      NODE_EXECUTION_MODE: process.env.NODE_EXECUTION_MODE,
    },
  };
};

export default function App() {
  const data = useLoaderData();

  if (typeof window !== "undefined") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "Регистрация ServiceWorker прошла успешно с областью действия: ",
            registration.scope
          );
        },
        function (err) {
          console.log("Регистрация ServiceWorker не удалась: ", err);
        }
      );
    });
  }

  return (
    <html lang="ru" className="relative z-10">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="apple-touch-icon"
          href="/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-startup-image"
          href="/images/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <meta name="apple-mobile-web-app-title" content="Dounot" />
        <link rel="manifest" href="/manifest.json" />

        <Meta />
        <Links />

        <script suppressHydrationWarning={true} type="text/css">
          {
            '*,:after,:before{box-sizing:border-box;border:0 solid}:after,:before{--tw-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}body{margin:0;line-height:inherit}h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}figure,h2,p{margin:0}img,svg{display:block;vertical-align:middle}img{max-width:100%;height:auto}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (max-width:1024px){#grid-item{grid-column:span 1!important}}.absolute{position:absolute}.relative{position:relative}.-right-2{right:-.5rem}.-top-2{top:-.5rem}.z-10{z-index:10}.mx-auto{margin-left:auto;margin-right:auto}.mt-4{margin-top:1rem}.flex{display:flex}.h-80{height:20rem}.h-full{height:100%}.h-5{height:1.25rem}.w-full{width:100%}.w-60{width:15rem}.w-5{width:1.25rem}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-evenly{justify-content:space-evenly}.gap-5{gap:1.25rem}.gap-1{gap:.25rem}.self-end{align-self:flex-end}.overflow-hidden{overflow:hidden}.rounded-xl{border-radius:.75rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:1000px}.rounded-r-xl{border-top-right-radius:.75rem;border-bottom-right-radius:.75rem}.bg-primary{--tw-bg-opacity:1;background-color:rgb(255 247 240/var(--tw-bg-opacity))}.bg-background1{--tw-bg-opacity:1;background-color:rgb(240 239 235/var(--tw-bg-opacity))}.bg-grey{background-color:#00000008}.bg-text{--tw-bg-opacity:1;background-color:rgb(55 53 103/var(--tw-bg-opacity))}.p-8{padding:2rem}.p-5{padding:1.25rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-7{padding-top:1.75rem;padding-bottom:1.75rem}.py-20{padding-top:5rem;padding-bottom:5rem}.text-center{text-align:center}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.text-primary{--tw-text-opacity:1;color:rgb(255 247 240/var(--tw-text-opacity))}'
          }
        </script>
        <script
          defer
          src="https://pim.crystallize.com/static/frontend-preview-listener.js"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <BasketProvider locale={locale}>
            <Layout>
              <Outlet />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
                }}
              ></script>

              <ScrollRestoration />
              {data.ENV.NODE_EXECUTION_MODE === "development" && <LiveReload />}
            </Layout>
          </BasketProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <div className="remix-app lg:w-content w-full mx-auto p-3 sm:px-3">
      <header className="remix-app__header">
        <div className="container remix-app__header-content flex justify-between hidden md:flex pb-5">          
          <Link
            prefetch="intent"
            to="/"
            title="Детские игровые палатки"
            className="remix-app__header-home-link"
          >
            <Logo />
          </Link>
          <Link
            prefetch="intent"
            to="/cart"
            title="Your cart"
            className="remix-app__header-link"
          >
            <BasketButton />
          </Link>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
        <BottomNavigation />
        <BottomNavigation />
      </div>
      <footer className="remix-app__footer invisible md:visible">
        <div className="container remix-app__footer-content mt-5">
          <Link
            prefetch="intent"
            to="/"
            title="Детские игровые палатки"
            className="remix-app__header-home-link"
          >
            <Logo />
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="35"
      height="35"
      viewBox="0 0 512 512"
    >
      <g>
        <path
          fill="#16153B"
          d="M282.946,479.473h-53.893c-7.442,0-13.474-6.032-13.474-13.474c0-7.442,6.032-13.474,13.474-13.474
		h53.893c7.442,0,13.474,6.032,13.474,13.474C296.42,473.441,290.388,479.473,282.946,479.473z"
        />
        <path
          fill="#16153B"
          d="M498.526,479.473h-53.893c-7.442,0-13.474-6.032-13.474-13.474c0-7.442,6.032-13.474,13.474-13.474
		h53.893c7.442,0,13.474,6.032,13.474,13.474C512,473.441,505.968,479.473,498.526,479.473z"
        />
        <path
          fill="#16153B"
          d="M67.366,479.473H13.474C6.032,479.473,0,473.441,0,465.999c0-7.442,6.032-13.474,13.474-13.474
		h53.893c7.442,0,13.474,6.032,13.474,13.474C80.84,473.441,74.808,479.473,67.366,479.473z"
        />
        <path
          fill="#16153B"
          d="M471.581,479.473h-68.083c-37.574,0-71.907-22.098-87.468-56.298l-29.442-64.708
		c-3.081-6.773-0.089-14.763,6.683-17.845c6.773-3.083,14.762-0.09,17.845,6.683l29.443,64.707
		c11.197,24.61,35.902,40.51,62.939,40.51h51.287l-42.099-189.445c-4.626-20.812-16.117-39.877-32.363-53.685L256,103.721
		L131.677,209.393c-16.245,13.808-27.737,32.872-32.363,53.685L57.215,452.526h51.287c27.037,0,51.742-15.902,62.939-40.51
		l72.109-158.48c2.025-4.879,6.834-8.309,12.446-8.309c4.582,0,8.854,2.328,11.334,6.182c2.479,3.852,2.835,8.701,0.938,12.873
		L195.97,423.176c-15.561,34.199-49.894,56.298-87.468,56.298H40.419c-4.087,0-7.952-1.854-10.51-5.043
		c-2.557-3.189-3.53-7.365-2.642-11.354l45.742-205.841c5.889-26.504,20.527-50.787,41.215-68.372l133.05-113.09
		c5.031-4.277,12.422-4.277,17.453,0l133.05,113.09c20.688,17.585,35.326,41.867,41.215,68.372l45.742,205.841
		c0.887,3.99-0.085,8.166-2.642,11.354C479.535,477.618,475.668,479.473,471.581,479.473z"
        />
        <path
          fill="#16153B"
          d="M236.176,116.642c-3.448,0-6.897-1.315-9.527-3.946c-5.262-5.262-5.262-13.793,0-19.056
		l57.167-57.167c5.262-5.262,13.793-5.262,19.056,0c5.262,5.262,5.262,13.793,0,19.056l-57.167,57.167
		C243.072,115.327,239.624,116.642,236.176,116.642z"
        />
        <path
          fill="#16153B"
          d="M275.824,116.642c-3.448,0-6.897-1.315-9.527-3.946L209.13,55.529
		c-5.262-5.262-5.262-13.793,0-19.056c5.262-5.262,13.793-5.262,19.056,0l57.167,57.167c5.262,5.262,5.262,13.793,0,19.056
		C282.721,115.327,279.273,116.642,275.824,116.642z"
        />
      </g>
      <path
        fill="#97C4E8"
        d="M425.154,257.352c-5.658-22.679-18.258-43.053-36.106-58.222L255.999,86.04L122.95,199.13
	c-17.846,15.169-30.448,35.543-36.106,58.222L425.154,257.352L425.154,257.352z"
      />
      <path
        fill="#16153B"
        d="M425.156,270.826H86.846c-4.149,0-8.064-1.911-10.617-5.179c-2.555-3.269-3.459-7.532-2.455-11.556
	c6.389-25.608,20.378-48.164,40.452-65.228l133.049-113.09c5.031-4.277,12.422-4.277,17.453,0l133.05,113.09
	c20.075,17.065,34.063,39.618,40.452,65.228c1.004,4.025,0.098,8.286-2.455,11.556C433.22,268.915,429.303,270.826,425.156,270.826z
	 M105.71,243.878h300.581c-5.949-13.222-14.747-24.945-25.967-34.482L256.001,103.723L131.678,209.396
	C120.456,218.933,111.659,230.658,105.71,243.878z"
      />
    </svg>
  );
}

export function ErrorBoundary() {
  return (
    <html className="bg-primary">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body style={{ height: "100vh" }}>
        <Layout>
          <ErrorComponent />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <html className="bg-primary">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body style={{ height: "100vh" }}>
        <Layout>
          <ErrorComponent />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}