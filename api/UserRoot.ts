import Data from "./Data";
import { FilterType, FilterTypes, ISpaceView, IUserRoot, NishanArg } from "../types";

import SpaceView from "./SpaceView";

class UserRoot extends Data<IUserRoot> {
  constructor(arg: NishanArg) {
    super({ ...arg, type: "user_root" });
  }

  /**
   * Get multiple Space views from the user root
   * @param arg criteria to filter pages by
   * @returns An array of pages object matching the passed criteria
   */
  async getSpaceViews(args?: FilterTypes<ISpaceView>, multiple?: boolean): Promise<SpaceView[]> {
    multiple = multiple ?? true;
    const props = this.getProps();
    return this.getItems<ISpaceView>(args, multiple, async function (space_view) {
      return new SpaceView({
        id: space_view.id,
        ...props
      })
    });
  }

  /**
   * Get a single space view from the user root
   * @param arg criteria to filter pages by
   * @returns A page object matching the passed criteria
   */
  async getSpaceView(arg?: FilterType<ISpaceView>) {
    return (await this.getSpaceViews(typeof arg === "string" ? [arg] : arg, false))[0]
  }
}

export default UserRoot;