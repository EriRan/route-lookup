import { SIDEBAR_STATE_CHANGE } from "./types";

export const changeSidebarOpenState = (isOpen) => {
  return {
    type: SIDEBAR_STATE_CHANGE,
    payload: isOpen === true,
  };
};
