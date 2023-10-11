from feast import FeatureStore, RepoConfig
import pandas as pd
fs = FeatureStore(repo_path="/home/shweta/ramdas/feast/my_project/feature_repo")
entity_df = pd.DataFrame.from_dict(
    {
        "driver_id": [1001, 1002],
        "event_timestamp": [
            datetime(2021, 4, 12, 10, 59, 42),
            datetime(2021, 4, 12, 8, 12, 10),
        ],
    }
)
retrieval_job = fs.get_historical_features(
    entity_df=entity_df,
    features=[
        "driver_hourly_stats:conv_rate",
        "driver_hourly_stats:acc_rate",
        "driver_hourly_stats:avg_daily_trips",
    ],
)
feature_data = retrieval_job.to_df()
