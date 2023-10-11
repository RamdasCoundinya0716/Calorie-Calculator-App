import pandas as pd
from datetime import datetime

from feast import FeatureStore
from feast.data_source import PushMode

def run_demo():
    store = FeatureStore(repo_path="/home/shweta/ramdas/feast/my_project/feature_repo")
    
    # Define your entities and feature views
    entities = [
        # Replace with your actual entity definitions
        {"name": "driver", "value_type": "int64", "event_timestamp_column": "event_timestamp"},
    ]
    
    feature_views = [
        # Replace with your actual feature view definitions
        {
            "name": "driver_hourly_stats",
            "entities": ["driver"],
            "features": [
                {"name": "conv_rate", "value_type": "float"},
                {"name": "acc_rate", "value_type": "float"},
                {"name": "avg_daily_trips", "value_type": "float"},
            ],
            "batch_source": {...},  # Replace with your batch source config
        },
        {
            "name": "transformed_conv_rate",
            "entities": ["driver"],
            "features": [
                {"name": "conv_rate_plus_val1", "value_type": "float"},
                {"name": "conv_rate_plus_val2", "value_type": "float"},
            ],
            "batch_source": {...},  # Replace with your batch source config
        },
    ]

    print("\n--- Run feast apply ---")
    store.apply(feature_views=feature_views, entities=entities)

    print("\n--- Historical features for training ---")
    fetch_historical_features_entity_df(store, for_batch_scoring=False)

    print("\n--- Historical features for batch scoring ---")
    fetch_historical_features_entity_df(store, for_batch_scoring=True)

    print("\n--- Load features into online store ---")
    store.materialize_incremental(end_date=datetime.now())

    print("\n--- Online features ---")
    fetch_online_features(store)

    print("\n--- Online features retrieved (instead) through a feature service ---")
    fetch_online_features(store, source="feature_service")

    print("\n--- Online features retrieved (using feature service v3, which uses a feature view with a push source ---")
    fetch_online_features(store, source="push")

    print("\n--- Simulate a stream event ingestion of the hourly stats df ---")
    event_df = pd.DataFrame.from_dict(
        {
            "driver_id": [1001],
            "event_timestamp": [
                datetime.now(),
            ],
            "created": [
                datetime.now(),
            ],
            "conv_rate": [1.0],
            "acc_rate": [1.0],
            "avg_daily_trips": [1000],
        }
    )
    print(event_df)
    store.push("driver_stats_push_source", event_df, to=PushMode.ONLINE_AND_OFFLINE)

    print("\n--- Online features again with updated values from a stream push ---")
    fetch_online_features(store, source="push")

    print("\n--- Run feast teardown ---")
    store.teardown()

def fetch_historical_features_entity_df(store: FeatureStore, for_batch_scoring: bool):
    # Your existing code for fetching historical features

def fetch_online_features(store, source: str = ""):
    # Your existing code for fetching online features

if __name__ == "__main__":
    run_demo()
