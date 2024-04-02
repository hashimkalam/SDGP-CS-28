import hashim from "/images/hashim.png";
import salman from "/images/salman.png";
import riyazath from "/images/riyazath.png";
import loshan from "/images/loshan.png";
import yasisuru from "/images/yasisiru.jpg";

import git from "/public/images/git.png";
import linkdn from "/public/images/linkdn.png";
import web from "/public/images/web.png";
import { IconButton } from "@mui/material";

const data = [
  {
    name: "Salman Faraj",
    desc: "Salman played a pivotal role in crafting the core algorithm that powers EliteBluPrint's floor plan generation, he wasn't just coding, he also designed the UI of the application",
    styles: "z-30 lg:-mr-28",
    image: salman,
    git: "https://github.com/salmanfaraj06",
    linkdn: "https://www.linkedin.com/in/salman-faraj-2617a924b/",
    web: "https://salmanfr.me/",
  },
  {
    name: "Mohamed Riyazath",
    desc: "Riyazath brings a blend of passion and technical expertise to the table. He played a key role in testing the entire project and integration of OpenAi to increase accuracy!",
    styles: "z-40 lg:-mr-28",
    image: riyazath,
    git: "https://github.com/MhMdRiyazath",
    linkdn: "https://www.linkedin.com/in/mohamed-riyazath-60a72425b/",
    web: "https://mohamed-riyazath.vercel.app/",
  },
  {
    name: "Loshan Selvaraj",
    desc: "Loshan's passion was the spark that ignited the entire concept. Not only did he conceive the idea, but he also spearheaded the development of the  application's backend",
    styles: "z-50",
    image: loshan,
    git: "https://github.com/loshan20011",
    linkdn: "www.linkedin.com/in/loshan-selvaraj-a78638215",
    web: "https://www.loshanselvaraj.live/",
  },
  {
    name: "Hashim Kalam",
    desc: "Hashim  played a pivotal role in developing the machine learning model, NLP, and the frontend for EliteBluPrint. His skills were instrumental in bringing this feature to life.",
    styles: "z-40 lg:-ml-28",
    image: hashim,
    git: "https://github.com/hashimkalam",
    linkdn: "https://www.linkedin.com/in/hashimkalam/",
    web: "https://hashimkalam.vercel.app/",
  },

  {
    name: "Yasisuru.D.Arachchi",
    desc: "Yasisuru played an important role in developing EliteBluPrint's frontend, using his skills to make such an application a reality with its clean user friendly interface.",
    styles: "z-30 lg:-ml-24",
    image: yasisuru,
    git: "https://github.com/YasisuruArachchi",
    linkdn: "https://www.linkedin.com/in/yasisurudenagamaarachchi/",
    web: "http://Yasisuru.atomaxia.com",
  },
];

function OurTeam() {
  return (
    <div className="min-h-screen py-10 text-white px-10 bg-[#090E34] text-center flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Meet Our Team</h1>

      <p className="mt-5 opacity-55 font-thin italic w-[80%]">
        We're a passionate crew of tech wizards and design enthusiasts obsessed
        with transforming the way floor plans come to life. Think of us as
        architects of a new kind, wielding code instead of blueprints.
      </p>
      <div className="lg:flex relative mt-8 lg:w-[85%]">
        {data.map((item, index) => (
          <div
            key={index}
            className={`${item.styles} flex flex-col mb-10 lg:mb-0 items-center justify-center`}
          >
            <img
              src={item.image}
              className={`w-[250px] h-[250px] bg-[#090E34] p-2 rounded-full`}
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

export default OurTeam;
