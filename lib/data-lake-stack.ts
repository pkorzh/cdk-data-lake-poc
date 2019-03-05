import cdk = require('@aws-cdk/cdk');

import { Tier1 } from './tier1';

export class DataLakeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Tier1(this, 'quotenmeter', {
      databaseName: 'lake',
      tablePrefix: 'lake_'
    });
  }
}
