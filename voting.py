import uvicorn
from fastapi import FastAPI
import pandas as pd
import requests
import bs4
from pprint import pprint

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

df=pd.DataFrame(data)
df=df.transpose()
df["submisions"]=df["submisions"].astype("int")

dataDict=df.to_dict(orient="index")
dataDict

def voting(votingList):
    results={}
    for problem in votingList:
        d=dataDict[problem]
        pprint(d)
        vSum=0
        persons=0
        while True:
            vSum+=int(input(f"Enter voting for {persons+1}th Person:"))
            persons+=1
            if not input("Do you want to continye"):
                break
        results[problem]=vSum/persons

    pprint(results)
    return results

d=['SIH1313', 'SIH1315', 'SIH1325', 'SIH1329', 'SIH1333', 'SIH1340', 'SIH1345', 'SIH1352', 'SIH1356', 'SIH1357', 'SIH1361', 'SIH1362', 'SIH1363', 'SIH1365', 'SIH1368', 'SIH1371', 'SIH1372', 'SIH1376', 'SIH1377', 'SIH1380', 'SIH1382', 'SIH1383', 'SIH1387', 'SIH1389', 'SIH1395', 'SIH1398', 'SIH1399', 'SIH1404', 'SIH1406', 'SIH1412', 'SIH1413', 'SIH1415', 'SIH1416', 'SIH1418', 'SIH1419', 'SIH1421', 'SIH1422', 'SIH1424', 'SIH1429', 'SIH1433', 'SIH1437', 'SIH1439', 'SIH1440', 'SIH1445', 'SIH1446', 'SIH1447', 'SIH1448', 'SIH1449', 'SIH1450', 'SIH1452', 'SIH1453', 'SIH1455', 'SIH1457', 'SIH1458', 'SIH1459', 'SIH1460', 'SIH1463', 'SIH1465', 'SIH1466', 'SIH1467', 'SIH1471', 'SIH1472', 'SIH1473', 'SIH1475', 'SIH1477', 'SIH1485', 'SIH1489', 'SIH1498', 'SIH1502', 'SIH1505', 'SIH1509', 'SIH1510', 'SIH1511', 'SIH1512', 'SIH1516']
print((voting(d)))
# df1=pd.DataFrame(voting(d))
# # df1.columns=
# pprint(df1.head())
# pprint(df1.describe())