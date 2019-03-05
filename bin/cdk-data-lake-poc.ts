#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { CdkDataLakePocStack } from '../lib/cdk-data-lake-poc-stack';

const app = new cdk.App();
new CdkDataLakePocStack(app, 'CdkDataLakePocStack');
app.run();
