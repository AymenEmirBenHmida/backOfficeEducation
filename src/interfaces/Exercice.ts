import { LessonInterface } from "./LessonInterface";

export type Exercice = {
  id?: string; // Optional for create, required for update
  courId: string;
  cour: LessonInterface;
  typeQuestion:
    | "QCM_COMPLETE_PHRASE_WITH_WORD"
    | "QCM_COMPLETE_PHRASE_WITH_PHRASE"
    | "QCM_CHOOSE_PHRASE"
    | "QCM_CHOOSE_WORD"
    | "QCM_OPTION"
    | "QCM_DRAG_SMALL"
    | "QCM_DRAG_BIG"
    | "QCM_MULTI_ANSWER_WORDS"
    | "QCM_MULTI_ANSWER_PHRASE_SMALL"
    | "QCM_MULTI_ANSWER_IMAGES"
    | "QCM_MULTI_ANSWER_WORDS_IMAGES"
    | "DRAG_DROP_IN_TABLE_IMAGES"
    | "DRAG_DROP_WORDS_TO_IMAGE"
    | "SELECT_TABLE"
    | "COLOR"
    | "ARROW"
    | "ARROW_SOUND"
    | "VIDEO"
    | "READ"
    | "READ_IMAGE"
    | "MAKE_PHRASE"
    | "MAKE_PHRASE_FROM_TABLE";
  content:
    | {
        text: string;
        options: { text: string; isCorrect: boolean }[];
      }
    | {
        text: string;
        options: { image: string; isCorrect: boolean }[];
      }
    | {
        text: string;
        options: {
          text: string;
          image: string;
          isCorrect: boolean;
        }[];
      }
    | {
        text: string;
        columns: { text: string; background: string }[];
        options: { columnIndex: number; image: string }[];
      }
    | {
        text: string;
        options: {
          text: string;
          order: number;
          image: string;
        }[];
      }
    | {
        columns: {
          text: string;
          background: string;
          options: {
            image: string;
            isCorrect: boolean;
          }[];
        }[];
      }
    | {
        text: string;
        tuples: {
          text1: string;
          order1: number;
          text2: string;
          order2: number;
        }[];
      }
    | {
        text: string;
        tuples: {
          text: string;
          textOrder: number;
          sound: string;
          soundOrder: number;
        }[];
      }
    | {
        text: string;
        link: string;
      }
    | {
        text: string;
        image: string;
      }
    | {
        text: string;
        words: {
          text: string;
          order: number;
          correctOrder: number;
        }[];
      };
  description?: string;
  order?: number;
  isLocked?: boolean;
  estTermine?: boolean; // Optional, used for marking the exercise as complete
};
