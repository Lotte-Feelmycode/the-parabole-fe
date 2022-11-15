import Head from 'next/head';

export default function SiteHead({ title, description, url, image, keyword }) {
  const titleString = title + ' | The Parabole';

  return (
    <Head>
      <title>{titleString}</title>
      <meta
        name="description"
        content={
          description ||
          "내 브랜드를 직접 마케팅할 수 있는 플랫폼, 더파라볼래"
        }
      />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="keywords" content={keyword || "이벤트 마케팅"}/>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleString} />
      <meta property="og:site_name" content="The Parabole" />
      <meta property="og:url" content={url || "https://theparabole.shop"} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="필마이코드" />
    </Head>
  );
}
