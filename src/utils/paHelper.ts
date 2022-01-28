const PA_DEMO_API = "https://api.picsart.io/tools/demo";
const PA_API_KEY = "your_api_key";

const applyTask = (
  formData: FormData,
  task: string
): Promise<{ editedSrc: string; errorMsg: string }> =>
  fetch(`${PA_DEMO_API}/${task}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      apikey: PA_API_KEY,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then(({ data, detail }) => ({
      editedSrc: data?.url,
      errorMsg: detail,
    }));

export const applyRemoveBg = (imageUrl: string) => {
  const formData = new FormData();
  formData.append("image", "");
  formData.append("image_id", "");
  formData.append("image_url", imageUrl);
  formData.append("bg_image", "");
  formData.append("bg_image_id", "");
  formData.append("bg_image_url", "");
  formData.append("bg_color", "");
  formData.append("bg_blur", "0");
  formData.append("bg_size", "");
  formData.append("scale", "fit");
  formData.append("format", "PNG");
  formData.append("output_type", "");
  return applyTask(formData, "removebg");
};
