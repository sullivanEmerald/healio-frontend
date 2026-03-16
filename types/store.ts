import { ShiftSlice } from "@/store/shiftSlice";
import { LayoutSlice } from "@/store/layout";
import { CarerSlice } from "@/store/carer";
// import { ProviderSlice } from "@/store/provider";

export type Store = ShiftSlice & LayoutSlice & CarerSlice;