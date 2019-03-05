import cdk = require('@aws-cdk/cdk');
import { Bucket, BucketImportProps } from '@aws-cdk/aws-s3';
import { CfnCrawler } from '@aws-cdk/aws-glue';
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';

export interface Tier1Props {
  databaseName: string,
  tablePrefix: string,
}

export class Tier1 extends cdk.Construct {
  tier1BucketImportProps: BucketImportProps;

  constructor(scope: cdk.Construct, id: string, props: Tier1Props) {
    super(scope, id);

    const tier1 = new Bucket(this, 'tier-1-data');
    this.tier1BucketImportProps = tier1.export();

    const crawlerRole = new Role(this, 'CrawlerRole', {
      assumedBy: new ServicePrincipal('glue.amazonaws.com'),
      managedPolicyArns: ['arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole'],
    });

    tier1.grantRead(crawlerRole);

    const crawler = new CfnCrawler(this, 'tier1-crawler', {
      databaseName: props.databaseName,
      name: 'tier1-crawler',
      role: crawlerRole.roleArn,
      targets: {
        s3Targets: [{
          path: `s3://${tier1.bucketName}`
        }]
      },
      tablePrefix: props.tablePrefix,
    });
  }
}