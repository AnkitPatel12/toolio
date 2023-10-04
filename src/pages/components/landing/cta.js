import React from "react";
import Container from "../container";
import { Button } from "@material-tailwind/react";

const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-[var(--button-bg)] px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Ready to build the future?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Don&apos;t let your website be a liability.
          </p>
        </div>
        
          <a
            href=""
            target="_blank"
            rel="noopener"
            className="">
            
            <Button style={{ml:6, textTransform: 'inherit'}} className="flex-shrink-0 w-full text-center lg:w-auto bg-white text-[var(--highlight-color)] text-lg lg:px-7 lg:py-5 py-3 mx-auto inline-block font-medium px-7 " href="">Start for Free</Button>
          </a>
        
      </div>
    </Container>
  );
}

export default Cta;