import Model, { attr } from "@ember-data/model";

export default class VehicleModel extends Model {
  @attr licensePate;
  @attr brand;
  @attr model;
  @attr version;
  @attr year;
  @attr enable;
}
