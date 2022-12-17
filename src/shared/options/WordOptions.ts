import { schemas } from "chaca";
import { OptionSchema } from "../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";

const LANGUAGE_ARGUMENT = [
  {
    argument: "language",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["es", "en"],
    description: { es: "", en: "" },
  },
];

export const WordOptions: OptionSchema[] = [
  {
    name: "Adjective",
    getValue: schemas.word.adjective().getValue,
    exampleValue: schemas.word.adjective().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Adverb",
    getValue: schemas.word.adverb().getValue,
    exampleValue: schemas.word.adverb().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Conjuction",
    getValue: schemas.word.conjuction().getValue,
    exampleValue: schemas.word.conjuction().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Interjection",
    getValue: schemas.word.interjection().getValue,
    exampleValue: schemas.word.interjection().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Noun",
    getValue: schemas.word.noun().getValue,
    exampleValue: schemas.word.noun().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Preposition",
    getValue: schemas.word.preposition().getValue,
    exampleValue: schemas.word.preposition().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
  {
    name: "Verb",
    getValue: schemas.word.verb().getValue,
    exampleValue: schemas.word.verb().getValue(),
    arguments: LANGUAGE_ARGUMENT,
    description: { es: "", en: "" },
  },
];
