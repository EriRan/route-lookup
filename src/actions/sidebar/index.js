import { SIDEBAR_OPEN_STATE_CHANGE } from "./types";

export const changeSidebarOpenState = (isOpen) => {
  return {
    type: SIDEBAR_OPEN_STATE_CHANGE,
    payload: isOpen === true,
  };
};
