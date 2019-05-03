const moment = require('moment');
const { Model } = require('objection');
const { DbErrors } = require('objection-db-errors');

class BaseModel extends DbErrors(Model) {
  static get modelPaths() {
    return [__dirname];
  }

  $formatJson(current) {
    const json = super.$formatJson(current);

    if (json.created_at) {
      json.created_at = moment(json.created_at).format('YYYY-MM-DD HH:mm:ss');
    }

    if (json.updated_at) {
      json.updated_at = moment(json.updated_at).format('YYYY-MM-DD HH:mm:ss');
    }

    return json;
  }

  static paginate(params) {
    return paginator({
      model: this,
      ...params,
    });
  }

  async $beforeUpdate() {
    if (this.updated_at) {
      this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
    }
  }
}

module.exports = BaseModel;
