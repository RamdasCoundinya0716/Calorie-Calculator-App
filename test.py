from feast import FeatureStore, Entity, FeatureView, Feature, FileSource, RepoConfig
from datetime import timedelta
fs = FeatureStore(repo_path="/home/shweta/ramdas/feast/my_project/feature_repo")
driver = Entity(name="driver_id", description="driver id")
driver_hourly_stats = FileSource(
    path="project/feature_repo/data/driver_stats.parquet",
    timestamp_field="event_timestamp",
    created_timestamp_column="created",
)
driver_hourly_stats_view = FeatureView(
    name="driver_hourly_stats",
    entities=[driver],
    ttl=timedelta(seconds=86400 * 1),
    source=driver_hourly_stats,
)
fs.apply([driver_hourly_stats_view, driver])

