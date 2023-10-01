import uvicorn
from fastapi import FastAPI
import pandas as pd
import requests
import bs4


app = FastAPI()

@app.get("/")
async def root():
    res=requests.get("https://sih.gov.in/sih2023PS")
    soup=bs4.BeautifulSoup(res.text,"html.parser")
    table=soup.find("table",{"id":"dataTablePS"})
    tr=table.find("tbody").findChildren(recursive=False)
    data={}
    for row in tr:
        # row=table.find("tbody").find("tr",recursive=False)
        columns=row.find_all("td",recursive=False)
        data[columns[4].text]={
            "title":columns[2].find("a").text.strip(),
            "category":columns[3].text.strip(),
            "organization":columns[1].text.strip(),
            "domainBucket":columns[6].text.strip(),
            "submisions":columns[5].text.strip(),
            "description":columns[2].find_all("td")[2].find("div",class_="style-2").text.strip(),
            "youtubeLink":columns[2].find_all("td")[6].text.strip(),
            "datasetLink":columns[2].find_all("td")[7].text.strip(),
        }
    return data

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000,reload=)
