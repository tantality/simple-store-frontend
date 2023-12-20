import { BaseState } from "types/base-state.type";

export interface AuthState extends BaseState {
  isAuth: boolean;
  isPending: {
    isAuth: boolean;
  };
  errors: {
    isAuth: string | null;
  };
}
