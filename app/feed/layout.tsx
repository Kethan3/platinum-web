import React, { PropsWithChildren } from "react";
import { FeedNavigationBar } from "./components/navigation-bar/NavigationBar";
import { FeedSideBar } from "./components/side-bar/FeedSideBar";

const FeedLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <FeedNavigationBar />
      <div className="w-5xl mx-auto mt-4 grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <FeedSideBar />
        </div>
        <div className="col-span-4">{children}</div>
      </div>
    </main>
  );
};

export default FeedLayout;