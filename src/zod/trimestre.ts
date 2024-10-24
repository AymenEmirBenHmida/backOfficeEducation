// Generated by ts-to-zod
import { z } from "zod";
import i18n from "../i18n";

let createTrimesterSchema: z.ZodType | null;
const checkI18nInitialization = async () => {
  if (!i18n.isInitialized) {
    await new Promise((resolve) => {
      i18n.on("initialized", resolve);
    });
  }
};
const getTranslation = (key: string) => {
  return i18n.t(key);
};
export const validateTrimesterInput = async (data: any) => {
  if (!createTrimesterSchema) {
    await checkI18nInitialization();
    createTrimesterSchema = await createTrimesterInputSchema();
  }
  return createTrimesterSchema.parse(data);
};
// Regenerate schema when language changes
const handleLanguageChange = async () => {
  createTrimesterSchema = await createTrimesterInputSchema();
};
i18n.on("languageChanged", handleLanguageChange);
export const createTrimesterInputSchema = async () => {
  await checkI18nInitialization(); // Ensure i18n is initialized
  return z.object({
    isLocked: z.boolean().optional(), // Optional field, no validation needed
    name: z
      .string()
      .min(1, { message:  getTranslation("txt_error_name_required") }), // Custom error message for name
    slug: z
      .string()
      .min(1, { message:  getTranslation("txt_error_slug_required") }), // Custom error message for slug
    niveauId: z
      .string()
      .min(1, {
        message:  getTranslation("txt_error_niveau_id_required"),
      }), // Custom error message for niveauId
  });
};
