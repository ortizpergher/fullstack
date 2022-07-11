import { RESTAdapter } from "@ember-data/adapter/rest";

export default class VehicleAdapter extends RESTAdapter {
  host = "https://localhost:3000";
  pathForType() {
    return "vehicles";
  }
}
