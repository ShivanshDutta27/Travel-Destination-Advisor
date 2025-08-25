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

print("BestTimeTransformer module loaded.")