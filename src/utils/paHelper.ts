import * as PA from "../../pa.config.json";

const applyTask = (
  formData: FormData,
  task: string
): Promise<{ imageUrl: string; error: string }> =>
  fetch(`${PA.API}/${task}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      apikey: PA.KEY,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then(({ data, detail, message }) => ({
      imageUrl: data?.url,
      error: detail || message,
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
