import React, { useState } from 'react';

function ThreeDotLoading() {
  const [dotCount, setDotCount] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <div>{Array.from({ length: dotCount }, (_, i) => '.').join('')}</div>;
}

export default ThreeDotLoading;
