import { colorsActions } from "./colorsAction";
import { renamePresentationActions } from "./namePresentationActions";
import { scaleActions } from "./scaleActions";
import { slidesActions } from "./slidesActionCreators";

export const ActionCreators = {
    ...slidesActions,
    ...renamePresentationActions,
    ...colorsActions,
    ...scaleActions,
};