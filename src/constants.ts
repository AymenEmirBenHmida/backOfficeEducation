import makePhraseFromTableImage from "/images/MAKE_PHRASE_FROM_TABLE.png";
import qcmMultiAnswerWordsImagesImage from "/images/QCM_MULTI_ANSWER_WORDS_IMAGES.png";
import qcmCompletePhraseWithPhraseImage from "/images/QCM_COMPLETE_PHRASE_WITH_PHRASE.png";
import qcmDragBigImage from "/images/QCM DRAG BIG.png";
import qcmMultiAnswerWordsImage from "/images/QCM_MULTI_ANSWER_WORDS.png";
import dragDropWordsToImageImage from "/images/DRAG_DROP_WORDS_TO_IMAGE.png";
import qcmChoosePhraseImage from "/images/QCM CHOOSE PHRASE.png";
import colorImage from "/images/COLOR.png";
import arrowImage from "/images/ARROW.png";
import qcmMultiAnswerImagesImage from "/images/QCM_MULTI_ANSWER_IMAGES.png";
import qcmMultiAnswerPhraseSmallImage from "/images/QCM_MULTI_ANSWER_PHRASE_SMALL.png";
import arrowSoundImage from "/images/ARROW_SOUND.png";
import { useTranslation } from "react-i18next";

const 
QuestionTypes = () => {
  interface QuestionType {
    id: string;
    name: string;
    image: string;
  }
  const { t } = useTranslation();

  const questionTypes: QuestionType[] = [
    {
      id: "QCM_MULTI_ANSWER_IMAGES",
      name: t("txt_multiple_choice_with_images"),
      image: qcmMultiAnswerImagesImage,
    },
    {
      id: "QCM_COMPLETE_PHRASE_WITH_PHRASE",
      name: t("txt_complete_phrase_with_another_phrase"),
      image: qcmCompletePhraseWithPhraseImage,
    },
    {
      id: "QCM_CHOOSE_PHRASE",
      name: t("txt_choose_the_correct_phrase"),
      image: qcmChoosePhraseImage,
    },
    {
      id: "QCM_CHOOSE_WORD",
      name: t("txt_choose_the_correct_word"),
      image: makePhraseFromTableImage,
    },
    {
      id: "QCM_OPTION",
      name: t("txt_multiple_choice_options"),
      image: makePhraseFromTableImage,
    },
    {
      id: "QCM_DRAG_SMALL",
      name: t("txt_drag_small_items"),
      image: makePhraseFromTableImage,
    },
    {
      id: "QCM_DRAG_BIG",
      name: t("txt_drag_large_items"),
      image: qcmDragBigImage,
    },
    {
      id: "QCM_MULTI_ANSWER_WORDS",
      name: t("txt_multiple_choice_with_words"),
      image: qcmMultiAnswerWordsImage,
    },
    {
      id: "QCM_MULTI_ANSWER_PHRASE_SMALL",
      name: t("txt_multiple_choice_with_small_phrases"),
      image: qcmMultiAnswerPhraseSmallImage,
    },
    {
      id: "QCM_COMPLETE_PHRASE_WITH_WORD",
      name: t("txt_complete_phrase_with_a_word"),
      image: makePhraseFromTableImage,
    },
    {
      id: "QCM_MULTI_ANSWER_WORDS_IMAGES",
      name: t("txt_multiple_choice_with_words_and_images"),
      image: qcmMultiAnswerWordsImagesImage,
    },
    {
      id: "DRAG_DROP_IN_TABLE_IMAGES",
      name: t("txt_drag_and_drop_in_table_with_images"),
      image: makePhraseFromTableImage,
    },
    {
      id: "DRAG_DROP_WORDS_TO_IMAGE",
      name: t("txt_drag_and_drop_words_to_image"),
      image: dragDropWordsToImageImage,
    },
    {
      id: "SELECT_TABLE",
      name: t("txt_select_from_table"),
      image: makePhraseFromTableImage,
    },
    {
      id: "COLOR",
      name: t("txt_coloring_activity"),
      image: colorImage,
    },
    {
      id: "ARROW",
      name: t("txt_arrow_activity"),
      image: arrowImage,
    },
    {
      id: "ARROW_SOUND",
      name: t("txt_arrow_with_sound"),
      image: arrowSoundImage,
    },
    {
      id: "VIDEO",
      name: t("txt_video_activity"),
      image: makePhraseFromTableImage,
    },
    {
      id: "READ",
      name: t("txt_reading_activity"),
      image: makePhraseFromTableImage,
    },
    {
      id: "READ_IMAGE",
      name: t("txt_reading_with_image"),
      image: makePhraseFromTableImage,
    },
    {
      id: "MAKE_PHRASE",
      name: t("txt_make_a_phrase"),
      image: makePhraseFromTableImage,
    },
    {
      id: "MAKE_PHRASE_FROM_TABLE",
      name: t("txt_make_a_phrase_from_table"),
      image: makePhraseFromTableImage,
    },
  ];

  return questionTypes;
};

export default QuestionTypes;
