import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { storage } from "../../firebase"
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid"

function dropbox() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const id = currentUser.user._id;


    const [img, setImg] = useState("")


    const uploadData = () => {
        const imgRef = ref(storage, `arch_files/${id}/floorplan_${v4()}.png`)
        uploadBytes(imgRef, img);

    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setImg(e.target.files[0])
        console.log("selected file", e.target.files);
        uploadData();
    }


    const handleDrop = (e) => {
        setImg(e.dataTransfer.files[0])
        e.stopPropagation();
        e.preventDefault();
        console.log("drag and drop", e.dataTransfer.files);
        uploadData();
    }

    const handledragover = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleDragLeave = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleDragEnter = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
    return (
        <>
            <label
                html-for="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"

                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handledragover}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG</p>
                </div>

                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleOnChange}
                />

            </label>

        </>
    )
}

export default dropbox
