import { useState, useEffect } from "react";

export const useCountTime = () => {
  const [cutImageURL, setCutImageURL] = useState<string | undefined>();

  return cutImageURL;
};
