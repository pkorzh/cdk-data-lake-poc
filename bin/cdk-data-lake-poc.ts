#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { DataLakeStack } from '../lib/data-lake-stack';

const app = new cdk.App();

new DataLakeStack(app, 'CdkDataLakePocStack');

app.run();
