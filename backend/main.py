from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import joblib
import numpy as np
import pandas as pd
from gensim.models import KeyedVectors
# from BestTimeTransformer import BestTimeTransformer

from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.decomposition import PCA
import numpy as np



class BestTimeTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, col="best_time"):
        self.col = col
        self.mlb = MultiLabelBinarizer(classes=list(range(1, 13)))
        self.pca = PCA(n_components=1)

    def fit(self, X, y=None):
        X = X.copy()
        month_lists = [self._months_to_list(s) for s in X[self.col]]
        one_hot = self.mlb.fit_transform(month_lists)
        quarters = self._months_to_quarters(one_hot)
        self.pca.fit(quarters)
        return self

    def transform(self, X):
        X = X.copy()
        month_lists = [self._months_to_list(s) for s in X[self.col]]
        one_hot = self.mlb.transform(month_lists)
        quarters = self._months_to_quarters(one_hot)
        X[self.col] = self.pca.transform(quarters)
        return X

    def _months_to_list(self, s):
        mapping = {"Jan":1, "Feb":2, "Mar":3, "Apr":4, "May":5, "Jun":6,
                   "Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12}
        return [mapping[m.strip()] for m in s.split(",") if m.strip() in mapping]

    def _months_to_quarters(self, one_hot):
        Q1 = one_hot[:, [0,1,2]].sum(axis=1)
        Q2 = one_hot[:, [3,4,5]].sum(axis=1)
        Q3 = one_hot[:, [6,7,8]].sum(axis=1)
        Q4 = one_hot[:, [9,10,11]].sum(axis=1)
        return np.vstack([Q1, Q2, Q3, Q4]).T


# Load all transformers/models
country_transformer = joblib.load("country_transformer.pkl")
scaler = joblib.load("scaler.pkl")
kmeans = joblib.load("kmeans.pkl")
results_df = joblib.load("results_df.pkl")
glove_model = KeyedVectors.load("glove_vectors.gensim", mmap="r")


def tokens_to_glove_vector(tokens, model, vector_size=50):
    vectors = [model[word] for word in tokens if word in model]
    if not vectors:
        return np.zeros(vector_size)
    return np.mean(vectors, axis=0)

def predict_destination(city, country, months, category_tokens):
    country_vec = country_transformer.transform(pd.DataFrame({"Country": [country]}))
    bt = BestTimeTransformer(col="Best_Time_to_Travel")
    bt.fit(pd.DataFrame({"Best_Time_to_Travel": ["Jan,Feb,Mar"]}))  # dummy fit
    time_vec = bt.transform(pd.DataFrame({"Best_Time_to_Travel": [months]}))


    glove_vec = tokens_to_glove_vector(category_tokens, glove_model, 50).reshape(1, -1)

    full_features = np.hstack([time_vec, country_vec, glove_vec])
    scaled = scaler.transform(full_features)
    cluster = int(kmeans.predict(scaled)[0])

    matches = results_df[results_df["Cluster"] == cluster][
        ["City", "Category"]
    ].reset_index(drop=True)

    return {
        "predicted_cluster": cluster,
        "similar_cities": matches.to_dict(orient="records")
    }

# print(predict_destination("SampleCity", "SampleCountry", "Jan,Feb", ["beach", "museum","history"]))  

app = FastAPI()
origins = [
    "http://localhost:3000",  # Next.js dev
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prefs(BaseModel):
    city: str
    country: str
    months: str
    category_tokens: list[str]

@app.post("/predict")
def predict(prefs: Prefs):
    try:
        result = predict_destination(
            city=prefs.city,
            country=prefs.country,
            months=prefs.months,
            category_tokens=prefs.category_tokens
        )
        return result
    except Exception as e:
        import traceback
        traceback.print_exc()   # shows full stack trace in terminal
        return {"error": str(e)}

