// Generated by ts-to-zod
import { z } from "zod";
import i18n from "../i18n";

let createExerciceSchema: z.ZodType | null;

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
export const validateExerciceInput = async (data: any) => {
  if (!createExerciceSchema) {
    await checkI18nInitialization();
    createExerciceSchema = await createExerciceInputSchema();
  }
  return createExerciceSchema.parse(data);
};
// Regenerate schema when language changes
const handleLanguageChange = async () => {
  createExerciceSchema = await createExerciceInputSchema();
};
i18n.on("languageChanged", handleLanguageChange);
export const createExerciceInputSchema = async () => {
  await checkI18nInitialization(); // Ensure i18n is initialized
  return z
    .union([
      z.object({
        typeQuestion: z.union([
          z.literal("QCM_COMPLETE_PHRASE_WITH_WORD"),
          z.literal("QCM_COMPLETE_PHRASE_WITH_PHRASE"),
          z.literal("QCM_CHOOSE_PHRASE"),
          z.literal("QCM_CHOOSE_WORD"),
          z.literal("QCM_OPTION"),
          z.literal("QCM_DRAG_SMALL"),
          z.literal("QCM_DRAG_BIG"),
          z.literal("QCM_MULTI_ANSWER_WORDS"),
          z.literal("QCM_MULTI_ANSWER_PHRASE_SMALL"),
        ]),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          options: z
            .array(
              z.object({
                text: z.string().min(1, {
                  message: getTranslation("txt_error_option_text_required"),
                }),
                isCorrect: z.boolean({
                  required_error: getTranslation(
                    "txt_error_correctness_status_required"
                  ),
                }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_option_required"),
            })
            .refine((options) => options.some((option) => option.isCorrect), {
              message: getTranslation(
                "txt_error_at_least_one_option_must_be_correct"
              ),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.literal("QCM_MULTI_ANSWER_IMAGES"),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          options: z
            .array(
              z.object({
                image: z.string().min(1, {
                  message: getTranslation("txt_error_image_required"),
                }),
                isCorrect: z.boolean({
                  required_error: getTranslation(
                    "txt_error_correctness_status_required"
                  ),
                }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_option_required"),
            })
            .refine((options) => options.some((option) => option.isCorrect), {
              message: getTranslation(
                "txt_error_at_least_one_option_must_be_correct"
              ),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.literal("QCM_MULTI_ANSWER_WORDS_IMAGES"),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          options: z
            .array(
              z.object({
                text: z.string().min(1, {
                  message: getTranslation("txt_error_option_text_required"),
                }),
                image: z.string().min(1, {
                  message: getTranslation("txt_error_image_required"),
                }),
                isCorrect: z.boolean({
                  required_error: getTranslation(
                    "txt_error_correctness_status_required"
                  ),
                }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_option_required"),
            })
            .refine((options) => options.some((option) => option.isCorrect), {
              message: getTranslation(
                "txt_error_at_least_one_option_must_be_correct"
              ),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.literal("DRAG_DROP_IN_TABLE_IMAGES"),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          columns: z
            .array(
              z.object({
                text: z.string().min(1, {
                  message: getTranslation("txt_error_column_text_required"),
                }),
                background: z.string().min(1, {
                  message: getTranslation("txt_error_background_required"),
                }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_column_required"),
            }),
          options: z
            .array(
              z.object({
                columnIndex: z
                  .union([z.number(), z.string()])
                  .refine((value) => typeof value === "number", {
                    message: getTranslation("txt_error_order_must_be_number"),
                  })
                  .refine((value) => typeof value === "number" && value >= 0, {
                    message: getTranslation(
                      "txt_error_order_must_be_positive_number"
                    ),
                  }),
                image: z.string().min(1, {
                  message: getTranslation("txt_error_image_required"),
                }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_option_required"),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.literal("DRAG_DROP_WORDS_TO_IMAGE"),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          options: z
            .array(
              z.object({
                text: z.string().min(1, {
                  message: getTranslation("txt_error_option_text_required"),
                }),
                order: z
                  .union([z.number(), z.string()])
                  .refine((value) => typeof value === "number", {
                    message: getTranslation("txt_error_order_must_be_number"),
                  })
                  .refine((value) => typeof value === "number" && value >= 0, {
                    message: getTranslation(
                      "txt_error_order_must_be_positive_number"
                    ),
                  }),
                image: z.string().min(1, {
                  message: getTranslation("txt_error_image_required"),
                }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_option_required"),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.literal("SELECT_TABLE"),
        content: z.object({
          columns: z
            .array(
              z.object({
                text: z.string().min(1, {
                  message: getTranslation("txt_error_column_text_required"),
                }),
                background: z.string().min(1, {
                  message: getTranslation("txt_error_background_required"),
                }),
                options: z
                  .array(
                    z.object({
                      image: z.string().min(1, {
                        message: getTranslation("txt_error_image_required"),
                      }),
                      isCorrect: z.boolean({
                        required_error: i18n.t(
                          "txt_error_correctness_status_required"
                        ),
                      }),
                    })
                  )
                  .min(1, {
                    message: getTranslation(
                      "txt_error_at_least_one_option_required"
                    ),
                  })
                  .refine(
                    (options) => options.some((option) => option.isCorrect),
                    {
                      message: i18n.t(
                        "txt_error_at_least_one_option_must_be_correct"
                      ),
                    }
                  ),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_column_required"),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.union([z.literal("COLOR"), z.literal("ARROW")]),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          tuples: z
            .array(
              z.object({
                text1: z.string().min(1, {
                  message: getTranslation("txt_error_text1_required"),
                }),
                order1: z
                  .union([z.number(), z.string()])
                  .refine((value) => typeof value === "number", {
                    message: getTranslation("txt_error_order_must_be_number"),
                  })
                  .refine((value) => typeof value === "number" && value >= 0, {
                    message: getTranslation(
                      "txt_error_order_must_be_positive_number"
                    ),
                  }),
                text2: z.string().min(1, {
                  message: getTranslation("txt_error_text2_required"),
                }),
                order2: z
                  .union([z.number(), z.string()])
                  .refine((value) => typeof value === "number", {
                    message: getTranslation("txt_error_order_must_be_number"),
                  })
                  .refine((value) => typeof value === "number" && value >= 0, {
                    message: getTranslation(
                      "txt_error_order_must_be_positive_number"
                    ),
                  }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_tuple_required"),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.literal("ARROW_SOUND"),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          tuples: z
            .array(
              z.object({
                text: z.string().min(1, {
                  message: getTranslation("txt_error_text_required"),
                }),
                textOrder: z
                  .union([z.number(), z.string()])
                  .refine((value) => typeof value === "number", {
                    message: getTranslation("txt_error_order_must_be_number"),
                  })
                  .refine((value) => typeof value === "number" && value >= 0, {
                    message: getTranslation(
                      "txt_error_order_must_be_positive_number"
                    ),
                  }),
                sound: z.string().min(1, {
                  message: getTranslation("txt_error_sound_required"),
                }),
                soundOrder: z
                  .union([z.number(), z.string()])
                  .refine((value) => typeof value === "number", {
                    message: getTranslation("txt_error_order_must_be_number"),
                  })
                  .refine((value) => typeof value === "number" && value >= 0, {
                    message: getTranslation(
                      "txt_error_order_must_be_positive_number"
                    ),
                  }),
              })
            )
            .min(1, {
              message: getTranslation("txt_error_at_least_one_tuple_required"),
            }),
        }),
      }),
      z.object({
        typeQuestion: z.literal("VIDEO"),
        content: z.object({
          text: z
            .string()
            .min(1, { message: getTranslation("txt_error_text_required") }),
          link: z
            .string()
            .min(1, { message: getTranslation("txt_error_link_required") }),
        }),
      }),
    ])
    .and(
      z.object({
        isLocked: z.boolean().optional(),
        courId: z
          .string()
          .min(1, { message: getTranslation("txt_error_course_id_required") }),
        order: z.number().optional(),
        description: z.string().optional(),
      })
    );
};
export const getExerciceByIdSchema = z.object({
  id: z.string(),
});

export const deleteExerciceByIdSchema = z.object({
  id: z.string(),
});

export const updateExerciceByIdSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  courId: z.string().optional(),
  order: z.number().optional(),
  isLocked: z.boolean().optional(),
  typeQuestion: z
    .union([
      z.literal("QCM_COMPLETE_PHRASE_WITH_WORD"),
      z.literal("QCM_COMPLETE_PHRASE_WITH_PHRASE"),
      z.literal("QCM_CHOOSE_PHRASE"),
      z.literal("QCM_CHOOSE_WORD"),
      z.literal("QCM_OPTION"),
      z.literal("QCM_DRAG_SMALL"),
      z.literal("QCM_DRAG_BIG"),
      z.literal("QCM_MULTI_ANSWER_WORDS"),
      z.literal("QCM_MULTI_ANSWER_PHRASE_SMALL"),
      z.literal("QCM_MULTI_ANSWER_IMAGES"),
      z.literal("QCM_MULTI_ANSWER_WORDS_IMAGES"),
      z.literal("DRAG_DROP_IN_TABLE_IMAGES"),
      z.literal("DRAG_DROP_WORDS_TO_IMAGE"),
      z.literal("SELECT_TABLE"),
      z.literal("COLOR"),
      z.literal("ARROW"),
      z.literal("ARROW_SOUND"),
      z.literal("VIDEO"),
      z.literal("READ"),
      z.literal("READ_IMAGE"),
      z.literal("MAKE_PHRASE"),
      z.literal("MAKE_PHRASE_FROM_TABLE"),
    ])
    .optional(),
  content: z
    .union([
      z.object({
        text: z.string(),
        options: z.array(
          z.object({
            text: z.string(),
            isCorrect: z.boolean(),
          })
        ),
      }),
      z.object({
        text: z.string(),
        options: z.array(
          z.object({
            image: z.string(),
            isCorrect: z.boolean(),
          })
        ),
      }),
      z.object({
        text: z.string(),
        options: z.array(
          z.object({
            text: z.string(),
            image: z.string(),
            isCorrect: z.boolean(),
          })
        ),
      }),
      z.object({
        text: z.string(),
        columns: z.array(
          z.object({
            text: z.string(),
            background: z.string(),
          })
        ),
        options: z.array(
          z.object({
            columnIndex: z.number(),
            image: z.string(),
          })
        ),
      }),
      z.object({
        text: z.string(),
        options: z.array(
          z.object({
            text: z.string(),
            order: z.number(),
            image: z.string(),
          })
        ),
      }),
      z.object({
        columns: z.array(
          z.object({
            text: z.string(),
            background: z.string(),
            options: z.array(
              z.object({
                image: z.string(),
                isCorrect: z.boolean(),
              })
            ),
          })
        ),
      }),
      z.object({
        text: z.string(),
        tuples: z.array(
          z.object({
            text1: z.string(),
            order1: z.number(),
            text2: z.string(),
            order2: z.number(),
          })
        ),
      }),
      z.object({
        text: z.string(),
        tuples: z.array(
          z.object({
            text: z.string(),
            textOrder: z.number(),
            sound: z.string(),
            soundOrder: z.number(),
          })
        ),
      }),
      z.object({
        text: z.string(),
        link: z.string(),
      }),
      z.object({
        text: z.string(),
        image: z.string(),
      }),
      z.object({
        text: z.string(),
        words: z.array(
          z.object({
            text: z.string(),
            order: z.number(),
            correctOrder: z.number(),
          })
        ),
      }),
    ])
    .optional(),
  estTermine: z.boolean().optional(),
});
