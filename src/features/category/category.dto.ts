import * as Yup from "yup";

/**
 * Data Transfer Object (DTO) untuk validasi input Category.
 */
export const CategoryDTO = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
  icon: Yup.string().required("Icon is required"),
});

export type CategoryInput = Yup.InferType<typeof CategoryDTO>;
