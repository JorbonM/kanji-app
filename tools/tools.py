import os,re
import sqlite3
path_regex= r'(?:\s+d=")(.+)(?:")'
file_regex= r'[A-Za-z0-9]{5}'

PATH="/home/juser/Documents/kanji_app/kanji-app-vite/assets/kanji"
objs = os.scandir(PATH)
file_contents = []
for entry in objs:
    kanji_uni = re.search(file_regex,entry.name).group(0)
    kanji_uni = kanji_uni[1:]
    file_content = open(PATH+"/"+entry.name).read()
    iter = re.finditer(path_regex,file_content)
    steps = []
    for m in iter:
        steps.append(m.group(1))

    file_contents.append((kanji_uni,steps))


try:
    with sqlite3.connect("kanji_app.db") as conn:

        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE KANJI_ORDER (
                       UNICODE_VAL VARCHAR(5),
                       STEP INTEGER,
                       STROKE VARCHAR(255) NOT NULL,
                       PRIMARY KEY(UNICODE_VAL,STEP)
                       );
        """)

        conn.commit()

        insert_sql = "insert into kanji_order(unicode_val,step,stroke) values(?,?,?);"

        for kanji_uni,steps in file_contents:
            for i, step in enumerate(steps):
                cursor.execute(insert_sql,(kanji_uni,i,step))
            conn.commit()

except sqlite3.OperationalError as e:
    print("Failed to open database:", e)