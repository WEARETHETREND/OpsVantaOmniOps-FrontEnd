# AWS ECS Task Definition

This directory contains the ECS task definition for deploying the OpsVanta web application to AWS ECS.

## Configuration Required

Before deploying, you need to update the following placeholders in `task-definition.json`:

### 1. IAM Role ARNs (Lines 41-42)

Replace `ACCOUNT_ID` with your actual AWS account ID:

```json
"executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
"taskRoleArn": "arn:aws:iam::123456789012:role/ecsTaskRole"
```

To find your AWS account ID:

```bash
aws sts get-caller-identity --query Account --output text
```

### 2. CloudWatch Logs

Ensure the log group `/ecs/omniops-frontend` exists in your AWS account:

```bash
aws logs create-log-group --log-group-name /ecs/omniops-frontend --region us-east-1
```

### 3. IAM Roles

Create the required IAM roles if they don't exist:

- **ecsTaskExecutionRole**: Allows ECS to pull images and write logs
- **ecsTaskRole**: Allows your container to access other AWS services (if needed)

You can create these using the AWS Console or CLI. See [AWS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html) for details.

## Task Definition Details

- **Family**: omniops-frontend
- **CPU**: 256 (0.25 vCPU)
- **Memory**: 512 MB
- **Network Mode**: awsvpc (required for Fargate)
- **Launch Type**: Fargate
- **Container Port**: 80

## Deployment

The GitHub Actions workflow will automatically update the `image` field during deployment.
