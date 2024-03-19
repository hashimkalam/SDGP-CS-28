import hashim from "../../public/images/hashim.png";
import salman from "../../public/images/salman.png";
import riyazath from "../../public/images/riyazath.png";
import loshan from "../../public/images/loshan.png";
import yasisuru from "../../public/images/yasisuru.png";

import git from "../../public/images/git.png";
import linkdn from "../../public/images/linkdn.png";
import web from "../../public/images/web.png";
import { IconButton } from "@mui/material";

const data = [
  {
    name: "Hashim Kalam",
    desc: "Hashim  played a pivotal role in developing the machine learning model, NLP, and the frontend for EliteBluPrint. His skills were instrumental in bringing this feature to life.",
    styles: "z-30 -mr-16",
    image: salman,
    git: "https://github.com/hashimkalam",
    linkdn: "https://www.linkedin.com/in/hashimkalam/",
    web: "https://hashimkalam.vercel.app/",
  },
  {
    name: "Hashim Kalam",
    desc: "Hashim  played a pivotal role in developing the machine learning model, NLP, and the frontend for EliteBluPrint. His skills were instrumental in bringing this feature to life.",
    styles: "z-40 -mr-16",
    image: riyazath,
    git: "https://github.com/hashimkalam",
    linkdn: "https://www.linkedin.com/in/hashimkalam/",
    web: "https://hashimkalam.vercel.app/",
  },
  {
    name: "Hashim Kalam",
    desc: "Hashim  played a pivotal role in developing the machine learning model, NLP, and the frontend for EliteBluPrint. His skills were instrumental in bringing this feature to life.",
    styles: "z-50",
    image: hashim,
    git: "https://github.com/hashimkalam",
    linkdn: "https://www.linkedin.com/in/hashimkalam/",
    web: "https://hashimkalam.vercel.app/",
  },
  {
    name: "Hashim Kalam",
    desc: "Hashim  played a pivotal role in developing the machine learning model, NLP, and the frontend for EliteBluPrint. His skills were instrumental in bringing this feature to life.",
    styles: "z-40 -ml-16",
    image: loshan,
    git: "https://github.com/hashimkalam",
    linkdn: "https://www.linkedin.com/in/hashimkalam/",
    web: "https://hashimkalam.vercel.app/",
  },
  {
    name: "Yasisuru.D.Arachchi",
    desc: "Yasisuru played an important role in developing EliteBluPrint's frontend, using his skills to make this feature a reality.",
    styles: "z-30 -ml-16",
    image: yasisuru,
    git: "https://github.com/YasisuruArachchi",
    linkdn: "https://www.linkedin.com/in/yasisurudenagamaarachchi/",
    web: "",
  },
];

function AboutUs() {
  return (
    <div
      id="aboutus"
      className="min-h-screen py-10 text-white px-10 bg-[#090E34] text-center flex flex-col items-center justify-center"
    >
      <h1 className="text-5xl font-bold">Meet Our Team</h1>

      <p className="mt-5 opacity-55 font-thin italic w-[80%]">
        We're a passionate crew of tech wizards and design enthusiasts obsessed
        with transforming the way floor plans come to life. Think of us as
        architects of a new kind, wielding code instead of blueprints.
      </p>
      <div className="flex relative mt-8 w-[80%]">
        {data.map((item, index) => (
          <div
            key={index}
            className={`${item.styles} flex flex-col items-center justify-center`}
          >
            <img
              src={item.image}
              className={`w-[250px] bg-[#090E34] p-2 rounded-full`}
            />

            <div className="w-[60%] space-y-4 mt-4">
              <p>{item.name}</p>

              <p className="text-[12px] ">{item.desc}</p>

              <div className="flex items-center justify-center">
                <IconButton href={item.git}>
                  <img src={git} alt="git logo" />
                </IconButton>
                <IconButton href={item.linkdn}>
                  <img src={linkdn} alt="linkdn logo" />
                </IconButton>
                <IconButton href={item.web}>
                  <img src={web} alt="web logo" />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
