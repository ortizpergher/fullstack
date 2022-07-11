import Route from "@ember/routing/route";

export default class VehiclesRoute extends Route {
  async model() {
    return this.store.findAll("vehicles");
  }
}
