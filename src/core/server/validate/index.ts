import { EMAIL_PATTERN } from '../../common/validate';
import { ValidateError } from './validate-error';
const Ajv = require('ajv');
const ajv = new Ajv({removeAdditional: true});

ajv.addFormat('email', EMAIL_PATTERN);
ajv.addFormat('jsonwebtoken', /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);

export class Validator {
  static addSchema(schema: any, name: string) {
    return ajv.addSchema(schema, name);
  }

  static validate(name: string, data: any) {
    return ajv.validate(name, data)
      .catch(err => {
        if (err instanceof (<any>Ajv).ValidationError) {
          throw new ValidateError(err.errors.map(error => ({
            key: error.keyword,
            property: error.dataPath.slice(1),
            message: error.message,
          })));
        }
        throw err;
      });
  }
}
