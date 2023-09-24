import pandas as pd

# Read Excel File from Local Path
df = pd.read_excel("problemStatements.xlsx")


# df = df.set_index("ID")
print(df.head())
# Save DataFrame to CSV
df.to_json("../problemStatements.json", orient="index")
