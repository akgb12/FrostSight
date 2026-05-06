from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "FrostSight"
    environment: str = "development"
    kafka_bootstrap_servers: str = "localhost:9092"
    kafka_topic: str = "frostsight.audit.events"
    datadog_enabled: bool = False
    datadog_api_key: str = ""
    datadog_host: str = "localhost"
    datadog_port: int = 8125
    snowflake_enabled: bool = False
    s3_enabled: bool = False
    aws_region: str = "us-east-1"
    s3_bucket: str = "frostsight-audit-archive"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
