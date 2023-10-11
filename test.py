import datetime
import pandas as pd
from feast import FeatureStore
from feast.data_source import PushMode

def run_demo():
    store = FeatureStore(repo_path="/home/shweta/ramdas/feast/my_project/feature_repo")
    objects = [1001]
    store.apply(objects)

    fetch_historical_features_entity_df(store, for_batch_scoring=False)
    fetch_historical_features_entity_df(store, for_batch_scoring=True)

    store.materialize_incremental(end_date=datetime.now())

    fetch_online_features(store)
    fetch_online_features(store, source="feature_service")
    fetch_online_features(store, source="push")

    event_df = pd.DataFrame.from_dict(
        {
            "driver_id": [1001],
            "event_timestamp": [datetime.now()],
            "created": [datetime.now()],
            "conv_rate": [1.0],
            "acc_rate": [1.0],
            "avg_daily_trips": [1000],
        }
    )
    print(event_df)
    store.push("driver_stats_push_source", event_df, to=PushMode.ONLINE_AND_OFFLINE)

    fetch_online_features(store, source="push")

if __name__ == '__main__':
    run_demo()
