import { BaseState } from "types/base-state.type";

export interface AuthState extends BaseState {
  isAuth: boolean | null;
  isPending: {
    isAuth: boolean;
  };
  errors: {
    isAuth: string | null;
  };
}
