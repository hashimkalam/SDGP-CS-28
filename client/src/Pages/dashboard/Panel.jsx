import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfile from "../UserProfile/userProfile";
import { useNavigate } from "react-router-dom";
import Dropbox from "../../components/dropbox/dropbox";
import { useSnackbar } from "notistack";

import { uploadBytes } from "firebase/storage";

import { storage } from "../../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { v4 } from "uuid";

const Panel = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const id = currentUser.user._id;

  const [slide, setSlide] = useState("projects");
  const [imgUrl, setImgUrl] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const [uploadImg, setUploadImg] = useState(); 

  const { enqueueSnackbar } = useSnackbar();

  
  const upload = (image) => {
    // Check if the file type is one of the allowed types
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(image.type)) {
      console.error('Invalid file type. Please upload a PNG, JPEG, or JPG image.');
      enqueueSnackbar("Invalid file type. Please upload a PNG, JPEG, or JPG image.", { variant: "error" });
      return;
    }
  
    var imgRef = ref(storage, `arch_files/${id}/floorplan_${v4()}.png`);
    uploadBytes(imgRef, image);
    setUploadImg(image);
  };
  useEffect(() => {
    if (initialRender) {
      var delay = 0;
      setInitialRender(false);
    } else {
      delay = 2000;
    }
    const timeoutId = setTimeout(async () => {
      try {
        const imgs = await listAll(ref(storage, `arch_files/${id}`));
        console.log(imgs);
        const urls = await Promise.all(
          imgs.items.map(async (val) => {
            const url = await getDownloadURL(val);
            return url;
          })
        );
        setImgUrl(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }, delay);

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount
  }, [uploadImg]);

  console.log(imgUrl, "imgurl");

  return (
    <main className="min-h-screen z-999 flex flex-col px-8 pt-7 pb-12 bg-gray-100 max-md:px-5 overflow-hidden">
      <section className="flex justify-center items-center text-center text-white whitespace-nowrap rounded-xl bg-[#1d2144] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 items-center justify-evenly w-full max-md:flex-wrap">
          <div
            className="flex gap-5  justify-center cursor-pointer w-full py-5"
            onClick={() => setSlide("projects")}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/93b67a72ff936c2da4adf3c65e955ea30a19b699d2a82d36236ff4e363593fed?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
              className="aspect-square w-[35px]"
              alt="Projects Icon"
            />
            <div className="self-start mt-2 font-semibold font-Inter-Regular leading-6 text-xl">
              PROJECTS
            </div>
          </div>

          <div
            className="flex gap-5  justify-center cursor-pointer w-full py-5"
            onClick={() => setSlide("profile")}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3786e830ea825221a62baf7894d52dcb8d3e09be02c9221b73b57ac02c593c08?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
              className="aspect-square w-[35px]"
              alt="Architect Icon"
            />
            <div className="self-start mt-3 font-semibold font-Inter-Regular leading-4 text-xl">
              My Profile
            </div>
          </div>
        </div>
      </section>

      {slide === "projects" ? (
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {imgUrl.map((dataVal, index) => (
            <div
              key={index}
              className="relative flex items-center bg-white shadow rounded-lg h-[10rem] w-[20rem] xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500"
            >
              <img
                src={dataVal}
                className="h-full w-full"
                alt={`Image ${index}`}
              />
            </div>
          ))}

          <div className="flex items-center bg-white shadow rounded-lg h-[10rem] w-[20rem] xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">
            <Dropbox floorplanAdded={(e) => upload(e)} />
          </div>
        </section>
      ) : (
        <div>
          <UserProfile />
        </div>
      )}
    </main>
  );
};

export default Panel;
