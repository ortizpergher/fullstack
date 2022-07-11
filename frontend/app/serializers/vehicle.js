import RESTSerializer from "@ember-data/serializer/rest";

export default class VehicleSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = { vehicles: payload };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
}
