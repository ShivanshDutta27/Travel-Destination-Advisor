
import pickle
import pandas as pd
import gensim

final_df = pd.read_pickle("final_df.pkl")
results_df = pd.read_pickle("results_df.pkl")
glove = gensim.models.KeyedVectors.load("glove_vectors.gensim")
scaler = pickle.load(open("scaler.pkl", "rb"))
kmeans = pickle.load(open("kmeans.pkl", "rb"))
