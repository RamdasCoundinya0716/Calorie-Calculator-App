from feast import FeatureView, ValueType

# Define the features in the feature view.
features = [
    Feature(name="feature1", dtype=ValueType.FLOAT),
    Feature(name="feature2", dtype=ValueType.INT32),
]

# Define the values of the features for each entity in the feature view.
entity_rows = [
    {"driver_id": 1004, "feature1": 0.5, "feature2": 10},
    {"driver_id": 1005, "feature1": 0.7, "feature2": 15},
]

# Create the synthetic feature view.
driver_feature_view = FeatureView(
    name="driver_feature_view",
    entities=["driver_entity"],
    features=features,
    source=entity_rows,
)

# Register the feature view with the feature store.
store = FeatureStore(repo_path=".")
store.register_feature_view(driver_feature_view)

# Apply the feature view to the feature store.
store.apply()

# Retrieve features from the feature view.
feature_vector = store.get_online_features(
    features=["feature1", "feature2"],
    entity_rows=[
        {"driver_id": 1004},
        {"driver_id": 1005},
    ],
)

# Print the feature vector to the screen.
print(feature_vector)
