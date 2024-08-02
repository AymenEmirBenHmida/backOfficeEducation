import axios from "../config/axiosConfig";
//upload file
export const uploadFileService = async ({ files }: { files: any[] }) => {
  console.log("upload file ", files);
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append("file", file);
  });
  try {
    const response = await axios.post("/api/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
// get an url to a file that was uploaded
export const getUrlFileService = async ({ path }: { path: string }) => {
  console.log("get url file  path", path);
  try {
    const response = await axios.get("/api/file/getFileUrl", {
      params: {
        path: path,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
