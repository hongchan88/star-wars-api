import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [favourite, setFavourite] = useState({});

  const clickFavourite = (movieId) => {
    if (favourite[movieId] == undefined) {
      setFavourite((prev) => {
        const updatedFav = { ...prev, [movieId]: { favourite: true } };
        return updatedFav;
      });
    } else if (favourite[movieId]?.favourite == true) {
      setFavourite((prev) => {
        const updatedFav = { ...prev };
        delete updatedFav[movieId];
        return updatedFav;
      });
    }
  };
  useEffect(() => {
    router.events.on("routeChangeError", (e) => {
      return setLoading(false);
    });
    router.events.on("routeChangeStart", (e) => {
      return setLoading(false);
    });
    router.events.on("routeChangeComplete", (e) => setLoading(true));

    return () => {
      router.events.off("routeChangeError", (e) => {
        return setLoading(false);
      });
      router.events.off("routeChangeStart", (e) => {
        return setLoading(false);
      });
      router.events.off("routeChangeComplete", (e) => setLoading(true));
    };
  }, [router.events]);

  return (
    <>
      <Component
        {...pageProps}
        loading={loading}
        clickFavourite={clickFavourite}
        favourite={favourite}
      />
    </>
  );
}

export default MyApp;
