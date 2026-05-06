variable "project_name" {
  description = "Name prefix for all resources"
  type        = string
  default     = "healthcare-asset-platform"
}

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "eu-west-2"
}

variable "environment" {
  description = "Deployment environment (dev, staging, production)"
  type        = string
  default     = "production"
}

variable "common_tags" {
  description = "Common tags applied to all resources"
  type        = map(string)
  default = {
    Project     = "healthcare-asset-platform"
    ManagedBy   = "terraform"
    Environment = "production"
  }
}
