import { makeAutoObservable } from "mobx";
class Global {
  constructor() {
    makeAutoObservable(this, {}, { deep: false });
  }

  g_userInfo = null;
  g_userAuth = [];
  g_menu = [];
}

export default new Global();
