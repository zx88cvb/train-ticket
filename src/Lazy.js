import React, {lazy, Suspense} from 'react';

const About = lazy(() => import(/* webpackChunkName: "about"*/ './About'));

// ErrorBoundary

function Lazy() {
  return (
    <div>
        <Suspense fallback={<div>loading</div>}>
          <About></About>
        </Suspense>
    </div>
  );
}

export default Lazy;
