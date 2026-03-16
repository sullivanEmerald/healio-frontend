import { create } from "zustand";
import { createShiftSlice } from "./shiftSlice";
import { Store } from "@/types/store";
import { immer } from "zustand/middleware/immer";
import { createLayoutSlice } from "./layout";
import { createCarerSlice } from "./carer";



export const useStore = create<Store>()(immer((...a) => ({
    ...createShiftSlice(...a),
    ...createLayoutSlice(...a),
    ...createCarerSlice(...a),
})));
